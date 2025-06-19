// src/pages/services/BookletDesign.jsx
import React from "react";
import ServiceTemplate from "../../components/ServiceTemplate";

const BookletDesign = () => {
  return (
    <ServiceTemplate
      title="Booklet Designing & Printing"
      bannerImg={["https://dizname.in/wp-content/uploads/2021/03/niketart_product_5_booklet.jpg"]}
      description="We offer high-quality booklet designing and printing services tailored to your brand. Whether it's for a company profile, product catalog, or event guide, our booklets help communicate your message effectively and professionally."
      types={[
        "Company Profile Booklets",
        "Product Catalogs",
        "Training Manuals",
        "Event & Program Booklets",
        "Educational Booklets",
        "Promotional Booklets",
      ]}
      advantages={[
        "Professional layout and design",
        "High-quality printing on premium paper",
        "Various binding options (staple, spiral, perfect bind)",
        "Custom sizes and finishes",
        "Ideal for marketing, presentations, and events",
        "Brand consistency across all pages",
        "Bulk printing options available",
      ]}
    />
  );
};

export default BookletDesign;
