'use client';

import { useRef } from 'react';
import { ContactShadows } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import PackagingBox, { BoxPhase } from './PackagingBox';
import StageCanvas, { StudioLighting } from './StageCanvas';
import { useBoxTextures } from './useBoxTextures';

/** The finished box, lid slowly breathing open to show the printed interior. */
function CtaBox() {
  const textures = useBoxTextures();
  const rigRef = useRef<THREE.Group>(null);
  const phaseRef = useRef<BoxPhase>({
    sideGrow: 1,
    fbGrow: 1,
    lidGrow: 1,
    lipGrow: 1,
    sideFold: 1,
    fbFold: 1,
    lidFold: 0.2,
    lipFold: 1,
  });

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    phaseRef.current.lidFold = 0.18 + 0.22 * (0.5 + 0.5 * Math.sin(time * 0.9));
    if (rigRef.current) {
      rigRef.current.rotation.y = -0.6 + Math.sin(time * 0.35) * 0.35 + state.pointer.x * 0.5;
      rigRef.current.rotation.x = -state.pointer.y * 0.12;
    }
  });

  if (!textures) return null;

  return (
    <group ref={rigRef} position={[0, -0.6, 0]}>
      <PackagingBox phaseRef={phaseRef} textures={textures} />
    </group>
  );
}

export default function CtaBoxScene() {
  return (
    <StageCanvas cameraPosition={[0, 3.2, 7]} fov={34}>
      <StudioLighting keyIntensity={1.3} />
      <ContactShadows position={[0, -0.62, 0]} opacity={0.55} scale={10} blur={2.6} far={3} resolution={512} />
      <CtaBox />
    </StageCanvas>
  );
}
