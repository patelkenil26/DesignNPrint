'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { smoothStep } from '@/lib/useScrollTrack';
import { easeInOutCubic, easeOutBack, easeOutCubic } from './storyGeometry';
import { StoryProps } from './storyTextures';

const SIDE_WIDTH = 0.9;
const CENTER_WIDTH = 1.8;
const PANEL_HEIGHT = 2.1;
const HINGE_Z = 0.015;
const PANEL_SEGMENTS = 24;
const MAX_BEND = 0.34;
/** the brochure rests slightly short of flat so it keeps a 3D V-shape */
const MAX_OPEN = 0.74;

const FLYER_WIDTH = 0.85;
const FLYER_HEIGHT = 1.2;

interface FlyerSpot {
  x: number;
  y: number;
  z: number;
  tilt: number;
}

const FLYER_SPOTS: FlyerSpot[] = [
  { x: -2.35, y: -0.55, z: 0.7, tilt: 0.3 },
  { x: -1.5, y: -0.85, z: 1.2, tilt: 0.12 },
  { x: 1.5, y: -0.85, z: 1.2, tilt: -0.14 },
  { x: 2.35, y: -0.55, z: 0.7, tilt: -0.32 },
];

interface BendablePanel {
  geometry: THREE.PlaneGeometry;
  baseX: Float32Array;
  width: number;
}

/** A paper panel: thin, double printed (front + back), and able to flex while it moves. */
function createPanel(width: number, height: number, segments: number): BendablePanel {
  const geometry = new THREE.PlaneGeometry(width, height, segments, 1);
  const positions = geometry.attributes.position;
  const baseX = Float32Array.from({ length: positions.count }, (_, index) => positions.getX(index));
  return { geometry, baseX, width };
}

/** `hingeSide` is +1 when the hinge is on the panel's right edge, -1 when on its left edge. */
function flexPanel(panel: BendablePanel, hingeSide: 1 | -1, bend: number): void {
  const positions = panel.geometry.attributes.position as THREE.BufferAttribute;
  for (let index = 0; index < positions.count; index += 1) {
    const x = panel.baseX[index];
    const distanceFromHinge = hingeSide === 1 ? (panel.width / 2 - x) / panel.width : (x + panel.width / 2) / panel.width;
    positions.setZ(index, bend * Math.pow(distanceFromHinge, 1.7));
  }
  positions.needsUpdate = true;
  panel.geometry.computeVertexNormals();
}

