import React from "react";
import ServiceTemplate from "../../components/ServiceTemplate";
import pamphlet from "../../images/Card/pamphlet.jpg"
const PamphletDesignPrinting = () => {
  return (
    <ServiceTemplate
      title="Pamphlet Design & Printing"
      bannerImg={[pamphlet]}
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
