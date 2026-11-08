'use client';

import { useEffect, useState } from 'react';
import { BoxTextureSet, buildBoxTextures } from './utils/boxTextures';
import { readBrandPalette } from './utils/canvasKit';

/** Builds the printed panel textures once (client only) and disposes them on unmount. */
export function useBoxTextures(): BoxTextureSet | null {
  const [textureSet, setTextureSet] = useState<BoxTextureSet | null>(null);

  useEffect(() => {
    let isCancelled = false;
    let built: BoxTextureSet | null = null;

    buildBoxTextures(readBrandPalette())
      .then((result) => {
        if (isCancelled) {
          result.dispose();
          return;
        }
        built = result;
        setTextureSet(result);
      })
      .catch((error) => console.error('Failed to build box textures', error));

    return () => {
      isCancelled = true;
      built?.dispose();
    };
  }, []);

  return textureSet;
}
