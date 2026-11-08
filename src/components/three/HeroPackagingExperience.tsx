'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneStore } from '@/lib/store';
import { createVisitingCardTexture, createBoxTexture } from './utils/textureGenerator';

/** Smooth step helper */
const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

/** Visiting Card mesh with gold foil PBR material */
function VisitingCard({ textures }: { textures: ReturnType<typeof createVisitingCardTexture> | null }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materials = useMemo(() => {
    const edgeMat = new THREE.MeshStandardMaterial({ color: '#1a1d24', roughness: 0.9, metalness: 0.0 });
    if (!textures) {
      return [edgeMat, edgeMat, edgeMat, edgeMat, edgeMat, edgeMat];
    }
    const frontMat = new THREE.MeshPhysicalMaterial({
      map: textures.colorMap,
      roughnessMap: textures.roughnessMap,
      metalnessMap: textures.metalnessMap,
      clearcoat: 0.5,
      clearcoatRoughness: 0.1,
      sheen: 0.5,
      sheenColor: new THREE.Color('#c9a84c'),
      envMapIntensity: 1.5,
    });
    const backMat = new THREE.MeshStandardMaterial({ color: '#0f1115', roughness: 0.95 });
    return [edgeMat, edgeMat, edgeMat, edgeMat, frontMat, backMat];
  }, [textures]);

  return (
    <mesh ref={meshRef} castShadow receiveShadow material={materials}>
      {/* Standard visiting card ratio 3.5" x 2" */}
      <boxGeometry args={[3.5, 2.0, 0.025]} />
    </mesh>
  );
}

