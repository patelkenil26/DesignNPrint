'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, ContactShadows, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import { useSceneStore } from '@/lib/store';
import { createVisitingCardTexture, createBoxTexture } from './utils/textureGenerator';

/** Smooth step */
const ss = (e0: number, e1: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

/* ─────────────────────────────────────────
   VISITING CARD
───────────────────────────────────────── */
function VisitingCard({ visible, textures }: {
  visible: boolean;
  textures: ReturnType<typeof createVisitingCardTexture> | null;
}) {
  const ref = useRef<THREE.Group>(null);

  const frontMat = useMemo(() => {
    if (!textures) return new THREE.MeshStandardMaterial({ color: '#1a1d24' });
    return new THREE.MeshPhysicalMaterial({
      map: textures.colorMap,
      roughnessMap: textures.roughnessMap,
      metalnessMap: textures.metalnessMap,
      clearcoat: 0.6,
      clearcoatRoughness: 0.08,
      sheen: 0.8,
      sheenColor: new THREE.Color('#c9a84c'),
      envMapIntensity: 2.0,
    });
  }, [textures]);

  const edgeMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#0f1115', roughness: 0.95 }),
    []
  );
  const backMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#0a0c10', roughness: 0.95 }),
    []
  );

  useFrame((state, delta) => {
    if (!ref.current) return;
    // Idle hover float
    const t = state.clock.elapsedTime;
    ref.current.position.y = THREE.MathUtils.lerp(
      ref.current.position.y,
      Math.sin(t * 1.1) * 0.08,
      delta * 3
    );
    ref.current.rotation.z = THREE.MathUtils.lerp(
      ref.current.rotation.z,
      Math.sin(t * 0.7) * 0.018,
      delta * 2
    );
  });

  return (
    <group ref={ref} visible={visible}>
      {/* Main card slab with realistic thickness */}
      <mesh
        castShadow
        material={[edgeMat, edgeMat, edgeMat, edgeMat, frontMat, backMat]}
      >
        <boxGeometry args={[3.2, 1.84, 0.028]} />
      </mesh>

      {/* Soft drop shadow plane just behind card */}
      <mesh position={[0.08, -0.08, -0.05]} rotation={[0, 0, 0]}>
        <planeGeometry args={[3.5, 2.1]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.22} />
      </mesh>

      {/* Thin gloss highlight strip on top edge */}
      <mesh position={[0, 0.92, 0.012]}>
        <planeGeometry args={[3.2, 0.012]} />
        <meshBasicMaterial color="#fffbe6" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────
   FOLDING BOX  (pivot-group based)
───────────────────────────────────────── */
function FoldingBox({ visible, scrollProgress, textures }: {
  visible: boolean;
  scrollProgress: number;
  textures: ReturnType<typeof createBoxTexture> | null;
}) {
  const W = 2.6, H = 1.7, D = 1.7;

  const leftPivot  = useRef<THREE.Group>(null);
  const rightPivot = useRef<THREE.Group>(null);
  const frontPivot = useRef<THREE.Group>(null);
  const backPivot  = useRef<THREE.Group>(null);
  const lidPivot   = useRef<THREE.Group>(null);
  const tuckPivot  = useRef<THREE.Group>(null);
  const groupRef   = useRef<THREE.Group>(null);

  const panelMat = useMemo(() => {
    if (!textures) return new THREE.MeshStandardMaterial({ color: '#181d2a', side: THREE.DoubleSide });
    return new THREE.MeshPhysicalMaterial({
      map: textures.colorMap,
      roughnessMap: textures.roughnessMap,
      metalnessMap: textures.metalnessMap,
      clearcoat: 0.5,
      clearcoatRoughness: 0.12,
      envMapIntensity: 1.5,
      side: THREE.DoubleSide,
    });
  }, [textures]);

  const baseMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#10131c', roughness: 0.8, metalness: 0.1, side: THREE.DoubleSide }),
    []
  );

  useFrame((_, delta) => {
    if (!visible) return;
    const p = scrollProgress;

    // Fold left/right walls (progress 0.28→0.44)
    const sA = THREE.MathUtils.lerp(0, Math.PI / 2, ss(0.28, 0.44, p));
    if (leftPivot.current)  leftPivot.current.rotation.z  = THREE.MathUtils.damp(leftPivot.current.rotation.z,   sA, 7, delta);
    if (rightPivot.current) rightPivot.current.rotation.z = THREE.MathUtils.damp(rightPivot.current.rotation.z, -sA, 7, delta);

    // Fold front/back walls (0.40→0.57)
    const fbA = THREE.MathUtils.lerp(0, Math.PI / 2, ss(0.40, 0.57, p));
    if (frontPivot.current) frontPivot.current.rotation.x = THREE.MathUtils.damp(frontPivot.current.rotation.x, -fbA, 7, delta);
    if (backPivot.current)  backPivot.current.rotation.x  = THREE.MathUtils.damp(backPivot.current.rotation.x,   fbA, 7, delta);

    // Fold lid (0.55→0.72)
    const lidA = THREE.MathUtils.lerp(0, Math.PI / 2, ss(0.55, 0.72, p));
    if (lidPivot.current) lidPivot.current.rotation.x = THREE.MathUtils.damp(lidPivot.current.rotation.x, -lidA, 7, delta);

    // Tuck flap (0.68→0.78)
    const tuckA = THREE.MathUtils.lerp(0, Math.PI / 2.4, ss(0.68, 0.78, p));
    if (tuckPivot.current) tuckPivot.current.rotation.x = THREE.MathUtils.damp(tuckPivot.current.rotation.x, -tuckA, 7, delta);

    // Showcase rotation in final act (0.78+)
    if (groupRef.current) {
      const orb = ss(0.78, 1.0, p);
      const targetRotY = p > 0.78 ? orb * Math.PI * 1.4 : THREE.MathUtils.lerp(-0.5, 0.2, ss(0.40, 0.57, p));
      const targetRotX = p > 0.78 ? THREE.MathUtils.lerp(0.2, 0.5, Math.sin(orb * Math.PI)) : THREE.MathUtils.lerp(0.6, 0.18, ss(0.55, 0.72, p));
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 2, delta);
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 2, delta);
    }
  });

  return (
    <group ref={groupRef} visible={visible}>
      {/* BASE */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -H / 2, 0]} material={baseMat} receiveShadow castShadow>
        <planeGeometry args={[W, D]} />
      </mesh>

      {/* LEFT wall — hinge at x=-W/2 */}
      <group position={[-W / 2, -H / 2, 0]}>
        <group ref={leftPivot}>
          <mesh position={[-H / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={baseMat} castShadow>
            <planeGeometry args={[H, D]} />
          </mesh>
        </group>
      </group>

      {/* RIGHT wall — hinge at x=+W/2 */}
      <group position={[W / 2, -H / 2, 0]}>
        <group ref={rightPivot}>
          <mesh position={[H / 2, 0, 0]} rotation={[0, 0, -Math.PI / 2]} material={baseMat} castShadow>
            <planeGeometry args={[H, D]} />
          </mesh>
        </group>
      </group>

      {/* FRONT face — hinge at z=+D/2 */}
      <group position={[0, -H / 2, D / 2]}>
        <group ref={frontPivot}>
          <mesh position={[0, H / 2, 0]} material={panelMat} castShadow>
            <planeGeometry args={[W, H]} />
          </mesh>
        </group>
      </group>

      {/* BACK face + LID chain — hinge at z=-D/2 */}
      <group position={[0, -H / 2, -D / 2]}>
        <group ref={backPivot}>
          <mesh position={[0, H / 2, 0]} material={panelMat} castShadow>
            <planeGeometry args={[W, H]} />
          </mesh>

          {/* LID — hinge at top of back */}
          <group position={[0, H, 0]}>
            <group ref={lidPivot}>
              <mesh position={[0, D / 2, 0]} rotation={[Math.PI / 2, 0, 0]} material={panelMat} castShadow>
                <planeGeometry args={[W, D]} />
              </mesh>

              {/* TUCK FLAP */}
              <group position={[0, D, 0]}>
                <group ref={tuckPivot}>
                  <mesh position={[0, 0.3, 0]} material={baseMat} castShadow>
                    <planeGeometry args={[W * 0.86, 0.6]} />
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

/* ─────────────────────────────────────────
   GOLD PARTICLE FIELD
───────────────────────────────────────── */
function GoldDust() {
  const ref = useRef<THREE.Points>(null);
  const COUNT = 220;
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const speeds    = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      speeds[i]             = Math.random();
    }
    return { positions, speeds };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3 + 1] += Math.sin(t * 0.3 + speeds[i] * 7) * 0.0015;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.028} color="#d4af37" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

