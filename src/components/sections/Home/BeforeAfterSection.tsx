"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaArrowsAltH,
  FaCheck,
  FaTimes,
  FaStar,
  FaArrowLeft,
  FaArrowRight,
  FaSearchPlus,
  FaShieldAlt,
  FaLayerGroup,
} from "react-icons/fa";

export default function BeforeAfterSection() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min((x / rect.width) * 100, 95));
    setSliderPos(percent);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging && e.buttons !== 1) return;
    handleMove(e.clientX);
  };

  return (
    <section className="py-16 sm:py-20 bg-surface-light border-b border-border-subtle font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary-bg px-3.5 py-1 rounded-full border border-secondary/20">
            Micro-Inspection Comparison
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-text-main mt-3 tracking-tight">
            Ordinary Commercial Print vs Design N Print Luxury Finish
          </h2>
          <p className="text-sm sm:text-base text-text-subtle mt-3 leading-relaxed">
            Drag the laser slider horizontally to inspect the difference that 450 GSM virgin caliper, zero-crack scoring, and 24K hot foil stamping make for your brand.
          </p>
        </div>

        {/* Comparison Slider Stage */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            className="relative min-h-[340px] sm:min-h-[360px] aspect-auto sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-border-subtle cursor-ew-resize select-none"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* "After" Layer: Design N Print Luxury Finish (Full Background) */}
            <div className="absolute inset-0 bg-[#09090b] text-text-light flex items-center justify-center p-4 sm:p-10">
              <div className="relative w-full h-full max-w-md rounded-2xl bg-[#18181b] border-2 border-accent/50 shadow-2xl p-5 sm:p-7 flex flex-col justify-between overflow-hidden">
                {/* Gold foil reflection glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-2xl pointer-events-none" />

                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <span className="text-[10px] font-mono text-accent font-bold tracking-widest uppercase">
                      Executive Identity
                    </span>
                    <h3 className="text-base sm:text-xl font-black text-text-light mt-0.5 tracking-tight">
                      K. PATEL &amp; ASSOCIATES
                    </h3>
                    <p className="text-[11px] text-text-light-muted">Global Architecture Studio</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-accent text-primary-dark text-[10px] sm:text-xs font-bold shadow-md flex items-center gap-1">
                    <FaStar className="text-[10px]" />
                    <span>Gold Foil + Spot UV</span>
                  </span>
                </div>

                <div className="my-auto py-3 relative z-10">
                  <div className="h-1 w-20 bg-gradient-to-r from-accent to-accent-light rounded-full mb-2.5" />
                  <p className="text-xs sm:text-sm text-text-light leading-relaxed">
                    High-density 450 GSM Cotton Ivory board with metallic hot stamped brass foil debossing and velvety soft-touch matte lamination.
                  </p>
                </div>

                <div className="flex justify-between items-end text-[10px] text-text-light-muted relative z-10 border-t border-white/10 pt-2.5">
                  <span className="text-whatsapp font-bold">Zero Edge Cracking</span>
                  <span className="font-mono text-accent font-bold">300 DPI CMYK VERIFIED</span>
                </div>
              </div>
            </div>

            {/* "Before" Layer: Ordinary Flat Print (Clipped by sliderPos) */}
            <div
              className="absolute inset-0 bg-[#e4e4e7] text-gray-800 flex items-center justify-center p-4 sm:p-10 overflow-hidden transition-all duration-75"
              style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
            >
              <div className="relative w-full h-full max-w-md rounded-2xl bg-white border border-gray-300 shadow-xs p-5 sm:p-7 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                      Standard Print
                    </span>
                    <h3 className="text-base sm:text-xl font-bold text-gray-700 mt-0.5 tracking-tight">
                      K. PATEL &amp; ASSOCIATES
                    </h3>
                    <p className="text-[11px] text-gray-400">Architecture Studio</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-gray-200 text-gray-600 text-[10px] sm:text-xs font-semibold">
                    Standard 250 GSM
                  </span>
                </div>

                <div className="my-auto py-3">
                  <div className="h-0.5 w-16 bg-gray-300 mb-2.5" />
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    Ordinary lightweight paper, washed-out faded tones, no foil effects, and prone to corner fraying and bending.
                  </p>
                </div>

                <div className="flex justify-between items-end text-[10px] text-gray-400 border-t border-gray-200 pt-2.5">
                  <span className="text-red-500">Prone to Crease Tear</span>
                  <span className="font-mono">Uncoated Paper Stock</span>
                </div>
              </div>
            </div>

            {/* Laser Slider Divider Bar */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-accent z-30 shadow-[0_0_15px_3px_rgba(245,158,11,0.8)] pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-accent text-primary-dark flex items-center justify-center shadow-xl border-2 border-surface font-black">
                <FaArrowsAltH className="text-xs sm:text-sm" />
              </div>
            </div>

            {/* Responsive Corner Badges */}
            <div className="absolute top-3 left-3 z-20 pointer-events-none">
              <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                <FaTimes className="text-red-400 text-[10px]" />
                <span>Ordinary Flat Print</span>
              </span>
            </div>
            <div className="absolute top-3 right-3 z-20 pointer-events-none">
              <span className="px-2.5 py-1 rounded-full bg-accent text-primary-dark text-[10px] sm:text-xs font-extrabold flex items-center gap-1.5 shadow-sm">
                <FaCheck className="text-[10px]" />
                <span>Design N Print Finish</span>
              </span>
            </div>
          </div>

          {/* Hint */}
          <div className="text-center mt-3 text-xs text-text-muted flex items-center justify-center gap-2">
            <FaArrowLeft className="text-[10px] text-accent" />
            <span className="font-medium">Drag slider horizontally to inspect tactile finishes</span>
            <FaArrowRight className="text-[10px] text-accent" />
          </div>

          {/* 3 Macro Inspection Cards */}
          <div className="grid sm:grid-cols-3 gap-3.5 mt-8">
            <div className="p-4 rounded-xl bg-surface border border-border-subtle">
              <div className="flex items-center gap-2 text-xs font-bold text-text-main mb-1">
                <FaCheck className="text-whatsapp text-xs" />
                <span>1. Zero-Crack Die Creasing</span>
              </div>
              <p className="text-[11px] text-text-subtle leading-relaxed">
                Precision calibrated steel rule dies maintain fiber integrity on folds without splitting or tearing.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface border border-border-subtle">
              <div className="flex items-center gap-2 text-xs font-bold text-text-main mb-1">
                <FaCheck className="text-whatsapp text-xs" />
                <span>2. 2400 DPI Dot Registration</span>
              </div>
              <p className="text-[11px] text-text-subtle leading-relaxed">
                CTP thermal laser imaging eliminates ink bleeding and preserves crisp 2D Pharmacodes and micro-text.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface border border-border-subtle">
              <div className="flex items-center gap-2 text-xs font-bold text-text-main mb-1">
                <FaCheck className="text-whatsapp text-xs" />
                <span>3. Hydraulic 24K Hot Stamping</span>
              </div>
              <p className="text-[11px] text-text-subtle leading-relaxed">
                Heated brass dies bond foil directly into card fibers for high-spec directional specular brilliance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
