"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { services } from "@/data/servicesData";
import ServiceCard from "@/components/sections/Services/ServiceCard";
import ServiceModal from "@/components/sections/Services/ServiceModal";
import { FaSearch, FaCheckCircle, FaBolt, FaShieldAlt, FaWhatsapp, FaArrowRight } from "react-icons/fa";

const categories = [
  { id: "all", label: "All Products" },
  { id: "corporate", label: "Corporate Identity" },
  { id: "packaging", label: "Packaging & Boxes" },
  { id: "pouches", label: "Cotton & Eco Pouches" },
  { id: "marketing", label: "Marketing & Catalogues" },
];

export default function ServicesHubPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const openModal = (index: number) => setModalIndex(index);
  const closeModal = () => setModalIndex(null);
  const prevImage = () => setModalIndex((prev) => (prev === null || prev === 0 ? services.length - 1 : prev - 1));
  const nextImage = () => setModalIndex((prev) => (prev === null || prev === services.length - 1 ? 0 : prev + 1));

  const filteredServices = useMemo(() => {
    return services.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.title.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;
      if (activeCategory === "all") return true;

      const lower = item.title.toLowerCase();
      if (activeCategory === "corporate") {
        return (
          lower.includes("visiting") ||
          lower.includes("letterhead") ||
          lower.includes("envelope") ||
          lower.includes("file") ||
          lower.includes("folder") ||
          lower.includes("certificate")
        );
      }
      if (activeCategory === "packaging") {
        return (
          lower.includes("box") ||
          lower.includes("packaging") ||
          lower.includes("medicine") ||
          lower.includes("cosmetic") ||
          lower.includes("pesticide") ||
          lower.includes("sticker") ||
          lower.includes("label")
        );
      }
      if (activeCategory === "pouches") {
        return lower.includes("pouch") || lower.includes("cotton");
      }
      if (activeCategory === "marketing") {
        return (
          lower.includes("brochure") ||
          lower.includes("pamphlet") ||
          lower.includes("catalogue") ||
          lower.includes("booklet") ||
          lower.includes("banner") ||
          lower.includes("standee") ||
          lower.includes("calendar") ||
          lower.includes("ceramic")
        );
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="font-poppins bg-surface min-h-screen">
      {/* Header Banner */}
      <section className="bg-surface-light border-b border-border-subtle py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-text-muted mb-4">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span>›</span>
            <span className="text-text-main font-semibold">Services &amp; Products</span>
          </div>

          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent-light/50 px-3 py-1 rounded-full border border-accent/20">
              Commercial Printing &amp; Custom Packaging
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-text-main mt-3 tracking-tight">
              Our Products &amp; Printing Solutions
            </h1>
            <p className="text-sm sm:text-base text-text-subtle mt-3 leading-relaxed">
              Explore our complete range of 20+ specialized printing products. From corporate stationery and mono-carton packaging to waterproof labels and cotton pouches — calibrated for perfection since 2008.
            </p>
          </div>

          {/* Quick Filter & Search Bar */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative max-w-md w-full">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-sm" />
              <input
                type="text"
                placeholder="Search products (e.g. box, card, brochure, pouch)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-subtle bg-surface text-text-main text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* Service Count Badge */}
            <div className="text-xs text-text-muted font-medium flex items-center gap-2">
              <span>Showing <strong className="text-text-main">{filteredServices.length}</strong> of {services.length} Products</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-border-subtle">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-accent text-text-light shadow-md shadow-accent/25"
                    : "bg-surface-light hover:bg-surface border border-border-subtle text-text-muted hover:text-text-main"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Grid List */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredServices.map((card, index) => {
              const originalIndex = services.findIndex((s) => s.title === card.title);
              return (
                <ServiceCard
                  key={card.id || card.title}
                  index={index}
                  image={card.image}
                  title={card.title}
                  link={card.link}
                  onOpenModal={() => openModal(originalIndex >= 0 ? originalIndex : index)}
                />
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-base font-semibold text-text-main">No products found matching &ldquo;{searchQuery}&rdquo;</p>
            <p className="text-xs text-text-muted mt-1">Try another keyword or select All Products</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
              className="mt-4 px-4 py-2 rounded-xl bg-accent text-text-light text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Custom Requirements Consultation */}
        <div className="mt-16 rounded-3xl bg-surface-muted border border-border-subtle p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-accent font-mono">Bespoke Production</span>
            <h3 className="text-xl sm:text-2xl font-bold text-text-main mt-1">Don&apos;t see your exact packaging dieline or size?</h3>
            <p className="text-xs sm:text-sm text-text-muted mt-1.5 max-w-xl">
              We engineer custom dielines, foil stamps, and multi-ply corrugated boxes tailored to your exact product dimensions.
            </p>
          </div>
          <a
            href="https://wa.me/919725281074?text=Hi%20Design%20N%20Print,%20I%20have%20a%20custom%20packaging%20requirement%20not%20listed%20on%20the%20website."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-text-light text-sm font-bold shadow-lg transition-all shrink-0"
          >
            <FaWhatsapp className="text-lg" />
            <span>Request Custom Dieline</span>
          </a>
        </div>
      </div>

      {/* Quick View Modal */}
      <ServiceModal
        isOpen={modalIndex !== null}
        service={modalIndex !== null ? services[modalIndex] : null}
        close={closeModal}
        prev={prevImage}
        next={nextImage}
      />
    </div>
  );
}
