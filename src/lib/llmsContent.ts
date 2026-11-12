import { getGuideHref, guides } from '@/data/guides';
import { homeFaqs } from '@/data/homeData';
import { buildProductFaqs, priceDrivers, productCatalog, type Product } from '@/data/productCatalog';
import { getAreaHref, serviceAreas, type ServiceArea } from '@/data/serviceAreas';
import { siteConfig } from '@/data/siteConfig';
import { buildAreaFaqs, getAreaProducts } from '@/lib/areaContent';
import { absoluteUrl } from '@/lib/seo';

/**
 * llms.txt / llms-full.txt are generated from the same data the website renders,
 * so they can never drift from the site. Only facts that are on the site are listed here —
 * do not add machinery, MOQs, ratings or payment claims until the client confirms them.
 */

const [weekdayHours, sundayHours] = siteConfig.workingHours;

function buildBusinessFacts(): string[] {
  return [
    `- **Name:** ${siteConfig.name}`,
    `- **Established:** ${siteConfig.foundedYear}`,
    `- **Address:** ${siteConfig.addressLines.join(' ')}`,
    `- **Phone / WhatsApp:** ${siteConfig.phoneDisplay}, ${siteConfig.secondaryPhoneDisplay}`,
    `- **Email:** ${siteConfig.email}`,
    `- **Hours:** ${weekdayHours.label} ${weekdayHours.value}; ${sundayHours.label} ${sundayHours.value} (IST)`,
    `- **Express dispatch:** ${siteConfig.expressDispatch} on eligible jobs`,
    `- **Google Business Profile:** ${siteConfig.googleProfileUrl}`,
    `- **Website:** ${siteConfig.siteUrl}`,
    `- **Content last updated:** ${siteConfig.contentLastUpdated}`,
  ];
}

export function buildLlmsTxt(): string {
  const lines = [
    `# ${siteConfig.name} — Offset Printing & Packaging Press, Ahmedabad`,
    '',
    `> Offset printing and packaging press in ${siteConfig.location}, Gujarat, India, operating since ${siteConfig.foundedYear}. Designs and prints ${productCatalog.length} product families — visiting cards, brochures, boxes, stickers, pouches and more — under one roof.`,
    '',
    '## Business',
    ...buildBusinessFacts(),
    '',
    '## Products',
    ...productCatalog.map(
      (product) =>
        `- [${product.name}](${absoluteUrl(`/services/${product.slug}`)}): ${product.tagline} ${product.types.length} types. Markdown: ${absoluteUrl(`/services/${product.slug}.md`)}`,
    ),
    '',
    '## Areas served',
    ...serviceAreas.map((area) => `- [${area.name}](${absoluteUrl(getAreaHref(area.slug))}): ${area.headline}`),
    '',
    '## Buying guides',
    ...guides.map((guide) => `- [${guide.title}](${absoluteUrl(getGuideHref(guide.slug))}): ${guide.summary}`),
    '',
    '## Key pages',
    `- [Home](${absoluteUrl('/')})`,
    `- [All products](${absoluteUrl('/services')})`,
    `- [Areas we serve](${absoluteUrl('/areas')})`,
    `- [Printing guides](${absoluteUrl('/guides')})`,
    `- [About](${absoluteUrl('/about')})`,
    `- [Contact & directions](${absoluteUrl('/contact')})`,
    `- [Full details for AI agents](${absoluteUrl('/llms-full.txt')})`,
    '',
  ];
  return lines.join('\n');
}

