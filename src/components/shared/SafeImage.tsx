'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { ImageOff } from 'lucide-react';

/** next/image with a graceful placeholder if the file fails to load. */
export default function SafeImage({ alt, className = '', ...imageProps }: ImageProps) {
  const [hasFailed, setHasFailed] = useState(false);

  if (hasFailed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-paper-deep text-muted ${className}`}
      >
        <ImageOff className="h-8 w-8" />
      </div>
    );
  }

  return <Image alt={alt} className={className} onError={() => setHasFailed(true)} {...imageProps} />;
}
