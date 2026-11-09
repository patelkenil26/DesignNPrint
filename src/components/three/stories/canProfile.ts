import * as THREE from 'three';

/** Aluminium can dimensions + lathe profiles, shared by the Category Stories can and the hero can. */
export const CAN_RADIUS = 0.62;
export const BODY_BOTTOM = 0.14;
export const BODY_TOP = 1.72;
/** total can height (bottom of the base to top of the rim) */
export const CAN_HEIGHT = 2.04;

export const BOTTOM_PROFILE: Array<[number, number]> = [
  [0, 0.13],
  [0.26, 0.11],
  [0.38, 0.05],
  [0.44, 0],
  [0.5, 0],
  [0.55, 0.04],
  [0.6, 0.1],
  [CAN_RADIUS, BODY_BOTTOM],
];

export const TOP_PROFILE: Array<[number, number]> = [
  [CAN_RADIUS, BODY_TOP],
  [0.6, 1.8],
  [0.55, 1.9],
  [0.505, 1.97],
  [0.495, 2.02],
  [0.47, 2.04],
  [0.46, 2.0],
  [0.4, 1.985],
  [0, 1.985],
];

export const toLathePoints = (profile: Array<[number, number]>): THREE.Vector2[] =>
  profile.map(([x, y]) => new THREE.Vector2(x, y));
