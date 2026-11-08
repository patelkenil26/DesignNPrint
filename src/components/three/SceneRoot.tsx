'use client';

import React, { useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { useSceneStore } from '@/lib/store';
import HeroPackagingExperience from './HeroPackagingExperience';

/** Full-viewport fixed WebGL canvas — only mounted by the homepage */
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
      className="fixed inset-0 w-full h-full overflow-hidden"
      style={{
        zIndex: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 55% 35%, #181d2b 0%, #0b0d12 100%)',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 40 }}
        dpr={[1, 1.5]}
        shadows
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE_ToneMapping,
          toneMappingExposure: 1.1,
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting rig */}
          <ambientLight intensity={0.9} />

          {/* Key light — warm gold to emphasise foil */}
          <directionalLight
            position={[4, 7, 5]}
            intensity={2.8}
            color="#ffe9c0"
            castShadow
            shadow-mapSize={[1024, 1024]}
          />

          {/* Rim light — cool blue edge */}
          <directionalLight position={[-5, 2, -4]} intensity={1.6} color="#6cb4f0" />

          {/* Under fill — subtle warm bounce */}
          <directionalLight position={[0, -4, 3]} intensity={0.5} color="#c9a84c" />

          {/* HDR environment for metallic / clearcoat reflections */}
          <Environment preset="city" />

          {/* Soft contact shadow on floor */}
          <ContactShadows
            position={[0, -2.0, 0]}
            opacity={0.5}
            scale={9}
            blur={3}
            far={5}
            color="#000510"
          />

          <HeroPackagingExperience />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Needed because THREE isn't directly importable here — reference through global
// This is handled by @react-three/fiber automatically; we just pass the enum value
const THREE_ToneMapping = 4; // THREE.ACESFilmicToneMapping = 4
