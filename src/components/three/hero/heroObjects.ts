import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { BODY_BOTTOM, BODY_TOP, BOTTOM_PROFILE, CAN_HEIGHT, CAN_RADIUS, TOP_PROFILE, toLathePoints } from '../stories/canProfile';
import { createBoardGeometries, createRoundedRectShape, normalizeFaceUv } from '../stories/storyGeometry';
import { ArtColor, HeroArt } from './heroArt';
import { RevealUniforms, applyReveal } from './revealMaterial';

/**
 * The print products that fly into the hero. Every builder returns a small, recognisable
 * model (origin at its centre, front facing +z, roughly 1–1.6 units tall) whose materials
 * all share one `RevealUniforms`, so the colour can be poured over it later.
 */
export interface HeroObjectDef {
  id: string;
  label: string;
  color: ArtColor;
  build: (art: HeroArt, uniforms: RevealUniforms) => THREE.Group;
}

interface Kit {
  std: (parameters: THREE.MeshStandardMaterialParameters) => THREE.MeshStandardMaterial;
  glossy: (parameters: THREE.MeshPhysicalMaterialParameters) => THREE.MeshPhysicalMaterial;
  matte: (texture: THREE.Texture) => THREE.MeshStandardMaterial;
  paperEdge: THREE.MeshStandardMaterial;
}

function createKit(art: HeroArt, uniforms: RevealUniforms): Kit {
  return {
    std: (parameters) => applyReveal(new THREE.MeshStandardMaterial({ roughness: 0.7, ...parameters }), uniforms),
    glossy: (parameters) =>
      applyReveal(new THREE.MeshPhysicalMaterial({ roughness: 0.3, clearcoat: 0.6, clearcoatRoughness: 0.18, ...parameters }), uniforms),
    // printed paper stock: fine fibre grain + a thin soft-touch lamination layer on top
    matte: (texture) =>
      applyReveal(
        new THREE.MeshPhysicalMaterial({
          map: texture,
          roughness: 0.62,
          bumpMap: art.grain,
          bumpScale: 0.5,
          clearcoat: 0.22,
          clearcoatRoughness: 0.45,
          sheen: 0.4,
          sheenRoughness: 0.6,
        }),
        uniforms,
      ),
    paperEdge: applyReveal(new THREE.MeshStandardMaterial({ color: art.palette.paper, roughness: 0.85, bumpMap: art.grain, bumpScale: 0.6 }), uniforms),
  };
}

/** Printed surface whose foil parts (logo, border, tagline) are real, reflective metallic foil. */
function foilPrint(kit: Kit, art: HeroArt, kind: 'cover' | 'plain', color: ArtColor, aspect: number): THREE.MeshStandardMaterial {
  const foil = art.makeFoil(kind, color, aspect);
  const material = kit.matte(art.make(kind, color, aspect));
  material.metalness = 1;
  material.metalnessMap = foil.metalness;
  material.roughnessMap = foil.roughness;
  material.envMapIntensity = 1.8;
  return material;
}

/** Rounded paper/board slab with a printed front and back. */
function slab(
  width: number,
  height: number,
  thickness: number,
  radius: number,
  front: THREE.Material,
  back: THREE.Material,
  edge: THREE.Material,
): THREE.Group {
  const board = createBoardGeometries(width, height, radius, thickness);
  const group = new THREE.Group();
  group.add(new THREE.Mesh(board.body, edge));
  const frontFace = new THREE.Mesh(board.face, front);
  frontFace.position.z = board.faceOffset;
  group.add(frontFace);
  const backFace = new THREE.Mesh(board.face, back);
  backFace.position.z = -board.faceOffset;
  backFace.rotation.y = Math.PI;
  group.add(backFace);
  return group;
}

/** Puffy rounded bag body (pouch / BOPP bag): bevelled extrusion with a printed front face. */
function puffyBag(
  width: number,
  height: number,
  depth: number,
  frontTexture: THREE.Texture,
  kit: Kit,
  bodyColor: string,
  glossy: boolean,
): THREE.Group {
  const shape = createRoundedRectShape(width, height, 0.07);
  const bevel = depth * 0.55;
  const body = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel * 0.6,
    bevelSegments: 6,
    curveSegments: 8,
  });
  body.translate(0, 0, -depth / 2);
  const face = new THREE.ShapeGeometry(shape, 8);
  normalizeFaceUv(face, width, height);

  const material = glossy
    ? kit.glossy({ map: frontTexture, roughness: 0.18, metalness: 0.15 })
    : kit.std({ map: frontTexture, roughness: 0.55 });
  const bodyMaterial = glossy ? kit.glossy({ color: bodyColor, roughness: 0.2 }) : kit.std({ color: bodyColor, roughness: 0.6 });

  const group = new THREE.Group();
  group.add(new THREE.Mesh(body, bodyMaterial));
  const frontFace = new THREE.Mesh(face, material);
  frontFace.position.z = depth / 2 + bevel + 0.002;
  group.add(frontFace);
  return group;
}

