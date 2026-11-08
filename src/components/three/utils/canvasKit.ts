import * as THREE from 'three';

/* ───────────────────────── Brand palette (read from CSS tokens) ───────────────────────── */

export interface BrandPalette {
  ink: string;
  inkSoft: string;
  paper: string;
  paperDeep: string;
  red: string;
  yellow: string;
  green: string;
  blue: string;
  foil: string;
  foilLight: string;
}

function readCssToken(tokenName: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(tokenName).trim();
}

/** Single source of truth for 3D colours: the CSS variables in globals.css. */
export function readBrandPalette(): BrandPalette {
  return {
    ink: readCssToken('--color-ink'),
    inkSoft: readCssToken('--color-ink-soft'),
    paper: readCssToken('--color-paper'),
    paperDeep: readCssToken('--color-paper-deep'),
    red: readCssToken('--color-brand-red'),
    yellow: readCssToken('--color-brand-yellow'),
    green: readCssToken('--color-brand-green'),
    blue: readCssToken('--color-brand-blue'),
    foil: readCssToken('--color-foil'),
    foilLight: readCssToken('--color-foil-light'),
  };
}

/* ───────────────────────── Canvas helpers ───────────────────────── */

export function createCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(2, Math.round(width));
  canvas.height = Math.max(2, Math.round(height));
  return canvas;
}

export function get2dContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const context = canvas.getContext('2d');
  if (!context) throw new Error('2D canvas context is not available');
  return context;
}

