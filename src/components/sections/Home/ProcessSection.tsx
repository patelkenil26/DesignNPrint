"use client";

import React from "react";
import {
  FaFileInvoice,
  FaDesktop,
  FaPrint,
  FaTruck,
  FaShieldAlt,
  FaCheckCircle,
  FaBolt,
} from "react-icons/fa";

const steps = [
  {
    step: "01",
    icon: <FaFileInvoice />,
    title: "Requirement & Instant Quote",
    metric: "Under 10 Minutes",
    description:
      "Select your product specifications online or share artwork directly over WhatsApp. We provide transparent, itemized commercial pricing with no hidden plate fees.",
    tag: "Upfront Pricing",
  },
  {
    step: "02",
    icon: <FaDesktop />,
    title: "Pre-Flight & 3D Proof Sign-off",
    metric: "Zero Print Risk",
    description:
      "Our prepress engineers verify 300 DPI resolution, 3mm bleeds, and CMYK curve separations. You receive a digital 3D unboxing proof for 100% written sign-off.",
    tag: "100% Proof Guarantee",
  },
  {
    step: "03",
    icon: <FaPrint />,
    title: "Heidelberg Offset & Finishes",
    metric: "2400 DPI CTP",
    description:
      "Jobs are imaged onto thermal CTP plates and run on high-speed multi-color offset presses, followed by laser die-cutting, hydraulic hot foil, and UV curing.",
    tag: "±0.2mm Tolerance",
  },
  {
    step: "04",
    icon: <FaTruck />,
    title: "Rigorous QC & Doorstep Dispatch",
    metric: "24–48h Turnaround",
    description:
      "Every batch undergoes micrometer caliper inspection and scuff testing, vacuum boxed and dispatched with same-day express van delivery across Ahmedabad GIDC.",
    tag: "Same-Day GIDC Van",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-16 sm:py-20 bg-surface-light border-b border-border-subtle font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary-bg px-3.5 py-1 rounded-full border border-secondary/20">
            Frictionless Industrial Workflow
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-text-main mt-3 tracking-tight">
            How We Turn Digital Files Into Flawless Physical Print
          </h2>
          <p className="text-sm sm:text-base text-text-subtle mt-3 leading-relaxed">
            A battle-tested 4-step manufacturing protocol engineered so corporate purchasers and brand owners never worry about color shifts or delivery delays.
          </p>
        </div>

        {/* 4-Step Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 relative">
          {steps.map((item, idx) => (
            <div
              key={item.step}
              className="bg-surface rounded-2xl border border-border-subtle p-5 sm:p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group hover:-translate-y-1 relative"
            >
              <div>
                {/* Step Top Bar */}
                <div className="flex justify-between items-center mb-5">
                  <div className="w-11 h-11 rounded-xl bg-accent/15 text-accent flex items-center justify-center text-lg group-hover:bg-accent group-hover:text-primary-dark transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-2xl font-black text-text-muted/30 font-mono">
                    {item.step}
                  </span>
                </div>

                <div className="mb-2">
                  <span className="text-[10px] font-mono text-accent font-bold uppercase tracking-wider">
                    {item.metric}
                  </span>
                  <h3 className="text-base font-bold text-text-main mt-0.5">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-text-subtle leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Bottom Verification Tag */}
              <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-[11px] font-semibold text-text-main">
                <span className="flex items-center gap-1.5 text-whatsapp">
                  <FaCheckCircle className="text-[10px]" />
                  <span>{item.tag}</span>
                </span>
                <span className="text-text-muted text-[10px] font-mono">Phase {idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
