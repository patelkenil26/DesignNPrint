'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ContactShadows } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import StageCanvas, { StudioLighting } from './StageCanvas';
import { readBrandPalette } from './utils/canvasKit';
import { CARD_SIZE, FinishTextureSet, buildFinishTextures } from './utils/finishTextures';
import type { FinishId } from '@/data/homeData';

function useFinishTextures(): FinishTextureSet | null {
  const [textureSet, setTextureSet] = useState<FinishTextureSet | null>(null);

  useEffect(() => {
    let isCancelled = false;
    let built: FinishTextureSet | null = null;
    buildFinishTextures(readBrandPalette())
      .then((result) => {
        if (isCancelled) {
          result.dispose();
          return;
        }
        built = result;
        setTextureSet(result);
      })
      .catch((error) => console.error('Failed to build finish textures', error));
    return () => {
      isCancelled = true;
      built?.dispose();
    };
  }, []);

  return textureSet;
}

function FinishCard({ finish }: { finish: FinishId }) {
  const textures = useFinishTextures();
  const groupRef = useRef<THREE.Group>(null);
  const spinTarget = useRef(0);
  const spin = useRef(0);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    spinTarget.current += Math.PI * 2; // a full flip each time the finish changes
  }, [finish]);

  const materials = useMemo(() => {
    if (!textures) return null;
    const edge = new THREE.MeshStandardMaterial({ color: textures.palette.paperDeep, roughness: 0.9 });
    const spec = textures.finishes[finish];
    const front = new THREE.MeshPhysicalMaterial({
      map: spec.map,
      roughnessMap: spec.roughnessMap,
      metalnessMap: spec.metalnessMap,
      bumpMap: spec.bumpMap,
      bumpScale: spec.bumpScale,
      roughness: 1,
      metalness: 1,
      sheen: spec.sheen,
      sheenRoughness: 0.4,
      sheenColor: new THREE.Color(textures.palette.paper),
      envMapIntensity: 1.6,
    });
    const back = new THREE.MeshStandardMaterial({ map: textures.back, roughness: 0.7 });
    return { list: [edge, edge, edge, edge, front, back], owned: [edge, front, back] };
  }, [textures, finish]);

  useEffect(() => () => materials?.owned.forEach((material) => material.dispose()), [materials]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    spin.current = THREE.MathUtils.damp(spin.current, spinTarget.current, 2.6, delta);
    groupRef.current.rotation.y = spin.current + state.pointer.x * 0.55 + Math.sin(time * 0.6) * 0.18;
    groupRef.current.rotation.x = -state.pointer.y * 0.35 + Math.cos(time * 0.5) * 0.06;
    groupRef.current.position.y = Math.sin(time * 1.1) * 0.06;
  });

  if (!materials) return null;

  return (
    <group ref={groupRef}>
      <mesh material={materials.list}>
        <boxGeometry args={[CARD_SIZE.width, CARD_SIZE.height, CARD_SIZE.thickness]} />
      </mesh>
    </group>
  );
}

export default function FinishCardScene({ finish }: { finish: FinishId }) {
  return (
    <StageCanvas cameraPosition={[0, 0, 6.2]} fov={32}>
      <StudioLighting keyIntensity={1.2} />
      <ContactShadows position={[0, -1.7, 0]} opacity={0.5} scale={9} blur={2.8} far={3} resolution={512} />
      <FinishCard finish={finish} />
    </StageCanvas>
  );
}
