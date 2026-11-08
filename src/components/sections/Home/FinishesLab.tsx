"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLayerGroup,
  FaCheck,
  FaGem,
  FaSun,
  FaHandPointer,
  FaShieldAlt,
} from "react-icons/fa";

interface FinishDetail {
  id: string;
  name: string;
  category: string;
  badge: string;
  tagline: string;
  description: string;
  tactileFeel: string;
  recommendedStock: string;
  bestFor: string[];
}

const finishesData: FinishDetail[] = [
  {
    id: "gold-foil",
    name: "Hydraulic Gold & Metallic Foil Stamping",
    category: "Metallic Embellishment",
    badge: "24K Metallic Sheen",
    tagline: "Heated brass dies permanently bonding metallic foil onto card fibers.",
    description:
      "Unlike metallic ink that looks dull once dry, hot foil stamping uses pressure and thermal heat to stamp actual metallic foil into the substrate, leaving a subtle tactile depression that catches light from all angles.",
    tactileFeel: "Smooth, slightly debossed metallic line with crisp sharp edges",
    recommendedStock: "350–450 GSM Art Card, Cotton Ivory, MetPET Board",
    bestFor: ["Executive Business Cards", "Rigid Perfume Boxes", "Certificates", "Presentation Folders"],
  },
  {
    id: "spot-uv",
    name: "Raised 3D Spot UV Polymer Gloss",
    category: "Tactile Dimension",
    badge: "High-Gloss Relief",
    tagline: "Transparent dimensional polymer cured instantly under UV lamps.",
    description:
      "Creates an irresistible contrast between a soft matte background and glass-smooth raised glossy details. Sliding fingers across the card reveals a clear 3D tactile elevation.",
    tactileFeel: "Glass-like raised gloss height standing proud above matte surface",
    recommendedStock: "300–450 GSM Coated Board with Matte Thermal Lamination",
    bestFor: ["Luxury Mono Cartons", "Product Catalog Covers", "Corporate Folders", "Cosmetic Boxes"],
  },
  {
    id: "velvet-matte",
    name: "Soft-Touch Velvet Thermal Lamination",
    category: "Surface Texture",
    badge: "Peach-Skin Sensation",
    tagline: "Micro-textured thermal film delivering an ultra-plush velvety sensation.",
    description:
      "Eliminates cheap plastic shine and fingerprint marks. Soft-touch velvet transforms everyday paper into a rich textile-like sensation while providing scratch resistance during unboxing.",
    tactileFeel: "Plush, rose-petal matte touch with zero fingerprint smudging",
    recommendedStock: "250–450 GSM Coated Art Paper & Duplex Board",
    bestFor: ["Premium Visiting Cards", "Rigid Box Outer Wrap", "Pharma Packaging"],
  },
  {
    id: "emboss-deboss",
    name: "Sculpted 3D Multi-Level Embossing",
    category: "Physical Relief",
    badge: "Ink-Free 3D Height",
    tagline: "Custom CNC brass counter-dies pressing paper fibers into physical relief.",
    description:
      "No ink needed to leave a permanent mark. Blind embossing raises company insignias and brand badges out of the paper sheet, allowing clients to literally touch the contours of your identity.",
    tactileFeel: "Curved 3D physical contour rising up from the reverse side",
    recommendedStock: "Heavyweight 350+ GSM Virgin Board with Long Paper Fibers",
    bestFor: ["Company Letterheads", "Security Certificates", "Jewelry Tags"],
  },
  {
    id: "drip-off",
    name: "Hybrid Drip-Off Texture Coating",
    category: "Micro-Texture Pattern",
    badge: "Inline Matte + Gloss",
    tagline: "Single-pass offset reaction coating producing fine sand-textured contrast.",
    description:
      "Specialty varnish reaction creating fine granulated orange-peel tactile textures across designated areas while leaving product photos brilliantly glossy in a single high-speed press run.",
    tactileFeel: "Fine sand-cast micro texture contrasting against mirror gloss",
    recommendedStock: "250–400 GSM ITC Cyber XL & FBB Folding Box Board",
    bestFor: ["FMCG Mono Cartons", "Agrochemical Packaging", "Electronics Sleeves"],
  },
];

