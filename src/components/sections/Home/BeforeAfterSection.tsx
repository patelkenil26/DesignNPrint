"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { FaArrowsAltH, FaCheck, FaTimes, FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";

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
    <section className="py-20 bg-surface-light border-b border-border-subtle font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary-bg px-3 py-1 rounded-full border border-secondary/20">
            Show, Don&apos;t Claim
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-text-main mt-3">
            Ordinary Print vs Design N Print Luxury Finish
          </h2>
          <p className="text-sm sm:text-base text-text-muted mt-3">
            Drag the slider to see how premium paperweight, precision color registration, and hot foil transforms everyday stationery into an executive statement.
          </p>
        </div>

        {/* Interactive Comparison Slider Container */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            className="relative aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-border-subtle cursor-ew-resize select-none"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* "After" Image: Premium Craftsmanship (Full Background) */}
            <div className="absolute inset-0 bg-primary-dark text-text-light flex items-center justify-center p-6 sm:p-12">
              <div className="relative w-full h-full max-w-lg rounded-2xl bg-primary-surface border-2 border-accent/40 shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
                {/* Gold foil reflection accent */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent/20 rounded-full blur-2xl pointer-events-none"></div>

                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <span className="text-xs font-mono text-accent font-bold tracking-widest uppercase">
                      Executive Identity
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-text-light mt-1">
                      K. PATEL &amp; ASSOCIATES
                    </h3>
                    <p className="text-xs text-text-light-muted">Global Architecture Studio</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-accent text-text-light text-[11px] font-bold shadow-md flex items-center gap-1">
                    <FaStar className="text-[10px]" />
                    <span>Gold Foil + Spot UV</span>
                  </span>
                </div>

                <div className="my-auto py-4 relative z-10">
                  <div className="h-1 w-24 bg-gradient-to-r from-accent to-accent-light rounded-full mb-3"></div>
                  <p className="text-xs sm:text-sm text-text-light leading-relaxed max-w-sm">
                    High-density 450 GSM Cotton Ivory board with metallic gold debossing and velvety soft-touch matte lamination.
                  </p>
                </div>

                <div className="flex justify-between items-end text-[11px] text-text-light-muted relative z-10 border-t border-border-dark pt-3">
                  <span>+91 97252 81074</span>
                  <span className="font-mono text-accent">350 DPI CMYK VERIFIED</span>
                </div>
              </div>
            </div>

            {/* "Before" Layer: Standard Amateur Print (Clipped by sliderPos) */}
            <div
              className="absolute inset-0 bg-[#e2e8f0] text-gray-800 flex items-center justify-center p-6 sm:p-12 overflow-hidden transition-all duration-75"
              style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
            >
              <div className="relative w-full h-full max-w-lg rounded-2xl bg-white border border-gray-300 shadow-sm p-6 sm:p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                      Standard Print
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mt-1">
                      K. PATEL &amp; ASSOCIATES
                    </h3>
                    <p className="text-xs text-gray-400">Architecture Studio</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-gray-200 text-gray-600 text-[11px]">
                    Standard 250 GSM
                  </span>
                </div>

                <div className="my-auto py-4">
                  <div className="h-0.5 w-16 bg-gray-300 mb-3"></div>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-sm">
                    Ordinary lightweight paper, washed-out color tones, no foil effects, and prone to corner bending.
                  </p>
                </div>

                <div className="flex justify-between items-end text-[11px] text-gray-400 border-t border-gray-200 pt-3">
                  <span>+91 97252 81074</span>
                  <span className="font-mono">Uncoated Stock</span>
                </div>
              </div>
            </div>

            {/* Slider Divider Bar */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-accent z-30 shadow-[0_0_15px_3px_var(--color-brand-accent)] pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-accent text-text-light flex items-center justify-center shadow-xl border-2 border-surface">
                <FaArrowsAltH className="text-sm" />
              </div>
            </div>

            {/* Badges on left and right */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 shadow-md">
                <FaTimes className="text-red-400 text-xs" />
                <span>Ordinary Flat Print</span>
              </span>
            </div>
            <div className="absolute top-4 right-4 z-20 pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-accent text-text-light text-xs font-semibold flex items-center gap-1.5 shadow-md">
                <FaCheck className="text-xs" />
                <span>Design N Print Finish</span>
              </span>
            </div>
          </div>

          <div className="text-center mt-4 text-xs text-text-muted flex items-center justify-center gap-2">
            <FaArrowLeft className="text-[10px] text-accent" />
            <span className="font-medium">Drag the slider horizontally to compare finishes</span>
            <FaArrowRight className="text-[10px] text-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}
