'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { smoothStep } from '@/lib/useScrollTrack';
import { createBoardGeometries, easeOutBack, easeOutCubic } from './storyGeometry';
import { StoryProps } from './storyTextures';

const FLOOR_Y = -1.25;
const POUCH_WIDTH = 1.7;
const POUCH_HEIGHT = 2.0;
const POUCH_BULGE = 0.34;
const BANNER_WIDTH = 0.95;
const BANNER_HEIGHT = 2.5;
const BASE_HEIGHT = 0.14;

/** Pillow-shaped cotton pouch: bulging body, cinched neck and soft fabric wrinkles. */
function createPouchGeometry(): THREE.PlaneGeometry {
  const geometry = new THREE.PlaneGeometry(POUCH_WIDTH, POUCH_HEIGHT, 30, 36);
  const positions = geometry.attributes.position;
  for (let index = 0; index < positions.count; index += 1) {
    const nx = positions.getX(index) / (POUCH_WIDTH / 2);
    const ny = positions.getY(index) / (POUCH_HEIGHT / 2);
    const envelope = (1 - nx * nx) * (1 - ny * ny);
    const wrinkle = 0.01 * Math.sin(nx * 5 + ny * 3) * Math.sin(ny * 4 + 1);
    const gather = 1 - 0.3 * smoothStep(0.5, 1, ny);
    positions.setX(index, positions.getX(index) * gather);
    positions.setZ(index, POUCH_BULGE * envelope + wrinkle * Math.max(0, envelope * 2.5));
  }
  positions.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

function createCordGeometry(): THREE.TubeGeometry {
  const top = POUCH_HEIGHT / 2;
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.58, top - 0.02, 0.12),
    new THREE.Vector3(-0.5, top + 0.35, 0.1),
    new THREE.Vector3(0, top + 0.62, 0.06),
    new THREE.Vector3(0.5, top + 0.35, 0.1),
    new THREE.Vector3(0.58, top - 0.02, 0.12),
  ]);
  return new THREE.TubeGeometry(curve, 48, 0.022, 10, false);
}

function createTailGeometry(side: 1 | -1): THREE.TubeGeometry {
  const top = POUCH_HEIGHT / 2;
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(side * 0.1, top - 0.05, 0.3),
    new THREE.Vector3(side * 0.18, top - 0.3, 0.34),
    new THREE.Vector3(side * 0.22, top - 0.6, 0.3),
  ]);
  return new THREE.TubeGeometry(curve, 20, 0.02, 8, false);
}

