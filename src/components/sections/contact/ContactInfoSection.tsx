"use client";

import React from "react";
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaClock, 
  FaWhatsapp, 
  FaDirections, 
  FaTruck 
} from "react-icons/fa";

export default function ContactInfoSection() {
  return (
    <section className="py-12 bg-surface font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Card 1: Studio & Press Address */}
          <div className="bg-surface-light border border-border-subtle p-7 rounded-3xl shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-accent/15 text-accent flex items-center justify-center text-xl mb-5">
                <FaMapMarkerAlt />
              </div>
              <span className="text-xs font-mono uppercase text-secondary font-bold">Physical Location</span>
              <h3 className="text-lg font-bold text-text-main mt-1 mb-3">Studio &amp; Workshop</h3>
              <p className="text-xs sm:text-sm text-text-subtle leading-relaxed mb-4">
                Modern Corner, Opp. National Handloom Street, Nr. J.R. Amin Petrol Pump &amp; Jolly Auto, Above Hira Auto, Naroda, Ahmedabad, Gujarat 382330
              </p>
              <div className="p-3 rounded-xl bg-surface border border-border-subtle text-xs text-text-muted">
                <span className="font-semibold text-text-main">Landmark:</span> Directly opposite National Handloom on Naroda Highway.
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border-subtle">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=23.0685788,72.64642"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:underline"
              >
                <FaDirections />
                <span>Get Driving Directions</span>
              </a>
            </div>
          </div>

          {/* Card 2: Direct Calling & WhatsApp */}
          <div className="bg-surface-light border border-border-subtle p-7 rounded-3xl shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-whatsapp/15 text-whatsapp flex items-center justify-center text-xl mb-5">
                <FaPhoneAlt />
              </div>
              <span className="text-xs font-mono uppercase text-whatsapp font-bold">Immediate Response</span>
              <h3 className="text-lg font-bold text-text-main mt-1 mb-3">Direct Lines &amp; WhatsApp</h3>
              
              <div className="space-y-3 mb-4">
                <a
                  href="tel:+919725281074"
                  className="flex items-center justify-between p-3 rounded-xl bg-surface hover:bg-surface-muted border border-border-subtle transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <FaPhoneAlt className="text-accent text-xs" />
                    <span className="text-xs sm:text-sm font-bold text-text-main group-hover:text-accent">+91 97252 81074</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-whatsapp bg-whatsapp/10 px-2 py-0.5 rounded-full">Call Now</span>
                </a>

                <a
                  href="tel:+919913290354"
                  className="flex items-center justify-between p-3 rounded-xl bg-surface hover:bg-surface-muted border border-border-subtle transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <FaPhoneAlt className="text-accent text-xs" />
                    <span className="text-xs sm:text-sm font-bold text-text-main group-hover:text-accent">+91 99132 90354</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-text-muted bg-surface-muted px-2 py-0.5 rounded-full">Secondary</span>
                </a>

                <a
                  href="mailto:designnprintsamd@gmail.com"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-surface hover:bg-surface-muted border border-border-subtle transition-colors group text-xs text-text-main"
                >
                  <FaEnvelope className="text-accent text-xs" />
                  <span className="group-hover:text-accent font-medium truncate">designnprintsamd@gmail.com</span>
                </a>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border-subtle">
              <a
                href="https://wa.me/919725281074?text=Hi%20Design%20N%20Print,%20I%20have%20an%20urgent%20print%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-whatsapp hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-sm"
              >
                <FaWhatsapp className="text-sm" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Card 3: Working Hours & Dispatch Logistics */}
          <div className="bg-surface-light border border-border-subtle p-7 rounded-3xl shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center text-xl mb-5">
                <FaClock />
              </div>
              <span className="text-xs font-mono uppercase text-secondary font-bold">Press Timings</span>
              <h3 className="text-lg font-bold text-text-main mt-1 mb-3">Operating Hours</h3>
              
              <div className="space-y-3 mb-4 text-xs sm:text-sm">
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface border border-border-subtle">
                  <span className="text-text-main font-semibold">Mon – Sat</span>
                  <span className="font-mono text-accent font-bold">10:00 AM – 7:00 PM</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-surface border border-border-subtle">
                  <span className="text-text-muted">Sunday</span>
                  <span className="text-text-muted text-xs">Closed (Emergency dispatch by appt)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface border border-border-subtle text-xs text-text-muted flex items-start gap-2.5">
                <FaTruck className="text-accent mt-0.5 shrink-0" />
                <span>Same-day dispatch to Vatva, Sanand, Changodar, Odhav, Kalol &amp; GIDC estates.</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border-subtle text-xs text-text-muted flex items-center justify-between">
              <span>Rush Turnaround</span>
              <span className="font-bold text-accent">24–48 Hours</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
