import * as THREE from 'three';
import {
  BrandPalette,
  createCanvas,
  createFlatMap,
  createFoilGradient,
  createPaperGrain,
  disposeAll,
  drawCmykStrip,
  drawLogo,
  get2dContext,
  loadLogoMask,
  rotateCanvas,
  toColorTexture,
  toDataTexture,
} from './canvasKit';

/* ───────────────────────── Box dimensions (world units) ───────────────────────── */

export interface BoxDims {
  width: number;
  depth: number;
  height: number;
  lip: number;
  thickness: number;
}

export const BOX_DIMS: BoxDims = { width: 2.6, depth: 1.7, height: 1.1, lip: 0.45, thickness: 0.03 };

export type PanelKey = 'base' | 'left' | 'right' | 'front' | 'back' | 'lid' | 'lip';

export interface PbrMaps {
  map: THREE.Texture;
  roughnessMap: THREE.Texture;
  metalnessMap: THREE.Texture;
}

export interface BoxTextureSet {
  inside: Record<PanelKey, THREE.Texture>;
  outside: Record<PanelKey, PbrMaps>;
  grain: THREE.Texture;
  palette: BrandPalette;
  dispose: () => void;
}

const PIXELS_PER_UNIT = 340;

/* ───────────────────────── Painting helpers ───────────────────────── */

type HingeEdge = 'top' | 'bottom' | 'left' | 'right';

function drawRegistrationMark(context: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string): void {
  context.save();
  context.strokeStyle = color;
  context.lineWidth = Math.max(1.5, radius * 0.12);
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.moveTo(x - radius * 1.5, y);
  context.lineTo(x + radius * 1.5, y);
  context.moveTo(x, y - radius * 1.5);
  context.lineTo(x, y + radius * 1.5);
  context.stroke();
  context.restore();
}

function drawCrease(context: CanvasRenderingContext2D, width: number, height: number, edge: HingeEdge): void {
  const inset = 7;
  context.save();
  context.strokeStyle = 'rgba(0,0,0,0.38)';
  context.lineWidth = 2;
  context.setLineDash([12, 9]);
  context.beginPath();
  if (edge === 'top') {
    context.moveTo(0, inset);
    context.lineTo(width, inset);
  } else if (edge === 'bottom') {
    context.moveTo(0, height - inset);
    context.lineTo(width, height - inset);
  } else if (edge === 'left') {
    context.moveTo(inset, 0);
    context.lineTo(inset, height);
  } else {
    context.moveTo(width - inset, 0);
    context.lineTo(width - inset, height);
  }
  context.stroke();
  context.restore();
}

function paintInside(
  widthUnits: number,
  heightUnits: number,
  baseColor: string,
  hinge: HingeEdge,
  palette: BrandPalette,
): THREE.Texture {
  const canvas = createCanvas(widthUnits * PIXELS_PER_UNIT, heightUnits * PIXELS_PER_UNIT);
  const context = get2dContext(canvas);
  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, baseColor);
  gradient.addColorStop(1, baseColor);
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // soft vignette so flat colour still feels printed on paper
  const vignette = context.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    canvas.height * 0.1,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width * 0.7,
  );
  vignette.addColorStop(0, 'rgba(255,255,255,0.16)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.22)');
  context.fillStyle = vignette;
  context.fillRect(0, 0, canvas.width, canvas.height);

  drawCrease(context, canvas.width, canvas.height, hinge);
  const markRadius = Math.min(canvas.width, canvas.height) * 0.05;
  const farX = hinge === 'left' ? canvas.width - markRadius * 2.4 : markRadius * 2.4;
  const farY = hinge === 'top' ? canvas.height - markRadius * 2.4 : markRadius * 2.4;
  drawRegistrationMark(context, farX, farY, markRadius, palette.ink);

  return toColorTexture(canvas);
}

function paintBaseInside(width: number, depth: number, logoMask: HTMLCanvasElement | null, palette: BrandPalette): THREE.Texture {
  const canvas = createCanvas(width * PIXELS_PER_UNIT, depth * PIXELS_PER_UNIT);
  const context = get2dContext(canvas);

  const background = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  background.addColorStop(0, palette.inkSoft);
  background.addColorStop(1, palette.ink);
  context.fillStyle = background;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // diagonal foil hairlines — a premium business-card feel
  context.save();
  context.globalAlpha = 0.07;
  context.strokeStyle = palette.foilLight;
  context.lineWidth = 2;
  for (let offset = -canvas.height; offset < canvas.width; offset += 26) {
    context.beginPath();
    context.moveTo(offset, canvas.height);
    context.lineTo(offset + canvas.height, 0);
    context.stroke();
  }
  context.restore();

  drawLogo(
    context,
    logoMask,
    canvas.width / 2,
    canvas.height * 0.42,
    canvas.width * 0.6,
    (tint, w, h) => createFoilGradient(tint, w, h, palette),
  );

  drawCmykStrip(context, canvas.width * 0.2, canvas.height * 0.7, canvas.width * 0.6, canvas.height * 0.028, palette);

  context.fillStyle = palette.paperDeep;
  context.globalAlpha = 0.75;
  context.font = `500 ${canvas.height * 0.045}px sans-serif`;
  context.textBaseline = 'alphabetic';
  context.textAlign = 'left';
  context.fillText('designnprint.in', canvas.width * 0.07, canvas.height * 0.92);
  context.textAlign = 'right';
  context.fillText('Naroda GIDC, Ahmedabad', canvas.width * 0.93, canvas.height * 0.92);
  context.globalAlpha = 1;

  const markRadius = canvas.height * 0.035;
  drawRegistrationMark(context, markRadius * 3, markRadius * 3, markRadius, palette.paperDeep);
  drawRegistrationMark(context, canvas.width - markRadius * 3, markRadius * 3, markRadius, palette.paperDeep);

  return toColorTexture(canvas);
}

