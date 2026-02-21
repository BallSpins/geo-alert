"use client";

import { Info, Mail, MapIcon } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-16 px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-gray-800 pb-12 mb-12">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white tracking-tight">GeoAlert</span>
          </div>
          <div className="flex space-x-8">
            <Link href="/about" className="hover:text-white transition-colors flex items-center gap-2">
              <Info size={18} /> About
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-2">
              <Mail size={18} /> Contact
            </Link>
            <Link href="/map" className="hover:text-white transition-colors flex items-center gap-2">
              <MapIcon size={18} /> Map
            </Link>
          </div>
        </div>
        <p className="text-center text-gray-500">&copy; 2026 GeoAlert. Disaster Early Warning System.</p>
      </div>
    </footer>
  );
}
