"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  FaCheckCircle, 
  FaHistory, 
  FaPrint, 
  FaAward, 
  FaShieldAlt, 
  FaMapMarkerAlt, 
  FaWhatsapp, 
  FaArrowRight 
} from "react-icons/fa";

const milestones = [
  { year: "2008", title: "Founded in Ahmedabad", desc: "Started operations with precision commercial offset printing to serve local Gujarat commerce and industry." },
  { year: "2014", title: "Packaging Expansion", desc: "Introduced dedicated mono-carton packaging and automated die-cutting lines for pharmaceutical and FMCG clients." },
  { year: "2019", title: "Luxury Hot Foil & UV Lab", desc: "Commissioned precision hydraulic foil stamping and raised Spot UV coating equipment for executive branding." },
  { year: "2024+", title: "Digital 3D Prepress Workflow", desc: "Standardized 100% digital 3D proofing, dieline CAD engineering, and rapid 24-48h rush turnaround capabilities." },
];

const pillars = [
  {
    icon: <FaShieldAlt />,
    title: "Zero-Defect Pre-Press",
    desc: "Every design file goes through an automated 300 DPI resolution, bleed margin, and CMYK color profile inspection before plates are exposed.",
  },
  {
    icon: <FaPrint />,
    title: "Industrial Offset Capability",
    desc: "High-speed multi-color offset presses capable of delivering consistent PMS spot colors and micro-sharp typography across lakhs of copies.",
  },
  {
    icon: <FaAward />,
    title: "Precision Embellishment",
    desc: "In-house hot foil stamping, thermal velvet lamination, blind debossing, and automated die-cutting for uncrushable carton structures.",
  },
];

export default function AboutPage() {
  return (
    <div className="font-poppins bg-surface min-h-screen">
      {/* 1. Header Banner */}
      <section className="bg-surface-light border-b border-border-subtle py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-text-muted mb-4">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span>›</span>
            <span className="text-text-main font-semibold">About Us</span>
          </div>

          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent-light/50 px-3 py-1 rounded-full border border-accent/20">
              Our Story &amp; Philosophy
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-text-main mt-3 tracking-tight">
              17+ Years of Commercial Printing &amp; Packaging Craftsmanship
            </h1>
            <p className="text-sm sm:text-base text-text-subtle mt-3 leading-relaxed">
              Founded in 2008 in Naroda, Ahmedabad, Design N Print bridges the gap between creative design agency thinking and industrial offset printing execution.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Brand Narrative & Positioning */}
      <section className="py-20 px-4 sm:px-8 border-b border-border-subtle">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase text-secondary font-bold">The Core Belief</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-text-main leading-tight">
              &ldquo;We Don&apos;t Just Print. We Make Your Brand Physical.&rdquo;
            </h2>
            <p className="text-sm sm:text-base text-text-subtle leading-relaxed">
              In an era dominated by digital screens, the physical items a customer touches — a weighty 450 GSM visiting card, an uncrushable medicine carton, an embossed certificate — carry immense psychological authority.
            </p>
            <p className="text-sm sm:text-base text-text-subtle leading-relaxed">
              Ordinary printing presses treat design as an afterthought, while design agencies often don&apos;t understand paper grain, dieline tolerances, or ink absorption. At Design N Print, our graphic designers work hand-in-hand with our offset machine operators on the shop floor.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-text-main">
                <FaCheckCircle className="text-whatsapp" />
                <span>100% Pre-Print Proof Sign-off</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-text-main">
                <FaCheckCircle className="text-whatsapp" />
                <span>Direct Mill-Sourced Boards</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-text-main">
                <FaCheckCircle className="text-whatsapp" />
                <span>Zero Compromise on DPI</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-primary-dark text-text-light border border-border-dark shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/15 rounded-full blur-3xl pointer-events-none"></div>

              <span className="text-xs font-mono uppercase text-accent font-bold">Studio Overview</span>
              <h3 className="text-2xl font-bold text-text-light mt-1 mb-6">Production At A Glance</h3>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 rounded-2xl bg-primary-surface border border-border-dark">
                  <span className="text-3xl font-extrabold text-accent">17+</span>
                  <p className="text-xs text-text-light-muted mt-1">Years Operating Since 2008</p>
                </div>
                <div className="p-4 rounded-2xl bg-primary-surface border border-border-dark">
                  <span className="text-3xl font-extrabold text-secondary">200+</span>
                  <p className="text-xs text-text-light-muted mt-1">Active Corporate &amp; Pharma Clients</p>
                </div>
                <div className="p-4 rounded-2xl bg-primary-surface border border-border-dark">
                  <span className="text-3xl font-extrabold text-whatsapp">120+</span>
                  <p className="text-xs text-text-light-muted mt-1">Catalogued Print Products</p>
                </div>
                <div className="p-4 rounded-2xl bg-primary-surface border border-border-dark">
                  <span className="text-3xl font-extrabold text-accent">99.8%</span>
                  <p className="text-xs text-text-light-muted mt-1">Color Registration Accuracy</p>
                </div>
              </div>

              <p className="text-xs text-text-light-muted mt-6 pt-6 border-t border-border-dark">
                Workshop &amp; Studio: Modern Corner, opp. National Handloom, Naroda, Ahmedabad, Gujarat 382330.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. The Three Pillars of Quality */}
      <section className="py-20 px-4 sm:px-8 bg-surface-light border-b border-border-subtle">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent-light/50 px-3 py-1 rounded-full border border-accent/20">
              Our Methodology
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-text-main mt-3">
              Built on 3 Non-Negotiable Quality Standards
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((item, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-surface border border-border-subtle shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-accent/15 text-accent flex items-center justify-center text-xl mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-text-main mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-text-subtle leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-border-subtle text-xs font-semibold text-accent">
                  Standard Procedure
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Journey Timeline */}
      <section className="py-20 px-4 sm:px-8 bg-surface border-b border-border-subtle">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary-bg px-3 py-1 rounded-full border border-secondary/20">
              Our Heritage
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-text-main mt-3">
              Key Milestones in Our Journey
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-surface-light border border-border-subtle shadow-xs">
                <span className="text-2xl font-black text-accent font-mono block mb-2">{m.year}</span>
                <h4 className="font-bold text-base text-text-main mb-2">{m.title}</h4>
                <p className="text-xs text-text-muted leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Studio Visit CTA */}
      <section className="py-16 px-4 sm:px-8 bg-surface-muted">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-text-main mb-3">
            Want to meet our prepress designers in person?
          </h3>
          <p className="text-xs sm:text-sm text-text-muted mb-8 max-w-xl mx-auto">
            Drop by our studio in Naroda, Ahmedabad. Have a cup of chai, review paper swatch decks, and see live offset printing machines running in person.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-accent text-text-light font-bold text-sm shadow-md transition-all"
            >
              <FaMapMarkerAlt />
              <span>Studio Address &amp; Map</span>
            </Link>
            <a
              href="https://wa.me/919725281074?text=Hi%20Design%20N%20Print,%20I%20would%20like%20to%20visit%20your%20Naroda%20studio."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-text-light font-bold text-sm shadow-md transition-all"
            >
              <FaWhatsapp className="text-lg" />
              <span>Message on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
