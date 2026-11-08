"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCalculator,
  FaWhatsapp,
  FaBolt,
  FaCheckCircle,
  FaFileAlt,
  FaRulerCombined,
  FaLayerGroup,
} from "react-icons/fa";

interface ProductOption {
  id: string;
  name: string;
  category: string;
  defaultGsm: string;
  caliper: string;
  quantities: number[];
  basePricePerUnit: number;
  turnaround: string;
  moq: number;
}

const products: ProductOption[] = [
  {
    id: "business-card",
    name: "Visiting Card",
    category: "Corporate Identity",
    defaultGsm: "350 - 450 GSM Royal Velvet",
    caliper: "0.45mm Caliper",
    quantities: [100, 250, 500, 1000, 2500],
    basePricePerUnit: 1.5,
    turnaround: "24–48 Hours",
    moq: 100,
  },
  {
    id: "pharma-box",
    name: "Medicine Box",
    category: "Pharmaceutical Packaging",
    defaultGsm: "300 - 350 GSM Cyber XL Board",
    caliper: "0.62mm Caliper",
    quantities: [500, 1000, 2500, 5000, 10000],
    basePricePerUnit: 3.2,
    turnaround: "3–4 Days",
    moq: 500,
  },
  {
    id: "rigid-box",
    name: "Rigid Packaging Box",
    category: "Luxury Gift & Retail",
    defaultGsm: "600+ GSM European Greyboard",
    caliper: "2.20mm Solid Core",
    quantities: [250, 500, 1000, 2500],
    basePricePerUnit: 24.0,
    turnaround: "4–5 Days",
    moq: 250,
  },
  {
    id: "brochure",
    name: "Brochure & Catalog",
    category: "Marketing Collateral",
    defaultGsm: "170 - 250 GSM Coated Art Paper",
    caliper: "0.22mm Caliper",
    quantities: [250, 500, 1000, 2500],
    basePricePerUnit: 6.5,
    turnaround: "2–3 Days",
    moq: 250,
  },
  {
    id: "sticker-label",
    name: "Sticker Labels",
    category: "Product & Roll Labels",
    defaultGsm: "Waterproof Vinyl / Chrome",
    caliper: "80 Micron Poly",
    quantities: [500, 1000, 2500, 5000],
    basePricePerUnit: 0.9,
    turnaround: "24–48 Hours",
    moq: 500,
  },
];

const finishes = [
  { id: "matte", name: "Matte Lamination", multiplier: 1.0, spec: "Zero Glare Protection" },
  { id: "velvet", name: "Velvet Soft-Touch", multiplier: 1.25, spec: "Anti-Scuff Peach Skin" },
  { id: "gold-foil", name: "Gold Foil Stamping", multiplier: 1.45, spec: "Hot Brass Die Stamped" },
  { id: "spot-uv", name: "Raised Spot UV Gloss", multiplier: 1.4, spec: "3D Tactile Polymer" },
  { id: "foil-uv", name: "Foil Stamping + Spot UV", multiplier: 1.65, spec: "Maximum Executive Depth" },
];

