import { Clock, MapPin, Phone } from 'lucide-react';
import ContactMapCard from '@/components/sections/contact/ContactMapCard';
import Reveal from '@/components/shared/Reveal';
import { siteConfig } from '@/data/siteConfig';

/** Trust through a real address: where the press is, when it is open, and a map. */
export default function AboutVisit() {
  return (
    <section className="bg-paper-deep/60 py-16 sm:py-24" aria-labelledby="visit-heading">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Come and see</p>
          <h2 id="visit-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">
            Visit our press in Naroda.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink/70">
            Drop in to see samples, talk to the team and check paper and finishes in your hand.
          </p>

          <ul className="mt-8 space-y-5 text-sm text-ink/80">
            <li className="flex gap-4">
              <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-brand-yellow">
                <MapPin className="h-4 w-4" />
              </span>
              <address className="not-italic leading-relaxed">
                {siteConfig.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </li>
            <li className="flex gap-4">
              <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-brand-yellow">
                <Clock className="h-4 w-4" />
              </span>
              <dl className="space-y-1">
                {siteConfig.workingHours.map((slot) => (
                  <div key={slot.label} className="flex flex-wrap gap-x-3">
                    <dt className="font-semibold text-ink">{slot.label}</dt>
                    <dd>{slot.value}</dd>
                  </div>
                ))}
              </dl>
            </li>
            <li className="flex gap-4">
              <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-brand-yellow">
                <Phone className="h-4 w-4" />
              </span>
              <span className="flex flex-col font-semibold text-ink">
                <a href={`tel:+${siteConfig.whatsappNumber}`} className="hover:underline">
                  {siteConfig.phoneDisplay}
                </a>
                <a href={`tel:+${siteConfig.secondaryPhoneNumber}`} className="hover:underline">
                  {siteConfig.secondaryPhoneDisplay}
                </a>
              </span>
            </li>
          </ul>
        </Reveal>

        <ContactMapCard />
      </div>
    </section>
  );
}
