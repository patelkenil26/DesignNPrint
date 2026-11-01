"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCalculator, FaWhatsapp, FaBolt, FaCheckCircle, FaFileAlt } from "react-icons/fa";

interface ProductOption {
  id: string;
  name: string;
  defaultGsm: string;
  quantities: number[];
  basePricePerUnit: number;
  turnaround: string;
  moq: number;
}

const products: ProductOption[] = [
  {
    id: "business-card",
    name: "Visiting / Business Card",
    defaultGsm: "350 - 450 GSM Velvet Board",
    quantities: [100, 250, 500, 1000, 2500],
    basePricePerUnit: 1.5,
    turnaround: "24-48 Hours",
    moq: 100,
  },
  {
    id: "pharma-box",
    name: "Medicine / Packaging Box",
    defaultGsm: "300 - 350 GSM Cyber XL Board",
    quantities: [500, 1000, 2500, 5000, 10000],
    basePricePerUnit: 3.2,
    turnaround: "3 - 5 Days",
    moq: 500,
  },
  {
    id: "brochure",
    name: "Brochure & Catalogue",
    defaultGsm: "170 - 250 GSM Art Paper",
    quantities: [250, 500, 1000, 2500],
    basePricePerUnit: 6.5,
    turnaround: "2 - 4 Days",
    moq: 250,
  },
  {
    id: "sticker-label",
    name: "Stickers & Roll Labels",
    defaultGsm: "Waterproof Vinyl / Chrome Paper",
    quantities: [500, 1000, 2500, 5000],
    basePricePerUnit: 0.9,
    turnaround: "24-48 Hours",
    moq: 500,
  },
  {
    id: "cotton-pouch",
    name: "Cotton & Eco Pouch",
    defaultGsm: "100% Organic Fabric",
    quantities: [100, 250, 500, 1000],
    basePricePerUnit: 14.0,
    turnaround: "4 - 6 Days",
    moq: 100,
  },
];

const finishes = [
  { id: "matte", name: "Matte Lamination", multiplier: 1.0 },
  { id: "velvet", name: "Velvet Soft-Touch", multiplier: 1.25 },
  { id: "gold-foil", name: "Gold / Copper Foil Stamping", multiplier: 1.5 },
  { id: "spot-uv", name: "Spot UV Gloss + Velvet Matte", multiplier: 1.45 },
  { id: "emboss", name: "3D Embossed Finish", multiplier: 1.35 },
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

  // Estimate price range calculation
  const totalRaw = selectedQty * selectedProduct.basePricePerUnit * selectedFinish.multiplier;
  const minEst = Math.round(totalRaw * 0.9);
  const maxEst = Math.round(totalRaw * 1.15);

  const whatsappMessage = encodeURIComponent(
    `Hello Design N Print! I checked the Instant Estimator on your website and want an exact quote for:
• Product: ${selectedProduct.name}
• Quantity: ${selectedQty} pcs
• Paper/Material: ${selectedProduct.defaultGsm}
• Finish: ${selectedFinish.name}
Please let me know the final quote and turnaround.`
  );

  return (
    <section id="quick-estimator" className="py-16 bg-surface border-b border-border-subtle font-poppins scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent bg-accent-light/50 px-3 py-1 rounded-full border border-accent/20">
            <FaCalculator />
            <span>Interactive Tool</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-text-main mt-3">
            Instant Estimate &amp; Specification Calculator
          </h2>
          <p className="text-sm sm:text-base text-text-muted mt-3">
            Get an instant realistic price range, paper recommendations, and turnaround times in under 10 seconds.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-surface border border-border-subtle rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-12">
          {/* Controls Column */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
            {/* Step 1: Product Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-subtle mb-2">
                1. Select Product Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {products.map((p) => {
                  const isSelected = selectedProduct.id === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleProductChange(p.id)}
                      className={`text-left p-3 rounded-xl border text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-accent/10 border-accent text-accent font-semibold shadow-sm"
                          : "bg-surface-light border-border-subtle text-text-main hover:border-accent/40"
                      }`}
                    >
                      {p.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Quantity Selection */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-text-subtle">
                  2. Select Quantity (MOQ: {selectedProduct.moq} pcs)
                </label>
                <span className="text-xs text-text-muted">Higher Qty = Lower Unit Cost</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.quantities.map((qty) => {
                  const isSelected = selectedQty === qty;
                  return (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => setSelectedQty(qty)}
                      className={`px-4 py-2 rounded-xl border text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-primary text-text-light border-primary font-bold shadow-sm"
                          : "bg-surface-light border-border-subtle text-text-main hover:border-primary/40"
                      }`}
                    >
                      {qty.toLocaleString()} pcs
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Finish Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-subtle mb-2">
                3. Premium Surface Finish
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
                          ? "bg-accent/15 border-accent text-text-main font-semibold"
                          : "bg-surface-light border-border-subtle text-text-muted hover:border-accent/30"
                      }`}
                    >
                      <span>{f.name}</span>
                      {isSelected && <FaCheckCircle className="text-accent" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Result Column (Instant Summary & WhatsApp Quote CTA) */}
          <div className="md:col-span-5 bg-primary-dark text-text-light p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-border-dark">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-accent uppercase">
                Instant Spec Summary
              </span>
              <h3 className="text-xl font-bold text-text-light mt-1 mb-4">
                {selectedProduct.name}
              </h3>

              {/* Price Range Box */}
              <div className="p-4 rounded-2xl bg-primary-surface border border-border-dark mb-6">
                <span className="text-xs text-text-light-muted block mb-1">
                  Estimated Range ({selectedQty} units):
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-accent">
                  ₹{minEst.toLocaleString()} – ₹{maxEst.toLocaleString()}*
                </div>
                <span className="text-[11px] text-text-light-muted mt-1 block">
                  ≈ ₹{(totalRaw / selectedQty).toFixed(2)} per unit with {selectedFinish.name}
                </span>
              </div>

              {/* Specifications List */}
              <div className="space-y-3 text-xs text-text-light-muted mb-6">
                <div className="flex items-center gap-2">
                  <FaFileAlt className="text-accent text-sm shrink-0" />
                  <span>
                    <strong className="text-text-light">Paper:</strong> {selectedProduct.defaultGsm}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBolt className="text-accent text-sm shrink-0" />
                  <span>
                    <strong className="text-text-light">Est. Turnaround:</strong> {selectedProduct.turnaround}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-whatsapp text-sm shrink-0" />
                  <span>
                    <strong className="text-text-light">Proofing:</strong> 100% Digital PDF / 3D Proof Included
                  </span>
                </div>
              </div>
            </div>

            <div>
              <a
                href={`https://wa.me/919725281074?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center gap-2 w-full py-3.5 px-5 rounded-xl bg-accent hover:bg-accent-hover text-text-light font-bold text-sm shadow-lg transition-all duration-300"
              >
                <FaWhatsapp className="text-lg" />
                <span>Get Exact WhatsApp Quote</span>
              </a>
              <p className="text-[10px] text-text-light-muted text-center mt-2.5">
                *Final price may vary based on custom dielines, exact GSM, and GST.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
