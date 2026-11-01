"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  FaCheckCircle, 
  FaPrint, 
  FaAward, 
  FaShieldAlt, 
  FaMapMarkerAlt, 
  FaWhatsapp, 
  FaArrowRight,
  FaIndustry,
  FaCogs,
  FaBoxes
} from "react-icons/fa";

const milestones = [
  {
    year: "2008",
    title: "Founded in Naroda, Ahmedabad",
    desc: "Established with precision commercial offset and multi-color letterpress equipment to serve Ahmedabad's thriving industrial and corporate sector.",
    badge: "Inception"
  },
  {
    year: "2014",
    title: "Pharma & FMCG Packaging Wing",
    desc: "Scaled up with automated mono-carton packaging lines, high-speed die-cutting, and strict adherence to medical packaging specifications.",
    badge: "Scale Up"
  },
  {
    year: "2019",
    title: "Luxury Embellishment & UV Lab",
    desc: "Commissioned precision hydraulic hot foil stamping, thermal velvet lamination, and raised Spot UV coating units for executive brand packaging.",
    badge: "Lab Upgrade"
  },
  {
    year: "2024+",
    title: "Digital 3D Prepress & Fast-Track",
    desc: "Integrated 100% digital 3D proofing, automated dieline CAD generation, and 24-48h rush turnaround protocols across all GIDC industrial belts.",
    badge: "Next Gen"
  },
];

const pillars = [
  {
    icon: <FaShieldAlt />,
    title: "Zero-Defect Pre-Press Inspection",
    desc: "Every vector dieline and artwork file is verified at 300 DPI, checking ink coverage limits, CMYK separation, and 3mm safety bleeds before plate exposure.",
    tag: "File Integrity",
  },
  {
    icon: <FaPrint />,
    title: "Industrial Offset Color Fidelity",
    desc: "Multi-color Heidelberg & Komori-grade offset presses maintain microscopic Pantone (PMS) spot-color consistency across 500 or 500,000 units.",
    tag: "PMS Accuracy",
  },
  {
    icon: <FaAward />,
    title: "Precision In-House Finishing",
    desc: "In-house hydraulic foil stamping, scratch-resistant thermal velvet lamination, blind embossing, and clean-cut dielines that never jam packing lines.",
    tag: "Tactile Finish",
  },
];

const equipmentCapabilities = [
  { title: "Heidelberg & Offset Presses", desc: "High-speed multi-color printing for brochures, boxes & files" },
  { title: "Hydraulic Hot Foil Stampers", desc: "Gold, rose-gold, silver & holographic foil embossing" },
  { title: "Automated Carton Folding & Gluing", desc: "Crash-lock bottoms, tuck-ends & blister card backing" },
  { title: "Thermal Velvet & Gloss Laminators", desc: "Zero-bubble matte, soft-touch & anti-scuff films" },
];

