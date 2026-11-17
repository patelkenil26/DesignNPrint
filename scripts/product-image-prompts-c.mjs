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
    'printed-bopp-bag': shot(
      `Glossy retail hero shot on a clean white surface with a soft peach backdrop. A set of printed BOPP bags for a fictional bakery with a vibrant full-colour design of golden bread and croissants, the wordmark "GOLDEN CRUST BAKERY" and a heart icon, a glossy film with soft reflections, a bag open showing a fresh loaf, a few flour sprinkles and wheat ears.`,
    ),
    'self-adhesive-bopp-bag': shot(
      `Clean packaging hero shot on a pale surface with a soft sky-blue backdrop. Clear BOPP bags with a self-adhesive peel-and-seal strip being closed, a folded white shirt in one bag, a printed small logo "THREADWORKS" in black, a peeled liner strip curling on the table, and a stack of bags with a ready-to-seal flap.`,
    ),
    'zip-lock-bopp-bag': shot(
      `Fresh hero shot on a bright surface with a soft mint backdrop. Resealable zip-lock BOPP bags with a printed pattern and a blue zipper track, filled with colourful baby socks and toys, the printed wordmark "LITTLE STEPS" in pink and blue, bags hung neatly in a row, shiny film and crisp print.`,
    ),
    'flap-bopp-bag': shot(
      `Neat presentation hero shot on a pale surface with a soft lilac backdrop. Clear BOPP bags with a tuck-in flap and a printed header card in coral reading "RANGOLI COLOURS", holding bright rangoli powder packets in a tidy stack, crisp folded flaps, a pile of loose coloured powder in front.`,
    ),
    'loop-handle-bopp-bag': shot(
      `Retail-counter hero shot on a warm wooden counter with soft shop lights. Loop-handle BOPP bags with a printed festive design in saffron and magenta and the wordmark "UTSAV BOUTIQUE", carried by die-cut loop handles, one bag holding a folded dupatta and a small gift box, another bag standing empty.`,
    ),
    'garment-retail-bag': shot(
      `Boutique-fashion hero shot on a pale linen surface with a soft blush backdrop. A set of garment-sized BOPP bags in matt and gloss finish with a printed minimal wordmark "VASTRA" and a thin gold line, filled with neatly folded kurtas and a shirt on hangers, a small tag and a hanger beside them.`,
    ),
    'food-packaging-bag': shot(
      `Mouth-watering snack hero shot on a bright surface with a warm yellow backdrop. Glossy printed BOPP snack bags in red and yellow with a photograph of crispy namkeen, the wordmark "CRUNCHY WALA" and "Masala Mix · 200 g · ₹40", a few spilled snacks and a green chilli in front, a clean heat-sealed top.`,
    ),
  },
  'corrugated-box': {
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
