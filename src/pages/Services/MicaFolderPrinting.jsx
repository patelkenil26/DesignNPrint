import React from "react";
import ServiceTemplate from "../../components/ServiceTemplate";
import laminatesMica  from  "../../images/Card/laminate_mica.png"
const MicaFolderPrinting = () => {
  return (
    <ServiceTemplate
      title="Laminates Mica Folder Designing & Printing"
      bannerImg={[laminatesMica]}
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
