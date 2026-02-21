"use client";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => Promise<void>;
  isSearching: boolean;
}

export default function SearchBar({ onSearch, isSearching }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setQuery("");
  };

  return (
    <div className="absolute top-6 right-6 lg:left-6 z-50 w-80">
      <form onSubmit={handleSubmit} className="relative group">
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search location..."
          className="w-full bg-black/40 backdrop-blur-xl border border-white/10 text-white px-5 py-3 pr-12 rounded-2xl shadow-2xl focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-zinc-600 text-sm"
        />
        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-zinc-400 hover:text-white transition-colors">
          {isSearching ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-blue-500 rounded-full animate-spin" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}