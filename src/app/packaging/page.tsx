"use client";

import React from "react";
import Link from "next/link";
import { FaBoxOpen, FaShieldAlt, FaWhatsapp, FaBolt, FaCheckCircle, FaRulerCombined, FaBarcode } from "react-icons/fa";

const packagingSolutions = [
  {
    title: "Pharmaceutical Medicine Boxes",
    specs: "300 - 350 GSM Cyber XL / SBS Board",
    desc: "Precision monocartons for tablet blister strips, syrup bottles, vials, and diagnostic kits. Designed with tamper-evident tucks, Braille embossing options, and automated cartooning compatibility.",
    badge: "Pharma Grade Certified",
    link: "/services/pharmaceutical-medicine-boxes",
  },
  {
    title: "Cosmetic & Personal Care Cartons",
    specs: "350 - 450 GSM Heavy Virgin Board",
    desc: "Luxury packaging for serums, perfumes, face creams, and essential oils. Enhanced with metallic hot foil stamping, soft-touch velvet lamination, and internal product-locking inserts.",
    badge: "Luxury Retail Shelf Appeal",
    link: "/services/cosmetic-item-box-sticker-printing",
  },
  {
    title: "Pesticide & Agrochemical Labels & Boxes",
    specs: "Chemical-Resistant Poly / Heavy Coated Stock",
    desc: "Heavy-duty mono cartons and roll labels engineered to withstand chemical spillage, high humidity, and prolonged outdoor agricultural warehouse storage without ink deterioration.",
    badge: "Chemical & Moisture Resistant",
    link: "/services/pesticide-label-and-box",
  },
  {
    title: "Rigid & Corrugated E-Commerce Mailers",
    specs: "Multi-ply E/B Flute Corrugated Board",
    desc: "Custom-printed subscription mailers and structural shipping boxes designed to protect delicate glass and retail products during courier transit while delivering a memorable unboxing experience.",
    badge: "High Crush Resistance",
    link: "/services/box-designing-printing",
  },
];

const technicalSpecs = [
  {
    icon: <FaRulerCombined />,
    title: "Custom CAD Dielines",
    desc: "Engineered to fit your bottles, vials, or jars down to 0.5mm precision for zero product rattling.",
  },
  {
    icon: <FaBarcode />,
    title: "Batch & QR Code Compliance",
    desc: "Calibrated ink contrast for automated machine scanners, 2D Data Matrix, and serialized batch coding.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Anti-Counterfeit & Seals",
    desc: "Holographic tamper-evident stickers, security micro-text, and tear-strip security flaps.",
  },
  {
    icon: <FaBolt />,
    title: "Low MOQ Pilot Batches",
    desc: "Start with 500 units for FDA/DCGI regulatory submissions or test marketing before scaling to lakhs.",
  },
];

export default function PackagingPage() {
  return (
    <div className="font-poppins bg-surface min-h-screen">
      {/* Header Banner */}
      <section className="bg-surface-light border-b border-border-subtle py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-text-muted mb-4">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span>›</span>
            <span className="text-text-main font-semibold">Pharma &amp; Custom Packaging</span>
          </div>

          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent-light/50 px-3 py-1 rounded-full border border-accent/20">
              Commercial Packaging Engineering
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-text-main mt-3 tracking-tight">
              Pharmaceutical, Cosmetic &amp; Industrial Packaging
            </h1>
            <p className="text-sm sm:text-base text-text-subtle mt-3 leading-relaxed">
              Industrial mono-cartons, medicine boxes, and chemical-resistant labels crafted with automated die-cutting, tamper-evident structures, and consistent color calibration.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Pillars of Industrial Packaging */}
      <section className="py-16 px-4 sm:px-8 bg-surface border-b border-border-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalSpecs.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-surface-light border border-border-subtle shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-accent/15 text-accent flex items-center justify-center text-xl mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-base text-text-main mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packaging Solutions Grid */}
      <section className="py-20 px-4 sm:px-8 bg-surface-light border-b border-border-subtle">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary-bg px-3 py-1 rounded-full border border-secondary/20">
              Industry Focus
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-text-main mt-3">
              Specialized Packaging Lines We Manufacture
            </h2>
            <p className="text-sm text-text-muted mt-2">
              Each sector has strict regulatory and mechanical requirements. Here is how we build for each:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {packagingSolutions.map((sol, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-surface border border-border-subtle shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[11px] font-mono font-semibold px-3 py-1 rounded-full bg-accent/10 text-accent">
                      {sol.badge}
                    </span>
                    <span className="text-xs text-text-muted font-mono">{sol.specs}</span>
                  </div>
                  <h3 className="text-xl font-bold text-text-main mb-3">{sol.title}</h3>
                  <p className="text-xs sm:text-sm text-text-subtle leading-relaxed mb-6">
                    {sol.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                  <Link
                    href={sol.link}
                    className="text-xs font-bold text-accent hover:text-accent-hover transition-colors"
                  >
                    View Product Specifications →
                  </Link>

                  <a
                    href={`https://wa.me/919725281074?text=Hi%20Design%20N%20Print,%20I%20need%20a%20technical%20quote%20for%20${encodeURIComponent(sol.title)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-light border border-border-subtle text-xs font-semibold text-text-main hover:border-accent"
                  >
                    <FaWhatsapp className="text-whatsapp text-sm" />
                    <span>Get Quote</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Dieline Consultation Banner */}
          <div className="mt-16 rounded-3xl bg-primary-dark text-text-light p-8 sm:p-12 border border-border-dark flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-xs font-mono uppercase text-accent font-bold">Engineering Support</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-text-light mt-1 mb-3">
                Send Us Your Product Bottle or Container
              </h3>
              <p className="text-xs sm:text-sm text-text-light-muted leading-relaxed">
                Send your physical product sample to our Naroda studio. Our dieline engineers will measure, create a custom CAD template, and provide a 3D digital mockup within 24 hours.
              </p>
            </div>
            <a
              href="https://wa.me/919725281074?text=Hi%20Design%20N%20Print,%20I%20want%20to%20send%20a%20product%20sample%20for%20custom%20dieline%20packaging."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-accent hover:bg-accent-hover text-text-light text-sm font-bold shadow-xl transition-all shrink-0"
            >
              <FaWhatsapp className="text-lg" />
              <span>Discuss Packaging Dieline</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
