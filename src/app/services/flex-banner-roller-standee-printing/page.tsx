"use client";

import React from "react";
import ServiceTemplate from "@/components/ServiceTemplate";
const flexBanner = "/images/Card/flex_banner.png";
const FlexBannerStandee = () => {
  return (
    <ServiceTemplate
      title="Flex Banner & Roller Standee Printing"
      bannerImg={[flexBanner]}
      description="Large format flex banners and roll-up standee print solutions."
      types={[
        "Outdoor Flex Banners",
        "Indoor Promotional Banners",
        "Roll-up Standees",
        "Backdrop Banners",
        "Event Signage",
      ]}
      advantages={[
        "High-resolution printing",
        "Weather-resistant materials",
        "Easy to install and transport",
        "Custom sizes and designs",
        "Ideal for events, promotions, and advertisements",
      ]}
    />
  );
};

export default FlexBannerStandee;
