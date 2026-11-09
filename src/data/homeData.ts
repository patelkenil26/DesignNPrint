import { getServiceHref } from '@/data/serviceCatalog';

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
    body: 'Visiting cards to luxury packaging — designed and printed under one roof in Naroda, Ahmedabad.',
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
    body: '17 products, one studio. Send us the idea or the finished artwork — we take it all the way to print.',
    start: 0.8,
  },
];

/* ───────────── Most-requested ring (8 bestsellers — the full range lives in productIndex.ts) ───────────── */
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
    href: getServiceHref('visiting-card-letterhead-envelope'),
    accent: 'red',
  },
  {
    id: 'rigid-box',
    name: 'Box Designing & Printing',
    category: 'Packaging',
    blurb: 'Rigid, folding and luxury boxes made to show your brand off.',
    image: '/images/Card/box_designing.png',
    href: getServiceHref('box-designing-printing'),
    accent: 'blue',
  },
  {
    id: 'pharma',
    name: 'Pharmaceutical & Medicine Boxes',
    category: 'Packaging',
    blurb: 'Clean, compliant cartons with barcode-sharp printing.',
    image: '/images/Card/pharma_box.jpg',
    href: getServiceHref('pharmaceutical-medicine-boxes'),
    accent: 'blue',
  },
  {
    id: 'brochure',
    name: 'Brochure Designing & Printing',
    category: 'Marketing',
    blurb: 'Brochures that tell your story and close the sale.',
    image: '/images/Card/BrochureDesigning.png',
    href: getServiceHref('brochure-designing-printing'),
    accent: 'yellow',
  },
  {
    id: 'folder',
    name: 'Company File Folders',
    category: 'Folders',
    blurb: 'Presentation folders that carry your brand into every meeting.',
    image: '/images/Card/company_file_folder.jpg',
    href: getServiceHref('company-file-folder'),
    accent: 'green',
  },
  {
    id: 'pouch',
    name: 'Custom Pouches',
    category: 'Pouches',
    blurb: 'Branded pouches and bags for retail and gifting.',
    image: '/images/Card/customize_pouch.png',
    href: getServiceHref('customize-pouch-designing-printing'),
    accent: 'blue',
  },
  {
    id: 'banner',
    name: 'Flex Banners & Roller Standees',
    category: 'Outdoor',
    blurb: 'Big, bold, weather-ready display printing.',
    image: '/images/Card/flex_banner.png',
    href: getServiceHref('flex-banner-roller-standee-printing'),
    accent: 'red',
  },
  {
    id: 'sticker',
    name: 'Sticker & Label Printing',
    category: 'Labels',
    blurb: 'Die-cut stickers and product labels in any shape.',
    image: '/images/Card/sticker_label.png',
    href: getServiceHref('sticker-label-designing-printing'),
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
export type IndustryIconName = 'pharma' | 'ceramic' | 'cosmetics' | 'agro' | 'corporate' | 'events';

export interface IndustryItem {
  id: string;
  name: string;
  line: string;
  /** what we typically print for them */
  products: string[];
  icon: IndustryIconName;
  href: string;
  accent: BrandAccent;
}

export const industries: IndustryItem[] = [
  {
    id: 'pharma',
    name: 'Pharma & Healthcare',
    line: 'Mono cartons, labels and doctor files that meet strict labelling standards.',
    products: ['Mono cartons', 'Strip & bottle labels', 'Doctor files'],
    icon: 'pharma',
    href: getServiceHref('pharmaceutical-medicine-boxes'),
    accent: 'blue',
  },
  {
    id: 'ceramic',
    name: 'Ceramic & Tiles',
    line: 'Sturdy sample folders and catalogues for Morbi and Gujarat tile makers.',
    products: ['Tile display folders', 'Product catalogues', 'Box packaging'],
    icon: 'ceramic',
    href: getServiceHref('ceramic-mockup-design'),
    accent: 'green',
  },
  {
    id: 'cosmetics',
    name: 'Cosmetics & Retail',
    line: 'Boxes, pouches and stickers that look premium on the shelf.',
    products: ['Foil & spot UV boxes', 'Pouches & BOPP bags', 'Stickers'],
    icon: 'cosmetics',
    href: getServiceHref('cosmetic-item-box-sticker-printing'),
    accent: 'red',
  },
  {
    id: 'agro',
    name: 'Agro & Pesticide',
    line: 'Durable, clearly labelled cartons and labels for agro products.',
    products: ['Pesticide labels', 'Cartons', 'Corrugated boxes'],
    icon: 'agro',
    href: getServiceHref('pesticide-label-and-box'),
    accent: 'green',
  },
  {
    id: 'corporate',
    name: 'Corporate & Real Estate',
    line: 'Brochures, catalogues, files and gifting calendars for every pitch.',
    products: ['Brochures', 'Company files', 'Calendars'],
    icon: 'corporate',
    href: getServiceHref('product-catalogue'),
    accent: 'yellow',
  },
  {
    id: 'events',
    name: 'Events & Promotions',
    line: 'Big, bold display printing that is ready before the doors open.',
    products: ['Flex banners', 'Roller standees', 'Acrylic boards'],
    icon: 'events',
    href: getServiceHref('flex-banner-roller-standee-printing'),
    accent: 'red',
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
  'Brochures & Flyers',
  'Stickers & Labels',
  'Boxes & Packaging',
  'Files & Folders',
  'Bill Books',
  'Pouches & Bags',
  'Banners & Boards',
];

/* ───────────── Trust strip (right under the hero) ───────────── */
export type TrustIconName = 'design' | 'proof' | 'express' | 'delivery' | 'location';

export interface TrustPoint {
  id: string;
  icon: TrustIconName;
  title: string;
  detail: string;
}

export const trustPoints: TrustPoint[] = [
  { id: 'design', icon: 'design', title: 'Design + print', detail: 'One studio, no hand-offs' },
  { id: 'proof', icon: 'proof', title: 'Digital proof first', detail: 'You approve before we print' },
  { id: 'express', icon: 'express', title: 'Express dispatch', detail: '24–48 hrs on selected jobs' },
  { id: 'delivery', icon: 'delivery', title: 'Gujarat & India', detail: 'Packed and shipped to you' },
  { id: 'location', icon: 'location', title: 'Naroda GIDC', detail: 'Visit our Ahmedabad press' },
];

/* ───────────── "Two ways to start" ───────────── */
export interface StartPath {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  steps: string[];
  ctaLabel: string;
  whatsappMessage: string;
}

export const startPaths: StartPath[] = [
  {
    id: 'have-design',
    eyebrow: 'Path 01',
    title: 'I have a design',
    body: 'Send print-ready artwork or a rough file. We check size, bleed and colours, then send a proof.',
    steps: ['Send your file', 'Get a digital proof', 'Approve & we print'],
    ctaLabel: 'Send my artwork',
    whatsappMessage: 'Hi Design N Print, I have my design ready and would like a print quote.',
  },
  {
    id: 'need-design',
    eyebrow: 'Path 02',
    title: 'I need a design',
    body: 'Tell us about your brand. Our designers create it from scratch — or refresh what you already have.',
    steps: ['Share your brief', 'Review the design', 'Approve & we print'],
    ctaLabel: 'Talk to a designer',
    whatsappMessage: 'Hi Design N Print, I need help designing my print material. Can I talk to a designer?',
  },
];

/* ───────────── FAQ ───────────── */
/** NOTE: answers are written from the site copy — confirm turnaround / MOQ wording with the client. */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const homeFaqs: FaqItem[] = [
  {
    id: 'design-too',
    question: 'Do you design as well as print?',
    answer:
      'Yes. Our team can design from scratch, improve an existing design, or print your finished artwork as it is — all under one roof in Ahmedabad.',
  },
  {
    id: 'proof',
    question: 'Will I see a proof before printing?',
    answer: 'Always. We share a digital proof for your approval before a single sheet is run.',
  },
  {
    id: 'quote',
    question: 'How do I get a price?',
    answer:
      'Message us on WhatsApp with the product, size, quantity and finish you have in mind. Price depends on quantity, paper GSM, size and finishing, and we reply with a clear quote.',
  },
  {
    id: 'turnaround',
    question: 'How fast can I get my order?',
    answer:
      'Express dispatch in 24–48 hrs is available on selected products. Larger jobs such as rigid boxes and catalogues take longer — we confirm the timeline with your quote.',
  },
  {
    id: 'moq',
    question: 'Is there a minimum order quantity?',
    answer: 'It depends on the product and finish. Tell us what you need and we will share the minimum with your quote.',
  },
  {
    id: 'delivery',
    question: 'Do you deliver outside Ahmedabad?',
    answer: 'Yes — we dispatch across Gujarat and India. You can also visit our press at Naroda GIDC.',
  },
];
