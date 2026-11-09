'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { smoothStep } from '@/lib/useScrollTrack';
import { createBoardGeometries, easeInOutCubic, easeOutBack, easeOutCubic } from './storyGeometry';
import { StoryProps } from './storyTextures';

const FOLDER_WIDTH = 2.0;
const FOLDER_HEIGHT = 2.7;
const FOLDER_THICKNESS = 0.045;
const FLOOR_Y = -1.25;
const PAPER_COUNT = 3;
const POCKET_WIDTH = FOLDER_WIDTH - 0.12;
const POCKET_HEIGHT = 1.05;
const MAX_OPEN_ANGLE = 2.3;

/** Pocket with a half-round thumb notch, extruded so it has real thickness. */
function createPocketGeometry(): THREE.ExtrudeGeometry {
  const halfWidth = POCKET_WIDTH / 2;
  const halfHeight = POCKET_HEIGHT / 2;
  const notchRadius = 0.3;
  const shape = new THREE.Shape();
  shape.moveTo(-halfWidth, -halfHeight);
  shape.lineTo(halfWidth, -halfHeight);
  shape.lineTo(halfWidth, halfHeight);
  shape.lineTo(notchRadius, halfHeight);
  shape.absarc(0, halfHeight, notchRadius, 0, Math.PI, true);
  shape.lineTo(-halfWidth, halfHeight);
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.02,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 2,
    curveSegments: 24,
  });
  geometry.translate(0, 0, -0.01);
  return geometry;
}

/** A foil-stamped company file opens to reveal documents rising out of its pocket. */
export default function FolderStory({ build, textures }: StoryProps) {
  const group = useRef<THREE.Group>(null);
  const coverPivot = useRef<THREE.Group>(null);
  const paperRefs = useRef<Array<THREE.Mesh | null>>([]);
  const cardRef = useRef<THREE.Mesh>(null);

  const resources = useMemo(() => {
    const { palette } = textures;
    const board = createBoardGeometries(FOLDER_WIDTH, FOLDER_HEIGHT, 0.09, FOLDER_THICKNESS);
    return {
      board,
      pocketGeometry: createPocketGeometry(),
      edge: new THREE.MeshStandardMaterial({ color: palette.inkSoft, roughness: 0.55, metalness: 0.2 }),
      cover: new THREE.MeshPhysicalMaterial({
        map: textures.folderCover.map,
        roughnessMap: textures.folderCover.roughnessMap,
        metalnessMap: textures.folderCover.metalnessMap,
        roughness: 1,
        metalness: 1,
        clearcoat: 0.3,
        clearcoatRoughness: 0.3,
        envMapIntensity: 1.5,
      }),
      inner: new THREE.MeshStandardMaterial({
        map: textures.folderInner,
        roughness: 0.7,
        emissive: new THREE.Color('white'),
        emissiveMap: textures.folderInner,
        emissiveIntensity: 0.35,
      }),
      backOuter: new THREE.MeshStandardMaterial({ color: palette.inkSoft, roughness: 0.6 }),
      pocket: new THREE.MeshPhysicalMaterial({ color: palette.green, roughness: 0.5, clearcoat: 0.3 }),
      paper: new THREE.MeshStandardMaterial({
        map: textures.folderPaper,
        roughness: 0.85,
        emissive: new THREE.Color('white'),
        emissiveMap: textures.folderPaper,
        emissiveIntensity: 0.35,
      }),
      card: new THREE.MeshPhysicalMaterial({ color: palette.yellow, roughness: 0.4, clearcoat: 0.4 }),
    };
  }, [textures]);

  useEffect(
    () => () => {
      resources.board.body.dispose();
      resources.board.face.dispose();
      resources.pocketGeometry.dispose();
      [
        resources.edge,
        resources.cover,
        resources.inner,
        resources.backOuter,
        resources.pocket,
        resources.paper,
        resources.card,
      ].forEach((material) => material.dispose());
    },
    [resources],
  );

  useFrame((state) => {
    const progress = build.current;
    const time = state.clock.elapsedTime;
    const appear = easeOutCubic(smoothStep(0, 0.15, progress));
    const open = easeInOutCubic(smoothStep(0.16, 0.6, progress));
    const reveal = smoothStep(0.6, 0.97, progress);

    if (group.current) {
      group.current.visible = appear > 0.001;
      group.current.scale.setScalar(Math.max(0.001, 0.75 + 0.25 * appear));
      group.current.position.set(open * 0.85, FLOOR_Y + FOLDER_HEIGHT / 2 + (1 - appear) * 1.4, 0);
      group.current.rotation.y = -0.45 * (1 - open) - 0.22 * open + state.pointer.x * 0.2 + Math.sin(time * 0.5) * 0.04;
    }
    if (coverPivot.current) coverPivot.current.rotation.y = -open * MAX_OPEN_ANGLE;

    paperRefs.current.forEach((paper, index) => {
      if (!paper) return;
      const lift = easeOutBack(smoothStep(0.6 + index * 0.06, 0.88 + index * 0.06, progress));
      paper.position.y = THREE.MathUtils.lerp(-1.4, 0.02 + index * 0.06, Math.min(1.1, lift));
      paper.rotation.z = (index - 1) * 0.045 * reveal;
    });
    if (cardRef.current) {
      cardRef.current.position.y = THREE.MathUtils.lerp(-0.9, -0.5, easeOutCubic(reveal));
      cardRef.current.rotation.z = -0.12 * reveal;
    }
  });

  const faceOffset = resources.board.faceOffset;

  return (
    <group ref={group}>
      {/* back board: inside faces the camera */}
      <mesh geometry={resources.board.body} material={resources.edge} />
      <mesh geometry={resources.board.face} material={resources.inner} position={[0, 0, faceOffset]} />
      <mesh
        geometry={resources.board.face}
        material={resources.backOuter}
        position={[0, 0, -faceOffset]}
        rotation={[0, Math.PI, 0]}
      />

      {/* documents rising out of the pocket */}
      {Array.from({ length: PAPER_COUNT }, (_, index) => (
        <mesh
          key={index}
          ref={(node) => {
            paperRefs.current[index] = node;
          }}
          position={[0, -1.4, FOLDER_THICKNESS / 2 + 0.03 + index * 0.014]}
          material={resources.paper}
        >
          <boxGeometry args={[1.56, 1.94, 0.006]} />
        </mesh>
      ))}

      {/* pocket in front of the papers */}
      <mesh
        geometry={resources.pocketGeometry}
        material={resources.pocket}
        position={[0, -FOLDER_HEIGHT / 2 + POCKET_HEIGHT / 2 + 0.06, FOLDER_THICKNESS / 2 + 0.1]}
      />

      {/* business card tucked in the pocket */}
      <mesh ref={cardRef} position={[0.5, -0.9, FOLDER_THICKNESS / 2 + 0.14]} material={resources.card}>
        <boxGeometry args={[0.7, 0.4, 0.012]} />
      </mesh>

      {/* front cover: hinged on the spine, swings open toward the viewer */}
      <group ref={coverPivot} position={[-FOLDER_WIDTH / 2, 0, FOLDER_THICKNESS / 2 + 0.2]}>
        <group position={[FOLDER_WIDTH / 2, 0, 0]}>
          <mesh geometry={resources.board.body} material={resources.edge} />
          <mesh geometry={resources.board.face} material={resources.cover} position={[0, 0, faceOffset]} />
          <mesh
            geometry={resources.board.face}
            material={resources.inner}
            position={[0, 0, -faceOffset]}
            rotation={[0, Math.PI, 0]}
          />
        </group>
      </group>
    </group>
  );
}
