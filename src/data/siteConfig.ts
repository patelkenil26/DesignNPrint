/** Central business constants — change here, the whole site updates. */
export const siteConfig = {
  name: 'Design N Print',
  /** production domain — used for canonical URLs, sitemap, Open Graph and structured data */
  siteUrl: 'https://designnprint.in',
  /** coordinates of the press (Google Maps pin) */
  geo: { latitude: 23.0685788, longitude: 72.64642 },
  /** the homepage's search identity — reused by layout, schema and share cards */
  seoTitle: 'Printing Press in Ahmedabad | Packaging & Cards | Design N Print',
  seoDescription:
    'Printing press in Naroda, Ahmedabad — offset printing and packaging: boxes, visiting cards, brochures, stickers, pouches. Design help, proof before print, delivery across Gujarat.',
  shareDescription:
    'Printing press in Ahmedabad — boxes, visiting cards, brochures, stickers and packaging, designed and printed under one roof since 2008.',
  seoKeywords: [
    'printing press in Ahmedabad',
    'printing press near me',
    'offset printing Ahmedabad',
    'packaging printing Ahmedabad',
    'box printing Ahmedabad',
    'visiting card printing Ahmedabad',
    'brochure printing Ahmedabad',
    'sticker printing Ahmedabad',
    'pharma carton printing Ahmedabad',
    'printing press in Naroda',
    'Naroda GIDC printing',
    'packaging box manufacturer Gujarat',
    'brochure printing Gujarat',
    'Design N Print',
  ],
  /** short brand tag lines — used in schema and the home SEO copy */
  taglines: [
    'Designed and printed under one roof.',
    'Print that you can feel.',
    'Your printing press in Ahmedabad since 2008.',
  ],
  /** Bing / Yandex IndexNow key — the same string is served at /<key>.txt (public/) */
  indexNowKey: 'b7d3f1a94c2e48d6a05f9e1c7b3a8d24',
  /** square brand mark (256×256) — used for share-card, schema logo and favicons */
  logoMarkPath: '/images/Logo/favicon-mark.png',
  /** full wordmark logo (967×259) */
  logoWordmarkPath: '/images/Logo/DesignNPrint.png',
  foundedYear: 2008,
  /** bump when page content is reviewed — feeds sitemap lastModified, schema dateModified and llms.txt */
  contentLastUpdated: '2026-11-12',
  /** other names customers (and Google Maps) use for the business — helps entity matching */
  alternateNames: ['Design N Prints', 'DesignNPrint'],
  slogan: 'Designed and printed under one roof.',
  whatsappNumber: '919725281074',
  phoneDisplay: '+91 97252 81074',
  secondaryPhoneNumber: '919913290354',
  secondaryPhoneDisplay: '+91 99132 90354',
  email: 'designnprintsamd@gmail.com',
  location: 'Ahmedabad',
  addressLines: [
    'Modern Corner, Opp. National Handloom,',
    'Nr. J R Amin Petrol Pump & Jolly Auto, Above Hira Auto,',
    'Naroda, Ahmedabad, Gujarat 382330',
  ],
  workingHours: [
    { label: 'Monday – Saturday', value: '10:00 AM – 7:00 PM' },
    { label: 'Sunday', value: 'Closed' },
  ],
  expressDispatch: '24–48 hrs',
  /** machine-readable version of `workingHours` (used for the live open / closed badge) */
  businessHours: {
    timeZone: 'Asia/Kolkata',
    openWeekdays: [1, 2, 3, 4, 5, 6],
    openHour: 10,
    closeHour: 19,
  },
  googlePlaceId: 'ChIJD_1aL2sKCGwRynL88rkay5s',
  /** public Google Business Profile / Maps listing */
  googleProfileUrl:
    'https://www.google.com/maps/search/?api=1&query=Design%20N%20Prints&query_place_id=ChIJD_1aL2sKCGwRynL88rkay5s',
  /** opens the "write a review" box for our Google Business Profile */
  googleReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJD_1aL2sKCGwRynL88rkay5s',
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14609.063528913262!2d72.6462253!3d23.0683253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6c080a6b2f5afd0f%3A0x9bcb1ab9f2fc72ca!2sDesign%20N%20Prints!5e0!3m2!1sen!2sin!4v1718798257421!5m2!1sen!2sin',
  mapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=23.0685788,72.64642',
  facebookUrl: 'https://www.facebook.com/share/19FYcyioTy/?mibextid=qi2Omg',
  instagramUrl: 'https://www.instagram.com/designnprints.in?igsh=MWRqaWNmNmFoYjZ0bw==',
} as const;

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function getYearsInBusiness(): number {
  return new Date().getFullYear() - siteConfig.foundedYear;
}
