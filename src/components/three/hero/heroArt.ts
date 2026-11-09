import * as THREE from 'three';
import {
  BrandPalette,
  createCanvas,
  createFoilGradient,
  createPaperGrain,
  drawCmykStrip,
  drawLogo,
  get2dContext,
  loadLogoMask,
  readBrandPalette,
  toColorTexture,
  toDataTexture,
} from '../utils/canvasKit';

export type ArtKind = 'cover' | 'paper' | 'poster' | 'rings' | 'stripes' | 'plain' | 'can';
export type ArtColor = 'red' | 'yellow' | 'green' | 'blue' | 'ink';

const ART_SIZE = 768;
const FONT_STACK = '"Helvetica Neue", Helvetica, Arial, sans-serif';
const LOREM = 'Premium offset printing, finished by hand and checked sheet by sheet so every colour matches your design exactly.'.split(' ');

function shade(hex: string, lightness: number): string {
  const color = new THREE.Color(hex);
  const hsl = { h: 0, s: 0, l: 0 };
  color.getHSL(hsl);
  color.setHSL(hsl.h, hsl.s, THREE.MathUtils.clamp(hsl.l + lightness, 0, 1));
  return `#${color.getHexString()}`;
}

/** "#rrggbb" + alpha → "rgba(...)" */
function withAlpha(hex: string, alpha: number): string {
  const value = hex.replace('#', '');
  const red = parseInt(value.slice(0, 2), 16);
  const green = parseInt(value.slice(2, 4), 16);
  const blue = parseInt(value.slice(4, 6), 16);
  return `rgba(${red},${green},${blue},${alpha})`;
}

