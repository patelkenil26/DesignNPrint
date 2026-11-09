import * as THREE from 'three';

/** Figma-style arrow, tip at the origin, in unit coordinates (y points down the arrow). */
const ARROW_POINTS: Array<[number, number]> = [
  [0, 0],
  [0, -1.0],
  [0.26, -0.78],
  [0.42, -1.12],
  [0.58, -1.05],
  [0.43, -0.72],
  [0.78, -0.72],
];
const ARROW_CENTER: [number, number] = [0.3, -0.62];
const CURSOR_SIZE = 0.17;

function arrowShape(grow: number): THREE.Shape {
  const shape = new THREE.Shape();
  ARROW_POINTS.forEach(([x, y], index) => {
    const px = (ARROW_CENTER[0] + (x - ARROW_CENTER[0]) * grow) * CURSOR_SIZE;
    const py = (ARROW_CENTER[1] + (y - ARROW_CENTER[1]) * grow) * CURSOR_SIZE;
    if (index === 0) shape.moveTo(px, py);
    else shape.lineTo(px, py);
  });
  shape.closePath();
  return shape;
}

export interface CursorMesh {
  group: THREE.Group;
  dispose: () => void;
}

/** A multiplayer-style cursor: coloured arrow with a white outline, always drawn on top of the scene. */
export function createCursorMesh(fillColor: string, outlineColor: string): CursorMesh {
  const outlineGeometry = new THREE.ShapeGeometry(arrowShape(1.32));
  const fillGeometry = new THREE.ShapeGeometry(arrowShape(1));
  const outlineMaterial = new THREE.MeshBasicMaterial({ color: outlineColor, depthTest: false, toneMapped: false });
  const fillMaterial = new THREE.MeshBasicMaterial({ color: fillColor, depthTest: false, toneMapped: false });

  const outline = new THREE.Mesh(outlineGeometry, outlineMaterial);
  outline.renderOrder = 30;
  const fill = new THREE.Mesh(fillGeometry, fillMaterial);
  fill.renderOrder = 31;
  fill.position.z = 0.001;

  const group = new THREE.Group();
  group.add(outline, fill);
  return {
    group,
    dispose: () => {
      outlineGeometry.dispose();
      fillGeometry.dispose();
      outlineMaterial.dispose();
      fillMaterial.dispose();
    },
  };
}

export const TRAIL_LENGTH = 16;
const TRAIL_STEP_SECONDS = 0.022;

export interface CursorTrails {
  points: THREE.Points;
  /** Record the current cursor positions (`presence` 0 → 1 fades a trail out). Call every frame. */
  update: (positions: THREE.Vector3[], presence: number[], now: number, pixelRatio: number) => void;
  dispose: () => void;
}

const TRAIL_VERTEX_SHADER = /* glsl */ `
  attribute float aAge;
  attribute float aPresence;
  attribute vec3 aColor;
  uniform float uPixelRatio;
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    float fade = 1.0 - aAge;
    vAlpha = fade * fade * aPresence;
    vColor = aColor;
    gl_PointSize = (2.0 + 5.0 * fade) * uPixelRatio * aPresence;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const TRAIL_FRAGMENT_SHADER = /* glsl */ `
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    float distanceFromCentre = length(gl_PointCoord - 0.5);
    if (distanceFromCentre > 0.5) discard;
    gl_FragColor = vec4(vColor, vAlpha * smoothstep(0.5, 0.15, distanceFromCentre) * 0.85);
  }
