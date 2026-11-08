import HeroScrollytelling from '@/components/sections/HeroScrollytelling';
import StatsSection from '@/components/sections/StatsSection';
import GoogleReviewSection from '@/components/sections/Review/GoogleReviewSection';
import SceneRootLoader from '@/components/three/SceneRootLoader';

export default function Home() {
  return (
    <div className="relative">
      {/* ── Fixed 3D WebGL Canvas (homepage only) ── */}
      <SceneRootLoader />

      {/* ── Scroll-driven HTML storytelling over the canvas ── */}
      <HeroScrollytelling />

      {/* ── Below-fold: stats & reviews on a solid white card ── */}
      <div className="relative z-20 bg-white text-slate-900 shadow-2xl rounded-t-[2rem] mt-0">
        <StatsSection />
        <GoogleReviewSection />
      </div>
    </div>
  );
}
