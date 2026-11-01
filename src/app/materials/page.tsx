"use client";

import React from "react";
import Link from "next/link";
import FinishesLab from "@/components/sections/Home/FinishesLab";
import { FaLayerGroup, FaWhatsapp, FaMapMarkerAlt, FaCheck, FaInfoCircle } from "react-icons/fa";

const gsmTiers = [
  {
    range: "80 – 100 GSM",
    type: "Executive Bond & Maplitho Paper",
    description: "Crisp, feather-light uncoated paper designed specifically for smooth pen writing and inkjet/laser desktop printing without bleeding.",
    commonUses: "Corporate Letterheads, Bill Books, Invoice Pads, Computer Stationery",
  },
  {
    range: "130 – 170 GSM",
    type: "Gloss & Matte Art Paper",
    description: "Smooth coated paper offering brilliant color reproduction for photographs, gradients, and intricate typography.",
    commonUses: "Brochures, Catalog Pages, Event Pamphlets, Promotional Flyers",
  },
  {
    range: "250 – 300 GSM",
    type: "Heavyweight Coated Card",
    description: "Thick stock with high tear-resistance and excellent crease-holding capability for folding and die-cutting.",
    commonUses: "Company File Folders, Magazine Covers, Lightweight Packaging Cartons",
  },
  {
    range: "350 – 450 GSM",
    type: "Rigid Virgin Art Card & Velvet Board",
    description: "Zero-sag, ultra-stiff board that commands immediate executive authority. Ideal for foil stamping and deep embossing.",
    commonUses: "Luxury Visiting Cards, Pharmaceutical Monocartons, Cosmetic Item Boxes",
  },
  {
    range: "600+ GSM (Rigid)",
    type: "Greyboard & Kappa Board Core",
    description: "High-density multi-ply industrial board wrapped with printed specialty art paper for uncrushable luxury box structures.",
    commonUses: "Rigid Luxury Gift Boxes, Electronic Packaging, Sample Folders",
  },
];

const substrates = [
  {
    title: "Cyber XL & SBS Board",
    badge: "Pharma & Cosmetic Grade",
    desc: "100% virgin pulp board with a smooth white clay coating on the top and clean white back. Perfect for pharmaceuticals, cosmetics, and food packaging.",
  },
  {
    title: "Virgin Bleached Art Card",
    badge: "High-End Corporate",
    desc: "Double-coated board delivering photographic color sharpness and holding intricate hot foil stamping and Spot UV with microscopic precision.",
  },
  {
    title: "Natural Recycled Kraft",
    badge: "Eco-Friendly Organic",
    desc: "Warm earthy brown fibrous paper made from recycled post-consumer pulp. Highly popular for organic cosmetics, gourmet foods, and boutique labels.",
  },
  {
    title: "Textured & Metallic Pearl Stocks",
    badge: "Bespoke Invitation",
    desc: "Specialty imported paper with embedded linen, felt, or metallic pearl finishes that glimmer subtly under ambient room light.",
  },
];

export default function MaterialsPage() {
  return (
    <div className="font-poppins bg-surface min-h-screen">
      {/* Header Banner */}
      <section className="bg-surface-light border-b border-border-subtle py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-text-muted mb-4">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span>›</span>
            <span className="text-text-main font-semibold">Materials &amp; Finishes Lab</span>
          </div>

          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent-light/50 px-3 py-1 rounded-full border border-accent/20">
              The Science of Print &amp; Touch
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-text-main mt-3 tracking-tight">
              Materials, Finishes &amp; Paper Caliber
            </h1>
            <p className="text-sm sm:text-base text-text-subtle mt-3 leading-relaxed">
              Understand the physical difference between paperweights (GSM), surface laminations, and luxury hot foil embellishments before production.
            </p>
          </div>
        </div>
      </section>

      {/* Embedded Interactive Finishes Lab */}
      <FinishesLab />

      {/* Paper Weight (GSM) Guide */}
      <section className="py-20 px-4 sm:px-8 bg-surface-light border-b border-border-subtle">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary-bg px-3 py-1 rounded-full border border-secondary/20">
              Paper Thickness Explained
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-text-main mt-3">
              Understanding GSM (Grams per Square Meter)
            </h2>
            <p className="text-sm text-text-muted mt-2">
              GSM determines the thickness, rigidity, and tactile heft of your printed piece. Here is our calibrated benchmark guide:
            </p>
          </div>

          <div className="space-y-4">
            {gsmTiers.map((tier, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-surface border border-border-subtle shadow-xs hover:border-accent/40 transition-all grid md:grid-cols-12 gap-4 items-center"
              >
                <div className="md:col-span-3">
                  <span className="px-3 py-1 rounded-md bg-accent/10 text-accent font-mono font-bold text-sm">
                    {tier.range}
                  </span>
                  <h3 className="font-bold text-base text-text-main mt-2">{tier.type}</h3>
                </div>

                <div className="md:col-span-5 text-xs sm:text-sm text-text-subtle leading-relaxed">
                  {tier.description}
                </div>

                <div className="md:col-span-4 bg-surface-light p-3.5 rounded-xl border border-border-subtle text-xs">
                  <span className="font-bold text-text-main block mb-1">Common Applications:</span>
                  <span className="text-text-muted">{tier.commonUses}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialty Substrates */}
      <section className="py-20 px-4 sm:px-8 bg-surface border-b border-border-subtle">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent-light/50 px-3 py-1 rounded-full border border-accent/20">
              Substrate Library
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-text-main mt-3">
              Premium Paper &amp; Board Stocks We Run
            </h2>
            <p className="text-sm text-text-muted mt-2">
              We source directly from certified Indian and European paper mills to ensure zero color variances across print runs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {substrates.map((sub, idx) => (
              <div key={idx} className="p-7 rounded-2xl bg-surface-light border border-border-subtle shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-text-main">{sub.title}</h3>
                    <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded bg-surface border border-border-subtle text-accent">
                      {sub.badge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-text-subtle leading-relaxed mb-6">
                    {sub.desc}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-secondary">
                  <FaCheck className="text-xs" />
                  <span>Available for custom dieline sampling</span>
                </div>
              </div>
            ))}
          </div>

          {/* Sample Swatch Request Box */}
          <div className="mt-14 rounded-3xl bg-primary-dark text-text-light p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-border-dark">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-text-light">Want to Touch &amp; Feel Physical Paper Samples?</h3>
              <p className="text-xs sm:text-sm text-text-light-muted mt-2 max-w-xl">
                Visit our Naroda Print Studio to browse physical swatch decks with actual gold foils, Spot UV heights, and paper calipers in your hands.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-text-light text-sm font-bold shadow-lg transition-all"
              >
                <FaMapMarkerAlt />
                <span>Visit Studio in Naroda</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
