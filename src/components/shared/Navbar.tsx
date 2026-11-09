"use client";

import React, { useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import Logo from "./Navbar/Logo";
import DesktopMenu from "./Navbar/DesktopMenu";
import MobileMenu from "./Navbar/MobileMenu";
import SearchBox from "./Navbar/SearchBox";
import WhatsAppButton from "./Navbar/WhatsAppButton";
import { buildWhatsAppLink } from "@/data/siteConfig";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-ink text-white font-poppins shadow-md" aria-label="Main navigation">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <Logo />
        <DesktopMenu />
        <div className="flex items-center gap-3">
          <SearchBox />
          <a
            href={buildWhatsAppLink("Hi Design N Print, I would like a quote.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-brand-yellow px-5 py-2.5 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95 lg:inline-flex"
          >
            <MessageCircle className="h-4 w-4" /> Get Quote
          </a>
          <button
            type="button"
            className="rounded-lg p-1.5 focus:outline-none focus-visible:outline-2 focus-visible:outline-brand-yellow lg:hidden"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} onNavigate={() => setIsMobileMenuOpen(false)} />

      <WhatsAppButton />
    </nav>
  );
};

export default Navbar;
