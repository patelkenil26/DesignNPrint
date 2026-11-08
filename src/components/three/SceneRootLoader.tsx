'use client';

import dynamic from 'next/dynamic';

// WebGL canvas must be loaded client-side only
const SceneRoot = dynamic(() => import('./SceneRoot'), { ssr: false });

export default function SceneRootLoader() {
  return <SceneRoot />;
}

