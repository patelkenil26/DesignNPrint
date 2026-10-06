"use client";

import React from "react";
import ServiceTemplate from "@/components/ServiceTemplate";
const productCatalogue = "/images/Card/product_catalogue.jpg";
const ProductCatalogue = () => {
  return (
    <ServiceTemplate
      title="Product Catalogue"
      bannerImg={[productCatalogue]}
      description="Custom product catalogue design and print services to showcase your offerings."
      types={[
        "Printed Product Catalogues",
        "Digital Catalogues",
        "Interactive E-Catalogues",
        "Custom Size Catalogues",
        "Multi-language Catalogues",
      ]}
      advantages={[
        "Professional layout and design",
        "High-quality printing on premium paper",
        "Customizable formats and sizes",
        "Ideal for marketing and sales presentations",
        "Bulk printing options available",
      ]}
    />
  );
};

export default ProductCatalogue;
