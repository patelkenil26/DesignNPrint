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
    { label: 'Types', value: `${typeNames.length} — ${typeNames.join(', ')}` },
    { label: 'Finishes', value: product.finishes.join(', ') },
    { label: 'Made at', value: `${siteConfig.name}, ${siteConfig.location} (since ${siteConfig.foundedYear})` },
    { label: 'Express dispatch', value: `${siteConfig.expressDispatch} on selected jobs` },
    { label: 'Get a price', value: 'Message us on WhatsApp with type, size, quantity and finish' },
  ];

  return (
    <section className="bg-paper pt-12 sm:pt-16" aria-labelledby="quick-answer-heading">
      <Reveal className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5 sm:p-8">
          <h2 id="quick-answer-heading" className="font-display text-xl font-bold text-ink sm:text-2xl">
            Where can I get {name} printed in Ahmedabad?
          </h2>
          <p data-speakable className="mt-3 max-w-3xl text-base leading-relaxed text-ink/75">
            {siteConfig.name}, a printing press in {siteConfig.location} since {siteConfig.foundedYear}, designs and
            prints {name} in {typeNames.length} types. {product.intro}
          </p>
          <dl className="mt-6 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-[9rem_1fr]">
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
