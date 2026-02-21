"use client";

import { PinnedLocation } from "@/src/types/disaster";

export default function AnalysisCard({ data, onDismiss }: { data: PinnedLocation, onDismiss: () => void }) {
  
  const parseAIResponse = (text: string) => {
    if (!text) return { levels: null, summary: "" };
    
    const parts = text.split("[SUMMARY]");
    const levelsPart = parts[0]?.replace("[LEVELS]", "").trim();
    const summaryPart = parts[1]?.trim();

    const levels = levelsPart?.split("\n").map(line => {
      const [key, val] = line.split(": ");
      return { key, val };
    }).filter(item => item.key && item.val);

    return { levels, summary: summaryPart };
  };

  const { levels, summary } = parseAIResponse(data.airoundup);

  return (
    <div className="absolute bottom-6 right-6 w-80 z-50 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="bg-zinc-900/95 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-5 overflow-hidden">
        
        {/* Progress Bar Loading */}
        {!data.airoundup && (
          <div className="absolute top-0 left-0 w-full h-1 bg-zinc-800">
            <div className="h-full bg-blue-500 animate-[loading_2s_ease-in-out_infinite]" 
                 style={{ width: '40%' }} />
          </div>
        )}

        <div className="flex items-center gap-2 mb-4">
          <div className={`w-1.5 h-1.5 rounded-full ${data.airoundup ? 'bg-blue-500' : 'bg-zinc-600 animate-pulse'}`} />
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            {data.airoundup ? 'Risk Analysis' : 'Gemini AI Analyzing...'}
          </h3>
        </div>

        {!data.airoundup ? (
          <div className="space-y-2 py-1">
            <div className="h-3 w-full bg-zinc-800/50 rounded animate-pulse" />
            <div className="h-3 w-4/6 bg-zinc-800/50 rounded animate-pulse" />
          </div>
        ) : (
          <div className="space-y-4">
            {/* Bagian Skor Level - Muted Colors */}
            {levels && (
              <div className="flex gap-2">
                {levels.map((item) => (
                  <div key={item.key} className="flex-1 bg-zinc-800/40 rounded-lg p-2 border border-white/5 text-center">
                    <div className="text-[8px] text-zinc-500 font-bold uppercase mb-0.5">{item.key}</div>
                    <div className={`text-[10px] font-bold ${
                      item.val?.includes("HIGH") ? "text-blue-400" : 
                      item.val?.includes("MODERATE") ? "text-amber-500/80" : "text-emerald-500/80"
                    }`}>
                      {item.val}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Summary */}
            <p className="text-[13px] leading-relaxed text-zinc-300 font-medium">
              {summary || data.airoundup}
            </p>

            {/* NB / Legend Section */}
            <div className="pt-2 flex gap-3 border-t border-white/5">
                <div className="text-[8px] text-zinc-600"><span className="font-bold text-zinc-500">EQ</span> Earthquake</div>
                <div className="text-[8px] text-zinc-600"><span className="font-bold text-zinc-500">FL</span> Flood</div>
                <div className="text-[8px] text-zinc-600"><span className="font-bold text-zinc-500">LS</span> Landslide</div>
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-zinc-500 uppercase truncate max-w-37.5">{data.city}</span>
            <span className="text-[9px] text-zinc-600 font-mono tracking-tighter">{data.lat.toFixed(4)}, {data.lng.toFixed(4)}</span>
          </div>
          <button onClick={onDismiss} className="text-[10px] font-bold text-zinc-500 hover:text-red-500 transition-colors uppercase tracking-tighter">Dismiss</button>
        </div>
      </div>
    </div>
  );
}