/** Central business constants — change here, the whole site updates. */
export const siteConfig = {
  name: 'Design N Print',
  foundedYear: 2008,
  // NOTE: confirm the final WhatsApp / phone number with the client before launch.
  whatsappNumber: '919725281074',
  phoneDisplay: '+91 97252 81074',
  email: 'info@designnprint.in',
  location: 'Naroda GIDC, Ahmedabad',
  expressDispatch: '24–48 hrs',
  googlePlaceId: 'ChIJD_1aL2sKCGwRynL88rkay5s',
} as const;

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function getYearsInBusiness(): number {
  return new Date().getFullYear() - siteConfig.foundedYear;
}
