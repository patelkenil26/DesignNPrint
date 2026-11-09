/**
 * Old URL → new product page. Used by next.config.ts so links shared before the
 * 17-product redesign (Google, WhatsApp, print material) keep working.
 * NOTE: keep this file free of `@/` imports — next.config.ts imports it directly.
 */
export interface LegacyRedirect {
  source: string;
  destination: string;
}

const legacyServices: Array<[category: string, service: string, destination: string]> = [
  ['cards-and-stationery', 'visiting-card-letterhead-envelope', '/services/visiting-card'],
  ['cards-and-stationery', 'digital-visiting-card', '/services/visiting-card#digital-visiting-card'],
  ['cards-and-stationery', 'certificate', '/services/letterhead#appreciation-certificate'],
  ['brochures-and-flyers', 'brochure-designing-printing', '/services/brochure'],
  ['brochures-and-flyers', 'pamphlet-design-printing', '/services/pamphlet-flyer'],
  ['brochures-and-flyers', 'booklet-designing-printing', '/services/book'],
  ['brochures-and-flyers', 'product-catalogue', '/services/book#product-catalogue'],
  ['brochures-and-flyers', 'calendar', '/services/book#wall-calendar'],
  ['boxes-and-packaging', 'box-designing-printing', '/services/box'],
  ['boxes-and-packaging', 'pharmaceutical-medicine-boxes', '/services/box#tablet-box'],
  ['boxes-and-packaging', 'cosmetic-item-box-sticker-printing', '/services/box#cosmetic-box'],
  ['boxes-and-packaging', 'pesticide-label-and-box', '/services/bottle-label#pesticide-agro-label'],
  ['stickers-and-labels', 'sticker-label-designing-printing', '/services/sticker'],
  ['files-and-folders', 'company-file-folder', '/services/file'],
  ['files-and-folders', 'doctor-file', '/services/file#doctor-file'],
  ['files-and-folders', 'laminates-mica-folder-designing-printing', '/services/file#mica-laminate-sample-folder'],
  ['files-and-folders', 'ceramic-mockup-design', '/services/file#ceramic-tile-display-folder'],
  ['pouches-and-display', 'cotton-pouch-designing-printing', '/services/pouch#drawstring-cotton-pouch'],
  ['pouches-and-display', 'customize-pouch-designing-printing', '/services/pouch'],
  ['pouches-and-display', 'flex-banner-roller-standee-printing', '/services/flex-banner'],
];

/** The six old category pages now land on their closest product. */
const legacyCategories: Array<[category: string, destination: string]> = [
  ['stickers-and-labels', '/services/sticker'],
  ['cards-and-stationery', '/services/visiting-card'],
  ['brochures-and-flyers', '/services/brochure'],
  ['boxes-and-packaging', '/services/box'],
  ['files-and-folders', '/services/file'],
  ['pouches-and-display', '/services/pouch'],
];

export const legacyRedirects: LegacyRedirect[] = [
  ...legacyServices.map(([category, service, destination]) => ({
    source: `/services/${category}/${service}`,
    destination,
  })),
  ...legacyCategories.map(([category, destination]) => ({ source: `/services/${category}`, destination })),
  { source: '/services/all', destination: '/services' },
];

/** Old category slug → closest product slug (used by the home "category stories" links). */
export const legacyCategoryToProduct: Record<string, string> = Object.fromEntries(
  legacyCategories.map(([category, destination]) => [category, destination.replace('/services/', '')]),
);
