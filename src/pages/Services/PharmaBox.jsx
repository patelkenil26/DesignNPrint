import React from "react";
import ServiceTemplate from "../../components/ServiceTemplate";

const PharmaBox = () => {
  return (
    <ServiceTemplate
      title="Pharmaceutical Medicine Boxes"
      bannerImg={["https://dizname.in/wp-content/uploads/2021/09/niketart_product_6_pharma-box.jpg"]}
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
