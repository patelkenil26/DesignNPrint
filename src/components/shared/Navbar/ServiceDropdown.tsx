"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaBoxes, FaLayerGroup, FaArrowRight, FaCheck } from "react-icons/fa";
import { services } from "@/data/servicesData";

const ServiceDropdown = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 mt-3 w-80 sm:w-96 z-50 shadow-2xl rounded-2xl bg-surface/95 backdrop-blur-xl border border-border-subtle overflow-hidden"
    >
      {/* Mega Header with Direct Links */}
      <div className="p-4 bg-gradient-to-r from-surface-muted to-surface border-b border-border-subtle flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-bold">Catalog Navigation</span>
          <h4 className="text-xs font-bold text-text-main">24+ Print &amp; Packaging Products</h4>
        </div>
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent hover:bg-accent-hover text-text-light text-xs font-bold transition-all shadow-sm"
        >
          <span>View Hub</span>
          <FaArrowRight className="text-[10px]" />
        </Link>
      </div>

      {/* Featured Quick Filters */}
      <div className="grid grid-cols-2 gap-2 p-3 bg-surface border-b border-border-subtle text-xs">
        <Link
          href="/packaging"
          className="flex items-center gap-2 p-2 rounded-xl hover:bg-surface-muted border border-transparent hover:border-border-subtle transition-colors group"
        >
          <div className="w-7 h-7 rounded-lg bg-accent/15 text-accent flex items-center justify-center shrink-0">
            <FaBoxes className="text-xs" />
          </div>
          <div>
            <p className="font-bold text-text-main group-hover:text-accent">Pharma Cartons</p>
            <p className="text-[10px] text-text-muted">Custom Dielines</p>
          </div>
        </Link>

        <Link
          href="/materials"
          className="flex items-center gap-2 p-2 rounded-xl hover:bg-surface-muted border border-transparent hover:border-border-subtle transition-colors group"
        >
          <div className="w-7 h-7 rounded-lg bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
            <FaLayerGroup className="text-xs" />
          </div>
          <div>
            <p className="font-bold text-text-main group-hover:text-secondary">Swatch Lab</p>
            <p className="text-[10px] text-text-muted">80 to 600 GSM</p>
          </div>
        </Link>
      </div>

      {/* Scrollable Products List */}
      <div className="max-h-72 overflow-y-auto scrollbar-thin p-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              className="px-3 py-2 rounded-xl text-xs text-text-main hover:bg-accent/10 hover:text-accent font-medium transition-colors flex items-center gap-2 group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-border-subtle group-hover:bg-accent transition-colors shrink-0"></span>
              <span className="truncate">{service.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceDropdown;
