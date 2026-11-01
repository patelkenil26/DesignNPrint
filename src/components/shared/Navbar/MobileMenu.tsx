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

const MobileMenu = ({ isOpen, toggle, serviceOpen, toggleServices }: any) => {
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
          transition={{ duration: 0.3 }}
          className="lg:hidden bg-primary-surface/95 backdrop-blur-2xl border-t border-white/10 px-4 py-5 shadow-2xl overflow-hidden"
        >
          {/* Quick 3D Quote Button on Mobile */}
          <div className="mb-4">
            <Link
              href="/quote"
              onClick={toggle}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-accent via-amber-400 to-yellow-500 text-primary-dark font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 active:scale-98 transition-all"
            >
              <FaBolt />
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
                    className={`block px-3.5 py-2.5 rounded-xl transition-all ${
                      active
                        ? "text-accent bg-accent/15 border border-accent/30 font-semibold"
                        : "text-text-light/90 hover:text-accent hover:bg-white/5"
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
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-text-light hover:text-accent font-semibold transition-colors"
                onClick={toggleServices}
              >
                <span>Browse All 24+ Products</span>
                <FaChevronDown className={`text-xs transition-transform duration-300 ${serviceOpen ? "rotate-180 text-accent" : "opacity-60"}`} />
              </button>

              <AnimatePresence>
                {serviceOpen && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-2 gap-2 mt-2 px-2 pb-2"
                  >
                    {services.map((service) => (
                      <li key={service.id}>
                        <Link
                          href={`/services/${service.id}`}
                          onClick={() => {
                            toggle();
                            toggleServices();
                          }}
                          className="block p-2 rounded-lg text-xs text-text-light-muted hover:text-accent hover:bg-white/5 transition-colors truncate"
                        >
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          </ul>

          {/* Quick Calling Footer in Mobile Menu */}
          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-3 text-xs">
            <a
              href="tel:+919725281074"
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-text-light hover:text-accent"
            >
              <FaPhoneAlt className="text-accent text-xs" />
              <span>Call Press</span>
            </a>
            <a
              href="https://wa.me/919725281074"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-whatsapp/20 border border-whatsapp/30 text-whatsapp font-bold"
            >
              <FaWhatsapp className="text-sm" />
              <span>WhatsApp</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
