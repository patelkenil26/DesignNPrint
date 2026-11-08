'use client';

import { Suspense, useRef } from 'react';
import { ContactShadows, Image } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import StageCanvas, { StudioLighting } from './StageCanvas';
import type { ShowcaseProduct } from '@/data/homeData';

const RING_RADIUS = 4.6;
const CARD_SIZE: [number, number] = [2.3, 1.55];

interface RingStageProps {
  products: ShowcaseProduct[];
  getProgress: () => number;
  onActiveChange: (index: number) => void;
}

function RingStage({ products, getProgress, onActiveChange }: RingStageProps) {
  const ringRef = useRef<THREE.Group>(null);
  const itemRefs = useRef<Array<THREE.Group | null>>([]);
  const smoothProgress = useRef(0);
  const lastActive = useRef(-1);
  const stepAngle = (Math.PI * 2) / products.length;

  useFrame((state, delta) => {
    smoothProgress.current = THREE.MathUtils.damp(smoothProgress.current, getProgress(), 6, delta);
    const progress = smoothProgress.current;
    const aspect = state.size.width / state.size.height;
    const isNarrow = aspect < 1.05;
    const position = progress * (products.length - 1);

    if (ringRef.current) {
      ringRef.current.rotation.y = -position * stepAngle;
      ringRef.current.position.x = isNarrow ? 0 : 2.9;
      ringRef.current.position.y = isNarrow ? 0.9 : 0;
      ringRef.current.scale.setScalar(isNarrow ? 0.72 : 0.9);
    }

    products.forEach((_, index) => {
      const item = itemRefs.current[index];
      if (!item) return;
      const closeness = Math.max(0, 1 - Math.abs(position - index));
      const targetScale = 1 + closeness * 0.28;
      item.scale.setScalar(THREE.MathUtils.damp(item.scale.x, targetScale, 8, delta));
      item.position.z = THREE.MathUtils.damp(item.position.z, RING_RADIUS + closeness * 0.5, 8, delta);
    });

    const activeIndex = Math.round(position);
    if (activeIndex !== lastActive.current) {
      lastActive.current = activeIndex;
      onActiveChange(activeIndex);
    }

    state.camera.position.set(Math.sin(state.pointer.x * 0.25) * 1.2, 1.1 + state.pointer.y * 0.3, isNarrow ? 14.5 : 11.2);
    state.camera.lookAt(isNarrow ? 0 : 0.2, 0.1, 0);
  });

  return (
    <>
      <StudioLighting keyIntensity={1} />
      <ContactShadows position={[0, -1.35, 2]} opacity={0.3} scale={16} blur={3} far={4} resolution={512} />
      <group ref={ringRef}>
        <Suspense fallback={null}>
          {products.map((product, index) => (
            <group key={product.id} rotation-y={index * stepAngle}>
              <group
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                position={[0, 0, RING_RADIUS]}
              >
                {/* drei <Image> is a WebGL plane, not an <img>; the product name is exposed in the page copy */}
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image url={product.image} scale={CARD_SIZE} radius={0.07} toneMapped={false} />
              </group>
            </group>
          ))}
        </Suspense>
      </group>
    </>
  );
}

export default function ProductRingScene(props: RingStageProps) {
  return (
    <StageCanvas cameraPosition={[0, 1.1, 11.2]} fov={32}>
      <RingStage {...props} />
    </StageCanvas>
  );
}
