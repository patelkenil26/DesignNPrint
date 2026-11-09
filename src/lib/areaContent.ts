import { industries } from '@/data/homeData';
import { findProduct, type Product } from '@/data/productCatalog';
import type { ServiceArea } from '@/data/serviceAreas';
import { siteConfig } from '@/data/siteConfig';

export function getAreaProducts(area: ServiceArea): Product[] {
  return area.productSlugs.map((slug) => findProduct(slug)).filter((product): product is Product => Boolean(product));
}

export function getAreaIndustries(area: ServiceArea) {
  return industries.filter((industry) => area.industryIds.includes(industry.id));
}

/** Short, honest FAQs per area — delivery and visiting depend on where the area is relative to our press. */
export function buildAreaFaqs(area: ServiceArea) {
  const isHome = area.kind === 'home';
  const isNearby = area.kind !== 'gujarat';
  const [weekdayHours] = siteConfig.workingHours;

  const locationAnswer = isHome
    ? `Yes. Our press is in ${siteConfig.location}. You are welcome to visit ${weekdayHours.label}, ${weekdayHours.value}.`
    : isNearby
      ? `Our press is in ${siteConfig.location}, in the same city. You can visit us ${weekdayHours.label}, ${weekdayHours.value}, or do everything on WhatsApp.`
      : `Our press is in ${siteConfig.location}. Most ${area.name} customers brief and approve proofs on WhatsApp and email, so a visit is optional — you are always welcome to come.`;

  return [
    {
      id: 'where',
      question: `Where is your press — can I visit from ${area.name}?`,
      answer: locationAnswer,
    },
    {
      id: 'delivery',
      question: `Do you deliver printing to ${area.name}?`,
      answer: isHome
        ? 'Yes — you can collect from our press, or we can arrange delivery. Tell us the quantity and we will confirm the best option.'
        : `Yes. We dispatch finished jobs to ${area.name}. Delivery method and charges depend on the size and quantity of your order — we confirm them with your quote.`,
    },
    {
      id: 'quote',
      question: `How do I get a quote for printing in ${area.name}?`,
      answer:
        'Message us on WhatsApp with the product, size, quantity and finish. Price depends on quantity, paper or material, size and finishing, and we reply with a clear quote.',
    },
    {
      id: 'design',
      question: 'Can you design it as well as print it?',
      answer:
        'Yes. We can design from scratch, improve your existing artwork or print your finished design exactly as it is — and you approve a digital proof before we print.',
    },
  ];
}
