import React from "react";
import ServiceTemplate from "../../components/ServiceTemplate";
import certificate from "../../images/Card/certificate.png"

const Certificate = () => {
  return (
    <ServiceTemplate
      title="Certificate"
      bannerImg={[certificate]}
      description="Elegant and formal certificate designs perfect for educational institutions, corporate achievements, and awards."
      types={[
        "Appreciation Certificates",
        "Achievement Awards",
        "Training Completion Certificates",
        "Participation Certificates",
        "Customized School/College Certificates",
      ]}
      advantages={[
        "Professional and elegant layout",
        "Custom branding and logos",
        "High-resolution print quality",
        "Various paper and size options",
        "Option for digital or print formats",
        "Perfect for events and milestones",
      ]}
    />
  );
};

export default Certificate;
