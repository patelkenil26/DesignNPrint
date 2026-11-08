import * as THREE from 'three';

/**
 * Procedural canvas texture generator for print & packaging assets.
 * Creates sharp, high-DPI textures with gold foil accents and CMYK registration marks.
 */
export function createVisitingCardTexture(): {
  colorMap: THREE.CanvasTexture;
  roughnessMap: THREE.CanvasTexture;
  metalnessMap: THREE.CanvasTexture;
} {
  const width = 1024;
  const height = 585; // Standard 3.5" x 2" aspect ratio

  // 1. Color Map
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = width;
  colorCanvas.height = height;
  const ctx = colorCanvas.getContext('2d')!;

  // Deep Premium Matte Charcoal Background
  ctx.fillStyle = '#0f1115';
  ctx.fillRect(0, 0, width, height);

  // Subtle paper grain noise
  const imgData = ctx.getImageData(0, 0, width, height);
  for (let i = 0; i < imgData.data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 8;
    imgData.data[i] = Math.max(0, Math.min(255, imgData.data[i] + noise));
    imgData.data[i + 1] = Math.max(0, Math.min(255, imgData.data[i + 1] + noise));
    imgData.data[i + 2] = Math.max(0, Math.min(255, imgData.data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  // Elegant Gold Foil Border (Thin Hairline)
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 4;
  ctx.strokeRect(30, 30, width - 60, height - 60);

  // CMYK Registration Marks (Top Corner)
  ctx.strokeStyle = '#4a5568';
  ctx.lineWidth = 1;
  // Crosshair
  ctx.beginPath();
  ctx.moveTo(50, 40); ctx.lineTo(50, 60);
  ctx.moveTo(40, 50); ctx.lineTo(60, 50);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(50, 50, 6, 0, Math.PI * 2);
  ctx.stroke();

  // "DESIGN N PRINT" Brand Emblem (Gold Foil typography)
  ctx.fillStyle = '#e5c058';
  ctx.font = 'bold 44px sans-serif';
  ctx.letterSpacing = '6px';
  ctx.fillText('DESIGN N PRINT', 70, 200);

  // Subtitle
  ctx.fillStyle = '#a0aec0';
  ctx.font = '500 18px sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillText('COMMERCIAL PACKAGING & PRECISION PRESS', 70, 240);

  // Paper Spec Badge (Velvet Matte + Gold Stamped)
  ctx.fillStyle = '#1a202c';
  ctx.fillRect(70, 280, 260, 36);
  ctx.strokeStyle = '#e5c058';
  ctx.lineWidth = 1;
  ctx.strokeRect(70, 280, 260, 36);
  ctx.fillStyle = '#e5c058';
  ctx.font = '600 14px sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('450 GSM • VELVET MATTE', 85, 304);

  // Footer Details (Ahmedabad, Gujarat)
  ctx.fillStyle = '#718096';
  ctx.font = '400 15px sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillText('AHMEDABAD, GUJARAT  |  OFFSET & DIGITAL', 70, 510);

  // 2. Roughness Map (Matte paper = high roughness 0.85, Gold foil = low roughness 0.2)
  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = width;
  roughCanvas.height = height;
  const rCtx = roughCanvas.getContext('2d')!;
  rCtx.fillStyle = '#d9d9d9'; // Velvet paper roughness
  rCtx.fillRect(0, 0, width, height);

  // Gold foil parts are super smooth (dark on roughness map)
  rCtx.fillStyle = '#222222';
  rCtx.lineWidth = 4;
  rCtx.strokeRect(30, 30, width - 60, height - 60);
  rCtx.font = 'bold 44px sans-serif';
  rCtx.letterSpacing = '6px';
  rCtx.fillText('DESIGN N PRINT', 70, 200);
  rCtx.strokeRect(70, 280, 260, 36);
  rCtx.font = '600 14px sans-serif';
  rCtx.letterSpacing = '2px';
  rCtx.fillText('450 GSM • VELVET MATTE', 85, 304);

  // 3. Metalness Map (Paper = 0, Gold foil = 1)
  const metalCanvas = document.createElement('canvas');
  metalCanvas.width = width;
  metalCanvas.height = height;
  const mCtx = metalCanvas.getContext('2d')!;
  mCtx.fillStyle = '#000000'; // Paper has 0 metalness
  mCtx.fillRect(0, 0, width, height);

  // Gold foil parts have high metalness (pure white on metalness map)
  mCtx.fillStyle = '#ffffff';
  mCtx.strokeStyle = '#ffffff';
  mCtx.lineWidth = 4;
  mCtx.strokeRect(30, 30, width - 60, height - 60);
  mCtx.font = 'bold 44px sans-serif';
  mCtx.letterSpacing = '6px';
  mCtx.fillText('DESIGN N PRINT', 70, 200);
  mCtx.strokeRect(70, 280, 260, 36);
  mCtx.font = '600 14px sans-serif';
  mCtx.letterSpacing = '2px';
  mCtx.fillText('450 GSM • VELVET MATTE', 85, 304);

  const colorMap = new THREE.CanvasTexture(colorCanvas);
  const roughnessMap = new THREE.CanvasTexture(roughCanvas);
  const metalnessMap = new THREE.CanvasTexture(metalCanvas);

  [colorMap, roughnessMap, metalnessMap].forEach((tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
  });

  return { colorMap, roughnessMap, metalnessMap };
}

/**
 * Creates box face textures for 3D packaging.
 */
export function createBoxTexture(title: string, subtitle: string): {
  colorMap: THREE.CanvasTexture;
  roughnessMap: THREE.CanvasTexture;
  metalnessMap: THREE.CanvasTexture;
} {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // Deep matte brand background
  ctx.fillStyle = '#12141a';
  ctx.fillRect(0, 0, size, size);

  // Geometric packaging pattern
  ctx.strokeStyle = '#1e222d';
  ctx.lineWidth = 2;
  for (let i = 0; i < size; i += 80) {
    ctx.beginPath();
    ctx.moveTo(i, 0); ctx.lineTo(i, size);
    ctx.moveTo(0, i); ctx.lineTo(size, i);
    ctx.stroke();
  }

  // Golden accent frame
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 6;
  ctx.strokeRect(60, 60, size - 120, size - 120);

  // Center Emblem
  ctx.fillStyle = '#e5c058';
  ctx.font = 'bold 64px sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '6px';
  ctx.fillText(title, size / 2, size / 2 - 20);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 24px sans-serif';
  ctx.letterSpacing = '4px';
  ctx.fillText(subtitle, size / 2, size / 2 + 50);

  // Barcode / QC badge at bottom
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(size / 2 - 120, size - 160, 240, 50);
  ctx.fillStyle = '#000000';
  for (let x = size / 2 - 100; x < size / 2 + 100; x += 6) {
    if (Math.random() > 0.3) {
      ctx.fillRect(x, size - 155, 3, 40);
    }
  }

  const colorMap = new THREE.CanvasTexture(canvas);
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.needsUpdate = true;

  // Simple roughness & metalness
  const rCanvas = document.createElement('canvas');
  rCanvas.width = size;
  rCanvas.height = size;
  const rCtx = rCanvas.getContext('2d')!;
  rCtx.fillStyle = '#cccccc';
  rCtx.fillRect(0, 0, size, size);
  rCtx.fillStyle = '#111111';
  rCtx.strokeRect(60, 60, size - 120, size - 120);
  rCtx.fillText(title, size / 2, size / 2 - 20);
  const roughnessMap = new THREE.CanvasTexture(rCanvas);
  roughnessMap.needsUpdate = true;

  const mCanvas = document.createElement('canvas');
  mCanvas.width = size;
  mCanvas.height = size;
  const mCtx = mCanvas.getContext('2d')!;
  mCtx.fillStyle = '#000000';
  mCtx.fillRect(0, 0, size, size);
  mCtx.fillStyle = '#ffffff';
  mCtx.strokeRect(60, 60, size - 120, size - 120);
  mCtx.fillText(title, size / 2, size / 2 - 20);
  const metalnessMap = new THREE.CanvasTexture(mCanvas);
  metalnessMap.needsUpdate = true;

  return { colorMap, roughnessMap, metalnessMap };
}

