'use client';

import { useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import ProductArt from '@/components/shared/ProductArt';
import SafeImage from '@/components/shared/SafeImage';
import type { ProductCardData } from '@/lib/productCards';

interface ProductFanProps {
  /** five covers, shown left → right */
  products: ProductCardData[];
}

const restPose = [
  { x: '-78%', y: 34, rotate: -15 },
  { x: '-39%', y: 10, rotate: -7.5 },
  { x: '0%', y: 0, rotate: 0 },
  { x: '39%', y: 10, rotate: 7.5 },
  { x: '78%', y: 34, rotate: 15 },
];

const spreadPose = [
  { x: '-112%', y: 42, rotate: -19 },
  { x: '-56%', y: 14, rotate: -9.5 },
  { x: '0%', y: -10, rotate: 0 },
  { x: '56%', y: 14, rotate: 9.5 },
  { x: '112%', y: 42, rotate: 19 },
];

const formatNumber = (value: number) => String(value).padStart(2, '0');

/** A hand of printed covers that fans out on load, spreads on hover and leans toward the pointer. */
export default function ProductFan({ products }: ProductFanProps) {
  const [isSpread, setIsSpread] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const tiltY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 20 });
  const tiltX = useSpring(useTransform(pointerY, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 20 });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
    setIsSpread(false);
  };

  const poses = isSpread ? spreadPose : restPose;

  return (
    <div
      className="relative mx-auto flex h-[22rem] w-full max-w-md items-center justify-center sm:h-[28rem] [perspective:1200px]"
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsSpread(true)}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div className="relative h-[15rem] w-[11rem] sm:h-[19rem] sm:w-[14rem]" style={{ rotateX: tiltX, rotateY: tiltY }}>
        {products.slice(0, 5).map((product, index) => {
          const pose = poses[index];
          return (
            <motion.div
              key={product.slug}
              className="absolute inset-0"
              style={{ zIndex: index === 2 ? 5 : 4 - Math.abs(index - 2) }}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 140, rotate: 0, x: '0%' }}
              animate={{ opacity: 1, ...pose }}
              transition={{
                type: 'spring',
                stiffness: 90,
                damping: 16,
                delay: prefersReducedMotion ? 0 : 0.15 + index * 0.09,
              }}
            >
              <div
                className="animate-float-slow h-full w-full"
                style={{ animationDelay: `${index * -1.4}s`, animationDuration: `${8 + index}s` }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-ink/10">
                  {product.image ? (
                    <SafeImage
                      src={product.image}
                      alt={product.coverAlt}
                      fill
                      priority={index === 2}
                      sizes="(min-width: 640px) 14rem, 11rem"
                      className="object-cover"
                    />
                  ) : (
                    <ProductArt accent={product.accent} mark={formatNumber(product.number)} caption={product.name} />
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-3 pt-10">
                    <p className="font-display text-sm font-bold leading-tight text-white">{product.name}</p>
                  </div>
                  <span
                    className="absolute inset-x-0 top-0 h-1.5"
                    style={{ backgroundColor: `var(--color-brand-${product.accent})` }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
