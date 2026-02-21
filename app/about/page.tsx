"use client";

import { 
  ShieldCheck, 
  Map as MapIcon, 
  Bell, 
  Smartphone, 
  MousePointer2, 
  Github, 
  ExternalLink 
} from "lucide-react";
import Link from "next/link";

export default function About() {
  const features = [
    {
      icon: <MapIcon className="text-blue-600" size={24} />,
      text: "Interactive map interface with real-time location tracking"
    },
    {
      icon: <Bell className="text-blue-600" size={24} />,
      text: "AI-powered risk analysis for any geographic region"
    },
    {
      icon: <Smartphone className="text-blue-600" size={24} />,
      text: "Responsive design for seamless desktop and mobile use"
    },
    {
      icon: <MousePointer2 className="text-blue-600" size={24} />,
      text: "Easy-to-use marker placement and smart search system"
    }
  ];

  return (
    <div className="w-full bg-linear-to-br from-blue-50 via-white to-gray-50 py-24 px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
            <ShieldCheck className="text-white" size={28} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">About GeoAlert</h1>
        </div>
        
        <div className="space-y-12">
          {/* Section 1: What is it */}
          <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What is GeoAlert?</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              GeoAlert is a location-based intelligence system designed to help you monitor and track geographic areas with precision. The platform integrates <b>Mapbox GL JS</b> for advanced map visualization and <b>Google Gemini AI</b> to provide real-time disaster risk assessments at any point you select.
            </p>
          </section>

          {/* Section 2: Key Features */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 px-4">Key Features</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-white/60 backdrop-blur-sm border border-white p-6 rounded-2xl flex items-start gap-4 hover:shadow-md transition-shadow">
                  <div className="mt-1">{feature.icon}</div>
                  <span className="text-gray-700 font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Meet the Developer */}
          <section className="bg-zinc-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            
            <h2 className="text-3xl font-bold mb-8">Meet the Developer</h2>
            <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
              {/* Profile Image / Placeholder */}
              <div className="w-32 h-32 bg-linear-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-4xl font-bold border-4 border-zinc-800 shrink-0 shadow-2xl">
                Geo
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                  This project was developed as a smart solution for geographic information management. I build things that work. This project is part of my exploration into Gemini AI and real-time data processing.
                </p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <a href="https://github.com/BallSpins" target="_blank" className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-5 py-2.5 rounded-xl transition-all border border-zinc-700 group">
                    <Github size={20} /> Github <ExternalLink size={14} className="text-zinc-500 group-hover:text-white transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Get Started */}
          <section className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-3xl p-10 text-center shadow-xl shadow-blue-200">
            <h2 className="text-2xl font-bold text-white mb-4">Start Monitoring Now</h2>
            <p className="text-blue-100 mb-8 max-w-md mx-auto">
              Explore the interactive map and get instant AI risk analysis for your region.
            </p>
            <Link 
              href="/map" 
              className="inline-block bg-white text-blue-600 font-bold py-4 px-10 rounded-2xl hover:bg-blue-50 transition-all shadow-lg active:scale-95"
            >
              Open GeoAlert Map
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}