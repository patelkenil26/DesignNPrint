import type { Metadata } from 'next';
import JsonLd from '@/components/shared/JsonLd';
import { buildBreadcrumbSchema, buildPageMetadata, buildWebPageSchema } from '@/lib/seo';
import AboutHero from '@/components/sections/About/AboutHero';
import AboutManifesto from '@/components/sections/About/AboutManifesto';
import AboutRange from '@/components/sections/About/AboutRange';
import AboutStats from '@/components/sections/About/AboutStats';
import AboutStory from '@/components/sections/About/AboutStory';
import AboutTimeline from '@/components/sections/About/AboutTimeline';
import AboutValues from '@/components/sections/About/AboutValues';
import AboutVisit from '@/components/sections/About/AboutVisit';
import ProductMarquee from '@/components/sections/Services/ProductMarquee';
import QuoteBand from '@/components/shared/QuoteBand';

export const metadata: Metadata = buildPageMetadata({
  title: 'About Us | Design N Print — Offset Printing Press, Ahmedabad',
  description:
    'Design N Print is a leading offset press in Ahmedabad, specialised in fine-quality printing and supporting services for commerce and industry of Gujarat since 2008.',
  path: '/about',
});

/**
 * About — told like a press run:
 * registered headline → manifesto that inks in → who we are → numbers → values in four inks →
 * a journey line that prints as you scroll → the range → visit us → quote.
 */
export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema({
            name: 'About Design N Print',
            description: 'Offset printing and packaging press in Ahmedabad, since 2008.',
            path: '/about',
            pageType: 'AboutPage',
          }),
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
        ]}
      />
      <AboutHero />
      <AboutManifesto />
      <AboutStory />
      <AboutStats />
      <AboutValues />
      <AboutTimeline />
      <ProductMarquee />
      <AboutRange />
      <AboutVisit />
      <QuoteBand />
    </>
  );
}
