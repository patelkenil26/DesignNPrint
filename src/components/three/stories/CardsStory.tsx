'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { smoothStep } from '@/lib/useScrollTrack';
import { createBoardGeometries, easeInOutCubic, easeOutBack } from './storyGeometry';
import { StoryProps } from './storyTextures';

const CARD_WIDTH = 2.3;
const CARD_HEIGHT = 1.32;
const CARD_THICKNESS = 0.05;
const CARD_RADIUS = 0.07;
const FLOOR_Y = -1.25;
const HERO_CARD_INDEX = 2;

/**
 * Premium business cards: rounded, bevelled board with foil + spot-UV print.
 * They drop in with a soft overshoot, fan like a hand of cards, then the hero card lifts and flips.
 */
export default function CardsStory({ build, textures }: StoryProps) {
  const group = useRef<THREE.Group>(null);
  const pivots = useRef<Array<THREE.Group | null>>([]);
  const heroCard = useRef<THREE.Group>(null);
  const glintLight = useRef<THREE.PointLight>(null);

  const resources = useMemo(() => {
    const board = createBoardGeometries(CARD_WIDTH, CARD_HEIGHT, CARD_RADIUS, CARD_THICKNESS);
    const printed = (maps: { map: THREE.Texture; roughnessMap: THREE.Texture; metalnessMap: THREE.Texture }) =>
      new THREE.MeshPhysicalMaterial({
        map: maps.map,
        roughnessMap: maps.roughnessMap,
        metalnessMap: maps.metalnessMap,
        roughness: 1,
        metalness: 1,
        clearcoat: 0.25,
        clearcoatRoughness: 0.35,
        envMapIntensity: 1.5,
      });
    return {
      board,
      edge: new THREE.MeshStandardMaterial({ color: textures.palette.paperDeep, roughness: 0.55 }),
      fronts: textures.cards.map(printed),
      back: printed(textures.cardBack),
    };
  }, [textures]);

  useEffect(
    () => () => {
      resources.board.body.dispose();
      resources.board.face.dispose();
      resources.edge.dispose();
      resources.back.dispose();
      resources.fronts.forEach((material) => material.dispose());
    },
    [resources],
  );

  useFrame((state) => {
    const progress = build.current;
    const time = state.clock.elapsedTime;
    const fan = easeInOutCubic(smoothStep(0.3, 0.72, progress));
    const flip = easeInOutCubic(smoothStep(0.74, 0.98, progress));

    if (group.current) {
      group.current.rotation.y = state.pointer.x * 0.22;
    }

    pivots.current.forEach((pivot, index) => {
      if (!pivot) return;
      const spread = index - HERO_CARD_INDEX;
      const drop = easeOutBack(smoothStep(index * 0.045, index * 0.045 + 0.22, progress));
      pivot.visible = progress > index * 0.045;
      pivot.position.set(spread * 0.06 * fan, FLOOR_Y + (1 - drop) * 3.4, index * 0.02);
      pivot.rotation.z = -spread * 0.21 * fan + Math.sin(time * 0.8 + index) * 0.008 * fan;
      pivot.rotation.x = (1 - drop) * 0.5;
    });

    if (heroCard.current) {
      heroCard.current.position.z = flip * 0.9;
      heroCard.current.position.y = CARD_HEIGHT / 2 + Math.sin(flip * Math.PI) * 0.25 + flip * 0.2;
      heroCard.current.rotation.y = flip * Math.PI * 2;
      heroCard.current.scale.setScalar(1 + flip * 0.12);
    }

    if (glintLight.current) {
      glintLight.current.position.set(Math.sin(time * 0.9) * 3, 1.2, 2.2);
    }
  });

  return (
    <group ref={group}>
      <pointLight ref={glintLight} intensity={16} distance={9} color="white" />
      {resources.fronts.map((front, index) => (
        <group
          key={index}
          ref={(node) => {
            pivots.current[index] = node;
          }}
        >
          <group
            ref={index === HERO_CARD_INDEX ? heroCard : undefined}
            position={[0, CARD_HEIGHT / 2, 0]}
          >
            <mesh geometry={resources.board.body} material={resources.edge} />
            <mesh geometry={resources.board.face} material={front} position={[0, 0, resources.board.faceOffset]} />
            <mesh
              geometry={resources.board.face}
              material={resources.back}
              position={[0, 0, -resources.board.faceOffset]}
              rotation={[0, Math.PI, 0]}
            />
          </group>
        </group>
      ))}
    </group>
  );
}
