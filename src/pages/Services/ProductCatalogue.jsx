import React from "react";
import ServiceTemplate from "../../components/ServiceTemplate";

const ProductCatalogue = () => {
  return (
    <ServiceTemplate
      title="Product Catalogue"
      bannerImg={["https://dizname.in/wp-content/uploads/2021/03/niketart_product_14_catalogue.jpg"]}
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
