/**
 * The 17 products — single source of truth for /services, /services/[product], the navbar,
 * the footer, search and the home-page product index.
 *
 * Images are NOT listed here. Drop files in `public/images/products/<slug>/`:
 *   cover.jpg            → the product's cover (falls back to a graphic panel)
 *   <type-slug>.jpg      → one photo per type (falls back to a graphic panel)
 * Run `node scripts/image-manifest.mjs` to see exactly which files are still missing.
 *
 * NOTE: keep this file free of `@/` imports — scripts and next.config.ts read it directly.
 */

export type ProductAccent = 'red' | 'yellow' | 'green' | 'blue';

export interface ProductType {
  name: string;
  /** one short line shown on the type card */
  line: string;
}

export interface Product {
  slug: string;
  name: string;
  /** short punchy line used on cards and the hero */
  tagline: string;
  /** 1–2 sentences for the product page intro + meta description */
  intro: string;
  accent: ProductAccent;
  coverAlt: string;
  types: ProductType[];
  finishes: string[];
  /** true = copy written from trade knowledge, not from the old site — confirm with the client */
  needsConfirmation?: boolean;
}

export const productCatalog: Product[] = [
  {
    slug: 'visiting-card',
    name: 'Visiting Card',
    tagline: 'First impressions, in your hand.',
    intro:
      'Visiting cards in premium stock and finishes — from everyday art cards to non-tearable, metallic and digital NFC cards. Designed and printed under one roof in Ahmedabad.',
    accent: 'red',
    coverAlt: 'Premium printed visiting cards',
    types: [
      { name: 'Art Card', line: 'Smooth, bright and budget-friendly for everyday use.' },
      { name: 'Art Card with Lamination', line: 'Protected, richer colour with a gloss or matt feel.' },
      { name: 'Matt Card', line: 'Soft, glare-free surface with a quiet premium look.' },
      { name: 'Matt + UV Card', line: 'Matt body with glossy spot-UV on your logo or name.' },
      { name: 'Non-tearable (NT) Card', line: 'Waterproof, tear-proof and built to last in a wallet.' },
      { name: 'Silver Metallic Card', line: 'A mirror-like metallic finish that stops the hand.' },
      { name: 'Textured Paper Card', line: 'Special-finish papers with a tactile, handmade feel.' },
      { name: 'Digital Visiting Card', line: 'NFC and QR cards that share your details with a tap.' },
    ],
    finishes: ['Matt lamination', 'Gloss lamination', 'Spot UV', 'Gold foil', 'Embossing', 'Rounded corners'],
  },
  {
    slug: 'brochure',
    name: 'Brochure',
    tagline: 'Fold it open. Tell the story.',
    intro:
      'Brochures that showcase your business, services or products — bi-fold, tri-fold, gate-fold and Z-fold, with layouts that stay true to your brand.',
    accent: 'yellow',
    coverAlt: 'Printed company brochures',
    types: [
      { name: 'Bi-fold Brochure', line: 'Two panels — simple, clean and quick to read.' },
      { name: 'Tri-fold Brochure', line: 'Three panels that guide the reader step by step.' },
      { name: 'Gate-fold Brochure', line: 'Doors that open to reveal a big, dramatic centre spread.' },
      { name: 'Z-fold Brochure', line: 'Zig-zag folds that unfold like a story.' },
    ],
    finishes: ['Gloss lamination', 'Matt lamination', 'Spot UV', 'Aqueous coating'],
  },
  {
    slug: 'pamphlet-flyer',
    name: 'Pamphlet / Flyer',
    tagline: 'Loud on paper. Light on budget.',
    intro:
      'High-volume pamphlets and flyers in vibrant colour — single sheet, folded or custom-shaped — printed quickly for launches, offers and events.',
    accent: 'yellow',
    coverAlt: 'Printed pamphlets and flyers',
    types: [
      { name: 'Single-page Flyer', line: 'One sheet, one message — the fastest way to be seen.' },
      { name: 'Bi-fold Pamphlet', line: 'Two panels for a little more story.' },
      { name: 'Tri-fold Pamphlet', line: 'Pocket-sized, three-panel handout.' },
      { name: 'Z-fold Pamphlet', line: 'Zig-zag fold that opens in one smooth pull.' },
      { name: 'Custom-shaped Pamphlet', line: 'Die-cut to a shape that matches your brand.' },
    ],
    finishes: ['Gloss coating', 'Matt coating', 'Die-cutting'],
  },
  {
    slug: 'bottle-label',
    name: 'Bottle Label',
    tagline: 'Peel. Stick. Stand out.',
    intro:
      'Waterproof, scratch-resistant labels for bottles, jars, cans and agro products — printed sharp and cut to the exact shape of your pack.',
    accent: 'blue',
    coverAlt: 'Printed bottle label and carton designs',
    types: [
      { name: 'Waterproof Bottle Label', line: 'Stays crisp on chilled, wet or oily bottles.' },
      { name: 'Wrap-around Label', line: 'Full-wrap labels with room for all the details.' },
      { name: 'Jar & Can Label', line: 'Sized and cut for jars, tins and cans.' },
      { name: 'Transparent Label', line: 'A clear base for the “no-label” premium look.' },
      { name: 'Pesticide & Agro Label', line: 'Clear, durable labels with all the required text.' },
      { name: 'Die-cut Custom-shape Label', line: 'Any contour — cut precisely to your design.' },
    ],
    finishes: ['Matt lamination', 'Gloss lamination', 'Foil', 'Varnish'],
  },
  {
    slug: 'letterhead',
    name: 'Letterhead',
    tagline: 'Your brand, on every page you send.',
    intro:
      'Corporate letterheads and certificates on fine paper — the stationery that makes every letter, quotation and award feel official.',
    accent: 'red',
    coverAlt: 'Printed corporate letterhead',
    types: [
      { name: 'Corporate Letterhead', line: 'Clean, professional letterheads for everyday business.' },
      { name: 'Textured Paper Letterhead', line: 'Special-finish paper for a premium first page.' },
      { name: 'Appreciation Certificate', line: 'Recognise effort with an elegant, formal layout.' },
      { name: 'Achievement Award Certificate', line: 'For milestones, wins and top performers.' },
      { name: 'Training Completion Certificate', line: 'Branded certificates for courses and workshops.' },
      { name: 'School & College Certificate', line: 'Customised for institutions and events.' },
      { name: 'Stationery Set', line: 'Letterhead, envelope and card that match perfectly.' },
    ],
    finishes: ['Gold foil', 'Embossing', 'Textured paper', 'Spot UV'],
  },
  {
    slug: 'envelope',
    name: 'Envelope',
    tagline: 'Sealed with your name.',
    intro:
      'Branded envelopes in window and non-window styles, designed to match your letterhead and cards.',
    accent: 'red',
    coverAlt: 'Branded printed envelopes',
    types: [
      { name: 'Window Envelope', line: 'A clear window so the address shows through.' },
      { name: 'Non-window Envelope', line: 'Classic, fully printed and sealed.' },
      { name: 'Textured Paper Envelope', line: 'Premium paper with a tactile finish.' },
      { name: 'Document Envelope', line: 'Larger sizes for documents, files and proposals.' },
    ],
    finishes: ['Gold foil', 'Spot UV', 'Embossing'],
  },
  {
    slug: 'sticker',
    name: 'Sticker',
    tagline: 'Any shape. Any surface.',
    intro:
      'Die-cut, round and product stickers with strong adhesive — in waterproof vinyl, transparent or matt finishes.',
    accent: 'blue',
    coverAlt: 'Printed die-cut stickers and labels',
    types: [
      { name: 'Product Sticker', line: 'Retail-ready stickers for packs and boxes.' },
      { name: 'Branding Sticker', line: 'Your logo, everywhere it needs to be.' },
      { name: 'Barcode & QR Sticker', line: 'Sharp, scannable codes for stock and tracking.' },
      { name: 'Waterproof Vinyl Sticker', line: 'Scratch-resistant and ready for the outdoors.' },
      { name: 'Transparent Sticker', line: 'Clear base so only your artwork shows.' },
      { name: 'Matt Finish Sticker', line: 'Soft, glare-free surface with a premium look.' },
      { name: 'Die-cut Sticker', line: 'Hearts, stars, your logo — cut to any shape.' },
      { name: 'Round Sticker', line: 'Clean circular seals and promo stickers.' },
    ],
    finishes: ['Gloss lamination', 'Matt lamination', 'Die-cutting', 'Kiss-cutting'],
  },
  {
    slug: 'file',
    name: 'File',
    tagline: 'Your brand in every meeting.',
    intro:
      'Company files, doctor files, mica and ceramic display folders — sturdy, well-finished and built to carry your brand into every meeting.',
    accent: 'green',
    coverAlt: 'Branded company file folders',
    types: [
      { name: 'Corporate File Folder', line: 'Presentation folders with pockets and card slots.' },
      { name: 'Document Holder', line: 'A slim holder for proposals and paperwork.' },
      { name: 'Flap Folder with Slots', line: 'Flaps keep papers in, slots hold your card.' },
      { name: 'Clip & Spiral File', line: 'Clip or spiral bound for reports and records.' },
      { name: 'Doctor File', line: 'Patient, prescription and diagnostic-report files.' },
      { name: 'Mica & Laminate Sample Folder', line: 'Swatch and sample folders for laminate makers.' },
      { name: 'Ceramic & Tile Display Folder', line: 'Heavy-duty folders for tile and ceramic collections.' },
    ],
    finishes: ['Matt lamination', 'Spot UV', 'Gold foil', 'Embossing', 'Die-cut pockets'],
  },
  {
    slug: 'box',
    name: 'Box',
    tagline: 'Horizontal. Vertical. Yours.',
    intro:
      'Folding and tuck-end cartons in every shape — from pharma and cosmetic packaging to display and mailer boxes — printed with sharp detail.',
    accent: 'blue',
    coverAlt: 'Printed product boxes',
    types: [
      { name: 'Custom Product Box', line: 'Cartons cut and printed to your product.' },
      { name: 'Tablet Box', line: 'Clean mono-cartons with barcode-sharp printing.' },
      { name: 'Syrup Box', line: 'Tall cartons for bottles with clear labelling space.' },
      { name: 'Injection Box', line: 'Compact, secure cartons for vials and ampoules.' },
      { name: 'Capsule Box', line: 'Neat, tamper-evident capsule packaging.' },
      { name: 'Cosmetic Box', line: 'Foil, spot UV and soft-touch for beauty brands.' },
      { name: 'Perfume Box', line: 'Elegant boxes that match the scent inside.' },
      { name: 'Display Box', line: 'Counter-top boxes that sell the product for you.' },
      { name: 'Gift Box', line: 'Gifting packs with a premium unboxing feel.' },
      { name: 'Mailer Box', line: 'Tuck-in mailers built for e-commerce.' },
      { name: 'Agro & Pesticide Box', line: 'Durable, clearly labelled agro packaging.' },
    ],
    finishes: ['Matt lamination', 'Gloss lamination', 'Spot UV', 'Gold foil', 'Embossing', 'Window patching'],
  },
  {
    slug: 'book',
    name: 'Book',
    tagline: 'Pages that carry your story.',
    intro:
      'Booklets, catalogues and calendars — stitched or bound, on premium paper, with consistent branding on every page.',
    accent: 'yellow',
    coverAlt: 'Printed booklets stacked on a table',
    types: [
      { name: 'Company Profile Booklet', line: 'Your story, services and credentials in one book.' },
      { name: 'Product Catalogue', line: 'Multi-page catalogues, bound beautifully.' },
      { name: 'Training Manual', line: 'Clear, durable manuals for teams and trainees.' },
      { name: 'Event & Program Booklet', line: 'Agendas and programmes for events and conferences.' },
      { name: 'Educational Booklet', line: 'Study material and guides, neatly printed.' },
      { name: 'Promotional Booklet', line: 'Offers and launches in a keep-me format.' },
      { name: 'Wall Calendar', line: 'Brand impressions on the wall for a whole year.' },
      { name: 'Poster Calendar', line: 'One big sheet, twelve months, all yours.' },
      { name: 'Card Calendar', line: 'Wallet-size calendars for everyday giveaways.' },
      { name: 'Magnetic Calendar', line: 'Sticks to the fridge and stays in view.' },
    ],
    finishes: ['Staple binding', 'Spiral binding', 'Perfect binding', 'Gloss lamination', 'Matt lamination', 'UV finish'],
  },
  {
    slug: 'bill-book',
    name: 'Challan / Bill Book',
    tagline: 'Every invoice, in order.',
    intro:
      'Challan books, bill books and receipt books with your company details — numbered, perforated and carbonless options for everyday business.',
    accent: 'green',
    coverAlt: 'Printed challan and bill books',
    needsConfirmation: true,
    types: [
      { name: 'Challan Book', line: 'Delivery challans with your name, logo and details.' },
      { name: 'Bill / Invoice Book', line: 'Branded bill books for counters and field sales.' },
      { name: 'Cash Memo Book', line: 'Quick cash memos for retail and wholesale.' },
      { name: 'Receipt Book', line: 'Payment receipts with clear, numbered copies.' },
      { name: 'Duplicate (Carbonless) Book', line: 'Two copies, no carbon paper needed.' },
      { name: 'Triplicate Book', line: 'Three copies — customer, office and accounts.' },
      { name: 'Numbered & Perforated Book', line: 'Serial numbering and tear-off perforation.' },
    ],
    finishes: ['Serial numbering', 'Perforation', 'Pad binding', 'Hard cover'],
  },
  {
    slug: 'pouch',
    name: 'Pouch',
    tagline: 'Carry it. Gift it. Brand it.',
    intro:
      'Cotton and custom pouches in your size and finish — for retail, food, cosmetics, seeds and gifting.',
    accent: 'blue',
    coverAlt: 'Custom printed pouches',
    types: [
      { name: 'Stand-up Pouch', line: 'Stands on the shelf, seals to stay fresh.' },
      { name: 'Ziplock Pouch', line: 'Reseal again and again.' },
      { name: 'Window Pouch', line: 'A clear window shows the product inside.' },
      { name: 'Flat-bottom Pouch', line: 'Box-like stability with a big print area.' },
      { name: 'Kraft Paper Pouch', line: 'Natural, earthy look with a printed brand.' },
      { name: 'Drawstring Cotton Pouch', line: 'Reusable cotton with a soft draw-cord.' },
      { name: 'Zipper Cotton Pouch', line: 'Cotton pouches that zip shut.' },
      { name: 'Gift Pouch', line: 'Branded pouches for gifting and events.' },
      { name: 'Seed & Agro Pouch', line: 'Pouches for seeds, spices and agro products.' },
      { name: 'Branded Carry Bag', line: 'Reusable cotton bags that walk your brand around.' },
    ],
    finishes: ['Matt finish', 'Gloss finish', 'Metallic', 'Screen print'],
  },
  {
    slug: 'bopp-bag',
    name: 'BOPP Bag',
    tagline: 'Glossy. Clear. Shelf-ready.',
    intro:
      'Printed BOPP bags with a glossy, crystal-clear finish — for retail, garments, food and everyday packaging.',
    accent: 'yellow',
    coverAlt: 'Printed BOPP bags',
    needsConfirmation: true,
    types: [
      { name: 'Printed BOPP Bag', line: 'Your brand printed on a clear, glossy bag.' },
      { name: 'Self-adhesive BOPP Bag', line: 'Peel-and-seal strip for fast, tidy closing.' },
      { name: 'Zip-lock BOPP Bag', line: 'Resealable for repeat use.' },
      { name: 'Flap BOPP Bag', line: 'Tuck-in flap for a neat presentation.' },
      { name: 'Loop-handle BOPP Bag', line: 'Easy-carry bags for retail counters.' },
      { name: 'Garment & Retail Bag', line: 'Sized for clothing, accessories and gifts.' },
      { name: 'Food Packaging Bag', line: 'Clean, glossy bags for snacks and bakery.' },
    ],
    finishes: ['Gloss', 'Matt', 'Multi-colour printing', 'Custom sizes'],
  },
  {
    slug: 'corrugated-box',
    name: 'Corrugated Box',
    tagline: 'Built tough. Printed proud.',
    intro:
      'Strong corrugated cartons for shipping and storage — plain, printed or die-cut, in the ply and size your product needs.',
    accent: 'red',
    coverAlt: 'Printed corrugated boxes',
    needsConfirmation: true,
    types: [
      { name: '3-ply Corrugated Box', line: 'Light, economical cartons for everyday dispatch.' },
      { name: '5-ply Corrugated Box', line: 'Heavy-duty strength for fragile and heavy goods.' },
      { name: 'Printed Corrugated Box', line: 'Your logo and details on the outside.' },
      { name: 'E-commerce Mailer Box', line: 'Self-locking mailers for online orders.' },
      { name: 'Die-cut Corrugated Box', line: 'Custom shapes cut to hold your product snugly.' },
      { name: 'Shipping Carton', line: 'Standard export and transit cartons.' },
    ],
    finishes: ['Flexo printing', 'Offset-laminated', 'Die-cutting', 'Custom sizes'],
  },
  {
    slug: 'rigid-box',
    name: 'Rigid Box',
    tagline: 'Open it slowly.',
    intro:
      'Premium rigid boxes with magnetic and lift-off lids — made for gifting, cosmetics, jewellery and luxury unboxing.',
    accent: 'red',
    coverAlt: 'Premium rigid gift and cosmetic boxes',
    types: [
      { name: 'Magnetic Closure Box', line: 'Snaps shut with a satisfying magnetic click.' },
      { name: 'Lift-off Lid Box', line: 'Classic two-piece box with a clean lid.' },
      { name: 'Drawer Box', line: 'A sliding tray that reveals the product.' },
      { name: 'Book-style Box', line: 'Opens like a book with a hinged cover.' },
      { name: 'Shoulder-neck Box', line: 'A raised neck for a refined, layered look.' },
      { name: 'Gift Set Box', line: 'Compartments and inserts for sets and hampers.' },
    ],
    finishes: ['Soft-touch', 'Gold foil', 'Spot UV', 'Embossing', 'Velvet insert'],
  },
  {
    slug: 'acrylic-board',
    name: 'Acrylic Board',
    tagline: 'Clear, sharp, lasting.',
    intro:
      'Acrylic name plates, signage and display boards — cut, printed and finished for offices, shops and events.',
    accent: 'green',
    coverAlt: 'Acrylic signage and display boards',
    needsConfirmation: true,
    types: [
      { name: 'Name Plate', line: 'Desk and door name plates with a polished edge.' },
      { name: 'Office Signage', line: 'Reception, department and wayfinding boards.' },
      { name: 'Wall Logo Board', line: 'Your logo, mounted with a premium standoff look.' },
      { name: 'Table-top Display Stand', line: 'Stands for offers, menus and information.' },
      { name: 'Menu & Price Stand', line: 'Clean stands for counters and restaurants.' },
      { name: 'Directional Sign', line: 'Clear boards that guide people around.' },
    ],
    finishes: ['UV printing', 'Laser cutting', 'Standoff mounting', 'Polished edges'],
  },
  {
    slug: 'flex-banner',
    name: 'Flex Banner',
    tagline: 'Big. Bold. Weather-ready.',
    intro:
      'Large-format flex banners, roller standees and backdrops — high-resolution printing that is ready before the doors open.',
    accent: 'green',
    coverAlt: 'Printed flex banners and roller standees',
    types: [
      { name: 'Outdoor Flex Banner', line: 'Weather-resistant banners for hoardings and shopfronts.' },
      { name: 'Indoor Promotional Banner', line: 'Sharp indoor banners for stores and offices.' },
      { name: 'Roll-up Standee', line: 'Portable standees that set up in seconds.' },
      { name: 'Backdrop Banner', line: 'Stage and photo backdrops for events.' },
      { name: 'Event Signage', line: 'Directional and promotional signs for events.' },
    ],
    finishes: ['Eyelets', 'Pocket stitching', 'Matt flex', 'Glossy flex'],
  },
];

