import React from "react";
import ServiceTemplate from "../../components/ServiceTemplate";
import cottonPouch from "../../images/Card/cotton_pouch.jpg"

const CottonPouch = () => {
  return (
    <ServiceTemplate
      title="Cotton Pouch Designing & Printing"
      bannerImg={[
        cottonPouch
      ]}
      description="Sustainable and stylish cotton pouch designs that are ideal for gifting, product packaging, and promotional giveaways."
      types={[
        "Cotton Seeds Pouches",
        "Drawstring Cotton Pouches",
        "Zipper Pouches",
        "Branded Cotton Bags",
        "Customized Gift Pouches",
        "Reusable Carry Pouches",
        "Pesticide Pouches",
        "Spices Pouches",
        "Customized Pouches",
        "Standee Pouches",
      ]}
      advantages={[
        "Luxury finishes (glossy, Matte, Metallic)",
        "Eco-friendly and reusable material",
        "Attractive custom prints",
        "Ideal for small product packaging",
        "Lightweight yet durable",
        "Perfect for gifting and events",
      ]}
    />
  );
};

export default CottonPouch;
