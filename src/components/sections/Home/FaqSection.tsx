"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaQuestionCircle, FaWhatsapp, FaBolt, FaFileAlt, FaShieldAlt, FaBoxOpen } from "react-icons/fa";

interface FaqItem {
  id: string;
  category: "speed" | "artwork" | "proofs" | "pricing";
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    id: "01",
    category: "speed",
    q: "How fast can I get my printing order delivered (Turnaround Time)?",
    a: "Standard commercial print runs (visiting cards, flyers, brochures, stickers) take 24 to 48 hours. Custom packaging mono-cartons, hot foil stamping, and embossed presentation folders take between 3 to 5 business days. We also offer same-day rush priority dispatch across Gujarat for urgent corporate exhibitions and industrial launches.",
  },
  {
    id: "02",
    category: "artwork",
    q: "I don't have a print-ready design file or CAD dieline. Can you design it for me?",
    a: "Yes, absolutely! We have in-house senior packaging engineers and prepress designers who build custom brand dielines, pharmaceutical carton structures, brochures, and corporate stationery from scratch. You will receive photorealistic 3D digital mockups to inspect and approve before physical plates are exposed.",
  },
  {
    id: "03",
    category: "artwork",
    q: "What file formats and specifications do you require for offset printing?",
    a: "We accept PDF (Print Ready / PDF/X-1a preferred), CorelDraw (CDR), Adobe Illustrator (AI), and layered Photoshop (PSD). For flawless sharpness, ensure files are in CMYK color mode, 300 DPI resolution at actual size, with all fonts converted to curves/outlines and 3mm bleed margins included on all trim edges.",
  },
  {
    id: "04",
    category: "proofs",
    q: "Will I get to see a sample or proof before mass plate production?",
    a: "Yes! We operate under a strict '100% Pre-Print Proof Sign-off' guarantee. Before plates are exposed or machine ink is mixed, we send high-resolution digital PDF proofs and 3D mockups. For high-volume pharmaceutical and rigid packaging orders, physical unprinted structural dieline dummies can also be inspected at our Naroda studio.",
  },
  {
    id: "05",
    category: "pricing",
    q: "What are your Minimum Order Quantities (MOQ)?",
    a: "We cater to startups as well as large industrial enterprises: Luxury visiting cards start from just 100 pcs, customized product stickers from 500 pcs, and custom packaging mono-cartons from 500 pcs. Larger volume orders receive substantial bulk plate and machine run discounts.",
  },
  {
    id: "06",
    category: "speed",
    q: "Do you deliver across Ahmedabad, GIDC industrial estates, and other states?",
    a: "Yes! We provide same-day direct van dispatch across Ahmedabad and all GIDC industrial belts (Sanand, Changodar, Vatva, Naroda, Odhav, Kalol) and express courier / cargo freight shipping to Surat, Vadodara, Rajkot, Morbi, and across India.",
  },
];

const categories = [
  { id: "all", label: "All Questions" },
  { id: "speed", label: "Turnaround & Speed" },
  { id: "artwork", label: "Files & Dielines" },
  { id: "proofs", label: "3D Proofs & Quality" },
  { id: "pricing", label: "MOQ & Quantities" },
];

export default function FaqSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openId, setOpenId] = useState<string | null>("01");

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = activeCategory === "all"
    ? faqs
    : faqs.filter((f) => f.category === activeCategory);

  return (
    <section className="py-20 bg-surface border-b border-border-subtle font-poppins relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent bg-accent-light/50 px-3.5 py-1 rounded-full border border-accent/20">
            <FaQuestionCircle />
            <span>Got Printing Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-text-main mt-3 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-text-muted mt-2">
            Clear, transparent answers on our prepress workflow, turnaround timelines, and material tolerances.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? "bg-accent text-primary-dark shadow-sm scale-105"
                  : "bg-surface-light hover:bg-surface-muted text-text-muted border border-border-subtle"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Animated Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                layout
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-surface border-accent/40 shadow-lg ring-1 ring-accent/20"
                    : "bg-surface-light border-border-subtle hover:border-accent/30 shadow-xs"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 transition-colors group"
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-extrabold transition-colors ${
                      isOpen
                        ? "bg-accent text-primary-dark shadow-sm"
                        : "bg-surface text-text-muted border border-border-subtle group-hover:text-accent"
                    }`}>
                      {faq.id}
                    </span>
                    <span className={`font-bold text-sm sm:text-base transition-colors ${
                      isOpen ? "text-accent" : "text-text-main group-hover:text-accent"
                    }`}>
                      {faq.q}
                    </span>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? "bg-accent/15 text-accent" : "text-text-muted"
                    }`}
                  >
                    <FaChevronDown className="text-xs" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-6 pt-1 text-xs sm:text-sm text-text-subtle leading-relaxed border-t border-border-subtle/50 pl-16">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* WhatsApp Helpline Footer in FAQ */}
        <div className="mt-12 p-6 rounded-2xl bg-surface-muted border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-bold text-text-main text-sm sm:text-base">Have a specialized custom packaging requirement?</h4>
            <p className="text-xs text-text-muted mt-0.5">
              Talk directly with our press supervisor in Naroda, Ahmedabad.
            </p>
          </div>
          <a
            href="https://wa.me/919725281074?text=Hi%20Design%20N%20Print,%20I%20have%20a%20specific%20packaging%20question."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-whatsapp hover:bg-emerald-600 text-white text-xs font-bold shrink-0 transition-colors shadow-md"
          >
            <FaWhatsapp className="text-base" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
