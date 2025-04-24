// src/pages/services/DigitalVisitingCard.jsx
import React from "react";
import ServiceTemplate from "../../components/ServiceTemplate";

const DigitalVisitingCard = () => {
  return (
    <ServiceTemplate
      title="Digital Visiting Card"
      bannerImg="https://dizname.in/wp-content/uploads/2021/09/design-n-print-product-11-1.png"
      description="We provide customized Digital Visiting Cards that are eco-friendly, sharable, and help leave a lasting impression. Share your contact and business details with a single tap or scan."
      types={[
        "NFC Enabled Digital Cards",
        "QR Code Based Visiting Cards",
        "Customized Branded Designs",
        "Multi-language Cards",
        "Interactive & Clickable Cards",
      ]}
      advantages={[
        "Eco-friendly & paperless",
        "Easy to share via QR code or link",
        "Modern & stylish designs",
        "Real-time updatable information",
        "Clickable contact details (Call, Email, Social Media)",
        "No printing cost every time you update details",
        "Impress clients with tech-savvy branding",
      ]}
    />
  );
};

export default DigitalVisitingCard;
