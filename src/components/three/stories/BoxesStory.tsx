'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { smoothStep } from '@/lib/useScrollTrack';
import PackagingBox, { BoxPhase } from '../PackagingBox';
import { BOX_DIMS } from '../utils/boxTextures';
import { StoryProps, VERTICAL_BOX_DIMS } from './storyTextures';

const FLOOR_Y = -1.25;

const buildClosedPhase = (): BoxPhase => ({
  sideGrow: 1,
  fbGrow: 1,
  lidGrow: 1,
  lipGrow: 1,
  sideFold: 1,
  fbFold: 1,
  lidFold: 1,
  lipFold: 1,
});

/** A horizontal and a vertical box drop in side by side, then their lids open to show the printed interior. */
export default function BoxesStory({ build, textures }: StoryProps) {
  const horizontalGroup = useRef<THREE.Group>(null);
  const verticalGroup = useRef<THREE.Group>(null);
  const horizontalPhase = useRef<BoxPhase>(buildClosedPhase());
  const verticalPhase = useRef<BoxPhase>(buildClosedPhase());

  useFrame((state) => {
    const progress = build.current;
    const time = state.clock.elapsedTime;
    const dropH = smoothStep(0, 0.22, progress);
    const dropV = smoothStep(0.1, 0.32, progress);
    const open = smoothStep(0.36, 0.64, progress);
    const breathe = 0.5 + 0.5 * Math.sin(time * 0.9);

    horizontalPhase.current.lidFold = 1 - open * (0.62 + 0.18 * breathe);
    verticalPhase.current.lidFold = 1 - open * (0.62 + 0.18 * (1 - breathe));

    if (horizontalGroup.current) {
      horizontalGroup.current.scale.setScalar(Math.max(0.001, dropH));
      horizontalGroup.current.position.set(-1.9, FLOOR_Y + BOX_DIMS.thickness / 2 + (1 - dropH) * 2.5, 0.3);
      horizontalGroup.current.rotation.y = -0.55 + Math.sin(time * 0.4) * 0.12 + state.pointer.x * 0.3;
    }
    if (verticalGroup.current) {
      verticalGroup.current.scale.setScalar(Math.max(0.001, dropV));
      verticalGroup.current.position.set(1.9, FLOOR_Y + VERTICAL_BOX_DIMS.thickness / 2 + (1 - dropV) * 2.5, -0.2);
      verticalGroup.current.rotation.y = 0.5 + Math.sin(time * 0.4 + 1) * 0.12 + state.pointer.x * 0.3;
    }
  });

  return (
    <group scale={0.82}>
      <group ref={horizontalGroup}>
        <PackagingBox phaseRef={horizontalPhase} textures={textures.boxHorizontal} dims={BOX_DIMS} />
      </group>
      <group ref={verticalGroup}>
        <PackagingBox phaseRef={verticalPhase} textures={textures.boxVertical} dims={VERTICAL_BOX_DIMS} />
      </group>
    </group>
  );
}
