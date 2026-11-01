"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaClock, FaBolt, FaCoffee } from "react-icons/fa";

const ContactHero = () => {
  return (
    <div className="bg-surface-light border-b border-border-subtle py-12 lg:py-16 font-poppins relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-text-muted mb-4">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <span>›</span>
          <span className="text-text-main font-semibold">Contact &amp; Studio</span>
        </div>

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-light/50 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider mb-4">
            <FaMapMarkerAlt className="text-xs" />
            <span>Naroda Industrial Belt • Ahmedabad</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-text-main tracking-tight leading-tight">
            Direct Access to Our Prepress &amp; Offset Production Floor
          </h1>

          <p className="text-sm sm:text-base text-text-subtle mt-4 leading-relaxed">
            Whether you need 50,000 pharmaceutical cartons, luxury foil stamping swatch tests, or rush turnaround — connect directly with our press supervisors and design team.
          </p>

          {/* Real-time Status Badges */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border-subtle text-xs font-semibold text-text-main shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-whatsapp animate-pulse"></span>
              <span>Shop Floor Open: Mon–Sat 10:00 AM – 7:00 PM</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border-subtle text-xs font-semibold text-text-main shadow-xs">
              <FaBolt className="text-accent" />
              <span>Avg Inquiry Reply: Under 15 Minutes</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border-subtle text-xs font-semibold text-text-main shadow-xs">
              <FaCoffee className="text-secondary" />
              <span>Live Paper Swatch Reviews Welcome</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactHero;