/** Fully foldable box made of pivot groups */
function FoldingBox({
  textures,
  scrollProgress,
}: {
  textures: ReturnType<typeof createBoxTexture> | null;
  scrollProgress: number;
}) {
  const W = 2.5;   // width
  const H = 1.6;   // wall height
  const D = 1.6;   // depth

  // Pivot refs
  const leftPivot  = useRef<THREE.Group>(null);
  const rightPivot = useRef<THREE.Group>(null);
  const frontPivot = useRef<THREE.Group>(null);
  const backPivot  = useRef<THREE.Group>(null);
  const lidPivot   = useRef<THREE.Group>(null);
  const tuckPivot  = useRef<THREE.Group>(null);

  const panelMat = useMemo(() => {
    if (!textures) return new THREE.MeshStandardMaterial({ color: '#181d2a', side: THREE.DoubleSide, roughness: 0.75 });
    return new THREE.MeshPhysicalMaterial({
      map: textures.colorMap,
      roughnessMap: textures.roughnessMap,
      metalnessMap: textures.metalnessMap,
      clearcoat: 0.45,
      clearcoatRoughness: 0.15,
      side: THREE.DoubleSide,
    });
  }, [textures]);

  const baseMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#141720', roughness: 0.7, metalness: 0.15, side: THREE.DoubleSide }),
    []
  );

  useFrame((_, delta) => {
    const p = scrollProgress;

    // Side walls (progress 0.28 → 0.44)
    const sAngle = THREE.MathUtils.lerp(0, Math.PI / 2, smoothstep(0.28, 0.44, p));
    if (leftPivot.current)  leftPivot.current.rotation.z  = THREE.MathUtils.damp(leftPivot.current.rotation.z,   sAngle,  8, delta);
    if (rightPivot.current) rightPivot.current.rotation.z = THREE.MathUtils.damp(rightPivot.current.rotation.z, -sAngle,  8, delta);

    // Front / back walls (0.40 → 0.56)
    const fbAngle = THREE.MathUtils.lerp(0, Math.PI / 2, smoothstep(0.40, 0.56, p));
    if (frontPivot.current) frontPivot.current.rotation.x = THREE.MathUtils.damp(frontPivot.current.rotation.x, -fbAngle, 8, delta);
    if (backPivot.current)  backPivot.current.rotation.x  = THREE.MathUtils.damp(backPivot.current.rotation.x,   fbAngle, 8, delta);

    // Lid folds over (0.54 → 0.70)
    const lidAngle = THREE.MathUtils.lerp(0, Math.PI / 2, smoothstep(0.54, 0.70, p));
    if (lidPivot.current) lidPivot.current.rotation.x = THREE.MathUtils.damp(lidPivot.current.rotation.x, -lidAngle, 8, delta);

    // Tuck flap (0.65 → 0.75)
    const tuckAngle = THREE.MathUtils.lerp(0, Math.PI / 2.2, smoothstep(0.65, 0.75, p));
    if (tuckPivot.current) tuckPivot.current.rotation.x = THREE.MathUtils.damp(tuckPivot.current.rotation.x, -tuckAngle, 8, delta);
  });

  return (
    <group>
      {/* BASE */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -H / 2, 0]} material={baseMat} receiveShadow castShadow>
        <planeGeometry args={[W, D]} />
      </mesh>

      {/* LEFT SIDE WALL — hinge at x=-W/2 */}
      <group position={[-W / 2, -H / 2, 0]}>
        <group ref={leftPivot}>
          <mesh position={[-H / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={baseMat} castShadow>
            <planeGeometry args={[H, D]} />
          </mesh>
        </group>
      </group>

      {/* RIGHT SIDE WALL — hinge at x=+W/2 */}
      <group position={[W / 2, -H / 2, 0]}>
        <group ref={rightPivot}>
          <mesh position={[H / 2, 0, 0]} rotation={[0, 0, -Math.PI / 2]} material={baseMat} castShadow>
            <planeGeometry args={[H, D]} />
          </mesh>
        </group>
      </group>

      {/* FRONT FACE — hinge at z=+D/2 */}
      <group position={[0, -H / 2, D / 2]}>
        <group ref={frontPivot}>
          <mesh position={[0, H / 2, 0]} material={panelMat} castShadow>
            <planeGeometry args={[W, H]} />
          </mesh>
        </group>
      </group>

      {/* BACK FACE + LID + TUCK FLAP chain — hinge at z=-D/2 */}
      <group position={[0, -H / 2, -D / 2]}>
        <group ref={backPivot}>
          <mesh position={[0, H / 2, 0]} material={panelMat} castShadow>
            <planeGeometry args={[W, H]} />
          </mesh>

          {/* LID — hinge at top of back wall */}
          <group position={[0, H, 0]}>
            <group ref={lidPivot}>
              <mesh position={[0, D / 2, 0]} rotation={[Math.PI / 2, 0, 0]} material={panelMat} castShadow>
                <planeGeometry args={[W, D]} />
              </mesh>

              {/* TUCK FLAP — hinge at outer edge of lid */}
              <group position={[0, D, 0]}>
                <group ref={tuckPivot}>
                  <mesh position={[0, 0.28, 0]} material={baseMat} castShadow>
                    <planeGeometry args={[W * 0.88, 0.56]} />
                  </mesh>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

/** Particle dust floating in background */
function ParticleDust() {
  const count = 180;
  const meshRef = useRef<THREE.Points>(null);

  const { positions, randoms } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const randoms   = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      randoms[i] = Math.random();
    }
    return { positions, randoms };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const geo = meshRef.current.geometry;
    const pos = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += Math.sin(t * 0.4 + randoms[i] * 6) * 0.0012;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.022} color="#c9a84c" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

/** Main orchestrator — camera + card + box driven by scrollProgress */
export default function HeroPackagingExperience() {
  const groupRef   = useRef<THREE.Group>(null);
  const cardRef    = useRef<THREE.Group>(null);
  const boxRef     = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const scrollProgress = useSceneStore((s) => s.scrollProgress);
  const mouse          = useSceneStore((s) => s.mouse);

  // Textures built once on client
  const cardTextures = useMemo(() => (typeof window !== 'undefined' ? createVisitingCardTexture() : null), []);
  const boxTextures  = useMemo(() => (typeof window !== 'undefined' ? createBoxTexture('DESIGN N PRINT', 'RIGID PACKAGING') : null), []);

  // Set up initial camera
  useEffect(() => {
    camera.position.set(0, 0, 5.5);
  }, [camera]);

  useFrame((state, delta) => {
    if (!groupRef.current || !cardRef.current || !boxRef.current) return;
    const p = scrollProgress;

    // ── Mouse-driven tilt on the whole group ──────────────────────────
    const tX = mouse.y * 0.28;
    const tY = mouse.x * 0.38;
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, tX, 5, delta);
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, tY, 5, delta);

    // ── Camera dolly driven by scroll ────────────────────────────────
    // Ch0→Ch1: pull back slightly; Ch2+: push in for box showcase
    const targetZ = p < 0.30 ? 5.5 : p < 0.72 ? 6.0 : 4.8;
    (camera as THREE.PerspectiveCamera).position.z = THREE.MathUtils.damp(
      (camera as THREE.PerspectiveCamera).position.z,
      targetZ, 2.5, delta
    );

    // ── CARD: visible 0.0 → 0.32 ─────────────────────────────────────
    const cardExit = smoothstep(0.22, 0.32, p);
    cardRef.current.visible = p < 0.34;
    if (cardRef.current.visible) {
      // Idle float
      const floatY = Math.sin(state.clock.elapsedTime * 1.2) * 0.07;
      const floatR = Math.sin(state.clock.elapsedTime * 0.9) * 0.015;
      cardRef.current.position.y = THREE.MathUtils.lerp(floatY, 1.4, cardExit);
      cardRef.current.rotation.z = THREE.MathUtils.lerp(floatR, -0.5, cardExit);
      cardRef.current.scale.setScalar(THREE.MathUtils.lerp(1.0, 0.5, cardExit));
      const cardOpacityScale = 1 - cardExit;
      cardRef.current.children.forEach((c) => {
        if ((c as THREE.Mesh).material) {
          const mat = (c as THREE.Mesh).material;
          if (Array.isArray(mat)) {
            mat.forEach((m) => { if ('opacity' in m) { (m as THREE.Material).transparent = true; (m as THREE.Material).opacity = cardOpacityScale; } });
          }
        }
      });
    }

    // ── BOX: visible from 0.20 onwards ───────────────────────────────
    boxRef.current.visible = p >= 0.20;
    if (boxRef.current.visible) {
      const boxIntro = smoothstep(0.20, 0.33, p);
      boxRef.current.scale.setScalar(THREE.MathUtils.lerp(0.3, 1.0, boxIntro));

      // Showcase orbit in final chapter (0.72+)
      if (p > 0.72) {
        const orb = smoothstep(0.72, 1.0, p);
        boxRef.current.rotation.y = THREE.MathUtils.damp(boxRef.current.rotation.y, orb * Math.PI * 1.6, 1.5, delta);
        boxRef.current.position.y = THREE.MathUtils.lerp(0, 0.2, Math.sin(orb * Math.PI));
        boxRef.current.rotation.x = THREE.MathUtils.lerp(0.2, 0.5, Math.sin(orb * Math.PI));
      } else {
        // Keep a slight dramatic angle during folding
        const fbFold = smoothstep(0.40, 0.56, p);
        boxRef.current.rotation.y = THREE.MathUtils.damp(boxRef.current.rotation.y, THREE.MathUtils.lerp(-0.4, 0.15, fbFold), 3, delta);
        boxRef.current.rotation.x = THREE.MathUtils.lerp(0.55, 0.18, fbFold);
      }
    }
  });

  return (
    <group ref={groupRef}>
      <ParticleDust />

      {/* ── ACT 1: VISITING CARD ── */}
      <group ref={cardRef}>
        <VisitingCard textures={cardTextures} />
      </group>

      {/* ── ACT 2–3: FOLDING BOX ── */}
      <group ref={boxRef} visible={false} position={[0, -0.1, 0]}>
        <FoldingBox textures={boxTextures} scrollProgress={scrollProgress} />
      </group>
    </group>
  );
}
