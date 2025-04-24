import React from "react";
import ServiceTemplate from "../../components/ServiceTemplate";

const PamphletDesignPrinting = () => {
  return (
    <ServiceTemplate
      title="Pamphlet Design & Printing"
      bannerImg="https://dizname.in/wp-content/uploads/2021/09/niketart_product_6_pamphlet.jpg"
      description="Eye-catching pamphlet designs with top quality print solutions for all businesses."
      types={[
        "Single-page Pamphlets",
        "Bi-fold Pamphlets",
        "Tri-fold Pamphlets",
        "Z-fold Pamphlets",
        "Custom-shaped Pamphlets",
      ]}
      advantages={[
        "High-quality printing with vibrant colors",
        "Various folding options",
        "Cost-effective marketing tool",
        "Quick turnaround time",
        "Custom sizes and paper types available",
      ]}
    />
  );
};

export default PamphletDesignPrinting;
