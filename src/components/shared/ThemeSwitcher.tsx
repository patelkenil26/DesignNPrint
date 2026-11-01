"use client";

import React, { useEffect, useState } from "react";
import { FaPalette, FaChevronDown, FaChevronUp } from "react-icons/fa";

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
    name: "Onyx Minimal",
    label: "Option C",
    dots: ["#18181b", "#d97706", "#71717a"],
  },
];

export default function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState("option-a");
  const [isExpanded, setIsExpanded] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("dnp-preview-theme") || "option-a";
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
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] font-poppins"
    >
      <div className="bg-primary-dark/95 text-text-light border border-border-dark shadow-2xl backdrop-blur-md rounded-full px-3 py-2 flex items-center gap-2 max-w-[95vw] overflow-x-auto transition-all">
        {/* Toggle icon */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full hover:bg-primary-surface transition-colors"
          title="Toggle Theme Bar"
        >
          <FaPalette className="text-accent text-sm" />
          <span className="hidden sm:inline">Theme Preview:</span>
          {isExpanded ? <FaChevronDown size={10} /> : <FaChevronUp size={10} />}
        </button>

        {/* Buttons list */}
        {isExpanded && (
          <div className="flex items-center gap-1.5 sm:gap-2">
            {themes.map((t) => {
              const isActive = activeTheme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => switchTheme(t.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 transition-all ${
                    isActive
                      ? "bg-accent text-text-light shadow-md ring-2 ring-accent/40"
                      : "bg-primary-surface text-text-light-muted hover:text-text-light hover:bg-border-dark"
                  }`}
                >
                  {/* Swatch color dots */}
                  <span className="flex items-center -space-x-1">
                    {t.dots.map((dot, i) => (
                      <span
                        key={i}
                        className="w-2.5 h-2.5 rounded-full border border-black/30"
                        style={{ backgroundColor: dot }}
                      />
                    ))}
                  </span>
                  <span>{t.label}: {t.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
