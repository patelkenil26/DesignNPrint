import Reveal from '@/components/shared/Reveal';
import type { Product } from '@/data/productCatalog';
import { siteConfig } from '@/data/siteConfig';

interface ProductQuickAnswerProps {
  product: Product;
}

/**
 * Answer-first summary right under the hero: one citable paragraph + the key facts in a definition list.
 * Search snippets, voice assistants and AI answers all prefer a direct answer near the top of the page.
 */
export default function ProductQuickAnswer({ product }: ProductQuickAnswerProps) {
  const name = product.name.toLowerCase();
  const typeNames = product.types.map((type) => type.name);
  const facts = [
    { label: 'Made at', value: `${siteConfig.name}, ${siteConfig.location} (since ${siteConfig.foundedYear})` },
    { label: 'Express dispatch', value: `${siteConfig.expressDispatch} on selected jobs` },
    { label: 'Get a price', value: 'Message us on WhatsApp with type, size, quantity and finish' },
  ];

  return (
    <section className="bg-paper pt-12 sm:pt-16" aria-labelledby="quick-answer-heading">
      <Reveal className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5 sm:p-8">
          <span className="cmyk-strip absolute inset-x-0 top-0 block h-1.5" aria-hidden="true" />
          <h2 id="quick-answer-heading" className="font-display text-xl font-bold text-ink sm:text-2xl">
            Where can I get {name} printed in Ahmedabad?
          </h2>
          <p data-speakable className="mt-3 max-w-3xl text-base leading-relaxed text-ink/75">
            {siteConfig.name}, a printing press in {siteConfig.location} since {siteConfig.foundedYear}, designs and
            prints {name} in {typeNames.length} types. {product.intro}
          </p>
          <div className="mt-6 grid gap-x-8 gap-y-4 text-sm sm:grid-cols-[9rem_1fr]">
            <p className="font-semibold text-ink">Types ({typeNames.length})</p>
            <ul className="flex flex-wrap gap-1.5">
              {typeNames.map((typeName) => (
                <li key={typeName} className="rounded-full bg-paper px-3 py-1 text-xs font-medium text-ink/75 transition-colors duration-300 hover:bg-ink hover:text-white">
                  {typeName}
                </li>
              ))}
            </ul>
            <p className="font-semibold text-ink">Finishes</p>
            <ul className="flex flex-wrap gap-1.5">
              {product.finishes.map((finish) => (
                <li key={finish} className="rounded-full border border-ink/15 px-3 py-1 text-xs font-medium text-ink/75">
                  {finish}
                </li>
              ))}
            </ul>
          </div>
          <dl className="mt-4 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-[9rem_1fr]">
            {facts.map((fact) => (
              <div key={fact.label} className="contents">
                <dt className="font-semibold text-ink">{fact.label}</dt>
                <dd className="text-ink/70">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
