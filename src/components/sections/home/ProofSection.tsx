import { Star } from 'lucide-react';
import CountUp from '@/components/shared/CountUp';
import Reveal from '@/components/shared/Reveal';
import { customerReviews, proofStatCounts } from '@/data/homeData';
import { getYearsInBusiness, siteConfig } from '@/data/siteConfig';

const stats = [
  { id: 'years', value: getYearsInBusiness(), suffix: '+', label: 'Years of experience' },
  { id: 'team', value: proofStatCounts.team, suffix: '+', label: 'Team members' },
  { id: 'products', value: proofStatCounts.products, suffix: '+', label: 'Products delivered' },
  { id: 'clients', value: proofStatCounts.clients, suffix: '+', label: 'Happy clients' },
];

export default function ProofSection() {
  const marqueeReviews = [...customerReviews, ...customerReviews];
  const googleReviewUrl = `https://search.google.com/local/writereview?placeid=${siteConfig.googlePlaceId}`;

  return (
    <section className="bg-paper-deep/60 py-20 sm:py-28" aria-labelledby="proof-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Trusted since {siteConfig.foundedYear}</p>
          <h2 id="proof-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">
            Numbers and words from people who print with us.
          </h2>
        </Reveal>

        <dl className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.id} delay={index * 0.07}>
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <dd className="font-display text-4xl font-bold text-ink sm:text-5xl">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </dd>
                <dt className="mt-2 text-sm text-muted">{stat.label}</dt>
                <span className="cmyk-strip mt-4 block h-1 w-12 rounded-full" />
              </div>
            </Reveal>
          ))}
        </dl>
      </div>

      <div className="mt-14 overflow-hidden" aria-label="Customer reviews">
        <ul className="animate-marquee flex w-max gap-5 px-5 hover:[animation-play-state:paused]">
          {marqueeReviews.map((review, index) => (
            <li
              key={`${review.id}-${index}`}
              aria-hidden={index >= customerReviews.length}
              className="w-80 shrink-0 rounded-3xl bg-white p-6 shadow-sm"
            >
              <div className="flex gap-0.5 text-brand-yellow" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, starIndex) => (
                  <Star
                    key={starIndex}
                    className={`h-4 w-4 ${starIndex < review.rating ? 'fill-current' : 'text-ink/15'}`}
                  />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">{review.text}</p>
              <p className="mt-4 text-sm font-semibold text-ink">{review.reviewerName}</p>
              <p className="text-xs text-muted">{review.time}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 text-center">
        <a
          href={googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-ink underline underline-offset-4 hover:text-brand-blue"
        >
          Loved your print? Write us a Google review
        </a>
      </div>
    </section>
  );
}
