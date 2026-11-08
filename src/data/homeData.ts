/** All editable copy + content for the home page lives here (no hardcoded data in JSX). */

export type BrandAccent = 'red' | 'yellow' | 'green' | 'blue';

/* ───────────── Hero scroll story (card → box) ───────────── */
export interface JourneyChapter {
  id: string;
  label: string;
  title: string;
  body: string;
  /** progress (0–1) at which this chapter starts */
  start: number;
}

export const journeyChapters: JourneyChapter[] = [
  {
    id: 'card',
    label: 'The Card',
    title: 'Print that you can feel.',
    body: 'From visiting cards to luxury packaging — designed and printed under one roof in Ahmedabad.',
    start: 0,
  },
  {
    id: 'sheet',
    label: 'The Sheet',
    title: 'Every box starts as a flat sheet.',
    body: 'One die-cut sheet, printed in four colours. Keep scrolling and watch it come alive.',
    start: 0.14,
  },
  {
    id: 'fold',
    label: 'The Fold',
    title: 'Creased. Folded. Locked in.',
    body: 'Crease lines, die-cutting and folding — checked by hand at every step of the process.',
    start: 0.42,
  },
  {
    id: 'close',
    label: 'The Close',
    title: 'Closed, tucked and ready.',
    body: 'Rigid strength, crisp edges and a finish that makes your product feel premium.',
    start: 0.62,
  },
  {
    id: 'brand',
    label: 'Your Brand',
    title: 'Your brand. Our press.',
    body: 'Cards, boxes, files, pouches, banners — whatever you need printed, we make it look this good.',
    start: 0.8,
  },
];

/* ───────────── Product showcase (3D ring) ───────────── */
export interface ShowcaseProduct {
  id: string;
  name: string;
  category: string;
  blurb: string;
  image: string;
  href: string;
  accent: BrandAccent;
}

export const showcaseProducts: ShowcaseProduct[] = [
  {
    id: 'stationery',
    name: 'Visiting Cards, Letterheads & Envelopes',
    category: 'Stationery',
    blurb: 'Your first impression, in premium stock with crisp finishing.',
    image: '/images/Card/design-n-print-product-12-1.png',
    href: '/services/visiting-card-letterhead-envelope',
    accent: 'red',
  },
  {
    id: 'rigid-box',
    name: 'Box Designing & Printing',
    category: 'Packaging',
    blurb: 'Rigid, folding and luxury boxes made to show your brand off.',
    image: '/images/Card/box_designing.png',
    href: '/services/box-designing-printing',
    accent: 'blue',
  },
  {
    id: 'pharma',
    name: 'Pharmaceutical & Medicine Boxes',
    category: 'Packaging',
    blurb: 'Clean, compliant cartons with barcode-sharp printing.',
    image: '/images/Card/pharma_box.jpg',
    href: '/services/pharmaceutical-medicine-boxes',
    accent: 'blue',
  },
  {
    id: 'cosmetic',
    name: 'Cosmetic Boxes & Stickers',
    category: 'Packaging',
    blurb: 'Beauty packaging with foil, spot UV and soft-touch finishes.',
    image: '/images/Card/cosmetic_item.png',
    href: '/services/cosmetic-item-box-sticker-printing',
    accent: 'red',
  },
  {
    id: 'brochure',
    name: 'Brochure Designing & Printing',
    category: 'Marketing',
    blurb: 'Brochures that tell your story and close the sale.',
    image: '/images/Card/BrochureDesigning.png',
    href: '/services/brochure-designing-printing',
    accent: 'yellow',
  },
  {
    id: 'catalogue',
    name: 'Product Catalogue',
    category: 'Marketing',
    blurb: 'Multi-page catalogues, bound beautifully.',
    image: '/images/Card/product_catalogue.jpg',
    href: '/services/product-catalogue',
    accent: 'yellow',
  },
  {
    id: 'folder',
    name: 'Company File Folders',
    category: 'Folders',
    blurb: 'Presentation folders that carry your brand into every meeting.',
    image: '/images/Card/company_file_folder.jpg',
    href: '/services/company-file-folder',
    accent: 'green',
  },
  {
    id: 'ceramic',
    name: 'Ceramic & Tile Display Folders',
    category: 'Folders',
    blurb: 'Heavy-duty sample folders built for tile and mica collections.',
    image: '/images/Card/ceramic_mockup.png',
    href: '/services/ceramic-mockup-design',
    accent: 'green',
  },
  {
    id: 'pouch',
    name: 'Custom Pouches',
    category: 'Pouches',
    blurb: 'Branded pouches and bags for retail and gifting.',
    image: '/images/Card/customize_pouch.png',
    href: '/services/customize-pouch-designing-printing',
    accent: 'blue',
  },
  {
    id: 'banner',
    name: 'Flex Banners & Roller Standees',
    category: 'Outdoor',
    blurb: 'Big, bold, weather-ready display printing.',
    image: '/images/Card/flex_banner.png',
    href: '/services/flex-banner-roller-standee-printing',
    accent: 'red',
  },
  {
    id: 'calendar',
    name: 'Calendars',
    category: 'Corporate Gifting',
    blurb: 'Desk and wall calendars your clients keep all year.',
    image: '/images/Card/calender.png',
    href: '/services/calendar',
    accent: 'yellow',
  },
  {
    id: 'sticker',
    name: 'Sticker & Label Printing',
    category: 'Labels',
    blurb: 'Die-cut stickers and product labels in any shape.',
    image: '/images/Card/sticker_label.png',
    href: '/services/sticker-label-designing-printing',
    accent: 'green',
  },
];

