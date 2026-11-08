'use client';

import React, { useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import { useSceneStore } from '@/lib/store';
import HeroPackagingExperience from './HeroPackagingExperience';

export default function SceneRoot() {
  const setMouse = useSceneStore((state) => state.setMouse);
  const serviceColor = useSceneStore((state) => state.serviceColor);

  // Mouse tracker for 3D tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse(x, y);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [setMouse]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, #151821 0%, #0a0c10 100%)',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          {/* Subtle Ambient & Studio Lights */}
          <ambientLight intensity={1.2} />

          {/* Key Light (Slight Gold Tone to reflect foil) */}
          <directionalLight
            position={[5, 6, 5]}
            intensity={2.4}
            color="#fff6e5"
            castShadow
          />

          {/* Rim Light (Cool accent for sharp edges) */}
          <directionalLight
            position={[-5, 3, -4]}
            intensity={1.8}
            color={serviceColor || '#38bdf8'}
          />

          {/* Under fill light */}
          <directionalLight
            position={[0, -4, 2]}
            intensity={0.6}
            color="#2d3748"
          />

          {/* Realistic Floor Contact Shadow */}
          <ContactShadows
            position={[0, -1.8, 0]}
            opacity={0.45}
            scale={8}
            blur={2.5}
            far={4}
            color="#000000"
          />

          {/* Studio Environment map for authentic reflections */}
          <Environment preset="city" />

          {/* Floating Gentle Motion */}
          <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
            <HeroPackagingExperience />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}