`;

/** Soft comet trails behind every cursor — one Points object for all cursors. */
export function createCursorTrails(colors: string[]): CursorTrails {
  const count = colors.length * TRAIL_LENGTH;
  const positions = new Float32Array(count * 3);
  const ages = new Float32Array(count);
  const presences = new Float32Array(count);
  const colorValues = new Float32Array(count * 3);
  const history = colors.map(() => Array.from({ length: TRAIL_LENGTH }, () => new THREE.Vector3(0, 0, -50)));

  colors.forEach((color, cursorIndex) => {
    const rgb = new THREE.Color(color);
    for (let step = 0; step < TRAIL_LENGTH; step += 1) {
      const slot = cursorIndex * TRAIL_LENGTH + step;
      ages[slot] = step / TRAIL_LENGTH;
      colorValues.set([rgb.r, rgb.g, rgb.b], slot * 3);
    }
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aAge', new THREE.BufferAttribute(ages, 1));
  geometry.setAttribute('aPresence', new THREE.BufferAttribute(presences, 1));
  geometry.setAttribute('aColor', new THREE.BufferAttribute(colorValues, 3));

  const material = new THREE.ShaderMaterial({
    vertexShader: TRAIL_VERTEX_SHADER,
    fragmentShader: TRAIL_FRAGMENT_SHADER,
    uniforms: { uPixelRatio: { value: 1 } },
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });
  const points = new THREE.Points(geometry, material);
  points.renderOrder = 20;
  points.frustumCulled = false;

  let lastStep = 0;
  return {
    points,
    update: (cursorPositions, presence, now, pixelRatio) => {
      material.uniforms.uPixelRatio.value = pixelRatio;
      const shouldRecord = now - lastStep >= TRAIL_STEP_SECONDS;
      if (shouldRecord) lastStep = now;
      history.forEach((trail, cursorIndex) => {
        if (shouldRecord) {
          const oldest = trail.pop();
          if (oldest) trail.unshift(oldest.copy(cursorPositions[cursorIndex]));
        }
        for (let step = 0; step < TRAIL_LENGTH; step += 1) {
          const slot = cursorIndex * TRAIL_LENGTH + step;
          positions.set([trail[step].x, trail[step].y, trail[step].z], slot * 3);
          presences[slot] = presence[cursorIndex];
        }
      });
      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.aPresence.needsUpdate = true;
    },
    dispose: () => {
      geometry.dispose();
      material.dispose();
    },
  };
}

/** Soft blurred blob that sits behind an object to give it a floating drop-shadow. */
export function createSoftShadow(color: string): { mesh: THREE.Mesh; dispose: () => void } {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  if (context) {
    const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.55, `${color}66`);
    gradient.addColorStop(1, `${color}00`);
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const geometry = new THREE.PlaneGeometry(1, 1);
  const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0, depthWrite: false, toneMapped: false });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.visible = false;
  return {
    mesh,
    dispose: () => {
      geometry.dispose();
      material.dispose();
      texture.dispose();
    },
  };
}

export interface SelectionFrame {
  group: THREE.Group;
  /** Resize the frame (world units) and set its opacity (0 → 1). */
  update: (width: number, height: number, opacity: number) => void;
  dispose: () => void;
}

const HANDLE_SIZE = 0.085;

/** Design-tool selection box (thin outline + four corner handles) shown while an object is being made. */
export function createSelectionFrame(color: string): SelectionFrame {
  const lineMaterial = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0, depthTest: false, toneMapped: false });
  const outlineGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-0.5, -0.5, 0),
    new THREE.Vector3(0.5, -0.5, 0),
    new THREE.Vector3(0.5, 0.5, 0),
    new THREE.Vector3(-0.5, 0.5, 0),
  ]);
  const outline = new THREE.LineLoop(outlineGeometry, lineMaterial);
  outline.renderOrder = 25;

  const handleGeometry = new THREE.PlaneGeometry(HANDLE_SIZE, HANDLE_SIZE);
  const handleMaterial = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, depthTest: false, toneMapped: false });
  const handles = [0, 1, 2, 3].map(() => {
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.renderOrder = 26;
    return handle;
  });

  const group = new THREE.Group();
  group.add(outline, ...handles);
  group.visible = false;

  return {
    group,
    update: (width, height, opacity) => {
      group.visible = opacity > 0.01;
      lineMaterial.opacity = opacity;
      handleMaterial.opacity = opacity;
      outline.scale.set(width, height, 1);
      handles.forEach((handle, index) => {
        handle.position.set((index % 2 === 0 ? -0.5 : 0.5) * width, (index < 2 ? -0.5 : 0.5) * height, 0);
      });
    },
    dispose: () => {
      outlineGeometry.dispose();
      handleGeometry.dispose();
      lineMaterial.dispose();
      handleMaterial.dispose();
    },
  };
}