export default function AboutPage() {
  return (
    <div className="font-poppins bg-surface min-h-screen">
      
      {/* 1. Hero Section with Split Visuals */}
      <section className="bg-surface-light border-b border-border-subtle py-14 lg:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex items-center gap-2 text-xs text-text-muted mb-4">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span>›</span>
            <span className="text-text-main font-semibold">About Our Studio</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-light/50 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider">
                <FaIndustry className="text-xs" />
                <span>Operating in Gujarat Since 2008</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-text-main tracking-tight leading-tight">
                17+ Years of Printing &amp; Packaging Craftsmanship
              </h1>

              <p className="text-sm sm:text-base text-text-subtle leading-relaxed max-w-2xl">
                Founded in Naroda, Ahmedabad, Design N Print bridges the gap between creative design agency vision and shop-floor industrial offset execution. We manufacture packaging, corporate stationery, and marketing assets that represent your brand with tactile authority.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-surface border border-border-subtle shadow-xs text-xs font-semibold text-text-main">
                  <FaCheckCircle className="text-whatsapp text-sm" />
                  <span>100% Pre-Print Proof Sign-off</span>
                </div>
                <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-surface border border-border-subtle shadow-xs text-xs font-semibold text-text-main">
                  <FaCheckCircle className="text-whatsapp text-sm" />
                  <span>Direct ITC &amp; Mill Boards</span>
                </div>
                <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-surface border border-border-subtle shadow-xs text-xs font-semibold text-text-main">
                  <FaCheckCircle className="text-whatsapp text-sm" />
                  <span>Rapid 24–48h Dispatch</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Showcase */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-border-subtle shadow-2xl bg-primary-dark group">
                <div className="relative h-80 sm:h-96 w-full">
                  <Image
                    src="/images/Card/box_designing.png"
                    alt="Precision Packaging Box Production at Design N Print"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/30 to-transparent"></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-text-light">
                  <span className="text-[11px] font-mono uppercase text-accent font-bold tracking-wider">
                    Naroda Press Unit
                  </span>
                  <h3 className="text-lg font-bold text-text-light mt-1">
                    Custom Packaging &amp; Commercial Offset
                  </h3>
                  <p className="text-xs text-text-light-muted mt-1">
                    Inspecting every sheet, dieline cut, and foil registration by hand.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. Core Narrative & Shop Floor Stats */}
      <section className="py-20 px-4 sm:px-8 border-b border-border-subtle">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase text-secondary font-bold">Our Philosophy</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-text-main leading-tight">
              &ldquo;We Don&apos;t Just Print. We Make Your Brand Physical.&rdquo;
            </h2>
            <p className="text-sm sm:text-base text-text-subtle leading-relaxed">
              In an era dominated by digital screens, the physical items your customer holds — a weighty 450 GSM visiting card, an uncrushable pharmaceutical carton, an embossed certificate folder — carry psychological weight that no email can match.
            </p>
            <p className="text-sm sm:text-base text-text-subtle leading-relaxed">
              Typical online print aggregators treat files like generic pixels. Design agencies often don&apos;t understand paper grain directions, die-crease tolerances, or ink absorption. At Design N Print, our prepress designers work side-by-side with offset machine operators in the Naroda workshop every single day.
            </p>

            <div className="pt-2">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-accent hover:underline"
              >
                <span>Browse our catalog of 24+ specialized print lines</span>
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-primary-dark text-text-light border border-border-dark shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/15 rounded-full blur-3xl pointer-events-none"></div>

              <span className="text-xs font-mono uppercase text-accent font-bold">Verified Production Scale</span>
              <h3 className="text-2xl font-bold text-text-light mt-1 mb-6">Production At A Glance</h3>

              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="p-4 sm:p-5 rounded-2xl bg-primary-surface border border-border-dark">
                  <span className="text-3xl sm:text-4xl font-black text-accent font-mono">17+</span>
                  <p className="text-xs text-text-light-muted mt-1 font-medium">Years in Naroda, Ahmedabad</p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-primary-surface border border-border-dark">
                  <span className="text-3xl sm:text-4xl font-black text-secondary font-mono">280+</span>
                  <p className="text-xs text-text-light-muted mt-1 font-medium">Active Corporate &amp; Pharma Clients</p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-primary-surface border border-border-dark">
                  <span className="text-3xl sm:text-4xl font-black text-whatsapp font-mono">24+</span>
                  <p className="text-xs text-text-light-muted mt-1 font-medium">Commercial Product Categories</p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-primary-surface border border-border-dark">
                  <span className="text-3xl sm:text-4xl font-black text-accent font-mono">99.8%</span>
                  <p className="text-xs text-text-light-muted mt-1 font-medium">Color Registration Accuracy</p>
                </div>
              </div>

              <p className="text-xs text-text-light-muted mt-6 pt-6 border-t border-border-dark">
                Workshop &amp; Studio: Modern Corner, Opp. National Handloom, Naroda, Ahmedabad 382330.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. The Three Pillars of Non-Negotiable Quality */}
      <section className="py-20 px-4 sm:px-8 bg-surface-light border-b border-border-subtle">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent-light/50 px-3 py-1 rounded-full border border-accent/20">
              Standard Operating Procedure
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-text-main mt-3 tracking-tight">
              3 Quality Commitments Built Into Every Order
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((item, idx) => (
              <div 
                key={idx} 
                className="p-8 rounded-3xl bg-surface border border-border-subtle hover:border-accent/50 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-accent/15 text-accent flex items-center justify-center text-xl mb-6">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-mono uppercase text-accent font-bold bg-accent/10 px-2 py-0.5 rounded">
                    {item.tag}
                  </span>
                  <h3 className="text-lg font-bold text-text-main mt-3 mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-text-subtle leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-border-subtle text-xs font-semibold text-whatsapp flex items-center gap-1.5">
                  <FaCheckCircle className="text-xs" />
                  <span>Standard Quality Protocol</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Equipment & Shop Floor Machinery */}
      <section className="py-20 px-4 sm:px-8 border-b border-border-subtle bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary-bg px-3 py-1 rounded-full border border-secondary/20">
              In-House Infrastructure
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-text-main mt-3 tracking-tight">
              Industrial Machinery Under One Roof
            </h2>
            <p className="text-xs sm:text-sm text-text-muted mt-2">
              We own and operate our primary presses and finishing lines in Naroda, eliminating middleman delays.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipmentCapabilities.map((eq, i) => (
              <div key={i} className="p-6 rounded-2xl bg-surface-light border border-border-subtle shadow-xs hover:border-accent/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center text-base mb-4">
                  <FaCogs />
                </div>
                <h4 className="font-bold text-sm text-text-main mb-1.5">{eq.title}</h4>
                <p className="text-xs text-text-muted leading-relaxed">{eq.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Journey Timeline */}
      <section className="py-20 px-4 sm:px-8 bg-surface-light border-b border-border-subtle">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent-light/50 px-3 py-1 rounded-full border border-accent/20">
              Our Journey
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-text-main mt-3 tracking-tight">
              Key Milestones in Our 17-Year Evolution
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-surface border border-border-subtle shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black text-accent font-mono">{m.year}</span>
                    <span className="text-[10px] font-bold uppercase text-secondary bg-secondary-bg px-2 py-0.5 rounded">
                      {m.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-text-main mb-2">{m.title}</h4>
                  <p className="text-xs text-text-muted leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Studio Visit CTA */}
      <section className="py-16 px-4 sm:px-8 bg-surface">
        <div className="max-w-4xl mx-auto text-center p-8 sm:p-12 rounded-3xl bg-surface-light border border-border-subtle shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-accent/15 text-accent mx-auto flex items-center justify-center text-xl mb-4">
            <FaMapMarkerAlt />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-text-main mb-3">
            Want to review paper swatches with our press team?
          </h3>
          <p className="text-xs sm:text-sm text-text-muted mb-8 max-w-xl mx-auto leading-relaxed">
            Drop by our studio in Naroda, Ahmedabad. Have a cup of chai, feel 20+ paperboard textures, and discuss your custom box or brochure dielines in person.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-accent text-text-light font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              <FaMapMarkerAlt />
              <span>Studio Address &amp; Directions</span>
            </Link>
            <a
              href="https://wa.me/919725281074?text=Hi%20Design%20N%20Print,%20I%20would%20like%20to%20visit%20your%20Naroda%20studio."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-whatsapp hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              <FaWhatsapp className="text-base" />
              <span>Schedule Visit on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
