import { getServiceHref } from '@/data/serviceCatalog';
import { buildWhatsAppLink } from '@/data/siteConfig';
import type { BrandAccent } from '@/data/homeData';

/**
 * The 17 products shown in the home-page "full range" index.
 * Products that already have a service page link to it; the rest open a pre-filled
 * WhatsApp quote until their own service page is written (set `serviceSlug` then).
 */
export interface IndexedProduct {
  id: string;
  name: string;
  line: string;
  accent: BrandAccent;
  /** cover image — omit when we have no real photo yet (a graphic panel is shown instead) */
  image?: string;
  imageAlt?: string;
  /** slug in serviceCatalog; omit for products without their own page yet */
  serviceSlug?: string;
}

export const productIndex: IndexedProduct[] = [
  {
    id: 'visiting-card',
    name: 'Visiting Card',
    line: 'Matt, gloss, UV, foil and textured stock.',
    accent: 'red',
    image: '/images/Card/design-n-print-product-12-1.png',
    imageAlt: 'Premium printed visiting cards',
    serviceSlug: 'visiting-card-letterhead-envelope',
  },
  {
    id: 'brochure',
    name: 'Brochure',
    line: 'Bi-fold, tri-fold and gate-fold that sell.',
    accent: 'yellow',
    image: '/images/Card/BrochureDesigning.png',
    imageAlt: 'Printed company brochures',
    serviceSlug: 'brochure-designing-printing',
  },
  {
    id: 'pamphlet-flyer',
    name: 'Pamphlet / Flyer',
    line: 'High-volume handouts, sharp and fast.',
    accent: 'yellow',
    image: '/images/Card/pamphlet.jpg',
    imageAlt: 'Printed pamphlets and flyers',
    serviceSlug: 'pamphlet-design-printing',
  },
  {
    id: 'bottle-label',
    name: 'Bottle Label',
    line: 'Waterproof labels for bottles, cans and jars.',
    accent: 'blue',
    image: '/images/Card/pesticide.jpg',
    imageAlt: 'Printed bottle label and carton designs',
    serviceSlug: 'sticker-label-designing-printing',
  },
  {
    id: 'letterhead',
    name: 'Letterhead',
    line: 'Corporate letterheads on fine paper.',
    accent: 'red',
    image: '/images/Card/LetterPad.png',
    imageAlt: 'Printed corporate letterhead',
    serviceSlug: 'visiting-card-letterhead-envelope',
  },
  {
    id: 'envelope',
    name: 'Envelope',
    line: 'Window and non-window, branded to match.',
    accent: 'red',
    image: '/images/Card/Env.png',
    imageAlt: 'Branded printed envelopes',
    serviceSlug: 'visiting-card-letterhead-envelope',
  },
  {
    id: 'sticker',
    name: 'Sticker',
    line: 'Die-cut, round and product stickers in any shape.',
    accent: 'blue',
    image: '/images/Card/sticker_label.png',
    imageAlt: 'Printed die-cut stickers and labels',
    serviceSlug: 'sticker-label-designing-printing',
  },
  {
    id: 'file',
    name: 'File',
    line: 'Company and presentation files that carry your brand.',
    accent: 'green',
    image: '/images/Card/company_file_folder.jpg',
    imageAlt: 'Branded company file folders',
    serviceSlug: 'company-file-folder',
  },
  {
    id: 'box',
    name: 'Box',
    line: 'Folding and tuck-end cartons in every shape.',
    accent: 'blue',
    image: '/images/Card/box_designing.png',
    imageAlt: 'Printed product boxes',
    serviceSlug: 'box-designing-printing',
  },
  {
    id: 'book',
    name: 'Book',
    line: 'Booklets and catalogues, stitched or bound.',
    accent: 'yellow',
    image: '/images/Card/booklet.jpg',
    imageAlt: 'Printed booklets stacked on a table',
    serviceSlug: 'booklet-designing-printing',
  },
  {
    id: 'bill-book',
    name: 'Challan / Bill Book',
    line: 'Numbered, carbonless and duplicate-triplicate books.',
    accent: 'green',
  },
  {
    id: 'pouch',
    name: 'Pouch',
    line: 'Cotton and custom pouches for retail and gifting.',
    accent: 'blue',
    image: '/images/Card/customize_pouch.png',
    imageAlt: 'Custom printed pouches',
    serviceSlug: 'customize-pouch-designing-printing',
  },
  {
    id: 'bopp-bag',
    name: 'BOPP Bag',
    line: 'Glossy printed bags for retail and food packs.',
    accent: 'yellow',
  },
  {
    id: 'corrugated-box',
    name: 'Corrugated Box',
    line: 'Strong shipping cartons printed with your brand.',
    accent: 'red',
  },
  {
    id: 'rigid-box',
    name: 'Rigid Box',
    line: 'Magnetic and lift-off lid boxes for gifting.',
    accent: 'red',
    image: '/images/Card/cosmetic_item.png',
    imageAlt: 'Premium rigid gift and cosmetic boxes',
    serviceSlug: 'cosmetic-item-box-sticker-printing',
  },
  {
    id: 'acrylic-board',
    name: 'Acrylic Board',
    line: 'Name plates, signage and display boards.',
    accent: 'green',
  },
  {
    id: 'flex-banner',
    name: 'Flex Banner',
    line: 'Weather-ready banners and roller standees.',
    accent: 'green',
    image: '/images/Card/flex_banner.png',
    imageAlt: 'Printed flex banners and roller standees',
    serviceSlug: 'flex-banner-roller-standee-printing',
  },
];

export interface ProductIndexLink {
  href: string;
  isExternal: boolean;
}

/** Service page when one exists, otherwise a pre-filled WhatsApp quote. */
export function getProductIndexLink(product: IndexedProduct): ProductIndexLink {
  if (product.serviceSlug) {
    return { href: getServiceHref(product.serviceSlug), isExternal: false };
  }
  return {
    href: buildWhatsAppLink(`Hi Design N Print, I need a quote for ${product.name}.`),
    isExternal: true,
  };
}
