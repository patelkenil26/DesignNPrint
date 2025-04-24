import React from "react";
import ServiceTemplate from "../../components/ServiceTemplate";

const CottonPouch = () => {
  return (
    <ServiceTemplate
      title="Cotton Pouch Designing & Printing"
      bannerImg="https://dizname.in/wp-content/uploads/2021/03/niketart_product_10_pouch.jpg"
      description="Sustainable and stylish cotton pouch designs that are ideal for gifting, product packaging, and promotional giveaways."
      types={[
        "Drawstring Cotton Pouches",
        "Zipper Pouches",
        "Branded Cotton Bags",
        "Customized Gift Pouches",
        "Reusable Carry Pouches",
      ]}
      advantages={[
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
