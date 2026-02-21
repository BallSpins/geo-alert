export interface RiskData {
  elevation: number;
  weather: {
    precipitation: number;
    soilMoisture: number;
    weatherCode: number;
  };
  events: {
    eq: { // Earthquake
      count: number;
      maxMag: number;
      lastDate: string;
    };
  };
  landContext: { class: string; layer: string };
}

export interface PinnedLocation { 
  lat: number, 
  lng: number, 
  city: string, 
  place: string, 
  airoundup: string,
}