export default function FinishesLab() {
  const [selectedFinish, setSelectedFinish] = useState<FinishDetail>(finishesData[0]);
  const [activeLayer, setActiveLayer] = useState<number>(4);

  return (
    <section className="py-16 sm:py-20 bg-surface border-b border-border-subtle font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent-light/50 px-3.5 py-1 rounded-full border border-accent/20">
            The Craftsmanship &amp; Substrate Lab
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-text-main mt-3 tracking-tight">
            Tactile Finishes &amp; 3D Layer Architecture
          </h2>
          <p className="text-sm sm:text-base text-text-subtle mt-3 leading-relaxed">
            Screens are flat, but packaging is experienced through touch, weight, and directional light. Inspect how our 4 industrial finishing layers interact in physical space.
          </p>
        </div>

        {/* 2-Column Explorer */}
        <div className="grid lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Left Column: Finish Selection Cards */}
          <div className="lg:col-span-5 space-y-2.5">
            {finishesData.map((f, idx) => {
              const isSelected = selectedFinish.id === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelectedFinish(f)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                    isSelected
                      ? "bg-surface-light border-accent text-text-main shadow-md ring-1 ring-accent/30"
                      : "bg-surface border-border-subtle text-text-subtle hover:border-accent/40 hover:bg-surface-light"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 transition-colors ${
                        isSelected
                          ? "bg-accent text-primary-dark font-black"
                          : "bg-surface-muted text-text-muted group-hover:bg-accent/20 group-hover:text-accent"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <div>
                      <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${isSelected ? "text-accent" : "text-text-muted"}`}>
                        {f.category}
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-text-main line-clamp-1">
                        {f.name}
                      </h4>
                    </div>
                  </div>
                  <span className={`text-xs font-bold transition-opacity ${isSelected ? "text-accent opacity-100" : "text-text-muted opacity-0 group-hover:opacity-100"}`}>
                    Inspect →
                  </span>
                </button>
              );
            })}

            {/* Interactive Layer Breakdown Selector */}
            <div className="p-4 rounded-xl bg-surface-light border border-border-subtle mt-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted block mb-2 font-bold">
                Inspect 4-Layer Z-Stack Architecture:
              </span>
              <div className="grid grid-cols-4 gap-1.5 text-center">
                {[
                  { layer: 1, name: "1. Core" },
                  { layer: 2, name: "2. Ink" },
                  { layer: 3, name: "3. Film" },
                  { layer: 4, name: "4. Foil/UV" },
                ].map((l) => (
                  <button
                    key={l.layer}
                    type="button"
                    onClick={() => setActiveLayer(l.layer)}
                    className={`py-1.5 px-1 rounded-md text-[10px] font-mono font-bold transition-all ${
                      activeLayer === l.layer
                        ? "bg-accent text-primary-dark shadow-xs"
                        : "bg-surface border border-border-subtle text-text-muted hover:text-text-main"
                    }`}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Specimen Stage & Technical Detail */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFinish.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl sm:rounded-3xl bg-surface-light border border-border-subtle shadow-xl p-5 sm:p-8"
              >
                {/* Visual Tactile Demonstration Box */}
                <div className="w-full min-h-[170px] sm:min-h-0 aspect-auto sm:aspect-[16/7] rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1c1917] via-[#121214] to-[#09090b] p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden mb-6 border border-white/15">
                  {/* Visual Shimmer Ambient Glow */}
                  <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/30 via-transparent to-transparent" />

                  <div className="flex justify-between items-start relative z-10 text-[10px] font-mono">
                    <span className="px-2.5 py-0.5 rounded-full bg-accent/20 border border-accent/40 text-accent font-bold">
                      {selectedFinish.badge}
                    </span>
                    <span className="text-text-light-muted">HEIDELBERG LAB SPEC</span>
                  </div>

                  <div className="relative z-10 text-center my-3">
                    <h3 className="text-lg sm:text-2xl font-black text-text-light tracking-tight">
                      {selectedFinish.name}
                    </h3>
                    <p className="text-xs text-amber-200/90 mt-1 italic">
                      &ldquo;{selectedFinish.tagline}&rdquo;
                    </p>
                  </div>

                  <div className="flex justify-between items-end text-[9px] text-text-light-muted font-mono relative z-10 border-t border-white/10 pt-2">
                    <span>100% THERMAL BONDING</span>
                    <span className="text-whatsapp font-bold">ZERO SCUFF VERIFIED</span>
                  </div>
                </div>

                {/* Explanation Details */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-text-main mb-1.5">
                      How It Performs In Real World Use
                    </h4>
                    <p className="text-xs sm:text-sm text-text-subtle leading-relaxed">
                      {selectedFinish.description}
                    </p>
                  </div>

                  {/* Tactile & Stock Specs Grid */}
                  <div className="grid sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-surface border border-border-subtle">
                      <span className="text-[10px] font-mono uppercase text-text-muted font-bold block mb-1">
                        Tactile Sensation:
                      </span>
                      <p className="text-xs font-semibold text-text-main">
                        {selectedFinish.tactileFeel}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-surface border border-border-subtle">
                      <span className="text-[10px] font-mono uppercase text-text-muted font-bold block mb-1">
                        Recommended Board Stock:
                      </span>
                      <p className="text-xs font-semibold text-text-main">
                        {selectedFinish.recommendedStock}
                      </p>
                    </div>
                  </div>

                  {/* Recommended Best Uses */}
                  <div className="pt-3 border-t border-border-subtle">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted font-bold block mb-2.5">
                      Ideal Commercial Applications:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedFinish.bestFor.map((item, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-surface border border-border-subtle text-xs text-text-main inline-flex items-center gap-1.5"
                        >
                          <FaCheck className="text-[9px] text-whatsapp" />
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
