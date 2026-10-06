"use client";

import React from "react";
import ServiceTemplate from "@/components/ServiceTemplate";
const latterpadYellow = "/images/Card/latterpadyellow.jpeg";
const latterhed = "/images/Card/LetterPad.png";
const env = "/images/Card/Env.png";

const VisitingCardLetterheadEnvelope = () => {
  return (
    <ServiceTemplate
      title="Visiting Card, Letterhead, Envelope"
      bannerImg={[latterpadYellow,latterhed]}
      // bannerImg={["https://dizname.in/wp-content/uploads/2021/09/design-n-print-product-12-1.png"]}
      description="Professional design and print services for visiting cards, letterheads, and envelopes."
      types={[
        "Standard & Premium Visiting Cards",
        "Corporate Letterheads",
        "Customized Envelopes (Window/Non-window)",
        "Textured & Special Finish Papers",
        "Personalized Stationery Sets",
        "NON TERABLE CARD (NT CARD",
        "ART CARD",
        "ART CARD WITH LAMINATION",
        "MATT CARD",
        "MATT + UV CARD",
        "SILVER METALIC CARD",
      ]}
      advantages={[
        "Essential branding for businesses",
        "Custom sizes, fonts & logo placements",
        "Multiple paper quality options",
        "Professional appearance and packaging",
        "Perfect for offices, freelancers, and professionals",
      ]}
    />
  );
};

export default VisitingCardLetterheadEnvelope;
