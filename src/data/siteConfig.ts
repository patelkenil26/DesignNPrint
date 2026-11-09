/** Central business constants — change here, the whole site updates. */
export const siteConfig = {
  name: 'Design N Print',
  foundedYear: 2008,
  whatsappNumber: '919725281074',
  phoneDisplay: '+91 97252 81074',
  secondaryPhoneNumber: '919913290354',
  secondaryPhoneDisplay: '+91 99132 90354',
  email: 'designnprintsamd@gmail.com',
  location: 'Naroda GIDC, Ahmedabad',
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
