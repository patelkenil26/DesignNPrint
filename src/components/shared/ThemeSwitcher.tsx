"use client";

import React, { useEffect, useState } from "react";
import { FaSun, FaMoon, FaCheck, FaSlidersH, FaTimes } from "react-icons/fa";

interface ThemeMode {
  id: "option-c" | "option-c-dark";
  name: string;
  label: string;
  badge: string;
  description: string;
  dots: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const themeModes: ThemeMode[] = [
  {
    id: "option-c",
    name: "Option C (Light Mode)",
    label: "Light Mode",
    badge: "Gallery White",
    description: "Pure architectural white canvas with warm raw brass accents",
    dots: ["#ffffff", "#d97706", "#71717a"],
    icon: FaSun,
  },
  {
    id: "option-c-dark",
    name: "Option C (Dark Mode)",
    label: "Dark Mode",
    badge: "Matte Zinc",
    description: "Deep matte zinc-900 surface with luminous warm gold branding",
    dots: ["#121214", "#f59e0b", "#a1a1aa"],
    icon: FaMoon,
  },
];

export default function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState<"option-c" | "option-c-dark">("option-c");
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("dnp-preview-theme");
    const validTheme = savedTheme === "option-c-dark" ? "option-c-dark" : "option-c";

    setActiveTheme(validTheme);

    // Lock strictly to Minimalistic design pattern & Option C theme
    document.documentElement.setAttribute("data-style", "minimalistic");
    document.documentElement.setAttribute("data-theme", validTheme);
    localStorage.setItem("dnp-preview-style", "minimalistic");
  }, []);

  const switchTheme = (themeId: "option-c" | "option-c-dark") => {
    setActiveTheme(themeId);
    document.documentElement.setAttribute("data-theme", themeId);
    document.documentElement.setAttribute("data-style", "minimalistic");
    localStorage.setItem("dnp-preview-theme", themeId);
    localStorage.setItem("dnp-preview-style", "minimalistic");
  };

  const toggleThemeMode = () => {
    const nextTheme = activeTheme === "option-c" ? "option-c-dark" : "option-c";
    switchTheme(nextTheme);
  };

  if (!mounted) return null;

  const currentMode = themeModes.find((m) => m.id === activeTheme) || themeModes[0];
  const CurrentIcon = currentMode.icon;

  return (
    <aside
      aria-label="Minimalistic Theme Controller"
      className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[999] font-poppins max-w-[94vw] sm:max-w-md w-full px-2"
    >
      {/* EXPANDED CONTROLLER CARD */}
      {isExpanded ? (
        <div className="bg-[#0b0f17]/98 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-2xl rounded-xl p-4 sm:p-5 text-white animate-in fade-in slide-in-from-bottom-3 duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-accent">
                  Option C: Architectural Onyx &amp; Brass
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/80 font-mono">
                  Minimalistic
                </span>
              </div>
              <p className="text-[11px] text-white/60 mt-0.5">
                Switch between Option C Light &amp; Dark Modes
              </p>
            </div>

            <button
              onClick={() => setIsExpanded(false)}
              className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Close controller"
            >
              <FaTimes size={12} />
            </button>
          </div>

          {/* Mode Selection Cards */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            {themeModes.map((mode) => {
              const isSelected = activeTheme === mode.id;
              const IconComponent = mode.icon;

              return (
                <button
                  key={mode.id}
                  onClick={() => switchTheme(mode.id)}
                  className={`p-3 rounded-lg text-left border transition-all text-xs flex flex-col justify-between ${
                    isSelected
                      ? "bg-accent/15 border-accent text-white shadow-md ring-1 ring-accent"
                      : "bg-white/[0.04] border-white/10 text-white/70 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <IconComponent
                        className={`text-sm ${isSelected ? "text-accent" : "text-white/60"}`}
                      />
                      {/* Swatch color dots */}
                      <span className="flex items-center -space-x-1 shrink-0">
                        {mode.dots.map((dot, idx) => (
                          <span
                            key={idx}
                            className="w-2.5 h-2.5 rounded-full border border-black/40"
                            style={{ backgroundColor: dot }}
                          />
                        ))}
                      </span>
                    </div>

                    {isSelected && (
                      <span className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-accent text-primary-dark text-[8px] font-bold">
                        <FaCheck />
                      </span>
                    )}
                  </div>

                  <div className="font-bold text-xs text-white leading-tight mb-0.5">
                    {mode.label}
                  </div>
                  <div className="text-[10px] text-white/50 leading-tight">
                    {mode.badge}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer Info */}
          <div className="flex items-center justify-between pt-2.5 border-t border-white/10 text-[10px] text-white/50">
            <span>Locked to <strong>Minimalistic</strong> design paradigm</span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-accent hover:underline font-bold"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        /* COLLAPSED FLOATING PILL (Clean 1-Click Toggle) */
        <div className="mx-auto w-fit bg-[#0b0f17]/95 text-white border border-white/20 shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-2xl rounded-full p-1.5 flex items-center gap-2 transition-all hover:border-accent/40">
          
          {/* Label Button (Opens expanded view) */}
          <button
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-2 pl-2.5 pr-1.5 py-1 text-xs font-semibold rounded-full hover:bg-white/10 transition-colors"
            title="Theme Settings"
          >
            <span className="text-[11px] text-white/60 uppercase tracking-wider font-bold">Design:</span>
            <span className="text-white font-bold text-xs">Minimalistic</span>
            <span className="text-white/30">•</span>
            {/* Color Swatch Dots */}
            <span className="flex items-center -space-x-1 shrink-0">
              {currentMode.dots.map((dot, idx) => (
                <span
                  key={idx}
                  className="w-2.5 h-2.5 rounded-full border border-black/40"
                  style={{ backgroundColor: dot }}
                />
              ))}
            </span>
            <span className="font-bold text-accent text-xs">{currentMode.label}</span>
          </button>

          {/* 1-Click Fast Light/Dark Toggle */}
          <button
            onClick={toggleThemeMode}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-primary-dark font-bold text-xs hover:bg-accent-hover transition-all active:scale-95 shadow-sm"
            title={`Switch to ${activeTheme === "option-c" ? "Dark Mode" : "Light Mode"}`}
          >
            <CurrentIcon className="text-[11px]" />
            <span>{activeTheme === "option-c" ? "Go Dark" : "Go Light"}</span>
          </button>
        </div>
      )}
    </aside>
  );
}
