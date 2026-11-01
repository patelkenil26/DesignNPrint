"use client";

import React from "react";
import Link from "next/link";
import QuickEstimator from "@/components/sections/Home/QuickEstimator";
import { 
  FaWhatsapp, 
  FaFilePdf, 
  FaCheck, 
  FaShieldAlt, 
  FaBolt, 
  FaPhoneAlt,
  FaRulerCombined,
  FaPalette,
  FaSearchPlus,
  FaFont
} from "react-icons/fa";

export default function QuotePage() {
  return (
    <div className="font-poppins bg-surface min-h-screen">
      {/* Header Banner */}
      <section className="bg-surface-light border-b border-border-subtle py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-text-muted mb-4">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span>›</span>
            <span className="text-text-main font-semibold">Instant Quote &amp; Cost Estimator</span>
          </div>

          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent-light/50 px-3 py-1 rounded-full border border-accent/20">
              Transparent Pricing &amp; Fast Estimates
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-text-main mt-3 tracking-tight">
              Instant Print Estimate &amp; Artwork Consultation
            </h1>
            <p className="text-sm sm:text-base text-text-subtle mt-3 leading-relaxed">
              Calculate price ranges, minimum order quantities, and estimated turnaround times for your print project. No hidden setup charges, with free digital 3D proofing before production.
            </p>
          </div>
        </div>
      </section>

      {/* Estimator Tool Widget */}
      <QuickEstimator />

      {/* Pre-Flight Artwork Checklist & File Submission */}
      <section className="py-16 px-4 sm:px-8 bg-surface-light border-b border-border-subtle">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary-bg px-3 py-1 rounded-full border border-secondary/20">
              Before You Submit Files
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-main mt-2">
              Pre-Flight Artwork Checklist
            </h2>
            <p className="text-xs sm:text-sm text-text-muted mt-2">
              Follow these simple guidelines to ensure razor-sharp color registration and zero printing delays.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-surface border border-border-subtle shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center text-base mb-4">
                  <FaRulerCombined />
                </div>
                <h3 className="font-bold text-sm text-text-main mb-1.5">3mm Bleed Margin</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Extend background graphics 3mm beyond the final cut line to avoid white edges during trimming.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-border-subtle shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center text-base mb-4">
                  <FaPalette />
                </div>
                <h3 className="font-bold text-sm text-text-main mb-1.5">CMYK Color Mode</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Convert all RGB images to CMYK to prevent unexpected dull color shifts on offset paper plates.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-border-subtle shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center text-base mb-4">
                  <FaSearchPlus />
                </div>
                <h3 className="font-bold text-sm text-text-main mb-1.5">300 DPI Resolution</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Ensure raster graphics and photos are 300 DPI at actual printed size to eliminate pixelation.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-border-subtle shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center text-base mb-4">
                  <FaFont />
                </div>
                <h3 className="font-bold text-sm text-text-main mb-1.5">Convert Fonts to Curves</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Convert typography to outlines/curves in CDR or AI so missing fonts do not alter the layout.
                </p>
              </div>
            </div>
          </div>

          {/* Direct File Sharing Box */}
          <div className="mt-12 rounded-3xl bg-primary-dark text-text-light p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 border border-border-dark">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-text-light">Have Your Artwork Ready for Free Inspection?</h3>
              <p className="text-xs sm:text-sm text-text-light-muted mt-2 max-w-xl">
                Send your PDF, CDR, or AI file via WhatsApp or Email. Our prepress specialists will review it for resolution and bleed accuracy within 30 minutes at no cost.
              </p>
            </div>
            <a
              href="https://wa.me/919725281074?text=Hi%20Design%20N%20Print,%20I%20have%20my%20design%20file%20ready%20for%20inspection%20and%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-text-light text-sm font-bold shadow-lg transition-all shrink-0"
            >
              <FaWhatsapp className="text-lg" />
              <span>Share File via WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
