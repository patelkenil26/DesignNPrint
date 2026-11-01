"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FaBolt, FaChevronDown, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { services } from "@/data/servicesData";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Services Hub", href: "/services" },
  { label: "Packaging Lab", href: "/packaging" },
  { label: "Materials & Finishes", href: "/materials" },
  { label: "About Our Story", href: "/about" },
  { label: "Contact & Studio", href: "/contact" },
];

interface MobileMenuProps {
  isOpen: boolean;
  toggle: () => void;
  serviceOpen: boolean;
  toggleServices: () => void;
}

export default function MobileMenu({
  isOpen,
  toggle,
  serviceOpen,
  toggleServices,
}: MobileMenuProps) {
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className="lg:hidden bg-[#090d16]/98 backdrop-blur-2xl border-t border-white/10 px-5 py-5 shadow-2xl overflow-hidden font-poppins text-white"
        >
          {/* Quick Quote Button on Mobile */}
          <div className="mb-4">
            <Link
              href="/quote"
              onClick={toggle}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-md bg-accent text-primary-dark font-bold text-xs uppercase tracking-wider shadow-sm active:scale-98 transition-all"
            >
              <FaBolt className="text-xs" />
              <span>Instant Cost Calculator</span>
            </Link>
          </div>

          <ul className="flex flex-col gap-1 text-sm font-medium">
            {menuItems.map((item) => {
              const active = isLinkActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={toggle}
                    className={`block py-2.5 transition-colors ${
                      active
                        ? "text-accent font-semibold border-l-2 border-accent pl-3"
                        : "text-white/80 hover:text-white pl-3"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}

            {/* Services Accordion */}
            <li className="mt-2 pt-2 border-t border-white/10">
              <button
                type="button"
                className="w-full flex items-center justify-between py-2.5 pl-3 text-white/90 hover:text-accent font-semibold transition-colors"
                onClick={toggleServices}
              >
                <span>Browse All 24+ Products</span>
                <FaChevronDown
                  className={`text-xs transition-transform duration-300 ${
                    serviceOpen ? "rotate-180 text-accent" : "opacity-60"
                  }`}
                />
              </button>

              <AnimatePresence>
                {serviceOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden pl-3 pr-1 py-1 space-y-1"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 max-h-56 overflow-y-auto scrollbar-thin py-1">
                      {services.map((service) => (
                        <Link
                          key={service.id}
                          href={`/services/${service.id}`}
                          onClick={toggle}
                          className="px-2.5 py-1.5 text-xs text-white/70 hover:text-accent hover:bg-white/5 rounded transition-colors flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0" />
                          <span className="truncate">{service.name}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>

          {/* Mobile Footer Quick Actions */}
          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
            <a
              href="tel:+919725281074"
              className="flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <FaPhoneAlt className="text-accent text-[10px]" />
              <span>+91 97252 81074</span>
            </a>

            <a
              href="https://wa.me/919725281074?text=Hi%20Design%20N%20Print,%20I%20have%20an%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-whatsapp hover:underline font-semibold"
            >
              <FaWhatsapp className="text-sm" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