function shade(hex: string, lightness: number): string {
  const color = new THREE.Color(hex);
  const hsl = { h: 0, s: 0, l: 0 };
  color.getHSL(hsl);
  color.setHSL(hsl.h, hsl.s, THREE.MathUtils.clamp(hsl.l + lightness, 0, 1));
  return `#${color.getHexString()}`;
}

function addMesh(parent: THREE.Object3D, geometry: THREE.BufferGeometry, material: THREE.Material | THREE.Material[], position: [number, number, number]): THREE.Mesh {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  parent.add(mesh);
  return mesh;
}

const buildVisitingCard: HeroObjectDef['build'] = (art, uniforms) => {
  const kit = createKit(art, uniforms);
  return slab(1.7, 1.0, 0.035, 0.06, foilPrint(kit, art, 'cover', 'blue', 1.7), kit.matte(art.make('plain', 'ink', 1.7)), kit.paperEdge);
};

const buildBrochure: HeroObjectDef['build'] = (art, uniforms) => {
  const kit = createKit(art, uniforms);
  const panelWidth = 0.52;
  const panelHeight = 1.35;
  const makePanel = (color: ArtColor, kind: 'cover' | 'paper') =>
    slab(panelWidth, panelHeight, 0.012, 0.015, kind === 'cover' ? foilPrint(kit, art, 'cover', color, panelWidth / panelHeight) : kit.matte(art.make(kind, color, panelWidth / panelHeight)), kit.matte(art.make('paper', 'red', panelWidth / panelHeight)), kit.paperEdge);

  const group = new THREE.Group();
  group.add(makePanel('red', 'cover'));

  const left = new THREE.Group();
  left.position.x = -panelWidth / 2;
  const leftPanel = makePanel('red', 'paper');
  leftPanel.position.x = -panelWidth / 2;
  left.add(leftPanel);
  left.rotation.y = 0.65;
  group.add(left);

  const right = new THREE.Group();
  right.position.x = panelWidth / 2;
  const rightPanel = makePanel('red', 'paper');
  rightPanel.position.x = panelWidth / 2;
  right.add(rightPanel);
  right.rotation.y = -0.65;
  group.add(right);
  return group;
};

const buildFlyer: HeroObjectDef['build'] = (art, uniforms) => {
  const kit = createKit(art, uniforms);
  return slab(1.0, 1.4, 0.012, 0.012, kit.matte(art.make('poster', 'yellow', 1 / 1.4)), kit.matte(art.make('paper', 'yellow', 1 / 1.4)), kit.paperEdge);
};

