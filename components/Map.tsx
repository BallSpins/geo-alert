"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import { getAIPrediction } from "@/app/actions/analysis";
import { reverseGeocode, fetchRiskAnalysis } from "@/src/lib/geoUtils";
import { PinnedLocation } from "@/src/types/disaster";
import SearchBar from "./map/SearchBar";
import AnalysisCard from "./map/AnalysisCard";
import { MapPin } from "lucide-react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);

  const [pinnedLocation, setPinnedLocation] = useState<PinnedLocation | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const removePin = () => {
    markerRef.current?.remove();
    popupRef.current?.remove();
    setPinnedLocation(null);
  };

  // Fungsi buat munculin popup Mapbox di atas marker
  const showLocationPopup = useCallback((lng: number, lat: number, city: string, place: string) => {
    if (!mapRef.current) return;
    if (popupRef.current) popupRef.current.remove();

    const popup = new mapboxgl.Popup({
      offset: 25,
      closeButton: false,
      closeOnClick: false,
      className: "geo-popup",
    })
      .setLngLat([lng, lat])
      .setHTML(`
        <div class="popup-card">
          <div class="flex justify-between items-start">
            <div class="popup-title">${city}</div>
            <button id="btn-close-popup" class="text-gray-400 hover:text-white ml-2">✕</button>
          </div>
          <div class="popup-place">
            ${place}
          </div>
          <div class="popup-coord">
            ${lat.toFixed(4)}, ${lng.toFixed(4)}
          </div>
        </div>
      `)
      .addTo(mapRef.current);
    const closeBtn = document.getElementById("btn-close-popup");

    if (closeBtn) closeBtn.onclick = () => removePin();

    popupRef.current = popup;

  }, []);

  const handleAnalyze = useCallback(async (lng: number, lat: number) => {
    if (!mapRef.current) return;
    
    // 1. Marker & FlyTo
    if (markerRef.current) markerRef.current.setLngLat([lng, lat]);
    else {
      const el = document.createElement("div");
      el.className = "w-5 h-5 bg-red-500 rounded-full border-2 border-white shadow-md ring-4 ring-red-500/30 animate-pulse";
      markerRef.current = new mapboxgl.Marker({ element: el }).setLngLat([lng, lat]).addTo(mapRef.current);
    }
    mapRef.current.flyTo({ center: [lng, lat], zoom: 12, duration: 2000 });

    // 2. Get Lokasi & Munculin Popup
    const { city, place } = await reverseGeocode(lng, lat, mapboxgl.accessToken!);
    showLocationPopup(lng, lat, city, place);
    
    // 3. Set State Loading
    setPinnedLocation({ lat, lng, city, place, airoundup: "" });

    // 4. Gemini Analysis
    try {
      const riskData = await fetchRiskAnalysis(lat, lng);
      if (riskData) {
        const aiResult = await getAIPrediction(riskData, city);
        setPinnedLocation((prev: PinnedLocation | null) => prev ? { ...prev, airoundup: aiResult || "" } : null);
      }
    } catch (err) {
      console.error(err);
      setPinnedLocation((prev: PinnedLocation | null) => prev ? { ...prev, airoundup: "Analysis failed." } : null);
    }
  }, [showLocationPopup]);

  const locateUser = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        console.log(longitude, latitude);
        handleAnalyze(longitude, latitude);
      },
      () => {
        console.log("Akses GPS ditolak, menggunakan default.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, [handleAnalyze]);

  const onSearch = async (query: string) => {
    setIsSearching(true);
    try {
      const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}&limit=1`);
      const data = await res.json();
      if (data.features?.length > 0) {
        const [lng, lat] = data.features[0].center;
        await handleAnalyze(lng, lat);
      }
    } finally { setIsSearching(false); }
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [110.4, -7.8], zoom: 9,
    });

    mapRef.current = map;

    map.on("load", () => {
      console.log('load');
      locateUser();
    });

    map.on("click", (e) => handleAnalyze(e.lngLat.lng, e.lngLat.lat));

    return () => mapRef.current?.remove();
  }, [handleAnalyze, locateUser]);

  return (
    <div className="w-full h-full relative overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
      <SearchBar onSearch={onSearch} isSearching={isSearching} />

      <button 
        onClick={locateUser}
        className="absolute top-20 right-6 lg:left-6 w-10 h-10 bg-zinc-900 border border-white/10 rounded-xl flex items-center justify-center text-white shadow-xl hover:bg-zinc-800 transition-all z-40 active:scale-95"
        title="Find My Location"
      >
        <MapPin size={18} className="text-blue-500" />
      </button>

      {pinnedLocation && (
        <AnalysisCard 
          data={pinnedLocation} 
          onDismiss={() => { 
            markerRef.current?.remove(); 
            popupRef.current?.remove(); 
            setPinnedLocation(null); 
          }} 
        />
      )}
    </div>
  );
}