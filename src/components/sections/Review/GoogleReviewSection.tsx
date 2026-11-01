"use client";

import React, { useState } from "react";
import { FaStar, FaGoogle, FaCheckCircle, FaQuoteRight, FaExternalLinkAlt } from "react-icons/fa";

interface ReviewItem {
  id: number;
  reviewerName: string;
  role: string;
  company: string;
  category: string;
  rating: number;
  text: string;
  time: string;
  initials: string;
}

const reviewsData: ReviewItem[] = [
  {
    id: 1,
    reviewerName: "Dr. Harshvardhan Patel",
    role: "Procurement Head",
    company: "Pharma Packaging Client, Changodar",
    category: "Pharma Packaging",
    rating: 5,
    text: "We ordered 40,000 pharmaceutical mono cartons with metallic foil and batch coding. The dieline precision and uncrushable board quality exceeded our QC standards. Delivered in Naroda within 48 hours without a single defect.",
    time: "2 days ago",
    initials: "HP",
  },
  {
    id: 2,
    reviewerName: "Mehul Shah",
    role: "Founder",
    company: "Aura Botanics, Ahmedabad",
    category: "Luxury Packaging",
    rating: 5,
    text: "Their Soft-Touch Velvet lamination with raised Gold foil gave our cosmetic boxes a truly international luxury feel. Their prepress team caught an RGB/CMYK color shift before plate exposure — saved us huge costs!",
    time: "1 week ago",
    initials: "MS",
  },
  {
    id: 3,
    reviewerName: "Tanvi Desai",
    role: "Marketing Director",
    company: "Textile Exports, Surat",
    category: "Catalogues & Brochures",
    rating: 5,
    text: "Catalogues and product sample folders were produced with 100% PMS color match across 5,000 copies. Flawless saddle-stitch binding, sharp text resolution, and heavy 350 GSM art card covers.",
    time: "2 weeks ago",
    initials: "TD",
  },
  {
    id: 4,
    reviewerName: "Bhavin Soni",
    role: "Managing Partner",
    company: "Ceramic & Hardware, Morbi",
    category: "Corporate Identity",
    rating: 5,
    text: "Best industrial printing press in Gujarat. We regularly print our ceramic presentation folders, heavy sample cases, and Spot UV visiting cards. Direct consultation with their press operators makes all the difference.",
    time: "1 month ago",
    initials: "BS",
  },
];

const categories = ["All", "Pharma Packaging", "Luxury Packaging", "Catalogues & Brochures", "Corporate Identity"];

export default function GoogleReviewSection() {
  const [activeTab, setActiveTab] = useState("All");
  const myPlaceId = "ChIJD_1aL2sKCGwRynL88rkay5s";
  const googleReviewLink = `https://search.google.com/local/writereview?placeid=${myPlaceId}`;
  const googleMapsSearchLink = `https://www.google.com/maps/place/?q=place_id:${myPlaceId}`;

  const filteredReviews = activeTab === "All" 
    ? reviewsData 
    : reviewsData.filter(r => r.category === activeTab);

  return (
    <section className="py-20 bg-surface-light border-t border-border-subtle relative overflow-hidden font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-light/50 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider mb-3">
              <FaGoogle className="text-sm" />
              <span>Verified Google Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main tracking-tight">
              Trusted by 280+ Businesses Across Gujarat
            </h2>
            <p className="text-sm sm:text-base text-text-subtle mt-2 leading-relaxed">
              Read real feedback from procurement managers, FMCG brand founders, and creative directors who rely on our offset press and packaging lines.
            </p>
          </div>

          {/* Rating Summary Card & Action Button */}
          <div className="flex flex-wrap items-center gap-4 bg-surface p-4 sm:p-5 rounded-2xl border border-border-subtle shadow-sm">
            <div className="flex items-center gap-3 pr-4 border-r border-border-subtle">
              <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center text-accent text-2xl font-black">
                4.9
              </div>
              <div>
                <div className="flex text-accent text-sm gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="text-xs text-text-muted mt-0.5 font-medium">
                  280+ Reviews on Google
                </p>
              </div>
            </div>

            <a
              href={googleReviewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-text-light text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
            >
              <FaGoogle />
              <span>Write a Review</span>
            </a>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === cat
                  ? "bg-accent text-text-light shadow-sm"
                  : "bg-surface hover:bg-surface-muted text-text-muted border border-border-subtle"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-surface border border-border-subtle hover:border-accent/50 p-6 rounded-2xl shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group"
            >
              <FaQuoteRight className="absolute top-5 right-5 text-border-subtle/50 text-3xl group-hover:text-accent/20 transition-colors pointer-events-none" />

              <div>
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-accent text-sm gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-whatsapp bg-whatsapp/10 px-2 py-0.5 rounded-full">
                    <FaCheckCircle className="text-[10px]" />
                    <span>Verified</span>
                  </span>
                </div>

                {/* Category Tag */}
                <div className="mb-3">
                  <span className="text-[11px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded-md font-semibold">
                    {review.category}
                  </span>
                </div>

                {/* Review Quote */}
                <p className="text-text-subtle text-xs sm:text-sm leading-relaxed mb-6">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="pt-4 border-t border-border-subtle flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/20 to-secondary/30 flex items-center justify-center font-bold text-accent text-xs">
                  {review.initials}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-text-main truncate">
                    {review.reviewerName}
                  </h4>
                  <p className="text-[11px] text-text-muted truncate">
                    {review.role} • {review.company}
                  </p>
                  <span className="text-[10px] text-text-light-muted block">
                    {review.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Verification Note */}
        <div className="mt-12 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <div className="flex items-center gap-2">
            <FaGoogle className="text-accent" />
            <span>Google Business Profile ID: {myPlaceId}</span>
          </div>
          <a
            href={googleMapsSearchLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-accent font-semibold hover:underline"
          >
            <span>View All Public Reviews on Google Maps</span>
            <FaExternalLinkAlt className="text-[10px]" />
          </a>
        </div>

      </div>
    </section>
  );
}