/** Printed aluminium can: same lathe profile as the Category Stories can (rolled rim, domed base, pull tab). */
const buildCan: HeroObjectDef['build'] = (art, uniforms) => {
  const kit = createKit(art, uniforms);
  const canScale = 0.66;
  const group = new THREE.Group();
  const can = new THREE.Group();

  const bodyMaterial = kit.glossy({
    map: art.make('can', 'ink', (2 * Math.PI * CAN_RADIUS) / (BODY_TOP - BODY_BOTTOM), 2048),
    metalness: 0.75,
    roughness: 0.28,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
    envMapIntensity: 1.9,
    bumpMap: art.dew,
    bumpScale: 1.4,
  });
  const metal = kit.glossy({ color: art.palette.paperDeep, metalness: 1, roughness: 0.2, clearcoat: 0, envMapIntensity: 2.2, side: THREE.DoubleSide });

  addMesh(can, new THREE.CylinderGeometry(CAN_RADIUS, CAN_RADIUS, BODY_TOP - BODY_BOTTOM, 128, 1, true), bodyMaterial, [0, (BODY_TOP + BODY_BOTTOM) / 2, 0]);
  addMesh(can, new THREE.LatheGeometry(toLathePoints(BOTTOM_PROFILE), 96), metal, [0, 0, 0]);
  addMesh(can, new THREE.LatheGeometry(toLathePoints(TOP_PROFILE), 96), metal, [0, 0, 0]);
  addMesh(can, new THREE.TorusGeometry(0.485, 0.03, 16, 96), metal, [0, 2.035, 0]).rotation.x = Math.PI / 2;

  const tabShape = new THREE.Shape();
  tabShape.absellipse(0, 0, 0.17, 0.12, 0, Math.PI * 2, false, 0);
  const tabHole = new THREE.Path();
  tabHole.absellipse(0.05, 0, 0.07, 0.05, 0, Math.PI * 2, true, 0);
  tabShape.holes.push(tabHole);
  const tab = addMesh(can, new THREE.ExtrudeGeometry(tabShape, { depth: 0.012, bevelEnabled: false, curveSegments: 28 }), metal, [-0.08, 1.998, 0]);
  tab.rotation.x = -Math.PI / 2;
  addMesh(can, new THREE.CylinderGeometry(0.035, 0.035, 0.03, 20), metal, [0, 1.99, 0]);

  // centre the can on its origin, then size it like the other products; turn the printed side to the camera
  can.position.y = -CAN_HEIGHT / 2;
  group.add(can);
  group.scale.setScalar(canScale);
  // the wrap repeats its logo at 25% / 75% of the circumference: turn one of them to face the camera
  can.rotation.y = -Math.PI / 2 + 0.12;
  return group;
};

const buildLetterhead: HeroObjectDef['build'] = (art, uniforms) => {
  const kit = createKit(art, uniforms);
  return slab(1.05, 1.45, 0.01, 0.01, kit.matte(art.make('paper', 'blue', 1.05 / 1.45)), kit.matte(art.make('plain', 'ink', 1)), kit.paperEdge);
};

const buildEnvelope: HeroObjectDef['build'] = (art, uniforms) => {
  const kit = createKit(art, uniforms);
  const group = slab(1.6, 1.0, 0.03, 0.02, kit.matte(art.make('paper', 'red', 1.6)), kit.matte(art.make('plain', 'red', 1.6)), kit.paperEdge);
  const flapShape = new THREE.Shape();
  flapShape.moveTo(-0.8, 0.5);
  flapShape.lineTo(0.8, 0.5);
  flapShape.lineTo(0, -0.08);
  flapShape.closePath();
  const flap = addMesh(group, new THREE.ShapeGeometry(flapShape), kit.std({ color: art.palette.red, roughness: 0.65, side: THREE.DoubleSide }), [0, 0, 0.024]);
  flap.castShadow = false;
  return group;
};

function foilSticker(kit: Kit, art: HeroArt): THREE.MeshStandardMaterial {
  const foil = art.makeFoil('rings', 'blue', 1);
  const material = kit.glossy({ map: art.make('rings', 'blue', 1), roughness: 0.6, metalness: 1 });
  material.metalnessMap = foil.metalness;
  material.roughnessMap = foil.roughness;
  material.envMapIntensity = 1.8;
  return material;
}

const buildSticker: HeroObjectDef['build'] = (art, uniforms) => {
  const kit = createKit(art, uniforms);
  const geometry = new THREE.CylinderGeometry(0.62, 0.62, 0.014, 64);
  geometry.rotateX(Math.PI / 2);
  const group = new THREE.Group();
  addMesh(group, geometry, [kit.paperEdge, foilSticker(kit, art), kit.paperEdge], [0, 0, 0]);
  return group;
};

const buildFile: HeroObjectDef['build'] = (art, uniforms) => {
  const kit = createKit(art, uniforms);
  const aspect = 1.15 / 1.5;
  const group = new THREE.Group();
  const back = slab(1.15, 1.5, 0.035, 0.03, kit.matte(art.make('plain', 'green', aspect)), kit.matte(art.make('plain', 'green', aspect)), kit.paperEdge);
  group.add(back);
  const sheet = slab(1.0, 1.35, 0.01, 0.005, kit.matte(art.make('paper', 'green', 1 / 1.35)), kit.matte(art.make('paper', 'green', 1 / 1.35)), kit.paperEdge);
  sheet.position.set(0.04, 0.02, 0.03);
  group.add(sheet);
  const hinge = new THREE.Group();
  hinge.position.x = -0.575;
  const cover = slab(1.15, 1.5, 0.035, 0.03, foilPrint(kit, art, 'cover', 'green', aspect), kit.matte(art.make('plain', 'green', aspect)), kit.paperEdge);
  cover.position.x = 0.575;
  hinge.add(cover);
  hinge.rotation.y = -0.85;
  hinge.position.z = 0.05;
  group.add(hinge);
  return group;
};

