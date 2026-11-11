import type { Metadata } from 'next';
import SmoothScrollProvider from '@/components/shared/SmoothScrollProvider';
import HeroPrintDrop from '@/components/sections/home/HeroPrintDrop';
import TrustStrip from '@/components/sections/home/TrustStrip';
import ProductDeck from '@/components/sections/home/ProductDeck';
import CategoryStories from '@/components/sections/home/CategoryStories';
import ProductIndex from '@/components/sections/home/ProductIndex';
import FinishesLab from '@/components/sections/home/FinishesLab';
import PressProcess from '@/components/sections/home/PressProcess';
import IndustriesSection from '@/components/sections/home/IndustriesSection';
import ProofSection from '@/components/sections/home/ProofSection';
import StartPaths from '@/components/sections/home/StartPaths';
import HomeFaq from '@/components/sections/home/HomeFaq';
import QuoteCta from '@/components/sections/home/QuoteCta';
import { getAllProductCards } from '@/lib/productCards';

// Title, description and Open Graph come from the root layout; only the canonical is set here.
// (FAQPage schema is emitted by the shared FaqAccordion.)
export const metadata: Metadata = { alternates: { canonical: '/' } };

/**
 * Home page — every section answers one question, in the order a buyer asks them:
 *  1. Hero print-drop   WOW      — product proofs print in as CMYK ink plates snap into register
 *  2. Trust strip       SAFE?    — design + print, proof first, express dispatch, location
 *  3. Most requested    WHAT     — scroll-dealt deck of the 8 products people order first
 *  4. Category stories  WHAT+    — camera journey through the 6 headline categories
 *  5. Product index     ALL      — the full range of 17, one hover away
 *  6. Finishes lab      QUALITY  — interactive 3D card (velvet / spot UV / foil / emboss)
 *  7. Press process     HOW      — a sheet runs through a 4-colour offset press
 *  8. Industries        FOR ME?  — pharma, ceramic, cosmetics, agro, corporate, events
 *  9. Proof             TRUST    — stats + reviews
 * 10. Start paths       NEXT     — "I have a design" / "I need a design"
 * 11. FAQ               DOUBTS   — proof, price, turnaround, MOQ, delivery
 * 12. Quote CTA         ACT      — open 3D box + WhatsApp quote builder
 */
export default function Home() {
  return (
    <SmoothScrollProvider>
      <HeroPrintDrop />
      <TrustStrip />
      <ProductDeck />
      <CategoryStories />
      <ProductIndex products={getAllProductCards()} />
      <FinishesLab />
      <PressProcess />
      <IndustriesSection />
      <ProofSection />
      <StartPaths />
      <HomeFaq />
      <QuoteCta />
    </SmoothScrollProvider>
  );
}
