import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/Services/ServicesSection";
import StatsSection from "@/components/sections/StatsSection";
import GoogleReviewSection from "@/components/sections/Review/GoogleReviewSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <GoogleReviewSection />
    </div>
  );
}
