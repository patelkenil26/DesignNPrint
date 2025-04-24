import React from "react";
import ServiceTemplate from "../../components/ServiceTemplate";

const CompanyFileFolder = () => {
  return (
    <ServiceTemplate
      title="Company File & Folder"
      bannerImg="https://dizname.in/wp-content/uploads/2021/03/niketart_product_11_file_folder.jpg"
      description="Make a professional impression with custom file and folder designs, perfect for office presentations, branding, and client meetings."
      types={[
        "Corporate File Folders",
        "Document Holders",
        "Custom Business Folders",
        "Flap Folders with Slots",
        "Clip and Spiral File Folders",
      ]}
      advantages={[
        "Elegant corporate designs",
        "Sturdy and professional build",
        "Custom branding and logo placement",
        "Supports A4 and legal-size documents",
        "Ideal for proposals, reports, and meetings",
      ]}
    />
  );
};

export default CompanyFileFolder;
