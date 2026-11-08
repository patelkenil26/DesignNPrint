"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaWhatsapp,
  FaShieldAlt,
  FaBolt,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaLayerGroup,
  FaRulerCombined,
} from "react-icons/fa";
import LivingSpecimen3D, { SpecimenPhase } from "./LivingSpecimen3D";

export default function HeroSection() {
  const [activePhase, setActivePhase] = useState<SpecimenPhase>("monolith");

  return (
    <section className="relative overflow-hidden bg-surface py-10 sm:py-16 lg:py-20 border-b border-border-subtle font-poppins">
      {/* Background Lighting & Technical Print Calibration Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-accent/15 via-secondary/10 to-transparent rounded-full blur-[120px] opacity-70" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />

        {/* Technical Pre-Press Crop & Color Bar Calibration */}
        <div className="absolute top-3 left-4 sm:left-8 text-text-muted/40 font-mono text-[10px] hidden sm:flex items-center gap-3 select-none">
          <span>+ REG: CMYK 100%</span>
          <span>BLEED: 3.0mm</span>
          <span>PROFILE: FOGRA39</span>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-cyan-500 rounded-xs" title="Cyan" />
            <span className="w-2.5 h-2.5 bg-pink-500 rounded-xs" title="Magenta" />
            <span className="w-2.5 h-2.5 bg-yellow-400 rounded-xs" title="Yellow" />
            <span className="w-2.5 h-2.5 bg-zinc-900 border border-zinc-700 rounded-xs" title="Black" />
          </div>
        </div>

        <div className="absolute top-3 right-4 sm:right-8 text-text-muted/40 font-mono text-[10px] hidden sm:block select-none">
          OFFSET_PRESS_NARODA_AHMEDABAD +
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Core Value Proposition & Actions */}
          <motion.div
            className="lg:col-span-6 flex flex-col items-start"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Live Press Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-muted/90 backdrop-blur-md border border-border-subtle text-xs font-medium text-text-main mb-5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-bold text-accent">Gujarat&apos;s High-Precision Offset Press</span>
              <span className="text-text-muted hidden sm:inline">• Since 2008 in Naroda</span>
            </div>

            {/* Main Headline with Industrial Print Accent */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-text-main tracking-tight leading-[1.14] mb-5">
              We Don&apos;t Just Print. <br />
              <span className="bg-gradient-to-r from-accent via-amber-400 to-secondary bg-clip-text text-transparent">
                We Make Your Brand Physical.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-text-subtle mb-7 max-w-xl leading-relaxed">
              From luxury gold-foiled rigid boxes and pharma mono cartons to textured corporate catalogues.
              Experience Heidelberg-grade precision with <strong className="text-text-main font-semibold">100% free digital 3D proof sign-off</strong> before plate exposure.
            </p>

            {/* Quick Interactive Phase Shortcuts (Gives client immediate control) */}
            <div className="w-full mb-6 p-2.5 rounded-xl bg-surface-light border border-border-subtle">
              <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted block mb-1.5 font-semibold">
                Explore 3D Physical Transformations:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: "monolith" as SpecimenPhase, label: "3D Monolith Box" },
                  { id: "dieline" as SpecimenPhase, label: "CAD Dieline" },
                  { id: "scale" as SpecimenPhase, label: "GSM Thickness" },
                  { id: "exploded" as SpecimenPhase, label: "Exploded 4 Layers" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActivePhase(item.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                      activePhase === item.id
                        ? "bg-accent text-primary-dark shadow-xs"
                        : "bg-surface border border-border-subtle text-text-muted hover:text-text-main"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dual Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-8">
              <Link
                href="/quote"
                className="inline-flex justify-center items-center gap-2.5 px-7 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-primary-dark font-extrabold shadow-md hover:shadow-lg transition-all duration-200 text-center uppercase tracking-wider text-xs sm:text-sm active:scale-98"
              >
                <FaBolt />
                <span>Instant Cost Estimator</span>
                <FaArrowRight className="text-xs" />
              </Link>

              <a
                href="https://wa.me/919725281074?text=Hi%20Design%20N%20Print,%20I%20want%20to%20discuss%20a%20custom%20print%20or%20packaging%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center gap-2.5 px-6 py-3.5 rounded-xl bg-surface-muted hover:bg-surface border border-border-subtle hover:border-accent text-text-main font-bold transition-all duration-200 text-center text-xs sm:text-sm shadow-xs"
              >
                <FaWhatsapp className="text-whatsapp text-lg" />
                <span>Chat with Press Head</span>
              </a>
            </div>

            {/* 4 Guarantees */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full pt-5 border-t border-border-subtle">
              <div className="flex items-center gap-2">
                <FaBolt className="text-accent text-base shrink-0" />
                <div className="text-[11px] leading-tight">
                  <p className="font-bold text-text-main">24–48h Rush</p>
                  <p className="text-text-muted">Direct Dispatch</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-secondary text-base shrink-0" />
                <div className="text-[11px] leading-tight">
                  <p className="font-bold text-text-main">3D Proof First</p>
                  <p className="text-text-muted">Zero Risk Signoff</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FaBoxOpen className="text-accent text-base shrink-0" />
                <div className="text-[11px] leading-tight">
                  <p className="font-bold text-text-main">From 100 Pcs</p>
                  <p className="text-text-muted">Low MOQ Startup</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-secondary text-base shrink-0" />
                <div className="text-[11px] leading-tight">
                  <p className="font-bold text-text-main">Naroda GIDC</p>
                  <p className="text-text-muted">Ahmedabad Plant</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: The 3D Living Print Specimen Stage */}
          <motion.div
            className="lg:col-span-6 flex flex-col items-center justify-center relative w-full"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <LivingSpecimen3D
              currentPhase={activePhase}
              onPhaseChange={setActivePhase}
              className="w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
