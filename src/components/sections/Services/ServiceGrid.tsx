"use client";

import React, { useState } from "react";
import ServiceCard from "./ServiceCard";

interface ServiceItem {
  id: string;
  name: string;
  title: string;
  link?: string;
  image: string;
}

interface ServiceGridProps {
  services: ServiceItem[];
  openModal: (index: number) => void;
}

const categories = [
  { id: "all", label: "All Products" },
  { id: "corporate", label: "Corporate Identity" },
  { id: "packaging", label: "Packaging & Boxes" },
  { id: "pouches", label: "Cotton & Eco Pouches" },
  { id: "marketing", label: "Marketing & Catalogues" },
];

export default function ServiceGrid({ services, openModal }: ServiceGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredServices = services.filter((item) => {
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

  return (
    <section id="services-grid" className="py-20 bg-surface border-b border-border-subtle font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent-light/50 px-3 py-1 rounded-full border border-accent/20">
            Comprehensive Product Catalog
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-text-main mt-3">
            Precision Offset &amp; Packaging Portfolio
          </h2>
          <p className="text-sm sm:text-base text-text-muted mt-3">
            Explore our specialized categories crafted for corporate institutions, pharmaceutical companies, retailers, and marketing agencies.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredServices.map((card, index) => {
            const originalIndex = services.findIndex((s) => s.title === card.title);
            return (
              <ServiceCard
                key={card.title}
                index={index}
                image={card.image}
                title={card.title}
                link={card.link}
                onOpenModal={() => openModal(originalIndex >= 0 ? originalIndex : index)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
