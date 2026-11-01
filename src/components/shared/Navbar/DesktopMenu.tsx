"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown, FaBolt } from "react-icons/fa";
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
    <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[13px] font-medium tracking-wide">
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
                className={`relative flex items-center gap-1.5 px-3 py-2 transition-colors duration-200 ${
                  active
                    ? "text-accent font-semibold"
                    : "text-white/80 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                <FaChevronDown
                  className={`text-[9px] transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180 text-accent" : "opacity-60"
                  }`}
                />

                {/* Refined Underline Indicator (No Box) */}
                {active && (
                  <motion.span
                    layoutId="nav-active-underline"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-accent rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
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
            className={`relative px-3 py-2 transition-colors duration-200 ${
              active
                ? "text-accent font-semibold"
                : "text-white/80 hover:text-white"
            }`}
          >
            <span>{item.label}</span>

            {/* Refined Underline Indicator (No Box) */}
            {active && (
              <motion.span
                layoutId="nav-active-underline"
                className="absolute bottom-0 left-3 right-3 h-[2px] bg-accent rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        );
      })}

      {/* Refined Architectural CTA (No Boxy Gradient) */}
      <div className="ml-2">
        <Link
          href="/quote"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-accent hover:bg-accent-hover text-primary-dark font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm active:scale-95"
        >
          <FaBolt className="text-[10px]" />
          <span>Instant Quote</span>
        </Link>
      </div>
    </nav>
  );
}
