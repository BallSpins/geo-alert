"use server";

import { client } from "@/src/lib/gemini";
import { RiskData } from "@/src/types/disaster";

export async function getAIPrediction(riskData: RiskData, locationName: string) {
  const { elevation, weather, landContext, events } = riskData;

  const prompt = `
    Perform a disaster risk analysis for early warning with these following data:
    - Location: ${locationName}
    - Elevation: ${elevation}m
    - Precipitation: ${weather.precipitation}mm
    - Soil Moisture: ${weather.soilMoisture}
    - Land Type: ${landContext.class}
    - WMO Weather Code: ${weather.weatherCode}
    - Recent Earthquakes (100km radius): ${events.eq.count} events, Max Magnitude: ${events.eq.maxMag}, Last Event: ${events.eq.lastDate}

    Task:
    1. Assess individual risk levels (Scale: NO RISK, LOW, MODERATE, HIGH) for: Earthquake, Flood, and Landslide. Do not invent new terms.
    2. Provide a concise 2-3 meaty sentence overall risk assessment summary.

    Required Template:
    [LEVELS]
    EQ: {level}
    FL: {level}
    LS: {level}
    
    [SUMMARY]
    {OVERALL STATUS}: {Brief data summary}. {Safety recommendation}.

    Tone: Professional, straightforward, no conversational filler.
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash', 
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        temperature: 0.4,
        topP: 0.8,
        maxOutputTokens: 2500,
      },
    });

    return response.text; 
  } catch (error) {
    console.error("Gemini SDK Error:", error);
    return "[LEVELS]\nEQ: UNKNOWN\nFL: UNKNOWN\nLS: UNKNOWN\n\n[SUMMARY]\nMODERATE: AI analysis unavailable.";
  }
}