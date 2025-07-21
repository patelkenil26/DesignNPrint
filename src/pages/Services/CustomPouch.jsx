import React from "react";
import ServiceTemplate from "../../components/ServiceTemplate";
import customizePouch from "../../images/Card/customize_pouch.png"

const CustomPouch = () => {
  return (
    <ServiceTemplate
      title="Customize Pouch Designing & Printing"
      bannerImg={[customizePouch]}
      description="Design your own stylish and functional pouches with full customization options. Ideal for food, cosmetics, and retail products."
      types={[
        "Stand-up Pouches",
        "Ziplock Pouches",
        "Window Pouches",
        "Flat Bottom Pouches",
        "Kraft Paper & Plastic Pouches",
      ]}
      advantages={[
        "Custom size, shape, and finish",
        "Perfect for retail & product branding",
        "Moisture-proof and food-safe materials",
        "High-quality, vibrant printing",
        "Flexible order quantity (small to bulk)",
      ]}
    />
  );
};

export default CustomPouch;