/** A gate-fold brochure opens with paper-like flex while flyers drift in around it. */
export default function BrochureStory({ build, textures }: StoryProps) {
  const group = useRef<THREE.Group>(null);
  const leftHinge = useRef<THREE.Group>(null);
  const rightHinge = useRef<THREE.Group>(null);
  const flyerRefs = useRef<Array<THREE.Group | null>>([]);
  const lastOpen = useRef(-1);

  const resources = useMemo(() => {
    const { brochure } = textures;
    const front = (map: THREE.Texture) =>
      new THREE.MeshPhysicalMaterial({
        map,
        roughness: 0.5,
        clearcoat: 0.4,
        clearcoatRoughness: 0.3,
        emissive: new THREE.Color('white'),
        emissiveMap: map,
        emissiveIntensity: 0.4,
        side: THREE.FrontSide,
      });
    const back = (map: THREE.Texture) =>
      new THREE.MeshPhysicalMaterial({
        map,
        roughness: 0.5,
        clearcoat: 0.4,
        clearcoatRoughness: 0.3,
        emissive: new THREE.Color('white'),
        emissiveMap: map,
        emissiveIntensity: 0.4,
        side: THREE.BackSide,
      });

    return {
      leftPanel: createPanel(SIDE_WIDTH, PANEL_HEIGHT, PANEL_SEGMENTS),
      rightPanel: createPanel(SIDE_WIDTH, PANEL_HEIGHT, PANEL_SEGMENTS),
      centerPanel: createPanel(CENTER_WIDTH, PANEL_HEIGHT, PANEL_SEGMENTS),
      flyerGeometry: (() => {
        const geometry = new THREE.PlaneGeometry(FLYER_WIDTH, FLYER_HEIGHT, 10, 1);
        const positions = geometry.attributes.position;
        for (let index = 0; index < positions.count; index += 1) {
          const u = positions.getX(index) / FLYER_WIDTH + 0.5;
          positions.setZ(index, 0.07 * Math.sin(u * Math.PI));
        }
        geometry.computeVertexNormals();
        return geometry;
      })(),
      materials: [
        front(brochure.innerLeft),
        back(brochure.coverLeft),
        front(brochure.innerRight),
        back(brochure.coverRight),
        front(brochure.innerCenter),
        back(brochure.backCover),
      ],
      flyerFronts: textures.flyers.map(
        (map) =>
          new THREE.MeshPhysicalMaterial({
            map,
            roughness: 0.5,
            clearcoat: 0.3,
            emissive: new THREE.Color('white'),
            emissiveMap: map,
            emissiveIntensity: 0.3,
            side: THREE.FrontSide,
          }),
      ),
      flyerBack: new THREE.MeshStandardMaterial({ color: textures.palette.paper, roughness: 0.8, side: THREE.BackSide }),
    };
  }, [textures]);

  useEffect(
    () => () => {
      resources.leftPanel.geometry.dispose();
      resources.rightPanel.geometry.dispose();
      resources.centerPanel.geometry.dispose();
      resources.flyerGeometry.dispose();
      [...resources.materials, ...resources.flyerFronts, resources.flyerBack].forEach((material) => material.dispose());
    },
    [resources],
  );

  useFrame((state) => {
    const progress = build.current;
    const time = state.clock.elapsedTime;
    const appear = easeOutCubic(smoothStep(0, 0.14, progress));
    const open = easeInOutCubic(smoothStep(0.16, 0.66, progress)) * MAX_OPEN;

    if (group.current) {
      group.current.scale.setScalar(Math.max(0.001, 0.8 + 0.2 * appear));
      group.current.visible = appear > 0.001;
      group.current.position.set(0, -0.1 + (1 - appear) * 1.4 + Math.sin(time * 0.8) * 0.04 * appear, 0);
      group.current.rotation.set(-0.06, -0.5 * (1 - open / MAX_OPEN) - 0.3 + state.pointer.x * 0.2 + Math.sin(time * 0.5) * 0.04, 0);
    }

    if (leftHinge.current) leftHinge.current.rotation.y = Math.PI * (1 - open);
    if (rightHinge.current) rightHinge.current.rotation.y = -Math.PI * (1 - open);

    // panels flex most while they are moving, and settle flat once open
    if (Math.abs(open - lastOpen.current) > 0.0004) {
      lastOpen.current = open;
      const motion = Math.sin((open / MAX_OPEN) * Math.PI);
      flexPanel(resources.leftPanel, 1, MAX_BEND * motion);
      flexPanel(resources.rightPanel, -1, MAX_BEND * motion);
    }

    flyerRefs.current.forEach((flyer, index) => {
      if (!flyer) return;
      const spot = FLYER_SPOTS[index];
      const fly = easeOutBack(smoothStep(0.56 + index * 0.07, 0.86 + index * 0.07, progress));
      flyer.visible = fly > 0.001;
      flyer.position.set(
        spot.x,
        spot.y + (1 - fly) * -3 + Math.sin(time * 0.9 + index * 1.3) * 0.05,
        spot.z,
      );
      flyer.rotation.set(-0.1, Math.sin(time * 0.5 + index) * 0.12, spot.tilt * fly + (1 - fly) * 1.4);
    });
  });

  const [leftFront, leftBack, rightFront, rightBack, centerFront, centerBack] = resources.materials;

  return (
    <group>
      <group ref={group}>
        {/* centre panel */}
        <mesh geometry={resources.centerPanel.geometry} material={centerFront} />
        <mesh geometry={resources.centerPanel.geometry} material={centerBack} />

        {/* left gate — hinged on the centre panel's left edge */}
        <group ref={leftHinge} position={[-CENTER_WIDTH / 2, 0, HINGE_Z]}>
          <group position={[-SIDE_WIDTH / 2, 0, 0]}>
            <mesh geometry={resources.leftPanel.geometry} material={leftFront} />
            <mesh geometry={resources.leftPanel.geometry} material={leftBack} />
          </group>
        </group>

        {/* right gate */}
        <group ref={rightHinge} position={[CENTER_WIDTH / 2, 0, HINGE_Z]}>
          <group position={[SIDE_WIDTH / 2, 0, 0]}>
            <mesh geometry={resources.rightPanel.geometry} material={rightFront} />
            <mesh geometry={resources.rightPanel.geometry} material={rightBack} />
          </group>
        </group>
      </group>

      {resources.flyerFronts.map((material, index) => (
        <group
          key={index}
          ref={(node) => {
            flyerRefs.current[index] = node;
          }}
        >
          <mesh geometry={resources.flyerGeometry} material={material} />
          <mesh geometry={resources.flyerGeometry} material={resources.flyerBack} />
        </group>
      ))}
    </group>
  );
}