export default function QuickEstimator() {
  const [selectedProduct, setSelectedProduct] = useState<ProductOption>(products[0]);
  const [selectedQty, setSelectedQty] = useState<number>(products[0].quantities[1]);
  const [selectedFinish, setSelectedFinish] = useState(finishes[0]);

  const handleProductChange = (productId: string) => {
    const prod = products.find((p) => p.id === productId) || products[0];
    setSelectedProduct(prod);
    setSelectedQty(prod.quantities[1] || prod.quantities[0]);
  };

  // Price calculations
  const totalRaw = selectedQty * selectedProduct.basePricePerUnit * selectedFinish.multiplier;
  const minEst = Math.round(totalRaw * 0.92);
  const maxEst = Math.round(totalRaw * 1.12);
  const unitCost = (totalRaw / selectedQty).toFixed(2);

  const whatsappMessage = encodeURIComponent(
    `Hello Design N Print! I used the Instant Estimator on your website and want an exact quote for:
• Product: ${selectedProduct.name}
• Quantity: ${selectedQty} units
• Substrate: ${selectedProduct.defaultGsm} (${selectedProduct.caliper})
• Finish: ${selectedFinish.name}
Please let me know the final quote and turnaround.`
  );

  return (
    <section id="quick-estimator" className="py-16 sm:py-20 bg-surface border-b border-border-subtle font-poppins scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent bg-accent-light/50 px-3.5 py-1 rounded-full border border-accent/20">
            <FaCalculator />
            <span>Real-Time Estimation Engine</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-text-main mt-3 tracking-tight">
            Transparent Pricing. Instant Specifications.
          </h2>
          <p className="text-sm sm:text-base text-text-subtle mt-3 leading-relaxed">
            Configure your custom run in under 10 seconds. Real substrate calipers, minimum order quantities, and estimated turnaround times without hidden prepress surcharges.
          </p>
        </div>

        {/* 2-Column Calculator Box */}
        <div className="max-w-5xl mx-auto bg-surface-light border border-border-subtle rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-12">
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-7 p-5 sm:p-8 space-y-6">
            {/* Step 1: Product Selection */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
                  1. Select Product Category
                </label>
                <span className="text-[11px] font-mono text-accent font-semibold">{selectedProduct.caliper}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {products.map((p) => {
                  const isSelected = selectedProduct.id === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleProductChange(p.id)}
                      className={`text-left p-3 rounded-xl border text-xs transition-all ${
                        isSelected
                          ? "bg-accent/15 border-accent text-text-main font-bold shadow-xs"
                          : "bg-surface border-border-subtle text-text-subtle hover:border-accent/40"
                      }`}
                    >
                      <p className="truncate font-semibold">{p.name}</p>
                      <span className="text-[10px] text-text-muted block truncate mt-0.5">{p.category}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Quantity Selection */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
                  2. Select Run Quantity (MOQ: {selectedProduct.moq} units)
                </label>
                <span className="text-[11px] text-whatsapp font-bold">Bulk Plate Discounts</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.quantities.map((qty) => {
                  const isSelected = selectedQty === qty;
                  return (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => setSelectedQty(qty)}
                      className={`flex-1 min-w-[75px] py-2 px-3 rounded-xl border text-xs text-center transition-all ${
                        isSelected
                          ? "bg-primary text-text-light border-primary font-extrabold shadow-xs"
                          : "bg-surface border-border-subtle text-text-main hover:border-accent/40"
                      }`}
                    >
                      {qty.toLocaleString()} <span className="text-[10px] opacity-75">pcs</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Tactile Finish Selection */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-text-muted mb-2.5">
                3. Choose Tactile Surface Finish
              </label>
              <div className="space-y-1.5">
                {finishes.map((f) => {
                  const isSelected = selectedFinish.id === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setSelectedFinish(f)}
                      className={`w-full flex justify-between items-center px-3.5 py-2.5 rounded-xl border text-xs transition-all ${
                        isSelected
                          ? "bg-accent/15 border-accent text-text-main font-bold"
                          : "bg-surface border-border-subtle text-text-subtle hover:border-accent/30"
                      }`}
                    >
                      <div>
                        <span className="font-semibold">{f.name}</span>
                        <span className="text-[10px] text-text-muted ml-2 hidden sm:inline">({f.spec})</span>
                      </div>
                      {isSelected ? (
                        <FaCheckCircle className="text-accent text-sm" />
                      ) : (
                        <span className="text-[10px] text-text-muted">+{Math.round((f.multiplier - 1) * 100)}%</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Instant Live Summary & Direct WhatsApp Hook */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#18181b] via-[#121214] to-[#09090b] text-text-light p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold">
                  Calculated Specimen
                </span>
                <span className="px-2 py-0.5 rounded bg-white/10 border border-white/15 text-[10px] font-mono text-accent">
                  {selectedProduct.caliper}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-text-light mt-1 mb-5">
                {selectedProduct.name}
              </h3>

              {/* Price Range Display */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/15 mb-6">
                <span className="text-[11px] text-text-light-muted block mb-1">
                  Estimated Range for {selectedQty.toLocaleString()} units:
                </span>
                <div className="text-2xl sm:text-3xl font-black text-accent tracking-tight">
                  ₹{minEst.toLocaleString()} – ₹{maxEst.toLocaleString()}*
                </div>
                <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-text-light-muted">
                  <span>Unit Rate:</span>
                  <span className="font-bold text-text-light">≈ ₹{unitCost} / piece</span>
                </div>
              </div>

              {/* Technical Print Spec Details */}
              <div className="space-y-2.5 text-xs text-text-light-muted mb-6">
                <div className="flex items-center gap-2">
                  <FaLayerGroup className="text-accent text-sm shrink-0" />
                  <span>
                    <strong className="text-text-light">Material:</strong> {selectedProduct.defaultGsm}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBolt className="text-accent text-sm shrink-0" />
                  <span>
                    <strong className="text-text-light">Turnaround:</strong> {selectedProduct.turnaround}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-whatsapp text-sm shrink-0" />
                  <span>
                    <strong className="text-text-light">Proofing:</strong> 100% Free Pre-Print Digital 3D Proof
                  </span>
                </div>
              </div>
            </div>

            <div>
              <a
                href={`https://wa.me/919725281074?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center gap-2 w-full py-3.5 px-5 rounded-xl bg-accent hover:bg-accent-hover text-primary-dark font-extrabold text-xs sm:text-sm shadow-lg transition-all active:scale-98"
              >
                <FaWhatsapp className="text-lg" />
                <span>Get Confirmed WhatsApp Quotation</span>
              </a>
              <p className="text-[10px] text-text-light-muted text-center mt-2.5">
                *Final rate confirmed with CAD dielines, paper mill GSM, &amp; GST.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
