import Link from 'next/link';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import LinkButton from '@/components/shared/LinkButton';
import PageHero from '@/components/shared/PageHero';
import QuoteBand from '@/components/shared/QuoteBand';
import Reveal from '@/components/shared/Reveal';
import SafeImage from '@/components/shared/SafeImage';
import TiltCard from '@/components/shared/TiltCard';
import ServiceCard from '@/components/sections/Services/ServiceCard';
import { ProductCategory, getCategoryHref } from '@/data/categories';
import { ServiceItem, getServicesByCategory } from '@/data/serviceCatalog';
import { buildWhatsAppLink } from '@/data/siteConfig';

interface ServiceDetailProps {
  service: ServiceItem;
  category: ProductCategory;
}

/** One service page: hero, types, advantages, gallery, related services and a quote band. */
export default function ServiceDetail({ service, category }: ServiceDetailProps) {
  const related = getServicesByCategory(category.slug)
    .filter((item) => item.slug !== service.slug)
    .slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow={category.name}
        title={service.title}
        description={service.summary}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: category.name, href: getCategoryHref(category.slug) },
          { label: service.title },
        ]}
        aside={
          <TiltCard>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-ink/5">
              <SafeImage
                src={service.images[0]}
                alt={`${service.title} — sample print`}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <span
                className="absolute inset-x-0 top-0 h-1.5"
                style={{ backgroundColor: `var(--color-brand-${category.accent})` }}
              />
            </div>
          </TiltCard>
        }
      >
        <div className="flex flex-wrap gap-3">
          <LinkButton href={buildWhatsAppLink(`Hi Design N Print, I would like a quote for ${service.title}.`)} isExternal variant="whatsapp">
            <MessageCircle className="h-4 w-4" /> Get a quote
          </LinkButton>
          <LinkButton href={`/contact?subject=${encodeURIComponent(service.title)}`} variant="outline">
            Send an enquiry <ArrowRight className="h-4 w-4" />
          </LinkButton>
        </div>
      </PageHero>

      <section className="bg-paper py-16 sm:py-24" aria-labelledby="types-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">What we offer</p>
            <h2 id="types-heading" className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
              Types of {service.title.toLowerCase()}
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {service.types.map((type, index) => (
              <li key={type}>
                <Reveal delay={index * 0.04}>
                  <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-ink shadow-sm ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: `var(--color-brand-${category.accent})` }}
                    />
                    {type}
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper-deep/60 py-16 sm:py-24" aria-labelledby="advantages-heading">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-10 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Why it works</p>
            <h2 id="advantages-heading" className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
              Why choose Design N Print
            </h2>
            <ul className="mt-8 space-y-4">
              {service.advantages.map((advantage) => (
                <li key={advantage} className="flex items-start gap-3 text-base text-ink/80">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {advantage}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="grid grid-cols-2 gap-4">
            {service.images.slice(0, 2).map((image, index) => (
              <Reveal key={image} delay={index * 0.1} className={service.images.length === 1 ? 'col-span-2' : ''}>
                <TiltCard>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-white shadow-xl">
                    <SafeImage
                      src={image}
                      alt={`${service.title} sample ${index + 1}`}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-paper py-16 sm:py-24" aria-labelledby="related-heading">
          <div className="mx-auto max-w-7xl px-5 sm:px-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="related-heading" className="font-display text-3xl font-bold text-ink sm:text-4xl">
                More in {category.name}
              </h2>
              <Link
                href={getCategoryHref(category.slug)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline-offset-4 hover:underline"
              >
                See the whole category <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <li key={item.slug}>
                  <ServiceCard service={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <QuoteBand topic={service.title} />
    </>
  );
}