export function toColorTexture(canvas: HTMLCanvasElement): THREE.CanvasTexture {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

export function toDataTexture(canvas: HTMLCanvasElement): THREE.CanvasTexture {
  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

/** Fill a canvas with a flat gray level (used for roughness / metalness maps). */
export function createFlatMap(width: number, height: number, grayLevel: number): HTMLCanvasElement {
  const canvas = createCanvas(width, height);
  const context = get2dContext(canvas);
  context.fillStyle = `rgb(${grayLevel},${grayLevel},${grayLevel})`;
  context.fillRect(0, 0, canvas.width, canvas.height);
  return canvas;
}

/** Rotate a canvas by 90° clockwise / counter-clockwise or 180° (for UV-correct panel art). */
export function rotateCanvas(source: HTMLCanvasElement, turn: 'cw' | 'ccw' | 'flip' | 'none'): HTMLCanvasElement {
  if (turn === 'none') return source;
  const swapAxes = turn !== 'flip';
  const target = createCanvas(swapAxes ? source.height : source.width, swapAxes ? source.width : source.height);
  const context = get2dContext(target);
  if (turn === 'cw') {
    context.translate(target.width, 0);
    context.rotate(Math.PI / 2);
  } else if (turn === 'ccw') {
    context.translate(0, target.height);
    context.rotate(-Math.PI / 2);
  } else {
    context.translate(target.width, target.height);
    context.rotate(Math.PI);
  }
  context.drawImage(source, 0, 0);
  return target;
}

/* ───────────────────────── Paper grain (shared bump map) ───────────────────────── */

export function createPaperGrain(): THREE.CanvasTexture {
  const canvas = createCanvas(512, 512);
  const context = get2dContext(canvas);
  const image = context.createImageData(canvas.width, canvas.height);
  for (let index = 0; index < image.data.length; index += 4) {
    const grain = 118 + Math.random() * 20 + (Math.random() > 0.97 ? 14 : 0);
    image.data[index] = grain;
    image.data[index + 1] = grain;
    image.data[index + 2] = grain;
    image.data[index + 3] = 255;
  }
  context.putImageData(image, 0, 0);
  const texture = toDataTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  return texture;
}

/* ───────────────────────── Logo mask ───────────────────────── */

const LOGO_SOURCE = '/images/Logo/DesignNPrint.png';
let logoMaskPromise: Promise<HTMLCanvasElement | null> | null = null;

/**
 * The logo PNG is white-on-transparent with a soft glow. We extract only the
 * crisp white lettering (cropped tight) as a white-on-transparent mask so it can
 * be re-coloured as foil, ink, spot-UV or emboss.
 */
export function loadLogoMask(): Promise<HTMLCanvasElement | null> {
  if (logoMaskPromise) return logoMaskPromise;

  logoMaskPromise = new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      try {
        const full = createCanvas(image.naturalWidth, image.naturalHeight);
        const context = get2dContext(full);
        context.drawImage(image, 0, 0);
        const pixels = context.getImageData(0, 0, full.width, full.height);
        const data = pixels.data;

        let minX = full.width;
        let minY = full.height;
        let maxX = 0;
        let maxY = 0;

        for (let pixelIndex = 0; pixelIndex < data.length; pixelIndex += 4) {
          const brightness = Math.min(data[pixelIndex], data[pixelIndex + 1], data[pixelIndex + 2]);
          const isLettering = brightness > 205 && data[pixelIndex + 3] > 180;
          data[pixelIndex] = 255;
          data[pixelIndex + 1] = 255;
          data[pixelIndex + 2] = 255;
          data[pixelIndex + 3] = isLettering ? 255 : 0;
          if (isLettering) {
            const pixelNumber = pixelIndex / 4;
            const x = pixelNumber % full.width;
            const y = Math.floor(pixelNumber / full.width);
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
        context.putImageData(pixels, 0, 0);

        if (maxX <= minX || maxY <= minY) {
          resolve(null);
          return;
        }

        const cropped = createCanvas(maxX - minX + 1, maxY - minY + 1);
        get2dContext(cropped).drawImage(full, minX, minY, cropped.width, cropped.height, 0, 0, cropped.width, cropped.height);
        resolve(cropped);
      } catch (error) {
        console.error('Logo mask extraction failed', error);
        resolve(null);
      }
    };
    image.onerror = () => {
      console.error('Logo image failed to load');
      resolve(null);
    };
    image.src = LOGO_SOURCE;
  });

  return logoMaskPromise;
}

/** Draw the logo mask centred at (centerX, centerY), `width` wide, filled with any style. */
export function drawLogo(
  context: CanvasRenderingContext2D,
  mask: HTMLCanvasElement | null,
  centerX: number,
  centerY: number,
  width: number,
  fill: string | ((tint: CanvasRenderingContext2D, w: number, h: number) => CanvasGradient | string),
  fallbackText = 'DESIGN N PRINTS',
): { width: number; height: number } {
  if (!mask) {
    context.save();
    context.fillStyle = typeof fill === 'string' ? fill : '#ffffff';
    context.font = `800 ${width * 0.12}px sans-serif`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(fallbackText, centerX, centerY);
    context.restore();
    return { width, height: width * 0.12 };
  }

  const height = (width * mask.height) / mask.width;
  const tint = createCanvas(width, height);
  const tintContext = get2dContext(tint);
  tintContext.drawImage(mask, 0, 0, tint.width, tint.height);
  tintContext.globalCompositeOperation = 'source-in';
  tintContext.fillStyle = typeof fill === 'string' ? fill : fill(tintContext, tint.width, tint.height);
  tintContext.fillRect(0, 0, tint.width, tint.height);
  context.drawImage(tint, centerX - width / 2, centerY - height / 2);
  return { width, height };
}

/** Four-bar CMYK registration strip. */
export function drawCmykStrip(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  palette: BrandPalette,
): void {
  const colors = [palette.red, palette.yellow, palette.green, palette.blue];
  const barWidth = width / colors.length;
  colors.forEach((color, index) => {
    context.fillStyle = color;
    context.fillRect(x + index * barWidth, y, barWidth + 0.5, height);
  });
}

export function createFoilGradient(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  palette: BrandPalette,
): CanvasGradient {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, palette.foil);
  gradient.addColorStop(0.35, palette.foilLight);
  gradient.addColorStop(0.55, palette.foil);
  gradient.addColorStop(0.8, palette.foilLight);
  gradient.addColorStop(1, palette.foil);
  return gradient;
}

export function disposeAll(items: Array<{ dispose: () => void } | null | undefined>): void {
  items.forEach((item) => item?.dispose());
}
