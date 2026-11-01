"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  FaArrowRight, 
  FaWhatsapp, 
  FaShieldAlt, 
  FaBolt, 
  FaBoxOpen, 
  FaMapMarkerAlt, 
  FaCheckCircle
} from "react-icons/fa";

export default function HeroSection() {
  const [activeFinish, setActiveFinish] = useState<"gold" | "spot-uv" | "velvet">("gold");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section className="relative overflow-hidden bg-surface py-12 lg:py-20 border-b border-border-subtle">
      {/* Subtle background glow & grid lines inspired by print crop marks */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-accent/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-secondary/15 rounded-full blur-3xl"></div>
        {/* Registration mark decorations in corners */}
        <div className="absolute top-4 left-4 text-text-muted/20 font-mono text-xs hidden sm:block">
          + REG: CMYK 100% | BLEED: 3.0mm
        </div>
        <div className="absolute top-4 right-4 text-text-muted/20 font-mono text-xs hidden sm:block">
          DNP_OFFSET_P24 +
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Compelling Copy & Dual Action Buttons */}
          <motion.div 
            className="lg:col-span-7 flex flex-col items-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Live Studio Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-muted border border-border-subtle text-xs sm:text-sm font-medium text-text-main mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              <span className="font-semibold text-accent">Gujarat&apos;s Leading Print &amp; Packaging Studio</span>
              <span className="text-text-muted">• Since 2008</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-text-main tracking-tight leading-[1.15] mb-6">
              We Don&apos;t Just Print. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-accent via-accent-hover to-secondary bg-clip-text text-transparent">
                We Make Your Brand Physical.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-text-subtle mb-8 max-w-2xl leading-relaxed">
              From luxury gold-foiled visiting cards to custom pharmaceutical packaging boxes and eco-pouches. 
              Get commercial-grade offset &amp; digital printing with <strong className="text-text-main font-semibold">100% digital 3D proof approval</strong> before running on press.
            </p>

            {/* Dual Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <Link
                href="#quick-estimator"
                className="inline-flex justify-center items-center gap-3 px-7 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-text-light font-semibold shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/35 hover:-translate-y-0.5 transition-all duration-300 text-center"
              >
                <span>Instant Cost Estimator</span>
                <FaArrowRight className="text-sm" />
              </Link>

              <a
                href="https://wa.me/919725281074?text=Hi%20Design%20N%20Print,%20I%20want%20to%20discuss%20a%20custom%20printing%20requirement."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center gap-2.5 px-6 py-3.5 rounded-xl bg-surface-muted hover:bg-surface border border-border-subtle hover:border-accent text-text-main font-semibold transition-all duration-300 text-center group"
              >
                <FaWhatsapp className="text-whatsapp text-lg group-hover:scale-110 transition-transform" />
                <span>Chat with Print Specialist</span>
              </a>
            </div>

            {/* Quick Trust Pillars (4 Key Guarantees) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-6 border-t border-border-subtle">
              <div className="flex items-center gap-2.5">
                <FaBolt className="text-accent text-lg shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-text-main">24-48h Rush</p>
                  <p className="text-text-muted">Fast Dispatch</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <FaShieldAlt className="text-secondary text-lg shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-text-main">3D Proof First</p>
                  <p className="text-text-muted">Zero Print Risk</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <FaBoxOpen className="text-accent text-lg shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-text-main">Low MOQ</p>
                  <p className="text-text-muted">Starts from 100 pcs</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <FaMapMarkerAlt className="text-secondary text-lg shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-text-main">Ahmedabad Studio</p>
                  <p className="text-text-muted">Naroda Workshop</p>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Interactive 3D Tactile Card Preview */}
          <motion.div 
            className="lg:col-span-5 flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* 3D Perspective Card Container */}
            <div 
              className="relative w-full max-w-md aspect-[4/3] rounded-3xl p-6 sm:p-8 cursor-pointer select-none transition-transform duration-200"
              style={{
                perspective: 1000,
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Outer Card with dynamic 3D Tilt & Specular Light Reflection */}
              <div 
                className="relative w-full h-full rounded-2xl bg-primary-surface border border-border-dark shadow-2xl p-6 flex flex-col justify-between overflow-hidden transition-transform duration-150 ease-out"
                style={{
                  transform: `rotateY(${mousePos.x * 20}deg) rotateX(${-mousePos.y * 20}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Dynamic Foil Reflection Sweep overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300"
                  style={{
                    background: activeFinish === "gold" 
                      ? `radial-gradient(circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(245, 158, 11, 0.45), transparent 70%)`
                      : activeFinish === "spot-uv"
                      ? `radial-gradient(circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(255, 255, 255, 0.5), transparent 60%)`
                      : `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1), transparent 80%)`,
                  }}
                />

                {/* Card Top: Branding & Registration marks */}
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <span className="text-[10px] tracking-widest uppercase font-mono text-accent">
                      Tactile Sample Preview
                    </span>
                    <h3 className="text-xl font-bold text-text-light tracking-wide mt-0.5">
                      DESIGN N PRINT
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary-dark/80 border border-border-dark text-[10px] font-mono text-text-light-muted">
                    <span>450 GSM</span>
                    <span>•</span>
                    <span className="text-accent uppercase font-bold">{activeFinish}</span>
                  </div>
                </div>

                {/* Card Center: Metallic Foil / Emblems */}
                <div className="my-auto relative z-10 flex flex-col items-center text-center">
                  <div 
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-lg mb-3 transition-all duration-300 ${
                      activeFinish === "gold"
                        ? "bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 text-primary-dark shadow-amber-500/30"
                        : activeFinish === "spot-uv"
                        ? "bg-primary-dark border-2 border-accent text-accent shadow-accent/20"
                        : "bg-surface text-text-main shadow-inner"
                    }`}
                  >
                    <span className="font-extrabold font-serif">D&amp;P</span>
                  </div>
                  <p className="text-xs text-text-light-muted tracking-widest uppercase">
                    Precision Offset • UV Foil Stamping • Die-Cutting
                  </p>
                </div>

                {/* Card Bottom: Interactive Live Finishing Switcher */}
                <div className="relative z-10 pt-3 border-t border-border-dark/60 flex items-center justify-between text-xs">
                  <span className="text-text-light-muted">Interactive Finish:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setActiveFinish("gold"); }}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                        activeFinish === "gold"
                          ? "bg-accent text-text-light font-semibold shadow-sm"
                          : "bg-primary-dark text-text-light-muted hover:text-text-light"
                      }`}
                    >
                      Gold Foil
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setActiveFinish("spot-uv"); }}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                        activeFinish === "spot-uv"
                          ? "bg-accent text-text-light font-semibold shadow-sm"
                          : "bg-primary-dark text-text-light-muted hover:text-text-light"
                      }`}
                    >
                      Spot UV
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setActiveFinish("velvet"); }}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                        activeFinish === "velvet"
                          ? "bg-accent text-text-light font-semibold shadow-sm"
                          : "bg-primary-dark text-text-light-muted hover:text-text-light"
                      }`}
                    >
                      Velvet Matte
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating micro-badges around the card */}
              <div className="absolute -top-3 -right-2 bg-surface text-text-main border border-border-subtle rounded-xl px-3 py-1.5 shadow-lg flex items-center gap-2 text-xs font-semibold animate-bounce duration-1000">
                <FaCheckCircle className="text-whatsapp" />
                <span>Heidelberg Press</span>
              </div>
              <div className="absolute -bottom-2 -left-2 bg-surface text-text-main border border-border-subtle rounded-xl px-3 py-1.5 shadow-lg flex items-center gap-2 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span>Move mouse for 3D light</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
