/**
 * Every individual service (product page) in the catalogue.
 * Generated from the original 20 service pages, now data-driven:
 * pages live at /services/<category>/<service> and read from here.
 */
export interface ServiceItem {
  slug: string;
  categorySlug: string;
  title: string;
  summary: string;
  /** public image paths — the first one is the cover */
  images: string[];
  types: string[];
  advantages: string[];
}

export const serviceCatalog: ServiceItem[] = [
  {
    "slug": "visiting-card-letterhead-envelope",
    "categorySlug": "cards-and-stationery",
    "title": "Visiting Card, Letterhead, Envelope",
    "summary": "Professional design and print services for visiting cards, letterheads, and envelopes.",
    "images": [
      "/images/Card/design-n-print-product-12-1.png",
      "/images/Card/latterpadyellow.jpeg",
      "/images/Card/LetterPad.png"
    ],
    "types": [
      "Standard & Premium Visiting Cards",
      "Corporate Letterheads",
      "Customized Envelopes (Window/Non-window)",
      "Textured & Special Finish Papers",
      "Personalized Stationery Sets",
      "Non-tearable card (NT card)",
      "Art card",
      "Art card with lamination",
      "Matt card",
      "Matt + UV card",
      "SILVER METALIC CARD"
    ],
    "advantages": [
      "Essential branding for businesses",
      "Custom sizes, fonts & logo placements",
      "Multiple paper quality options",
      "Professional appearance and packaging",
      "Perfect for offices, freelancers, and professionals"
    ]
  },
  {
    "slug": "digital-visiting-card",
    "categorySlug": "cards-and-stationery",
    "title": "Digital Visiting Card",
    "summary": "We provide customized Digital Visiting Cards that are eco-friendly, sharable, and help leave a lasting impression. Share your contact and business details with a single tap or scan.",
    "images": [
      "/images/Card/digital-visiting-card.png"
    ],
    "types": [
      "NFC Enabled Digital Cards",
      "QR Code Based Visiting Cards",
      "Customized Branded Designs",
      "Multi-language Cards",
      "Interactive & Clickable Cards"
    ],
    "advantages": [
      "Eco-friendly & paperless",
      "Easy to share via QR code or link",
      "Modern & stylish designs",
      "Real-time updatable information",
      "Clickable contact details (Call, Email, Social Media)",
      "No printing cost every time you update details",
      "Impress clients with tech-savvy branding"
    ]
  },
  {
    "slug": "certificate",
    "categorySlug": "cards-and-stationery",
    "title": "Certificate",
    "summary": "Elegant and formal certificate designs perfect for educational institutions, corporate achievements, and awards.",
    "images": [
      "/images/Card/certificate.png"
    ],
    "types": [
      "Appreciation Certificates",
      "Achievement Awards",
      "Training Completion Certificates",
      "Participation Certificates",
      "Customized School/College Certificates"
    ],
    "advantages": [
      "Professional and elegant layout",
      "Custom branding and logos",
      "High-resolution print quality",
      "Various paper and size options",
      "Option for digital or print formats",
      "Perfect for events and milestones"
    ]
  },
  {
    "slug": "brochure-designing-printing",
    "categorySlug": "brochures-and-flyers",
    "title": "Brochure Designing & Printing",
    "summary": "Creative and professional brochure designs that showcase your business, services, or products in a visually engaging and informative way.",
    "images": [
      "/images/Card/BrochureDesigning.png"
    ],
    "types": [
      "Bi-Fold Brochures",
      "Tri-Fold Brochures",
      "Gate-Fold Brochures",
      "Z-Fold Brochures",
      "Booklet Style Brochures",
      "Flyers and Pamphlets"
    ],
    "advantages": [
      "Attractive and brand-consistent layouts",
      "Informative and well-structured content design",
      "High-quality paper and finish options",
      "Perfect for marketing and promotions",
      "Portable and easy to distribute",
      "Cost-effective bulk printing"
    ]
  },
  {
    "slug": "pamphlet-design-printing",
    "categorySlug": "brochures-and-flyers",
    "title": "Pamphlet Design & Printing",
    "summary": "Eye-catching pamphlet designs with top quality print solutions for all businesses.",
    "images": [
      "/images/Card/pamphlet.jpg"
    ],
    "types": [
      "Single-page Pamphlets",
      "Bi-fold Pamphlets",
      "Tri-fold Pamphlets",
      "Z-fold Pamphlets",
      "Custom-shaped Pamphlets"
    ],
    "advantages": [
      "High-quality printing with vibrant colors",
      "Various folding options",
      "Cost-effective marketing tool",
      "Quick turnaround time",
      "Custom sizes and paper types available"
    ]
  },
  {
    "slug": "booklet-designing-printing",
    "categorySlug": "brochures-and-flyers",
    "title": "Booklet Designing & Printing",
    "summary": "We offer high-quality booklet designing and printing services tailored to your brand. Whether it's for a company profile, product catalog, or event guide, our booklets help communicate your message effectively and professionally.",
    "images": [
      "/images/Card/booklet.jpg"
    ],
    "types": [
      "Company Profile Booklets",
      "Product Catalogs",
      "Training Manuals",
      "Event & Program Booklets",
      "Educational Booklets",
      "Promotional Booklets"
    ],
    "advantages": [
      "Professional layout and design",
      "High-quality printing on premium paper",
      "Various binding options (staple, spiral, perfect bind)",
      "Custom sizes and finishes",
      "Ideal for marketing, presentations, and events",
      "Brand consistency across all pages",
      "Bulk printing options available"
    ]
  },
  {
    "slug": "product-catalogue",
    "categorySlug": "brochures-and-flyers",
    "title": "Product Catalogue",
    "summary": "Custom product catalogue design and print services to showcase your offerings.",
    "images": [
      "/images/Card/product_catalogue.jpg"
    ],
    "types": [
      "Printed Product Catalogues",
      "Digital Catalogues",
      "Interactive E-Catalogues",
      "Custom Size Catalogues",
      "Multi-language Catalogues"
    ],
    "advantages": [
      "Professional layout and design",
      "High-quality printing on premium paper",
      "Customizable formats and sizes",
      "Ideal for marketing and sales presentations",
      "Bulk printing options available"
    ]
  },
  {
    "slug": "calendar",
    "categorySlug": "brochures-and-flyers",
    "title": "Calendar Printing",
    "summary": "Calendar printing makes it possible to create brand impressions in homes and workspaces for at least a year. Modern Printers may be the right solution for you. Few advertisements in any format can make the same claim. For this reason, custom wall calendars, Card Calendars, Poster Calendars are extremely popular as promotional giveaways, especially during the holidays. For small businesses, the multiple pages offer a variety of promotional opportunities.",
    "images": [
      "/images/Card/calender.png"
    ],
    "types": [
      "Wall Calendar Printing",
      "Poster Calendars",
      "Magnetic Calendar",
      "Card Calendar"
    ],
    "advantages": [
      "Keep your brand visible for a whole year",
      "Matte and gloss finishes",
      "Photo quality printing on premium paper",
      "Thick cover option",
      "Impressive full color printing",
      "Wallet size & larger",
      "Impressive high gloss UV finish"
    ]
  },
  {
    "slug": "box-designing-printing",
    "categorySlug": "boxes-and-packaging",
    "title": "Box Designing & Printing",
    "summary": "Premium and durable box designing and printing services that ensure your product stands out on shelves and leaves a lasting impression on customers.",
    "images": [
      "/images/Card/box_designing.png"
    ],
    "types": [
      "Custom Product Boxes",
      "Rigid Boxes",
      "Corrugated Boxes",
      "Display Boxes",
      "Gift Boxes",
      "Mailer Boxes"
    ],
    "advantages": [
      "Eye-catching and brand-specific designs",
      "Variety of shapes and sizes",
      "Durable and eco-friendly materials",
      "Perfect for product protection and presentation",
      "Supports branding and marketing goals",
      "Available in matte, gloss, and UV finish"
    ]
  },
  {
    "slug": "pharmaceutical-medicine-boxes",
    "categorySlug": "boxes-and-packaging",
    "title": "Pharmaceutical Medicine Boxes",
    "summary": "Custom pharmaceutical packaging boxes that meet medical standards.",
    "images": [
      "/images/Card/pharma_box.jpg"
    ],
    "types": [
      "Tablet Boxes",
      "Syrup Boxes",
      "Injection Boxes",
      "Capsule Boxes",
      "Custom Medicine Packaging"
    ],
    "advantages": [
      "Compliance with pharmaceutical regulations",
      "Secure and tamper-evident packaging",
      "Customizable sizes and designs",
      "High-quality printing for clear labeling",
      "Bulk production capabilities"
    ]
  },
  {
    "slug": "cosmetic-item-box-sticker-printing",
    "categorySlug": "boxes-and-packaging",
    "title": "Cosmetic Item Box & Sticker Printing",
    "summary": "Add elegance and uniqueness to your cosmetic packaging with stylish box and sticker printing tailored to beauty and skincare brands.",
    "images": [
      "/images/Card/cosmetic_item.png"
    ],
    "types": [
      "Custom Cosmetic Boxes",
      "Makeup Packaging Boxes",
      "Skincare Product Stickers",
      "Label Stickers for Jars & Bottles",
      "Perfume Box Packaging"
    ],
    "advantages": [
      "High-resolution printing with fine details",
      "Custom shapes and sizes for boxes & labels",
      "Waterproof and smudge-proof stickers",
      "Luxury finishes (glossy, matte, foil stamping)",
      "Boosts product shelf appeal and brand recall"
    ]
  },
  {
    "slug": "pesticide-label-and-box",
    "categorySlug": "boxes-and-packaging",
    "title": "Pesticide Label and Box",
    "summary": "High-quality pesticide label and box printing for agricultural brands.",
    "images": [
      "/images/Card/pesticide.jpg"
    ],
    "types": [
      "Pesticide Packaging Boxes",
      "Chemical Product Labels",
      "Agricultural Product Boxes",
      "Custom Die-cut Labels",
      "Waterproof Labels"
    ],
    "advantages": [
      "Compliance with industry standards",
      "Durable and weather-resistant materials",
      "High-resolution printing for clear information",
      "Customizable designs and sizes",
      "Bulk printing options available"
    ]
  },
  {
    "slug": "sticker-label-designing-printing",
    "categorySlug": "stickers-and-labels",
    "title": "Sticker & Label Designing & Printing",
    "summary": "Custom sticker and label printing solutions tailored to your needs.",
    "images": [
      "/images/Card/sticker_label.png"
    ],
    "types": [
      "Product Labels",
      "Product Stickers",
      "Branding Stickers",
      "Barcode & QR Code Stickers",
      "Waterproof Vinyl Stickers",
      "Transparent & Matte Finish Stickers",
      "Pesticide Stickers"
    ],
    "advantages": [
      "Ideal for packaging and branding",
      "Custom shapes and sizes",
      "Waterproof and scratch-resistant options",
      "Strong adhesive backing for durability",
      "Bulk printing with high quality"
    ]
  },
  {
    "slug": "company-file-folder",
    "categorySlug": "files-and-folders",
    "title": "Company File & Folder",
    "summary": "Make a professional impression with custom file and folder designs, perfect for office presentations, branding, and client meetings.",
    "images": [
      "/images/Card/company_file_folder.jpg"
    ],
    "types": [
      "Corporate File Folders",
      "Document Holders",
      "Custom Business Folders",
      "Flap Folders with Slots",
      "Clip and Spiral File Folders",
      "Doctor File"
    ],
    "advantages": [
      "Elegant corporate designs",
      "Sturdy and professional build",
      "Custom branding and logo placement",
      "Supports A4 and legal-size documents",
      "Ideal for proposals, reports, and meetings"
    ]
  },
  {
    "slug": "doctor-file",
    "categorySlug": "files-and-folders",
    "title": "Doctor File",
    "summary": "Specialized doctor file printing for hospitals and clinics.",
    "images": [
      "/images/Card/doctor_file.jpg"
    ],
    "types": [
      "Patient Record Files",
      "Prescription Files",
      "Diagnostic Report Files",
      "Customized Hospital Files",
      "Multi-compartment Files"
    ],
    "advantages": [
      "Durable and high-quality materials",
      "Customizable with hospital branding",
      "Organized sections for easy record-keeping",
      "Available in various sizes and formats",
      "Bulk printing options for large institutions"
    ]
  },
  {
    "slug": "laminates-mica-folder-designing-printing",
    "categorySlug": "files-and-folders",
    "title": "Laminates Mica Folder Designing & Printing",
    "summary": "High-quality mica folder designing & printing for laminates and more.",
    "images": [
      "/images/Card/laminate_mica.png"
    ],
    "types": [
      "Sample Display Folders",
      "Product Catalog Folders",
      "Swatch Book Folders",
      "Custom Design Folders",
      "Branded Presentation Folders"
    ],
    "advantages": [
      "Elegant and professional presentation",
      "Durable materials for long-term use",
      "Customizable layouts and designs",
      "Ideal for showcasing laminate samples",
      "Enhances brand image and product appeal"
    ]
  },
  {
    "slug": "ceramic-mockup-design",
    "categorySlug": "files-and-folders",
    "title": "Ceramic Mockup Design",
    "summary": "Get realistic and stylish ceramic mockups that enhance your product presentation for marketing, online listings, and portfolio purposes.",
    "images": [
      "/images/Card/ceramic_mockup.png"
    ],
    "types": [
      "Mug Mockups",
      "Plates and Bowls",
      "Ceramic Jar Mockups",
      "Bottle and Vase Mockups",
      "Custom Shape Ceramics"
    ],
    "advantages": [
      "High-quality and photo-realistic designs",
      "Ideal for eCommerce and branding",
      "Multiple views and angles",
      "Editable to match product branding",
      "Print-ready mockup files"
    ]
  },
  {
    "slug": "cotton-pouch-designing-printing",
    "categorySlug": "pouches-and-display",
    "title": "Cotton Pouch Designing & Printing",
    "summary": "Sustainable and stylish cotton pouch designs that are ideal for gifting, product packaging, and promotional giveaways.",
    "images": [
      "/images/Card/cotton_pouch.jpg"
    ],
    "types": [
      "Cotton Seeds Pouches",
      "Drawstring Cotton Pouches",
      "Zipper Pouches",
      "Branded Cotton Bags",
      "Customized Gift Pouches",
      "Reusable Carry Pouches",
      "Pesticide Pouches",
      "Spices Pouches",
      "Customized Pouches",
      "Standee Pouches"
    ],
    "advantages": [
      "Luxury finishes (glossy, Matte, Metallic)",
      "Eco-friendly and reusable material",
      "Attractive custom prints",
      "Ideal for small product packaging",
      "Lightweight yet durable",
      "Perfect for gifting and events"
    ]
  },
  {
    "slug": "customize-pouch-designing-printing",
    "categorySlug": "pouches-and-display",
    "title": "Customize Pouch Designing & Printing",
    "summary": "Design your own stylish and functional pouches with full customization options. Ideal for food, cosmetics, and retail products.",
    "images": [
      "/images/Card/customize_pouch.png"
    ],
    "types": [
      "Stand-up Pouches",
      "Ziplock Pouches",
      "Window Pouches",
      "Flat Bottom Pouches",
      "Kraft Paper & Plastic Pouches"
    ],
    "advantages": [
      "Custom size, shape, and finish",
      "Perfect for retail & product branding",
      "Moisture-proof and food-safe materials",
      "High-quality, vibrant printing",
      "Flexible order quantity (small to bulk)"
    ]
  },
  {
    "slug": "flex-banner-roller-standee-printing",
    "categorySlug": "pouches-and-display",
    "title": "Flex Banner & Roller Standee Printing",
    "summary": "Large format flex banners and roll-up standee print solutions.",
    "images": [
      "/images/Card/flex_banner.png"
    ],
    "types": [
      "Outdoor Flex Banners",
      "Indoor Promotional Banners",
      "Roll-up Standees",
      "Backdrop Banners",
      "Event Signage"
    ],
    "advantages": [
      "High-resolution printing",
      "Weather-resistant materials",
      "Easy to install and transport",
      "Custom sizes and designs",
      "Ideal for events, promotions, and advertisements"
    ]
  }
];

export function getServiceHref(serviceSlug: string): string {
  const service = serviceCatalog.find((item) => item.slug === serviceSlug);
  return service ? `/services/${service.categorySlug}/${service.slug}` : '/services';
}

export function getServicesByCategory(categorySlug: string): ServiceItem[] {
  return serviceCatalog.filter((item) => item.categorySlug === categorySlug);
}

export function findService(categorySlug: string, serviceSlug: string): ServiceItem | undefined {
  return serviceCatalog.find((item) => item.categorySlug === categorySlug && item.slug === serviceSlug);
}
