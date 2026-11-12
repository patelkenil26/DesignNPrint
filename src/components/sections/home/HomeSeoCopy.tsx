import Link from 'next/link';
import Reveal from '@/components/shared/Reveal';
import { getGuideHref, guides } from '@/data/guides';
import { homeSeoCopy } from '@/data/homeData';
import { getProductHref, productCatalog } from '@/data/productCatalog';
import { getAreaHref, serviceAreas } from '@/data/serviceAreas';
import { siteConfig } from '@/data/siteConfig';

const chipClasses =
  'inline-flex items-center rounded-full border border-ink/15 bg-white px-3.5 py-1.5 text-sm font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-white active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue';

/**
 * Server-rendered, keyword-rich summary with internal links to every product, area and guide —
 * gives crawlers a text description of the business and a one-hop path to every important page.
 */
export default function HomeSeoCopy() {
  return (
    <section className="bg-paper py-16 sm:py-24" aria-labelledby="home-seo-heading">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-10 lg:grid-cols-5 lg:gap-16">
        <Reveal className="lg:col-span-2">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted">
            <span className="cmyk-strip h-1.5 w-8 rounded-full" />
            {homeSeoCopy.eyebrow}
          </p>
          <h2 id="home-seo-heading" className="mt-3 text-balance font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            {homeSeoCopy.heading}
          </h2>
          <p className="mt-4 font-display text-lg font-semibold text-ink/60">{siteConfig.slogan}</p>
        </Reveal>

        <Reveal delay={0.1} className="space-y-8 lg:col-span-3">
          <div className="space-y-4">
            {homeSeoCopy.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-ink/75">
                {paragraph}
              </p>
            ))}
          </div>

          <nav aria-label={homeSeoCopy.productsHeading}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{homeSeoCopy.productsHeading}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {productCatalog.map((product) => (
                <li key={product.slug}>
                  <Link href={getProductHref(product.slug)} className={chipClasses}>
                    {product.name} printing
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={homeSeoCopy.areasHeading}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{homeSeoCopy.areasHeading}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <li key={area.slug}>
                  <Link href={getAreaHref(area.slug)} className={chipClasses}>
                    Printing in {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={homeSeoCopy.guidesHeading}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{homeSeoCopy.guidesHeading}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {guides.map((guide) => (
                <li key={guide.slug}>
                  <Link href={getGuideHref(guide.slug)} className={chipClasses}>
                    {guide.metaTitle.split(' – ')[0]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>
      </div>
    </section>
  );
}
