/**
 * Client logos shown in the home-page "trusted by" band.
 *
 * To add a real logo: drop the file in `public/images/clients/` (SVG or transparent PNG, roughly 3:2) and set
 * `logo` to its path, e.g. `/images/clients/acme.png`. Entries with `logo: null` render a neutral placeholder tile.
 */
export interface ClientLogo {
  id: string;
  /** client name — used as the image alt text */
  name: string;
  /** path under /public, or null while the real logo is not available yet */
  logo: string | null;
}

export const clientLogos: ClientLogo[] = [
  { id: 'client-1', name: 'Client 1', logo: null },
  { id: 'client-2', name: 'Client 2', logo: null },
  { id: 'client-3', name: 'Client 3', logo: null },
  { id: 'client-4', name: 'Client 4', logo: null },
  { id: 'client-5', name: 'Client 5', logo: null },
  { id: 'client-6', name: 'Client 6', logo: null },
  { id: 'client-7', name: 'Client 7', logo: null },
  { id: 'client-8', name: 'Client 8', logo: null },
];
