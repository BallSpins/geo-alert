"use client";

import Link from "next/link";
import { 
  Map as MapIcon, 
  Bell, 
  BrainCircuit, // Ganti Zap jadi BrainCircuit biar kesan AI-nya dapet
  ArrowRight, 
} from "lucide-react";

export default function Home() {
  return (
    <div className="w-full bg-linear-to-br from-blue-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="w-full py-24 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-bold uppercase tracking-widest text-blue-600">Real-time Intelligence</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Welcome to <span className="text-blue-600 block md:inline">GeoAlert</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-10 leading-relaxed max-w-2xl">
            Stay informed about locations that matter to you. Track geographic areas with precision and receive real-time alerts based on your customized preferences.
          </p>
          <Link
            href="/map"
            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-lg group"
          >
            Explore the Map
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-24 px-6 md:px-8 bg-white bg-opacity-40 border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            Powerful Features
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all p-8 group">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MapIcon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Interactive Mapping
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Click on the map to place markers and track locations with ease. Full-screen experience with responsive design.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all p-8 group">
              <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bell size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Real-time Alerts
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Receive instant notifications for events in your monitored areas. Stay updated wherever you are.
              </p>
            </div>

            {/* Feature 3 - Updated to AI Insights */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all p-8 group">
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BrainCircuit size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                AI-Powered Insights
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Leverage Google Gemini AI to analyze regional data and get instant disaster risk assessments for any location.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-12 leading-relaxed">
            Start monitoring locations today and never miss an important event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/map"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg transition-colors duration-200 text-lg text-center shadow-lg shadow-blue-100"
            >
              Go to Map
            </Link>
            <Link
              href="/about"
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-4 px-10 rounded-lg transition-colors duration-200 text-lg text-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}