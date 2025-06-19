// src/pages/services/CalendarPrinting.jsx
import React from "react";
import ServiceTemplate from "../../components/ServiceTemplate";
// import bannerImg from "../../images/HeroImage/slide1.jpg";

const CalendarPrinting = () => {
  return (
    <ServiceTemplate
      title="Calendar Printing"
    bannerImg={["https://dizname.in/wp-content/uploads/2021/09/design-n-print-product-3.png"]}
      description="Calendar printing makes it possible to create brand impressions in homes and workspaces for at least a year. Modern Printers may be the right solution for you. Few advertisements in any format can make the same claim. For this reason, custom wall calendars, Card Calendars, Poster Calendars are extremely popular as promotional giveaways, especially during the holidays. For small businesses, the multiple pages offer a variety of promotional opportunities."
      types={[
        "Wall Calendar Printing",
        "Poster Calendars",
        "Magnetic Calendar",
        "Card Calendar",
      ]}
      advantages={[
        "Keep your brand visible for a whole year",
        "Matte and gloss finishes",
        "Photo quality printing on premium paper",
        "Thick cover option",
        "Impressive full color printing",
        "Wallet size & larger",
        "Impressive high gloss UV finish",
      ]}
    />
  );
};

export default CalendarPrinting;
