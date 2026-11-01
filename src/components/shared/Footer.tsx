"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaWhatsapp, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock, 
  FaBolt, 
  FaShieldAlt, 
  FaCheckCircle, 
  FaLayerGroup, 
  FaBoxes, 
  FaArrowRight 
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-primary-dark via-primary-surface to-black text-text-light font-poppins overflow-hidden">
      
      {/* Background Radial Glow & Gradient Mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[140px]"></div>
      </div>

      {/* Main Structured 4-Column Footer */}
      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Column 1: Studio Legacy & Press Verification (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="relative w-44 h-12">
              <Image 
                src="/images/Logo/DesignNPrint.png" 
                alt="Design N Print Logo" 
                fill
                className="object-contain"
              />
            </div>

            <p className="text-xs sm:text-sm text-text-light-muted leading-relaxed">
              Specialized in high-precision commercial offset printing, custom mono-cartons, and luxury foil finishes for Gujarat&apos;s commerce and pharmaceutical industry since 2008.
            </p>

            {/* Quality Standard Compliance Badges */}
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-text-light-muted">
                <FaCheckCircle className="text-whatsapp text-[10px]" />
                <span>ISO 9001:2015 Spec</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-text-light-muted">
                <FaCheckCircle className="text-whatsapp text-[10px]" />
                <span>FSC Food/Pharma Board</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-text-light-muted">
                <FaCheckCircle className="text-whatsapp text-[10px]" />
                <span>24-48h Rush Dispatch</span>
              </span>
            </div>

            {/* 3D Press Floor Pill */}
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-text-light-muted flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-accent/20 text-accent flex items-center justify-center shrink-0">
                <FaLayerGroup />
              </div>
              <p className="text-[11px] leading-tight">
                <span className="font-bold text-text-light block">In-House Production Floor</span>
                Heidelberg Offset, Foil Stamping &amp; Die-Cutting in Naroda.
              </p>
            </div>
          </div>

          {/* Column 2: Specialized Product Lines (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-accent border-b border-white/10 pb-2">
              Specialized Lines
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-text-light-muted">
              <li>
                <Link href="/packaging" className="hover:text-accent transition-colors flex items-center gap-2 group">
                  <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>Pharma Medicine Cartons</span>
                </Link>
              </li>
              <li>
                <Link href="/services/box-designing-printing" className="hover:text-accent transition-colors flex items-center gap-2 group">
                  <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>Luxury Rigid Boxes</span>
                </Link>
              </li>
              <li>
                <Link href="/services/visiting-card-letterhead-envelope" className="hover:text-accent transition-colors flex items-center gap-2 group">
                  <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>Velvet &amp; Gold Foil Cards</span>
                </Link>
              </li>
              <li>
                <Link href="/services/brochure-designing-printing" className="hover:text-accent transition-colors flex items-center gap-2 group">
                  <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>Catalogues &amp; Brochures</span>
                </Link>
              </li>
              <li>
                <Link href="/services/cotton-pouch-designing-printing" className="hover:text-accent transition-colors flex items-center gap-2 group">
                  <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>Cotton &amp; Eco Pouches</span>
                </Link>
              </li>
              <li>
                <Link href="/services/ceramic-mockup-design" className="hover:text-accent transition-colors flex items-center gap-2 group">
                  <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>Ceramic Sample Folders</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Tools & Swatch Resources (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-accent border-b border-white/10 pb-2">
              Pre-Press Tools
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-text-light-muted">
              <li>
                <Link href="/quote" className="hover:text-accent transition-colors font-semibold text-accent flex items-center gap-2">
                  <span>Instant Calculator</span>
                </Link>
              </li>
              <li>
                <Link href="/materials" className="hover:text-accent transition-colors flex items-center gap-2">
                  <span>Materials &amp; GSM Lab</span>
                </Link>
              </li>
              <li>
                <Link href="/packaging" className="hover:text-accent transition-colors flex items-center gap-2">
                  <span>CAD Dieline Protocols</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent transition-colors flex items-center gap-2">
                  <span>Our 17-Year Story</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors flex items-center gap-2">
                  <span>Naroda Studio Visit</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-accent transition-colors flex items-center gap-2">
                  <span>All 24+ Services</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Press Workshop Location & Direct Hotline (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-accent border-b border-white/10 pb-2">
              Press &amp; Studio Desk
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-text-light-muted">
              <div className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="text-accent shrink-0 mt-1" />
                <p className="leading-tight">
                  Modern Corner, Opp. National Handloom, Nr. J.R. Amin Petrol Pump, Naroda, Ahmedabad, Gujarat 382330
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <FaPhoneAlt className="text-accent shrink-0" />
                <div className="space-x-2">
                  <a href="tel:+919725281074" className="hover:text-accent transition-colors font-bold">+91 97252 81074</a>
                  <span>/</span>
                  <a href="tel:+919913290354" className="hover:text-accent transition-colors">+91 99132 90354</a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <FaEnvelope className="text-accent shrink-0" />
                <a href="mailto:designnprintsamd@gmail.com" className="hover:text-accent transition-colors truncate">
                  designnprintsamd@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <FaClock className="text-whatsapp shrink-0" />
                <span className="text-text-light">Mon – Sat: 10:00 AM – 7:00 PM</span>
              </div>
            </div>

            {/* Social Icons with Radiant 3D Hover Glow */}
            <div className="pt-3">
              <span className="text-[11px] font-mono uppercase text-text-light-muted block mb-2">Connect Directly:</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/919725281074"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-whatsapp/20 hover:bg-whatsapp text-whatsapp hover:text-white border border-whatsapp/40 flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-whatsapp/50 hover:-translate-y-1"
                  aria-label="Chat on WhatsApp"
                >
                  <FaWhatsapp className="text-lg" />
                </a>

                <a
                  href="https://www.instagram.com/designnprints.in?igsh=MWRqaWNmNmFoYjZ0bw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600/30 hover:to-purple-600 text-text-light border border-white/20 flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-pink-500/40 hover:-translate-y-1"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-lg" />
                </a>

                <a
                  href="https://www.facebook.com/share/19FYcyioTy/?mibextid=qi2Omg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/40 flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-blue-500/40 hover:-translate-y-1"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="text-base" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Bottom Legal & Copyright Bar */}
      <div className="border-t border-white/10 bg-black/60 py-6 px-4 text-xs text-text-light-muted">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} Design N Print • Premium Printing &amp; Custom Packaging • Naroda, Ahmedabad, Gujarat.
          </p>

          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <span className="text-accent font-semibold">KENIL IT Solution</span>
            <span>• Offset Excellence Since 2008</span>
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
