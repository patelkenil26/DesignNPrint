"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, Clock, Sparkles } from "lucide-react";
import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import SearchBox from "./SearchBox";
import WhatsAppButton from "./WhatsAppButton";
import { services } from "@/data/servicesData";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const handleSearch = (e: any) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    if (value) {
      const filtered = services.filter((service) =>
        service.name.toLowerCase().includes(value)
      );
      setFilteredResults(filtered as any);
    } else {
      setFilteredResults([]);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full font-poppins">
      {/* Top Industrial Live Status Ribbon */}
      <div className="bg-primary-dark/95 text-text-light border-b border-white/5 py-1.5 px-4 text-[11px] sm:text-xs">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-whatsapp animate-pulse"></span>
            <span className="text-text-light-muted hidden sm:inline">Naroda Press Unit Active:</span>
            <span className="font-semibold text-accent">24–48h Express Offset Dispatch</span>
            <span className="text-white/20 hidden md:inline">|</span>
            <span className="text-text-light-muted hidden md:inline">100% Free 3D Digital Proofing</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+919725281074"
              className="flex items-center gap-1.5 text-text-light-muted hover:text-accent transition-colors font-medium"
            >
              <Phone className="w-3 h-3 text-accent" />
              <span>+91 97252 81074</span>
            </a>
            <span className="text-white/20 hidden sm:inline">|</span>
            <span className="text-text-light-muted hidden sm:inline">Mon–Sat: 10AM–7PM</span>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navbar */}
      <nav className="bg-primary-surface/90 backdrop-blur-xl text-text-light border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
        <div className="container mx-auto px-4 py-3.5 flex justify-between items-center gap-4">
          <Logo />

          <DesktopMenu />

          <div className="flex items-center gap-3">
            <SearchBox
              searchTerm={searchTerm}
              handleSearch={handleSearch}
              filteredResults={filteredResults}
              clearSearch={() => setSearchTerm("")}
            />

            <button
              className="lg:hidden p-2 rounded-xl bg-surface/80 border border-white/10 text-text-light hover:text-accent focus:outline-none transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <MobileMenu
          isOpen={isMobileMenuOpen}
          toggle={() => setIsMobileMenuOpen(false)}
          serviceOpen={isServicesOpen}
          toggleServices={() => setIsServicesOpen(!isServicesOpen)}
        />

        <WhatsAppButton />
      </nav>
    </header>
  );
};

export default Navbar;
