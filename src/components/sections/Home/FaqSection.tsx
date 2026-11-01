"use client";

import React, { useState } from "react";
import { FaChevronDown, FaQuestionCircle, FaWhatsapp } from "react-icons/fa";

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: "How fast can I get my printing order delivered (Turnaround Time)?",
    a: "Standard jobs (visiting cards, flyers, stickers) typically take 24 to 48 hours. Custom packaging boxes, foil stamping, and embossed catalogues take between 3 to 5 business days. We also offer priority Same-Day Rush printing for urgent exhibition and corporate event requirements.",
  },
  {
    q: "I don't have a design file or artwork. Can you design it for me?",
    a: "Yes, absolutely! We have in-house senior graphic designers and packaging engineers who create custom brand logos, packaging dielines, brochures, and stationery from scratch. You will receive photorealistic 3D digital mockups to review before anything goes into physical production.",
  },
  {
    q: "What file formats and specifications do you require for printing?",
    a: "We accept PDF (Print Ready / X-1a preferred), CorelDraw (CDR), Adobe Illustrator (AI), and Photoshop (PSD). For optimal sharpness, please ensure your files are created in CMYK color mode, 300 DPI resolution, with all fonts converted to curves/outlines and 3mm bleed margins included.",
  },
  {
    q: "Will I get to see a sample or proof before final mass printing?",
    a: "Yes! We maintain a strict '100% Pre-Print Proof Sign-off' policy. Before any plates are exposed or printing starts, we send high-resolution digital PDF proofs and 3D mockups. For large B2B packaging runs, physical sample mockups can also be arranged upon request.",
  },
  {
    q: "What are your Minimum Order Quantities (MOQ)?",
    a: "We cater to both small business startups and large industrial enterprises: Visiting cards start from just 100 pcs, Custom Stickers from 500 pcs, and Packaging Monocartons/Boxes from 500 pcs. Larger volume tiers benefit from significant bulk production discounts.",
  },
  {
    q: "Do you provide delivery across Ahmedabad, Gujarat, and other states?",
    a: "Yes! We provide same-day local dispatch across Ahmedabad and reliable express courier/cargo shipping across all districts of Gujarat (Surat, Vadodara, Rajkot, Bhavnagar, Gandhinagar) and pan-India.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-surface border-b border-border-subtle font-poppins">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent bg-accent-light/50 px-3 py-1 rounded-full border border-accent/20">
            <FaQuestionCircle />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-text-main mt-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-text-muted mt-3">
            Everything business owners and marketing teams want to know about our printing process, turnaround, and materials.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-border-subtle bg-surface-light overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-text-main hover:text-accent transition-colors"
                >
                  <span>{faq.q}</span>
                  <FaChevronDown
                    className={`text-xs text-text-muted transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180 text-accent" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-sm text-text-subtle leading-relaxed border-t border-border-subtle/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions? */}
        <div className="mt-12 p-6 rounded-2xl bg-surface-muted border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-bold text-text-main text-base">Have a specialized custom packaging requirement?</h4>
            <p className="text-xs sm:text-sm text-text-muted mt-0.5">
              Talk directly with our print production head in Naroda, Ahmedabad.
            </p>
          </div>
          <a
            href="https://wa.me/919725281074?text=Hi%20Design%20N%20Print,%20I%20have%20a%20specific%20printing%20question."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-text-light text-xs font-bold shrink-0 transition-colors shadow-md"
          >
            <FaWhatsapp className="text-base" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
