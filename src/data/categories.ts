import type { BrandAccent } from '@/data/homeData';
import { legacyCategoryToProduct } from '@/data/legacyRedirects';

/**
 * Single source of truth for the 6 main product categories.
 * Used by the home-page "Category Stories", the services pages and the navbar menu.
 */
export interface SubCategory {
  name: string;
  blurb: string;
}

export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  /** one short word used for giant typography */
  shortName: string;
  tagline: string;
  blurb: string;
  accent: BrandAccent;
  /** cover image used on cards */
  image: string;
  imageAlt: string;
  /** the products that live in this category — each product belongs to exactly one */
  productSlugs: string[];
  subCategories: SubCategory[];
}

export const productCategories: ProductCategory[] = [
  {
    id: 'stickers-labels',
    slug: 'stickers-and-labels',
    shortName: 'STICKERS',
    name: 'Stickers & Labels',
    tagline: 'Peel. Stick. Stand out.',
    blurb: 'Bottle labels, die-cut stickers and product labels — printed sharp and cut to any shape.',
    accent: 'blue',
    image: '/images/products/bottle-label/waterproof-bottle-label.jpg',
    productSlugs: ['sticker', 'bottle-label'],
    imageAlt: 'Printed stickers and product labels',
    subCategories: [
      { name: 'Bottle labels', blurb: 'Waterproof labels for bottles, cans and jars.' },
      { name: 'Die-cut stickers', blurb: 'Any shape — hearts, stars, thumbs-up, your logo.' },
      { name: 'Round stickers', blurb: 'Clean circular seals and promo stickers.' },
      { name: 'Product labels', blurb: 'Retail-ready labels for packs and boxes.' },
      { name: 'Pesticide labels', blurb: 'Clear, compliant labels for agro products.' },
    ],
  },
  {
    id: 'cards-stationery',
    slug: 'cards-and-stationery',
    shortName: 'CARDS',
    name: 'Cards & Stationery',
    tagline: 'First impressions, in your hand.',
    blurb: 'Visiting cards, letterheads, envelopes and certificates in premium stock and finishes.',
    accent: 'red',
    image: '/images/products/visiting-card/cover.jpg',
    productSlugs: ['visiting-card', 'letterhead', 'envelope', 'bill-book'],
    imageAlt: 'Visiting cards, letterhead and envelope set',
    subCategories: [
      { name: 'Visiting cards', blurb: 'Matt, gloss, UV, foil and textured finishes.' },
      { name: 'Letterheads', blurb: 'Corporate letterheads on fine paper.' },
      { name: 'Envelopes', blurb: 'Window and non-window, branded to match.' },
      { name: 'Certificates', blurb: 'Awards and certificates with a premium feel.' },
      { name: 'Digital cards', blurb: 'Shareable digital visiting cards.' },
    ],
  },
  {
    id: 'brochures-flyers',
    slug: 'brochures-and-flyers',
    shortName: 'BROCHURES',
    name: 'Brochures, Flyers & Catalogues',
    tagline: 'Fold it open. Tell the story.',
    blurb: 'Brochures, pamphlets, booklets, catalogues and calendars that carry your message.',
    accent: 'yellow',
    image: '/images/products/brochure/cover.jpg',
    productSlugs: ['brochure', 'pamphlet-flyer', 'book'],
    imageAlt: 'Printed brochures and flyers',
    subCategories: [
      { name: 'Brochures', blurb: 'Bi-fold, tri-fold and gate-fold designs.' },
      { name: 'Pamphlets & flyers', blurb: 'High-volume handouts, sharp and fast.' },
      { name: 'Booklets', blurb: 'Stitched or bound booklets of any size.' },
      { name: 'Catalogues', blurb: 'Multi-page product catalogues, bound beautifully.' },
      { name: 'Calendars', blurb: 'Desk and wall calendars clients keep all year.' },
    ],
  },
  {
    id: 'boxes-packaging',
    slug: 'boxes-and-packaging',
    shortName: 'BOXES',
    name: 'Boxes & Packaging',
    tagline: 'Horizontal. Vertical. Yours.',
    blurb: 'Rigid, folding and tuck-end boxes in every shape — from pharma cartons to gift packaging.',
    accent: 'red',
    image: '/images/products/box/cover.jpg',
    productSlugs: ['box', 'rigid-box', 'corrugated-box'],
    imageAlt: 'Printed premium product boxes',
    subCategories: [
      { name: 'Horizontal boxes', blurb: 'Wide, low boxes for gifting and retail.' },
      { name: 'Vertical boxes', blurb: 'Tall boxes for bottles, cosmetics and tubes.' },
      { name: 'Pharma cartons', blurb: 'Clean mono-cartons with barcode-sharp print.' },
      { name: 'Cosmetic boxes', blurb: 'Foil, spot UV and soft-touch finishes.' },
      { name: 'Rigid gift boxes', blurb: 'Magnetic and lift-off lid rigid boxes.' },
      { name: 'Pesticide boxes', blurb: 'Durable, clearly labelled agro packaging.' },
    ],
  },
  {
    id: 'files-folders',
    slug: 'files-and-folders',
    shortName: 'FOLDERS',
    name: 'Files & Folders',
    tagline: 'Your brand in every meeting.',
    blurb: 'Company files, doctor files, mica and ceramic display folders built to last.',
    accent: 'green',
    image: '/images/products/book/cover.jpg',
    productSlugs: ['file'],
    imageAlt: 'Branded company file folders',
    subCategories: [
      { name: 'Company files', blurb: 'Presentation folders with pockets and card slots.' },
      { name: 'Doctor files', blurb: 'Patient and prescription files for clinics.' },
      { name: 'Mica folders', blurb: 'Laminate and mica sample folders.' },
      { name: 'Ceramic folders', blurb: 'Heavy-duty tile and ceramic display folders.' },
    ],
  },
  {
    id: 'pouches-display',
    slug: 'pouches-and-display',
    shortName: 'POUCHES',
    name: 'Pouches & Display',
    tagline: 'Carry it. Display it.',
    blurb: 'Cotton and custom pouches, flex banners and roller standees for retail and events.',
    accent: 'yellow',
    image: '/images/products/pouch/cover.jpg',
    productSlugs: ['pouch', 'bopp-bag', 'flex-banner', 'acrylic-board'],
    imageAlt: 'Custom printed pouches',
    subCategories: [
      { name: 'Cotton pouches', blurb: 'Drawstring and zipper pouches, branded.' },
      { name: 'Custom pouches', blurb: 'Packaging pouches in your size and finish.' },
      { name: 'Flex banners', blurb: 'Weather-ready large-format printing.' },
      { name: 'Roller standees', blurb: 'Portable display standees for events.' },
    ],
  },
];

export function findCategory(slug: string): ProductCategory | undefined {
  return productCategories.find((category) => category.slug === slug);
}

/** The 6 home stories deep-link to their closest product page (there are no category pages any more). */
export function getCategoryHref(slug: string): string {
  const productSlug = legacyCategoryToProduct[slug];
  return productSlug ? `/services/${productSlug}` : '/services';
}
