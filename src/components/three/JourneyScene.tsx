'use client';

import { useMemo, useRef } from 'react';
import { ContactShadows } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import PackagingBox, { BoxPhase, FLAT_CARD_PHASE } from './PackagingBox';
import StageCanvas, { StudioLighting } from './StageCanvas';
import { useBoxTextures } from './useBoxTextures';
import { BOX_DIMS } from './utils/boxTextures';
import { smoothStep } from '@/lib/useScrollTrack';

const FLOOR_Y = -0.5;
/** vertical distance of the flat sheet's centre from the base centre (lid side is longer) */
const FLAT_SHEET_CENTER_SHIFT = 1.05;

interface CameraKey {
  at: number;
  position: [number, number, number];
  look: [number, number, number];
}

const CAMERA_KEYS: CameraKey[] = [
  { at: 0, position: [0, 0.5, 6.8], look: [0, 0.3, 0] },
  { at: 0.26, position: [0, 7.2, 8.6], look: [0, -0.4, 0] },
  { at: 0.48, position: [5.0, 5.2, 7.6], look: [0, 0, 0] },
  { at: 0.72, position: [3.6, 3.0, 6.6], look: [0, 0.1, 0] },
  { at: 1, position: [0.4, 1.6, 6.2], look: [0, 0.1, 0] },
];

const scratchPosition = new THREE.Vector3();
const scratchLook = new THREE.Vector3();

function sampleCamera(progress: number, distanceScale: number): void {
  let index = 0;
  for (let i = 0; i < CAMERA_KEYS.length - 1; i += 1) {
    if (progress >= CAMERA_KEYS[i].at) index = i;
  }
  const from = CAMERA_KEYS[index];
  const to = CAMERA_KEYS[Math.min(index + 1, CAMERA_KEYS.length - 1)];
  const localT = to.at === from.at ? 0 : smoothStep(from.at, to.at, progress);

  scratchLook.set(...from.look).lerp(new THREE.Vector3(...to.look), localT);
  scratchPosition.set(...from.position).lerp(new THREE.Vector3(...to.position), localT);
  // pull the camera back on narrow screens so the whole sheet fits
  scratchPosition.sub(scratchLook).multiplyScalar(distanceScale).add(scratchLook);
}

function JourneyStage({ getProgress }: { getProgress: () => number }) {
  const textures = useBoxTextures();
  const phaseRef = useRef<BoxPhase>({ ...FLAT_CARD_PHASE });
  const smoothProgress = useRef(0);

  const rig = useRef<THREE.Group>(null);
  const sheetShift = useRef<THREE.Group>(null);
  const ghostBlue = useRef<THREE.Mesh>(null);
  const ghostYellow = useRef<THREE.Mesh>(null);

  const ghostMaterials = useMemo(() => {
    if (!textures) return null;
    const make = (color: string) => new THREE.MeshPhysicalMaterial({ color, roughness: 0.55, sheen: 0.5, bumpMap: textures.grain, bumpScale: 0.3 });
    return { blue: make(textures.palette.blue), yellow: make(textures.palette.yellow) };
  }, [textures]);

  useFrame((state, delta) => {
    smoothProgress.current = THREE.MathUtils.damp(smoothProgress.current, getProgress(), 7, delta);
    const p = smoothProgress.current;
    const time = state.clock.elapsedTime;
    const aspect = state.size.width / state.size.height;
    const isNarrow = aspect < 1.05;

    // ── which parts of the box are alive at this scroll position
    const phase = phaseRef.current;
    phase.sideGrow = smoothStep(0.24, 0.32, p);
    phase.fbGrow = smoothStep(0.3, 0.38, p);
    phase.lidGrow = smoothStep(0.36, 0.42, p);
    phase.lipGrow = smoothStep(0.4, 0.44, p);
    phase.sideFold = smoothStep(0.46, 0.54, p);
    phase.fbFold = smoothStep(0.52, 0.6, p);
    phase.lidFold = smoothStep(0.62, 0.7, p);
    phase.lipFold = smoothStep(0.69, 0.75, p);

    // ── rig: upright card → flat sheet → finished box
    const standing = 1 - smoothStep(0.1, 0.26, p);
    const finale = smoothStep(0.76, 0.88, p);
    const sideWeight = Math.max(standing, finale);

    if (rig.current) {
      const floatY = Math.sin(time * 1.2) * 0.07 * standing;
      rig.current.rotation.order = 'YXZ';
      rig.current.rotation.x = standing * (Math.PI / 2) - state.pointer.y * 0.12 * standing;
      rig.current.rotation.y =
        (-0.5 + state.pointer.x * 0.35) * standing + smoothStep(0.74, 1, p) * Math.PI * 2;
      rig.current.rotation.z = Math.sin(time * 0.8) * 0.03 * standing;
      rig.current.position.x = (isNarrow ? 0 : 1.6) * sideWeight;
      rig.current.position.y =
        THREE.MathUtils.lerp(FLOOR_Y + BOX_DIMS.thickness / 2, 0.45, standing) + floatY + (isNarrow ? 0.85 * sideWeight : 0);
      rig.current.scale.setScalar(1 + finale * 0.12);
    }

    if (sheetShift.current) {
      sheetShift.current.position.z =
        FLAT_SHEET_CENTER_SHIFT * smoothStep(0.28, 0.42, p) * (1 - smoothStep(0.46, 0.76, p));
    }

    // ── the two cards fanned behind the hero card drift away first
    const ghostGone = smoothStep(0.03, 0.16, p);
    [
      { mesh: ghostBlue.current, x: 0.16, z: -0.12, spin: 0.05 },
      { mesh: ghostYellow.current, x: -0.18, z: -0.05, spin: -0.06 },
    ].forEach(({ mesh, x, z, spin }, index) => {
      if (!mesh) return;
      mesh.visible = ghostGone < 0.995;
      mesh.position.set(x * (1 + ghostGone), -0.12 * (index + 1) - ghostGone * 0.9, z);
      mesh.rotation.y = spin * (1 + ghostGone * 2);
      mesh.scale.setScalar(1 - ghostGone * 0.5);
    });

    // ── camera
    sampleCamera(p, isNarrow ? 1.55 : aspect < 1.4 ? 1.2 : 1);
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, scratchPosition.x, 4, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, scratchPosition.y, 4, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, scratchPosition.z, 4, delta);
    state.camera.lookAt(scratchLook);
  });

  return (
    <>
      <StudioLighting />
      <ContactShadows position={[0, FLOOR_Y - 0.02, 0]} opacity={0.4} scale={16} blur={2.8} far={3.5} resolution={512} />

      {textures && ghostMaterials && (
        <group ref={rig}>
          <mesh ref={ghostBlue} material={ghostMaterials.blue}>
            <boxGeometry args={[BOX_DIMS.width, BOX_DIMS.thickness, BOX_DIMS.depth]} />
          </mesh>
          <mesh ref={ghostYellow} material={ghostMaterials.yellow}>
            <boxGeometry args={[BOX_DIMS.width, BOX_DIMS.thickness, BOX_DIMS.depth]} />
          </mesh>
          <group ref={sheetShift}>
            <PackagingBox phaseRef={phaseRef} textures={textures} />
          </group>
        </group>
      )}
    </>
  );
}

export default function JourneyScene({ getProgress }: { getProgress: () => number }) {
  return (
    <StageCanvas cameraPosition={[0, 0.5, 6.8]}>
      <JourneyStage getProgress={getProgress} />
    </StageCanvas>
  );
}
