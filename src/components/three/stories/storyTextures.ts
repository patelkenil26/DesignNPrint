import * as THREE from 'three';
import {
  BrandPalette,
  createCanvas,
  createFoilGradient,
  disposeAll,
  drawCmykStrip,
  drawLogo,
  get2dContext,
  loadLogoMask,
  toColorTexture,
  toDataTexture,
} from '../utils/canvasKit';
import { BOX_DIMS, BoxDims, BoxTextureSet, PbrMaps, buildBoxTextures } from '../utils/boxTextures';

/* ───────────────────────── Types ───────────────────────── */

export type StickerKind = 'thumb' | 'star' | 'heart' | 'badge' | 'burst';
export const STICKER_KINDS: StickerKind[] = ['thumb', 'star', 'heart', 'badge', 'burst'];

export const VERTICAL_BOX_DIMS: BoxDims = { width: 1.5, depth: 1.5, height: 2.4, lip: 0.45, thickness: 0.03 };

export interface BrochureTextures {
  /** back faces are pre-mirrored because they are rendered with BackSide */
  coverLeft: THREE.Texture;
  coverRight: THREE.Texture;
  backCover: THREE.Texture;
  innerLeft: THREE.Texture;
  innerCenter: THREE.Texture;
  innerRight: THREE.Texture;
}

export interface StoryTextures {
  palette: BrandPalette;
  canBody: THREE.Texture;
  canDew: THREE.Texture;
  canLabel: THREE.Texture;
  stickers: Record<StickerKind, THREE.Texture>;
  cards: PbrMaps[];
  cardBack: PbrMaps;
  brochure: BrochureTextures;
  flyers: THREE.Texture[];
  folderCover: PbrMaps;
  folderInner: THREE.Texture;
  folderPaper: THREE.Texture;
  pouchFront: THREE.Texture;
  pouchBack: THREE.Texture;
  pouchWeave: THREE.Texture;
  pouchTag: THREE.Texture;
  banner: THREE.Texture;
  boxHorizontal: BoxTextureSet;
  boxVertical: BoxTextureSet;
  dispose: () => void;
}

/** Shared props for every category story component. */
export interface StoryProps {
  /** 0 → 1: how far this chapter's build animation has played */
  build: { current: number };
  textures: StoryTextures;
}

/* ───────────────────────── Small drawing helpers ───────────────────────── */

type Ctx = CanvasRenderingContext2D;

function newPainter(width: number, height: number): { canvas: HTMLCanvasElement; ctx: Ctx } {
  const canvas = createCanvas(width, height);
  return { canvas, ctx: get2dContext(canvas) };
}

function setFont(ctx: Ctx, weight: number, size: number): void {
  ctx.font = `${weight} ${size}px "Segoe UI", Arial, sans-serif`;
}

function drawCenteredText(ctx: Ctx, text: string, x: number, y: number, color: string, weight: number, size: number): void {
  ctx.save();
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  setFont(ctx, weight, size);
  ctx.fillText(text, x, y);
  ctx.restore();
}

function drawLeftText(ctx: Ctx, text: string, x: number, y: number, color: string, weight: number, size: number): void {
  ctx.save();
  ctx.fillStyle = color;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  setFont(ctx, weight, size);
  ctx.fillText(text, x, y);
  ctx.restore();
}

function drawTextLines(ctx: Ctx, x: number, y: number, widths: number[], height: number, gap: number, color: string): void {
  ctx.save();
  ctx.fillStyle = color;
  widths.forEach((lineWidth, index) => {
    ctx.fillRect(x, y + index * (height + gap), lineWidth, height);
  });
  ctx.restore();
}

function fillBackground(ctx: Ctx, width: number, height: number, color: string): void {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
}

function mirrorCanvas(source: HTMLCanvasElement): HTMLCanvasElement {
  const { canvas, ctx } = newPainter(source.width, source.height);
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(source, 0, 0);
  return canvas;
}

function toPbr(color: HTMLCanvasElement, roughness: HTMLCanvasElement, metalness: HTMLCanvasElement): PbrMaps {
  return {
    map: toColorTexture(color),
    roughnessMap: toDataTexture(roughness),
    metalnessMap: toDataTexture(metalness),
  };
}

/* ───────────────────────── Aluminium can ───────────────────────── */