const buildBox: HeroObjectDef['build'] = (art, uniforms) => {
  const kit = createKit(art, uniforms);
  const group = new THREE.Group();
  const front = foilPrint(kit, art, 'cover', 'red', 1.5 / 0.7);
  const side = kit.matte(art.make('plain', 'red', 1));
  // unprinted board inside the box: warm ivory with visible fibre grain
  const top = kit.std({ color: art.palette.paper, roughness: 0.88, bumpMap: art.grain, bumpScale: 0.7, emissive: art.palette.paper, emissiveIntensity: 0.1 });
  // real boxes have softened, bevelled edges
  addMesh(group, new RoundedBoxGeometry(1.5, 0.7, 1.0, 4, 0.04), [side, side, top, side, front, front], [0, -0.1, 0]);

  const lidHinge = new THREE.Group();
  lidHinge.position.set(0, 0.28, -0.5);
  const lidFront = foilPrint(kit, art, 'cover', 'red', 1.56 / 0.2);
  const lid = addMesh(lidHinge, new RoundedBoxGeometry(1.56, 0.2, 1.06, 4, 0.035), [side, side, lidFront, top, lidFront, lidFront], [0, 0.1, 0.53]);
  lid.castShadow = false;
  lidHinge.rotation.x = -0.9;
  group.add(lidHinge);
  return group;
};

const buildBook: HeroObjectDef['build'] = (art, uniforms) => {
  const kit = createKit(art, uniforms);
  const pages = kit.std({ color: '#fbfaf6', roughness: 0.9 });
  const spine = kit.matte(art.make('plain', 'green', 0.3));
  const group = new THREE.Group();
  addMesh(
    group,
    new THREE.BoxGeometry(1.0, 1.4, 0.32),
    [pages, spine, pages, pages, kit.glossy({ map: art.make('cover', 'green', 1 / 1.4), roughness: 0.4, clearcoat: 0.4 }), kit.matte(art.make('plain', 'green', 1))],
    [0, 0, 0],
  );
  return group;
};

const buildBillBook: HeroObjectDef['build'] = (art, uniforms) => {
  const kit = createKit(art, uniforms);
  const group = new THREE.Group();
  const stackEdge = kit.matte(art.make('paper', 'yellow', 1));
  const cover = foilPrint(kit, art, 'cover', 'red', 1.45);
  addMesh(group, new THREE.BoxGeometry(1.45, 1.0, 0.3), [stackEdge, stackEdge, stackEdge, stackEdge, cover, kit.matte(art.make('plain', 'red', 1.45))], [0, -0.04, 0]);
  addMesh(group, new THREE.BoxGeometry(1.47, 0.14, 0.32), kit.std({ color: art.palette.ink, roughness: 0.35, metalness: 0.3 }), [0, 0.5, 0]);
  return group;
};

const buildLabelRoll: HeroObjectDef['build'] = (art, uniforms) => {
  const kit = createKit(art, uniforms);
  const group = new THREE.Group();
  const outerGeometry = new THREE.CylinderGeometry(0.55, 0.55, 0.5, 48, 1, true);
  outerGeometry.rotateX(Math.PI / 2);
  addMesh(group, outerGeometry, kit.glossy({ map: art.make('stripes', 'blue', 3), roughness: 0.3, side: THREE.DoubleSide }), [0, 0, 0]);
  const coreGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.5, 32, 1, true);
  coreGeometry.rotateX(Math.PI / 2);
  addMesh(group, coreGeometry, kit.std({ color: '#b79a6c', side: THREE.DoubleSide }), [0, 0, 0]);
  [0.25, -0.25].forEach((z) => {
    const ring = addMesh(group, new THREE.RingGeometry(0.2, 0.55, 48), kit.std({ color: '#f1efe9', roughness: 0.8 }), [0, 0, z]);
    if (z < 0) ring.rotation.y = Math.PI;
  });
  return group;
};

