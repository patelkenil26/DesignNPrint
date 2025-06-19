import React from "react";
import ServiceTemplate from "../../components/ServiceTemplate";

const StickerLabelPrinting = () => {
  return (
    <ServiceTemplate
      title="Sticker & Label Designing & Printing"
      bannerImg={["https://dizname.in/wp-content/uploads/2021/09/design-n-print-product-1.png"]}
      description="Custom sticker and label printing solutions tailored to your needs."
      types={[
        "Product Labels",
        "Branding Stickers",
        "Barcode & QR Code Stickers",
        "Waterproof Vinyl Stickers",
        "Transparent & Matte Finish Labels",
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
