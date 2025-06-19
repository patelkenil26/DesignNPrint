import React from "react";
import ServiceTemplate from "../../components/ServiceTemplate";

const CosmeticBoxSticker = () => {
  return (
    <ServiceTemplate
      title="Cosmetic Item Box & Sticker Printing"
      bannerImg={["https://dizname.in/wp-content/uploads/2021/09/design-n-print-product-10.png"]}
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
