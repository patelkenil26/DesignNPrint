"use client";

import React from "react";
import ServiceTemplate from "@/components/ServiceTemplate";
const stickerLabel = "/images/Card/sticker_label.png";
const StickerLabelPrinting = () => {
  return (
    <ServiceTemplate
      title="Sticker & Label Designing & Printing"
      bannerImg={[stickerLabel]}
      description="Custom sticker and label printing solutions tailored to your needs."
      types={[
        "Product Labels",
        "Product Stickers",
        "Branding Stickers",
        "Barcode & QR Code Stickers",
        "Waterproof Vinyl Stickers",
        "Transparent & Matte Finish Stickers",
        "Pesticide Stickers",

      ]}
      advantages={[
        "Ideal for packaging and branding",
        "Custom shapes and sizes",
        "Waterproof and scratch-resistant options",
        "Strong adhesive backing for durability",
        "Bulk printing with high quality",
      ]}
    />
  );
};

export default StickerLabelPrinting;