/* ───────────── helpers ───────────── */

export function slugifyTypeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function findProduct(slug: string): Product | undefined {
  return productCatalog.find((product) => product.slug === slug);
}

/** `/services/<product>` — optionally jumping straight to one type card. */
export function getProductHref(slug: string, typeName?: string): string {
  return typeName ? `/services/${slug}#${slugifyTypeName(typeName)}` : `/services/${slug}`;
}

export function getProductNumber(slug: string): number {
  return productCatalog.findIndex((product) => product.slug === slug) + 1;
}

export function getAdjacentProducts(slug: string): { previous: Product; next: Product } {
  const index = productCatalog.findIndex((product) => product.slug === slug);
  const total = productCatalog.length;
  return {
    previous: productCatalog[(index - 1 + total) % total],
    next: productCatalog[(index + 1) % total],
  };
}

export const totalTypeCount = productCatalog.reduce((sum, product) => sum + product.types.length, 0);

export interface ProductFaq {
  id: string;
  question: string;
  answer: string;
}

/** Same trustworthy answers on every product page, with the product name filled in. */
export function buildProductFaqs(product: Product): ProductFaq[] {
  const name = product.name;
  return [
    {
      id: 'proof',
      question: `Can I see a proof of my ${name.toLowerCase()} before printing?`,
      answer: 'Yes. We share a digital proof for your approval before a single sheet is run.',
    },
    {
      id: 'price',
      question: `How do I get a price for ${name.toLowerCase()}?`,
      answer: `Message us on WhatsApp with the type, size, quantity and finish you want. Price depends on quantity, paper or material, size and finishing — we reply with a clear quote.`,
    },
    {
      id: 'design',
      question: `Do you design ${name.toLowerCase()} as well as print it?`,
      answer:
        'Yes. We can design from scratch, improve your existing artwork, or print your finished design exactly as it is.',
    },
    {
      id: 'turnaround',
      question: 'How fast can I get my order?',
      answer:
        'Express dispatch in 24–48 hrs is available on selected jobs. Larger or specialised orders take longer — we confirm the timeline with your quote.',
    },
    {
      id: 'delivery',
      question: 'Do you deliver outside Ahmedabad?',
      answer: 'Yes — we dispatch across Gujarat and India. You can also visit our press at Naroda GIDC.',
    },
  ];
}

/** What moves the price on every product — shown on each product page (no invented numbers). */
export interface PriceDriver {
  id: string;
  title: string;
  detail: string;
}

export const priceDrivers: PriceDriver[] = [
  { id: 'quantity', title: 'Quantity', detail: 'Bigger runs bring the cost per piece down.' },
  { id: 'material', title: 'Paper & material', detail: 'GSM, board or film — the base your design sits on.' },
  { id: 'size', title: 'Size & shape', detail: 'Standard sizes cost less than custom or die-cut shapes.' },
  { id: 'finishing', title: 'Finishing', detail: 'Lamination, foil, spot UV and embossing add polish.' },
];
