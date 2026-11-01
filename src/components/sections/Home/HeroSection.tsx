"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaArrowRight, 
  FaWhatsapp, 
  FaShieldAlt, 
  FaBolt, 
  FaBoxOpen, 
  FaMapMarkerAlt, 
  FaCheckCircle,
  FaLayerGroup,
  FaGem
} from "react-icons/fa";

interface SpecimenProduct {
  id: string;
  name: string;
  category: string;
  image: string;
  gsm: string;
  boardType: string;
  finishBadge: string;
  description: string;
}

const specimenProducts: SpecimenProduct[] = [
  {
    id: "luxury-box",
    name: "Rigid Packaging Box",
    category: "Custom Mono-Carton & Rigid",
    image: "/images/Card/box_designing.png",
    gsm: "600+ GSM Kappa Board",
    boardType: "ITC Kappa Core + Velvet Wrap",
    finishBadge: "Raised Gold Foil + Spot UV",
    description: "Multi-ply rigid box with magnetic closure, zero-crack die-creasing, and hot-stamped gold typography.",
  },
  {
    id: "pharma-box",
    name: "Pharma Medicine Carton",
    category: "Medical Packaging Standard",
    image: "/images/Card/pharma_box.jpg",
    gsm: "350 GSM Cyber XL",
    boardType: "Virgin Clay Coated Board",
    finishBadge: "Tamper-Evident + Dieline CAD",
    description: "Automated crash-lock bottom, high-speed blister card compatibility, and micro-sharp batch barcode registration.",
  },
  {
    id: "velvet-card",
    name: "Executive 450 GSM Card",
    category: "Corporate Identity",
    image: "/images/Card/design-n-print-product-12-1.png",
    gsm: "450 GSM Triple-Ply",
    boardType: "Cotton Ivory Sandwich Edge",
    finishBadge: "Thermal Velvet + Gilded Foil",
    description: "Scratch-resistant soft-touch lamination, deep blind debossing, and razor-sharp PMS spot-color letterpress.",
  },
];

