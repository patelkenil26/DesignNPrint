"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaSearch, FaTimes } from "react-icons/fa";

interface SearchBoxProps {
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filteredResults: any[];
  clearSearch: () => void;
}

export default function SearchBox({
  searchTerm,
  handleSearch,
  filteredResults,
  clearSearch,
}: SearchBoxProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="hidden lg:block relative">
      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${
          isFocused || searchTerm
            ? "bg-white/10 border-accent/60 shadow-[0_0_12px_rgba(245,158,11,0.15)] w-48"
            : "bg-white/[0.06] border-white/15 hover:border-white/25 w-36"
        }`}
      >
        <FaSearch className="text-white/40 text-[11px] shrink-0" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="bg-transparent text-white placeholder-white/40 text-xs focus:outline-none w-full"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="text-white/40 hover:text-white text-[10px] p-0.5"
            aria-label="Clear search"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {searchTerm && (
        <ul className="absolute right-0 mt-2 bg-[#0c1017]/95 text-white rounded-xl shadow-2xl border border-white/15 backdrop-blur-xl w-64 z-50 max-h-60 overflow-auto p-1.5 scrollbar-thin">
          {filteredResults.length > 0 ? (
            filteredResults.map((result: any) => (
              <li key={result.id}>
                <Link
                  href={`/services/${result.id}`}
                  className="block px-3 py-2 rounded-lg text-xs hover:bg-accent hover:text-primary-dark font-medium transition-colors"
                  onClick={clearSearch}
                >
                  <p className="font-semibold">{result.name}</p>
                  <p className="text-[10px] opacity-75 truncate">{result.category || "Commercial Print"}</p>
                </Link>
              </li>
            ))
          ) : (
            <li className="px-3 py-3 text-xs text-white/50 text-center">
              No matching products found
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
