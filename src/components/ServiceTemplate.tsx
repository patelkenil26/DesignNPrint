"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import { 
  FaWhatsapp, 
  FaBolt, 
  FaShieldAlt, 
  FaCheck, 
  FaFilePdf, 
  FaLayerGroup, 
  FaExpand, 
  FaTimes, 
  FaArrowLeft, 
  FaArrowRight 
} from "react-icons/fa";

interface ServiceTemplateProps {
  title: string;
  description: string;
  types: string[];
  advantages: string[];
  bannerImg: string[];
}

export default function ServiceTemplate({
  title,
  description,
  types,
  advantages,
  bannerImg,
}: ServiceTemplateProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const whatsappMessage = encodeURIComponent(
    `Hello Design N Print! I am interested in ordering/getting a quote for:
• Service: ${title}
Please let me know the available GSM options, finishes, and turnaround time.`
  );

  return (
    <div className="font-poppins bg-surface text-text-main min-h-screen">
      {/* 1. Breadcrumb Bar */}
      <div className="bg-surface-light border-b border-border-subtle py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-text-muted">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <span>›</span>
          <Link href="/services" className="hover:text-accent transition-colors">Services</Link>
          <span>›</span>
          <span className="text-text-main font-semibold truncate">{title}</span>
        </div>
      </div>

      {/* 2. Product Hero Overview */}
      <section className="py-10 sm:py-16 px-4 sm:px-8 border-b border-border-subtle">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Details & Specs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent-light/50 px-3 py-1 rounded-full border border-accent/20 mb-3">
              Precision Offset &amp; Custom Finish
            </span>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-text-main tracking-tight leading-tight mb-4">
              {title}
            </h1>

            <p className="text-sm sm:text-base text-text-subtle leading-relaxed mb-6">
              {description}
            </p>

            {/* Quick Spec Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mb-8">
              <div className="p-3.5 rounded-xl bg-surface-light border border-border-subtle">
                <span className="text-[11px] font-mono text-text-muted uppercase block">Turnaround</span>
                <div className="flex items-center gap-1.5 mt-0.5 font-bold text-xs sm:text-sm text-text-main">
                  <FaBolt className="text-accent shrink-0" />
                  <span>24 - 48h Available</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-light border border-border-subtle">
                <span className="text-[11px] font-mono text-text-muted uppercase block">Minimum Order</span>
                <div className="flex items-center gap-1.5 mt-0.5 font-bold text-xs sm:text-sm text-text-main">
                  <FaLayerGroup className="text-secondary shrink-0" />
                  <span>From 100 pcs</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-light border border-border-subtle col-span-2 sm:col-span-1">
                <span className="text-[11px] font-mono text-text-muted uppercase block">Proofing</span>
                <div className="flex items-center gap-1.5 mt-0.5 font-bold text-xs sm:text-sm text-text-main">
                  <FaShieldAlt className="text-whatsapp shrink-0" />
                  <span>100% Pre-Print Proof</span>
                </div>
              </div>
            </div>

            {/* Dual Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <a
                href={`https://wa.me/919725281074?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center gap-2.5 px-6 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-text-light font-bold text-sm shadow-md transition-all"
              >
                <FaWhatsapp className="text-lg" />
                <span>Get Instant WhatsApp Quote</span>
              </a>

              <Link
                href="/quote"
                className="inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-xl bg-surface-light hover:bg-surface border border-border-subtle hover:border-accent text-text-main font-semibold text-sm transition-all"
              >
                <span>Calculate Price Range</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Swiper Carousel with Lightbox */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[420px] aspect-square rounded-3xl p-4 bg-surface-light border border-border-subtle shadow-lg flex items-center justify-center relative">
              <Swiper
                effect="creative"
                loop={bannerImg.length > 1}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                modules={[Autoplay, EffectCards]}
                className="w-full h-full rounded-2xl overflow-hidden"
              >
                {bannerImg.map((img, idx) => (
                  <SwiperSlide key={idx} className="flex items-center justify-center bg-surface">
                    <img
                      src={img}
                      alt={`${title} - Slide ${idx + 1}`}
                      className="max-h-full max-w-full object-contain p-2 cursor-pointer"
                      onClick={() => {
                        setCurrentIndex(idx);
                        setIsModalOpen(true);
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="absolute bottom-4 right-4 z-20 px-3 py-1.5 rounded-full bg-primary-dark/80 backdrop-blur-md text-text-light text-xs font-semibold flex items-center gap-1.5 shadow-md hover:bg-accent transition-colors"
              >
                <FaExpand />
                <span>Enlarge</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Detailed Specifications: Types & Advantages */}
      <section className="py-16 px-4 sm:px-8 bg-surface-light border-b border-border-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Types Card */}
            <div className="p-7 sm:p-8 rounded-2xl bg-surface border border-border-subtle shadow-sm">
              <span className="text-xs font-mono uppercase text-accent font-bold">Configurations</span>
              <h2 className="text-xl sm:text-2xl font-bold text-text-main mt-1 mb-6">
                Types &amp; Variants Available
              </h2>
              <ul className="space-y-3">
                {types.map((type, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-text-subtle">
                    <span className="w-5 h-5 rounded-full bg-accent/15 text-accent flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{type}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Advantages Card */}
            <div className="p-7 sm:p-8 rounded-2xl bg-surface border border-border-subtle shadow-sm">
              <span className="text-xs font-mono uppercase text-secondary font-bold">Commercial Quality</span>
              <h2 className="text-xl sm:text-2xl font-bold text-text-main mt-1 mb-6">
                Key Advantages &amp; Craftsmanship
              </h2>
              <ul className="space-y-3">
                {advantages.map((adv, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-text-subtle">
                    <span className="w-5 h-5 rounded-full bg-secondary-bg text-secondary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ★
                    </span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Pre-Flight File Checklist (Answers: "File kaise bheje?") */}
      <section className="py-14 px-4 sm:px-8 bg-surface border-b border-border-subtle">
        <div className="max-w-5xl mx-auto rounded-3xl bg-surface-muted border border-border-subtle p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-border-subtle">
            <div>
              <span className="text-xs font-mono uppercase text-accent font-bold">Artwork Prep Guide</span>
              <h3 className="text-xl sm:text-2xl font-bold text-text-main mt-1">
                Print-Ready File Requirements for {title}
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-surface border border-border-subtle text-xs font-semibold text-text-muted">
              Pre-Flight Guidelines
            </span>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 pt-6">
            <div>
              <h4 className="font-bold text-sm text-text-main mb-1.5">1. Formats Accepted</h4>
              <p className="text-xs text-text-muted leading-relaxed">
                PDF (PDF/X-1a preferred), CorelDraw (CDR with fonts curved), Adobe Illustrator (AI), or PSD.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm text-text-main mb-1.5">2. Color &amp; Resolution</h4>
              <p className="text-xs text-text-muted leading-relaxed">
                Set color mode strictly to CMYK (not RGB) and ensure image resolution is at least 300 DPI at 100% scale.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm text-text-main mb-1.5">3. Bleed &amp; Safe Zone</h4>
              <p className="text-xs text-text-muted leading-relaxed">
                Add 3mm external bleed on all sides and keep vital text/logos 4mm inside the cutting trim line.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Lightbox Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[1000] bg-primary-dark/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative max-w-4xl w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-12 right-0 bg-primary-surface text-text-light hover:bg-accent rounded-full p-2.5 text-lg z-50 transition-colors"
            >
              <FaTimes />
            </button>

            {/* Image */}
            <img
              src={bannerImg[currentIndex]}
              alt={`${title} Preview`}
              className="max-h-[75vh] w-auto object-contain rounded-2xl border border-border-dark shadow-2xl bg-surface"
            />

            {/* Nav controls if multiple images */}
            {bannerImg.length > 1 && (
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={() => setCurrentIndex((prev) => (prev === 0 ? bannerImg.length - 1 : prev - 1))}
                  className="px-4 py-2 rounded-full bg-primary-surface text-text-light hover:bg-accent text-sm font-semibold transition-colors"
                >
                  ‹ Previous
                </button>
                <span className="text-xs text-text-light-muted">
                  {currentIndex + 1} of {bannerImg.length}
                </span>
                <button
                  onClick={() => setCurrentIndex((prev) => (prev === bannerImg.length - 1 ? 0 : prev + 1))}
                  className="px-4 py-2 rounded-full bg-primary-surface text-text-light hover:bg-accent text-sm font-semibold transition-colors"
                >
                  Next ›
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
