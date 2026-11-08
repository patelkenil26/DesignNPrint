'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';

function isWebGLAvailable(): boolean {
  try {
    const probe = document.createElement('canvas');
    return Boolean(probe.getContext('webgl2') || probe.getContext('webgl'));
  } catch {
    return false;
  }
}

/** Soft-box studio lighting built from procedural light panels (no network HDRI needed). */
export function StudioLighting({ keyIntensity = 1.5 }: { keyIntensity?: number }) {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 5]} intensity={keyIntensity} />
      <directionalLight position={[-5, 3, -3]} intensity={0.5} />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3.2} position={[0, 6, 3]} scale={[12, 5, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={2.2} position={[-6, 2, 3]} scale={[4, 6, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={2.2} position={[6, 1.5, -2]} scale={[4, 6, 1]} target={[0, 0, 0]} />
        <Lightformer form="ring" intensity={1.4} position={[0, 2, -6]} scale={6} target={[0, 0, 0]} />
      </Environment>
    </>
  );
}

interface StageCanvasProps {
  children: React.ReactNode;
  /** Shown when WebGL is not available (old devices) */
  fallback?: React.ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  fov?: number;
  /** Needed by the press scene (clipping planes) */
  localClipping?: boolean;
}

/**
 * Shared WebGL canvas wrapper:
 *  - renders only while scrolled into view (saves GPU / battery)
 *  - transparent background so the CSS "studio" backdrop shows through
 *  - graceful fallback if WebGL is unavailable
 */
export default function StageCanvas({
  children,
  fallback = null,
  className = '',
  cameraPosition = [0, 0.4, 6.5],
  fov = 34,
  localClipping = false,
}: StageCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  // this component only ever renders client-side (loaded via dynamic ssr:false)
  const [webglSupported] = useState<boolean>(() => isWebGLAvailable());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      rootMargin: '200px 0px',
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`} aria-hidden="true">
      {!webglSupported ? (
        fallback
      ) : (
        <Canvas
          frameloop={isVisible ? 'always' : 'never'}
          dpr={[1, 1.75]}
          camera={{ position: cameraPosition, fov, near: 0.1, far: 80 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          onCreated={({ gl }) => {
            gl.localClippingEnabled = localClipping;
            gl.setClearColor(0x000000, 0);
          }}
        >
          {children}
        </Canvas>
      )}
    </div>
  );
}
