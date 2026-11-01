"use client";

import React, { useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FaShieldAlt, FaFileAlt, FaCheckCircle, FaWhatsapp, FaClock } from "react-icons/fa";
import ContactHero from "@/components/sections/contact/ContactHero";
import ContactInfoSection from "@/components/sections/contact/ContactInfoSection";
import ContactMap from "@/components/sections/contact/ContactMap";
import ContactForm from "@/components/sections/contact/ContactForm";

const ContactContent = () => {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const subjectFromURL = searchParams.get("subject");
    if (subjectFromURL && formRef.current) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  }, [searchParams]);

  return (
    <div className="font-poppins bg-surface min-h-screen">
      <ContactHero />
      <ContactInfoSection />

      {/* Message & Inquiry Submission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface-light border-y border-border-subtle" ref={formRef}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: What to Expect / Reassurance */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase text-accent font-bold">Inquiry Process</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-text-main mt-1 tracking-tight">
                  Request a Custom Print or Packaging Quotation
                </h2>
                <p className="text-xs sm:text-sm text-text-subtle mt-3 leading-relaxed">
                  Fill in your project specifications or card requirement. Our prepress team in Naroda will review your dimensions, board GSM, and finish requirements within 15 minutes.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-surface border border-border-subtle shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-accent/15 text-accent flex items-center justify-center shrink-0 text-sm mt-0.5">
                    <FaFileAlt />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-text-main">1. File Pre-Flight Inspection</h4>
                    <p className="text-[11px] sm:text-xs text-text-muted mt-0.5 leading-relaxed">
                      We check your PDF/CDR files for CMYK color shifts, 3mm bleed margins, and 300 DPI sharpness.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-surface border border-border-subtle shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-whatsapp/15 text-whatsapp flex items-center justify-center shrink-0 text-sm mt-0.5">
                    <FaCheckCircle />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-text-main">2. Free 3D Digital Proofing</h4>
                    <p className="text-[11px] sm:text-xs text-text-muted mt-0.5 leading-relaxed">
                      Before exposure or plate making, you receive a digital 3D mockup for approval.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-surface border border-border-subtle shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center shrink-0 text-sm mt-0.5">
                    <FaClock />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-text-main">3. Rapid Press Run</h4>
                    <p className="text-[11px] sm:text-xs text-text-muted mt-0.5 leading-relaxed">
                      Standard orders ready in 24–48 hours; instant dispatch across Gujarat.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-accent-light/40 border border-accent/20 text-xs text-text-main flex items-center gap-3">
                <FaShieldAlt className="text-accent text-base shrink-0" />
                <span>Client artwork designs &amp; dielines are strictly confidential under NDA.</span>
              </div>
            </div>

            {/* Right Column: Preserved Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-surface border border-border-subtle p-6 sm:p-10 rounded-3xl shadow-sm">
                <div className="mb-6 pb-4 border-b border-border-subtle">
                  <h3 className="text-lg sm:text-xl font-bold text-text-main">
                    Leave Your Project Requirements
                  </h3>
                  <p className="text-xs text-text-muted mt-1">
                    Send us your artwork details, product name, and volume requirements.
                  </p>
                </div>

                {/* Preserved Form without touching internal fields */}
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      <ContactMap />
    </div>
  );
};

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-text-muted">Loading Contact Portal...</div>}>
      <ContactContent />
    </Suspense>
  );
}