export function buildLlmsFullTxt(): string {
  const productSections = productCatalog.flatMap((product) => [
    `### ${product.name}`,
    `URL: ${absoluteUrl(`/services/${product.slug}`)}`,
    product.intro,
    '',
    '**Types:**',
    ...product.types.map((type) => `- ${type.name} — ${type.line}`),
    '',
    `**Finishes:** ${product.finishes.join(', ')}`,
    '',
  ]);

  const areaSections = serviceAreas.flatMap((area) => [
    `### ${area.name}`,
    `URL: ${absoluteUrl(getAreaHref(area.slug))}`,
    area.intro,
    area.localAngle,
    '',
  ]);

  const lines = [
    `# ${siteConfig.name} — Full Reference`,
    '',
    `> Complete reference for AI assistants and buyers. Generated from the live website content (${siteConfig.siteUrl}).`,
    '',
    '## Business',
    ...buildBusinessFacts(),
    '',
    '## How an order works',
    '1. Message us on WhatsApp (or fill the job ticket on the contact page) with product, size, quantity and finish.',
    '2. We design from scratch, improve your artwork or print your finished file.',
    '3. You approve a digital proof before a single sheet is run.',
    '4. We print, finish and deliver or hand over at our press.',
    '',
    'Price depends on quantity, paper or material, size and finishing; a clear quote is shared after the brief.',
    '',
    '## Artwork guidelines',
    '- Preferred files: print-ready PDF, CorelDRAW (text converted to curves), Illustrator or layered PSD.',
    '- Colour mode CMYK; images at 300 DPI at final size.',
    '- Add 3 mm bleed and keep important text a few millimetres inside the trim line.',
    '',
    '## Products',
    ...productSections,
    '## Areas served',
    ...areaSections,
    '## Buying guides',
    ...guides.flatMap((guide) => [`### ${guide.title}`, `URL: ${absoluteUrl(getGuideHref(guide.slug))}`, guide.quickAnswer, '']),
    '## Frequently asked questions',
    ...homeFaqs.flatMap((faq) => [`### ${faq.question}`, faq.answer, '']),
    '## Contact',
    `- WhatsApp: https://wa.me/${siteConfig.whatsappNumber}`,
    `- Contact page: ${absoluteUrl('/contact')}`,
    `- Directions: ${siteConfig.mapsDirectionsUrl}`,
    '',
  ];
  return lines.join('\n');
}

/** Clean markdown twin of a product page — served at /services/<slug>.md for AI crawlers and agents. */
export function buildProductMarkdown(product: Product): string {
  const faqs = buildProductFaqs(product);
  return [
    `# ${product.name} printing in Ahmedabad — ${siteConfig.name}`,
    '',
    `Source: ${absoluteUrl(`/services/${product.slug}`)} · Last updated ${siteConfig.contentLastUpdated}`,
    '',
    `${siteConfig.name}, a printing press in ${siteConfig.location} since ${siteConfig.foundedYear}, designs and prints ${product.name.toLowerCase()} in ${product.types.length} types. ${product.intro}`,
    '',
    '## Types',
    ...product.types.map((type) => `- **${type.name}** — ${type.line}`),
    '',
    '## Finishes and add-ons',
    ...product.finishes.map((finish) => `- ${finish}`),
    '',
    '## What decides the price',
    ...priceDrivers.map((driver) => `- **${driver.title}:** ${driver.detail}`),
    '',
    '## Frequently asked questions',
    ...faqs.flatMap((faq) => [`### ${faq.question}`, faq.answer, '']),
    '## Contact',
    `- WhatsApp: https://wa.me/${siteConfig.whatsappNumber}`,
    `- Phone: ${siteConfig.phoneDisplay}`,
    `- Address: ${siteConfig.addressLines.join(' ')}`,
    `- Hours: ${weekdayHours.label} ${weekdayHours.value}`,
    '',
  ].join('\n');
}

/** Clean markdown twin of an area page — served at /areas/<slug>.md. */
export function buildAreaMarkdown(area: ServiceArea): string {
  const areaProducts = getAreaProducts(area);
  return [
    `# ${area.headline} — ${siteConfig.name}`,
    '',
    `Source: ${absoluteUrl(getAreaHref(area.slug))} · Last updated ${siteConfig.contentLastUpdated}`,
    '',
    area.intro,
    '',
    area.localAngle,
    '',
    '## Most requested here',
    ...areaProducts.map((product) => `- [${product.name}](${absoluteUrl(`/services/${product.slug}`)}): ${product.tagline}`),
    '',
    '## Questions',
    ...buildAreaFaqs(area).flatMap((faq) => [`### ${faq.question}`, faq.answer, '']),
    '## Contact',
    `- WhatsApp: https://wa.me/${siteConfig.whatsappNumber}`,
    `- Address: ${siteConfig.addressLines.join(' ')}`,
    '',
  ].join('\n');
}
