/**
 * Places we print for — drives /areas, /areas/[area], the sitemap, footer links and llms.txt.
 * Copy stays factual: we are one press in Naroda GIDC, so every other area is "delivered to", never "located in".
 * NOTE: keep this file free of `@/` imports — scripts may read it directly.
 */

export type ServiceAreaKind = 'home' | 'ahmedabad' | 'gujarat';

export interface ServiceArea {
  slug: string;
  name: string;
  kind: ServiceAreaKind;
  /** H1 on the area page and the share-card title */
  headline: string;
  /** meta description + intro paragraph */
  intro: string;
  /** what makes printing for this area different (industries, how we deliver) */
  localAngle: string;
  /** ids from `industries` in homeData.ts */
  industryIds: string[];
  /** slugs from `productCatalog` — the products most requested here */
  productSlugs: string[];
}

export const serviceAreas: ServiceArea[] = [
  {
    slug: 'naroda-gidc',
    name: 'Naroda GIDC',
    kind: 'home',
    headline: 'Printing press in Naroda GIDC, Ahmedabad',
    intro:
      'Design N Print runs from Naroda GIDC itself — walk in with your artwork, sit with a designer, approve a proof and collect your job the same week. Offset printing and packaging for the industrial estate and the neighbourhood around it, since 2008.',
    localAngle:
      'Being inside the estate means no courier wait: factories and traders in Naroda can send a runner for proofs, approve colour on paper in person and pick up urgent jobs from our press.',
    industryIds: ['pharma', 'cosmetics', 'agro', 'corporate'],
    productSlugs: ['box', 'sticker', 'bill-book', 'letterhead', 'visiting-card', 'file'],
  },
  {
    slug: 'ahmedabad',
    name: 'Ahmedabad',
    kind: 'ahmedabad',
    headline: 'Printing and packaging services in Ahmedabad',
    intro:
      'From start-ups in SG Highway offices to old-city traders, Ahmedabad businesses use Design N Print for visiting cards, brochures, boxes, stickers, pouches and more — designed and printed under one roof at our Naroda press.',
    localAngle:
      'Share your brief on WhatsApp, approve the digital proof from your desk and we deliver across Ahmedabad — or you can drop in at Naroda GIDC to check colour and paper first.',
    industryIds: ['corporate', 'cosmetics', 'events', 'pharma'],
    productSlugs: ['visiting-card', 'brochure', 'box', 'pouch', 'sticker', 'flex-banner'],
  },
  {
    slug: 'odhav',
    name: 'Odhav',
    kind: 'ahmedabad',
    headline: 'Printing press for Odhav industrial estate',
    intro:
      'Odhav manufacturers need packaging and labels that arrive on schedule. Design N Print prints cartons, stickers, bill books and brochures for Odhav units from our nearby Naroda press.',
    localAngle:
      'Repeat orders — cartons, labels, invoice books — are easiest when the press is a short ride away. Send the previous job as a reference and we reprint it to match.',
    industryIds: ['pharma', 'agro', 'cosmetics', 'corporate'],
    productSlugs: ['box', 'corrugated-box', 'sticker', 'bill-book', 'letterhead', 'bopp-bag'],
  },
  {
    slug: 'vatva',
    name: 'Vatva',
    kind: 'ahmedabad',
    headline: 'Printing and packaging for Vatva GIDC',
    intro:
      'Vatva GIDC is home to chemical, pharma and engineering units that need accurate labels, cartons and stationery. Design N Print delivers offset-printed packaging and business print to Vatva from Naroda.',
    localAngle:
      'Chemical and pharma packaging needs careful proofs — we share a digital proof for every job and print only after you approve it.',
    industryIds: ['pharma', 'agro', 'corporate'],
    productSlugs: ['box', 'bottle-label', 'sticker', 'bill-book', 'file', 'letterhead'],
  },
  {
    slug: 'kathwada',
    name: 'Kathwada',
    kind: 'ahmedabad',
    headline: 'Printing press serving Kathwada',
    intro:
      'Kathwada businesses and industrial units are close to our Naroda press. We handle packaging, labels, catalogues and office stationery for Kathwada — with design help if you need it.',
    localAngle:
      'A nearby location means quick proof-to-print turnaround and easy visits when a job needs a colour check on paper.',
    industryIds: ['ceramic', 'cosmetics', 'corporate'],
    productSlugs: ['box', 'sticker', 'book', 'file', 'visiting-card', 'envelope'],
  },
  {
    slug: 'sanand',
    name: 'Sanand',
    kind: 'ahmedabad',
    headline: 'Printing and packaging delivered to Sanand',
    intro:
      'Sanand’s growing industrial belt — food, auto, electronics and packaging units — gets offset-printed cartons, labels, stationery and brochures from Design N Print, delivered from our Naroda press.',
    localAngle:
      'Plan bulk orders in advance and we schedule production and dispatch to your plant, with a digital proof before every run.',
    industryIds: ['corporate', 'cosmetics', 'agro'],
    productSlugs: ['corrugated-box', 'box', 'sticker', 'bopp-bag', 'bill-book', 'brochure'],
  },
  {
    slug: 'gandhinagar',
    name: 'Gandhinagar',
    kind: 'gujarat',
    headline: 'Printing services for Gandhinagar',
    intro:
      'Offices, institutions and businesses in Gandhinagar order brochures, files, letterheads, certificates and packaging from Design N Print — designed in-house and delivered from Naroda.',
    localAngle:
      'Order by WhatsApp, approve the proof online and receive the finished print at your office in Gandhinagar.',
    industryIds: ['corporate', 'events'],
    productSlugs: ['brochure', 'file', 'letterhead', 'book', 'visiting-card', 'flex-banner'],
  },
  {
    slug: 'morbi',
    name: 'Morbi',
    kind: 'gujarat',
    headline: 'Tile and ceramic packaging printing for Morbi',
    intro:
      'Morbi’s tile and ceramic makers send us briefs for sample folders, catalogues, carton boxes and labels. Design N Print prints and dispatches them to Morbi from Ahmedabad.',
    localAngle:
      'We make sturdy display folders and catalogues built for heavy tile samples, and match colour to your tile shades with a proof before printing.',
    industryIds: ['ceramic', 'corporate'],
    productSlugs: ['file', 'book', 'corrugated-box', 'box', 'sticker', 'brochure'],
  },
  {
    slug: 'surat',
    name: 'Surat',
    kind: 'gujarat',
    headline: 'Printing and packaging dispatched to Surat',
    intro:
      'Surat’s textile, diamond and trading businesses use Design N Print for boxes, pouches, labels, catalogues and stationery — designed and printed in Ahmedabad and sent to Surat.',
    localAngle:
      'Brief and proof happen on WhatsApp and email, so you never need to travel; finished jobs are dispatched to Surat by courier or transport.',
    industryIds: ['corporate', 'cosmetics', 'events'],
    productSlugs: ['box', 'rigid-box', 'pouch', 'sticker', 'book', 'visiting-card'],
  },
  {
    slug: 'vadodara',
    name: 'Vadodara',
    kind: 'gujarat',
    headline: 'Printing and packaging dispatched to Vadodara',
    intro:
      'Vadodara’s pharma, engineering and chemical companies order cartons, labels, files and brochures from Design N Print — approved digitally and dispatched from Ahmedabad.',
    localAngle:
      'Digital proofs, clear quotes and organised dispatch keep out-of-city orders simple for Vadodara buyers.',
    industryIds: ['pharma', 'agro', 'corporate'],
    productSlugs: ['box', 'bottle-label', 'sticker', 'file', 'brochure', 'bill-book'],
  },
  {
    slug: 'rajkot',
    name: 'Rajkot',
    kind: 'gujarat',
    headline: 'Printing and packaging dispatched to Rajkot',
    intro:
      'Rajkot’s engineering, auto-parts and trading businesses get offset-printed boxes, labels, catalogues and stationery from Design N Print, sent from our Ahmedabad press.',
    localAngle:
      'Send your requirement on WhatsApp, approve the proof and we arrange dispatch to Rajkot with the finished job.',
    industryIds: ['corporate', 'cosmetics', 'events'],
    productSlugs: ['corrugated-box', 'box', 'sticker', 'book', 'bill-book', 'pouch'],
  },
];

export function findServiceArea(slug: string): ServiceArea | undefined {
  return serviceAreas.find((area) => area.slug === slug);
}

export function getAreaHref(slug: string): string {
  return `/areas/${slug}`;
}