function setLetterSpacing(context: CanvasRenderingContext2D, pixels: number): void {
  (context as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = `${pixels}px`;
}

interface TextStyle {
  size: number;
  weight?: number;
  color: string | CanvasGradient;
  spacing?: number;
  align?: CanvasTextAlign;
}

function drawText(context: CanvasRenderingContext2D, text: string, x: number, y: number, style: TextStyle): void {
  context.save();
  context.font = `${style.weight ?? 700} ${style.size}px ${FONT_STACK}`;
  context.fillStyle = style.color;
  context.textAlign = style.align ?? 'left';
  context.textBaseline = 'alphabetic';
  setLetterSpacing(context, style.spacing ?? 0);
  context.fillText(text, x, y);
  context.restore();
}

function fillGradientBackground(context: CanvasRenderingContext2D, width: number, height: number, color: string): void {
  const gradient = context.createLinearGradient(0, 0, width * 0.35, height);
  gradient.addColorStop(0, shade(color, 0.05));
  gradient.addColorStop(0.55, shade(color, -0.08));
  gradient.addColorStop(1, shade(color, -0.22));
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
}

function drawBloom(context: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string, alpha: number): void {
  const bloom = context.createRadialGradient(x, y, 0, x, y, radius);
  bloom.addColorStop(0, withAlpha(color, alpha));
  bloom.addColorStop(1, withAlpha(color, 0));
  context.fillStyle = bloom;
  context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
}

/** Fine diagonal hairlines — the kind of pattern real packaging uses for texture. */
function drawHairlines(context: CanvasRenderingContext2D, width: number, height: number, spacing: number, alpha: number): void {
  context.save();
  context.strokeStyle = `rgba(255,255,255,${alpha})`;
  context.lineWidth = 1;
  context.beginPath();
  for (let offset = -height; offset < width; offset += spacing) {
    context.moveTo(offset, height);
    context.lineTo(offset + height * 0.58, 0);
  }
  context.stroke();
  context.restore();
}

function foilFill(palette: BrandPalette) {
  return (tint: CanvasRenderingContext2D, tintWidth: number, tintHeight: number) =>
    createFoilGradient(tint, tintWidth, tintHeight, palette);
}

/** Foil gradient positioned over a specific rectangle (for text drawn deep inside a tall canvas). */
function foilGradientAt(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  palette: BrandPalette,
): CanvasGradient {
  const gradient = context.createLinearGradient(x, y, x + width, y + height);
  gradient.addColorStop(0, palette.foil);
  gradient.addColorStop(0.4, palette.foilLight);
  gradient.addColorStop(0.7, palette.foil);
  gradient.addColorStop(1, palette.foilLight);
  return gradient;
}

/** Logo that never overflows the surface it is printed on. */
function drawFittedLogo(
  context: CanvasRenderingContext2D,
  logo: HTMLCanvasElement | null,
  centerX: number,
  centerY: number,
  maxWidth: number,
  maxHeight: number,
  fill: Parameters<typeof drawLogo>[5],
): void {
  const aspect = logo ? logo.width / logo.height : 8;
  drawLogo(context, logo, centerX, centerY, Math.min(maxWidth, maxHeight * aspect), fill);
}

function drawBodyText(context: CanvasRenderingContext2D, x: number, y: number, width: number, lines: number, size: number, color: string): void {
  context.save();
  context.font = `400 ${size}px ${FONT_STACK}`;
  context.fillStyle = color;
  context.textBaseline = 'alphabetic';
  let wordIndex = 0;
  for (let line = 0; line < lines; line += 1) {
    let text = '';
    while (context.measureText(`${text}${LOREM[wordIndex % LOREM.length]} `).width < width * (line === lines - 1 ? 0.55 : 1)) {
      text += `${LOREM[wordIndex % LOREM.length]} `;
      wordIndex += 1;
    }
    context.fillText(text.trim(), x, y + line * size * 1.55);
  }
  context.restore();
}

function roundedRectPath(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number): void {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.arcTo(x + width, y, x + width, y + height, radius);
  context.arcTo(x + width, y + height, x, y + height, radius);
  context.arcTo(x, y + height, x, y, radius);
  context.arcTo(x, y, x + width, y, radius);
  context.closePath();
}

/** Paints one piece of print artwork. `width`/`height` are the aspect of the surface it will wrap. */
function paintArt(
  kind: ArtKind,
  width: number,
  height: number,
  colorName: ArtColor,
  palette: BrandPalette,
  logo: HTMLCanvasElement | null,
  maskMode = false,
): HTMLCanvasElement {
  const canvas = createCanvas(width, height);
  const context = get2dContext(canvas);
  if (maskMode) {
    // foil mask: black everywhere, white where metallic foil is printed
    context.fillStyle = '#000000';
    context.fillRect(0, 0, width, height);
  }
  const color = palette[colorName];
  const second = colorName === 'yellow' ? palette.red : palette.yellow;
  const minSide = Math.min(width, height);
  const isCompact = height < 150;
  const foil = maskMode ? () => '#ffffff' : foilFill(palette);

  if (kind === 'paper') {
    // letterhead / brochure inside: warm uncoated paper, real typography, a printed photo block
    context.fillStyle = '#faf8f3';
    context.fillRect(0, 0, width, height);
    context.fillStyle = color;
    context.fillRect(0, 0, width, height * 0.012);
    drawFittedLogo(context, logo, width * 0.3, height * 0.075, width * 0.36, height * 0.05, shade(color, -0.12));
    drawText(context, 'Quality that you can feel', width * 0.09, height * 0.2, { size: width * 0.075, weight: 800, color: palette.ink });
    drawBodyText(context, width * 0.09, height * 0.255, width * 0.82, 3, width * 0.03, '#6f7279');

    const photoX = width * 0.09;
    const photoY = height * 0.4;
    const photoWidth = width * 0.82;
    const photoHeight = height * 0.26;
    context.save();
    roundedRectPath(context, photoX, photoY, photoWidth, photoHeight, width * 0.015);
    context.clip();
    const photo = context.createLinearGradient(photoX, photoY, photoX + photoWidth, photoY + photoHeight);
    photo.addColorStop(0, shade(color, 0.12));
    photo.addColorStop(1, shade(color, -0.25));
    context.fillStyle = photo;
    context.fillRect(photoX, photoY, photoWidth, photoHeight);
    drawBloom(context, photoX + photoWidth * 0.75, photoY + photoHeight * 0.3, photoHeight * 0.9, '#ffffff', 0.35);
    drawHairlines(context, width, height, 12, 0.07);
    context.restore();

    drawBodyText(context, width * 0.09, height * 0.73, width * 0.82, 6, width * 0.03, '#7a7d84');
    drawCmykStrip(context, width * 0.09, height * 0.93, width * 0.22, height * 0.012, palette);
    drawText(context, 'designnprint.com', width * 0.91, height * 0.945, { size: width * 0.028, weight: 600, color: '#9a9da4', align: 'right' });
  } else if (kind === 'poster') {
    // flyer / banner / acrylic print: rich gradient, big confident typography, foil accents
    fillGradientBackground(context, width, height, color);
    drawBloom(context, width * 0.85, height * 0.12, Math.max(width, height) * 0.7, second, 0.3);
    drawBloom(context, width * 0.1, height * 0.95, Math.max(width, height) * 0.55, '#000000', 0.28);
    drawHairlines(context, width, height, 16, 0.05);

    const isWide = width / height > 1.6;
    const headlineSize = isWide ? height * 0.27 : width * 0.18;
    // foil / white type would vanish on a yellow stock, so yellow flyers print in ink
    const isYellowStock = colorName === 'yellow';
    const lines = isWide ? ['WE DESIGN.', 'WE PRINT.'] : ['WE', 'DESIGN.', 'WE', 'PRINT.'];
    const startX = width * (isWide ? 0.06 : 0.09);
    const startY = isWide ? height * 0.42 : height * 0.2;
    lines.forEach((line, index) => {
      const isAccent = index % 2 === 1;
      const baselineY = startY + index * headlineSize * 0.92;
      drawText(context, line, startX, baselineY, {
        size: headlineSize,
        weight: 900,
        color: isYellowStock
          ? isAccent
            ? palette.red
            : palette.ink
          : isAccent
            ? foilGradientAt(context, startX, baselineY - headlineSize, width * 0.7, headlineSize, palette)
            : '#ffffff',
        spacing: -headlineSize * 0.02,
      });
    });
    drawText(context, 'QUICK DESIGNING  ·  QUALITY PRINTING', startX, height * (isWide ? 0.86 : 0.82), {
      size: isWide ? height * 0.06 : width * 0.034,
      weight: 600,
      color: isYellowStock ? withAlpha(palette.ink, 0.75) : 'rgba(255,255,255,0.78)',
      spacing: width * 0.006,
    });
    drawFittedLogo(context, logo, isWide ? width * 0.86 : width * 0.3, height * (isWide ? 0.14 : 0.92), width * 0.2, height * 0.06, '#ffffff');
    drawCmykStrip(context, startX, height * (isWide ? 0.92 : 0.87), width * 0.16, height * 0.012, palette);
  } else if (kind === 'rings') {
    // round die-cut sticker: ink centre, foil ring, ring text, logo
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = minSide / 2;
    const base = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    base.addColorStop(0, shade(palette.ink, 0.1));
    base.addColorStop(1, palette.ink);
    if (!maskMode) {
      context.fillStyle = base;
      context.fillRect(0, 0, width, height);
    }

    context.strokeStyle = maskMode ? '#ffffff' : createFoilGradient(context, width, height, palette);
    context.lineWidth = minSide * 0.012;
    [0.94, 0.7].forEach((ratio) => {
      context.beginPath();
      context.arc(centerX, centerY, radius * ratio, 0, Math.PI * 2);
      context.stroke();
    });

    const ringText = 'DESIGN N PRINT  ·  QUICK DESIGNING  ·  QUALITY PRINTING  ·  ';
    context.save();
    context.translate(centerX, centerY);
    context.font = `700 ${minSide * 0.058}px ${FONT_STACK}`;
    context.fillStyle = maskMode ? '#ffffff' : palette.foilLight;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    const step = (Math.PI * 2) / ringText.length;
    for (let index = 0; index < ringText.length; index += 1) {
      context.save();
      context.rotate(index * step);
      context.fillText(ringText[index], 0, -radius * 0.82);
      context.restore();
    }
    context.restore();

    const centre = context.createLinearGradient(0, centerY - radius * 0.6, 0, centerY + radius * 0.6);
    centre.addColorStop(0, shade(color, 0.08));
    centre.addColorStop(1, shade(color, -0.2));
    if (!maskMode) {
      context.fillStyle = centre;
      context.beginPath();
      context.arc(centerX, centerY, radius * 0.6, 0, Math.PI * 2);
      context.fill();
      drawFittedLogo(context, logo, centerX, centerY, radius * 0.9, radius * 0.3, '#ffffff');
      drawCmykStrip(context, centerX - radius * 0.2, centerY + radius * 0.32, radius * 0.4, radius * 0.035, palette);
    }
  } else if (kind === 'stripes') {
    // pouch / label wrap: colour gradient, foil rules, cream label panel with logo
    fillGradientBackground(context, width, height, color);
    drawBloom(context, width * 0.25, height * 0.1, Math.max(width, height) * 0.5, '#ffffff', 0.22);
    drawHairlines(context, width, height, 14, 0.05);
    const wrapsAroundCylinder = width / height > 2;
    const panelCenters = wrapsAroundCylinder ? [0.25, 0.75] : [0.5];
    const panelWidth = wrapsAroundCylinder ? width * 0.4 : width * 0.8;
    const panelHeight = height * (wrapsAroundCylinder ? 0.5 : 0.3);
    panelCenters.forEach((centerRatio) => {
      const panelX = width * centerRatio - panelWidth / 2;
      const panelY = height * 0.5 - panelHeight / 2;
      context.save();
      context.shadowColor = 'rgba(0,0,0,0.3)';
      context.shadowBlur = minSide * 0.03;
      context.shadowOffsetY = minSide * 0.01;
      roundedRectPath(context, panelX, panelY, panelWidth, panelHeight, minSide * 0.03);
      context.fillStyle = '#f7f2e8';
      context.fill();
      context.restore();
      drawFittedLogo(context, logo, panelX + panelWidth / 2, panelY + panelHeight * 0.4, panelWidth * 0.78, panelHeight * 0.3, shade(color, -0.12));
      drawText(context, 'PREMIUM  ·  QUALITY', panelX + panelWidth / 2, panelY + panelHeight * 0.78, {
        size: panelHeight * 0.1,
        weight: 700,
        color: '#7b7467',
        spacing: panelHeight * 0.02,
        align: 'center',
      });
    });
    context.fillStyle = foil(context, width, height * 0.01);
    context.fillRect(0, height * 0.1, width, Math.max(2, height * 0.008));
    context.fillRect(0, height * 0.9, width, Math.max(2, height * 0.008));
    drawCmykStrip(context, width * 0.4, height * 0.94, width * 0.2, Math.max(3, height * 0.014), palette);
  } else if (kind === 'can') {
    // printed aluminium can wrap: wraps horizontally, periodic so the seam is invisible
    const base = context.createLinearGradient(0, 0, 0, height);
    base.addColorStop(0, palette.ink);
    base.addColorStop(0.5, shade(palette.ink, 0.07));
    base.addColorStop(1, palette.ink);
    context.fillStyle = base;
    context.fillRect(0, 0, width, height);
    drawHairlines(context, width, height, 18, 0.03);

    const band = context.createLinearGradient(0, 0, width, 0);
    [palette.blue, palette.green, palette.yellow, palette.red, palette.blue].forEach((stop, index, all) => {
      band.addColorStop(index / (all.length - 1), stop);
    });
    context.fillStyle = band;
    context.fillRect(0, height * 0.64, width, height * 0.07);
    context.fillStyle = withAlpha(palette.ink, 0.35);
    context.fillRect(0, height * 0.71, width, height * 0.01);

    const repeats = 2;
    for (let repeat = 0; repeat < repeats; repeat += 1) {
      const centerX = (width / repeats) * (repeat + 0.5);
      drawFittedLogo(context, logo, centerX, height * 0.38, width * 0.2, height * 0.2, foil);
      drawText(context, 'QUICK DESIGNING  ·  QUALITY PRINTING', centerX, height * 0.5, {
        size: height * 0.036,
        weight: 600,
        color: withAlpha(palette.foilLight, 0.9),
        spacing: height * 0.008,
        align: 'center',
      });
      drawText(context, 'PRINT THAT YOU CAN FEEL', centerX, height * 0.85, {
        size: height * 0.07,
        weight: 900,
        color: '#ffffff',
        spacing: height * 0.004,
        align: 'center',
      });
    }
    context.fillStyle = foil(context, width, height * 0.01);
    context.fillRect(0, height * 0.06, width, Math.max(2, height * 0.006));
    context.fillRect(0, height * 0.94, width, Math.max(2, height * 0.006));
  } else if (kind === 'plain') {
    if (!maskMode) {
      fillGradientBackground(context, width, height, color);
      drawBloom(context, width * 0.8, height * 0.15, Math.max(width, height) * 0.6, '#ffffff', 0.16);
    }
    drawFittedLogo(context, logo, width * 0.5, height * 0.5, width * 0.4, height * 0.2, foil);
  } else {
    // cover: deep gradient, soft light bloom, fine hairlines, foil border + foil logo
    if (!maskMode) {
      fillGradientBackground(context, width, height, color);
      drawBloom(context, width * 0.8, height * 0.12, Math.max(width, height) * 0.75, '#ffffff', 0.2);
      drawBloom(context, width * 0.05, height, Math.max(width, height) * 0.5, '#000000', 0.25);
      drawHairlines(context, width, height, 14, 0.045);
    }

    if (!isCompact) {
      context.strokeStyle = maskMode ? '#ffffff' : createFoilGradient(context, width, height, palette);
      context.lineWidth = Math.max(2, minSide * 0.006);
      const inset = minSide * 0.055;
      context.strokeRect(inset, inset, width - inset * 2, height - inset * 2);
    }
    drawFittedLogo(context, logo, width * 0.5, height * (isCompact ? 0.5 : 0.42), width * 0.54, height * (isCompact ? 0.55 : 0.3), foil);
    if (!isCompact) {
      drawText(context, 'QUICK DESIGNING  ·  QUALITY PRINTING', width * 0.5, height * 0.64, {
        size: minSide * 0.04,
        weight: 600,
        color: maskMode ? '#ffffff' : withAlpha(palette.foilLight, 0.85),
        spacing: minSide * 0.01,
        align: 'center',
      });
      if (!maskMode) drawCmykStrip(context, width * 0.4, height * 0.84, width * 0.2, height * 0.016, palette);
    }
  }

  return canvas;
}

export interface FoilMaps {
  metalness: THREE.CanvasTexture;
  roughness: THREE.CanvasTexture;
}

/** Condensation droplets as a bump map (cold drink can). */
function paintDew(): HTMLCanvasElement {
  const canvas = createCanvas(1024, 512);
  const context = get2dContext(canvas);
  context.fillStyle = '#000000';
  context.fillRect(0, 0, canvas.width, canvas.height);
  for (let drop = 0; drop < 460; drop += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = 2.5 + Math.random() * Math.random() * 10;
    const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.7, 'rgba(255,255,255,0.7)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    context.fillStyle = gradient;
    context.beginPath();
    context.ellipse(x, y, radius, radius * 1.18, 0, 0, Math.PI * 2);
    context.fill();
  }
  return canvas;
}

export interface HeroArt {
  palette: BrandPalette;
  make: (kind: ArtKind, color: ArtColor, aspect?: number, resolution?: number) => THREE.CanvasTexture;
  /** metalness + roughness maps that turn the foil parts of a printed surface into real reflective foil */
  makeFoil: (kind: ArtKind, color: ArtColor, aspect?: number, resolution?: number) => FoilMaps;
  /** condensation droplets (bump map) for cold drink cans */
  dew: THREE.CanvasTexture;
  /** shared fine paper-grain bump map for all printed paper surfaces */
  grain: THREE.CanvasTexture;
  dispose: () => void;
}

/** Texture factory shared by every hero object (all textures are tracked and disposed together). */
export async function buildHeroArt(): Promise<HeroArt> {
  const palette = readBrandPalette();
  const logo = await loadLogoMask();
  const created: THREE.Texture[] = [];
  const grain = createPaperGrain();
  const dew = toDataTexture(paintDew());
  dew.wrapS = THREE.RepeatWrapping;
  dew.wrapT = THREE.RepeatWrapping;
  dew.repeat.set(3, 1);
  created.push(grain, dew);
  const sizeFor = (aspect: number, resolution: number) => ({
    width: aspect >= 1 ? resolution : Math.round(resolution * aspect),
    height: aspect >= 1 ? Math.round(resolution / aspect) : resolution,
  });

  return {
    palette,
    grain,
    dew,
    makeFoil: (kind, color, aspect = 1, resolution = ART_SIZE) => {
      const { width, height } = sizeFor(aspect, resolution);
      const mask = paintArt(kind, width, height, color, palette, logo, true);
      // roughness: smooth (0.25) where there is foil, fully rough (1.0) elsewhere
      const rough = createCanvas(width, height);
      const roughContext = get2dContext(rough);
      roughContext.fillStyle = '#ffffff';
      roughContext.fillRect(0, 0, width, height);
      roughContext.globalCompositeOperation = 'difference';
      roughContext.globalAlpha = 0.75;
      roughContext.drawImage(mask, 0, 0);
      const metalness = toDataTexture(mask);
      const roughness = toDataTexture(rough);
      created.push(metalness, roughness);
      return { metalness, roughness };
    },
    make: (kind, color, aspect = 1, resolution = ART_SIZE) => {
      const { width, height } = sizeFor(aspect, resolution);
      const texture = toColorTexture(paintArt(kind, width, height, color, palette, logo));
      created.push(texture);
      return texture;
    },
    dispose: () => created.forEach((texture) => texture.dispose()),
  };
}
