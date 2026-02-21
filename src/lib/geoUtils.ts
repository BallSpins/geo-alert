import { RiskData } from "../types/disaster";

interface MapboxContextFeature {
  id: string;
  text: string;
}

export const reverseGeocode = async (lng: number, lat: number, token: string) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}&limit=1`
    );
    const data = await response.json();
    if (data.features?.length > 0) {
      const feature = data.features[0];
      const city = feature.context?.find((c: MapboxContextFeature) => c.id.startsWith("place."))?.text || feature.text || "Unknown";
      return { city, place: feature.place_name };
    }
    return { city: "Unknown", place: "Unknown location" };
  } catch (error) {
    console.error(error);
    return { city: "Unknown", place: "Unknown location" };
  }
};

export const fetchRiskAnalysis = async (lat: number, lng: number): Promise<RiskData | null> => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const starttime = thirtyDaysAgo.toISOString();

    const [elevationRes, weatherRes, eqRes] = await Promise.all([
      fetch(`https://api.open-elevation.com/api/v1/lookup?locations=${lat},${lng}`),
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=precipitation,soil_moisture_0_to_1cm,weather_code&timezone=auto`),
      fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&latitude=${lat}&longitude=${lng}&maxradiuskm=150&minmagnitude=2.5&starttime=${starttime}`),
    ]);

    const elevationData = await elevationRes.json();
    const weatherData = await weatherRes.json();
    const earthquakeData = await eqRes.json();

    const features = earthquakeData.features || [];
    const latestEq = features[0]?.properties;
    const wCode = weatherData.hourly.weather_code[0];

    return {
      elevation: elevationData.results[0]?.elevation,
      weather: {
        precipitation: weatherData.hourly.precipitation[0],
        soilMoisture: weatherData.hourly.soil_moisture_0_to_1cm[0],
        weatherCode: wCode || 0
      },
      events: {
        eq: {
          count: earthquakeData.metadata.count || 0,
          maxMag: latestEq?.mag || 0,
          lastDate: latestEq?.time ? new Date(latestEq.time).toLocaleDateString() : "No recent events",
        },
      },
      landContext: { class: "General Area", layer: "N/A" }
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};