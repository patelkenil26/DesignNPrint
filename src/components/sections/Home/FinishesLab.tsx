"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLayerGroup, FaSun, FaFingerprint, FaShieldAlt, FaCheck } from "react-icons/fa";

interface FinishItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  visualEffect: string;
  bestFor: string[];
}

const finishesList: FinishItem[] = [
  {
    id: "gold-foil",
    name: "Metallic Gold & Rose-Gold Hot Foil",
    category: "Luxury Embellishment",
    tagline: "High-spec metallic foil heat-pressed directly into the substrate.",
    description: "Catches ambient lighting at every angle. Hot foil stamping leaves a slight crisp indent in the paper, making corporate logos and luxury badges instantly command executive attention.",
    visualEffect: "Golden metallic sheen with dynamic directional reflection",
    bestFor: ["Visiting Cards", "Perfume & Cosmetic Packaging", "Certificates", "Wedding Stationery"],
  },
  {
    id: "spot-uv",
    name: "Precision Raised Spot UV Gloss",
    category: "Tactile Contrast",
    tagline: "High-gloss liquid polymer cured with ultraviolet light over matte surface.",
    description: "Creates a mesmerizing contrast between silky matte paper and mirror-reflective glossy highlights. Running your fingertips over it gives a clear tactile 3D sensation.",
    visualEffect: "High-gloss glasslike shine over soft matte base",
    bestFor: ["Luxury Product Catalogues", "Pharma Packaging", "Brochure Covers", "Company Folders"],
  },
  {
    id: "soft-touch",
    name: "Velvet Soft-Touch Lamination",
    category: "Surface Texture",
    tagline: "Peach-skin thermal film that transforms paper into an ultra-velvety sensation.",
    description: "Unlike regular plastic lamination that scratches and leaves fingerprints, soft-touch velvet feels like luxury fabric. It is scuff-resistant and adds unmistakable weight.",
    visualEffect: "Ultra-matte anti-glare finish with rich deep blacks",
    bestFor: ["Premium Business Cards", "Rigid Box Sleeves", "Brand Identity Books"],
  },
  {
    id: "emboss",
    name: "Sculpted 3D Embossing & Debossing",
    category: "Physical Dimension",
    tagline: "Precision brass counter-dies physically raising the paper fibers into 3D relief.",
    description: "No ink needed to make an impact. Blind embossing raises logos out of the paper surface, allowing clients to literally feel the contours of your brand identity.",
    visualEffect: "Multi-level 3D physical height and shadow casting",
    bestFor: ["Executive Letterheads", "Security Certificates", "Jewelry Box Tags"],
  },
  {
    id: "rigid-board",
    name: "Heavyweight 350 to 600 GSM Boards",
    category: "Substrate & Caliber",
    tagline: "Industrial-grade high-density art cards and imported recycled kraft stocks.",
    description: "A business card or packaging box that bends in the hand damages perceived brand trust. We stock only zero-sag, heavyweight virgin board stocks that feel substantial.",
    visualEffect: "Stiff, unyielding caliber with razor-clean die-cut edges",
    bestFor: ["Product Hangtags", "Pharma Monocartons", "Doctor Files", "Rigid Folders"],
  },
];

export default function FinishesLab() {
  const [selectedFinish, setSelectedFinish] = useState<FinishItem>(finishesList[0]);

  return (
    <section className="py-20 bg-surface border-b border-border-subtle font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent-light/50 px-3 py-1 rounded-full border border-accent/20">
            The Craftsmanship Lab
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-text-main mt-3">
            Explore Tactile Finishes &amp; Paper Caliber
          </h2>
          <p className="text-sm sm:text-base text-text-muted mt-3">
            Digital screens are flat, but printing is an experience of touch and light. Learn what each premium finish delivers for your brand before placing an order.
          </p>
        </div>

        {/* 2-Column Interactive Finish Explorer */}
        <div className="grid lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Left Column: Finish Selection Buttons */}
          <div className="lg:col-span-5 space-y-3">
            {finishesList.map((item, idx) => {
              const isSelected = selectedFinish.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedFinish(item)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                    isSelected
                      ? "bg-primary-dark text-text-light border-border-dark shadow-xl ring-2 ring-accent/30"
                      : "bg-surface-light border-border-subtle text-text-main hover:bg-surface hover:border-accent/40"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
                        isSelected
                          ? "bg-accent text-text-light"
                          : "bg-surface-muted text-text-muted group-hover:bg-accent/20 group-hover:text-accent"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <div>
                      <p className={`text-xs uppercase tracking-wider font-semibold ${isSelected ? "text-accent" : "text-text-muted"}`}>
                        {item.category}
                      </p>
                      <h4 className="font-bold text-sm sm:text-base mt-0.5">
                        {item.name}
                      </h4>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold ${isSelected ? "text-accent" : "text-text-muted opacity-0 group-hover:opacity-100 transition-opacity"}`}>
                    View →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Preview Card & Detailed Breakdown */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFinish.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="rounded-3xl bg-surface border border-border-subtle shadow-xl p-6 sm:p-8 relative overflow-hidden"
              >
                {/* Visual Swatch Demo Box */}
                <div className="w-full aspect-[16/7] rounded-2xl bg-primary-dark p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden mb-8 border border-border-dark">
                  {/* Visual Shimmer/Effect simulation */}
                  <div className="absolute inset-0 pointer-events-none opacity-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/30 via-transparent to-transparent"></div>
                  
                  <div className="flex justify-between items-start relative z-10">
                    <span className="px-3 py-1 rounded-full bg-primary-surface border border-border-dark text-[11px] font-mono text-accent">
                      {selectedFinish.visualEffect}
                    </span>
                    <span className="text-text-light-muted text-xs font-mono">SPEC: DNP-LAB-2026</span>
                  </div>

                  <div className="relative z-10 text-center my-auto">
                    <p className="text-xl sm:text-2xl font-extrabold text-text-light tracking-wide">
                      {selectedFinish.name}
                    </p>
                    <p className="text-xs text-text-light-muted mt-1 italic">
                      &ldquo;{selectedFinish.tagline}&rdquo;
                    </p>
                  </div>

                  <div className="flex justify-between items-end text-[10px] text-text-light-muted font-mono relative z-10">
                    <span>CMYK OFFSET LAB</span>
                    <span>100% PRECISION CALIBRATION</span>
                  </div>
                </div>

                {/* Explanation Details */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-text-main">
                    Why Choose This Finish?
                  </h3>
                  <p className="text-sm text-text-subtle leading-relaxed">
                    {selectedFinish.description}
                  </p>

                  <div className="pt-4 border-t border-border-subtle">
                    <span className="text-xs font-bold uppercase tracking-wider text-text-muted block mb-3">
                      Recommended Applications:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedFinish.bestFor.map((item, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-lg bg-surface-light border border-border-subtle text-xs font-medium text-text-main inline-flex items-center gap-1.5"
                        >
                          <FaCheck className="text-[10px] text-whatsapp" />
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