/* ───────────── Finishes lab ───────────── */
export type FinishId = 'velvet' | 'spotUv' | 'foil' | 'emboss';

export interface FinishOption {
  id: FinishId;
  name: string;
  tagline: string;
  description: string;
}

export const finishOptions: FinishOption[] = [
  {
    id: 'velvet',
    name: 'Soft-touch Velvet',
    tagline: 'Matte. Silky. Quiet luxury.',
    description: 'A velvet lamination that feels like suede and kills glare — the go-to for premium cards and boxes.',
  },
  {
    id: 'spotUv',
    name: 'Spot UV',
    tagline: 'Gloss exactly where you want it.',
    description: 'A raised, glossy coat on selected areas. Tilt the card and watch the pattern catch the light.',
  },
  {
    id: 'foil',
    name: 'Foil Stamping',
    tagline: 'Metallic shine that stops the hand.',
    description: 'Hot-foil stamping for logos and highlights that reflect like real metal.',
  },
  {
    id: 'emboss',
    name: 'Emboss & Deboss',
    tagline: 'Texture you can read with your fingers.',
    description: 'Raised or pressed-in artwork that adds depth, even without ink.',
  },
];

/* ───────────── Press process ───────────── */
export interface PressStep {
  id: string;
  number: string;
  title: string;
  body: string;
  /** progress (0–1) at which this step starts */
  start: number;
}

export const pressSteps: PressStep[] = [
  {
    id: 'design',
    number: '01',
    title: 'Design & proof',
    body: 'Our team prepares print-ready artwork and shares a proof before a single sheet is run.',
    start: 0,
  },
  {
    id: 'print',
    number: '02',
    title: 'Four-colour printing',
    body: 'Cyan, magenta (red), yellow and black are laid down one unit at a time, perfectly registered.',
    start: 0.18,
  },
  {
    id: 'finish',
    number: '03',
    title: 'Finish & cut',
    body: 'Lamination, foil, spot UV, die-cutting and folding bring the sheet to its final form.',
    start: 0.72,
  },
  {
    id: 'deliver',
    number: '04',
    title: 'Packed & dispatched',
    body: 'Quality-checked, packed and sent across Gujarat and India — express dispatch available.',
    start: 0.9,
  },
];

/* ───────────── Industries ───────────── */
export interface IndustryItem {
  id: string;
  name: string;
  line: string;
  image: string;
  imageAlt: string;
  href: string;
  accent: BrandAccent;
}

export const industries: IndustryItem[] = [
  {
    id: 'pharma',
    name: 'Pharma & Healthcare',
    line: 'Mono cartons, labels and doctor files that meet strict labelling standards.',
    image: '/images/Card/pharma_box.jpg',
    imageAlt: 'Printed pharmaceutical medicine boxes with capsules',
    href: '/services/pharmaceutical-medicine-boxes',
    accent: 'blue',
  },
  {
    id: 'ceramic',
    name: 'Ceramic & Tiles',
    line: 'Sturdy sample folders and catalogues for Morbi and Gujarat tile makers.',
    image: '/images/Card/ceramic_mockup.png',
    imageAlt: 'Ceramic tile display folder mockup',
    href: '/services/ceramic-mockup-design',
    accent: 'green',
  },
  {
    id: 'cosmetics',
    name: 'Cosmetics & Retail',
    line: 'Boxes, pouches and stickers that look premium on the shelf.',
    image: '/images/Card/cosmetic_item.png',
    imageAlt: 'Printed cosmetic boxes and stickers',
    href: '/services/cosmetic-item-box-sticker-printing',
    accent: 'red',
  },
  {
    id: 'corporate',
    name: 'Corporate & Real Estate',
    line: 'Brochures, catalogues, files and gifting calendars for every pitch.',
    image: '/images/Card/product_catalogue.jpg',
    imageAlt: 'Corporate product catalogue spread',
    href: '/services/product-catalogue',
    accent: 'yellow',
  },
];

/* ───────────── Proof ───────────── */
/**
 * NOTE: team / products / clients numbers were carried over from the previous
 * site — confirm them with the client. "Years" is calculated from foundedYear.
 */
export const proofStatCounts = {
  team: 30,
  products: 120,
  clients: 200,
} as const;

export interface CustomerReview {
  id: string;
  reviewerName: string;
  rating: number;
  text: string;
  time: string;
}

/**
 * PLACEHOLDER reviews carried over from the old site.
 * Replace with the client's real Google reviews before going live.
 */
export const customerReviews: CustomerReview[] = [
  {
    id: 'r1',
    reviewerName: 'Priya Sharma',
    rating: 5,
    text: 'Excellent service! Their quality is top-notch and delivery is always on time. Highly recommend for all printing needs.',
    time: '2 days ago',
  },
  {
    id: 'r2',
    reviewerName: 'Rahul Patel',
    rating: 4,
    text: 'Good printing company. The staff is cooperative and the output quality is reliable. Overall very satisfied.',
    time: '1 week ago',
  },
  {
    id: 'r3',
    reviewerName: 'Sneha Gupta',
    rating: 5,
    text: 'Absolutely fantastic experience! From design to final product, everything was handled professionally.',
    time: '3 weeks ago',
  },
  {
    id: 'r4',
    reviewerName: 'Amit Singh',
    rating: 5,
    text: 'Our packaging boxes came out better than the sample. Great finishing and a team that listens.',
    time: '1 month ago',
  },
];

/* ───────────── Quote CTA ───────────── */
export const quoteProductChips: string[] = [
  'Visiting Cards',
  'Rigid Boxes',
  'Pharma Cartons',
  'Brochures & Catalogues',
  'File Folders',
  'Pouches',
  'Stickers & Labels',
  'Banners',
];
