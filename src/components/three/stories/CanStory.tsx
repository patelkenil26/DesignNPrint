'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Billboard } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { smoothStep } from '@/lib/useScrollTrack';
import { easeOutBack, easeOutCubic } from './storyGeometry';
import { STICKER_KINDS, StoryProps } from './storyTextures';

const FLOOR_Y = -1.25;
const CAN_SCALE = 1.25;
const CAN_RADIUS = 0.62;
const BODY_BOTTOM = 0.14;
const BODY_TOP = 1.72;

const LABEL_RADIUS = CAN_RADIUS + 0.004;
const LABEL_HEIGHT = 1.1;
const LABEL_CENTER_Y = 0.93;
const LABEL_ARC = 3.4;
const LABEL_LENGTH = LABEL_ARC * LABEL_RADIUS;
const LABEL_START_ANGLE = -0.5;
const LABEL_SEGMENTS = 96;
const PEEL_START_ANGLE = 0.35;
const PEEL_CURL = 0.6;
/** total spin: the can turns while the sticker feeds on, then keeps turning until the label faces the camera */
const FINAL_SPIN = LABEL_START_ANGLE + LABEL_ARC / 2 + Math.PI * 2;
const SETTLE_TURN = FINAL_SPIN - LABEL_ARC;

const BOTTOM_PROFILE: Array<[number, number]> = [
  [0, 0.13],
  [0.26, 0.11],
  [0.38, 0.05],
  [0.44, 0],
  [0.5, 0],
  [0.55, 0.04],
  [0.6, 0.1],
  [CAN_RADIUS, BODY_BOTTOM],
];

const TOP_PROFILE: Array<[number, number]> = [
  [CAN_RADIUS, BODY_TOP],
  [0.6, 1.8],
  [0.55, 1.9],
  [0.505, 1.97],
  [0.495, 2.02],
  [0.47, 2.04],
  [0.46, 2.0],
  [0.4, 1.985],
  [0, 1.985],
];

const toLathePoints = (profile: Array<[number, number]>) => profile.map(([x, y]) => new THREE.Vector2(x, y));

function updateLabelShape(geometry: THREE.PlaneGeometry, baseY: Float32Array, wrap: number): void {
  const positions = geometry.attributes.position as THREE.BufferAttribute;
  const wrapLength = wrap * LABEL_LENGTH;
  const stuckAngle = LABEL_START_ANGLE + wrapLength / LABEL_RADIUS;
  const anchorX = Math.sin(stuckAngle) * LABEL_RADIUS;
  const anchorZ = Math.cos(stuckAngle) * LABEL_RADIUS;
  const tangentX = Math.cos(stuckAngle);
  const tangentZ = -Math.sin(stuckAngle);
  const normalX = Math.sin(stuckAngle);
  const normalZ = Math.cos(stuckAngle);

  for (let index = 0; index < positions.count; index += 1) {
    const along = ((index % (LABEL_SEGMENTS + 1)) / LABEL_SEGMENTS) * LABEL_LENGTH;
    if (along <= wrapLength + 1e-6) {
      const angle = LABEL_START_ANGLE + along / LABEL_RADIUS;
      positions.setXYZ(index, Math.sin(angle) * LABEL_RADIUS, baseY[index], Math.cos(angle) * LABEL_RADIUS);
    } else {
      // the loose part leaves the can tangentially and curls away like a real peeling sticker
      const loose = along - wrapLength;
      const outward = (Math.sin(PEEL_START_ANGLE + PEEL_CURL * loose) - Math.sin(PEEL_START_ANGLE)) / PEEL_CURL;
      const lift = (Math.cos(PEEL_START_ANGLE) - Math.cos(PEEL_START_ANGLE + PEEL_CURL * loose)) / PEEL_CURL;
      positions.setXYZ(
        index,
        anchorX + tangentX * outward + normalX * lift,
        baseY[index],
        anchorZ + tangentZ * outward + normalZ * lift,
      );
    }
  }
  positions.needsUpdate = true;
  geometry.computeVertexNormals();
}

/**
 * A premium aluminium can. A printed label sticker peels off, curls and wraps around
 * it while the can spins; then die-cut stickers pop out around it.
 */
