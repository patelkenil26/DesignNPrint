// components/navbar/ServiceDropdown.jsx
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { services } from "@/data/servicesData";

const ServiceDropdown = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full mt-2 w-64 z-50 shadow-2xl rounded-xl bg-surface border border-border-subtle overflow-hidden"
    >
      <div className="p-3 bg-surface-muted border-b border-border-subtle">
        <Link
          href="/services"
          className="text-xs font-bold text-accent hover:underline flex items-center justify-between"
        >
          <span>Explore All 24+ Services</span>
          <span>→</span>
        </Link>
      </div>
      <ul className="max-h-72 overflow-y-auto text-text-main scrollbar-thin py-1">
        {services.map((service) => (
          <li key={service.id}>
            <Link
              href={`/services/${service.id}`}
              className="block px-4 py-2 text-sm hover:bg-accent hover:text-text-light transition-all"
            >
              {service.name}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ServiceDropdown;
