import React from "react";
import ServiceTemplate from "../../components/ServiceTemplate";

const Certificate = () => {
  return (
    <ServiceTemplate
      title="Certificate"
      bannerImg={["https://dizname.in/wp-content/uploads/2021/09/design-n-print-product-6.png"]}
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
