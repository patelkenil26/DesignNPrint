import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import CategoryCard from '@/components/sections/Services/CategoryCard';
import AboutStory from '@/components/sections/About/AboutStory';
import AboutTimeline from '@/components/sections/About/AboutTimeline';
import AboutValues from '@/components/sections/About/AboutValues';
import CountUp from '@/components/shared/CountUp';
import LinkButton from '@/components/shared/LinkButton';
import PageHero from '@/components/shared/PageHero';
import QuoteBand from '@/components/shared/QuoteBand';
import Reveal from '@/components/shared/Reveal';
import { productCategories } from '@/data/categories';
import { proofStatCounts } from '@/data/homeData';
import { getYearsInBusiness, siteConfig } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'About Us | Design N Print — Offset Printing Press, Ahmedabad',
  description:
    'Design N Print is a leading offset press in Ahmedabad, specialised in fine-quality printing and supporting services for commerce and industry of Gujarat since 2008.',
};

const stats = [
  { id: 'years', value: getYearsInBusiness(), label: 'Years of experience' },
  { id: 'team', value: proofStatCounts.team, label: 'Team members' },
  { id: 'products', value: proofStatCounts.products, label: 'Products delivered' },
  { id: 'clients', value: proofStatCounts.clients, label: 'Happy clients' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`Since ${siteConfig.foundedYear}`}
        title="Quick designing. Quality printing."
        description="Design N Print is a leading offset press in Ahmedabad — fine-quality printing and supporting services for the commerce and industry of Gujarat."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
      >
        <LinkButton href="/contact" variant="solid">
          Get in touch <ArrowRight className="h-4 w-4" />
        </LinkButton>
      </PageHero>

      <AboutStory />

      <section className="bg-ink py-14 text-white" aria-label="Design N Print in numbers">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 sm:px-10 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.id} delay={index * 0.08}>
              <dd className="font-display text-4xl font-bold sm:text-5xl">
                <CountUp target={stat.value} suffix="+" />
              </dd>
              <dt className="mt-1 text-sm text-white/60">{stat.label}</dt>
              <span className="cmyk-strip mt-4 block h-1 w-12 rounded-full" />
            </Reveal>
          ))}
        </dl>
      </section>

      <AboutValues />
      <AboutTimeline />

      <section className="bg-paper-deep/60 py-16 sm:py-24" aria-labelledby="about-categories-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">What we do</p>
            <h2 id="about-categories-heading" className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
              Six categories, one reliable press.
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {productCategories.map((category) => (
              <li key={category.id}>
                <CategoryCard category={category} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <QuoteBand />
    </>
  );
}
