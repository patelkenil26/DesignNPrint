"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLayerGroup,
  FaRulerCombined,
  FaShieldAlt,
  FaCheck,
  FaBolt,
  FaSearchPlus,
  FaTimes,
  FaUndo,
  FaStar,
} from "react-icons/fa";

export type SpecimenPhase =
  | "monolith"    // 1. Hero 3D packaging box with gold reflection
  | "dieline"     // 2. CAD vector dieline unfold with crease & score lines
  | "scale"       // 3. Dimensional thickness morph (Card -> Mono-carton -> Rigid Box)
  | "split"       // 4. Quality split: 250 GSM dull vs 450 GSM velvet + gold foil
  | "exploded"    // 5. The showstopper: 4 floating Z-axis layers (Board, Ink, Film, Foil)
  | "sealed";     // 6. Finished ready-to-dispatch carton with gold seal

interface LivingSpecimen3DProps {
  currentPhase?: SpecimenPhase;
  onPhaseChange?: (phase: SpecimenPhase) => void;
  interactive?: boolean;
  className?: string;
}

export default function LivingSpecimen3D({
  currentPhase: controlledPhase,
  onPhaseChange,
  interactive = true,
  className = "",
}: LivingSpecimen3DProps) {
  const [internalPhase, setInternalPhase] = useState<SpecimenPhase>("monolith");
  const activePhase = controlledPhase || internalPhase;

  // 3D Mouse & Touch Tracking State
  const [rotation, setRotation] = useState({ x: -8, y: 14 });
  const [isHovered, setIsHovered] = useState(false);
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });

  // Sub-states for specific phases
  const [activeFinish, setActiveFinish] = useState<"gold" | "spot-uv" | "velvet">("gold");
  const [scaleMode, setScaleMode] = useState<"card" | "carton" | "rigid">("rigid");
  const [splitPos, setSplitPos] = useState(50);
  const [explodedLayer, setExplodedLayer] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const setPhase = (phase: SpecimenPhase) => {
    setInternalPhase(phase);
    if (onPhaseChange) onPhaseChange(phase);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Calculate 3D tilt angles based on pointer
    const rotX = (0.5 - y) * 28;
    const rotY = (x - 0.5) * 32;

    setRotation({ x: rotX, y: rotY });
    setLightPos({ x: Math.round(x * 100), y: Math.round(y * 100) });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    // Smooth reset to natural isometric angle
    setRotation({ x: -6, y: 12 });
    setLightPos({ x: 60, y: 40 });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = (touch.clientX - rect.left) / rect.width;
    const y = (touch.clientY - rect.top) / rect.height;

    setRotation({
      x: (0.5 - Math.max(0, Math.min(1, y))) * 24,
      y: (Math.max(0, Math.min(1, x)) - 0.5) * 28,
    });
    setLightPos({
      x: Math.round(Math.max(0, Math.min(1, x)) * 100),
      y: Math.round(Math.max(0, Math.min(1, y)) * 100),
    });
  };

  return (
    <div className={`relative w-full flex flex-col items-center select-none font-poppins ${className}`}>
      {/* 1. TOP INTERACTIVE PHASE SCRUBBER (Allows client to inspect any state instantly) */}
      {interactive && (
        <div className="w-full flex items-center justify-between gap-1 p-1 sm:p-1.5 bg-surface-muted/90 backdrop-blur-md rounded-xl border border-border-subtle mb-3 sm:mb-4 shadow-xs overflow-x-auto scrollbar-none">
          {(
            [
              { id: "monolith", label: "1. 3D Monolith", short: "Monolith" },
              { id: "dieline", label: "2. CAD Dieline", short: "Dieline" },
              { id: "scale", label: "3. Form Factor", short: "Scale" },
              { id: "split", label: "4. Quality Split", short: "Compare" },
              { id: "exploded", label: "5. Exploded Stack", short: "Explode" },
              { id: "sealed", label: "6. Gold Seal", short: "Sealed" },
            ] as const
          ).map((phase) => {
            const isActive = activePhase === phase.id;
            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => setPhase(phase.id)}
                className={`flex-1 min-w-[70px] sm:min-w-0 py-1.5 px-2 rounded-lg text-[10px] sm:text-xs font-bold transition-all text-center truncate ${
                  isActive
                    ? "bg-accent text-primary-dark shadow-sm"
                    : "text-text-muted hover:text-text-main hover:bg-surface"
                }`}
              >
                <span className="hidden sm:inline">{phase.label}</span>
                <span className="sm:hidden">{phase.short}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* 2. 3D PERSPECTIVE VIEWPORT STAGE */}
      <div
        ref={containerRef}
        onPointerEnter={() => setIsHovered(true)}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onTouchMove={handleTouchMove}
        className="relative w-full aspect-[4/3] sm:aspect-[16/11] max-w-lg rounded-2xl sm:rounded-3xl cursor-grab active:cursor-grabbing p-1 flex items-center justify-center"
        style={{ perspective: "1400px" }}
      >
        {/* Dynamic Background Ambient Glow */}
        <div
          className="absolute inset-4 rounded-3xl bg-gradient-to-tr from-accent/20 via-transparent to-secondary/15 blur-2xl opacity-60 pointer-events-none transition-opacity duration-500"
          style={{ opacity: isHovered ? 0.9 : 0.5 }}
        />

        {/* Technical Millimeter Grid Overlay in Viewport */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-border-subtle/60 pointer-events-none overflow-hidden">
          {/* Corner Registration Crosshairs */}
          <span className="absolute top-2.5 left-2.5 text-[9px] font-mono text-text-muted/40">+ 0.0mm</span>
          <span className="absolute top-2.5 right-2.5 text-[9px] font-mono text-text-muted/40">FOGRA39 +</span>
          <span className="absolute bottom-2.5 left-2.5 text-[9px] font-mono text-text-muted/40">+ CTP 2400</span>
          <span className="absolute bottom-2.5 right-2.5 text-[9px] font-mono text-text-muted/40">±0.2mm +</span>
        </div>

        {/* =========================================================================
            THE 3D SPECIMEN ARTIFACT SHELL (Transformed via CSS 3D & Framer Motion)
            ========================================================================= */}
        <motion.div
          animate={{
            rotateX: rotation.x,
            rotateY: rotation.y,
            scale: activePhase === "exploded" ? 0.92 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 24,
            mass: 0.8,
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative w-[88%] h-[82%] rounded-2xl flex items-center justify-center shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]"
        >
          {/* ================================================================
              PHASE 1: THE MONOLITH (Hero State: Closed Luxury Packaging Box)
              ================================================================ */}
          {activePhase === "monolith" && (
            <div
              className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#18181b] via-[#121214] to-[#09090b] border border-white/15 p-4 sm:p-6 flex flex-col justify-between overflow-hidden shadow-2xl"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Dynamic Foil Reflection Light Sweep */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                  background:
                    activeFinish === "gold"
                      ? `radial-gradient(circle at ${lightPos.x}% ${lightPos.y}%, rgba(245, 158, 11, 0.45), transparent 65%)`
                      : activeFinish === "spot-uv"
                      ? `radial-gradient(circle at ${lightPos.x}% ${lightPos.y}%, rgba(255, 255, 255, 0.55), transparent 55%)`
                      : `radial-gradient(circle at ${lightPos.x}% ${lightPos.y}%, rgba(255, 255, 255, 0.15), transparent 75%)`,
                }}
              />

              {/* Specimen Header */}
              <div className="flex justify-between items-start relative z-10" style={{ transform: "translateZ(25px)" }}>
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-accent font-bold">
                    Physical Specimen 01
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-text-light tracking-tight mt-0.5">
                    Rigid Luxury Box &amp; Monocarton
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-black/60 border border-white/15 text-[10px] font-mono text-accent font-bold">
                  600+ GSM
                </span>
              </div>

              {/* Center Artwork */}
              <div className="my-auto relative z-10 flex items-center justify-center py-2" style={{ transform: "translateZ(45px)" }}>
                <div className="relative w-full h-32 sm:h-40 flex items-center justify-center">
                  <Image
                    src="/images/Card/box_designing.png"
                    alt="Design N Print Luxury Box"
                    fill
                    className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
                    priority
                  />
                </div>
              </div>

              {/* Specimen Footer & Finish Switcher */}
              <div className="flex items-center justify-between border-t border-white/10 pt-2.5 relative z-10" style={{ transform: "translateZ(20px)" }}>
                <div className="text-[10px] text-text-light-muted">
                  <span className="text-text-light font-bold block">European Kappa Core</span>
                  <span className="text-accent">Zero-Crack Fold Scoring</span>
                </div>
                <div className="flex items-center gap-1">
                  {(["gold", "spot-uv", "velvet"] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setActiveFinish(f)}
                      className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase transition-all ${
                        activeFinish === f
                          ? "bg-accent text-primary-dark shadow-sm"
                          : "bg-black/40 text-text-light-muted hover:text-white"
                      }`}
                    >
                      {f === "gold" ? "Gold Foil" : f === "spot-uv" ? "Spot UV" : "Velvet"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================
              PHASE 2: CAD DIELINE UNFOLD (The Engineering Geometry)
              ================================================================ */}
          {activePhase === "dieline" && (
            <div
              className="relative w-full h-full rounded-2xl bg-[#090d16] border-2 border-secondary/40 p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-2xl font-mono"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Dieline Blueprint Grid Background */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #0ea5e9 1px, transparent 1px), linear-gradient(to bottom, #0ea5e9 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />

              {/* Top Blueprint Bar */}
              <div className="flex justify-between items-start relative z-10 text-[10px]">
                <div>
                  <span className="text-secondary font-bold tracking-widest uppercase">CAD DIELINE ARCHITECTURE</span>
                  <p className="text-text-light font-bold">STRUCTURAL FLAP &amp; CREASE MAP</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-secondary/15 text-secondary border border-secondary/30 font-bold">
                  PRECISION ±0.2mm
                </span>
              </div>

              {/* Center Dieline SVG Diagram */}
              <div className="my-auto relative z-10 flex items-center justify-center py-2" style={{ transform: "translateZ(35px)" }}>
                <svg viewBox="0 0 320 160" className="w-full max-w-[280px] h-auto text-secondary drop-shadow-[0_0_10px_rgba(14,165,233,0.3)]">
                  {/* Outer Cut Lines (Cyan Solid) */}
                  <rect x="30" y="25" width="260" height="110" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="none" rx="4" />
                  {/* Crease Fold Lines (Red Dashed) */}
                  <line x1="90" y1="25" x2="90" y2="135" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="4 3" />
                  <line x1="160" y1="25" x2="160" y2="135" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="4 3" />
                  <line x1="230" y1="25" x2="230" y2="135" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="4 3" />
                  {/* Dust Flaps */}
                  <polygon points="90,25 105,10 145,10 160,25" fill="#0ea5e9" fillOpacity="0.1" stroke="#0ea5e9" strokeWidth="1" />
                  <polygon points="160,25 175,10 215,10 230,25" fill="#0ea5e9" fillOpacity="0.1" stroke="#0ea5e9" strokeWidth="1" />
                  {/* Lock Bottom Crash Lock Flap */}
                  <polygon points="90,135 100,150 150,150 160,135" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="1" />
                  {/* Bleed Safety Zone Line */}
                  <rect x="22" y="17" width="276" height="126" fill="none" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.6" />
                </svg>
              </div>

              {/* Dieline Legend */}
              <div className="flex items-center justify-between text-[9px] text-text-light-muted border-t border-white/10 pt-2 relative z-10">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-0.5 bg-secondary" />
                  <span>Cut Line</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-0.5 bg-red-500 border-dashed" />
                  <span>Crease / Score</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-0.5 bg-amber-400" />
                  <span>3.0mm Bleed</span>
                </span>
              </div>
            </div>
          )}

          {/* ================================================================
              PHASE 3: SCALE & PROPORTIONS MORPHING (Card -> Carton -> Rigid)
              ================================================================ */}
          {activePhase === "scale" && (
            <div
              className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#18181b] via-[#121214] to-[#09090b] border border-white/15 p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-2xl"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Header */}
              <div className="flex justify-between items-start relative z-10" style={{ transform: "translateZ(20px)" }}>
                <div>
                  <span className="text-[9px] font-mono uppercase text-accent font-bold">Substrate Thickness Engine</span>
                  <h4 className="text-sm sm:text-base font-bold text-text-light">
                    {scaleMode === "card"
                      ? "450 GSM Royal Business Card"
                      : scaleMode === "carton"
                      ? "350 GSM Medicine Monocarton"
                      : "600+ GSM Solid Rigid Box"}
                  </h4>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface border border-white/15 text-[10px] font-mono text-accent">
                  {scaleMode === "card" ? "0.45mm Caliper" : scaleMode === "carton" ? "0.62mm Caliper" : "2.2mm Kappa Core"}
                </span>
              </div>

              {/* Visual 3D Form Factor Display */}
              <div className="my-auto relative z-10 flex items-center justify-center py-2" style={{ transform: "translateZ(40px)" }}>
                <motion.div
                  key={scaleMode}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative flex items-center justify-center"
                >
                  {scaleMode === "card" && (
                    <div className="w-48 h-28 rounded-lg bg-gradient-to-tr from-zinc-800 to-zinc-900 border-2 border-accent/40 shadow-xl p-3 flex flex-col justify-between">
                      <span className="text-[9px] font-mono text-accent font-bold">450 GSM COTTON IVORY</span>
                      <p className="text-xs font-bold text-white tracking-wider">K. PATEL &amp; ASSOCIATES</p>
                      <div className="flex justify-between text-[8px] text-zinc-400">
                        <span>Gilded Foil Rim</span>
                        <span>Velvet Lamination</span>
                      </div>
                    </div>
                  )}

                  {scaleMode === "carton" && (
                    <div className="w-36 h-40 rounded-xl bg-gradient-to-b from-blue-950 to-zinc-900 border-2 border-secondary/40 shadow-xl p-3 flex flex-col justify-between">
                      <span className="text-[9px] font-mono text-secondary font-bold">CYBER XL BOARD</span>
                      <div className="my-auto text-center">
                        <p className="text-xs font-bold text-white">AZITHROMYCIN 500</p>
                        <span className="text-[8px] text-zinc-400">Crash-Lock Bottom</span>
                      </div>
                      <span className="text-[8px] font-mono text-green-400">GS1 DataMatrix OK</span>
                    </div>
                  )}

                  {scaleMode === "rigid" && (
                    <div className="w-44 h-36 rounded-2xl bg-gradient-to-br from-amber-950/40 via-zinc-900 to-black border-2 border-accent shadow-2xl p-4 flex flex-col justify-between">
                      <span className="text-[9px] font-mono text-accent font-bold">KAPPA RIGID CORE</span>
                      <p className="text-xs font-black text-white text-center">PERFUME LUXE 100ML</p>
                      <div className="flex justify-between text-[8px] text-amber-300">
                        <span>Magnetic Flap</span>
                        <span>Zero Crushing</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Mode Select Buttons */}
              <div className="flex items-center justify-center gap-1.5 pt-2 border-t border-white/10 relative z-10" style={{ transform: "translateZ(20px)" }}>
                {(["card", "carton", "rigid"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setScaleMode(m)}
                    className={`flex-1 py-1 px-2 rounded text-[10px] font-bold transition-all ${
                      scaleMode === m
                        ? "bg-accent text-primary-dark shadow-sm"
                        : "bg-surface text-text-light-muted hover:text-white"
                    }`}
                  >
                    {m === "card" ? "Visiting Card" : m === "carton" ? "Mono Carton" : "Rigid Box"}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================
              PHASE 4: DUAL-SURFACE SPLIT (Amateur vs Luxury Scan Inspection)
              ================================================================ */}
          {activePhase === "split" && (
            <div
              className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/15"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* After: Luxury Layer (Underneath Full Background) */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1c1917] via-[#121214] to-[#09090b] p-4 sm:p-5 flex flex-col justify-between text-text-light">
                <div className="flex justify-between items-start text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-accent text-primary-dark font-bold">
                    DESIGN N PRINT LUXURY
                  </span>
                  <span className="text-accent font-mono">450 GSM + GOLD FOIL</span>
                </div>

                <div className="my-auto text-center py-2" style={{ transform: "translateZ(30px)" }}>
                  <h4 className="text-base sm:text-lg font-black text-text-light tracking-wide">
                    EXECUTIVE BRAND FINISH
                  </h4>
                  <p className="text-xs text-amber-300 mt-1">Velvet Soft-Touch + Raised 3D Spot UV</p>
                </div>

                <div className="flex justify-between text-[9px] text-text-light-muted border-t border-white/10 pt-2">
                  <span>Zero Edge Fraying</span>
                  <span className="text-whatsapp font-bold">100% Pre-Print Proof</span>
                </div>
              </div>

              {/* Before: Ordinary Flat Print (Clipped by splitPos) */}
              <div
                className="absolute inset-0 bg-[#e2e8f0] text-gray-800 p-4 sm:p-5 flex flex-col justify-between transition-all duration-75"
                style={{ clipPath: `polygon(0 0, ${splitPos}% 0, ${splitPos}% 100%, 0 100%)` }}
              >
                <div className="flex justify-between items-start text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-gray-300 text-gray-700 font-bold">
                    ORDINARY FLAT PRINT
                  </span>
                  <span className="text-gray-500 font-mono">250 GSM UNCOATED</span>
                </div>

                <div className="my-auto text-center py-2">
                  <h4 className="text-base sm:text-lg font-bold text-gray-600">
                    Washed Out Color Tones
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">No Foil • Easily Bends • Prone to Cracking</p>
                </div>

                <div className="flex justify-between text-[9px] text-gray-500 border-t border-gray-300 pt-2">
                  <span>Lightweight Stock</span>
                  <span>Unverified CMYK</span>
                </div>
              </div>

              {/* Laser Split Divider Bar */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-accent z-30 pointer-events-none shadow-[0_0_12px_2px_rgba(245,158,11,0.8)]"
                style={{ left: `${splitPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-accent text-primary-dark flex items-center justify-center text-[10px] font-bold shadow-lg">
                  ↔
                </div>
              </div>

              {/* Interactive Split Controller Range Input */}
              <div className="absolute bottom-2 left-6 right-6 z-40 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 flex items-center gap-2">
                <span className="text-[9px] text-text-light-muted font-mono shrink-0">Scan:</span>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={splitPos}
                  onChange={(e) => setSplitPos(Number(e.target.value))}
                  className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-ew-resize accent-accent"
                />
                <span className="text-[9px] text-accent font-mono shrink-0">{splitPos}%</span>
              </div>
            </div>
          )}

          {/* ================================================================
              PHASE 5: THE SHOWSTOPPER — EXPLODED 4-LAYER 3D STACK
              ================================================================ */}
          {activePhase === "exploded" && (
            <div
              className="relative w-full h-full flex items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Layer 1 (Bottom, Z: -60px): Virgin Greyboard Core */}
              <motion.div
                animate={{
                  z: -65,
                  rotateX: 12,
                  y: 40,
                }}
                className={`absolute w-[82%] h-[68%] rounded-xl bg-[#27272a] border border-white/20 p-3 flex flex-col justify-between shadow-2xl cursor-pointer transition-all ${
                  explodedLayer === 1 ? "ring-2 ring-accent" : ""
                }`}
                onClick={() => setExplodedLayer(1)}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex justify-between items-center text-[9px] text-zinc-300 font-mono">
                  <span className="font-bold">LAYER 1 (CORE SUBSTRATE)</span>
                  <span className="text-accent font-bold">450 GSM</span>
                </div>
                <p className="text-[11px] font-bold text-white text-center">
                  Heavy Virgin Board Core (Zero-Sag Caliper)
                </p>
                <span className="text-[8px] text-zinc-400">100% Recycled Rigid Fiber Base</span>
              </motion.div>

              {/* Layer 2 (Z: -20px): 4-Color High-Definition CMYK Ink Layer */}
              <motion.div
                animate={{
                  z: -15,
                  rotateX: 12,
                  y: 12,
                }}
                className={`absolute w-[82%] h-[68%] rounded-xl bg-gradient-to-r from-cyan-900/60 via-purple-900/60 to-amber-900/60 border border-cyan-400/30 backdrop-blur-xs p-3 flex flex-col justify-between shadow-xl cursor-pointer transition-all ${
                  explodedLayer === 2 ? "ring-2 ring-secondary" : ""
                }`}
                onClick={() => setExplodedLayer(2)}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex justify-between items-center text-[9px] text-cyan-300 font-mono">
                  <span className="font-bold">LAYER 2 (CMYK IMPRESSION)</span>
                  <span className="text-secondary font-bold">2400 DPI</span>
                </div>
                <p className="text-[11px] font-bold text-white text-center">
                  Heidelberg CTP Micro-Dot Inking
                </p>
                <span className="text-[8px] text-cyan-200">Spectrophotometer Calibrated PMS</span>
              </motion.div>

              {/* Layer 3 (Z: +25px): Thermal Velvet Matte Protection Film */}
              <motion.div
                animate={{
                  z: 35,
                  rotateX: 12,
                  y: -18,
                }}
                className={`absolute w-[82%] h-[68%] rounded-xl bg-white/10 border border-white/30 backdrop-blur-md p-3 flex flex-col justify-between shadow-xl cursor-pointer transition-all ${
                  explodedLayer === 3 ? "ring-2 ring-white" : ""
                }`}
                onClick={() => setExplodedLayer(3)}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex justify-between items-center text-[9px] text-white font-mono">
                  <span className="font-bold">LAYER 3 (VELVET FILM)</span>
                  <span className="text-green-300 font-bold">SOFT-TOUCH</span>
                </div>
                <p className="text-[11px] font-bold text-white text-center">
                  Peach-Skin Anti-Scuff Thermal Lamination
                </p>
                <span className="text-[8px] text-zinc-300">Fingerprint Resistant Surface</span>
              </motion.div>

              {/* Layer 4 (Top, Z: +80px): Raised Spot UV & Stamped Brass Gold Foil */}
              <motion.div
                animate={{
                  z: 85,
                  rotateX: 12,
                  y: -48,
                }}
                className={`absolute w-[82%] h-[68%] rounded-xl bg-gradient-to-tr from-accent/30 via-yellow-400/20 to-transparent border-2 border-accent shadow-[0_15px_35px_rgba(245,158,11,0.4)] backdrop-blur-md p-3 flex flex-col justify-between cursor-pointer transition-all ${
                  explodedLayer === 4 ? "ring-2 ring-accent" : ""
                }`}
                onClick={() => setExplodedLayer(4)}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex justify-between items-center text-[9px] text-amber-200 font-mono">
                  <span className="font-bold">LAYER 4 (TACTILE EMBELLISHMENT)</span>
                  <span className="text-accent font-black">24K FOIL + SPOT UV</span>
                </div>
                <p className="text-xs font-black text-amber-300 text-center tracking-wider">
                  HOT STAMPED BRASS DIE EMBOSSING
                </p>
                <span className="text-[8px] text-amber-200">Raised Gloss Polymer Accents</span>
              </motion.div>

              {/* Exploded Info Pill */}
              <div className="absolute -bottom-2 z-40 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[10px] text-text-light">
                <span className="text-accent font-bold">Z-Axis Stack: </span>
                <span>4 Distinct Industrial Engineering Layers</span>
              </div>
            </div>
          )}

          {/* ================================================================
              PHASE 6: THE READY-TO-SHIP SEALED CARTON (Golden Seal Stamp)
              ================================================================ */}
          {activePhase === "sealed" && (
            <div
              className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#1c1917] via-[#121214] to-[#09090b] border-2 border-accent/60 p-4 sm:p-6 flex flex-col justify-between overflow-hidden shadow-2xl"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Header */}
              <div className="flex justify-between items-start relative z-10" style={{ transform: "translateZ(25px)" }}>
                <div>
                  <span className="text-[9px] font-mono text-whatsapp uppercase font-bold flex items-center gap-1">
                    <FaCheck className="text-[8px]" /> Quality Inspection Passed
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-text-light tracking-tight mt-0.5">
                    Ready for Same-Day Dispatch
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded bg-accent/20 border border-accent/40 text-[10px] font-mono text-accent font-bold">
                  NARODA PRESS
                </span>
              </div>

              {/* Center 3D Wax Seal Badge */}
              <div className="my-auto relative z-10 flex flex-col items-center justify-center py-2" style={{ transform: "translateZ(50px)" }}>
                <motion.div
                  initial={{ scale: 0.5, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 220 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-700 p-1 shadow-[0_0_30px_rgba(245,158,11,0.6)] flex items-center justify-center border-2 border-white/40"
                >
                  <div className="w-full h-full rounded-full bg-[#18181b] flex flex-col items-center justify-center text-center p-1 border border-accent">
                    <FaShieldAlt className="text-accent text-lg" />
                    <span className="text-[7px] font-mono font-black text-accent uppercase tracking-tighter mt-0.5">
                      100% PROOF
                    </span>
                    <span className="text-[6px] text-zinc-400 font-mono">SIGN-OFF</span>
                  </div>
                </motion.div>
                <p className="text-xs font-bold text-text-light mt-3">Tamper-Evident Delivery Box</p>
                <p className="text-[10px] text-text-muted">Direct Van Dispatch Across Ahmedabad GIDC</p>
              </div>

              {/* Footer WhatsApp Link */}
              <div className="flex items-center justify-between text-[10px] text-text-light-muted border-t border-white/10 pt-2.5 relative z-10" style={{ transform: "translateZ(20px)" }}>
                <span>Order #DNP-2026</span>
                <span className="text-whatsapp font-bold">24-48h Rush Guaranteed</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Dynamic Interactive Hint */}
        <div className="absolute -bottom-4 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full border border-border-subtle text-[10px] font-mono text-text-muted shadow-sm flex items-center gap-1.5 pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span>Move cursor / touch drag to tilt 3D specimen</span>
        </div>
      </div>
    </div>
  );
}
