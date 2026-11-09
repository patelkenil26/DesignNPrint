import CountUp from '@/components/shared/CountUp';
import InkBar from '@/components/shared/InkBar';
import Reveal from '@/components/shared/Reveal';
import { aboutStatLabels, type InkColor } from '@/data/aboutData';
import { proofStatCounts } from '@/data/homeData';
import { getYearsInBusiness } from '@/data/siteConfig';

/** On the dark section the black ink reads as white so the bar stays visible. */
const inkOnDark: Record<InkColor, string> = {
  blue: 'var(--color-brand-blue)',
  red: 'var(--color-brand-red)',
  yellow: 'var(--color-brand-yellow)',
  ink: 'var(--color-paper)',
};

const statValues: Record<string, number> = {
  years: getYearsInBusiness(),
  team: proofStatCounts.team,
  products: proofStatCounts.products,
  clients: proofStatCounts.clients,
};

/** The numbers as four ink columns that fill up while the figures count. */
export default function AboutStats() {
  return (
    <section className="bg-studio-dark text-white" aria-label="Design N Print in numbers">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-5 py-14 sm:px-10 sm:py-20 lg:grid-cols-4">
        {aboutStatLabels.map((stat, index) => (
          <Reveal key={stat.id} delay={index * 0.08}>
            <div className="flex h-full gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
              <InkBar color={inkOnDark[stat.ink]} delay={index * 0.1} className="h-24 w-2 shrink-0 rounded-full sm:h-28" />
              <div>
                <dd className="font-display text-4xl font-bold sm:text-5xl">
                  <CountUp target={statValues[stat.id]} suffix="+" />
                </dd>
                <dt className="mt-2 text-sm leading-snug text-white/60">{stat.label}</dt>
              </div>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
