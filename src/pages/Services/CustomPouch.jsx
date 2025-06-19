import React from "react";
import ServiceTemplate from "../../components/ServiceTemplate";

const CustomPouch = () => {
  return (
    <ServiceTemplate
      title="Customize Pouch Designing & Printing"
      bannerImg={["https://dizname.in/wp-content/uploads/2021/09/design-n-print-product-9.png"]}
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
