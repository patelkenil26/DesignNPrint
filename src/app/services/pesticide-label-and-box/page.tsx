"use client";

import React from "react";
import ServiceTemplate from "@/components/ServiceTemplate";
const pesticide = "/images/Card/pesticide.jpg";
const PesticideBoxLabel = () => {
  return (
    <ServiceTemplate
      title="Pesticide Label and Box"
      bannerImg={[pesticide]}
      description="High-quality pesticide label and box printing for agricultural brands."
      types={[
        "Pesticide Packaging Boxes",
        "Chemical Product Labels",
        "Agricultural Product Boxes",
        "Custom Die-cut Labels",
        "Waterproof Labels",
      ]}
      advantages={[
        "Compliance with industry standards",
        "Durable and weather-resistant materials",
        "High-resolution printing for clear information",
        "Customizable designs and sizes",
        "Bulk printing options available",
      ]}
    />
  );
};

export default PesticideBoxLabel;
