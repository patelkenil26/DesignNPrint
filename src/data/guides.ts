/**
 * Buying guides — one genuinely useful page per question buyers search for.
 * Drives /guides, /guides/[slug], the sitemap, llms.txt and the home-page SEO copy.
 *
 * Copy stays factual trade knowledge. Do NOT add prices, minimum quantities, machinery or turnaround
 * promises here until the client confirms them (see docs/SEO.md).
 * NOTE: keep this file free of `@/` imports — scripts may read it directly.
 */

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  /** optional short list under the paragraphs */
  bullets?: string[];
}

export interface GuideFaq {
  id: string;
  question: string;
  answer: string;
}

export interface Guide {
  slug: string;
  /** H1 on the page */
  title: string;
  /** <title> tag — keyword first, brand last */
  metaTitle: string;
  /** meta description + intro paragraph */
  description: string;
  /** one-line summary shown on the guide cards */
  summary: string;
  eyebrow: string;
  readMinutes: number;
  datePublished: string;
  dateModified: string;
  /** slugs from `productCatalog` this guide leads to */
  productSlugs: string[];
  keywords: string[];
  /** answer-first paragraph — the one a search engine or AI assistant can quote */
  quickAnswer: string;
  sections: GuideSection[];
  faqs: GuideFaq[];
}

