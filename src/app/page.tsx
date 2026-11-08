import StatsSection from '@/components/sections/StatsSection';
import GoogleReviewSection from '@/components/sections/Review/GoogleReviewSection';
import SceneRootLoader from '@/components/three/SceneRootLoader';
import HeroScrollytelling from '@/components/sections/HeroScrollytelling';

export default function Home() {
  return (
    <>
      {/*
        LAYOUT STRATEGY (Madhur Sugar style):
        ┌─────────────────────────────────────┐
        │  SceneRoot   sticky top:0 h:100vh   │  ← 3D canvas sticks in place
        │  (position: sticky, z-index: 1)     │
        ├─────────────────────────────────────┤
        │  HeroScrollytelling                 │  ← Text scrolls OVER the canvas
        │  3 sections × min-h-screen          │  ← 300vh of scroll space
        │  (position: relative, z-index: 10)  │
        ├─────────────────────────────────────┤
        │  Stats + Reviews  bg-white z-20     │  ← Solid white wipes canvas away
        └─────────────────────────────────────┘
      */}

      {/* 3D CANVAS — sticky so it stays visible while sections scroll */}
      <SceneRootLoader />

      {/* SCROLLYTELLING TEXT OVERLAY — scrolls over the sticky canvas */}
      <div className="relative z-10">
        <HeroScrollytelling />
      </div>

      {/* BELOW-FOLD — solid white wipes the 3D canvas out of view */}
      <div className="relative z-20 bg-white text-slate-900 shadow-[0_-20px_60px_rgba(0,0,0,0.5)]">
        <StatsSection />
        <GoogleReviewSection />
      </div>
    </>
  );
}