export default function CanStory({ build, textures }: StoryProps) {
  const riseGroup = useRef<THREE.Group>(null);
  const spinGroup = useRef<THREE.Group>(null);
  const stickerRefs = useRef<Array<THREE.Group | null>>([]);
  const glintLight = useRef<THREE.PointLight>(null);
  const lastWrap = useRef(-1);

  const label = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(LABEL_LENGTH, LABEL_HEIGHT, LABEL_SEGMENTS, 1);
    const positions = geometry.attributes.position;
    const baseY = Float32Array.from({ length: positions.count }, (_, index) => positions.getY(index));
    return { geometry, baseY };
  }, []);

  const resources = useMemo(() => {
    const { palette } = textures;
    textures.canDew.repeat.set(3, 1);

    const tabShape = new THREE.Shape();
    tabShape.absellipse(0, 0, 0.17, 0.12, 0, Math.PI * 2, false, 0);
    const tabHole = new THREE.Path();
    tabHole.absellipse(0.05, 0, 0.07, 0.05, 0, Math.PI * 2, true, 0);
    tabShape.holes.push(tabHole);

    const metal = new THREE.MeshPhysicalMaterial({
      color: palette.paperDeep,
      metalness: 1,
      roughness: 0.2,
      envMapIntensity: 2.2,
      side: THREE.DoubleSide,
    });

    return {
      bottomGeometry: new THREE.LatheGeometry(toLathePoints(BOTTOM_PROFILE), 96),
      topGeometry: new THREE.LatheGeometry(toLathePoints(TOP_PROFILE), 96),
      bodyGeometry: new THREE.CylinderGeometry(CAN_RADIUS, CAN_RADIUS, BODY_TOP - BODY_BOTTOM, 128, 1, true),
      tabGeometry: new THREE.ExtrudeGeometry(tabShape, { depth: 0.012, bevelEnabled: false, curveSegments: 28 }),
      metal,
      body: new THREE.MeshPhysicalMaterial({
        map: textures.canBody,
        metalness: 0.7,
        roughness: 0.26,
        clearcoat: 1,
        clearcoatRoughness: 0.06,
        envMapIntensity: 1.9,
        bumpMap: textures.canDew,
        bumpScale: 1.6,
      }),
      label: new THREE.MeshPhysicalMaterial({
        map: textures.canLabel,
        roughness: 0.34,
        clearcoat: 0.8,
        clearcoatRoughness: 0.12,
        side: THREE.DoubleSide,
      }),
      stickers: STICKER_KINDS.map(
        (kind) =>
          new THREE.MeshBasicMaterial({
            map: textures.stickers[kind],
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            toneMapped: false,
          }),
      ),
    };
  }, [textures]);

  useEffect(
    () => () => {
      label.geometry.dispose();
      resources.bottomGeometry.dispose();
      resources.topGeometry.dispose();
      resources.bodyGeometry.dispose();
      resources.tabGeometry.dispose();
      [resources.metal, resources.body, resources.label, ...resources.stickers].forEach((material) => material.dispose());
    },
    [label, resources],
  );

  useFrame((state) => {
    const progress = build.current;
    const time = state.clock.elapsedTime;

    const appear = easeOutCubic(smoothStep(0, 0.14, progress));
    const wrap = smoothStep(0.14, 0.66, progress);
    const settle = easeOutCubic(smoothStep(0.66, 0.94, progress));

    if (Math.abs(wrap - lastWrap.current) > 0.0004) {
      lastWrap.current = wrap;
      updateLabelShape(label.geometry, label.baseY, wrap);
    }

    if (riseGroup.current) {
      riseGroup.current.scale.setScalar(Math.max(0.001, CAN_SCALE * (0.7 + 0.3 * appear)));
      riseGroup.current.position.y = FLOOR_Y + (1 - appear) * 1.6;
    }
    if (spinGroup.current) {
      const spin = wrap * LABEL_ARC + settle * SETTLE_TURN;
      spinGroup.current.rotation.y = -spin + state.pointer.x * 0.2 + Math.sin(time * 0.5) * 0.05 * settle;
    }

    if (glintLight.current) {
      glintLight.current.position.set(Math.sin(time * 0.7) * 3.2, 1.6, 2.4);
    }

    const popIn = smoothStep(0.7, 0.98, progress);
    stickerRefs.current.forEach((group, index) => {
      if (!group) return;
      const stagger = smoothStep(0.7 + index * 0.035, 0.86 + index * 0.035, progress);
      const pop = easeOutBack(Math.min(1, stagger)) * popIn;
      const base = (index / STICKER_KINDS.length) * Math.PI * 2;
      const angle = base + time * 0.32;
      group.position.set(Math.cos(angle) * 2.3, 0.35 + Math.sin(base * 2 + time * 0.9) * 0.55, -0.95 + Math.sin(angle) * 0.4);
      group.scale.setScalar(Math.max(0.001, pop * 0.9));
    });
  });

  return (
    <group>
      <pointLight ref={glintLight} intensity={14} distance={9} color="white" />

      <group ref={riseGroup} position={[0, FLOOR_Y, 0]}>
        <group ref={spinGroup}>
          <mesh geometry={resources.bodyGeometry} material={resources.body} position={[0, (BODY_TOP + BODY_BOTTOM) / 2, 0]} />
          <mesh geometry={resources.bottomGeometry} material={resources.metal} />
          <mesh geometry={resources.topGeometry} material={resources.metal} />
          <mesh position={[0, 2.035, 0]} rotation={[Math.PI / 2, 0, 0]} material={resources.metal}>
            <torusGeometry args={[0.485, 0.03, 16, 96]} />
          </mesh>
          <mesh geometry={resources.tabGeometry} material={resources.metal} position={[-0.08, 1.998, 0]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh position={[0, 1.99, 0]} material={resources.metal}>
            <cylinderGeometry args={[0.035, 0.035, 0.03, 20]} />
          </mesh>
          <group position={[0, LABEL_CENTER_Y, 0]}>
            <mesh geometry={label.geometry} material={resources.label} />
          </group>
        </group>
      </group>

      {STICKER_KINDS.map((kind, index) => (
        <Billboard
          key={kind}
          ref={(node) => {
            stickerRefs.current[index] = node;
          }}
        >
          <mesh material={resources.stickers[index]}>
            <planeGeometry args={[0.8, 0.8]} />
          </mesh>
        </Billboard>
      ))}
    </group>
  );
}
