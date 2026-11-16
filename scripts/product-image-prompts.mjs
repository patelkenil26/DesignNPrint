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

/** Same "real client portfolio" look as realCardStyle, for packaging, stationery and signage covers. */
const realProductStyle =
  'Photographed like a premium print-studio portfolio piece with a full-frame camera, 85mm macro lens, f/2.8, tack-sharp focus on the printed details, soft diffused side light, natural contact shadows, no CGI look, no watermark. ' +
  'Any printed text is fully legible, correctly spelled and professionally typeset, exactly as quoted, for an entirely fictional business; there are no real brands, no copied logos and no extra gibberish text. ' +
  'Brand-colour accents of vivid red (#e52421) and sunny yellow (#ffd500) appear only through one printed element or one small prop. 4:3 landscape, generous clean negative space.';

/** Shared tail for every book / calendar shot: centred subject so object-cover crops stay safe on phone and desktop. */
const bookStyle =
  'Subject centred with generous margin on all sides, so the picture crops safely on phones, tablets and wide desktop screens. ' +
  'Magazine-quality premium commercial product photography, rich refined colour grade, crisp print and foil detail, soft diffused key light with a gentle warm rim light, shallow depth of field, no CGI look, no watermark. ' +
  'Printed text is fully legible and correctly spelled exactly as quoted; any other text is blurred or purely abstract. The brands and events are entirely fictional, no real brands, no real people. 4:3 landscape.';

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
  'corrugated-box': {
    cover:
      'Hero shot, 3/4 angle, on a warm off-white (#f4f2ee) seamless surface with a long soft shadow. A stack of three brown kraft corrugated shipping cartons of different sizes, the largest at the back, the smallest on top, flaps neatly taped shut. The front of the middle carton carries a crisp one-colour flexo print for a fictional brand: the plain bold black wordmark "KARIGAR GOODS" in a heavy sans-serif with no symbol, the legible text "HANDLE WITH CARE" and "THIS SIDE UP" with two arrow icons, and a small red fragile glass icon. The cut edge of one carton shows the fluted corrugated layers in sharp detail. A roll of brown tape and a black marker at the frame edge. ' +
      realProductStyle,
  },
  file: {
    cover:
      'Hero shot, 3/4 angle, on a warm off-white (#f4f2ee) surface. Three corporate presentation folders fanned in a neat stack: the top one deep navy matt laminated with a gloss spot-UV wordmark "ORBIT INDUSTRIES" and a thin yellow line, the one beneath white with a navy spine, the third charcoal. The top folder is slightly open showing the inside pocket with a business card in the die-cut card slot and a few printed documents. A pen at the frame edge. ' +
      realProductStyle,
  },
  'bill-book': {
    cover:
      'Hero shot, 3/4 top-down angle, on a warm off-white (#f4f2ee) plaster surface. A stack of three carbonless bill books of a fictional Gujarati trading firm, one lying open to show the printed page: a neat red-and-black two-colour bill form headed "SHREE KRISHNA TRADERS", with "BILL / CASH MEMO", "No. 0417", "Date", "Name", a ruled table with columns "Sr.", "Particulars", "Qty", "Rate", "Amount", a "Total" box and "For SHREE KRISHNA TRADERS" at the bottom, red serial number, perforated tear-off edge, a carbon-copy blue and pink second leaf peeking out. Black glued binding spine with a red cloth tape. A ball pen lying across the book. ' +
      realProductStyle,
  },
  'bopp-bag': {
    cover:
      'Hero shot, 3/4 angle, on a warm off-white (#f4f2ee) seamless surface. Three clear glossy printed BOPP retail bags of a fictional apparel brand standing and leaning together: a bag with a self-adhesive flap strip, a zip-lock bag and a loop-handle bag. The bags are printed with a crisp one-colour black wordmark "URBAN THREAD" and a small yellow stripe, folded cotton t-shirts visible through the transparent film, soft window reflections sweeping across the glossy surface. ' +
      realProductStyle,
  },
  'rigid-box': {
    cover:
      'Hero shot, 3/4 angle, on a warm off-white (#f4f2ee) seamless surface with a long soft shadow. A luxury rigid magnetic-closure gift box in matte black soft-touch paper with a gold hot-foil wordmark "MAISON VELA" on the lid, the lid hinged open to reveal a cream velvet insert with a small amber perfume bottle nestled in it. Beside it a second closed rigid box in ivory with a thin red ribbon pull and a blind-embossed monogram, and a third shoulder-neck box in deep green. Crisp wrapped corners and fine edge detail. ' +
      realProductStyle,
  },
  'flex-banner': {
    cover:
      'Hero shot in a bright, clean showroom corner with a warm off-white (#f4f2ee) wall and light grey floor. A roll-up standee on a metal base, printed with a clean sale design: a big headline "GRAND OPENING", a subheading "Fresh Bakes · Daily", a photo of golden croissants and a red offer burst reading "20% OFF". Beside it a rolled flex banner leaning on the wall, its printed edge showing the same design and a hemmed edge with metal eyelets at the corners. Soft daylight, sharp print detail. ' +
      realProductStyle,
  },
  'bottle-label': {
    'wrap-around-label':
      'Premium beverage-brand campaign shot on a seamless warm peach-to-apricot gradient backdrop with a soft long shadow. Three chilled clear PET cold-pressed juice bottles of a fictional brand standing in a row, each with a vibrant full wrap-around label: mango-orange with a golden mango illustration, deep pomegranate-ruby with ruby seeds, and lush lime-green with citrus slices, bold modern hand-drawn botanical artwork flowing seamlessly around the curve of the bottle, a clean wordmark "PULP REPUBLIC" in a rounded geometric typeface, the flavour name in large letters ("MANGO", "ANAR", "NIMBU"), a small line "Cold-pressed · No added sugar · 300 ml". Behind the bottles, the same label printed flat and unrolled, leaning upright to reveal the complete continuous artwork and a tidy nutrition panel. Fresh condensation droplets on the glass, fresh cut fruit and green leaves scattered at the base. ' +
      'Magazine-quality premium commercial product photography, rich saturated colour grade, glossy highlights, crisp print detail, soft diffused key light with a warm rim light from the right, shallow depth of field, no CGI look, no watermark. Printed text is fully legible and correctly spelled exactly as quoted; the brand is entirely fictional, no real brands, no extra gibberish text. 4:3 landscape.',
    'jar-can-label':
      'Luxury artisanal food-brand shot on a deep forest-green velvet-textured seamless backdrop lit with warm golden light, with a polished dark walnut surface in front. A hero glass jar of wild forest honey with a cream-and-gold wraparound paper label, hot-foil gold lettering "GOLDEN HIVE" with a fine honeycomb-and-bee emblem, the line "Wild Forest Honey" in an elegant serif and "Net 500 g" in small type, a black screw lid with a gold seal. Beside it a smaller jar, and a round tin can of premium masala tea in deep maroon with a gold-embossed label "GOLDEN HIVE · Spiced Chai" and a cluster of cardamom pods, cinnamon sticks and star anise. A wooden honey dipper with golden honey slowly drizzling, glowing amber light passing through the honey. ' +
      'Magazine-quality premium commercial product photography, rich warm colour grade, glossy highlights on the glass, crisp foil and print detail, shallow depth of field, no CGI look, no watermark. Printed text is fully legible and correctly spelled exactly as quoted; the brand is entirely fictional, no real brands, no extra gibberish text. 4:3 landscape.',
    'transparent-label':
      'Moody luxury drinks-brand hero shot on a deep midnight-navy seamless backdrop with a glossy black reflective surface and a soft backlight glow, soft blue and teal rim lights. A tall clear glass bottle of premium botanical sparkling water filled with crystal liquid and tiny rising bubbles, wearing a crystal-clear transparent label so that only the printed artwork seems to float directly on the glass: fine white-ink and rose-gold foil botanical line illustration of juniper, rosemary and lemon leaves wrapping the bottle, the wordmark "AVANI" in elegant widely spaced capitals and the line "Botanical Sparkling Water" beneath it. Beside it a second smaller bottle, fresh juniper sprigs, a lemon slice and ice cubes with glittering condensation droplets, a thin film of the clear label peeling at one edge to show it is a transparent film. ' +
      'Magazine-quality premium commercial product photography, cinematic colour grade, crisp white-ink and foil detail, beautiful glass refractions and caustics, shallow depth of field, no CGI look, no watermark. Printed text is fully legible and correctly spelled exactly as quoted; the brand is entirely fictional, no real brands, no extra gibberish text. 4:3 landscape.',
    'pesticide-agro-label':
      'Bright premium agro-brand catalogue shot on a lush gradient backdrop that fades from deep emerald green to sunlit yellow, with a softly blurred green crop field and golden morning light in the background. A line-up of five tall, professionally labelled agro-input bottles and pouches of a fictional brand standing on a clean pale surface with fresh green leaves and a ripe mango at the base: bottles with glossy full wrap labels in bold green and yellow with a big wordmark "KISAN SHAKTI", product names "NEEM GOLD" (a bio-insecticide, with a neem-leaf illustration), "CROP BOOST" (a growth regulator, with a golden wheat-ear illustration) and "FUNGO CURE" (a fungicide, with a bunch of grapes), a clear well-organised layout with a small composition table, a red and yellow hazard diamond, short safety pictograms, "Net 1 Litre", and a tidy blue "ISO Certified" seal. ' +
      'Magazine-quality premium commercial product photography, vivid saturated colour grade, glossy highlights on the labels, crisp print detail, soft diffused key light with warm golden backlight, shallow depth of field, no CGI look, no watermark. Printed text is fully legible and correctly spelled exactly as quoted; the brand is entirely fictional, no real brands, no extra gibberish text. 4:3 landscape.',
    'die-cut-custom-shape-label':
      'Premium beauty-and-gifting brand shot on a soft sage-green and blush-pink split seamless backdrop with a long soft shadow, bright airy daylight from a window with a gentle leaf shadow. In the foreground a hand-sized frosted amber glass bottle of herbal shampoo with a leaf-shaped die-cut label in fresh green and gold foil, printed "VANYA" in an elegant serif and "Herbal Hair Oil", beside a round white ceramic candle jar with a scalloped flower-shaped die-cut label in blush pink and metallic copper, printed "LUMEN" and "Rose & Sandalwood", and a small clear glass dropper bottle with a tall arch-shaped die-cut label in deep teal with a gold crescent moon. In front of them a sheet of kiss-cut die-cut stickers on a glossy backing sheet with a few labels half peeled to show the exact custom contours: leaf, flower, arch, circle and star shapes. Dried pampas grass and a fresh pink peony at the edge. ' +
      'Magazine-quality premium commercial product photography, soft pastel yet rich colour grade, subtle foil highlights, crisp cut-edge detail, shallow depth of field, no CGI look, no watermark. Printed text is fully legible and correctly spelled exactly as quoted; the brand is entirely fictional, no real brands, no extra gibberish text. 4:3 landscape.',
  },
  'acrylic-board': {
    cover:
      'Hero shot, 3/4 angle, on a warm off-white (#f4f2ee) surface with a faint reflection. A clear polished-edge acrylic desk name plate with UV-printed text "Rohan Desai" and below it "Director — Operations" in black and a thin yellow line, standing in a brushed-steel base; beside it a frosted acrylic table-top display stand showing the text "TODAY\'S OFFERS" in red and black, and behind them a wall-mounted clear acrylic logo board held off the wall by four brass standoff pins, showing the plain wordmark "STUDIO NINE". Soft window reflections and clean glassy edge highlights. ' +
      realProductStyle,
    'name-plate':
      'Premium executive-office hero shot on a polished dark walnut desk with warm golden window light and a softly blurred leather chair and green plant behind. Three desk name plates in a staggered row: a thick crystal-clear 15 mm acrylic block with bevelled polished edges and a brushed-gold base, with UV-printed text "Dr. Ananya Shah" in deep navy and "Chief Medical Officer" beneath it; a frosted black acrylic plate with mirror-gold engraved lettering "Vikram Joshi · Managing Director"; and a smoky-teal tinted acrylic plate with white print "Meera Patel · Head of Design". Crisp light refracting through the polished edges, subtle reflections on the wood, a brass pen and a small fountain-pen ink bottle at the frame edge. ' +
      'Magazine-quality premium commercial product photography, rich warm colour grade, crisp lettering, glass-like edge highlights, shallow depth of field, no CGI look, no watermark. Printed text is fully legible and correctly spelled exactly as quoted; all names and companies are entirely fictional, no real brands, no extra gibberish text. 4:3 landscape.',
    'office-signage':
      'Premium modern corporate-lobby shot, wide interior with a long warm-white reception wall, light oak slats and a soft-lit marble floor. A large clear acrylic reception sign mounted on brass standoffs behind a reception desk, the plain wordmark "ORBIT INDUSTRIES" in brushed-gold lettering with a thin deep-blue accent bar; on the right wall, a row of frosted acrylic door and department signs with deep-blue backing and white lettering reading "CONFERENCE ROOM", "FINANCE" and "HUMAN RESOURCES", each with a minimal line icon; a ceiling spotlight washing the acrylic with soft glints. A slim wayfinding board and a green potted ficus in the foreground. ' +
      'Magazine-quality premium architectural and commercial photography, rich colour grade, crisp lettering, clean reflections, shallow depth of field, no CGI look, no watermark. Printed text is fully legible and correctly spelled exactly as quoted; the company is entirely fictional, no real brands, no extra gibberish text. 4:3 landscape.',
    'wall-logo-board':
      'Premium boutique-studio hero shot, a full-height deep emerald-green textured plaster wall lit by a warm spotlight from above. A large rectangular clear acrylic wall logo board floating off the wall on four polished brass standoff pins, casting a soft crisp shadow. On it a layered logo built of mirror-gold cut-out acrylic letters and a fine line mark with the wordmark "STUDIO NINE" and the tagline "Architecture · Interiors" printed in white. Below, a sleek walnut console with a white orchid and a small stack of three plain linen-bound books with completely blank, unprinted spines and covers (no titles, no author names, no lettering of any kind on the books). Reflections of the logo in the acrylic edge, dimensional depth and layered shadows clearly visible. ' +
      'Magazine-quality premium commercial interior photography, rich saturated colour grade, glossy highlights, crisp cut-edge detail, shallow depth of field, no CGI look, no watermark. Printed text is fully legible and correctly spelled exactly as quoted; the studio is entirely fictional, no real brands, no extra gibberish text. 4:3 landscape.',
    'table-top-display-stand':
      'Premium retail counter hero shot on a warm cream marble counter with a soft pastel-blush and peach gradient backdrop, bright window light. A set of three clear acrylic table-top display stands in different sizes: an A5 L-shaped stand holding a printed card with the headline "FESTIVE OFFER" in rich maroon and gold, "Flat 25% off · This week only"; a tall slim clear stand with a QR-style abstract dotted square and the text "SCAN TO PAY"; and a small tent-style frosted stand with "NEW ARRIVAL" in teal. Polished bevelled edges catching the light with tiny rainbow refractions, a bouquet of marigolds and a brass bell at the frame edge. ' +
      'Magazine-quality premium commercial product photography, vivid saturated colour grade, glassy edge highlights, crisp print detail, shallow depth of field, no CGI look, no watermark. Printed text is fully legible and correctly spelled exactly as quoted; the offer is entirely fictional, no real brands, no extra gibberish text. 4:3 landscape.',
    'menu-price-stand':
      'Premium restaurant-counter hero shot at golden hour in a stylish modern cafe with warm bokeh lights, a terracotta tile wall and a dark wooden counter. A set of clear acrylic menu stands: a tall A4 menu holder holding a beautifully printed menu with the heading "THE CAFE MENU" and a few legible items "Masala Chai ₹40", "Cold Coffee ₹120", "Veg Club Sandwich ₹160"; a small square price-tag stand with "Fresh Brownie ₹90" in warm brown and white; and a slim bottle-neck style tent holder with "TODAY\'S SPECIAL". A steaming cup of chai, a croissant and a sprig of mint beside them. Clean polished edges with soft light glints. ' +
      'Magazine-quality premium food-and-hospitality photography, warm rich colour grade, crisp print detail, shallow depth of field, no CGI look, no watermark. Printed text is fully legible and correctly spelled exactly as quoted; the cafe is entirely fictional, no real brands, no extra gibberish text. 4:3 landscape.',
    'directional-sign':
      'Premium modern hospital-and-office wayfinding hero shot, a bright airy corridor with white walls, pale wood floor and soft daylight at the end. A clear acrylic directional sign hanging from the ceiling on steel rods, and a wall-mounted directional board with deep-teal and white print showing three rows with clean line icons and crisp arrows: "← RECEPTION", "↑ OPD & CONSULTATION", "→ PHARMACY". Beside it a door sign "WAY OUT" with a green running-figure icon and a slim floor-number plate "FLOOR 2". Perfectly polished edges catching the light, tiny reflections of the corridor, a potted palm in the foreground. ' +
      'Magazine-quality premium architectural photography, fresh clean colour grade, crisp lettering and pictograms, shallow depth of field, no CGI look, no watermark. Printed text is fully legible and correctly spelled exactly as quoted; the venue is entirely fictional, no real brands, no extra gibberish text. 4:3 landscape.',
  },
  book: {
    'company-profile-booklet':
      'Premium corporate hero shot on a warm greige seamless surface with a long soft shadow and gentle window light. A perfect-bound A4 company profile booklet standing slightly open at an angle, deep navy matt soft-touch cover with a gold foil wordmark "ORBIT INDUSTRIES" and the line "Company Profile 2027", a second copy lying flat beneath it, and a third copy open to a beautiful spread: a full-bleed architectural photograph of a modern glass factory on the left page, and on the right page a clean heading "Our Story" with neatly typeset columns, a timeline and a few key numbers in teal and gold. A slim brass pen and a small succulent at the frame edge. ' +
      bookStyle,
    'product-catalogue':
      'Premium product-catalogue hero shot on a pale oak desk with soft warm daylight and a blurred modern showroom behind. Two thick wire-bound and perfect-bound A4 product catalogues: the front one with a glossy laminated cover showing a stylish living-room scene and the title "HOME COLLECTION 2027" in white serif lettering with a thin gold line, the second beside it open flat to a spread of a tidy grid of beautifully photographed furniture and lamps with small product codes and prices, clean typography in charcoal and terracotta. A tab index of coloured edge-tabs visible on the page edge, a swatch card and a pencil beside it. ' +
      bookStyle,
    'training-manual':
      'Premium corporate-training hero shot on a clean white training-room table with soft daylight and a blurred projector screen and teal chairs behind. A stack of three spiral-bound training manuals with clear plastic front covers and heavy card back covers, the top one printed with a bold teal and white cover "SAFETY & QUALITY TRAINING MANUAL" with the line "Participant Guide · Level 1" and a bold geometric icon; a fourth manual lying open to a well-designed page with a heading, numbered steps, an illustrated diagram and a highlighted tip box in yellow. Colour-coded divider tabs, a yellow highlighter and a lanyard badge beside them. ' +
      bookStyle,
    'event-program-booklet':
      'Premium event-stationery hero shot on a dark charcoal slate surface with warm golden spotlights and soft bokeh stage lights behind. A saddle-stitched event programme booklet with a rich burgundy and gold foil cover reading "ANNUAL CONFERENCE 2027" with the line "Programme & Schedule · Ahmedabad", a second booklet fanned open to a clean agenda page with a time-and-session table "09:00 Registration", "10:30 Keynote Address", "13:00 Networking Lunch", elegant gold rules, and a lanyard name badge, a gold pen and a small brass bell. ' +
      bookStyle,
    'educational-booklet':
      'Bright, friendly premium education hero shot on a sunny pale-yellow desk with a soft pastel mint backdrop and gentle shadow. A neat stack of colourful perfect-bound educational study booklets, the top one with a joyful illustrated cover: a smiling cartoon sun, a rocket and planets in bold primary colours with the title "SCIENCE EXPLORER" and the line "Class 6 · Workbook"; a second booklet open to a page with a clear diagram of the solar system, short bullet points and a colourful quiz box; coloured pencils, a ruler and an eraser arranged beside them. ' +
      bookStyle,
    'promotional-booklet':
      'Premium retail-promotion hero shot on a soft blush-pink seamless surface with confetti-like paper shapes and a long shadow. A fan of three small square staple-bound promotional booklets with vibrant glossy covers, the front one in hot coral and sunny yellow with a bold burst "BIG SALE" and the line "Up to 50% off · Festive Collection", a second one open to a lively spread with product photos of sneakers and handbags, price tags and a cut-out coupon strip, a ribbon and a small shopping bag at the frame edge. ' +
      bookStyle,
    'wall-calendar':
      'Premium wall-calendar hero shot in a bright modern studio-office with a warm white wall and a light oak desk below with soft window light. A large spiral-bound 12-month wall calendar hanging on a nail on the wall by its wire-o binding, the page showing a breathtaking full-colour landscape photograph of a Himalayan lake at sunrise on the upper two-thirds and a clean month grid below headed "JANUARY 2027" with correctly ordered weekday columns and numbered days, tiny festival markers in red; a second calendar page curling slightly. A brass pen cup and a green plant on the desk below. ' +
      bookStyle,
    'poster-calendar':
      'Premium poster-calendar hero shot in a cosy modern living-space with a pale sage wall and soft afternoon light. A large one-sheet poster calendar, fully flat, hung with two thin wooden hanger bars on the wall: the top half is a stunning illustrated artwork of vibrant Indian festival colours (diyas, rangoli and marigold garlands) in rich saffron, magenta and teal, and the lower half is all twelve months in a neat three-by-four grid of small month tables, headed "2027" in large gold numerals with the line "Year Planner", crisp tiny numbers in correct order. A potted plant and a stack of books on a console below. ' +
      bookStyle,
    'card-calendar':
      'Premium giveaway-stationery hero shot on a warm cream surface with a soft pastel teal and peach backdrop and a long soft shadow. A fan of four wallet-size card calendars of a fictional company, matte laminated, with rounded corners: the front card showing a clean year-at-a-glance grid headed "2027" with all twelve tiny month tables in correct order, a teal header band and the wordmark "SHREE TRADERS" with a small phone number line, other cards in coral, mustard and navy with the same layout; one card tucked into a leather wallet, a few loose coins and a business card beside them. ' +
      bookStyle,
    'magnetic-calendar':
      'Premium kitchen-lifestyle hero shot in a bright modern kitchen with a brushed stainless-steel refrigerator door, warm morning light and a blurred fruit bowl behind. Two magnetic fridge calendars stuck to the steel door with visible flexible magnet edges: a large one with a vivid full-colour photograph of fresh vegetables and herbs on top and a clean month grid headed "MARCH 2027" below with correctly ordered weekdays and days, and a smaller slim magnetic strip calendar in turmeric yellow with a bold number grid, held on with a small round fridge magnet shaped like a lemon, a note card and a tiny grocery list stuck beside them with a magnet. ' +
      bookStyle,
  },
};
