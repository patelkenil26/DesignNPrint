"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaFileUpload, FaPaintBrush, FaCheck, FaArrowRight, FaWhatsapp } from "react-icons/fa";

export default function DualJourney() {
  return (
    <section className="py-16 bg-surface-light border-b border-border-subtle font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent-light/60 px-3 py-1 rounded-full border border-accent/20">
            Tailored For Your Workflow
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-text-main mt-3">
            Two Simple Paths. Zero Confusion.
          </h2>
          <p className="text-sm sm:text-base text-text-muted mt-3">
            Whether you already have finalized vector artwork or starting with just a rough idea, we handle both with dedicated precision.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1: I Have a Design (Direct Print Track) */}
          <motion.div
            className="rounded-2xl bg-surface border border-border-subtle p-7 sm:p-9 shadow-sm hover:shadow-xl hover:border-accent/50 transition-all flex flex-col justify-between group"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-secondary-bg text-secondary flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <FaFileUpload />
              </div>
              <span className="text-xs font-bold text-secondary tracking-widest uppercase">
                Direct Offset &amp; Digital Print
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-text-main mt-1 mb-3">
                &ldquo;I Already Have a Design File&rdquo;
              </h3>
              <p className="text-sm text-text-subtle mb-6 leading-relaxed">
                Send us your print-ready file (PDF, CDR, AI, PSD). We run an automated pre-flight check for CMYK color profile, resolution, and bleed margins before printing.
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-text-muted mb-8">
                <li className="flex items-center gap-2">
                  <FaCheck className="text-whatsapp text-xs shrink-0" />
                  <span>Free Pre-Flight File Inspection (300 DPI &amp; Bleed Check)</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaCheck className="text-whatsapp text-xs shrink-0" />
                  <span>Digital Proof for your confirmation before running plates</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaCheck className="text-whatsapp text-xs shrink-0" />
                  <span>Fast 24-48 Hour Rush printing options available</span>
                </li>
              </ul>
            </div>

            <a
              href="https://wa.me/919725281074?text=Hi%20Design%20N%20Print,%20I%20have%20a%20print-ready%20file%20and%20want%20to%20get%20a%20fast%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center gap-2.5 w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-accent text-text-light font-semibold transition-all duration-300 text-sm shadow-md"
            >
              <FaWhatsapp className="text-base text-whatsapp" />
              <span>Share File on WhatsApp for Instant Quote</span>
              <FaArrowRight className="text-xs" />
            </a>
          </motion.div>

          {/* Card 2: I Need a Design (Design + Print Track) */}
          <motion.div
            className="rounded-2xl bg-surface border border-border-subtle p-7 sm:p-9 shadow-sm hover:shadow-xl hover:border-accent/50 transition-all flex flex-col justify-between group"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-accent-light text-accent-hover flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <FaPaintBrush />
              </div>
              <span className="text-xs font-bold text-accent tracking-widest uppercase">
                Brand Identity &amp; Packaging Engineering
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-text-main mt-1 mb-3">
                &ldquo;I Need Design + Printing Support&rdquo;
              </h3>
              <p className="text-sm text-text-subtle mb-6 leading-relaxed">
                Work directly with our in-house packaging and brand graphic designers. We create custom dielines, typography, 3D mockups, and premium finishes from scratch.
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-text-muted mb-8">
                <li className="flex items-center gap-2">
                  <FaCheck className="text-whatsapp text-xs shrink-0" />
                  <span>Custom Box Dieline creation for pharma, food &amp; retail</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaCheck className="text-whatsapp text-xs shrink-0" />
                  <span>Photorealistic 3D Mockup before printing a single sheet</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaCheck className="text-whatsapp text-xs shrink-0" />
                  <span>Specialized paper &amp; foil finishing consultation</span>
                </li>
              </ul>
            </div>

            <Link
              href="/contact?subject=Brand%20Design%20and%20Printing%20Consultation"
              className="inline-flex justify-center items-center gap-2.5 w-full py-3.5 px-6 rounded-xl bg-accent hover:bg-accent-hover text-text-light font-semibold transition-all duration-300 text-sm shadow-md"
            >
              <span>Book Design Consultation</span>
              <FaArrowRight className="text-xs" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