/** Periodic in U so the cylinder seam is invisible. */
function paintCanBody(palette: BrandPalette): THREE.Texture {
  const { canvas, ctx } = newPainter(2048, 640);
  const w = canvas.width;
  const h = canvas.height;

  const base = ctx.createLinearGradient(0, 0, 0, h);
  base.addColorStop(0, palette.ink);
  base.addColorStop(0.07, palette.red);
  base.addColorStop(0.5, palette.red);
  base.addColorStop(0.93, palette.red);
  base.addColorStop(1, palette.ink);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, w, h);

  // soft vertical sheen bands (integer cycles → seamless)
  for (let band = 0; band < 8; band += 1) {
    const x = (band / 8) * w;
    const sheen = ctx.createLinearGradient(x, 0, x + w / 16, 0);
    sheen.addColorStop(0, 'rgba(255,255,255,0)');
    sheen.addColorStop(0.5, 'rgba(255,255,255,0.07)');
    sheen.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = sheen;
    ctx.fillRect(x, 0, w / 16, h);
  }

  // thin CMYK micro-strip rings near the top and bottom
  [h * 0.1, h * 0.9].forEach((y) => {
    drawCmykStrip(ctx, 0, y - 5, w, 10, palette);
  });

  // repeating brand ring (6 repeats, scaled to fit exactly)
  const phrase = 'DESIGN N PRINT  ·  CUSTOM PRINTED CANS  ·  ';
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.textBaseline = 'middle';
  setFont(ctx, 700, 30);
  const phraseWidth = ctx.measureText(phrase).width;
  const repeats = 6;
  const stretch = w / (phraseWidth * repeats);
  ctx.scale(stretch, 1);
  for (let repeat = 0; repeat < repeats; repeat += 1) {
    ctx.fillText(phrase, repeat * phraseWidth, h * 0.955);
    ctx.fillText(phrase, repeat * phraseWidth, h * 0.045);
  }
  ctx.restore();

  return toColorTexture(canvas);
}

