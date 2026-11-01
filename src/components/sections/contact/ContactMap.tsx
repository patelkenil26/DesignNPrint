"use client";

import React from "react";
import { FaMapMarkedAlt, FaDirections, FaExternalLinkAlt } from "react-icons/fa";

const ContactMap = () => {
  return (
    <section className="py-12 bg-surface font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-surface-light border border-border-subtle rounded-3xl overflow-hidden shadow-md">
          {/* Map Header Bar */}
          <div className="p-5 sm:p-6 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider mb-1">
                <FaMapMarkedAlt />
                <span>Interactive Press Location</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-text-main">
                Design N Prints Workshop &amp; Studio • Naroda, Ahmedabad
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                Opp. National Handloom Street, Near J.R. Amin Petrol Pump
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=23.0685788,72.64642"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-text-light text-xs font-bold shadow-sm transition-all active:scale-95"
              >
                <FaDirections />
                <span>Get Directions in Maps</span>
              </a>

              <a
                href="https://maps.app.goo.gl/ChIJD_1aL2sKCGwRynL88rkay5s"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-surface border border-border-subtle hover:bg-surface-muted text-text-muted hover:text-accent transition-colors"
                title="Open in Google Maps"
              >
                <FaExternalLinkAlt className="text-xs" />
              </a>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="relative w-full h-[360px] sm:h-[450px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14609.063528913262!2d72.6462253!3d23.0683253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6c080a6b2f5afd0f%3A0x9bcb1ab9f2fc72ca!2sDesign%20N%20Prints!5e0!3m2!1sen!2sin!4v1718798257421!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Design N Prints Location"
            ></iframe>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactMap;
