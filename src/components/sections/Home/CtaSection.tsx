"use client";

import React from "react";
import Link from "next/link";
import { FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaArrowRight } from "react-icons/fa";

export default function CtaSection() {
  return (
    <section className="py-20 bg-primary-dark text-text-light font-poppins relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent-light/10 border border-accent/20 px-3.5 py-1 rounded-full inline-block mb-4">
          Visit Us or Order Online
        </span>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-text-light tracking-tight max-w-3xl mx-auto leading-tight mb-6">
          Ready to Elevate Your Brand with Premium Print &amp; Packaging?
        </h2>

        <p className="text-sm sm:text-base text-text-light-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Drop by our Naroda workshop to touch physical paper swatches, or share your requirements on WhatsApp for an instant response within minutes.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="https://wa.me/919725281074?text=Hi%20Design%20N%20Print,%20I%20am%20ready%20to%20order%20and%20want%20to%20discuss%20my%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-xl bg-accent hover:bg-accent-hover text-text-light font-bold text-sm shadow-xl shadow-accent/20 hover:-translate-y-0.5 transition-all duration-300"
          >
            <FaWhatsapp className="text-lg" />
            <span>Chat on WhatsApp Now</span>
            <FaArrowRight className="text-xs" />
          </a>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-4 rounded-xl bg-primary-surface hover:bg-border-dark border border-border-dark text-text-light font-semibold text-sm transition-all duration-300"
          >
            <FaMapMarkerAlt className="text-accent" />
            <span>Visit Naroda Studio (Get Directions)</span>
          </Link>
        </div>

        {/* Contact details bar */}
        <div className="pt-8 border-t border-border-dark/60 flex flex-wrap justify-center items-center gap-6 text-xs text-text-light-muted">
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-accent" />
            <span>Direct Call: +91 97252 81074 / +91 99132 90354</span>
          </div>
          <span>•</span>
          <div>
            <span>Opp. National Handloom, Naroda, Ahmedabad 382330</span>
          </div>
          <span>•</span>
          <div>
            <span className="text-accent font-semibold">Mon - Sat: 10:00 AM - 7:00 PM</span>
          </div>
        </div>
      </div>
    </section>
  );
}