/* ─────────────────────────────────────────
   CAMERA CONTROLLER
───────────────────────────────────────── */
function CameraRig({ scrollProgress, mouse }: { scrollProgress: number; mouse: { x: number; y: number } }) {
  const { camera } = useThree();

  useFrame((_, delta) => {
    // Camera position driven by scroll chapter
    const targetZ = scrollProgress < 0.25 ? 5.0 : scrollProgress < 0.72 ? 5.8 : 4.6;
    const targetY = scrollProgress < 0.25 ? 0.0 : scrollProgress < 0.72 ? 0.2 : 0.3;
    (camera as THREE.PerspectiveCamera).position.z = THREE.MathUtils.damp(
      (camera as THREE.PerspectiveCamera).position.z, targetZ, 2, delta
    );
    (camera as THREE.PerspectiveCamera).position.y = THREE.MathUtils.damp(
      (camera as THREE.PerspectiveCamera).position.y, targetY, 2, delta
    );
    // Subtle mouse parallax on camera itself
    (camera as THREE.PerspectiveCamera).position.x = THREE.MathUtils.damp(
      (camera as THREE.PerspectiveCamera).position.x, mouse.x * 0.3, 3, delta
    );
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ─────────────────────────────────────────
   SCENE ORCHESTRATOR
───────────────────────────────────────── */
function PackagingScene() {
  const scrollProgress = useSceneStore((s) => s.scrollProgress);
  const mouse          = useSceneStore((s) => s.mouse);

  const cardTextures = useMemo(() => (typeof window !== 'undefined' ? createVisitingCardTexture() : null), []);
  const boxTextures  = useMemo(() => (typeof window !== 'undefined' ? createBoxTexture('DESIGN N PRINT', 'RIGID PACKAGING') : null), []);

  const showCard = scrollProgress < 0.30;
  const showBox  = scrollProgress >= 0.22;

  // Card exit opacity via ref to avoid re-renders
  const cardGroupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!cardGroupRef.current) return;
    const targetOpacity = scrollProgress < 0.22 ? 1 : ss(0.30, 0.22, scrollProgress);
    const targetScale   = scrollProgress < 0.22 ? 1 : THREE.MathUtils.lerp(1, 0.6, ss(0.22, 0.30, scrollProgress));
    cardGroupRef.current.scale.setScalar(THREE.MathUtils.damp(cardGroupRef.current.scale.x, targetScale, 6, delta));
    cardGroupRef.current.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mat = (obj as THREE.Mesh).material;
        if (Array.isArray(mat)) {
          mat.forEach((m) => { m.transparent = true; m.opacity = THREE.MathUtils.damp(m.opacity ?? 1, targetOpacity, 6, delta); });
        } else if (mat && 'opacity' in mat) {
          (mat as THREE.Material).transparent = true;
          (mat as THREE.Material).opacity = THREE.MathUtils.damp((mat as THREE.MeshStandardMaterial).opacity, targetOpacity, 6, delta);
        }
      }
    });
  });

  return (
    <>
      <CameraRig scrollProgress={scrollProgress} mouse={mouse} />
      <GoldDust />

      {/* Visiting Card */}
      <group ref={cardGroupRef}>
        <VisitingCard visible={showCard} textures={cardTextures} />
      </group>

      {/* Folding Box */}
      <FoldingBox visible={showBox} scrollProgress={scrollProgress} textures={boxTextures} />
    </>
  );
}

/* ─────────────────────────────────────────
   STICKY CANVAS WRAPPER  ← KEY CHANGE
   This canvas is `sticky top-0 h-screen`
   so it stays pinned while sections scroll
───────────────────────────────────────── */
export default function SceneRoot() {
  const setMouse = useSceneStore((s) => s.setMouse);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1),
      );
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [setMouse]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        zIndex: 1,
        background: 'radial-gradient(ellipse at 55% 38%, #1a2035 0%, #090b10 100%)',
        marginBottom: '-100vh', // Pull content up so it overlaps
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        shadows
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
      >
        {/* Lighting rig */}
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={3.0}
          color="#ffe9c0"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.001}
        />
        <directionalLight position={[-6, 2, -4]} intensity={1.8} color="#6cb8f0" />
        <directionalLight position={[0, -5, 3]}  intensity={0.6} color="#c9a040" />

        <Environment preset="city" />

        <ContactShadows
          position={[0, -2.2, 0]}
          opacity={0.55}
          scale={10}
          blur={3.5}
          far={5}
        />

        <PackagingScene />
      </Canvas>
    </div>
  );
}