const buildPouch: HeroObjectDef['build'] = (art, uniforms) => {
  const kit = createKit(art, uniforms);
  // metallised stand-up pouch: glossy film, crimped top seal
  const group = puffyBag(0.95, 1.4, 0.1, art.make('stripes', 'yellow', 0.95 / 1.4), kit, shade(art.palette.yellow, -0.12), true);
  addMesh(group, new THREE.BoxGeometry(0.95, 0.06, 0.2), kit.glossy({ color: shade(art.palette.yellow, -0.2), metalness: 0.6, roughness: 0.3 }), [0, 0.6, 0]);
  return group;
};

const buildBoppBag: HeroObjectDef['build'] = (art, uniforms) => {
  const kit = createKit(art, uniforms);
  const group = puffyBag(0.9, 1.5, 0.2, art.make('stripes', 'blue', 0.9 / 1.5), kit, art.palette.blue, true);
  const crimp = kit.glossy({ color: '#d7dbe2', metalness: 0.7, roughness: 0.3 });
  addMesh(group, new THREE.BoxGeometry(0.98, 0.1, 0.12), crimp, [0, 0.74, 0]);
  addMesh(group, new THREE.BoxGeometry(0.98, 0.1, 0.12), crimp, [0, -0.74, 0]);
  return group;
};

const buildCalendar: HeroObjectDef['build'] = (art, uniforms) => {
  const kit = createKit(art, uniforms);
  const group = new THREE.Group();
  const frontArt = foilPrint(kit, art, 'cover', 'green', 1.35 / 1.0);
  const front = slab(1.35, 1.0, 0.03, 0.03, frontArt, kit.matte(art.make('plain', 'green', 1)), kit.paperEdge);
  front.rotation.x = -0.14;
  group.add(front);
  const stand = slab(1.2, 0.8, 0.025, 0.02, kit.matte(art.make('plain', 'green', 1.2 / 0.8)), kit.matte(art.make('plain', 'green', 1.2 / 0.8)), kit.paperEdge);
  stand.position.set(0, -0.12, -0.32);
  stand.rotation.x = 0.55;
  group.add(stand);
  const ringMaterial = kit.std({ color: art.palette.ink, metalness: 0.6, roughness: 0.3 });
  for (let index = 0; index < 8; index += 1) {
    const ring = addMesh(group, new THREE.TorusGeometry(0.06, 0.012, 8, 16), ringMaterial, [-0.56 + index * 0.16, 0.5, 0.02]);
    ring.rotation.y = Math.PI / 2;
  }
  return group;
};

const buildHangTag: HeroObjectDef['build'] = (art, uniforms) => {
  const kit = createKit(art, uniforms);
  const group = slab(0.72, 1.15, 0.025, 0.07, foilPrint(kit, art, 'cover', 'yellow', 0.72 / 1.15), kit.matte(art.make('plain', 'yellow', 0.72 / 1.15)), kit.paperEdge);
  const ink = kit.std({ color: art.palette.ink, metalness: 0.5, roughness: 0.4 });
  addMesh(group, new THREE.TorusGeometry(0.06, 0.016, 8, 24), ink, [0, 0.46, 0.02]);
  const string = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.46, 0.02),
    new THREE.Vector3(0.12, 0.72, 0.04),
    new THREE.Vector3(-0.02, 0.9, 0.0),
    new THREE.Vector3(-0.14, 0.7, 0.03),
  ]);
  addMesh(group, new THREE.TubeGeometry(string, 20, 0.008, 6), kit.std({ color: art.palette.red }), [0, 0, 0]);
  return group;
};

const buildTapeRoll: HeroObjectDef['build'] = (art, uniforms) => {
  const kit = createKit(art, uniforms);
  const group = new THREE.Group();
  addMesh(group, new THREE.TorusGeometry(0.5, 0.2, 24, 56), kit.glossy({ color: art.palette.yellow, roughness: 0.2 }), [0, 0, 0]);
  addMesh(group, new THREE.CylinderGeometry(0.3, 0.3, 0.3, 32, 1, true).rotateX(Math.PI / 2), kit.std({ color: '#b79a6c', side: THREE.DoubleSide }), [0, 0, 0]);
  return group;
};

