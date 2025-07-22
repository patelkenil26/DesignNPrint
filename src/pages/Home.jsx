import React from "react";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/Services/ServicesSection";
import StatsSection from "../components/StatsSection";
import GoogleReviewSection from "../components/Review/GoogleReviewSection ";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <ServicesSection/>
      <StatsSection/>
      <GoogleReviewSection />
      {/* <GoogleReviewButton/> */}
    </div>
  );
};

export default Home;
