import HeroSection from "@/components/sections/Home/HeroSection";
import DualJourney from "@/components/sections/Home/DualJourney";
import QuickEstimator from "@/components/sections/Home/QuickEstimator";
import BeforeAfterSection from "@/components/sections/Home/BeforeAfterSection";
import FinishesLab from "@/components/sections/Home/FinishesLab";
import ServicesSection from "@/components/sections/Services/ServicesSection";
import ProcessSection from "@/components/sections/Home/ProcessSection";
import StatsSection from "@/components/sections/StatsSection";
import GoogleReviewSection from "@/components/sections/Review/GoogleReviewSection";
import FaqSection from "@/components/sections/Home/FaqSection";
import CtaSection from "@/components/sections/Home/CtaSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. High-Impact Print Studio Hero with 3D Tilt Card */}
      <HeroSection />

      {/* 2. Choose Your Path (Print-Ready vs Custom Design) */}
      <DualJourney />

      {/* 3. Interactive Instant Cost & Spec Estimator */}
      <QuickEstimator />

      {/* 4. Interactive Before/After Transformation Slider */}
      <BeforeAfterSection />

      {/* 5. Tactile Finishes & Material Swatches Lab */}
      <FinishesLab />

      {/* 6. Comprehensive Services & Products Catalog with Category Tabs */}
      <ServicesSection />

      {/* 7. 4-Step Precision Offset Workflow */}
      <ProcessSection />

      {/* 8. Stats & Track Record */}
      <StatsSection />

      {/* 9. Verified Google Reviews & Social Proof */}
      <GoogleReviewSection />

      {/* 10. Frequently Asked Questions (Business Owner Answers) */}
      <FaqSection />

      {/* 11. Bottom Action CTA & Studio Directions */}
      <CtaSection />
    </div>
  );
}
