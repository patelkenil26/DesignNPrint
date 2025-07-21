import React from "react";
import ServiceTemplate from "../../components/ServiceTemplate";
import doctorFile from "../../images/Card/doctor_file.jpg"

const DoctorFile = () => {
  return (
    <ServiceTemplate
      title="Doctor File"
      bannerImg={[doctorFile]}
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