interface OutsideSpec {
  visibleWidth: number;
  visibleHeight: number;
  turn: 'cw' | 'ccw' | 'flip' | 'none';
  design: 'hero' | 'back' | 'side' | 'lip' | 'plain';
}

function paintOutside(spec: OutsideSpec, logoMask: HTMLCanvasElement | null, palette: BrandPalette): PbrMaps {
  const width = spec.visibleWidth * PIXELS_PER_UNIT;
  const height = spec.visibleHeight * PIXELS_PER_UNIT;

  const color = createCanvas(width, height);
  const roughness = createFlatMap(width, height, 214);
  const metalness = createFlatMap(width, height, 0);
  const colorContext = get2dContext(color);
  const roughContext = get2dContext(roughness);
  const metalContext = get2dContext(metalness);

  if (spec.design === 'lip') {
    drawCmykStrip(colorContext, 0, 0, color.width, color.height, palette);
  } else {
    const background = colorContext.createRadialGradient(width / 2, height / 2, height * 0.1, width / 2, height / 2, width * 0.75);
    background.addColorStop(0, palette.inkSoft);
    background.addColorStop(1, palette.ink);
    colorContext.fillStyle = background;
    colorContext.fillRect(0, 0, width, height);
  }

  const stampLogo = (centerX: number, centerY: number, logoWidth: number) => {
    drawLogo(colorContext, logoMask, centerX, centerY, logoWidth, (tint, w, h) => createFoilGradient(tint, w, h, palette));
    drawLogo(roughContext, logoMask, centerX, centerY, logoWidth, 'rgb(22,22,22)'); // glossy spot-UV / foil
    drawLogo(metalContext, logoMask, centerX, centerY, logoWidth, 'rgb(255,255,255)'); // metallic foil
  };

  if (spec.design === 'hero') {
    stampLogo(width / 2, height * 0.45, width * 0.56);
    drawCmykStrip(colorContext, width * 0.4, height * 0.86, width * 0.2, height * 0.035, palette);
  } else if (spec.design === 'back') {
    stampLogo(width / 2, height * 0.38, width * 0.3);
    colorContext.fillStyle = palette.paperDeep;
    colorContext.globalAlpha = 0.85;
    colorContext.font = `500 ${height * 0.075}px sans-serif`;
    colorContext.textAlign = 'center';
    colorContext.fillText('Designed & printed in Ahmedabad since 2008', width / 2, height * 0.68);
    colorContext.fillText('designnprint.in', width / 2, height * 0.82);
    colorContext.globalAlpha = 1;
  } else if (spec.design === 'side') {
    stampLogo(width / 2, height * 0.46, width * 0.62);
    drawCmykStrip(colorContext, width * 0.3, height * 0.84, width * 0.4, height * 0.045, palette);
  }

  return {
    map: toColorTexture(rotateCanvas(color, spec.turn)),
    roughnessMap: toDataTexture(rotateCanvas(roughness, spec.turn)),
    metalnessMap: toDataTexture(rotateCanvas(metalness, spec.turn)),
  };
}

/* ───────────────────────── Public builder ───────────────────────── */

export async function buildBoxTextures(palette: BrandPalette, dims: BoxDims = BOX_DIMS): Promise<BoxTextureSet> {
  const logoMask = await loadLogoMask();
  const { width, depth, height, lip, thickness } = dims;
  const lidWide = width + thickness;

  const inside: Record<PanelKey, THREE.Texture> = {
    base: paintBaseInside(width, depth, logoMask, palette),
    left: paintInside(height, depth, palette.blue, 'right', palette),
    right: paintInside(height, depth, palette.green, 'left', palette),
    front: paintInside(width, height, palette.yellow, 'top', palette),
    back: paintInside(width, height, palette.red, 'bottom', palette),
    lid: paintInside(lidWide, depth + thickness, palette.inkSoft, 'bottom', palette),
    lip: paintInside(lidWide, lip, palette.paper, 'bottom', palette),
  };

  const outside: Record<PanelKey, PbrMaps> = {
    base: paintOutside({ visibleWidth: width, visibleHeight: depth, turn: 'none', design: 'plain' }, logoMask, palette),
    front: paintOutside({ visibleWidth: width, visibleHeight: height, turn: 'none', design: 'hero' }, logoMask, palette),
    back: paintOutside({ visibleWidth: width, visibleHeight: height, turn: 'flip', design: 'back' }, logoMask, palette),
    right: paintOutside({ visibleWidth: depth, visibleHeight: height, turn: 'ccw', design: 'side' }, logoMask, palette),
    left: paintOutside({ visibleWidth: depth, visibleHeight: height, turn: 'cw', design: 'side' }, logoMask, palette),
    lid: paintOutside({ visibleWidth: lidWide, visibleHeight: depth + thickness, turn: 'none', design: 'hero' }, logoMask, palette),
    lip: paintOutside({ visibleWidth: lidWide, visibleHeight: lip, turn: 'none', design: 'lip' }, logoMask, palette),
  };

  const grain = createPaperGrain();

  return {
    inside,
    outside,
    grain,
    palette,
    dispose: () => {
      disposeAll(Object.values(inside));
      Object.values(outside).forEach((maps) => disposeAll([maps.map, maps.roughnessMap, maps.metalnessMap]));
      grain.dispose();
    },
  };
}
