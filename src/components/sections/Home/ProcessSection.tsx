"use client";

import React from "react";
import { FaFileInvoice, FaDesktop, FaPrint, FaTruck, FaShieldAlt } from "react-icons/fa";

const steps = [
  {
    step: "01",
    icon: <FaFileInvoice />,
    title: "Requirement & Instant Quote",
    description: "Choose your product, quantity, and paper finishes online or send your requirement directly on WhatsApp. We provide transparent upfront pricing.",
  },
  {
    step: "02",
    icon: <FaDesktop />,
    title: "Pre-Flight & 3D Proof Approval",
    description: "Our prepress engineers check resolution (300 DPI), bleed lines (3mm), and color profiles. We share a digital 3D mockup for your 100% written signoff.",
  },
  {
    step: "03",
    icon: <FaPrint />,
    title: "High-Speed Industrial Print",
    description: "Once approved, jobs run on high-speed Heidelberg/Komori multi-color offset presses followed by automated die-cutting, foil stamping, and UV curing.",
  },
  {
    step: "04",
    icon: <FaTruck />,
    title: "Quality Check & Doorstep Delivery",
    description: "Every single batch undergoes rigorous quality check for color consistency and clean cuts, safely boxed and dispatched across Ahmedabad, Gujarat, and India.",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-20 bg-surface-light border-b border-border-subtle font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary-bg px-3 py-1 rounded-full border border-secondary/20">
            Frictionless Ordering
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-text-main mt-3">
            How We Turn Ideas Into Physical Reality
          </h2>
          <p className="text-sm sm:text-base text-text-muted mt-3">
            A reliable 4-step workflow engineered so you never have to worry about color shifts, misaligned borders, or delayed deliveries.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, idx) => (
            <div
              key={item.step}
              className="bg-surface rounded-2xl border border-border-subtle p-7 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between relative group hover:-translate-y-1"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center text-xl group-hover:bg-accent group-hover:text-text-light transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-2xl font-black text-text-muted/30 font-mono">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-text-main mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-subtle leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border-subtle/60 flex items-center gap-1.5 text-xs font-semibold text-accent">
                <FaShieldAlt className="text-[11px]" />
                <span>Zero Risk Guarantee</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
