"use client";

import React from "react";
import ServiceTemplate from "@/components/ServiceTemplate";
const BrochureDesigning = "/images/Card/BrochureDesigning.png";

const BrochureDesigningPrinting = () => {
  return (
    <ServiceTemplate
      title="Brochure Designing & Printing"
      bannerImg={[BrochureDesigning]}
      description="Creative and professional brochure designs that showcase your business, services, or products in a visually engaging and informative way."
      types={[
        "Bi-Fold Brochures",
        "Tri-Fold Brochures",
        "Gate-Fold Brochures",
        "Z-Fold Brochures",
        "Booklet Style Brochures",
        "Flyers and Pamphlets",
      ]}
      advantages={[
        "Attractive and brand-consistent layouts",
        "Informative and well-structured content design",
        "High-quality paper and finish options",
        "Perfect for marketing and promotions",
        "Portable and easy to distribute",
        "Cost-effective bulk printing",
      ]}
    />
  );
};

export default BrochureDesigningPrinting;
