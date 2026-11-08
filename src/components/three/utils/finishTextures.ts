import * as THREE from 'three';
import type { FinishId } from '@/data/homeData';
import { siteConfig } from '@/data/siteConfig';
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
  toColorTexture,
  toDataTexture,
} from './canvasKit';

export const CARD_SIZE = { width: 3.5, height: 2, thickness: 0.05 } as const;

const CANVAS_WIDTH = 1400;
const CANVAS_HEIGHT = Math.round((CANVAS_WIDTH * CARD_SIZE.height) / CARD_SIZE.width);

export interface FinishMaterialSpec {
  map: THREE.Texture;
  roughnessMap: THREE.Texture;
  metalnessMap: THREE.Texture;
  bumpMap: THREE.Texture;
  bumpScale: number;
  sheen: number;
}

export interface FinishTextureSet {
  finishes: Record<FinishId, FinishMaterialSpec>;
  back: THREE.Texture;
  grain: THREE.Texture;
  palette: BrandPalette;
  dispose: () => void;
}

function paintCardText(context: CanvasRenderingContext2D, palette: BrandPalette, textColor: string): void {
  context.save();
  context.fillStyle = textColor;
  context.textAlign = 'left';
  context.font = `700 ${CANVAS_HEIGHT * 0.062}px sans-serif`;
  context.fillText('YOUR NAME', CANVAS_WIDTH * 0.08, CANVAS_HEIGHT * 0.72);
  context.globalAlpha = 0.75;
  context.font = `500 ${CANVAS_HEIGHT * 0.04}px sans-serif`;
  context.fillText('Founder & Director', CANVAS_WIDTH * 0.08, CANVAS_HEIGHT * 0.78);
  context.textAlign = 'right';
  context.fillText(siteConfig.phoneDisplay, CANVAS_WIDTH * 0.92, CANVAS_HEIGHT * 0.72);
  context.fillText(siteConfig.email, CANVAS_WIDTH * 0.92, CANVAS_HEIGHT * 0.78);
  context.restore();
  drawCmykStrip(context, CANVAS_WIDTH * 0.08, CANVAS_HEIGHT * 0.9, CANVAS_WIDTH * 0.2, CANVAS_HEIGHT * 0.025, palette);
}

function drawStripes(context: CanvasRenderingContext2D, color: string): void {
  context.save();
  context.strokeStyle = color;
  context.lineWidth = 18;
  for (let offset = -CANVAS_HEIGHT; offset < CANVAS_WIDTH; offset += 64) {
    context.beginPath();
    context.moveTo(offset, CANVAS_HEIGHT);
    context.lineTo(offset + CANVAS_HEIGHT, 0);
    context.stroke();
  }
  context.restore();
}

function createBlurredMask(mask: HTMLCanvasElement | null): HTMLCanvasElement {
  const canvas = createFlatMap(CANVAS_WIDTH, CANVAS_HEIGHT, 0);
  const context = get2dContext(canvas);
  context.filter = 'blur(7px)';
  drawLogo(context, mask, CANVAS_WIDTH / 2, CANVAS_HEIGHT * 0.38, CANVAS_WIDTH * 0.56, 'rgb(255,255,255)');
  context.filter = 'none';
  return canvas;
}

