// src/components/about/ServicesList.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { services } from "@/data/servicesData";

const ServicesList = () => (
  <motion.div
    className="py-8 px-4 font-poppins"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <h3 className="text-2xl font-semibold text-center mb-6 text-text-main">Services</h3>
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-lg text-text-muted">
      {services.map((service) => (
        <div key={service.id} className="flex items-start gap-2">
          <span className="text-accent font-bold">+</span>
          <Link
            href={`/services/${service.id}`}
            className="text-secondary hover:text-secondary-hover hover:underline cursor-pointer transition-colors"
          >
            {service.name}
          </Link>
        </div>
      ))}
    </div>
  </motion.div>
);

export default ServicesList;
