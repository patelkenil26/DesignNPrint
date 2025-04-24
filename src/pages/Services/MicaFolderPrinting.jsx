import React from "react";
import ServiceTemplate from "../../components/ServiceTemplate";

const MicaFolderPrinting = () => {
  return (
    <ServiceTemplate
      title="Laminates Mica Folder Designing & Printing"
      bannerImg="https://dizname.in/wp-content/uploads/2021/09/design-n-print-mica-designing.png"
      description="High-quality mica folder designing & printing for laminates and more."
      types={[
        "Sample Display Folders",
        "Product Catalog Folders",
        "Swatch Book Folders",
        "Custom Design Folders",
        "Branded Presentation Folders",
      ]}
      advantages={[
        "Elegant and professional presentation",
        "Durable materials for long-term use",
        "Customizable layouts and designs",
        "Ideal for showcasing laminate samples",
        "Enhances brand image and product appeal",
      ]}
    />
  );
};

export default MicaFolderPrinting;
