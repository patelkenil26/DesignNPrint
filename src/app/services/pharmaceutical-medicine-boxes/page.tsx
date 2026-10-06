"use client";

import React from "react";
import ServiceTemplate from "@/components/ServiceTemplate";
const pharmaBox = "/images/Card/pharma_box.jpg";
const PharmaBox = () => {
  return (
    <ServiceTemplate
      title="Pharmaceutical Medicine Boxes"
      bannerImg={[pharmaBox]}
      description="Custom pharmaceutical packaging boxes that meet medical standards."
      types={[
        "Tablet Boxes",
        "Syrup Boxes",
        "Injection Boxes",
        "Capsule Boxes",
        "Custom Medicine Packaging",
      ]}
      advantages={[
        "Compliance with pharmaceutical regulations",
        "Secure and tamper-evident packaging",
        "Customizable sizes and designs",
        "High-quality printing for clear labeling",
        "Bulk production capabilities",
      ]}
    />
  );
};

export default PharmaBox;
