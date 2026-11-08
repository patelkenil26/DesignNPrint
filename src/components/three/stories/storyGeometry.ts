import * as THREE from 'three';

/** Rounded rectangle centred on the origin (used for cards, folders, pouches). */
export function createRoundedRectShape(width: number, height: number, radius: number): THREE.Shape {
  const left = -width / 2;
  const bottom = -height / 2;
  const shape = new THREE.Shape();
  shape.moveTo(left + radius, bottom);
  shape.lineTo(left + width - radius, bottom);
  shape.quadraticCurveTo(left + width, bottom, left + width, bottom + radius);
  shape.lineTo(left + width, bottom + height - radius);
  shape.quadraticCurveTo(left + width, bottom + height, left + width - radius, bottom + height);
  shape.lineTo(left + radius, bottom + height);
  shape.quadraticCurveTo(left, bottom + height, left, bottom + height - radius);
  shape.lineTo(left, bottom + radius);
  shape.quadraticCurveTo(left, bottom, left + radius, bottom);
  return shape;
}

/** Re-maps UVs of a shape geometry to 0 → 1 across its bounding box (so a canvas texture fits exactly). */
export function normalizeFaceUv(geometry: THREE.BufferGeometry, width: number, height: number): void {
  const positions = geometry.attributes.position;
  const uvs = geometry.attributes.uv;
  for (let index = 0; index < positions.count; index += 1) {
    uvs.setXY(index, positions.getX(index) / width + 0.5, positions.getY(index) / height + 0.5);
  }
  uvs.needsUpdate = true;
}

export interface BoardGeometries {
  /** bevelled, rounded slab — carries the paper-edge colour */
  body: THREE.ExtrudeGeometry;
  /** rounded face (front or back print) laid on the slab */
  face: THREE.ShapeGeometry;
  /** z distance at which a print face should sit */
  faceOffset: number;
}

/** A real printed board: rounded corners, bevelled edge, separate printable faces. */
export function createBoardGeometries(width: number, height: number, radius: number, thickness: number): BoardGeometries {
  const shape = createRoundedRectShape(width, height, radius);
  const bevel = Math.min(0.006, thickness / 3);
  const body = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 2,
    curveSegments: 10,
  });
  body.translate(0, 0, -thickness / 2);

  const face = new THREE.ShapeGeometry(shape, 10);
  normalizeFaceUv(face, width, height);

  return { body, face, faceOffset: thickness / 2 + bevel + 0.0005 };
}

/** Standard ease-out-back (soft overshoot) — gives drops and pops a premium "settle". */
export function easeOutBack(t: number): number {
  const clamped = Math.min(1, Math.max(0, t));
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(clamped - 1, 3) + c1 * Math.pow(clamped - 1, 2);
}

export function easeOutCubic(t: number): number {
  const clamped = Math.min(1, Math.max(0, t));
  return 1 - Math.pow(1 - clamped, 3);
}

export function easeInOutCubic(t: number): number {
  const clamped = Math.min(1, Math.max(0, t));
  return clamped < 0.5 ? 4 * clamped * clamped * clamped : 1 - Math.pow(-2 * clamped + 2, 3) / 2;
}
