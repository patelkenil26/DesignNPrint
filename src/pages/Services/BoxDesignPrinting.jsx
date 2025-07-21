import React from "react";
import ServiceTemplate from "../../components/ServiceTemplate";
import boxDesigning from "../../images/Card/box_designing.png"

const BoxDesignPrinting = () => {
  return (
    <ServiceTemplate
      title="Box Designing & Printing"
      bannerImg={[boxDesigning]}
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
