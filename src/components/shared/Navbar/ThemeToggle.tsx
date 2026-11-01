"use client";

import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"option-c" | "option-c-dark">("option-c");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("dnp-theme");
    const active = saved === "option-c-dark" ? "option-c-dark" : "option-c";
    setTheme(active);
    document.documentElement.setAttribute("data-theme", active);
    document.documentElement.setAttribute("data-style", "minimalistic");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "option-c" ? "option-c-dark" : "option-c";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    document.documentElement.setAttribute("data-style", "minimalistic");
    localStorage.setItem("dnp-theme", nextTheme);
  };

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5 opacity-0" />
    );
  }

  const isDark = theme === "option-c-dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.08] hover:bg-white/15 border border-white/15 text-white/90 hover:text-accent transition-all duration-200 focus:outline-none"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        <FaSun className="text-accent text-xs" />
      ) : (
        <FaMoon className="text-white/80 hover:text-accent text-xs" />
      )}
    </button>
  );
}
