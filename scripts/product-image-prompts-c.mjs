import { shot } from './product-image-style.mjs';

/** Bill book, pouch, BOPP bag, corrugated box, rigid box and flex banner type photos. */
export const promptsC = {
  'bill-book': {
    'challan-book': shot(
      `Professional trade hero shot on a warm wooden counter with soft daylight and a blurred warehouse behind. A stack of delivery challan books of a fictional trading firm, one open to a printed form headed "DELIVERY CHALLAN" and "SHREE GANESH TRADERS, Naroda GIDC, Ahmedabad", with fields for Challan No. "0842", Date, Party Name, a table of Sr., Description, Qty, Remarks and a signature line "Receiver's Signature", printed in blue and black, black cloth binding, a rubber stamp and an ink pad beside it.`,
    ),
    'bill-invoice-book': shot(
      `Polished retail hero shot on a clean glass counter with warm shop lighting. A bill/invoice book for a fictional hardware store with a cobalt-blue and white printed form headed "TAX INVOICE" and "KRISHNA HARDWARE", with GSTIN line, Bill No. "1203", a ruled item table with Sr., Item, Qty, Rate, Amount, a totals box and "Terms & Conditions", the pad bound with a navy cloth spine, a calculator and a pen beside it.`,
    ),
    'cash-memo-book': shot(
      `Busy-shop hero shot on a wooden counter with sunlit shelves blurred behind. A small cash memo book for a kirana store in warm orange and black print, headed "CASH MEMO" and "JAY AMBE GENERAL STORE", with a numbered header "No. 0561", Date, items table and "Total ₹", a carbon-copy sheet peeking out, a brass weighing scale and a handful of rupee coins beside it.`,
    ),
    'receipt-book': shot(
      `Trustworthy office hero shot on a clean desk with soft light. A receipt book in green and white print for a fictional housing society, headed "PAYMENT RECEIPT" and "SHANTI NAGAR CO-OP HOUSING SOCIETY", with Receipt No. "0319", "Received with thanks from", "Sum of Rupees", "₹ 4,500", a cheque/cash tick box and a signature line, a rubber stamp and an inked seal pressed on the top sheet.`,
    ),
    'duplicate-carbonless-book': shot(
      `Technical-detail hero shot on a bright surface with soft light. A duplicate carbonless (NCR) book with a white original and a canary-yellow duplicate copy fanned out neatly, the form for a fictional courier "SWIFT COURIER" in blue print with "Consignment Note", a hand-written-style example entry pressed through both sheets, the bound edge with red cloth tape and a ballpoint pen on top.`,
    ),
    'triplicate-book': shot(
      `Clean accounting hero shot on a pale surface with soft light. A triplicate invoice book with three coloured copies fanned out in white, pink and light blue, the form for a fictional firm "MEHTA ENTERPRISES" printed in black and red with labels "Original · Customer", "Duplicate · Office", "Triplicate · Accounts", a perforated edge and a black bound spine.`,
    ),
    'numbered-perforated-book': shot(
      `Careful print-craft hero shot on a pale wooden surface with side light. A numbered and perforated coupon/token book for a fictional event, in bright orange and navy print with the title "ENTRY PASS", sharp serial numbers in red "No. 0101", a row of tear-off stubs with clean perforation, one coupon half torn off showing the perforation, a stack of loose numbered tickets beside it.`,
    ),
  },
  pouch: {
    'stand-up-pouch': shot(
      `Premium food-brand hero shot on a warm cream surface with a soft mustard backdrop. Three stand-up pouches of a fictional trail-mix brand in matte kraft-cream finish with bold colour blocks (forest green, saffron and berry-red), a clear oval window showing nuts and dried fruit, a zip seal and tear notch, the wordmark "NUTBOX" and flavour names "Mix · Berry · Roasted", "250 g", scattered almonds and cashews around them.`,
    ),
    'ziplock-pouch': shot(
      `Fresh retail hero shot on a bright white surface with a soft green gradient backdrop. Ziplock pouches of a fictional organic spice brand in deep-red and gold print, a transparent front window showing red chilli powder, a visible press-to-close zipper with a thumb groove, the wordmark "MASALA MANDI" and "Kashmiri Chilli · 100 g", loose dried chillies and a wooden spoon in front.`,
    ),
    'window-pouch': shot(
      `Appetising hero shot on a warm wooden surface with a soft peach backdrop. Window pouches of a fictional granola brand in cheerful orange and cream print with a big clear window showing crunchy granola with nuts, the wordmark "GOOD MORNING GRANOLA" and "Honey & Almond · 400 g", a bowl of granola with milk, almonds and a spoon beside them.`,
    ),
    'flat-bottom-pouch': shot(
      `Elegant coffee-brand hero shot on a dark wood surface with warm golden spotlights. Flat-bottom pouches standing upright like a box with a crisp matt black finish, gold foil wordmark "KAAPI ROASTERS", the line "Single Estate Arabica · 250 g", a degassing valve and a side-gusset, a bag in terracotta beside it, coffee beans and a small brass scoop spilling in front.`,
    ),
    'kraft-paper-pouch': shot(
      `Earthy artisan hero shot on a warm linen surface with soft natural light and dried grass. Kraft paper pouches with a window and a printed one-colour brand "AMMA'S PICKLES" in dark green, a zip-top and a tin-tie closure, jars of pickle blurred behind, a wooden spoon and a few green chillies, natural fibres visible.`,
    ),
    'drawstring-cotton-pouch': shot(
      `Soft lifestyle hero shot on a warm beige surface with a gentle morning light. Natural cotton drawstring pouches with a printed deep-green wordmark "WILD ROOT" and a leaf icon, a second pouch in indigo, soft draw-cords, a few wildflowers and dried lavender peeking from the open pouch, visible cotton weave.`,
    ),
    'zipper-cotton-pouch': shot(
      `Stylish accessory hero shot on a warm cream surface with a soft coral backdrop. Zipper cotton pouches in natural canvas and mustard with a metal zipper, a screen-printed floral pattern and a small leather tag, one open with makeup brushes and a lip balm coming out, a second pouch in navy with a printed wordmark "ROSEWOOD", crisp seams.`,
    ),
    'gift-pouch': shot(
      `Celebratory hero shot on a deep-emerald cloth with warm fairy-light bokeh. Velvet and satin gift pouches in plum, gold and emerald with drawstrings and gold foil printing "WITH LOVE" and a floral emblem, an open pouch showing small gifts and sweets, a few marigold petals and a brass diya beside them.`,
    ),
    'seed-agro-pouch': shot(
      `Bright agriculture hero shot with a lush green field blurred behind and soft sunlight. Colourful printed seed pouches of a fictional brand in green and yellow with a big photograph of ripe tomatoes, a wheat ear and a cucumber, the wordmark "KISAN BEEJ", "Hybrid Tomato Seeds · 10 g", "Germination 85%", sharp heat-seal edges, a few seeds and a small seedling in soil beside them.`,
    ),
    'branded-carry-bag': shot(
      `Fashionable retail hero shot on a pale concrete surface with a soft sage backdrop. Reusable cotton carry bags with long handles in natural cream and deep indigo, a bold screen-printed wordmark "URBAN BAZAAR" and a small sun icon, one bag filled with fresh vegetables and a baguette, another folded flat, stitched handles and visible cotton texture.`,
    ),
  },
  'bopp-bag': {
    'fertilizer-bag': shot(
      `Realistic agro-warehouse hero shot inside a bright godown with soft light from a roller shutter. A neat stack of BOPP laminated woven 50 kg NPK fertilizer bags, glossy laminated woven polypropylene with a visible weave and stitched seams, white and orange design for a fictional brand with the wordmark "KISAN SHAKTI", the text "NPK 12:32:16" and "Net Weight 50 kg", a leaf-and-sun emblem, a printed batch box; one bag lying in front with a slightly crumpled realistic fold and a few fertilizer granules spilled beside it, a farmer's weathered hands (no face) resting on the top bag.`,
    ),
    'dap-bag': shot(
      `Farm-supply hero shot on a rustic wooden pallet with a blurred green field behind and warm morning light. A pallet of BOPP laminated woven 50 kg DAP bags in a bold green and white design for a fictional brand "HARIYALI AGRO", with the large letters "DAP", the text "Di-Ammonium Phosphate 18-46-0", "Net Weight 50 kg", a wheat-ear emblem and a farmer illustration, glossy lamination catching the light, visible woven polypropylene texture, stitched top; a cut-open bag in front showing the granules pouring out onto the ground.`,
    ),
    'urea-bag': shot(
      `Agro-retail hero shot in front of a fertilizer shop with a roller shutter and blurred sacks stacked behind, bright daylight. A stack of BOPP laminated woven 45 kg urea bags in a deep royal-blue and white design for a fictional brand "BHARAT KISAN", with the large word "UREA", the text "46% Nitrogen" and "Net Weight 45 kg", a bold shining sun and wheat-field illustration, glossy lamination with a soft highlight, heavy realistic folds, stitched seam; a farmer in a turban (back view, no face) carrying one bag on his shoulder.`,
    ),
    'wheat-bag': shot(
      `Harvest-season hero shot on a sunlit threshing yard with golden wheat stalks and a hint of a tractor in the background. A set of laminated woven 50 kg wheat grain bags in cream and golden-yellow with a printed design of a golden wheat ear for a fictional brand "SONA SHARBATI", the text "Premium Wheat" and "Net Weight 50 kg", filled and slightly bulging with realistic folds and a stitched top, one bag open at the mouth showing plump golden wheat grains spilling onto a jute mat, a brass measuring scoop beside it.`,
    ),
    'cattle-feed-bag': shot(
      `Rural dairy-farm hero shot in front of a clean cattle shed with a blurred healthy dairy cow and warm morning light. A stack of BOPP laminated woven 50 kg cattle feed bags in a bold red and cream design for a fictional brand "GOKUL POSHAN", with a large cow-head emblem, the text "Cattle Feed", "High Protein Pellets" and "Net Weight 50 kg", a glossy laminated surface with a visible woven weave, stitched top and realistic heavy folds; one bag open at the mouth with brown feed pellets pouring into a steel bucket, a farmer's weathered hands (no face) holding a scoop. A pure full-frame photograph only: no infographic strip, no info bar and no caption band.`,
    ),
    'seed-bag': shot(
      `Fresh agri-input hero shot on a rustic wooden table at the edge of a green farm, soft golden light and a blurred field behind. A set of BOPP laminated woven 5 kg, 10 kg and 20 kg hybrid seed bags in a vivid green and yellow design for a fictional brand "KHETI BEEJ", with a large corn-cob and sprouting-seedling emblem, the text "Hybrid Maize Seed" and "Net Weight 10 kg", a glossy laminated surface with a fine woven texture, stitched top and a white tag; a wooden scoop with yellow maize seeds and a small pile of seeds spilled on the table, a few green seedlings in a tray beside it. A pure full-frame photograph only: no infographic strip, no info bar and no caption band.`,
    ),
    'atta-maida-bag': shot(
      `Warm kitchen-grocery hero shot on a rustic wooden counter with soft window light, a few fresh rotis and a bowl of wheat flour blurred beside them. A fan of BOPP laminated woven wheat-flour (atta) bags in 5 kg, 10 kg and 25 kg sizes, a glossy cream and orange design for a fictional brand "ANNAPURNA", the text "Chakki Fresh Atta" and "100% Whole Wheat", a golden wheat-ear emblem, a clear window showing the flour texture, a small handful of flour dusted on the counter, a stitched top and a convenient carry handle on the 5 kg bag. A pure full-frame photograph only: no infographic strip, no info bar, no price list, no address or phone panel and no caption band anywhere in the frame.`,
    ),
  },
  'corrugated-box': {
    'led-box': shot(
      `Premium electrical-packaging hero shot on a dark slate surface with a cool-white rim light and a subtle glow behind. A set of printed brown and white corrugated LED bulb cartons for a fictional brand "LUMINEX", crisp flexo print with a bright bulb illustration, the text "LED BULB", "9W · Cool Daylight" and "Handle With Care", a fragile glass icon, slightly open flap showing a corrugated honeycomb partition holding a glowing LED bulb; a stack of three cartons behind and a second, larger LED panel-light carton leaning on the side, clean tape seams and sharp die-cut edges. A pure full-frame photograph only: no infographic strip, no info bar and no caption band.`,
    ),
    'wire-box': shot(
      `Premium industrial-packaging hero shot on a clean concrete floor in a bright warehouse with soft light from a window. A sturdy stack of printed 5-ply brown corrugated cartons for a fictional cable brand "VOLTEX CABLES", bold black and red flexo print with the text "FR PVC Wire · 1.5 sq mm · 90 m" and a lightning-bolt icon, heavy-duty tape seams and strong box corners; the top carton open showing a neat red coil of electrical wire inside, a second coil of wire in yellow and green beside it, a roll of brown tape and a steel measuring tape at the edge. A pure full-frame photograph only: no infographic strip, no info bar and no caption band.`,
    ),
    'food-oil-box': shot(
      `Premium food-packaging hero shot on a warm wooden counter in a bright kitchen-store setting with soft window light. A stack of printed brown corrugated cartons for edible oil, bold green and yellow flexo print for a fictional brand "SONA GOLD", the text "Refined Sunflower Oil", "1 Litre × 12 Pouches", "This Side Up" with two arrows and an umbrella icon, sharp print and strong taped corners; the top carton open showing neatly packed golden oil pouches inside, a clear glass bottle of golden cooking oil and a fresh yellow sunflower beside it. A pure full-frame photograph only: no infographic strip, no info bar and no caption band.`,
    ),
    '3-ply-corrugated-box': shot(
      `Clean logistics hero shot on a warm off-white surface with a long soft shadow. A set of 3-ply brown corrugated cartons in three sizes, flaps taped shut, a simple one-colour print "FRAGILE · THIS SIDE UP", the cut edge showing a clean three-layer flute, a roll of tape and a marker beside it.`,
    ),
    '5-ply-corrugated-box': shot(
      `Heavy-duty hero shot on a warm concrete surface with a soft side light. Thick 5-ply corrugated cartons stacked, with a cut-away corner showing the five-layer double-wall flute structure in sharp detail, bold black print "HEAVY DUTY · MAX 30 KG", strapping bands and a pallet in the blurred background.`,
    ),
    'printed-corrugated-box': shot(
      `Brand-forward hero shot on a bright surface with a soft turquoise backdrop. Printed corrugated cartons in kraft brown with a crisp bold two-colour flexo print of a fictional brand "FRESHKART" in green and orange with vegetables illustration, the box tops showing a repeating pattern, one open box showing fresh vegetables, stacked neatly.`,
    ),
    'e-commerce-mailer-box': shot(
      `Modern unboxing hero shot on a light surface with a soft blush backdrop. A self-locking e-commerce mailer box in white-printed corrugated with a bold wordmark "THREADWORKS" and a "Thank you!" message inside the lid, an open box with tissue paper, a folded T-shirt and a thank-you card, a second closed box with a custom sticker seal.`,
    ),
    'die-cut-corrugated-box': shot(
      `Precision-engineering hero shot on a pale grey surface with soft side lighting. A die-cut corrugated box with a custom insert holding a fictional glass lamp snugly in cut-out cavities, locking tabs and clean cut edges, the outer box in kraft with a printed wordmark "LUMEN HOME", an unfolded flat die-cut sheet leaning behind it.`,
    ),
    'shipping-carton': shot(
      `Export-ready hero shot on a clean warehouse floor with soft light. Standard export shipping cartons stacked on a pallet and wrapped with strapping, printed with black shipping marks "MADE IN INDIA", "Gross Wt. 18 kg", a carton number and a small handling icon set, a clipboard with a packing list beside them.`,
    ),
  },
  'rigid-box': {
    'magnetic-closure-box': shot(
      `Luxurious unboxing hero shot on a deep-navy velvet surface with warm gold spotlights. A rigid box with a magnetic flap closure in matt navy with gold hot-foil lettering "ZARINA", the flap open and floating slightly, a satin-lined interior holding a gold necklace in a velvet cradle, a magnet visible in the flap edge, a second closed box in ivory beside it.`,
    ),
    'lift-off-lid-box': shot(
      `Classic gifting hero shot on a pale cream surface with soft light and a blush backdrop. A two-piece rigid box with the lid lifted off in rose-pink and white with a gold ribbon, the base holding hand-wrapped chocolates and a folded card, crisp wrapped edges, a second box in sage green beside it. The picture is a pure photograph filling the whole frame: no banner, no footer strip, no address, no phone number, no website and no social handle anywhere in the image.`,
    ),
    'drawer-box': shot(
      `Elegant stationery hero shot on a light oak surface with soft side light. A rigid drawer box in deep teal with a gold foil sleeve and a satin ribbon pull, the tray half-slid out revealing a set of fountain pens in a velvet insert, a second drawer box in cream with a gold monogram beside it.`,
    ),
    'book-style-box': shot(
      `Refined gift hero shot on a dark wood surface with warm golden light. A rigid book-style box that opens like a hardcover book, in forest-green cloth with gold foil lettering "THE TEA LIBRARY" on the spine and cover, open to reveal a neat set of tea tins in a cut-out tray and a satin ribbon page-marker, a second closed copy beside it.`,
    ),
    'shoulder-neck-box': shot(
      `Premium cosmetics hero shot on a pale marble surface with soft pink backlight. A rigid shoulder-neck box in matt white with a rose-gold foil wordmark "LUMIERE", the lid lifted to show the raised neck and a skincare bottle in a moulded insert, a second box in sage green with a silver foil line and a pink peony beside it.`,
    ),
    'gift-set-box': shot(
      `Festive hamper hero shot on a rich burgundy cloth with golden diya light. A rigid gift-set box with compartments and inserts holding a mini tea tin, a jar of honey, a bar of chocolate and a small candle, in maroon and gold with the wordmark "TOHFA" in gold foil, a satin ribbon, a card and dried orange slices at the edges.`,
    ),
  },
  'flex-banner': {
    'outdoor-flex-banner': shot(
      `Eye-catching storefront hero shot on a sunny street with a blurred traffic bokeh behind. A large outdoor flex banner stretched on a shopfront hoarding with metal eyelets and tied rope, a bold red and yellow design for a fictional electronics shop with the wordmark "SHREE ELECTRONICS", "FESTIVE SALE · UP TO 40% OFF", a photograph of a TV and a phone, the vibrant colours glowing in the sunlight.`,
    ),
    'indoor-promotional-banner': shot(
      `Retail-store hero shot inside a modern shop with soft indoor lighting. A sharp indoor promotional banner hung from the ceiling in a fashion store, a trendy pink and navy design with a model-free lifestyle graphic and the headline "NEW COLLECTION", "Flat 30% Off", a rack of clothes blurred behind.`,
    ),
    'roll-up-standee': shot(
      `Corporate-event hero shot in a bright conference lobby with soft daylight. Two roll-up standees on silver bases, one printed in teal and white for a fictional bank "TRUSTLINE FINANCE" with a smiling-family-free abstract graphic and the headline "Loans from 8.5%", another in orange with "Scan to Know More", a registration desk blurred behind.`,
    ),
    'backdrop-banner': shot(
      `Glamorous stage hero shot at an awards night with warm spotlights and a red carpet. A large step-and-repeat backdrop banner with a repeating pattern of an event logo "ANNUAL AWARDS 2027" in gold on deep navy, a podium and a pair of microphones on stage in front, soft stage lighting.`,
    ),
    'event-signage': shot(
      `Lively festival hero shot at a bright outdoor event with colourful bunting blurred behind. A set of printed event signage: a floor-standing welcome sign "WELCOME TO UTSAV 2027", a directional flex sign with arrows "Food Court →", "Stage ←" and "Parking ↑", and a table-top banner with "REGISTRATION", in a vibrant saffron, magenta and teal design.`,
    ),
  },
};
