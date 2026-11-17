import { shot } from './product-image-style.mjs';

/** Brochure, pamphlet / flyer, letterhead and envelope type photos. */
export const promptsA = {
  brochure: {
    'bi-fold-brochure': shot(
      `Premium real-estate hero shot on a pale travertine surface with soft golden-hour window light. A bi-fold A4 brochure for a fictional luxury apartment project standing open like a tent: the front cover in deep teal with a gold foil wordmark "SKYLINE RESIDENCY" and the line "3 & 4 BHK Residences · Ahmedabad", the inside spread showing a stunning twilight photograph of a glass-and-stone tower on the left and a clean floor-plan page with "Starting ₹1.2 Cr*" on the right in teal and gold. A second copy lying flat, a brass key and a small architectural model tree at the frame edge.`,
    ),
    'tri-fold-brochure': shot(
      `Serene wellness hero shot on a warm sandstone surface with soft green leaf shadows, a white orchid and smooth river stones. A tri-fold brochure for a fictional ayurveda spa standing in a gentle zig-zag with all three panels visible: the cover in sage green and ivory with a gold lotus emblem and the wordmark "AARAV AYURVEDA", the inside panels showing a photo of a calm treatment room, a short heading "Heal. Restore. Renew." and a tidy list of therapies with ₹ prices. One more folded copy beside it and a small bowl of herbal oil with a wooden dipper.`,
    ),
    'gate-fold-brochure': shot(
      `Luxurious jewellery-brand hero shot on a black velvet surface with warm golden spotlights and soft bokeh. A gate-fold brochure of a fictional bridal jewellery house, its two deep-maroon doors with gold foil edging swung open to reveal a dramatic centre spread: a glowing photograph of an ornate gold and ruby bridal necklace on a bust, with the elegant wordmark "ZARINA JEWELS" and the line "Bridal Collection 2027" in gold serif lettering. A second closed copy with a gold foil emblem on its maroon cover leaning behind, a few loose rose petals and a small antique brass jewellery box in the frame.`,
    ),
    'z-fold-brochure': shot(
      `Vibrant clean-energy hero shot on a glossy white surface with a soft sky-blue gradient backdrop and sunshine glow. A long z-fold brochure for a fictional solar company standing in a crisp accordion zig-zag so every panel faces the camera: bold orange and deep-blue panels with a sun icon, the wordmark "SUNGRID ENERGY", photos of rooftop solar panels, a tidy savings table "Save up to ₹6,000 / month" and a bright call-to-action strip with "+91 98765 43210". A tiny model solar panel and a green plant sprig beside it.`,
    ),
  },
  'pamphlet-flyer': {
    'single-page-flyer': shot(
      `Vibrant restaurant-launch hero shot on a dark wooden table with warm bokeh lights of a lively restaurant behind. A stack of glossy A5 flyers with one held upright against the stack: a fiery red and turmeric-yellow design with a big photograph of a steaming Gujarati thali, the headline "GRAND OPENING" and the wordmark "SPICE ROUTE KITCHEN", the line "Unlimited Thali · ₹299" and a small offer strip "Free dessert this week". Whole cumin seeds, a green chilli and a brass katori at the frame edge.`,
    ),
    'bi-fold-pamphlet': shot(
      `Fresh education hero shot on a bright white desk with a soft cobalt-blue and sunny-orange backdrop. A bi-fold pamphlet for a fictional coaching academy standing half-open: the cover in cobalt blue with an orange rocket-and-book icon, the wordmark "BRIGHT MINDS ACADEMY" and the line "Admissions Open 2027", the inside showing a smiling topper photograph, a clean batch-timing table and "Fees from ₹4,500". Coloured pencils, a small globe and a notebook beside it.`,
    ),
    'tri-fold-pamphlet': shot(
      `Clean healthcare hero shot on a white marble counter with a soft aqua-teal gradient backdrop and a stethoscope. A pocket-sized tri-fold pamphlet for a fictional family clinic, shown both closed and half-opened: teal and white design with a heart-and-plus icon, the wordmark "CARE PLUS CLINIC", the heading "Your Health, Our Priority", the clinic timings and a list of services, with "+91 79847 69501" on the back panel. A pamphlet stand, a small green plant and a pen next to it.`,
    ),
    'z-fold-pamphlet': shot(
      `Adventurous travel hero shot on a vintage world map with a brass compass, a passport and a coral seashell, lit by warm sunset light. A z-fold travel pamphlet unfolded in a zig-zag: vivid ocean-blue and sunset-orange panels with photographs of Kerala backwaters, Rajasthan forts and Himalayan peaks, the wordmark "WANDER INDIA TOURS", the headline "Discover Incredible India" and package prices "from ₹12,999". Smooth glossy print, crisp fold lines.`,
    ),
    'custom-shaped-pamphlet': shot(
      `Playful premium hero shot on a pastel mint seamless surface with a soft pink backdrop and a few scattered sprinkles. A die-cut pamphlet shaped like an ice-cream cone, with a scalloped scoop top in strawberry pink and a waffle-pattern cone, printed with the wordmark "SCOOP & SMILE" and the line "Handcrafted Ice Creams · Ahmedabad", a second die-cut copy shaped like a single scoop in mint green, and a real ice-cream cone melting slightly beside them. Cleanly cut contours and crisp edges.`,
    ),
  },
  letterhead: {
    'corporate-letterhead': shot(
      `Elegant professional hero shot on a pale grey marble desk with soft window light. A stack of premium A4 letterheads for a fictional chartered-accountancy firm: crisp white paper with a slim navy header holding the wordmark "PATEL & ASSOCIATES" with the line "Chartered Accountants", a thin gold rule, a clean footer with an Ahmedabad address and "+91 79847 69501", and a short typeset sample letter on the top sheet. A matching DL envelope, a slim silver pen and a small potted succulent at the frame edge.`,
    ),
    'textured-paper-letterhead': shot(
      `Artisanal luxury hero shot on a warm linen cloth with soft leaf-shadow light. A letterhead printed on thick handmade cotton paper with natural deckled edges, blind-embossed monogram "A" in the top corner and the wordmark "AURELIA INTERIORS" in gold foil, a few lines of a typeset sample letter, the rich fibre texture clearly visible, a burgundy wax seal and brass seal stamp beside it, and a dried pampas sprig. A second sheet in soft sage tone peeking out underneath.`,
    ),
    'appreciation-certificate': shot(
      `Prestigious recognition hero shot on a dark walnut desk with warm golden light and a blurred bookshelf behind. A landscape certificate on cream parchment-style paper with an ornate gold-foil border and corner flourishes, the heading "CERTIFICATE OF APPRECIATION", the line "is proudly presented to", the name "Rohan Mehta" in elegant script, a short line "in recognition of outstanding dedication and service", two signature lines "Managing Director" and "Head of HR", and a gold embossed seal with a deep-red ribbon. A gold fountain pen and a small trophy at the edge.`,
    ),
    'achievement-award-certificate': shot(
      `Triumphant award-ceremony hero shot on a dark navy velvet surface with golden spotlight bokeh behind. A landscape achievement certificate in deep navy and metallic gold with a laurel-wreath emblem, the heading "CERTIFICATE OF ACHIEVEMENT", the name "Ananya Shah", the line "Best Performer of the Year 2026" and two signature lines, a raised gold foil seal with ribbons. A gold medal on a ribbon and a small crystal trophy beside it, confetti glitter on the surface.`,
    ),
    'training-completion-certificate': shot(
      `Modern corporate-learning hero shot on a clean white desk with a soft teal backdrop and a blurred laptop. A crisp landscape completion certificate in teal and white with a clean geometric border and a seal icon, the heading "CERTIFICATE OF COMPLETION", the name "Vikram Joshi", the line "Advanced Excel & Data Analytics · 40 hours", the date "15 March 2027", two signature lines and a small QR-style dotted square. A lanyard badge, a yellow highlighter and a notebook beside it.`,
    ),
    'school-college-certificate': shot(
      `Joyful school-event hero shot on a sunny desk with colourful confetti and a pastel blue backdrop. A bright landscape certificate with a red, blue and yellow ribbon border and a school crest, the heading "ANNUAL SPORTS DAY", the name "Aarav Patel", the line "First Prize · 100 m Race · Class 7", signature lines "Principal" and "Sports Teacher". A gold medal on a ribbon, a small trophy cup and a whistle beside it.`,
    ),
    'stationery-set': shot(
      `Refined flat-lay hero shot on soft ivory linen with gentle window shadows. A complete matching stationery set for a fictional boutique hotel in forest-green and copper-foil: an A4 letterhead, a DL envelope, a business card and a compliment slip, all with the wordmark "THE BANYAN HOTEL" with a small tree emblem in copper foil, a copper-foil rule, the Udaipur address and "+91 98250 67890". A copper fountain pen, a sprig of eucalyptus and a brass paper clip complete the arrangement.`,
    ),
  },
  envelope: {
    'window-envelope': shot(
      `Clean business hero shot on a light oak desk with soft daylight. A set of white DL window envelopes of a fictional electricity utility: the sender wordmark "BHARAT ELECTRIC CO." in blue with a lightning-bolt icon in the top-left corner, the clear window showing a printed address "Mr. Rakesh Sharma, 12 Navrangpura, Ahmedabad 380009" through the film, a small bill peeking from one open envelope with an amount "₹2,450". A silver pen and a coffee cup blurred behind.`,
    ),
    'non-window-envelope': shot(
      `Premium corporate-mailing hero shot on a dark slate surface with a soft warm spotlight. A fan of three fully printed sealed envelopes in rich burgundy, deep navy and charcoal, each with a crisp gold-foil wordmark "ORBIT INDUSTRIES" on the flap and a small address block on the front, perfectly pointed flaps, clean glue lines. A brass letter opener and a folded white letter beside them.`,
    ),
    'textured-paper-envelope': shot(
      `Elegant artisanal hero shot on ivory linen with soft botanical shadows. A handmade cotton-rag textured envelope with a deckled flap in warm cream, sealed with a deep-red wax seal bearing a monogram, a gold-foil wordmark "THE JOSHI FAMILY" on the front, a second envelope in soft sage beneath, a dried flower sprig, a calligraphy pen and a tiny bottle of ink. Rich visible paper fibres.`,
    ),
    'document-envelope': shot(
      `Professional office hero shot on a light desk with soft daylight and a blurred laptop. A stack of large A4 and A3 document envelopes: kraft-brown and white, one with a string-and-button closure and a printed wordmark "KARNAVATI LEGAL" with a scales icon, another gusseted white envelope printed with "CONFIDENTIAL · PROPOSAL 2027" and a small red stamp, a few documents sliding out of one. A binder clip and a black pen beside them.`,
    ),
  },
};
