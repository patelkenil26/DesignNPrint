import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import ServiceDropdown from "./ServiceDropdown";

const DesktopMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <ul className="hidden lg:flex gap-6 xl:gap-8 items-center text-sm xl:text-base font-medium tracking-wide">
      <li>
        <Link href="/" className="group relative inline-block text-text-light hover:text-accent transition-colors">
          <span>Home</span>
          <span className="absolute left-0 -bottom-1 h-[2px] bg-accent opacity-0 group-hover:opacity-100 w-full scale-x-0 group-hover:scale-x-100 origin-left transition-all duration-300 rounded-full shadow-[0_0_12px_3px_var(--color-brand-accent)]"></span>
        </Link>
      </li>

      <li
        className="relative group inline-block text-text-light"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <Link href="/services" className="flex items-center gap-1 group-hover:text-accent transition-colors">
          <span>Services</span>
          <span className="text-xs opacity-70">▾</span>
        </Link>
        <span className="absolute left-0 -bottom-1 h-[2px] bg-accent opacity-0 group-hover:opacity-100 w-full scale-x-0 group-hover:scale-x-100 origin-left transition-all duration-300 rounded-full shadow-[0_0_12px_3px_var(--color-brand-accent)]"></span>

        <AnimatePresence>
          {isDropdownOpen && <ServiceDropdown />}
        </AnimatePresence>
      </li>

      <li>
        <Link href="/packaging" className="group relative inline-block text-text-light hover:text-accent transition-colors">
          <span>Packaging</span>
          <span className="absolute left-0 -bottom-1 h-[2px] bg-accent opacity-0 group-hover:opacity-100 w-full scale-x-0 group-hover:scale-x-100 origin-left transition-all duration-300 rounded-full shadow-[0_0_12px_3px_var(--color-brand-accent)]"></span>
        </Link>
      </li>

      <li>
        <Link href="/materials" className="group relative inline-block text-text-light hover:text-accent transition-colors">
          <span>Materials</span>
          <span className="absolute left-0 -bottom-1 h-[2px] bg-accent opacity-0 group-hover:opacity-100 w-full scale-x-0 group-hover:scale-x-100 origin-left transition-all duration-300 rounded-full shadow-[0_0_12px_3px_var(--color-brand-accent)]"></span>
        </Link>
      </li>

      <li>
        <Link href="/quote" className="group relative inline-block text-accent font-semibold hover:text-accent-hover transition-colors">
          <span>Instant Quote</span>
          <span className="absolute left-0 -bottom-1 h-[2px] bg-accent opacity-0 group-hover:opacity-100 w-full scale-x-0 group-hover:scale-x-100 origin-left transition-all duration-300 rounded-full shadow-[0_0_12px_3px_var(--color-brand-accent)]"></span>
        </Link>
      </li>

      <li>
        <Link href="/about" className="group relative inline-block text-text-light hover:text-accent transition-colors">
          <span>About Us</span>
          <span className="absolute left-0 -bottom-1 h-[2px] bg-accent opacity-0 group-hover:opacity-100 w-full scale-x-0 group-hover:scale-x-100 origin-left transition-all duration-300 rounded-full shadow-[0_0_12px_3px_var(--color-brand-accent)]"></span>
        </Link>
      </li>

      <li>
        <Link href="/contact" className="group relative inline-block text-text-light hover:text-accent transition-colors">
          <span>Contact</span>
          <span className="absolute left-0 -bottom-1 h-[2px] bg-accent opacity-0 group-hover:opacity-100 w-full scale-x-0 group-hover:scale-x-100 origin-left transition-all duration-300 rounded-full shadow-[0_0_12px_3px_var(--color-brand-accent)]"></span>
        </Link>
      </li>
    </ul>
  );
};

export default DesktopMenu;
