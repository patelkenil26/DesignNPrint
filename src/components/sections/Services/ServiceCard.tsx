"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaEye, FaArrowRight, FaCheckCircle } from "react-icons/fa";

interface ServiceCardProps {
  image: string;
  title: string;
  link?: string;
  index: number;
  onOpenModal: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ image, title, link, index, onOpenModal }) => {
  return (
    <motion.div
      className="group relative rounded-2xl border border-border-subtle bg-surface hover:border-accent/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: (index % 6) * 0.08 }}
      viewport={{ once: true }}
    >
      {/* Top Image Box */}
      <div 
        className="relative w-full h-[200px] sm:h-[240px] bg-surface-light overflow-hidden flex items-center justify-center p-4 cursor-pointer"
        onClick={onOpenModal}
      >
        <img
          src={image}
          alt={title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Hover Quick View Overlay */}
        <div className="absolute inset-0 bg-primary-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-surface text-text-main text-xs font-bold shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <FaEye className="text-accent" />
            <span>Quick View</span>
          </span>
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-2.5 py-0.5 rounded-md bg-surface/90 backdrop-blur-md border border-border-subtle text-[11px] font-semibold text-text-main shadow-xs">
            Offset Quality
          </span>
        </div>
      </div>

      {/* Card Content & Action */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-text-main group-hover:text-accent transition-colors line-clamp-1 mb-1.5">
            {title}
          </h3>
          <p className="text-xs text-text-muted flex items-center gap-1.5 mb-4">
            <FaCheckCircle className="text-whatsapp text-[10px]" />
            <span>Custom size, GSM &amp; foil options</span>
          </p>
        </div>

        <div className="pt-3 border-t border-border-subtle/60 flex items-center justify-between text-xs font-semibold">
          <button
            type="button"
            onClick={onOpenModal}
            className="text-text-muted hover:text-accent transition-colors flex items-center gap-1"
          >
            <span>Preview</span>
          </button>

          {link ? (
            <Link
              href={link}
              className="text-accent hover:text-accent-hover font-bold flex items-center gap-1 transition-colors"
            >
              <span>View Specs</span>
              <FaArrowRight className="text-[10px]" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={onOpenModal}
              className="text-accent hover:text-accent-hover font-bold flex items-center gap-1 transition-colors"
            >
              <span>Details</span>
              <FaArrowRight className="text-[10px]" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
