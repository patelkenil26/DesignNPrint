"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FaBolt, FaChevronDown } from "react-icons/fa";
import ServiceDropdown from "./ServiceDropdown";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Packaging", href: "/packaging" },
  { label: "Materials", href: "/materials" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function DesktopMenu() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="hidden lg:flex items-center gap-2 xl:gap-3 text-sm font-medium tracking-wide">
      {navItems.map((item) => {
        const active = isLinkActive(item.href);

        if (item.hasDropdown) {
          return (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Link
                href={item.href}
                className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all duration-300 ${
                  active
                    ? "text-accent bg-accent/15 border border-accent/30 shadow-[0_0_15px_rgba(250,204,21,0.2)] font-semibold"
                    : "text-text-light/85 hover:text-accent hover:bg-white/5 border border-transparent"
                }`}
              >
                <span>{item.label}</span>
                <FaChevronDown className={`text-[10px] transition-transform duration-300 ${isDropdownOpen ? "rotate-180 text-accent" : "opacity-60"}`} />

                {active && (
                  <motion.span
                    layoutId="desktop-active-pill"
                    className="absolute inset-0 rounded-xl bg-accent/10 border border-accent/30 pointer-events-none"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>

              <AnimatePresence>
                {isDropdownOpen && <ServiceDropdown />}
              </AnimatePresence>
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`relative px-3.5 py-2 rounded-xl transition-all duration-300 ${
              active
                ? "text-accent bg-accent/15 border border-accent/30 shadow-[0_0_15px_rgba(250,204,21,0.2)] font-semibold"
                : "text-text-light/85 hover:text-accent hover:bg-white/5 border border-transparent"
            }`}
          >
            <span>{item.label}</span>

            {active && (
              <motion.span
                layoutId="desktop-active-pill"
                className="absolute inset-0 rounded-xl bg-accent/10 border border-accent/30 pointer-events-none"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </Link>
        );
      })}

      {/* 3D Gradient CTA for Instant Quote */}
      <div className="ml-2">
        <Link
          href="/quote"
          className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-xl font-extrabold text-xs tracking-wider uppercase transition-all duration-300 shadow-md ${
            pathname.startsWith("/quote")
              ? "bg-gradient-to-r from-accent via-amber-400 to-yellow-500 text-primary-dark shadow-[0_0_20px_rgba(250,204,21,0.5)] scale-105"
              : "bg-gradient-to-r from-accent via-amber-400 to-yellow-500 hover:brightness-110 text-primary-dark shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 active:translate-y-0"
          }`}
        >
          <FaBolt className="text-xs" />
          <span>Instant Quote</span>
        </Link>
      </div>
    </nav>
  );
}
