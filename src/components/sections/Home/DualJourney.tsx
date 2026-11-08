"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaFileUpload,
  FaPaintBrush,
  FaCheck,
  FaArrowRight,
  FaWhatsapp,
  FaRulerCombined,
  FaCogs,
  FaShieldAlt,
} from "react-icons/fa";

export default function DualJourney() {
  const [activeTab, setActiveTab] = useState<"print-ready" | "custom-cad">("print-ready");

  return (
    <section className="py-16 sm:py-20 bg-surface-light border-b border-border-subtle font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent-light/50 px-3.5 py-1 rounded-full border border-accent/20">
            Tailored To Your Readiness
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-text-main mt-3 tracking-tight">
            Two Clear Tracks. Zero Guesswork.
          </h2>
          <p className="text-sm sm:text-base text-text-subtle mt-3 leading-relaxed">
            Whether your vector dieline is production-ready or you need packaging engineers to build structural CAD boxes from scratch — we handle both with zero error tolerance.
          </p>

          {/* Quick Toggle on Mobile for focused viewing */}
          <div className="inline-flex sm:hidden p-1 bg-surface rounded-xl border border-border-subtle mt-6">
            <button
              type="button"
              onClick={() => setActiveTab("print-ready")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "print-ready"
                  ? "bg-accent text-primary-dark shadow-xs"
                  : "text-text-muted hover:text-text-main"
              }`}
            >
              1. Print-Ready Track
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("custom-cad")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "custom-cad"
                  ? "bg-accent text-primary-dark shadow-xs"
                  : "text-text-muted hover:text-text-main"
              }`}
            >
              2. Custom CAD Design
            </button>
          </div>
        </div>

        {/* 2 Track Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Track 1: Print-Ready Track */}
          <motion.div
            className={`rounded-2xl sm:rounded-3xl bg-surface border border-border-subtle p-6 sm:p-9 shadow-xs hover:shadow-xl hover:border-accent/40 transition-all flex flex-col justify-between group ${
              activeTab === "custom-cad" ? "hidden sm:flex" : "flex"
            }`}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-13 h-13 rounded-2xl bg-secondary-bg text-secondary flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                  <FaFileUpload />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-secondary font-bold px-2.5 py-1 rounded-md bg-secondary-bg border border-secondary/20">
                  Track 01 • Rapid Offset
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-text-main mb-3">
                &ldquo;I Have A Print-Ready Artwork File&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-text-subtle mb-6 leading-relaxed">
                Upload your PDF (PDF/X-1a preferred), CorelDraw CDR, or Illustrator AI file. Our prepress desk runs automated pre-flight verification for color separation, spot PMS inks, and 3mm safety bleeds before plate exposure.
              </p>

              {/* Pre-Flight Checklist */}
              <div className="p-4 rounded-xl bg-surface-light border border-border-subtle mb-6 space-y-2.5 text-xs text-text-main">
                <span className="text-[10px] font-mono uppercase text-text-muted font-bold block mb-1">
                  Automated Pre-Press Verifications:
                </span>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-whatsapp text-xs shrink-0" />
                  <span>300 DPI Halftone Resolution &amp; Curve Conversion</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-whatsapp text-xs shrink-0" />
                  <span>3.0mm External Bleed &amp; 4.0mm Safe Inner Margin</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-whatsapp text-xs shrink-0" />
                  <span>Free High-Resolution Digital 3D PDF Proof Sign-off</span>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/919725281074?text=Hi%20Design%20N%20Print,%20I%20have%20a%20print-ready%20file%20and%20need%20a%20fast%20turnaround%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center gap-2.5 w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-accent text-text-light hover:text-primary-dark font-bold transition-all duration-200 text-xs sm:text-sm shadow-sm"
            >
              <FaWhatsapp className="text-base text-whatsapp" />
              <span>Share File on WhatsApp for Instant Quote</span>
              <FaArrowRight className="text-xs" />
            </a>
          </motion.div>

          {/* Track 2: Custom Packaging CAD & Brand Design Track */}
          <motion.div
            className={`rounded-2xl sm:rounded-3xl bg-surface border border-border-subtle p-6 sm:p-9 shadow-xs hover:shadow-xl hover:border-accent/40 transition-all flex flex-col justify-between group ${
              activeTab === "print-ready" ? "hidden sm:flex" : "flex"
            }`}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-13 h-13 rounded-2xl bg-accent-light text-accent-hover flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                  <FaPaintBrush />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-bold px-2.5 py-1 rounded-md bg-accent-light/50 border border-accent/20">
                  Track 02 • Packaging CAD
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-text-main mb-3">
                &ldquo;I Need Custom Box Design &amp; Dielines&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-text-subtle mb-6 leading-relaxed">
                Work directly with our senior packaging engineers and graphic designers. We create custom lock-bottom dielines, pharmaceutical catch covers, bottle inserts, and luxury foil artwork tailored to your product dimensions.
              </p>

              {/* Engineering Capabilities */}
              <div className="p-4 rounded-xl bg-surface-light border border-border-subtle mb-6 space-y-2.5 text-xs text-text-main">
                <span className="text-[10px] font-mono uppercase text-text-muted font-bold block mb-1">
                  Structural Engineering Services:
                </span>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-whatsapp text-xs shrink-0" />
                  <span>Custom Laser-Cut Dielines (Tuck End, Crash Lock, Rigid Box)</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-whatsapp text-xs shrink-0" />
                  <span>Photorealistic 3D Digital Unboxing Mockup</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-whatsapp text-xs shrink-0" />
                  <span>Physical Unprinted White Dummy Sample Before Plate Run</span>
                </div>
              </div>
            </div>

            <Link
              href="/contact?subject=Brand%20Design%20and%20Packaging%20Consultation"
              className="inline-flex justify-center items-center gap-2 w-full py-3.5 px-6 rounded-xl bg-accent hover:bg-accent-hover text-primary-dark font-extrabold transition-all duration-200 text-xs sm:text-sm shadow-sm"
            >
              <span>Consult with Packaging Engineer</span>
              <FaArrowRight className="text-xs" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
