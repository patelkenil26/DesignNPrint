"use client";

import React from "react";
import ServiceTemplate from "@/components/ServiceTemplate";
const cosmeticItem = "/images/Card/cosmetic_item.png";

const CosmeticBoxSticker = () => {
  return (
    <ServiceTemplate
      title="Cosmetic Item Box & Sticker Printing"
      bannerImg={[cosmeticItem]}
      description="Add elegance and uniqueness to your cosmetic packaging with stylish box and sticker printing tailored to beauty and skincare brands."
      types={[
        "Custom Cosmetic Boxes",
        "Makeup Packaging Boxes",
        "Skincare Product Stickers",
        "Label Stickers for Jars & Bottles",
        "Perfume Box Packaging",
      ]}
      advantages={[
        "High-resolution printing with fine details",
        "Custom shapes and sizes for boxes & labels",
        "Waterproof and smudge-proof stickers",
        "Luxury finishes (glossy, matte, foil stamping)",
        "Boosts product shelf appeal and brand recall",
      ]}
    />
  );
};

export default CosmeticBoxSticker;
