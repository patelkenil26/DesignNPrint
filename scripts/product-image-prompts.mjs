/**
 * Image prompts per product, keyed by `<product-slug>` → `<file-name>` (same names as docs/product-images.md).
 * Shared house style keeps every product photo on-theme with the site: warm off-white studio (#f4f2ee),
 * soft light, and a hint of the CMYK brand inks (red #e52421, yellow #ffd500, green #009b48, blue #00a0e3).
 */
const houseStyle =
  'Premium studio product photograph for a high-end printing press website. Warm off-white seamless paper background (#f4f2ee), ' +
  'soft diffused side light from the left, gentle natural contact shadows, shallow depth of field, ultra-sharp focus on the print surface, ' +
  'realistic paper fibre and ink texture, subtle cinematic colour grade. A small, tasteful accent of CMYK ink colours ' +
  '(vivid red, sunny yellow, green, cyan blue) appears only in the card artwork. ' +
  'Absolutely no text, no letters, no numbers, no logos, no watermarks, no lorem ipsum — any marks on the cards are purely abstract geometric shapes. ' +
  '4:3 landscape composition with generous clean negative space.';


/**
 * "Real client" style: believable business cards with real-looking names, designations, phone numbers and addresses
 * (fictional businesses — never real brands), photographed like a premium print-studio portfolio shot.
 */
const realCardStyle =
  'Photographed like a premium print-studio portfolio piece with a full-frame camera, 85mm macro lens, f/2.8, shallow depth of field, tack-sharp focus on the printed details. ' +
  'The cards are real, finished business cards for a fictional business, with fully legible, correctly spelled, professionally typeset text exactly as quoted: clean typographic hierarchy, ' +
  'a refined logo mark, generous margins, small details like phone, email and address. Show BOTH the front and the back of the card design. ' +
  'Subtle brand-colour accents of vivid red (#e52421) and sunny yellow (#ffd500) appear in the scene only through painted card edges or one tiny prop. ' +
  'Realistic paper fibre, ink and foil physics, natural soft shadows, no CGI look, no watermark, no extra gibberish text anywhere except the quoted text. 4:3 landscape.';

export const productImagePrompts = {
  'visiting-card': {
    cover:
      'Hero shot, 3/4 top-down angle, on a warm off-white (#f4f2ee) plaster surface with a long soft shadow. A luxury interior-design studio business card set on thick 600 gsm triplex card: the FRONT is deep black soft-touch with a gold hot-foil monogram "A" inside a thin circle and the foil word "AURELIA" beneath it, card edge painted vivid red; the BACK is warm ivory with black text: "Aarav Mehta" in an elegant serif, "Principal Designer", "AURELIA INTERIORS", "+91 98765 43210", "aarav@aureliainteriors.in", "12 Prahlad Nagar, Ahmedabad 380015". Three cards fanned: black front on top, ivory back beneath, plus one more black card standing at an angle catching a gold foil highlight. A brass pen and a small sprig of dried grass at the edge of the frame. ' + realCardStyle,
    'art-card':
      'A neat stack of bright white glossy art-paper business cards with a second card leaning against the stack, 3/4 angle. Clean modern layout using only abstract colour blocks: a vivid red circle, a yellow bar and a thin blue line. Smooth bright coated surface, crisp ink, simple and budget-friendly feel. ' +
      houseStyle,
    'art-card-with-lamination':
      'Two business cards on the surface, one lying flat and one propped at an angle, showing a glossy laminated finish with a soft window reflection sweeping across the surface and a rich saturated abstract artwork in red, yellow, green and blue wave shapes. A tiny peeled corner of the clear lamination film is visible on one card to show the protective layer. ' +
      houseStyle,
    'matt-card':
      'Three business cards in a calm stacked arrangement with a deep charcoal matt soft-touch finish, velvety glare-free surface that absorbs light, minimal abstract geometric mark in a slightly lighter ink tone and one thin yellow line accent. Quiet, premium, understated, very soft shadows. ' +
      houseStyle,
    'matt-uv-card':
      'Dramatic product shot on a dark ink-black (#101114) slate surface with a soft warm rim light from the right. Two cards: a deep navy matt soft-touch medical business card lying flat and a second one tilted toward the camera. Spot-UV gloss lettering catches a bright specular streak, clearly contrasting glossy letters against the velvety matt body. Printed text exactly: "Dr. Ananya Shah" in large spot-UV serif, "MD, Consultant Dermatologist", "SHAH SKIN & AESTHETICS CLINIC", "+91 99090 12345", "Mon–Sat · 10 am – 7 pm", "Satellite, Ahmedabad". A fine yellow accent line under the name. One glass dropper bottle blurred in the background. ' + realCardStyle,
    'non-tearable-nt-card':
      'A white synthetic non-tearable business card being gently bent into a curve between two hands (only fingertips visible, no face), a few water droplets beaded up on its smooth plastic-like waterproof surface, another identical card lying flat beside it. Bright abstract printed artwork in red, yellow and blue. Conveys waterproof, tear-proof strength. ' +
      houseStyle,
    'silver-metallic-card':
      'Luxury product shot on a dark ink-black (#101114) polished surface, studio strip-light reflections sweeping across the cards. Three mirror-finish brushed-silver metallic business cards for a private-equity firm, stacked at a staggered angle, sharp chrome edges, crisp reflections. Black printed and laser-engraved text exactly: "VIKRAM JOSHI", "Founder & Managing Partner", "VJ CAPITAL ADVISORS", "+91 98250 67890", "vikram@vjcapital.in", "GIFT City, Gandhinagar". A refined linear monogram "VJ" mark, a hairline rule and a small red accent line. One card face-up in sharp detail, the others reflecting the light. ' + realCardStyle,
    'textured-paper-card':
      'Warm artisanal lifestyle shot on a warm off-white (#f4f2ee) linen cloth with a soft window shadow of leaves. Two business cards of a handmade ceramics studio on thick 700 gsm cotton paper with torn deckled edges: card one is cream cotton with deep letterpress deboss in charcoal ink, text exactly: "Meera Patel", "Ceramic Artist", "CLAY & KILN STUDIO", "+91 97270 45678", "Morbi, Gujarat", with a simple pot logo; card two is speckled kraft paper with the logo blind-debossed and the back showing "claykiln.in". A small handmade ceramic cup and a tiny dried flower sprig at the edge, a thin red thread tied around the cards. Show the rich tactile fibres and the depth of the letterpress impression. ' + realCardStyle,
    'digital-visiting-card':
      'A sleek matte black NFC smart business card held at a slight angle above another identical card, a modern smartphone beside them with a plain softly glowing blank screen, a small abstract QR-like dotted pattern (not a real code) and a ring-shaped NFC symbol made of thin concentric arcs on the card in white and yellow. Tech meets print, tap-to-share feeling. ' +
      houseStyle,
  },
};
