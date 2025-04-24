import React from "react";
import ServiceTemplate from "../../components/ServiceTemplate";

const DoctorFile = () => {
  return (
    <ServiceTemplate
      title="Doctor File"
      bannerImg="https://dizname.in/wp-content/uploads/2021/09/design-n-print-product-13-1.jpg"
      description="Specialized doctor file printing for hospitals and clinics."
      types={[
        "Patient Record Files",
        "Prescription Files",
        "Diagnostic Report Files",
        "Customized Hospital Files",
        "Multi-compartment Files",
      ]}
      advantages={[
        "Durable and high-quality materials",
        "Customizable with hospital branding",
        "Organized sections for easy record-keeping",
        "Available in various sizes and formats",
        "Bulk printing options for large institutions",
      ]}
    />
  );
};

export default DoctorFile;
