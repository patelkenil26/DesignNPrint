/**
 * Typical sizes and materials for every product — shown in the "Where can I get … printed in Ahmedabad?"
 * summary on each product page. Keyed by product slug (see `productCatalog`).
 *
 * NOTE: written from general trade knowledge (common Indian stationery and packaging sizes); confirm the
 * exact ranges with the press before treating them as a price list. Keep this file free of `@/` imports.
 */
export interface ProductSpecs {
  /** common standard sizes, plus whether custom sizes are possible */
  sizes: string[];
  /** stocks and materials the product is normally made from */
  materials: string[];
}

export const productSpecs: Record<string, ProductSpecs> = {
  'visiting-card': {
    sizes: ['3.5 × 2 in (90 × 50 mm)', '3.5 × 2.25 in', 'Square and custom die-cut sizes'],
    materials: ['300–350 GSM art card', 'Matt-laminated art card', 'Non-tearable synthetic film', 'Silver metallic card', 'Textured and cotton paper'],
  },
  brochure: {
    sizes: ['A4 folded to A5 or DL', 'A3 folded to A4', 'DL (99 × 210 mm)', 'Custom sizes'],
    materials: ['130–170 GSM art paper (gloss or matt)', '250–300 GSM art card cover', 'Matt or gloss lamination'],
  },
  'pamphlet-flyer': {
    sizes: ['A6', 'A5 (148 × 210 mm)', 'A4 (210 × 297 mm)', 'DL (99 × 210 mm)', 'Custom shapes'],
    materials: ['90–130 GSM art paper', '70–100 GSM maplitho', '170 GSM art paper for premium flyers'],
  },
  'bottle-label': {
    sizes: ['Cut to your bottle, jar or can', 'Wrap-around labels up to full circumference', 'Sheets or rolls'],
    materials: ['White PVC / vinyl', 'Clear (transparent) film', 'Non-tearable synthetic film', 'BOPP film', 'Self-adhesive paper'],
  },
  letterhead: {
    sizes: ['A4 size', 'Letter size'],
    materials: ['70 GSM paper', '90 GSM paper', '100 GSM paper', '115 GSM paper'],
  },
  certificate: {
    sizes: ['A4 landscape', 'A3 landscape', 'A5 and custom sizes'],
    materials: ['250–300 GSM art card', 'Textured and parchment-style paper', 'Gold foil and embossed seal'],
  },
  envelope: {
    sizes: ['9 × 12 in (large)', '6 × 4 in', '6 × 8 in', '9 × 4 in', '10.75 × 4.75 in', '9.70 × 4.20 in', '5 × 7 in', '8.60 × 10.60 in', '9.40 × 12.40 in'],
    materials: ['70 GSM paper', '90 GSM paper', '100 GSM paper'],
  },
  sticker: {
    sizes: ['Any shape — circle, rectangle or die-cut', 'Sheets or rolls', 'Barcode and QR sizes on request'],
    materials: ['Chromo (gloss) and matt paper', 'Waterproof PVC vinyl', 'Transparent film', 'BOPP', 'Thermal paper for barcode labels'],
  },
  file: {
    sizes: ['A4 and foolscap', 'Doctor-file size (A4 with pocket)', 'Custom sizes'],
    materials: ['300–350 GSM art card, laminated', 'Rigid board with clear PVC front', 'Metal clip or spiral binding'],
  },
  folder: {
    sizes: ['9 × 12 in (A4 presentation folder)', 'Flap folder for A4 papers', 'Sample and display folders to your size'],
    materials: ['300–350 GSM art or ivory board, laminated', 'Mica and laminate sample sheets', 'Greyboard (2–3 mm) wrapped in printed paper for display folders'],
  },
  box: {
    sizes: ['Made to your product — length × width × height', 'Tablet, syrup, capsule, cosmetic and perfume cartons', 'Custom die-lines'],
    materials: ['250–350 GSM duplex (FBB / SBS) board', 'Art card', 'Kraft board', 'E-flute micro-corrugated board for larger packs'],
  },
  book: {
    sizes: ['A4 (210 × 297 mm)', 'A5 (148 × 210 mm)', 'Square 8 × 8 in', 'Custom sizes'],
    materials: ['100–130 GSM art paper or maplitho (inside pages)', '250–300 GSM art card cover', 'Gloss or matt lamination'],
  },
  catalogue: {
    sizes: ['A4 portrait or landscape', 'A5', 'Square catalogue sizes', 'Pages from 8 to 200+'],
    materials: ['130–170 GSM art paper (inside pages)', '300 GSM laminated cover', 'Wire-o, spiral or perfect binding'],
  },
  calendar: {
    sizes: ['Wall: 12 × 18 in and 13 × 19 in', 'Poster: 20 × 30 in', 'Desk: 8 × 6 in', 'Card: wallet size 3.5 × 2 in', 'Magnetic: 4 × 6 in'],
    materials: ['170–250 GSM art paper', '300 GSM art board (desk stand)', 'Flexible magnet sheet', 'Wire-o binding and hanger bars'],
  },
  'bill-book': {
    sizes: ['A4', 'A5 (half)', 'A6 (quarter)', 'Custom sizes'],
    materials: ['54–70 GSM NCR carbonless paper', '70 GSM maplitho', 'Board back cover or hard cover'],
  },
  pouch: {
    sizes: ['Stand-up pouches from 100 g to 1 kg', 'Cotton pouches in small, medium and large', 'Custom sizes'],
    materials: ['PET / PE laminate', 'Metallised film', 'Kraft paper', 'Cotton cloth (100–120 GSM)'],
  },
  'bopp-bag': {
    sizes: ['5 kg', '10 kg', '25 kg', '50 kg', 'Custom sizes'],
    materials: ['PP woven fabric (about 55–100 GSM)', 'BOPP film laminate (gloss or matt)', 'Stitched or heat-sealed mouth'],
  },
  'corrugated-box': {
    sizes: ['Made to your product', 'From small retail cartons to large shipping boxes', 'Custom die-lines'],
    materials: ['3-ply and 5-ply corrugated board', 'Kraft liner (120–180 GSM)', 'B and C flute', 'Offset-laminated sheets for premium print'],
  },
  'rigid-box': {
    sizes: ['Made to your product', 'Gift sets and single-product boxes', 'Custom inserts'],
    materials: ['1.5–3 mm greyboard', '120–157 GSM art or textured wrapping paper', 'Velvet or EVA foam inserts', 'Magnets and ribbon pulls'],
  },
  'acrylic-board': {
    sizes: ['Name plates from 6 × 2 in', 'Wall boards up to 4 × 3 ft', 'Stands in A5, A4 and A3', 'Custom sizes'],
    materials: ['Acrylic sheet (3, 5 and 8 mm)', 'Clear, white, black and frosted acrylic', 'Steel or brass standoffs', 'UV-printed face'],
  },
  'flex-banner': {
    sizes: ['Roll-up standee 3 × 6 ft', 'Banners and backdrops to any size in feet', 'Hoardings in large sizes'],
    materials: ['280–440 GSM PVC flex', 'Matt and glossy flex', 'Backlit flex', 'Metal eyelets and pocket stitching'],
  },
};

export function getProductSpecs(slug: string): ProductSpecs | undefined {
  return productSpecs[slug];
}
