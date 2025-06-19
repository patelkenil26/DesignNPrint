import React from "react";
import ServiceTemplate from "../../components/ServiceTemplate";

const BoxDesignPrinting = () => {
  return (
    <ServiceTemplate
      title="Box Designing & Printing"
      bannerImg={["https://dizname.in/wp-content/uploads/2021/09/vision-img-gallery-1.png"]}
      description="Premium and durable box designing and printing services that ensure your product stands out on shelves and leaves a lasting impression on customers."
      types={[
        "Custom Product Boxes",
        "Rigid Boxes",
        "Corrugated Boxes",
        "Display Boxes",
        "Gift Boxes",
        "Mailer Boxes",
      ]}
      advantages={[
        "Eye-catching and brand-specific designs",
        "Variety of shapes and sizes",
        "Durable and eco-friendly materials",
        "Perfect for product protection and presentation",
        "Supports branding and marketing goals",
        "Available in matte, gloss, and UV finish",
      ]}
    />
  );
};

export default BoxDesignPrinting;
