'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ContactShadows } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import StageCanvas, { StudioLighting } from './StageCanvas';
import {
  BrandPalette,
  createCanvas,
  createPaperGrain,
  drawLogo,
  get2dContext,
  loadLogoMask,
  readBrandPalette,
} from './utils/canvasKit';
import { smoothStep } from '@/lib/useScrollTrack';

const SHEET = { length: 3, width: 2, thickness: 0.02 };
const STATION_X = [-2.4, -0.8, 0.8, 2.4];
const ROLLER_RADIUS = 0.3;
const ROLLER_LENGTH = 2.5;
const SHEET_START_X = -6.4;
const SHEET_END_X = 4.4;
const ART_WIDTH = 1024;
const ART_HEIGHT = Math.round((ART_WIDTH * SHEET.width) / SHEET.length);

/** One printing "separation" (a single ink) of an abstract poster. */
function paintSeparation(channel: 0 | 1 | 2 | 3, color: string, logoMask: HTMLCanvasElement | null): THREE.CanvasTexture {
  const canvas = createCanvas(ART_WIDTH, ART_HEIGHT);
  const context = get2dContext(canvas);
  context.fillStyle = color;

  if (channel === 0) {
    context.beginPath();
    context.arc(ART_WIDTH * 0.3, ART_HEIGHT * 0.48, ART_HEIGHT * 0.3, 0, Math.PI * 2);
    context.fill();
    context.fillRect(ART_WIDTH * 0.08, ART_HEIGHT * 0.84, ART_WIDTH * 0.84, ART_HEIGHT * 0.05);
  } else if (channel === 1) {
    context.beginPath();
    context.arc(ART_WIDTH * 0.52, ART_HEIGHT * 0.52, ART_HEIGHT * 0.26, 0, Math.PI * 2);
    context.fill();
    context.beginPath();
    context.moveTo(ART_WIDTH * 0.7, ART_HEIGHT * 0.2);
    context.lineTo(ART_WIDTH * 0.92, ART_HEIGHT * 0.2);
    context.lineTo(ART_WIDTH * 0.92, ART_HEIGHT * 0.62);
    context.closePath();
    context.fill();
  } else if (channel === 2) {
    context.fillRect(0, ART_HEIGHT * 0.06, ART_WIDTH, ART_HEIGHT * 0.07);
    context.beginPath();
    context.arc(ART_WIDTH * 0.42, ART_HEIGHT * 0.42, ART_HEIGHT * 0.2, 0, Math.PI * 2);
    context.fill();
    for (let bar = 0; bar < 5; bar += 1) {
      context.fillRect(ART_WIDTH * (0.62 + bar * 0.06), ART_HEIGHT * 0.66, ART_WIDTH * 0.03, ART_HEIGHT * 0.2);
    }
  } else {
    context.lineWidth = 8;
    context.strokeStyle = color;
    context.strokeRect(ART_WIDTH * 0.04, ART_HEIGHT * 0.06, ART_WIDTH * 0.92, ART_HEIGHT * 0.88);
    drawLogo(context, logoMask, ART_WIDTH * 0.5, ART_HEIGHT * 0.3, ART_WIDTH * 0.46, color);
    context.fillRect(ART_WIDTH * 0.12, ART_HEIGHT * 0.58, ART_WIDTH * 0.22, ART_HEIGHT * 0.018);
    context.fillRect(ART_WIDTH * 0.12, ART_HEIGHT * 0.63, ART_WIDTH * 0.16, ART_HEIGHT * 0.018);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.premultiplyAlpha = true;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

interface PressAssets {
  palette: BrandPalette;
  separations: THREE.CanvasTexture[];
  grain: THREE.CanvasTexture;
}

function PressStage({ getProgress }: { getProgress: () => number }) {
  const assets = useAssets();
  const smoothProgress = useRef(0);
  const sheetRef = useRef<THREE.Group>(null);
  const topRollers = useRef<Array<THREE.Group | null>>([]);
  const bottomRollers = useRef<Array<THREE.Group | null>>([]);

  const clipPlanes = useMemo(
    () => STATION_X.map((stationX) => new THREE.Plane(new THREE.Vector3(1, 0, 0), -stationX)),
    [],
  );

  const materials = useMemo(() => {
    if (!assets) return null;
    const { palette, grain } = assets;
    const stationColors = [palette.blue, palette.red, palette.yellow, palette.ink];
    return {
      paper: new THREE.MeshStandardMaterial({ color: palette.paper, roughness: 0.9, bumpMap: grain, bumpScale: 0.3 }),
      steel: new THREE.MeshStandardMaterial({ color: palette.paperDeep, metalness: 1, roughness: 0.28 }),
      frame: new THREE.MeshStandardMaterial({ color: palette.inkSoft, roughness: 0.6, metalness: 0.3 }),
      ink: stationColors.map((color) => new THREE.MeshStandardMaterial({ color, roughness: 0.45 })),
      layers: assets.separations.map(
        (texture, index) =>
          new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            premultipliedAlpha: true,
            blending: THREE.MultiplyBlending,
            depthWrite: false,
            toneMapped: false,
            clippingPlanes: [clipPlanes[index]],
          }),
      ),
    };
  }, [assets, clipPlanes]);

  useEffect(
    () => () => {
      if (!materials) return;
      [materials.paper, materials.steel, materials.frame, ...materials.ink, ...materials.layers].forEach((m) => m.dispose());
    },
    [materials],
  );

  useFrame((state, delta) => {
    smoothProgress.current = THREE.MathUtils.damp(smoothProgress.current, getProgress(), 6, delta);
    const progress = smoothProgress.current;
    const aspect = state.size.width / state.size.height;
    const isNarrow = aspect < 1.05;

    // the sheet crosses all four units by p = 0.7, then the camera flies in to show the finished print
    const travel = THREE.MathUtils.clamp((progress - 0.08) / 0.62, 0, 1);
    const reveal = smoothStep(0.7, 0.96, progress);
    if (sheetRef.current) {
      sheetRef.current.position.x = THREE.MathUtils.lerp(SHEET_START_X, SHEET_END_X, travel);
      sheetRef.current.position.y = reveal * 0.9;
      sheetRef.current.rotation.x = reveal * 1.2;
      sheetRef.current.rotation.y = reveal * (-0.1 + state.pointer.x * 0.12);
      sheetRef.current.scale.setScalar(1 + reveal * 0.25);
    }

    const rollerAngle = progress * 46;
    topRollers.current.forEach((roller) => roller && (roller.rotation.z = -rollerAngle));
    bottomRollers.current.forEach((roller) => roller && (roller.rotation.z = rollerAngle));

    const followX = smoothStep(0.5, 0.7, progress) * 2.6;
    const baseDistance = isNarrow ? 19 : aspect < 1.4 ? 15 : 12.5;
    const revealDistance = isNarrow ? 12 : aspect < 1.4 ? 9.5 : 7.4;
    const cameraX = THREE.MathUtils.lerp(followX, SHEET_END_X, reveal);
    state.camera.position.set(
      cameraX + state.pointer.x * 0.4,
      THREE.MathUtils.lerp(4.6, 1.0, reveal) + state.pointer.y * 0.2,
      THREE.MathUtils.lerp(baseDistance, revealDistance, reveal),
    );
    state.camera.lookAt(cameraX, THREE.MathUtils.lerp(0.1, 1.15, reveal), 0);
  });

  if (!assets || !materials) return null;

  return (
    <>
      <StudioLighting keyIntensity={1.2} />
      <ContactShadows position={[0, -1.02, 0]} opacity={0.4} scale={22} blur={2.6} far={3} resolution={512} />

      {/* base */}
      <mesh position={[0, -0.95, 0]} material={materials.frame}>
        <boxGeometry args={[11, 0.12, 3.4]} />
      </mesh>

      {/* four printing units — one ink each */}
      {STATION_X.map((stationX, index) => (
        <group key={stationX} position={[stationX, 0, 0]}>
          {[-1.4, 1.4].map((side) => (
            <mesh key={side} position={[0, 0.1, side]} material={materials.frame}>
              <boxGeometry args={[0.7, 1.7, 0.14]} />
            </mesh>
          ))}
          <mesh position={[0, 1.15, 0]} material={materials.ink[index]}>
            <boxGeometry args={[0.9, 0.26, 2.9]} />
          </mesh>
          <group position={[0, ROLLER_RADIUS, 0]} ref={(node) => { topRollers.current[index] = node; }}>
            <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.steel}>
              <cylinderGeometry args={[ROLLER_RADIUS, ROLLER_RADIUS, ROLLER_LENGTH, 40]} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.ink[index]}>
              <cylinderGeometry args={[ROLLER_RADIUS + 0.012, ROLLER_RADIUS + 0.012, SHEET.width * 0.9, 40]} />
            </mesh>
          </group>
          <group position={[0, -ROLLER_RADIUS, 0]} ref={(node) => { bottomRollers.current[index] = node; }}>
            <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.steel}>
              <cylinderGeometry args={[ROLLER_RADIUS, ROLLER_RADIUS, ROLLER_LENGTH, 40]} />
            </mesh>
          </group>
        </group>
      ))}

      {/* the sheet travelling through the press */}
      <group ref={sheetRef} position={[SHEET_START_X, 0, 0]}>
        <mesh material={materials.paper}>
          <boxGeometry args={[SHEET.length, SHEET.thickness, SHEET.width]} />
        </mesh>
        {materials.layers.map((material, index) => (
          <mesh
            key={index}
            position={[0, SHEET.thickness / 2 + 0.002 * (index + 1), 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            material={material}
            renderOrder={index + 1}
          >
            <planeGeometry args={[SHEET.length, SHEET.width]} />
          </mesh>
        ))}
      </group>
    </>
  );
}

/** Builds the poster separations once the logo is loaded; disposes them on unmount. */
function useAssets(): PressAssets | null {
  const [assets, setAssets] = useState<PressAssets | null>(null);

  useEffect(() => {
    let isCancelled = false;
    let built: PressAssets | null = null;

    loadLogoMask().then((logoMask) => {
      if (isCancelled) return;
      const palette = readBrandPalette();
      built = {
        palette,
        separations: [
          paintSeparation(0, palette.blue, logoMask),
          paintSeparation(1, palette.red, logoMask),
          paintSeparation(2, palette.yellow, logoMask),
          paintSeparation(3, palette.ink, logoMask),
        ],
        grain: createPaperGrain(),
      };
      setAssets(built);
    });

    return () => {
      isCancelled = true;
      built?.separations.forEach((texture) => texture.dispose());
      built?.grain.dispose();
    };
  }, []);

  return assets;
}

export default function PressScene({ getProgress }: { getProgress: () => number }) {
  return (
    <StageCanvas cameraPosition={[0, 4.6, 12.5]} fov={34} localClipping>
      <PressStage getProgress={getProgress} />
    </StageCanvas>
  );
}
