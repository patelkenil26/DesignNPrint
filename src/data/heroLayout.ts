/**
 * Hero product composition, in normalised screen units: nx / ny run from -1 to 1 across the
 * visible half-width / half-height, `depth` pushes the object towards (+) or away (−) from the camera.
 * Desktop keeps the copy on the left and the products on the right; phones put the copy on
 * top and the products in a loose grid underneath.
 * The six products mirror the six Category Stories (one hero piece per category), so the hero
 * is a preview of what follows. Order = the order the cursors start on them.
 */
export interface HeroSlot {
  nx: number;
  ny: number;
  depth: number;
  scale: number;
  /** resting tilt in radians [x, y, z] */
  tilt: [number, number, number];
}

export interface HeroPlacement {
  /** matches an id in src/components/three/hero/heroObjects.ts */
  id: string;
  desktop: HeroSlot;
  mobile: HeroSlot;
}

export const MOBILE_PRODUCT_COUNT = 6;

export const heroPlacements: HeroPlacement[] = [
  {
    // Boxes & Packaging — the hero piece
    id: 'box',
    desktop: { nx: 0.36, ny: -0.3, depth: 0.6, scale: 1.45, tilt: [0.36, -0.5, 0.04] },
    mobile: { nx: 0.42, ny: -0.2, depth: 0.2, scale: 0.7, tilt: [0.36, -0.5, 0.04] },
  },
  {
    // Stickers & Labels
    id: 'can',
    desktop: { nx: 0.8, ny: 0.06, depth: 1.0, scale: 1.4, tilt: [0.08, 0.2, 0.04] },
    mobile: { nx: -0.45, ny: -0.18, depth: 0.4, scale: 0.8, tilt: [0.08, 0.2, 0.04] },
  },
  {
    // Cards & Stationery
    id: 'visiting-card',
    desktop: { nx: 0.7, ny: 0.62, depth: 0.0, scale: 1.1, tilt: [0.18, -0.38, 0.14] },
    mobile: { nx: -0.45, ny: -0.58, depth: 0.2, scale: 0.7, tilt: [0.18, -0.38, 0.14] },
  },
  {
    // Brochures / Flyers
    id: 'brochure',
    desktop: { nx: 0.3, ny: 0.46, depth: -0.3, scale: 1.25, tilt: [0.1, 0.32, -0.06] },
    mobile: { nx: 0.42, ny: -0.58, depth: 0.0, scale: 0.7, tilt: [0.1, 0.32, -0.06] },
  },
  {
    // Files & Folders
    id: 'file',
    desktop: { nx: 0.64, ny: -0.66, depth: -0.2, scale: 1.1, tilt: [0.1, 0.25, 0.08] },
    mobile: { nx: -0.45, ny: -0.95, depth: 0.0, scale: 0.65, tilt: [0.1, 0.25, 0.08] },
  },
  {
    // Pouches & Display
    id: 'pouch',
    desktop: { nx: 0.93, ny: -0.58, depth: 0.0, scale: 1.15, tilt: [0.05, -0.35, 0.1] },
    mobile: { nx: 0.42, ny: -0.92, depth: 0.0, scale: 0.68, tilt: [0.05, -0.35, 0.1] },
  },
];
