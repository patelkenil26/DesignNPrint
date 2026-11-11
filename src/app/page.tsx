import type { Metadata } from 'next';
import ScrollProgressBar from '@/components/shared/ScrollProgressBar';
import SmoothScrollProvider from '@/components/shared/SmoothScrollProvider';
import TypeMarquee from '@/components/shared/TypeMarquee';
import HeroPrintDrop from '@/components/sections/home/HeroPrintDrop';
import TrustStrip from '@/components/sections/home/TrustStrip';
import CategoryExplorer from '@/components/sections/home/CategoryExplorer';
import ProductShowcase from '@/components/sections/home/ProductShowcase';
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
 * Home page — every section answers one question, in the order a buyer asks them, and each one moves differently:
 *  1. Hero print-drop    WOW      — product proofs print in as CMYK ink plates snap into register
 *  2. Trust strip        SAFE?    — five promises pop in, CMYK underlines draw themselves
 *  3. Category explorer  WHAT     — six family panels; the hovered one opens wide
 *  4. Product showcase   WHAT+    — all products, each shown once, dealt like cards in category order
 *  5. Type marquee       —        — oversized "Design · Print · Finish · Pack · Deliver" band
 *  6. Finishes lab       QUALITY  — a card whose finish reacts to your pointer (velvet / spot UV / foil / emboss)
 *  7. Press process      HOW      — scroll prints a sheet colour by colour, then finishes and dispatches it
 *  8. Industries         FOR ME?  — cards that pile up as you scroll
 *  9. Proof              TRUST    — counting numbers + a review spotlight
 * 10. Start paths        NEXT     — toggle between "I have a design" / "I need a design"
 * 11. FAQ                DOUBTS   — proof, price, turnaround, MOQ, delivery
 * 12. Quote CTA          ACT      — turning product cube + WhatsApp quote builder
 */
export default function Home() {
  return (
    <SmoothScrollProvider>
      <ScrollProgressBar />
      <HeroPrintDrop />
      <TrustStrip />
      <CategoryExplorer />
      <ProductShowcase products={getAllProductCards()} />
      <TypeMarquee />
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
