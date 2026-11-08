'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneStore } from '@/lib/store';
import { createVisitingCardTexture, createBoxTexture } from './utils/textureGenerator';

/**
 * Main 3D Scrollytelling Packaging Experience:
 * Chapter 1 (0.00 - 0.28): 450 GSM Velvet Matte Visiting Card with Gold Foil & Mouse Tilt
 * Chapter 2 (0.25 - 0.65): Dieline Crease Net -> 3D Structural Box Folding
 * Chapter 3 (0.60 - 1.00): Fully Assembled Rigid Box 360 Floating Showcase
 */
export default function HeroPackagingExperience() {
  const groupRef = useRef<THREE.Group>(null);
  const cardRef = useRef<THREE.Group>(null);
  const boxGroupRef = useRef<THREE.Group>(null);

  // Pivot refs for the box panels
  const frontWallPivot = useRef<THREE.Group>(null);
  const backWallPivot = useRef<THREE.Group>(null);
  const leftWallPivot = useRef<THREE.Group>(null);
  const rightWallPivot = useRef<THREE.Group>(null);
  const topLidPivot = useRef<THREE.Group>(null);
  const tuckFlapPivot = useRef<THREE.Group>(null);

  // Zustand Store selectors
  const scrollProgress = useSceneStore((state) => state.scrollProgress);
  const mouse = useSceneStore((state) => state.mouse);
  const serviceColor = useSceneStore((state) => state.serviceColor);

  // Textures (Memoized)
  const cardTextures = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return createVisitingCardTexture();
  }, []);

  const boxTextures = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return createBoxTexture('DESIGN N PRINT', 'RIGID PACKAGING');
  }, []);

  // Box Dimensions
  const W = 2.4; // Width
  const H = 1.6; // Height (Wall height)
  const D = 1.6; // Depth

  // Helper smoothstep function
  const smooth = (min: number, max: number, value: number) => {
    const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
    return x * x * (3 - 2 * x);
  };

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const progress = scrollProgress;

    // 1. Mouse interactive parallax (Smooth damping)
    const targetTiltX = mouse.y * 0.35;
    const targetTiltY = mouse.x * 0.45;
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetTiltX, 4, delta);
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetTiltY, 4, delta);

    // 2. CHAPTER 1: VISITING CARD (Progress: 0.0 -> 0.30)
    if (cardRef.current) {
      if (progress < 0.32) {
        cardRef.current.visible = true;
        // Fade out & scale as we transition to dieline
        const cardExit = smooth(0.20, 0.30, progress);
        cardRef.current.scale.setScalar(1 - cardExit * 0.6);
        cardRef.current.position.y = THREE.MathUtils.lerp(0, 1.2, cardExit);
        cardRef.current.rotation.z = THREE.MathUtils.lerp(0, -0.4, cardExit);
        
        // Idle floating motion
        const floatY = Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
        cardRef.current.position.y += floatY * (1 - cardExit);
      } else {
        cardRef.current.visible = false;
      }
    }

    // 3. CHAPTER 2: DIELINE & BOX FOLDING (Progress: 0.22 -> 1.00)
    if (boxGroupRef.current) {
      if (progress >= 0.20) {
        boxGroupRef.current.visible = true;

        // Intro transition for the box
        const boxIntro = smooth(0.20, 0.32, progress);
        boxGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.4, 1.0, boxIntro));

        // Step-by-step folding angles (0 degrees = flat net, 90 degrees = folded wall)
        // 1. Side walls fold first (progress 0.30 -> 0.45)
        const sideFold = smooth(0.30, 0.45, progress);
        const sideAngle = THREE.MathUtils.lerp(0, Math.PI / 2, sideFold);
        if (leftWallPivot.current) leftWallPivot.current.rotation.z = sideAngle;
        if (rightWallPivot.current) rightWallPivot.current.rotation.z = -sideAngle;

        // 2. Front & Back walls fold up (progress 0.38 -> 0.54)
        const fbFold = smooth(0.38, 0.54, progress);
        const fbAngle = THREE.MathUtils.lerp(0, Math.PI / 2, fbFold);
        if (frontWallPivot.current) frontWallPivot.current.rotation.x = -fbAngle;
        if (backWallPivot.current) backWallPivot.current.rotation.x = fbAngle;

        // 3. Top lid folds forward over the box (progress 0.52 -> 0.68)
        const lidFold = smooth(0.52, 0.68, progress);
        const lidAngle = THREE.MathUtils.lerp(0, Math.PI / 2, lidFold);
        if (topLidPivot.current) topLidPivot.current.rotation.x = -lidAngle;

        // 4. Tuck flap folds down into the box (progress 0.62 -> 0.72)
        const tuckFold = smooth(0.62, 0.72, progress);
        const tuckAngle = THREE.MathUtils.lerp(0, Math.PI / 2, tuckFold);
        if (tuckFlapPivot.current) tuckFlapPivot.current.rotation.x = -tuckAngle;

        // 4. CHAPTER 3: SHOWCASE ORBIT (Progress 0.70 -> 1.00)
        if (progress > 0.68) {
          const orbitProgress = (progress - 0.68) / 0.32;
          boxGroupRef.current.rotation.y = THREE.MathUtils.lerp(0, Math.PI * 2 + 0.5, orbitProgress);
          boxGroupRef.current.position.y = THREE.MathUtils.lerp(0, 0.25, Math.sin(orbitProgress * Math.PI));
          boxGroupRef.current.rotation.x = THREE.MathUtils.lerp(0.2, 0.45, Math.sin(orbitProgress * Math.PI));
        } else {
          boxGroupRef.current.rotation.y = THREE.MathUtils.lerp(-0.3, 0.1, fbFold);
          boxGroupRef.current.rotation.x = THREE.MathUtils.lerp(0.6, 0.2, lidFold);
        }
      } else {
        boxGroupRef.current.visible = false;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* ============================================================ */}
      {/* 1. VISITING CARD (Hero Act 1)                                */}
      {/* ============================================================ */}
      <group ref={cardRef} position={[0, 0, 0]}>
        {/* Card Slab: 3.5 x 2.0 with subtle realistic paper thickness (0.015) */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.2, 1.83, 0.02]} />
          {cardTextures ? (
            <>
              {/* Materials for 6 faces: Right, Left, Top, Bottom, Front, Back */}
              <meshStandardMaterial attach="material-0" color="#181a20" roughness={0.8} />
              <meshStandardMaterial attach="material-1" color="#181a20" roughness={0.8} />
              <meshStandardMaterial attach="material-2" color="#181a20" roughness={0.8} />
              <meshStandardMaterial attach="material-3" color="#181a20" roughness={0.8} />
              {/* Front Face: High-grade Velvet paper with gold foil & clearcoat */}
              <meshPhysicalMaterial
                attach="material-4"
                map={cardTextures.colorMap}
                roughnessMap={cardTextures.roughnessMap}
                metalnessMap={cardTextures.metalnessMap}
                clearcoat={0.3}
                clearcoatRoughness={0.15}
                sheen={0.6}
                sheenColor={new THREE.Color(serviceColor || '#d4af37')}
              />
              {/* Back Face: Solid Matte Texture */}
              <meshStandardMaterial attach="material-5" color="#111318" roughness={0.9} />
            </>
          ) : (
            <meshStandardMaterial color="#1a1a24" roughness={0.5} />
          )}
        </mesh>

        {/* Ambient Paper Stock Shadow */}
        <mesh position={[0, -0.05, -0.08]}>
          <planeGeometry args={[3.3, 1.9]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* 2. DIELINE NET & FOLDING 3D BOX (Act 2 & 3)                  */}
      {/* ============================================================ */}
      <group ref={boxGroupRef} position={[0, -0.2, 0]} visible={false}>
        {/* BASE PANEL (Center Bottom) */}
        <mesh position={[0, -H / 2, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <planeGeometry args={[W, D]} />
          <meshStandardMaterial
            color="#141720"
            roughness={0.7}
            metalness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* LEFT WALL HINGE (Pivots at x = -W/2, y = -H/2) */}
        <group position={[-W / 2, -H / 2, 0]}>
          <group ref={leftWallPivot}>
            <mesh position={[-H / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
              <planeGeometry args={[H, D]} />
              <meshStandardMaterial
                color="#181c26"
                roughness={0.6}
                metalness={0.3}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        </group>

        {/* RIGHT WALL HINGE (Pivots at x = +W/2, y = -H/2) */}
        <group position={[W / 2, -H / 2, 0]}>
          <group ref={rightWallPivot}>
            <mesh position={[H / 2, 0, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow receiveShadow>
              <planeGeometry args={[H, D]} />
              <meshStandardMaterial
                color="#181c26"
                roughness={0.6}
                metalness={0.3}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        </group>

        {/* FRONT WALL HINGE (Pivots at z = +D/2, y = -H/2) */}
        <group position={[0, -H / 2, D / 2]}>
          <group ref={frontWallPivot}>
            <mesh position={[0, H / 2, 0]} castShadow receiveShadow>
              <planeGeometry args={[W, H]} />
              {boxTextures ? (
                <meshPhysicalMaterial
                  map={boxTextures.colorMap}
                  roughnessMap={boxTextures.roughnessMap}
                  metalnessMap={boxTextures.metalnessMap}
                  clearcoat={0.4}
                  clearcoatRoughness={0.2}
                  side={THREE.DoubleSide}
                />
              ) : (
                <meshStandardMaterial color="#1a1f2c" side={THREE.DoubleSide} />
              )}
            </mesh>
          </group>
        </group>

        {/* BACK WALL HINGE (Pivots at z = -D/2, y = -H/2) */}
        <group position={[0, -H / 2, -D / 2]}>
          <group ref={backWallPivot}>
            <mesh position={[0, H / 2, 0]} castShadow receiveShadow>
              <planeGeometry args={[W, H]} />
              <meshStandardMaterial
                color="#141720"
                roughness={0.7}
                metalness={0.2}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* TOP LID HINGE (Pivots at the top edge of Back Wall: y = H) */}
            <group position={[0, H, 0]}>
              <group ref={topLidPivot}>
                <mesh position={[0, D / 2, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
                  <planeGeometry args={[W, D]} />
                  {boxTextures ? (
                    <meshPhysicalMaterial
                      map={boxTextures.colorMap}
                      roughnessMap={boxTextures.roughnessMap}
                      metalnessMap={boxTextures.metalnessMap}
                      clearcoat={0.5}
                      side={THREE.DoubleSide}
                    />
                  ) : (
                    <meshStandardMaterial color="#222836" side={THREE.DoubleSide} />
                  )}
                </mesh>

                {/* TUCK FLAP HINGE (Pivots at outer edge of Top Lid: y = D) */}
                <group position={[0, D, 0]}>
                  <group ref={tuckFlapPivot}>
                    <mesh position={[0, 0.25, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
                      <planeGeometry args={[W * 0.9, 0.5]} />
                      <meshStandardMaterial
                        color="#11141c"
                        roughness={0.8}
                        side={THREE.DoubleSide}
                      />
                    </mesh>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