export default function HeroSection() {
  const [selectedProduct, setSelectedProduct] = useState<SpecimenProduct>(specimenProducts[0]);
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
        
        {/* Technical Crop Marks */}
        <div className="absolute top-4 left-6 text-text-muted/30 font-mono text-[11px] hidden sm:block select-none">
          + REG: CMYK 100% | BLEED: 3.0mm | PROFILE: FOGRA39
        </div>
        <div className="absolute top-4 right-6 text-text-muted/30 font-mono text-[11px] hidden sm:block select-none">
          OFFSET_PRESS_NARODA_AHMEDABAD +
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
              From luxury gold-foiled rigid boxes to pharmaceutical mono cartons and food-safe pouches. 
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

          {/* Right Column: Real 3D Packaging & Finishes Studio Showcase */}
          <motion.div 
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Top Interactive Product Tabs */}
            <div className="w-full flex items-center justify-between gap-1.5 p-1.5 bg-surface-muted/90 backdrop-blur-md rounded-2xl border border-border-subtle mb-4 shadow-sm">
              {specimenProducts.map((p) => {
                const isSelected = selectedProduct.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProduct(p)}
                    className={`flex-1 py-2 px-2.5 rounded-xl text-[11px] font-bold transition-all text-center truncate ${
                      isSelected
                        ? "bg-accent text-primary-dark shadow-md scale-[1.02]"
                        : "text-text-muted hover:text-text-main hover:bg-surface"
                    }`}
                  >
                    {p.name}
                  </button>
                );
              })}
            </div>

            {/* 3D Perspective Card Stage */}
            <div 
              className="relative w-full max-w-lg aspect-[4/3] rounded-3xl cursor-pointer select-none"
              style={{ perspective: 1200 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Background Ambient Glow Card */}
              <div 
                className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-accent/20 via-primary-dark to-secondary/20 border border-white/10 shadow-2xl opacity-40 blur-[2px] transition-transform duration-300"
                style={{
                  transform: `rotateY(${mousePos.x * -12}deg) rotateX(${-mousePos.y * -12}deg) translateZ(-30px) translateY(8px)`,
                }}
              />

              {/* Main 3D Card Shell */}
              <div 
                className="relative w-full h-full rounded-3xl p-[1.5px] bg-gradient-to-tr from-accent via-amber-300/40 to-yellow-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-150 ease-out"
                style={{
                  transform: `rotateY(${mousePos.x * 20}deg) rotateX(${-mousePos.y * 20}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="relative w-full h-full rounded-[23px] bg-gradient-to-br from-primary-dark via-primary-surface to-primary-dark p-5 sm:p-6 flex flex-col justify-between overflow-hidden">
                  
                  {/* Dynamic Foil Reflection Sweep overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{
                      background: activeFinish === "gold" 
                        ? `radial-gradient(circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(245, 158, 11, 0.45), transparent 70%)`
                        : activeFinish === "spot-uv"
                        ? `radial-gradient(circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(255, 255, 255, 0.55), transparent 60%)`
                        : `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.12), transparent 80%)`,
                    }}
                  />

                  {/* Card Header: Category & GSM Pill with z-depth */}
                  <div 
                    className="flex justify-between items-start relative z-10"
                    style={{ transform: "translateZ(25px)" }}
                  >
                    <div>
                      <span className="text-[10px] tracking-widest uppercase font-mono text-accent font-bold">
                        {selectedProduct.category}
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-text-light tracking-wide mt-0.5">
                        {selectedProduct.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-text-light shadow-sm">
                      <span className="text-accent font-bold">{selectedProduct.gsm}</span>
                    </div>
                  </div>

                  {/* Card Center: REAL High-Resolution Product Artwork with 3D Pop-Out */}
                  <div 
                    className="my-auto relative z-10 flex items-center justify-center py-2"
                    style={{ transform: "translateZ(45px)" }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedProduct.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.25 }}
                        className="relative w-full h-36 sm:h-44 flex items-center justify-center"
                      >
                        <Image
                          src={selectedProduct.image}
                          alt={selectedProduct.name}
                          fill
                          className="object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]"
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Card Footer: Real Material Spec + Interactive Finish Switcher */}
                  <div 
                    className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-xs"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    <div className="text-[11px] text-text-light-muted">
                      <span className="text-text-light font-semibold block">{selectedProduct.boardType}</span>
                      <span className="text-[10px] text-accent">{selectedProduct.finishBadge}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setActiveFinish("gold"); }}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${
                          activeFinish === "gold"
                            ? "bg-accent text-primary-dark shadow-md"
                            : "bg-black/50 text-text-light-muted hover:text-text-light"
                        }`}
                      >
                        Gold Foil
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setActiveFinish("spot-uv"); }}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${
                          activeFinish === "spot-uv"
                            ? "bg-accent text-primary-dark shadow-md"
                            : "bg-black/50 text-text-light-muted hover:text-text-light"
                        }`}
                      >
                        Spot UV
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setActiveFinish("velvet"); }}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${
                          activeFinish === "velvet"
                            ? "bg-accent text-primary-dark shadow-md"
                            : "bg-black/50 text-text-light-muted hover:text-text-light"
                        }`}
                      >
                        Velvet
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* Floating Verified Quality Badges */}
              <div 
                className="absolute -top-3 -right-2 bg-surface/95 backdrop-blur-md text-text-main border border-border-subtle rounded-xl px-3 py-1.5 shadow-xl flex items-center gap-2 text-xs font-bold animate-bounce duration-1000 z-20"
              >
                <FaCheckCircle className="text-whatsapp text-sm" />
                <span>Heidelberg Offset Line</span>
              </div>

              <div 
                className="absolute -bottom-3 -left-2 bg-surface/95 backdrop-blur-md text-text-main border border-border-subtle rounded-xl px-3 py-1.5 shadow-xl flex items-center gap-2 text-xs font-semibold z-20"
              >
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                <span>Hover for 3D Specular Light</span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
