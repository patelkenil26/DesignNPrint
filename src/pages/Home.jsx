import React from "react";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/Services/ServicesSection";
import StatsSection from "../components/StatsSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <ServicesSection/>
      <StatsSection/>
    </div>
  );
};

export default Home;