export const guides: Guide[] = [
  {
    slug: 'visiting-card-paper-gsm-guide',
    title: 'Visiting card paper and GSM guide: which card should you choose?',
    metaTitle: 'Visiting Card Paper & GSM Guide – Which Card to Choose | Design N Print',
    description:
      'Compare art card, matt, non-tearable, metallic and textured visiting cards, and learn which GSM feels premium. A plain-language guide from a printing press in Ahmedabad.',
    summary: 'Art card, matt, NT, metallic or textured — and how many GSM feels right in the hand.',
    eyebrow: 'Visiting cards',
    readMinutes: 4,
    datePublished: '2026-11-12',
    dateModified: '2026-11-12',
    productSlugs: ['visiting-card'],
    keywords: [
      'visiting card paper GSM',
      'which paper for visiting card',
      'best GSM for visiting card',
      'visiting card types Ahmedabad',
      'non tearable visiting card',
    ],
    quickAnswer:
      'For most businesses a 300–350 GSM art or matt card with lamination is the sweet spot: sturdy enough to feel professional, affordable in bulk. Choose non-tearable (NT) stock if the card will be handled a lot or exposed to water, and a textured or metallic stock when the card itself has to make an impression.',
    sections: [
      {
        heading: 'What GSM means for a visiting card',
        paragraphs: [
          'GSM is grams per square metre — the weight of the paper, and the quickest way to judge how thick and sturdy a card feels. A 130 GSM sheet is a flyer; a visiting card needs to hold its shape in a wallet or a pocket, so it starts much higher.',
          'Thin cards (below roughly 250 GSM) bend easily and feel cheap. Around 300–350 GSM feels firm without being bulky. Above that you are in luxury-card territory, where the thickness itself becomes part of the design.',
        ],
      },
      {
        heading: 'Card types and when to use each',
        paragraphs: ['The surface matters as much as the weight. These are the stocks we are asked about most:'],
        bullets: [
          'Art card — smooth, bright and the most budget-friendly; colours look vivid. Best for high volumes and everyday use.',
          'Art card with lamination — the same card with a gloss or matt film for protection and richer colour.',
          'Matt card — a soft, glare-free surface that reads as quietly premium; good for minimal designs.',
          'Matt + spot UV — a matt body with glossy UV on your logo or name so it catches the light.',
          'Non-tearable (NT) card — a plastic-feel, waterproof stock that cannot be torn; ideal for cards handled constantly.',
          'Silver metallic card — a mirror-like finish for brands that want to stand out.',
          'Textured paper card — tactile, handmade-feel stock for designers, boutiques and hospitality.',
        ],
      },
      {
        heading: 'How to choose without overthinking it',
        paragraphs: [
          'Start from where the card will live. A card handed over at trade shows, in a dusty workshop or in the monsoon wants lamination or NT stock. A card handed over in a quiet meeting can be matt or textured. If you are printing thousands for a sales team, an art card with lamination keeps cost per piece sensible.',
          'Finishes such as foil, embossing and rounded corners can be layered on any of these stocks. Ask for a physical sample if the feel is important — it is the one thing a screen cannot show.',
        ],
      },
    ],
    faqs: [
      {
        id: 'gsm-best',
        question: 'What GSM is best for a visiting card?',
        answer:
          'Most businesses pick 300–350 GSM. It is firm enough to feel professional and still economical. Go heavier only if you want a deliberately thick, luxury feel.',
      },
      {
        id: 'nt-card',
        question: 'What is a non-tearable (NT) visiting card?',
        answer:
          'A synthetic, plastic-feel stock that is waterproof and cannot be torn by hand. It lasts far longer than paper in wallets and pockets.',
      },
      {
        id: 'lamination',
        question: 'Should I laminate my visiting cards?',
        answer:
          'Lamination protects against scuffs and moisture and deepens colour. Gloss gives shine, matt gives a soft premium feel. It is optional on textured stocks, which are chosen for their natural surface.',
      },
    ],
  },
  {
    slug: 'print-ready-file-guide',
    title: 'How to prepare a print-ready file: bleed, CMYK and resolution',
    metaTitle: 'Print-Ready File Guide – Bleed, CMYK, 300 DPI | Design N Print',
    description:
      'A short checklist for sending artwork to a printing press: bleed, safe margin, CMYK colour mode, 300 DPI images, fonts and the right file formats.',
    summary: 'Bleed, CMYK, 300 DPI and fonts — the checklist that avoids reprints and delays.',
    eyebrow: 'Artwork',
    readMinutes: 3,
    datePublished: '2026-11-12',
    dateModified: '2026-11-12',
    productSlugs: ['visiting-card', 'brochure', 'sticker'],
    keywords: [
      'print ready file',
      'bleed in printing',
      'CMYK vs RGB for printing',
      'artwork guidelines printing Ahmedabad',
      '300 DPI printing',
    ],
    quickAnswer:
      'Send a PDF in CMYK colour mode, with 3 mm bleed on every side, images at 300 DPI at final size, text converted to curves or fonts embedded, and important text kept a few millimetres inside the trim line. CorelDRAW, Illustrator and layered PSD files are fine too.',
    sections: [
      {
        heading: 'Bleed and safe margin',
        paragraphs: [
          'Printed sheets are cut to size after printing, and no cutter is perfectly exact. Bleed is the extra 3 mm of background colour or image that runs past the trim line on every side, so there is never a thin white edge after cutting.',
          'The opposite rule applies to text and logos: keep them a few millimetres inside the trim line (the safe margin) so nothing important gets clipped.',
        ],
      },
      {
        heading: 'Colour: CMYK, not RGB',
        paragraphs: [
          'Screens mix light (RGB); presses mix ink (CMYK — cyan, magenta, yellow and black). Convert your artwork to CMYK before sending, otherwise very bright screen colours — neon greens, electric blues — will print duller than you expect.',
          'For brand colours that must match exactly, tell us the Pantone reference or send a printed sample.',
        ],
      },
      {
        heading: 'Images, fonts and file formats',
        paragraphs: ['A quick checklist before you send the file:'],
        bullets: [
          'Images at 300 DPI at the final printed size — a web image stretched to a poster will look soft.',
          'Convert text to curves/outlines, or embed fonts, so nothing changes when we open the file.',
          'Preferred formats: print-ready PDF, CorelDRAW (text converted to curves), Illustrator or layered PSD.',
          'Do not flatten a design to a low-resolution JPG or send a screenshot.',
          'Send the real dimensions of the final product, not just the artwork.',
        ],
      },
      {
        heading: 'No design yet?',
        paragraphs: [
          'You do not need a finished file to start. We can design from scratch, improve an existing design or print your finished artwork as it is — and you approve a digital proof before a single sheet is run.',
        ],
      },
    ],
    faqs: [
      {
        id: 'bleed-size',
        question: 'How much bleed do I need?',
        answer: '3 mm on every side is the standard. Extend background colours and images to this line.',
      },
      {
        id: 'low-res',
        question: 'Can I print a low-resolution image?',
        answer:
          'It will print, but it will look soft or pixelated. Use images at 300 DPI at the final size, or send the original high-resolution file and we will check it.',
      },
      {
        id: 'canva',
        question: 'Can I send a Canva design?',
        answer:
          'Yes — export it as a PDF for print with bleed enabled. Colours may shift slightly when converted from screen colour to CMYK, which is why we share a proof first.',
      },
    ],
  },
  {
    slug: 'mono-carton-vs-rigid-box-vs-corrugated-box',
    title: 'Mono carton vs rigid box vs corrugated box: which packaging fits your product?',
    metaTitle: 'Mono Carton vs Rigid Box vs Corrugated Box – How to Choose | Design N Print',
    description:
      'Folding mono cartons, premium rigid boxes and corrugated shipping boxes do different jobs. Here is how to pick the right packaging for your product, budget and shipping.',
    summary: 'Three box families, three jobs — retail shelf, premium gifting and safe shipping.',
    eyebrow: 'Packaging',
    readMinutes: 4,
    datePublished: '2026-11-12',
    dateModified: '2026-11-12',
    productSlugs: ['box', 'rigid-box', 'corrugated-box'],
    keywords: [
      'mono carton printing Ahmedabad',
      'rigid box vs mono carton',
      'corrugated box vs carton',
      'packaging box manufacturer Gujarat',
      'custom packaging boxes Ahmedabad',
    ],
    quickAnswer:
      'Use a mono (folding) carton for products sold on a shelf — cosmetics, food, medicines — a rigid box when the box itself is part of a premium or gifting experience, and a corrugated box to ship and protect goods in transit. Many brands use two together: a printed carton inside a corrugated shipper.',
    sections: [
      {
        heading: 'Mono (folding) cartons — the shelf box',
        paragraphs: [
          'A mono carton is printed on a single layer of paperboard, die-cut and folded flat. It is the standard pack for cosmetics, food, tablets, personal care and small consumer goods because it is light, prints beautifully and is economical at volume.',
          'It is the right choice when the box must sell the product on a retail shelf, carry regulatory and ingredient text, and be cheap enough to produce in thousands.',
        ],
      },
      {
        heading: 'Rigid boxes — the premium unboxing',
        paragraphs: [
          'A rigid box is built from thick board wrapped in printed or textured paper. It does not fold flat, it feels heavy and solid, and it is what you reach for when the pack is the gift — jewellery, premium gifting, corporate hampers, high-end electronics.',
          'Expect a higher cost per piece and a longer production time, so rigid boxes make sense where the packaging is part of the brand experience.',
        ],
      },
      {
        heading: 'Corrugated boxes — the shipping box',
        paragraphs: [
          'Corrugated board has a fluted layer between two liners, which gives it cushioning and stacking strength. These are the boxes that protect goods in warehouses, couriers and trucks. They can be printed with your brand, but their job is protection first.',
        ],
      },
      {
        heading: 'How to decide',
        paragraphs: ['Ask three questions:'],
        bullets: [
          'Where is it seen? Retail shelf → mono carton. Gift or unboxing → rigid box. Transit → corrugated.',
          'How many? Large volumes favour mono cartons; small premium runs suit rigid boxes.',
          'How is it shipped? Fragile or heavy goods almost always need a corrugated outer.',
        ],
      },
    ],
    faqs: [
      {
        id: 'carton-material',
        question: 'What is a mono carton made of?',
        answer:
          'A single layer of paperboard (often duplex or folding box board), printed, die-cut and creased so it folds flat for storage and is assembled when packing.',
      },
      {
        id: 'both',
        question: 'Can I use a carton and a corrugated box together?',
        answer:
          'Yes, and it is common: a printed mono carton holds the product on the shelf, and several cartons travel inside a corrugated shipper.',
      },
      {
        id: 'custom-size',
        question: 'Can you make boxes to a custom size?',
        answer:
          'Yes. Tell us the product dimensions and how it will be packed, and we will advise the style, board and finishing before we quote.',
      },
    ],
  },
  {
    slug: 'sticker-and-label-material-guide',
    title: 'Sticker and label materials: paper, PVC, vinyl and BOPP compared',
    metaTitle: 'Sticker & Label Material Guide – Paper vs PVC vs Vinyl | Design N Print',
    description:
      'Choosing the right sticker or bottle-label material: paper, PVC, vinyl, transparent and BOPP — which survive water, oil and the fridge, and which are best for a clean premium look.',
    summary: 'Paper, PVC, vinyl, transparent or BOPP — match the material to where the label lives.',
    eyebrow: 'Stickers & labels',
    readMinutes: 4,
    datePublished: '2026-11-12',
    dateModified: '2026-11-12',
    productSlugs: ['sticker', 'bottle-label'],
    keywords: [
      'sticker printing Ahmedabad',
      'label printing Ahmedabad',
      'waterproof sticker material',
      'bottle label printing',
      'PVC vs paper sticker',
    ],
    quickAnswer:
      'Pick paper stickers for dry, indoor, short-life uses such as packaging seals and boxes; PVC or vinyl for anything that meets water, oil, sunlight or handling; transparent film for a "no-label" look on glass and plastic; and BOPP for bottles and packs that sit in fridges, bathrooms or ice.',
    sections: [
      {
        heading: 'Start with where the sticker will live',
        paragraphs: [
          'The right material is decided by the environment, not the design. A beautiful label on the wrong material will curl, fade or peel within weeks. Think about moisture, oil, heat, sunlight, rubbing and how long it needs to last.',
        ],
      },
      {
        heading: 'The materials, compared',
        paragraphs: [],
        bullets: [
          'Paper — economical, takes colour beautifully and is easy to write on. Not for wet or oily conditions.',
          'PVC / vinyl — durable, water-resistant and tough; suited to products that are handled, washed or kept outdoors.',
          'Transparent film — lets the bottle or box show through, giving a clean, label-less look.',
          'BOPP — a plastic film that resists moisture, oil and condensation; the usual choice for bottle labels in cold or wet use.',
        ],
      },
      {
        heading: 'Shape, finish and cutting',
        paragraphs: [
          'Stickers can be cut to circles, rectangles or any custom die-cut outline, supplied on sheets or rolls. Lamination or varnish adds scratch resistance and a gloss or matt finish, and spot effects such as foil can make a logo stand out on pack.',
          'Tell us the surface it will stick to — glass, plastic, metal, corrugated board — since adhesive strength is chosen to match.',
        ],
      },
    ],
    faqs: [
      {
        id: 'waterproof',
        question: 'Which sticker material is waterproof?',
        answer:
          'PVC, vinyl and BOPP films are water-resistant; plain paper is not. For bottles that sit in fridges or get wet, choose BOPP or vinyl.',
      },
      {
        id: 'custom-shape',
        question: 'Can stickers be cut to any shape?',
        answer: 'Yes — circles, rectangles or a custom die-cut outline that follows your logo or product.',
      },
      {
        id: 'sheet-or-roll',
        question: 'Do you supply stickers on rolls?',
        answer:
          'Labels can be made as sheets or rolls depending on how you apply them — tell us your method and we will confirm the format with your quote.',
      },
    ],
  },
  {
    slug: 'offset-vs-digital-printing',
    title: 'Offset vs digital printing: which one is right for your job?',
    metaTitle: 'Offset vs Digital Printing – Which Is Right for Your Job? | Design N Print',
    description:
      'Offset printing gives the lowest cost per piece at volume and the best colour accuracy; digital suits short runs and personalisation. Learn how to choose, in plain language.',
    summary: 'Volume and colour accuracy favour offset; very short runs and variable data favour digital.',
    eyebrow: 'Printing basics',
    readMinutes: 3,
    datePublished: '2026-11-12',
    dateModified: '2026-11-12',
    productSlugs: ['brochure', 'pamphlet-flyer', 'book'],
    keywords: [
      'offset printing vs digital printing',
      'offset printing Ahmedabad',
      'what is offset printing',
      'digital printing Ahmedabad',
      'bulk printing Ahmedabad',
    ],
    quickAnswer:
      'Choose offset printing for medium and large quantities, exact brand colours and the widest choice of papers and finishes — the cost per piece falls as the run grows. Choose digital printing for very short runs, quick turnaround and personalised or variable-data jobs.',
    sections: [
      {
        heading: 'How offset printing works',
        paragraphs: [
          'Offset printing transfers ink from metal plates to a rubber blanket and then to paper. Plates take time to set up, but once the press runs, each extra sheet costs very little — which is why catalogues, brochures, packaging and large print runs are printed this way.',
          'It also gives the most accurate, consistent colour across a whole run, supports special inks such as Pantone, and prints on the widest range of papers and boards.',
        ],
      },
      {
        heading: 'Where digital printing wins',
        paragraphs: [
          'Digital printing skips plates, so there is almost no setup. It is the better answer when you need a handful of copies, a quick turnaround, or each piece to be different — names on invitations, numbering, personalised mailers.',
        ],
      },
      {
        heading: 'A simple rule of thumb',
        paragraphs: [],
        bullets: [
          'Hundreds to thousands of identical pieces, with brand colours that must match → offset.',
          'A few copies, urgent, or every piece unique → digital.',
          'Packaging, cartons and anything with special finishes such as foil or spot UV → offset-based workflows.',
        ],
      },
      {
        heading: 'Not sure? Ask for both quotes',
        paragraphs: [
          'The crossover point depends on the size, paper and finishing. Share the product and quantity and we will recommend the method that gives you the best result for the budget.',
        ],
      },
    ],
    faqs: [
      {
        id: 'cheaper',
        question: 'Is offset printing cheaper than digital?',
        answer:
          'For larger quantities, yes — the setup cost is spread across many pieces, so the cost per piece drops. For very small runs, digital is usually cheaper.',
      },
      {
        id: 'colour-match',
        question: 'Which method matches brand colours better?',
        answer: 'Offset, especially with Pantone inks, gives the most accurate and repeatable colour.',
      },
    ],
  },
  {
    slug: 'brochure-fold-types-guide',
    title: 'Brochure fold types: bi-fold, tri-fold, gate-fold and Z-fold explained',
    metaTitle: 'Brochure Fold Types – Bi-fold, Tri-fold, Gate-fold, Z-fold | Design N Print',
    description:
      'Not sure which brochure fold to pick? See how bi-fold, tri-fold, gate-fold and Z-fold brochures read, what each suits, and how paper and finishes change the result.',
    summary: 'Two, three or four panels — how each fold shapes the way your story is read.',
    eyebrow: 'Brochures',
    readMinutes: 3,
    datePublished: '2026-11-12',
    dateModified: '2026-11-12',
    productSlugs: ['brochure', 'pamphlet-flyer'],
    keywords: [
      'brochure fold types',
      'tri fold vs bi fold brochure',
      'gate fold brochure',
      'brochure printing Ahmedabad',
      'company brochure printing Gujarat',
    ],
    quickAnswer:
      'Pick a bi-fold for a simple, quick-to-read brochure; a tri-fold when you want to guide the reader step by step through services or pricing; a gate-fold for a dramatic centre spread that showcases one hero product; and a Z-fold for a story that unfolds in sequence.',
    sections: [
      {
        heading: 'Bi-fold brochure',
        paragraphs: [
          'One fold, two panels (four pages). It is the cleanest layout: a strong cover, a spread inside and a back. Best for a company profile, a menu or a short product introduction.',
        ],
      },
      {
        heading: 'Tri-fold brochure',
        paragraphs: [
          'Two folds, three panels per side. The panels are read one at a time, which makes the tri-fold ideal for a guided narrative — who we are, what we do, how to contact us. It also fits a standard envelope or display rack.',
        ],
      },
      {
        heading: 'Gate-fold brochure',
        paragraphs: [
          'Two outer panels open like doors to reveal a wide centre spread. The reveal creates drama, so gate-folds suit launches, premium services and one big hero image.',
        ],
      },
      {
        heading: 'Z-fold brochure',
        paragraphs: [
          'Zig-zag folds open like an accordion and can be viewed as one long strip. Good for timelines, step-by-step processes and map-style layouts.',
        ],
      },
      {
        heading: 'Paper and finish matter as much as the fold',
        paragraphs: [
          'Heavier paper makes folds crisper and the brochure feel more substantial; paper is normally scored before folding so the fold lines do not crack. Gloss or matt lamination protects the surface, and spot UV can highlight a logo or a headline.',
        ],
      },
    ],
    faqs: [
      {
        id: 'fold-choice',
        question: 'Which brochure fold is best for a company profile?',
        answer:
          'A tri-fold is the most popular for company profiles because it guides the reader through a clear sequence. A bi-fold works well for shorter, simpler messages.',
      },
      {
        id: 'brochure-paper',
        question: 'What paper should I use for a brochure?',
        answer:
          'Most brochures use a coated art paper in a medium-to-heavy GSM. Heavier stock feels more premium and folds cleanly; we recommend the paper once we know the fold and quantity.',
      },
    ],
  },
];

export function findGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function getGuideHref(slug: string): string {
  return `/guides/${slug}`;
}

/** Guides that lead to a given product — shown on product pages as "related guide". */
export function getGuidesForProduct(productSlug: string): Guide[] {
  return guides.filter((guide) => guide.productSlugs.includes(productSlug));
}
