"use client";

import React, { useEffect, useState } from "react";
import { FaPalette, FaChevronDown, FaChevronUp, FaCheck } from "react-icons/fa";

interface ThemeOption {
  id: string;
  name: string;
  label: string;
  dots: string[];
}

const themes: ThemeOption[] = [
  {
    id: "option-a",
    name: "Midnight & Gold",
    label: "Option A",
    dots: ["#0f172a", "#f59e0b", "#3b82f6"],
  },
  {
    id: "option-b",
    name: "CMYK Agency",
    label: "Option B",
    dots: ["#0f172a", "#0284c7", "#ec4899"],
  },
  {
    id: "option-c",
    name: "Onyx & Brass (Light)",
    label: "Option C (Light)",
    dots: ["#ffffff", "#d97706", "#71717a"],
  },
  {
    id: "option-c-dark",
    name: "Onyx & Brass (Dark)",
    label: "Option C (Dark)",
    dots: ["#121214", "#f59e0b", "#a1a1aa"],
  },
];

export default function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState("option-c");
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("dnp-preview-theme") || "option-c";
    setActiveTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const switchTheme = (themeId: string) => {
    setActiveTheme(themeId);
    document.documentElement.setAttribute("data-theme", themeId);
    localStorage.setItem("dnp-preview-theme", themeId);
  };

  if (!mounted) return null;

  return (
    <aside
      aria-label="Theme Preview Controller"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] font-poppins max-w-[95vw]"
    >
      <div className="bg-primary-dark/95 text-text-light border border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl rounded-full p-1.5 sm:p-2 flex items-center gap-1.5 sm:gap-2 transition-all">
        
        {/* Toggle Bar */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full hover:bg-white/10 transition-colors"
          title="Toggle Color Theme Selector"
        >
          <FaPalette className="text-accent text-xs" />
          <span className="hidden sm:inline">Theme:</span>
          <span className="text-accent font-bold">
            {themes.find((t) => t.id === activeTheme)?.name || "Option C"}
          </span>
          {isExpanded ? <FaChevronDown size={9} /> : <FaChevronUp size={9} />}
        </button>

        {/* Theme Options */}
        {isExpanded && (
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-[70vw] sm:max-w-none scrollbar-none py-0.5">
            {themes.map((t) => {
              const isActive = activeTheme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => switchTheme(t.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-accent text-primary-dark shadow-md ring-2 ring-accent/50 scale-105"
                      : "bg-white/5 text-text-light-muted hover:text-text-light hover:bg-white/15"
                  }`}
                >
                  {/* Swatch color dots */}
                  <span className="flex items-center -space-x-1 shrink-0">
                    {t.dots.map((dot, i) => (
                      <span
                        key={i}
                        className="w-2.5 h-2.5 rounded-full border border-black/40"
                        style={{ backgroundColor: dot }}
                      />
                    ))}
                  </span>
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
