import HeroScrollytelling from "@/components/sections/HeroScrollytelling";
import ServicesSection from "@/components/sections/Services/ServicesSection";
import StatsSection from "@/components/sections/StatsSection";
import GoogleReviewSection from "@/components/sections/Review/GoogleReviewSection";

export default function Home() {
  return (
    <div className="relative">
      {/* 3D Scrollytelling Experience (Hero Visiting Card -> Dieline Fold -> Assembled 3D Box) */}
      <HeroScrollytelling />

      {/* Services, Stats & Reviews Sections with frosted glass / solid contrast */}
      <div className="relative z-20 bg-white/95 text-slate-900 rounded-t-[2.5rem] shadow-2xl backdrop-blur-md">
        <ServicesSection />
        <StatsSection />
        <GoogleReviewSection />
      </div>
    </div>
  );
}
