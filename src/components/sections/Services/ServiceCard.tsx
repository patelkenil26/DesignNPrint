"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
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
      className="group relative rounded-2xl border border-border-subtle bg-surface hover:border-accent/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: (index % 6) * 0.08 }}
      viewport={{ once: true }}
    >
      {/* Top Image Box */}
      <div 
        className="relative w-full h-[200px] sm:h-[240px] bg-surface-light overflow-hidden flex items-center justify-center cursor-pointer"
        onClick={onOpenModal}
      >
        <div className="relative w-full h-full p-4">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Hover Quick View Overlay */}
        <div className="absolute inset-0 bg-primary-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-surface text-text-main text-xs font-bold shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <FaEye className="text-accent" />
            <span>Quick View</span>
          </span>
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
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
            <span>High-precision CMYK offset &amp; digital lines</span>
          </p>
        </div>

        <div className="pt-3 border-t border-border-subtle flex items-center justify-between gap-2">
          <button
            onClick={onOpenModal}
            className="text-xs font-semibold text-text-muted hover:text-text-main flex items-center gap-1 transition-colors"
          >
            <span>Details</span>
          </button>

          {link && (
            <Link
              href={link}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-hover transition-colors"
            >
              <span>Explore Spec</span>
              <FaArrowRight className="text-[10px] transform group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
