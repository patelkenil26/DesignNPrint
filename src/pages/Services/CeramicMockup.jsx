import React from "react";
import ServiceTemplate from "../../components/ServiceTemplate";

const CeramicMockup = () => {
  return (
    <ServiceTemplate
      title="Ceramic Mockup Design"
      bannerImg="https://dizname.in/wp-content/uploads/2021/09/design-n-print-product-8.png"
      description="Get realistic and stylish ceramic mockups that enhance your product presentation for marketing, online listings, and portfolio purposes."
      types={[
        "Mug Mockups",
        "Plates and Bowls",
        "Ceramic Jar Mockups",
        "Bottle and Vase Mockups",
        "Custom Shape Ceramics",
      ]}
      advantages={[
        "High-quality and photo-realistic designs",
        "Ideal for eCommerce and branding",
        "Multiple views and angles",
        "Editable to match product branding",
        "Print-ready mockup files",
      ]}
    />
  );
};

export default CeramicMockup;
