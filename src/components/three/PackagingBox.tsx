'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BOX_DIMS, BoxDims, BoxTextureSet, PanelKey } from './utils/boxTextures';

/**
 * A die-cut box built from real hinged panels (with board thickness).
 * Every value is 0 → 1:
 *   *Grow  — the panel slides out of its neighbour (flat sheet "unfolds" from the card)
 *   *Fold  — the panel rotates 90° around its crease
 *
 * Lying flat the sheet is a cross: base (the "card") in the middle, left/right/front/back
 * walls around it, and the lid + tuck lip attached to the back wall.
 */
export interface BoxPhase {
  sideGrow: number;
  fbGrow: number;
  lidGrow: number;
  lipGrow: number;
  sideFold: number;
  fbFold: number;
  lidFold: number;
  lipFold: number;
}

export interface BoxPhaseRef {
  current: BoxPhase;
}

export const FLAT_CARD_PHASE: BoxPhase = {
  sideGrow: 0,
  fbGrow: 0,
  lidGrow: 0,
  lipGrow: 0,
  sideFold: 0,
  fbFold: 0,
  lidFold: 0,
  lipFold: 0,
};

const QUARTER_TURN = Math.PI / 2;
const MIN_GROW = 0.0005;

interface PackagingBoxProps {
  phaseRef: BoxPhaseRef;
  textures: BoxTextureSet;
  dims?: BoxDims;
}