const buildCarryBag: HeroObjectDef['build'] = (art, uniforms) => {
  const kit = createKit(art, uniforms);
  const group = new THREE.Group();
  const front = foilPrint(kit, art, 'cover', 'red', 1.1 / 1.25);
  const side = kit.matte(art.make('plain', 'red', 1));
  const top = kit.std({ color: art.palette.red, roughness: 0.7 });
  addMesh(group, new THREE.BoxGeometry(1.1, 1.1, 0.45), [side, side, top, top, front, front], [0, -0.1, 0]);
  const rope = kit.std({ color: art.palette.paper, roughness: 0.8 });
  [0.12, -0.12].forEach((z) => {
    addMesh(group, new THREE.TorusGeometry(0.28, 0.018, 8, 24, Math.PI), rope, [0, 0.45, z]);
  });
  return group;
};

const buildAcrylicBoard: HeroObjectDef['build'] = (art, uniforms) => {
  const kit = createKit(art, uniforms);
  const group = new THREE.Group();
  addMesh(
    group,
    new THREE.BoxGeometry(1.4, 1.0, 0.05),
    kit.glossy({ color: '#ffffff', roughness: 0.06, transparent: true, opacity: 0.38, clearcoat: 1 }),
    [0, 0, 0],
  );
  const print = new THREE.PlaneGeometry(1.15, 0.78);
  addMesh(group, print, kit.matte(art.make('poster', 'green', 1.15 / 0.78)), [0, 0, 0.032]);
  const standoff = kit.std({ color: '#cfd3da', metalness: 0.9, roughness: 0.25 });
  [-0.62, 0.62].forEach((x) => {
    [-0.42, 0.42].forEach((y) => {
      const cap = addMesh(group, new THREE.CylinderGeometry(0.045, 0.045, 0.09, 20), standoff, [x, y, 0.06]);
      cap.rotation.x = Math.PI / 2;
    });
  });
  return group;
};

const buildFlexBanner: HeroObjectDef['build'] = (art, uniforms) => {
  const kit = createKit(art, uniforms);
  const group = slab(2.1, 0.85, 0.016, 0.01, kit.matte(art.make('poster', 'blue', 2.1 / 0.85)), kit.matte(art.make('plain', 'blue', 2)), kit.paperEdge);
  const eyelet = kit.std({ color: '#cfd3da', metalness: 0.9, roughness: 0.28 });
  [-0.95, 0, 0.95].forEach((x) => {
    [-0.37, 0.37].forEach((y) => addMesh(group, new THREE.TorusGeometry(0.03, 0.011, 8, 16), eyelet, [x, y, 0.012]));
  });
  return group;
};

export const heroObjects: HeroObjectDef[] = [
  { id: 'acrylic-board', label: 'Acrylic Boards', color: 'green', build: buildAcrylicBoard },
  { id: 'flex-banner', label: 'Flex Banners', color: 'blue', build: buildFlexBanner },
  { id: 'visiting-card', label: 'Visiting Cards', color: 'blue', build: buildVisitingCard },
  { id: 'brochure', label: 'Brochures', color: 'red', build: buildBrochure },
  { id: 'flyer', label: 'Pamphlets & Flyers', color: 'yellow', build: buildFlyer },
  { id: 'can', label: 'Printed Cans', color: 'green', build: buildCan },
  { id: 'letterhead', label: 'Letterhead', color: 'blue', build: buildLetterhead },
  { id: 'envelope', label: 'Envelope', color: 'red', build: buildEnvelope },
  { id: 'sticker', label: 'Stickers & Labels', color: 'blue', build: buildSticker },
  { id: 'file', label: 'Files & Folders', color: 'green', build: buildFile },
  { id: 'box', label: 'Boxes & Packaging', color: 'red', build: buildBox },
  { id: 'book', label: 'Book', color: 'green', build: buildBook },
  { id: 'bill-book', label: 'Challan / bill book', color: 'red', build: buildBillBook },
  { id: 'label-roll', label: 'Label', color: 'blue', build: buildLabelRoll },
  { id: 'pouch', label: 'Pouches', color: 'yellow', build: buildPouch },
  { id: 'bopp-bag', label: 'BOPP bag', color: 'blue', build: buildBoppBag },
  { id: 'calendar', label: 'Calendar', color: 'green', build: buildCalendar },
  { id: 'hang-tag', label: 'Hang tag', color: 'yellow', build: buildHangTag },
  { id: 'tape', label: 'Packaging tape', color: 'yellow', build: buildTapeRoll },
  { id: 'carry-bag', label: 'Carry bag', color: 'red', build: buildCarryBag },
];
