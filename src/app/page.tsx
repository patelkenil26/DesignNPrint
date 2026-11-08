import SmoothScrollProvider from '@/components/shared/SmoothScrollProvider';
import HeroJourney from '@/components/sections/home/HeroJourney';
import ProductShowcase from '@/components/sections/home/ProductShowcase';
import FinishesLab from '@/components/sections/home/FinishesLab';
import PressProcess from '@/components/sections/home/PressProcess';
import IndustriesSection from '@/components/sections/home/IndustriesSection';
import ProofSection from '@/components/sections/home/ProofSection';
import QuoteCta from '@/components/sections/home/QuoteCta';

/**
 * Home page — "3D print studio" story:
 * 1. Hero journey   — visiting card unfolds into a die-cut sheet and folds into a box
 * 2. Product ring   — 3D carousel of everything the press prints
 * 3. Finishes lab   — interactive 3D card (velvet / spot UV / foil / emboss)
 * 4. Press process  — a sheet runs through a 4-colour offset press
 * 5. Industries     — tilt cards
 * 6. Proof          — stats + reviews
 * 7. Quote CTA      — open 3D box + WhatsApp quote builder
 */
export default function Home() {
  return (
    <SmoothScrollProvider>
      <HeroJourney />
      <ProductShowcase />
      <FinishesLab />
      <PressProcess />
      <IndustriesSection />
      <ProofSection />
      <QuoteCta />
    </SmoothScrollProvider>
  );
}
