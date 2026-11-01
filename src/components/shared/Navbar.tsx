"use client";

import React, { useState } from "react";
import { FaBars, FaTimes, FaPhoneAlt } from "react-icons/fa";
import Logo from "./Navbar/Logo";
import DesktopMenu from "./Navbar/DesktopMenu";
import MobileMenu from "./Navbar/MobileMenu";
import SearchBox from "./Navbar/SearchBox";
import WhatsAppButton from "./Navbar/WhatsAppButton";
import { services } from "@/data/servicesData";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    if (value) {
      const filtered = services.filter((service) =>
        service.name.toLowerCase().includes(value)
      );
      setFilteredResults(filtered);
    } else {
      setFilteredResults([]);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full font-poppins">
      {/* 1. TOP LIVE STATUS & CONTACT RIBBON */}
      <div className="bg-[#070a10] text-text-light border-b border-white/[0.08] py-1 px-4 text-[11px] sm:text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-whatsapp animate-pulse shrink-0" />
            <span className="text-white/60 hidden sm:inline">Naroda Press Unit Active:</span>
            <span className="font-semibold text-accent">24–48h Express Dispatch</span>
            <span className="text-white/20 hidden md:inline">|</span>
            <span className="text-white/60 hidden md:inline">100% Free Digital Proofing</span>
          </div>

          <div className="flex items-center gap-4 text-white/70">
            <a
              href="tel:+919725281074"
              className="flex items-center gap-1.5 hover:text-accent transition-colors font-medium"
            >
              <FaPhoneAlt className="text-accent text-[10px]" />
              <span>+91 97252 81074</span>
            </a>
            <span className="text-white/20 hidden sm:inline">|</span>
            <span className="text-white/60 hidden sm:inline">Mon–Sat: 10AM–7PM</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN REDESIGNED ARCHITECTURAL NAVBAR */}
      <nav className="bg-[#0b0f17]/95 backdrop-blur-md text-text-light border-b border-white/10 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center gap-4">
          
          {/* Logo with clean margin */}
          <div className="shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation Links (Clean, No Box Pill Clutter) */}
          <DesktopMenu />

          {/* Right Utilities: Search & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <SearchBox
              searchTerm={searchTerm}
              handleSearch={handleSearch}
              filteredResults={filteredResults}
              clearSearch={() => setSearchTerm("")}
            />

            {/* Mobile Menu Hamburger (Clean Flat Icon) */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-white/10 text-white hover:text-accent focus:outline-none transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          toggle={() => setIsMobileMenuOpen(false)}
          serviceOpen={isServicesOpen}
          toggleServices={() => setIsServicesOpen(!isServicesOpen)}
        />

        {/* Global Floating WhatsApp Contact Action */}
        <WhatsAppButton />
      </nav>
    </header>
  );
}
