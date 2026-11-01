"use client";

import React from "react";
import Link from "next/link";
import { FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaArrowRight, FaBoxOpen, FaCheckCircle, FaLayerGroup } from "react-icons/fa";

export default function CtaSection() {
  return (
    <section className="py-20 bg-surface border-t border-border-subtle font-poppins relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Luminous Elevated Card */}
        <div className="relative rounded-3xl bg-surface-light border border-border-subtle shadow-xl p-8 sm:p-14 overflow-hidden">
          
          {/* Subtle Accent Glow in Corner */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Heading & Swatch Kit Offer */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-light/50 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider">
                <FaBoxOpen className="text-xs" />
                <span>Sample Swatch Kit Available</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
                Want to Touch Physical Paper Swatches &amp; Box Dielines First?
              </h2>

              <p className="text-xs sm:text-sm text-text-subtle leading-relaxed">
                Before approving a 10,000-box production run, feel our 450 GSM virgin art card, test raised Spot UV coatings, and verify custom tuck-end carton folds in your hands.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-main">
                  <FaCheckCircle className="text-whatsapp" />
                  <span>Free Pre-Press 3D Proof</span>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-main">
                  <FaCheckCircle className="text-whatsapp" />
                  <span>CAD Dieline Calibration</span>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-main">
                  <FaCheckCircle className="text-whatsapp" />
                  <span>Direct Naroda Press Visit</span>
                </div>
              </div>
            </div>

            {/* Right Column: High-Impact Direct Actions */}
            <div className="lg:col-span-5 flex flex-col gap-3.5 justify-center">
              <a
                href="https://wa.me/919725281074?text=Hi%20Design%20N%20Print,%20I%20would%20like%20to%20order%20a%20sample%20swatch%20kit%20or%20discuss%20my%20print%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-whatsapp hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98"
              >
                <FaWhatsapp className="text-lg" />
                <span>Chat on WhatsApp (+91 97252 81074)</span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-surface hover:bg-surface-muted border border-border-subtle hover:border-accent text-text-main font-bold text-xs sm:text-sm transition-all"
              >
                <FaMapMarkerAlt className="text-accent text-xs" />
                <span>Visit Our Naroda Press Workshop</span>
              </Link>

              <p className="text-[11px] text-text-muted text-center mt-1">
                Opp. National Handloom, Naroda, Ahmedabad • Mon–Sat: 10AM–7PM
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
