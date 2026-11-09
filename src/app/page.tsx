import SmoothScrollProvider from '@/components/shared/SmoothScrollProvider';
import CursorDesignHero from '@/components/sections/home/CursorDesignHero';
import ProductShowcase from '@/components/sections/home/ProductShowcase';
import CategoryStories from '@/components/sections/home/CategoryStories';
import FinishesLab from '@/components/sections/home/FinishesLab';
import PressProcess from '@/components/sections/home/PressProcess';
import IndustriesSection from '@/components/sections/home/IndustriesSection';
import ProofSection from '@/components/sections/home/ProofSection';
import QuoteCta from '@/components/sections/home/QuoteCta';

/**
 * Home page — "3D print studio" story:
 * 1. Cursor-design hero — a team of cursors draws and colours our print products
 *    (the old card→box HeroJourney stays in the repo; it will move into the Boxes category)
 * 2. Product ring   — 3D carousel of everything the press prints
 * 3. Category stories — one 3D scene per main category (bottle label, cards, brochure, boxes, files, pouches)
 * 4. Finishes lab   — interactive 3D card (velvet / spot UV / foil / emboss)
 * 5. Press process  — a sheet runs through a 4-colour offset press
 * 6. Industries     — tilt cards
 * 7. Proof          — stats + reviews
 * 8. Quote CTA      — open 3D box + WhatsApp quote builder
 */
export default function Home() {
  return (
    <SmoothScrollProvider>
      <CursorDesignHero />
      <ProductShowcase />
      <CategoryStories />
      <FinishesLab />
      <PressProcess />
      <IndustriesSection />
      <ProofSection />
      <QuoteCta />
    </SmoothScrollProvider>
  );
}