export async function buildFinishTextures(palette: BrandPalette): Promise<FinishTextureSet> {
  const logoMask = await loadLogoMask();
  const logoWidth = CANVAS_WIDTH * 0.56;
  const logoCenter: [number, number] = [CANVAS_WIDTH / 2, CANVAS_HEIGHT * 0.38];
  const grain = createPaperGrain();
  const flatBump = () => toDataTexture(createFlatMap(CANVAS_WIDTH, CANVAS_HEIGHT, 0));

  const makeBase = (background: string) => {
    const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    const context = get2dContext(canvas);
    context.fillStyle = background;
    context.fillRect(0, 0, canvas.width, canvas.height);
    return { canvas, context };
  };

  /* ── Soft-touch velvet: deep matte ink, silky sheen ── */
  const velvet = makeBase(palette.ink);
  drawLogo(velvet.context, logoMask, ...logoCenter, logoWidth, palette.paper);
  paintCardText(velvet.context, palette, palette.paperDeep);

  /* ── Spot UV: gloss logo + stripes on a matte field ── */
  const spot = makeBase(palette.ink);
  drawStripes(spot.context, palette.inkSoft);
  drawLogo(spot.context, logoMask, ...logoCenter, logoWidth, palette.paperDeep);
  paintCardText(spot.context, palette, palette.paperDeep);
  const spotRough = createFlatMap(CANVAS_WIDTH, CANVAS_HEIGHT, 232);
  const spotRoughContext = get2dContext(spotRough);
  drawStripes(spotRoughContext, 'rgb(18,18,18)');
  drawLogo(spotRoughContext, logoMask, ...logoCenter, logoWidth, 'rgb(18,18,18)');

  /* ── Foil: metallic gold logo ── */
  const foil = makeBase(palette.ink);
  drawLogo(foil.context, logoMask, ...logoCenter, logoWidth, (tint, w, h) => createFoilGradient(tint, w, h, palette));
  paintCardText(foil.context, palette, palette.foilLight);
  const foilRough = createFlatMap(CANVAS_WIDTH, CANVAS_HEIGHT, 225);
  drawLogo(get2dContext(foilRough), logoMask, ...logoCenter, logoWidth, 'rgb(45,45,45)');
  const foilMetal = createFlatMap(CANVAS_WIDTH, CANVAS_HEIGHT, 0);
  drawLogo(get2dContext(foilMetal), logoMask, ...logoCenter, logoWidth, 'rgb(255,255,255)');

  /* ── Emboss: blind-embossed logo on coloured stock ── */
  const emboss = makeBase(palette.blue);
  drawLogo(emboss.context, logoMask, ...logoCenter, logoWidth, palette.blue);
  paintCardText(emboss.context, palette, palette.ink);

  const back = makeBase(palette.ink);
  drawLogo(back.context, logoMask, CANVAS_WIDTH / 2, CANVAS_HEIGHT * 0.45, CANVAS_WIDTH * 0.4, (tint, w, h) => createFoilGradient(tint, w, h, palette));

  const matteRough = () => toDataTexture(createFlatMap(CANVAS_WIDTH, CANVAS_HEIGHT, 238));
  const noMetal = () => toDataTexture(createFlatMap(CANVAS_WIDTH, CANVAS_HEIGHT, 0));

  const finishes: Record<FinishId, FinishMaterialSpec> = {
    velvet: {
      map: toColorTexture(velvet.canvas),
      roughnessMap: matteRough(),
      metalnessMap: noMetal(),
      bumpMap: flatBump(),
      bumpScale: 0,
      sheen: 1,
    },
    spotUv: {
      map: toColorTexture(spot.canvas),
      roughnessMap: toDataTexture(spotRough),
      metalnessMap: noMetal(),
      bumpMap: flatBump(),
      bumpScale: 0,
      sheen: 0.2,
    },
    foil: {
      map: toColorTexture(foil.canvas),
      roughnessMap: toDataTexture(foilRough),
      metalnessMap: toDataTexture(foilMetal),
      bumpMap: flatBump(),
      bumpScale: 0,
      sheen: 0.2,
    },
    emboss: {
      map: toColorTexture(emboss.canvas),
      roughnessMap: toDataTexture(createFlatMap(CANVAS_WIDTH, CANVAS_HEIGHT, 190)),
      metalnessMap: noMetal(),
      bumpMap: toDataTexture(createBlurredMask(logoMask)),
      bumpScale: 9,
      sheen: 0.3,
    },
  };

  const backTexture = toColorTexture(back.canvas);
  return {
    finishes,
    back: backTexture,
    grain,
    palette,
    dispose: () => {
      Object.values(finishes).forEach((spec) =>
        disposeAll([spec.map, spec.roughnessMap, spec.metalnessMap, spec.bumpMap]),
      );
      disposeAll([backTexture, grain]);
    },
  };
}