export default function PackagingBox({ phaseRef, textures, dims = BOX_DIMS }: PackagingBoxProps) {
  const { width: W, depth: D, height: H, lip: LIP, thickness: T } = dims;
  const lidWide = W + T;
  const lidLength = D + T;

  const rightHinge = useRef<THREE.Group>(null);
  const rightGrow = useRef<THREE.Group>(null);
  const leftHinge = useRef<THREE.Group>(null);
  const leftGrow = useRef<THREE.Group>(null);
  const frontHinge = useRef<THREE.Group>(null);
  const frontGrow = useRef<THREE.Group>(null);
  const backHinge = useRef<THREE.Group>(null);
  const backGrow = useRef<THREE.Group>(null);
  const lidHinge = useRef<THREE.Group>(null);
  const lidGrow = useRef<THREE.Group>(null);
  const lipHinge = useRef<THREE.Group>(null);
  const lipGrow = useRef<THREE.Group>(null);

  const materials = useMemo(() => {
    const edge = new THREE.MeshStandardMaterial({ color: textures.palette.paper, roughness: 1 });
    const buildInside = (key: PanelKey) =>
      new THREE.MeshPhysicalMaterial({
        map: textures.inside[key],
        roughness: 0.88,
        bumpMap: textures.grain,
        bumpScale: 0.35,
      });
    const buildOutside = (key: PanelKey) =>
      new THREE.MeshPhysicalMaterial({
        map: textures.outside[key].map,
        roughnessMap: textures.outside[key].roughnessMap,
        metalnessMap: textures.outside[key].metalnessMap,
        roughness: 1,
        metalness: 1,
        sheen: 0.15,
        sheenRoughness: 0.55,
        sheenColor: new THREE.Color(textures.palette.paperDeep),
        bumpMap: textures.grain,
        bumpScale: 0.25,
        envMapIntensity: 0.8,
      });

    const keys: PanelKey[] = ['base', 'left', 'right', 'front', 'back', 'lid', 'lip'];
    const panelMaterials = {} as Record<PanelKey, THREE.Material[]>;
    const owned: THREE.Material[] = [edge];
    keys.forEach((key) => {
      const inside = buildInside(key);
      const outside = buildOutside(key);
      owned.push(inside, outside);
      // BoxGeometry face order: +x, -x, +y (inside), -y (outside), +z, -z
      panelMaterials[key] = [edge, edge, inside, outside, edge, edge];
    });
    return { panelMaterials, owned };
  }, [textures]);

  useEffect(() => () => materials.owned.forEach((material) => material.dispose()), [materials]);

  useFrame(() => {
    const phase = phaseRef.current;

    const applyGrow = (group: THREE.Group | null, amount: number, axis: 'x' | 'z') => {
      if (!group) return;
      const clamped = Math.max(MIN_GROW, amount);
      group.visible = amount > MIN_GROW;
      group.scale[axis] = clamped;
    };

    applyGrow(rightGrow.current, phase.sideGrow, 'x');
    applyGrow(leftGrow.current, phase.sideGrow, 'x');
    applyGrow(frontGrow.current, phase.fbGrow, 'z');
    applyGrow(backGrow.current, phase.fbGrow, 'z');
    applyGrow(lidGrow.current, phase.lidGrow, 'z');
    applyGrow(lipGrow.current, phase.lipGrow, 'z');

    // hinges that hang off a growing panel travel with its far edge
    if (lidHinge.current) {
      lidHinge.current.visible = phase.fbGrow > MIN_GROW;
      lidHinge.current.position.z = -H * Math.max(MIN_GROW, phase.fbGrow);
    }
    if (lipHinge.current) {
      lipHinge.current.visible = phase.lidGrow > MIN_GROW;
      lipHinge.current.position.z = -lidLength * Math.max(MIN_GROW, phase.lidGrow);
    }

    if (rightHinge.current) rightHinge.current.rotation.z = phase.sideFold * QUARTER_TURN;
    if (leftHinge.current) leftHinge.current.rotation.z = -phase.sideFold * QUARTER_TURN;
    if (frontHinge.current) frontHinge.current.rotation.x = -phase.fbFold * QUARTER_TURN;
    if (backHinge.current) backHinge.current.rotation.x = phase.fbFold * QUARTER_TURN;
    if (lidHinge.current) lidHinge.current.rotation.x = phase.lidFold * QUARTER_TURN;
    if (lipHinge.current) lipHinge.current.rotation.x = phase.lipFold * QUARTER_TURN;
  });

  return (
    <group>
      {/* BASE — this is the "visiting card" at the start of the story */}
      <mesh material={materials.panelMaterials.base}>
        <boxGeometry args={[W, T, D]} />
      </mesh>

      {/* RIGHT wall — hinge on +x edge, folds up around z */}
      <group ref={rightHinge} position={[W / 2, 0, 0]}>
        <group ref={rightGrow}>
          <mesh position={[H / 2, 0, 0]} material={materials.panelMaterials.right}>
            <boxGeometry args={[H, T, D]} />
          </mesh>
        </group>
      </group>

      {/* LEFT wall — hinge on -x edge */}
      <group ref={leftHinge} position={[-W / 2, 0, 0]}>
        <group ref={leftGrow}>
          <mesh position={[-H / 2, 0, 0]} material={materials.panelMaterials.left}>
            <boxGeometry args={[H, T, D]} />
          </mesh>
        </group>
      </group>

      {/* FRONT wall — hinge on +z edge, folds up around x */}
      <group ref={frontHinge} position={[0, 0, D / 2]}>
        <group ref={frontGrow}>
          <mesh position={[0, 0, H / 2]} material={materials.panelMaterials.front}>
            <boxGeometry args={[W, T, H]} />
          </mesh>
        </group>
      </group>

      {/* BACK wall — hinge on -z edge; lid + lip hang off its far edge */}
      <group ref={backHinge} position={[0, 0, -D / 2]}>
        <group ref={backGrow}>
          <mesh position={[0, 0, -H / 2]} material={materials.panelMaterials.back}>
            <boxGeometry args={[W, T, H]} />
          </mesh>
        </group>

        <group ref={lidHinge}>
          <group ref={lidGrow}>
            <mesh position={[0, 0, -lidLength / 2]} material={materials.panelMaterials.lid}>
              <boxGeometry args={[lidWide, T, lidLength]} />
            </mesh>
          </group>

          <group ref={lipHinge}>
            <group ref={lipGrow}>
              <mesh position={[0, 0, -LIP / 2]} material={materials.panelMaterials.lip}>
                <boxGeometry args={[lidWide, T, LIP]} />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
