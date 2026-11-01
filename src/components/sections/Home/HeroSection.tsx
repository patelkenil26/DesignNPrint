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
    <section className="relative overflow-hidden bg-surface py-14 lg:py-24 border-b border-border-subtle font-poppins">
      
      {/* Dynamic Radial Mesh Gradients & Technical Print Registration Marks */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-accent/15 via-secondary/10 to-transparent rounded-full blur-[130px] opacity-70"></div>
        <div className="absolute bottom-0 right-10 w-[450px] h-[450px] bg-accent/10 rounded-full blur-[120px]"></div>
        
        {/* Print Crop & Registration Marks */}
        <div className="absolute top-4 left-6 text-text-muted/30 font-mono text-[11px] hidden sm:block select-none">
          + REG: CMYK 100% | BLEED: 3.0mm | PROFILE: FOGRA39
        </div>
        <div className="absolute top-4 right-6 text-text-muted/30 font-mono text-[11px] hidden sm:block select-none">
          OFFSET_PRESS_NARODA_AHMEDABAD +
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Proof-Guarantee & 3D CTAs */}
          <motion.div 
            className="lg:col-span-7 flex flex-col items-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Live Studio Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-muted/90 backdrop-blur-md border border-border-subtle text-xs sm:text-sm font-medium text-text-main mb-6 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse"></span>
              <span className="font-bold text-accent">Gujarat&apos;s Fine Print &amp; Packaging House</span>
              <span className="text-text-muted hidden sm:inline">• Since 2008 in Naroda</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-text-main tracking-tight leading-[1.12] mb-6">
              We Don&apos;t Just Print. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-accent via-amber-400 to-secondary bg-clip-text text-transparent">
                We Make Your Brand Physical.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-text-subtle mb-8 max-w-2xl leading-relaxed">
              From luxury gold-foiled business cards to pharmaceutical mono cartons and food-safe pouches. 
              Get Heidelberg-grade offset &amp; digital printing with <strong className="text-text-main font-semibold">100% free digital 3D proof sign-off</strong> before plate exposure.
            </p>

            {/* Dual Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <Link
                href="/quote"
                className="inline-flex justify-center items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-accent via-amber-400 to-yellow-500 hover:brightness-110 text-primary-dark font-extrabold shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-center uppercase tracking-wider text-xs sm:text-sm"
              >
                <FaBolt />
                <span>Instant Cost Estimator</span>
                <FaArrowRight className="text-xs" />
              </Link>

              <a
                href="https://wa.me/919725281074?text=Hi%20Design%20N%20Print,%20I%20want%20to%20discuss%20a%20custom%20printing%20requirement."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center gap-2.5 px-6 py-4 rounded-xl bg-surface-muted hover:bg-surface border border-border-subtle hover:border-accent text-text-main font-bold transition-all duration-300 text-center group text-xs sm:text-sm shadow-xs"
              >
                <FaWhatsapp className="text-whatsapp text-lg group-hover:scale-110 transition-transform" />
                <span>Chat with Shop Floor Head</span>
              </a>
            </div>

            {/* Quick Trust Pillars (4 Key Guarantees) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-6 border-t border-border-subtle">
              <div className="flex items-center gap-2.5">
                <FaBolt className="text-accent text-lg shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-text-main">24-48h Rush</p>
                  <p className="text-text-muted">Same-Day Dispatch</p>
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
                  <p className="text-text-muted">From 100 units</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <FaMapMarkerAlt className="text-secondary text-lg shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-text-main">Naroda Studio</p>
                  <p className="text-text-muted">Ahmedabad Press</p>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Multi-Layered 3D Perspective Card with Metallic Specular Sheen */}
          <motion.div 
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* 3D Perspective Card Stage */}
            <div 
              className="relative w-full max-w-md aspect-[4/3] rounded-3xl cursor-pointer select-none"
              style={{ perspective: 1200 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Layer 1: Background Floating Packaging Mockup Card */}
              <div 
                className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary-dark via-primary-surface to-secondary/30 border border-white/10 shadow-2xl opacity-50 blur-[1px] transition-transform duration-300"
                style={{
                  transform: `rotateY(${mousePos.x * -15 - 5}deg) rotateX(${-mousePos.y * -15 + 4}deg) translateZ(-40px) translateY(10px) translateX(-10px)`,
                }}
              />

              {/* Layer 2: Main Tactile 3D Specimen Card with Metallic Foil Border */}
              <div 
                className="relative w-full h-full rounded-3xl p-[1.5px] bg-gradient-to-tr from-accent via-amber-300/40 to-yellow-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-150 ease-out"
                style={{
                  transform: `rotateY(${mousePos.x * 22}deg) rotateX(${-mousePos.y * 22}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="relative w-full h-full rounded-[23px] bg-gradient-to-br from-primary-surface via-surface to-primary-dark p-6 sm:p-7 flex flex-col justify-between overflow-hidden">
                  
                  {/* Dynamic Foil Reflection Sweep overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{
                      background: activeFinish === "gold" 
                        ? `radial-gradient(circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(245, 158, 11, 0.45), transparent 70%)`
                        : activeFinish === "spot-uv"
                        ? `radial-gradient(circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(255, 255, 255, 0.6), transparent 60%)`
                        : `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.15), transparent 80%)`,
                    }}
                  />

                  {/* Card Top: Branding & Registration marks with z-depth */}
                  <div 
                    className="flex justify-between items-start relative z-10"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    <div>
                      <span className="text-[10px] tracking-widest uppercase font-mono text-accent font-bold">
                        Interactive Specimen
                      </span>
                      <h3 className="text-xl font-black text-text-light tracking-wide mt-0.5">
                        DESIGN N PRINT
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary-dark/90 border border-border-dark text-[10px] font-mono text-text-light-muted shadow-sm">
                      <span>450 GSM</span>
                      <span>•</span>
                      <span className="text-accent uppercase font-bold">{activeFinish}</span>
                    </div>
                  </div>

                  {/* Card Center: Metallic Foil Emblem with elevated 3D Z-depth */}
                  <div 
                    className="my-auto relative z-10 flex flex-col items-center text-center"
                    style={{ transform: "translateZ(50px)" }}
                  >
                    <div 
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-xl mb-3 transition-all duration-300 ${
                        activeFinish === "gold"
                          ? "bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 text-primary-dark shadow-amber-500/40"
                          : activeFinish === "spot-uv"
                          ? "bg-primary-dark border-2 border-accent text-accent shadow-accent/30"
                          : "bg-surface text-text-main shadow-inner border border-white/20"
                      }`}
                    >
                      <span className="font-extrabold font-serif">D&amp;P</span>
                    </div>
                    <p className="text-xs text-text-light-muted tracking-widest uppercase font-semibold">
                      Offset Press • Hot Foil Stamping • Die-Cutting
                    </p>
                  </div>

                  {/* Card Bottom: Live Tactile Finish Selector */}
                  <div 
                    className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-xs"
                    style={{ transform: "translateZ(25px)" }}
                  >
                    <span className="text-text-light-muted text-[11px] font-medium">Switch Finish:</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setActiveFinish("gold"); }}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                          activeFinish === "gold"
                            ? "bg-accent text-text-light shadow-md"
                            : "bg-primary-dark/80 text-text-light-muted hover:text-text-light"
                        }`}
                      >
                        Gold Foil
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setActiveFinish("spot-uv"); }}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                          activeFinish === "spot-uv"
                            ? "bg-accent text-text-light shadow-md"
                            : "bg-primary-dark/80 text-text-light-muted hover:text-text-light"
                        }`}
                      >
                        Spot UV
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setActiveFinish("velvet"); }}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                          activeFinish === "velvet"
                            ? "bg-accent text-text-light shadow-md"
                            : "bg-primary-dark/80 text-text-light-muted hover:text-text-light"
                        }`}
                      >
                        Velvet Matte
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* Floating 3D Micro-Badges with drop shadows */}
              <div 
                className="absolute -top-3 -right-2 bg-surface/95 backdrop-blur-md text-text-main border border-border-subtle rounded-xl px-3 py-1.5 shadow-xl flex items-center gap-2 text-xs font-bold animate-bounce duration-1000 z-20"
              >
                <FaCheckCircle className="text-whatsapp text-sm" />
                <span>Heidelberg Offset Line</span>
              </div>

              <div 
                className="absolute -bottom-3 -left-2 bg-surface/95 backdrop-blur-md text-text-main border border-border-subtle rounded-xl px-3 py-1.5 shadow-xl flex items-center gap-2 text-xs font-semibold z-20"
              >
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span>Hover for 3D Specular Light</span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