/** Condensation droplets as a bump map. */
function paintCanDew(): THREE.Texture {
  const { canvas, ctx } = newPainter(1024, 512);
  fillBackground(ctx, canvas.width, canvas.height, 'rgb(0,0,0)');
  for (let drop = 0; drop < 520; drop += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = 2.5 + Math.random() * Math.random() * 11;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.7, 'rgba(255,255,255,0.7)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(x, y, radius, radius * 1.18, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  const texture = toDataTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function paintCanLabel(palette: BrandPalette, logoMask: HTMLCanvasElement | null): THREE.Texture {
  const { canvas, ctx } = newPainter(1350, 700);
  const w = canvas.width;
  const h = canvas.height;
  fillBackground(ctx, w, h, palette.paper);

  // fine halftone dots for a printed feel
  ctx.save();
  ctx.fillStyle = 'rgba(16,17,20,0.05)';
  for (let y = 10; y < h; y += 20) {
    for (let x = 10 + ((y / 20) % 2) * 10; x < w; x += 20) {
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();

  // wave band
  const waveGradient = ctx.createLinearGradient(0, 0, w, h * 0.5);
  waveGradient.addColorStop(0, palette.blue);
  waveGradient.addColorStop(1, palette.ink);
  ctx.fillStyle = waveGradient;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(w, 0);
  ctx.lineTo(w, h * 0.5);
  for (let x = w; x >= 0; x -= 6) {
    ctx.lineTo(x, h * 0.5 + Math.sin(x / 90) * 28);
  }
  ctx.closePath();
  ctx.fill();

  ctx.save();
  ctx.globalAlpha = 0.28;
  ctx.fillStyle = palette.paper;
  ctx.beginPath();
  ctx.moveTo(0, h * 0.44);
  for (let x = 0; x <= w; x += 6) {
    ctx.lineTo(x, h * 0.44 + Math.sin(x / 70 + 1.4) * 20);
  }
  ctx.lineTo(w, h * 0.56);
  ctx.lineTo(0, h * 0.56);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  drawLeftText(ctx, 'PURE', w * 0.07, h * 0.15, palette.paper, 900, 138);
  drawLeftText(ctx, 'SPLASH', w * 0.07, h * 0.36, palette.yellow, 900, 138);
  drawLeftText(ctx, 'Sparkling Mineral Water', w * 0.07, h * 0.68, palette.ink, 700, 54);
  drawLeftText(ctx, '330 ML  ·  Chilled & Crisp', w * 0.07, h * 0.78, palette.ink, 500, 36);

  // badge
  ctx.fillStyle = palette.yellow;
  ctx.beginPath();
  ctx.arc(w * 0.8, h * 0.7, 124, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = palette.ink;
  ctx.beginPath();
  ctx.arc(w * 0.8, h * 0.7, 108, 0, Math.PI * 2);
  ctx.stroke();
  drawCenteredText(ctx, '100%', w * 0.8, h * 0.66, palette.ink, 900, 78);
  drawCenteredText(ctx, 'NATURAL', w * 0.8, h * 0.77, palette.ink, 700, 34);

  drawCmykStrip(ctx, 0, h - 28, w, 28, palette);
  drawLogo(ctx, logoMask, w * 0.5, h * 0.91, 200, palette.ink);

  return toColorTexture(canvas);
}

/* ───────────────────────── Die-cut stickers ───────────────────────── */

function stickerPath(ctx: Ctx, kind: StickerKind): void {
  ctx.beginPath();
  if (kind === 'thumb' || kind === 'badge') {
    ctx.arc(0, 0, 185, 0, Math.PI * 2);
  } else if (kind === 'star') {
    for (let point = 0; point < 10; point += 1) {
      const radius = point % 2 === 0 ? 205 : 98;
      const angle = -Math.PI / 2 + (point * Math.PI) / 5;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (point === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  } else if (kind === 'heart') {
    ctx.moveTo(0, -55);
    ctx.bezierCurveTo(0, -170, -190, -170, -190, -40);
    ctx.bezierCurveTo(-190, 70, -60, 130, 0, 200);
    ctx.bezierCurveTo(60, 130, 190, 70, 190, -40);
    ctx.bezierCurveTo(190, -170, 0, -170, 0, -55);
    ctx.closePath();
  } else {
    for (let point = 0; point < 28; point += 1) {
      const radius = point % 2 === 0 ? 205 : 160;
      const angle = (point * Math.PI) / 14;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (point === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  }
}

function paintSticker(kind: StickerKind, palette: BrandPalette): THREE.Texture {
  const { canvas, ctx } = newPainter(512, 512);
  ctx.translate(canvas.width / 2, canvas.height / 2);

  const fills: Record<StickerKind, string> = {
    thumb: palette.yellow,
    star: palette.red,
    heart: palette.red,
    badge: palette.green,
    burst: palette.blue,
  };

  ctx.shadowColor = 'rgba(0,0,0,0.25)';
  ctx.shadowBlur = 22;
  ctx.shadowOffsetY = 8;
  ctx.lineJoin = 'round';
  ctx.lineWidth = 44;
  ctx.strokeStyle = 'white';
  stickerPath(ctx, kind);
  ctx.stroke();
  ctx.shadowColor = 'transparent';
  ctx.fillStyle = fills[kind];
  stickerPath(ctx, kind);
  ctx.fill();

  // glossy highlight
  const gloss = ctx.createLinearGradient(-180, -200, 120, 160);
  gloss.addColorStop(0, 'rgba(255,255,255,0.45)');
  gloss.addColorStop(0.45, 'rgba(255,255,255,0)');
  ctx.fillStyle = gloss;
  stickerPath(ctx, kind);
  ctx.fill();

  if (kind === 'thumb') {
    ctx.font = '230px "Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('👍', 0, 12);
  } else if (kind === 'star') {
    drawCenteredText(ctx, 'NEW', 0, 18, palette.paper, 900, 82);
  } else if (kind === 'badge') {
    drawCenteredText(ctx, 'ECO', 0, -8, palette.paper, 900, 110);
    drawCenteredText(ctx, 'FRIENDLY', 0, 72, palette.paper, 700, 40);
  } else if (kind === 'burst') {
    drawCenteredText(ctx, 'SALE', 0, 0, palette.paper, 900, 96);
  }

  return toColorTexture(canvas);
}

/* ───────────────────────── Cards ───────────────────────── */

function paintCard(index: number, palette: BrandPalette, logoMask: HTMLCanvasElement | null): PbrMaps {
  const width = 1024;
  const height = 585;
  const color = newPainter(width, height);
  const roughness = newPainter(width, height);
  const metalness = newPainter(width, height);
  fillBackground(roughness.ctx, width, height, 'rgb(170,170,170)');
  fillBackground(metalness.ctx, width, height, 'rgb(0,0,0)');

  const designs = [
    { bg: palette.ink, foil: true, logo: palette.paper, text: palette.paperDeep },
    { bg: palette.blue, foil: false, logo: palette.paper, text: palette.ink },
    { bg: palette.yellow, foil: false, logo: palette.ink, text: palette.ink },
    { bg: palette.paper, foil: false, logo: palette.ink, text: palette.ink },
    { bg: palette.red, foil: true, logo: palette.paper, text: palette.paper },
  ];
  const design = designs[index % designs.length];
  fillBackground(color.ctx, width, height, design.bg);

  // soft light falloff + big tonal circle for depth
  const falloff = color.ctx.createRadialGradient(width * 0.3, height * 0.2, 40, width * 0.5, height * 0.5, width * 0.8);
  falloff.addColorStop(0, 'rgba(255,255,255,0.14)');
  falloff.addColorStop(1, 'rgba(0,0,0,0.18)');
  color.ctx.fillStyle = falloff;
  color.ctx.fillRect(0, 0, width, height);

  if (index === 3) {
    color.ctx.fillStyle = palette.red;
    color.ctx.fillRect(0, 0, width * 0.06, height);
  }
  if (index === 0) {
    color.ctx.save();
    color.ctx.globalAlpha = 0.07;
    color.ctx.strokeStyle = palette.foilLight;
    color.ctx.lineWidth = 2;
    for (let offset = -height; offset < width; offset += 26) {
      color.ctx.beginPath();
      color.ctx.moveTo(offset, height);
      color.ctx.lineTo(offset + height, 0);
      color.ctx.stroke();
    }
    color.ctx.restore();
  }

  const logoFill = design.foil ? (tint: Ctx, tw: number, th: number) => createFoilGradient(tint, tw, th, palette) : design.logo;
  drawLogo(color.ctx, logoMask, width * 0.5, height * 0.36, width * 0.5, logoFill);
  drawLogo(roughness.ctx, logoMask, width * 0.5, height * 0.36, width * 0.5, 'rgb(30,30,30)');
  if (design.foil) drawLogo(metalness.ctx, logoMask, width * 0.5, height * 0.36, width * 0.5, 'rgb(255,255,255)');

  drawLeftText(color.ctx, 'YOUR NAME', width * 0.08, height * 0.72, design.text, 800, 44);
  drawLeftText(color.ctx, 'Founder & Director', width * 0.08, height * 0.8, design.text, 500, 28);
  color.ctx.save();
  color.ctx.textAlign = 'right';
  color.ctx.fillStyle = design.text;
  setFont(color.ctx, 500, 26);
  color.ctx.fillText('+91 00000 00000', width * 0.92, height * 0.72);
  color.ctx.fillText('hello@yourbrand.com', width * 0.92, height * 0.8);
  color.ctx.restore();
  drawCmykStrip(color.ctx, width * 0.08, height * 0.9, width * 0.18, 12, palette);

  return toPbr(color.canvas, roughness.canvas, metalness.canvas);
}

function paintCardBack(palette: BrandPalette, logoMask: HTMLCanvasElement | null): PbrMaps {
  const width = 1024;
  const height = 585;
  const color = newPainter(width, height);
  const roughness = newPainter(width, height);
  const metalness = newPainter(width, height);
  fillBackground(color.ctx, width, height, palette.ink);
  fillBackground(roughness.ctx, width, height, 'rgb(190,190,190)');
  fillBackground(metalness.ctx, width, height, 'rgb(0,0,0)');
  drawLogo(color.ctx, logoMask, width / 2, height * 0.45, width * 0.4, (tint, tw, th) => createFoilGradient(tint, tw, th, palette));
  drawLogo(roughness.ctx, logoMask, width / 2, height * 0.45, width * 0.4, 'rgb(35,35,35)');
  drawLogo(metalness.ctx, logoMask, width / 2, height * 0.45, width * 0.4, 'rgb(255,255,255)');
  return toPbr(color.canvas, roughness.canvas, metalness.canvas);
}

/* ───────────────────────── Brochure + flyers ───────────────────────── */

const PANEL_PX = 340;

function paintBrochure(palette: BrandPalette, logoMask: HTMLCanvasElement | null): BrochureTextures {
  const sideW = Math.round(0.9 * PANEL_PX);
  const centerW = Math.round(1.8 * PANEL_PX);
  const panelH = Math.round(2.1 * PANEL_PX);

  // full cover (outside), later split into the two gate panels
  const cover = newPainter(centerW, panelH);
  const coverGradient = cover.ctx.createLinearGradient(0, 0, centerW, panelH);
  coverGradient.addColorStop(0, palette.blue);
  coverGradient.addColorStop(1, palette.ink);
  cover.ctx.fillStyle = coverGradient;
  cover.ctx.fillRect(0, 0, centerW, panelH);
  cover.ctx.save();
  cover.ctx.globalAlpha = 0.16;
  cover.ctx.fillStyle = palette.paper;
  cover.ctx.beginPath();
  cover.ctx.arc(centerW * 0.82, panelH * 0.22, 250, 0, Math.PI * 2);
  cover.ctx.fill();
  cover.ctx.beginPath();
  cover.ctx.arc(centerW * 0.1, panelH * 0.75, 190, 0, Math.PI * 2);
  cover.ctx.fill();
  cover.ctx.restore();
  drawCenteredText(cover.ctx, 'OUR', centerW / 2, panelH * 0.3, palette.paper, 900, 124);
  drawCenteredText(cover.ctx, 'COLLECTION', centerW / 2, panelH * 0.42, palette.yellow, 900, 96);
  drawCenteredText(cover.ctx, 'Brochure  ·  2026', centerW / 2, panelH * 0.52, palette.paper, 500, 38);
  drawLogo(cover.ctx, logoMask, centerW / 2, panelH * 0.8, centerW * 0.5, (tint, tw, th) => createFoilGradient(tint, tw, th, palette));
  drawCmykStrip(cover.ctx, 0, panelH - 24, centerW, 24, palette);

  const half = (x: number): HTMLCanvasElement => {
    const piece = newPainter(sideW, panelH);
    piece.ctx.drawImage(cover.canvas, x, 0, sideW, panelH, 0, 0, sideW, panelH);
    return piece.canvas;
  };

  const innerLeft = newPainter(sideW, panelH);
  fillBackground(innerLeft.ctx, sideW, panelH, palette.paper);
  innerLeft.ctx.fillStyle = palette.yellow;
  innerLeft.ctx.fillRect(sideW * 0.1, panelH * 0.08, sideW * 0.8, panelH * 0.3);
  innerLeft.ctx.fillStyle = palette.ink;
  innerLeft.ctx.fillRect(sideW * 0.1, panelH * 0.08, 10, panelH * 0.3);
  drawTextLines(innerLeft.ctx, sideW * 0.1, panelH * 0.46, [250, 220, 250, 180, 240, 200], 12, 18, palette.ink);

  const innerCenter = newPainter(centerW, panelH);
  fillBackground(innerCenter.ctx, centerW, panelH, palette.ink);
  drawCenteredText(innerCenter.ctx, 'Designed to impress', centerW / 2, panelH * 0.16, palette.paper, 800, 58);
  innerCenter.ctx.fillStyle = palette.red;
  innerCenter.ctx.beginPath();
  innerCenter.ctx.arc(centerW * 0.35, panelH * 0.5, 130, 0, Math.PI * 2);
  innerCenter.ctx.fill();
  innerCenter.ctx.fillStyle = palette.green;
  innerCenter.ctx.fillRect(centerW * 0.5, panelH * 0.38, 190, 190);
  innerCenter.ctx.fillStyle = palette.yellow;
  innerCenter.ctx.beginPath();
  innerCenter.ctx.arc(centerW * 0.62, panelH * 0.5, 54, 0, Math.PI * 2);
  innerCenter.ctx.fill();
  drawTextLines(innerCenter.ctx, centerW * 0.12, panelH * 0.72, [440, 380, 440, 320], 12, 20, palette.paperDeep);

  const innerRight = newPainter(sideW, panelH);
  fillBackground(innerRight.ctx, sideW, panelH, palette.paper);
  innerRight.ctx.fillStyle = palette.blue;
  innerRight.ctx.beginPath();
  innerRight.ctx.arc(sideW * 0.5, panelH * 0.22, sideW * 0.32, 0, Math.PI * 2);
  innerRight.ctx.fill();
  drawTextLines(innerRight.ctx, sideW * 0.1, panelH * 0.46, [240, 200, 250, 210, 230, 170], 12, 18, palette.ink);
  drawCmykStrip(innerRight.ctx, 0, panelH - 24, sideW, 24, palette);

  const back = newPainter(centerW, panelH);
  fillBackground(back.ctx, centerW, panelH, palette.ink);
  drawLogo(back.ctx, logoMask, centerW / 2, panelH * 0.5, centerW * 0.4, (tint, tw, th) => createFoilGradient(tint, tw, th, palette));

  return {
    coverLeft: toColorTexture(mirrorCanvas(half(0))),
    coverRight: toColorTexture(mirrorCanvas(half(sideW))),
    backCover: toColorTexture(mirrorCanvas(back.canvas)),
    innerLeft: toColorTexture(innerLeft.canvas),
    innerCenter: toColorTexture(innerCenter.canvas),
    innerRight: toColorTexture(innerRight.canvas),
  };
}

function paintFlyer(index: number, palette: BrandPalette): THREE.Texture {
  const { canvas, ctx } = newPainter(400, 560);
  const w = canvas.width;
  const h = canvas.height;
  const designs = [
    { bg: palette.red, fg: palette.paper, word: 'SALE', accent: palette.yellow },
    { bg: palette.yellow, fg: palette.ink, word: 'OPEN', accent: palette.red },
    { bg: palette.green, fg: palette.paper, word: 'NEW', accent: palette.yellow },
    { bg: palette.blue, fg: palette.paper, word: 'OFFER', accent: palette.paper },
  ];
  const design = designs[index % designs.length];
  fillBackground(ctx, w, h, design.bg);
  const light = ctx.createLinearGradient(0, 0, w, h);
  light.addColorStop(0, 'rgba(255,255,255,0.18)');
  light.addColorStop(1, 'rgba(0,0,0,0.16)');
  ctx.fillStyle = light;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = design.accent;
  ctx.beginPath();
  ctx.arc(w * 0.78, h * 0.22, 90, 0, Math.PI * 2);
  ctx.fill();
  drawCenteredText(ctx, design.word, w / 2, h * 0.5, design.fg, 900, 118);
  drawCenteredText(ctx, 'Grand opening week', w / 2, h * 0.66, design.fg, 500, 30);
  drawTextLines(ctx, w * 0.2, h * 0.76, [240, 190, 220], 8, 14, design.fg);
  drawCmykStrip(ctx, 0, h - 16, w, 16, palette);
  return toColorTexture(canvas);
}

/* ───────────────────────── Folder, pouch, banner ───────────────────────── */

function paintFolderCover(palette: BrandPalette, logoMask: HTMLCanvasElement | null): PbrMaps {
  const width = 600;
  const height = 810;
  const color = newPainter(width, height);
  const roughness = newPainter(width, height);
  const metalness = newPainter(width, height);
  const gradient = color.ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, palette.green);
  gradient.addColorStop(1, palette.ink);
  color.ctx.fillStyle = gradient;
  color.ctx.fillRect(0, 0, width, height);
  fillBackground(roughness.ctx, width, height, 'rgb(200,200,200)');
  fillBackground(metalness.ctx, width, height, 'rgb(0,0,0)');

  color.ctx.save();
  color.ctx.globalAlpha = 0.1;
  color.ctx.fillStyle = palette.paper;
  color.ctx.fillRect(0, height * 0.64, width, height * 0.36);
  color.ctx.restore();

  const foil = (tint: Ctx, tw: number, th: number) => createFoilGradient(tint, tw, th, palette);
  drawLogo(color.ctx, logoMask, width / 2, height * 0.38, width * 0.74, foil);
  drawLogo(roughness.ctx, logoMask, width / 2, height * 0.38, width * 0.74, 'rgb(40,40,40)');
  drawLogo(metalness.ctx, logoMask, width / 2, height * 0.38, width * 0.74, 'rgb(255,255,255)');
  drawCenteredText(color.ctx, 'CORPORATE FILE', width / 2, height * 0.7, palette.paper, 800, 44);
  drawCenteredText(color.ctx, 'Quality that lasts', width / 2, height * 0.77, palette.paperDeep, 500, 28);
  drawCmykStrip(color.ctx, width * 0.3, height * 0.9, width * 0.4, 14, palette);

  return toPbr(color.canvas, roughness.canvas, metalness.canvas);
}

function paintFolderInner(palette: BrandPalette): THREE.Texture {
  const { canvas, ctx } = newPainter(600, 810);
  fillBackground(ctx, canvas.width, canvas.height, palette.paper);
  ctx.save();
  ctx.strokeStyle = palette.paperDeep;
  ctx.lineWidth = 2;
  for (let y = 120; y < canvas.height - 40; y += 46) {
    ctx.beginPath();
    ctx.moveTo(50, y);
    ctx.lineTo(canvas.width - 50, y);
    ctx.stroke();
  }
  ctx.restore();
  drawLeftText(ctx, 'NOTES', 50, 70, palette.ink, 800, 36);
  return toColorTexture(canvas);
}

function paintFolderPaper(palette: BrandPalette, logoMask: HTMLCanvasElement | null): THREE.Texture {
  const { canvas, ctx } = newPainter(480, 600);
  fillBackground(ctx, canvas.width, canvas.height, palette.paper);
  drawLogo(ctx, logoMask, 130, 60, 150, palette.ink);
  drawCenteredText(ctx, 'QUOTATION', canvas.width / 2, 130, palette.ink, 800, 34);
  drawTextLines(ctx, 40, 170, [400, 360, 400, 300, 380, 400, 340, 380, 260], 9, 18, palette.inkSoft);
  drawCmykStrip(ctx, 0, canvas.height - 14, canvas.width, 14, palette);
  return toColorTexture(canvas);
}

function paintPouch(palette: BrandPalette, logoMask: HTMLCanvasElement | null, isFront: boolean): THREE.Texture {
  const { canvas, ctx } = newPainter(640, 800);
  const w = canvas.width;
  const h = canvas.height;
  fillBackground(ctx, w, h, palette.paperDeep);
  const warm = ctx.createLinearGradient(0, 0, w, h);
  warm.addColorStop(0, 'rgba(255,255,255,0.25)');
  warm.addColorStop(1, 'rgba(0,0,0,0.08)');
  ctx.fillStyle = warm;
  ctx.fillRect(0, 0, w, h);

  if (isFront) {
    ctx.fillStyle = palette.blue;
    ctx.fillRect(0, h * 0.72, w, h * 0.28);
    drawLogo(ctx, logoMask, w / 2, h * 0.36, w * 0.62, palette.ink);
    drawCenteredText(ctx, 'COTTON POUCH', w / 2, h * 0.8, palette.paper, 800, 52);
    drawCenteredText(ctx, 'Eco · Reusable · Branded', w / 2, h * 0.88, palette.paper, 500, 28);
    drawCmykStrip(ctx, w * 0.35, h * 0.55, w * 0.3, 12, palette);
  } else {
    drawLogo(ctx, logoMask, w / 2, h * 0.5, w * 0.34, palette.ink);
  }

  // stitched seam
  ctx.save();
  ctx.setLineDash([14, 10]);
  ctx.lineWidth = 3;
  ctx.strokeStyle = isFront ? palette.paper : palette.ink;
  ctx.globalAlpha = 0.7;
  ctx.strokeRect(24, 24, w - 48, h - 48);
  ctx.restore();

  return toColorTexture(canvas);
}

function paintWeave(): THREE.Texture {
  const { canvas, ctx } = newPainter(64, 64);
  for (let y = 0; y < 64; y += 4) {
    for (let x = 0; x < 64; x += 4) {
      const lift = ((x + y) / 4) % 2 === 0 ? 170 : 105;
      ctx.fillStyle = `rgb(${lift},${lift},${lift})`;
      ctx.fillRect(x, y, 4, 4);
    }
  }
  const texture = toDataTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(26, 32);
  return texture;
}

function paintPouchTag(palette: BrandPalette, logoMask: HTMLCanvasElement | null): THREE.Texture {
  const { canvas, ctx } = newPainter(256, 384);
  fillBackground(ctx, canvas.width, canvas.height, palette.yellow);
  ctx.fillStyle = palette.paper;
  ctx.beginPath();
  ctx.arc(canvas.width / 2, 44, 16, 0, Math.PI * 2);
  ctx.fill();
  drawLogo(ctx, logoMask, canvas.width / 2, 190, 190, palette.ink);
  drawCenteredText(ctx, 'HAND MADE', canvas.width / 2, 290, palette.ink, 800, 30);
  drawCmykStrip(ctx, 0, canvas.height - 18, canvas.width, 18, palette);
  return toColorTexture(canvas);
}

function paintBanner(palette: BrandPalette, logoMask: HTMLCanvasElement | null): THREE.Texture {
  const { canvas, ctx } = newPainter(512, 1280);
  const w = canvas.width;
  const h = canvas.height;
  const gradient = ctx.createLinearGradient(0, 0, 0, h);
  gradient.addColorStop(0, palette.blue);
  gradient.addColorStop(1, palette.ink);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = palette.yellow;
  ctx.beginPath();
  ctx.arc(w * 0.75, h * 0.2, 150, 0, Math.PI * 2);
  ctx.fill();
  drawCenteredText(ctx, 'BIG.', w / 2, h * 0.38, palette.paper, 900, 150);
  drawCenteredText(ctx, 'BOLD.', w / 2, h * 0.48, palette.paper, 900, 150);
  drawCenteredText(ctx, 'BRIGHT.', w / 2, h * 0.58, palette.yellow, 900, 130);
  drawCenteredText(ctx, 'Flex banners & roller standees', w / 2, h * 0.7, palette.paper, 500, 32);
  drawLogo(ctx, logoMask, w / 2, h * 0.86, w * 0.6, palette.paper);
  drawCmykStrip(ctx, 0, h - 28, w, 28, palette);
  return toColorTexture(canvas);
}

/* ───────────────────────── Public builder ───────────────────────── */

function disposePbr(maps: PbrMaps): Array<{ dispose: () => void }> {
  return [maps.map, maps.roughnessMap, maps.metalnessMap];
}

export async function buildStoryTextures(palette: BrandPalette): Promise<StoryTextures> {
  const logoMask = await loadLogoMask();
  const [boxHorizontal, boxVertical] = await Promise.all([
    buildBoxTextures(palette, BOX_DIMS),
    buildBoxTextures(palette, VERTICAL_BOX_DIMS),
  ]);

  const stickers = {} as Record<StickerKind, THREE.Texture>;
  STICKER_KINDS.forEach((kind) => {
    stickers[kind] = paintSticker(kind, palette);
  });

  const cards = [0, 1, 2, 3, 4].map((index) => paintCard(index, palette, logoMask));
  const flyers = [0, 1, 2, 3].map((index) => paintFlyer(index, palette));
  const brochure = paintBrochure(palette, logoMask);
  const canBody = paintCanBody(palette);
  const canDew = paintCanDew();
  const canLabel = paintCanLabel(palette, logoMask);
  const cardBack = paintCardBack(palette, logoMask);
  const folderCover = paintFolderCover(palette, logoMask);
  const folderInner = paintFolderInner(palette);
  const folderPaper = paintFolderPaper(palette, logoMask);
  const pouchFront = paintPouch(palette, logoMask, true);
  const pouchBack = paintPouch(palette, logoMask, false);
  const pouchWeave = paintWeave();
  const pouchTag = paintPouchTag(palette, logoMask);
  const banner = paintBanner(palette, logoMask);

  return {
    palette,
    canBody,
    canDew,
    canLabel,
    stickers,
    cards,
    cardBack,
    brochure,
    flyers,
    folderCover,
    folderInner,
    folderPaper,
    pouchFront,
    pouchBack,
    pouchWeave,
    pouchTag,
    banner,
    boxHorizontal,
    boxVertical,
    dispose: () => {
      disposeAll([
        canBody,
        canDew,
        canLabel,
        folderInner,
        folderPaper,
        pouchFront,
        pouchBack,
        pouchWeave,
        pouchTag,
        banner,
        ...Object.values(stickers),
        ...flyers,
        ...Object.values(brochure),
        ...cards.flatMap(disposePbr),
        ...disposePbr(cardBack),
        ...disposePbr(folderCover),
      ]);
      boxHorizontal.dispose();
      boxVertical.dispose();
    },
  };
}