/** A printed cotton pouch and a roller standee whose banner rolls up out of its cassette. */
export default function PouchDisplayStory({ build, textures }: StoryProps) {
  const pouchGroup = useRef<THREE.Group>(null);
  const standeeGroup = useRef<THREE.Group>(null);
  const bannerMesh = useRef<THREE.Mesh>(null);
  const topBar = useRef<THREE.Group>(null);
  const pole = useRef<THREE.Mesh>(null);

  const resources = useMemo(() => {
    const { palette } = textures;
    // each standee needs its own texture instance because we animate repeat / offset
    const bannerTexture = textures.banner.clone();
    bannerTexture.needsUpdate = true;
    const base = createBoardGeometries(1.12, 0.46, 0.14, BASE_HEIGHT);
    const fabric = (map: THREE.Texture) =>
      new THREE.MeshPhysicalMaterial({
        map,
        roughness: 0.92,
        sheen: 0.3,
        sheenRoughness: 0.85,
        sheenColor: new THREE.Color(palette.paper),
      });
    return {
      pouchGeometry: createPouchGeometry(),
      cordGeometry: createCordGeometry(),
      tailLeft: createTailGeometry(-1),
      tailRight: createTailGeometry(1),
      baseGeometry: base.body,
      bannerTexture,
      pouchFront: fabric(textures.pouchFront),
      pouchBack: fabric(textures.pouchBack),
      rope: new THREE.MeshStandardMaterial({ color: palette.yellow, roughness: 0.75 }),
      tag: new THREE.MeshStandardMaterial({ map: textures.pouchTag, roughness: 0.6, side: THREE.DoubleSide }),
      banner: new THREE.MeshPhysicalMaterial({ map: bannerTexture, roughness: 0.4, clearcoat: 0.3, side: THREE.DoubleSide }),
      metal: new THREE.MeshStandardMaterial({ color: palette.paperDeep, metalness: 1, roughness: 0.25 }),
      base: new THREE.MeshStandardMaterial({ color: palette.inkSoft, roughness: 0.4, metalness: 0.5 }),
    };
  }, [textures]);

  useEffect(
    () => () => {
      resources.pouchGeometry.dispose();
      resources.cordGeometry.dispose();
      resources.tailLeft.dispose();
      resources.tailRight.dispose();
      resources.baseGeometry.dispose();
      resources.bannerTexture.dispose();
      [
        resources.pouchFront,
        resources.pouchBack,
        resources.rope,
        resources.tag,
        resources.banner,
        resources.metal,
        resources.base,
      ].forEach((material) => material.dispose());
    },
    [resources],
  );

  useFrame((state) => {
    const progress = build.current;
    const time = state.clock.elapsedTime;
    const appear = easeOutBack(smoothStep(0, 0.2, progress));
    const rise = easeOutCubic(smoothStep(0.2, 0.64, progress));

    if (pouchGroup.current) {
      pouchGroup.current.visible = appear > 0.001;
      pouchGroup.current.scale.setScalar(Math.max(0.001, appear));
      pouchGroup.current.position.set(-1.45, FLOOR_Y + POUCH_HEIGHT / 2 + (1 - Math.min(1, appear)) * 1.5, 0.2);
      pouchGroup.current.rotation.y = -0.35 + Math.sin(time * 0.6) * 0.18 + state.pointer.x * 0.25;
      pouchGroup.current.rotation.z = Math.sin(time * 0.9) * 0.025;
    }

    if (standeeGroup.current) {
      const standeeAppear = easeOutBack(smoothStep(0.06, 0.26, progress));
      standeeGroup.current.visible = standeeAppear > 0.001;
      standeeGroup.current.scale.setScalar(Math.max(0.001, standeeAppear));
      standeeGroup.current.position.set(1.75, FLOOR_Y, -0.1);
      standeeGroup.current.rotation.y = 0.25 + state.pointer.x * 0.2;
    }

    const bannerLength = Math.max(0.001, BANNER_HEIGHT * rise);
    const bannerBottom = BASE_HEIGHT + 0.12;
    if (bannerMesh.current) {
      bannerMesh.current.scale.y = Math.max(0.001, rise);
      bannerMesh.current.position.y = bannerBottom + bannerLength / 2;
    }
    resources.bannerTexture.repeat.set(1, Math.max(0.001, rise));
    resources.bannerTexture.offset.set(0, 1 - rise);
    if (topBar.current) topBar.current.position.y = bannerBottom + bannerLength + 0.02;
    if (pole.current) {
      pole.current.scale.y = Math.max(0.001, rise);
      pole.current.position.y = bannerBottom + bannerLength / 2;
    }
  });

  return (
    <group>
      {/* pouch */}
      <group ref={pouchGroup}>
        <mesh geometry={resources.pouchGeometry} material={resources.pouchFront} />
        <mesh geometry={resources.pouchGeometry} material={resources.pouchBack} rotation={[0, Math.PI, 0]} />
        <mesh geometry={resources.cordGeometry} material={resources.rope} />
        <mesh geometry={resources.tailLeft} material={resources.rope} />
        <mesh geometry={resources.tailRight} material={resources.rope} />
        {[-1, 1].map((side) => (
          <mesh key={side} position={[side * 0.22, POUCH_HEIGHT / 2 - 0.62, 0.3]} material={resources.rope}>
            <sphereGeometry args={[0.05, 16, 16]} />
          </mesh>
        ))}
        <mesh position={[0.1, POUCH_HEIGHT / 2 - 0.05, 0.3]} material={resources.rope}>
          <sphereGeometry args={[0.05, 16, 16]} />
        </mesh>
        <mesh position={[0.42, 0.42, 0.37]} rotation={[0, 0, -0.18]} material={resources.tag}>
          <planeGeometry args={[0.3, 0.44]} />
        </mesh>
      </group>

      {/* roller standee */}
      <group ref={standeeGroup}>
        <mesh geometry={resources.baseGeometry} material={resources.base} rotation={[-Math.PI / 2, 0, 0]} position={[0, BASE_HEIGHT / 2, 0]} />
        <mesh position={[0, BASE_HEIGHT + 0.06, 0]} rotation={[0, 0, Math.PI / 2]} material={resources.metal}>
          <capsuleGeometry args={[0.07, 0.86, 8, 24]} />
        </mesh>
        <mesh ref={bannerMesh} position={[0, BASE_HEIGHT + 0.12, 0]} material={resources.banner}>
          <planeGeometry args={[BANNER_WIDTH, BANNER_HEIGHT]} />
        </mesh>
        <mesh ref={pole} position={[0, BASE_HEIGHT + 0.12, -0.03]} material={resources.metal}>
          <cylinderGeometry args={[0.018, 0.018, BANNER_HEIGHT, 12]} />
        </mesh>
        <group ref={topBar} position={[0, BASE_HEIGHT + 0.12, 0]}>
          <mesh material={resources.metal} rotation={[0, 0, Math.PI / 2]}>
            <capsuleGeometry args={[0.025, BANNER_WIDTH + 0.02, 6, 16]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
