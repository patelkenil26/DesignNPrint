import { getProductHref } from '@/data/productCatalog';

/** All editable copy + content for the home page lives here (no hardcoded data in JSX). */

export type BrandAccent = 'red' | 'yellow' | 'green' | 'blue';

/* ───────────── Hero (print-drop collage) ───────────── */
export const heroCopy = {
  title: 'Print that you can feel.',
  body: 'Visiting cards to luxury packaging — designed and printed under one roof in Naroda, Ahmedabad.',
};

/** The proofs that "print in" on the hero. Extras and brand art only — every product has its own place further down. */
export interface HeroProofLayout {
  id: string;
  image: string;
  alt: string;
  /** small tag under the proof */
  label: string;
  /** CSS position + width of the proof inside the hero stage (percentages) */
  className: string;
  /** Tailwind aspect-ratio class of the frame */
  aspectClass: string;
  /** resting tilt in degrees */
  rotate: number;
  /** parallax strength in px — bigger = feels closer to the viewer */
  depth: number;
  /** seconds before this proof prints in */
  delay: number;
}

export const heroProofs: HeroProofLayout[] = [
  {
    id: 'invitation',
    image: '/images/home/invitation.jpg',
    alt: 'Printed wedding invitation cards in saffron and white',
    label: 'Invitations',
    className: 'left-[0%] top-[0%] w-[42%] sm:top-[2%]',
    aspectClass: 'aspect-square',
    rotate: -5,
    depth: 16,
    delay: 0.25,
  },
  {
    id: 'brochure',
    image: '/images/products/brochure/cover.jpg',
    alt: 'Printed corporate brochure on a blue Design N Print page',
    label: 'Brochures',
    className: 'right-[0%] top-[3%] w-[40%] sm:top-[0%] sm:w-[40%]',
    aspectClass: 'aspect-square',
    rotate: 3,
    depth: 30,
    delay: 0.4,
  },
  {
    id: 'catalogue',
    image: '/images/products/book/cover.jpg',
    alt: 'Printed company catalogues on a green Design N Print page',
    label: 'Catalogues',
    className: 'left-[31%] top-[44%] w-[38%] sm:left-[26%] sm:top-[44%] sm:w-[38%]',
    aspectClass: 'aspect-square',
    rotate: 2,
    depth: 48,
    delay: 0.55,
  },
  {
    id: 'letterhead',
    image: '/images/products/letterhead/cover.jpg',
    alt: 'Printed letterheads on a yellow Design N Print page',
    label: 'Letterheads',
    className: 'right-[0%] top-[62%] w-[36%] sm:right-[2%] sm:top-[56%] sm:w-[36%]',
    aspectClass: 'aspect-square',
    rotate: -3,
    depth: 24,
    delay: 0.7,
  },
  {
    id: 'brand',
    image: '/images/home/brand-cover.jpg',
    alt: 'Design N Print yellow origami cover artwork',
    label: 'Design N Print',
    className: 'left-[0%] top-[70%] w-[30%] sm:top-[66%]',
    aspectClass: 'aspect-square',
    rotate: 5,
    depth: 38,
    delay: 0.85,
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
    href: getProductHref('box', 'Tablet Box'),
    accent: 'blue',
  },
  {
    id: 'ceramic',
    name: 'Ceramic & Tiles',
    line: 'Sturdy sample folders and catalogues for Morbi and Gujarat tile makers.',
    products: ['Tile display folders', 'Product catalogues', 'Box packaging'],
    icon: 'ceramic',
    href: getProductHref('file', 'Ceramic & Tile Display Folder'),
    accent: 'green',
  },
  {
    id: 'cosmetics',
    name: 'Cosmetics & Retail',
    line: 'Boxes, pouches and stickers that look premium on the shelf.',
    products: ['Foil & spot UV boxes', 'Pouches & BOPP bags', 'Stickers'],
    icon: 'cosmetics',
    href: getProductHref('box', 'Cosmetic Box'),
    accent: 'red',
  },
  {
    id: 'agro',
    name: 'Agro & Pesticide',
    line: 'Durable, clearly labelled cartons and labels for agro products.',
    products: ['Pesticide labels', 'Cartons', 'Corrugated boxes'],
    icon: 'agro',
    href: getProductHref('bottle-label', 'Pesticide & Agro Label'),
    accent: 'green',
  },
  {
    id: 'corporate',
    name: 'Corporate & Real Estate',
    line: 'Brochures, catalogues, files and gifting calendars for every pitch.',
    products: ['Brochures', 'Company files', 'Calendars'],
    icon: 'corporate',
    href: getProductHref('book', 'Product Catalogue'),
    accent: 'yellow',
  },
  {
    id: 'events',
    name: 'Events & Promotions',
    line: 'Big, bold display printing that is ready before the doors open.',
    products: ['Flex banners', 'Roller standees', 'Acrylic boards'],
    icon: 'events',
    href: getProductHref('flex-banner'),
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
export interface QuoteProduct {
  label: string;
  /** thumbnail shown on the tile; products without a photo yet get an icon tile instead */
  image?: string;
}

export interface QuoteCollagePiece {
  image: string;
  alt: string;
  /** position and width inside the collage box */
  className: string;
  rotate: number;
}

/** Printed pieces that fan out beside the closing quote call-to-action. */
export const quoteCollage: QuoteCollagePiece[] = [
  {
    image: '/images/home/invitation.jpg',
    alt: 'Printed wedding invitation cards in saffron and white',
    className: 'left-[2%] top-[4%] w-[52%]',
    rotate: -6,
  },
  {
    image: '/images/products/brochure/cover.jpg',
    alt: 'Printed corporate brochure on a blue Design N Print page',
    className: 'right-[0%] top-[22%] w-[52%] lg:top-[16%]',
    rotate: 5,
  },
  {
    image: '/images/products/book/cover.jpg',
    alt: 'Printed company catalogues on a green Design N Print page',
    className: 'left-[18%] top-[50%] w-[54%] lg:top-[46%]',
    rotate: -2,
  },
];

export const quoteProducts: QuoteProduct[] = [
  { label: 'Visiting Cards', image: '/images/products/visiting-card/cover.jpg' },
  { label: 'Brochures & Flyers', image: '/images/products/brochure/cover.jpg' },
  { label: 'Stickers & Labels', image: '/images/products/sticker/cover.jpg' },
  { label: 'Boxes & Packaging', image: '/images/products/box/cover.jpg' },
  { label: 'Files & Folders' },
  { label: 'Bill Books' },
  { label: 'Pouches & Bags', image: '/images/products/pouch/cover.jpg' },
  { label: 'Banners & Boards' },
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
  { id: 'location', icon: 'location', title: 'Ahmedabad', detail: 'Visit our press in person' },
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
    answer: 'Yes — we dispatch across Gujarat and India. You can also visit our press in Ahmedabad.',
  },
];

/* ───────────── Press gallery ("Fresh off the press") ───────────── */
export interface PressGalleryWork {
  /** product whose cover photo and link the card uses */
  slug: string;
  /** short line shown on the card */
  tag: string;
}

export const pressGalleryWorks: PressGalleryWork[] = [
  { slug: 'visiting-card', tag: 'First impressions, in your hand' },
  { slug: 'box', tag: 'Shelf-ready cartons' },
  { slug: 'brochure', tag: 'Photos and copy, edge to edge' },
  { slug: 'letterhead', tag: 'Crisp corporate stationery' },
  { slug: 'bottle-label', tag: 'Crisp, scannable small print' },
  { slug: 'pouch', tag: 'Ready to ship' },
  { slug: 'sticker', tag: 'Any shape, any surface' },
];

/* ───────────── Job ticket (how a job moves through the press) ───────────── */
export interface JobTicketLine {
  id: string;
  title: string;
  note: string;
  /** optional photo "stuck" next to the line */
  image?: string;
  imageAlt?: string;
}

export const jobTicketLines: JobTicketLine[] = [
  { id: 'brief', title: 'Brief received', note: 'Product, size, quantity and finish noted down.' },
  {
    id: 'design',
    title: 'Artwork ready',
    note: 'Designed here, or checked for bleed and colour.',
    image: '/images/products/letterhead/cover.jpg',
    imageAlt: 'Letterhead artwork prepared for print',
  },
  { id: 'proof', title: 'Digital proof approved', note: 'Nothing is printed until you say yes.' },
  {
    id: 'print',
    title: 'Four-colour printing',
    note: 'Cyan, magenta, yellow and black, perfectly registered.',
    image: '/images/products/box/cover.jpg',
    imageAlt: 'Printed cartons coming off the press',
  },
  {
    id: 'finish',
    title: 'Finished and cut',
    note: 'Lamination, foil, spot UV, die-cut and folding.',
    image: '/images/products/envelope/cover.jpg',
    imageAlt: 'Printed envelopes after finishing and cutting',
  },
  { id: 'check', title: 'Quality check', note: 'Checked by hand before it leaves the floor.' },
  {
    id: 'dispatch',
    title: 'Packed and dispatched',
    note: 'Across Gujarat and India — express on selected jobs.',
    image: '/images/products/pouch/cover.jpg',
    imageAlt: 'Printed pouches packed and ready to ship',
  },
];
