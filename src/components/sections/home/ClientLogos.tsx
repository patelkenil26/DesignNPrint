'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import SafeImage from '@/components/shared/SafeImage';
import { clientLogos, type ClientLogo } from '@/data/clientLogos';

interface LogoTileProps {
  client: ClientLogo;
}

/** One logo card: the real logo (greyscale until hovered) or a neutral placeholder while it is missing. */
function LogoTile({ client }: LogoTileProps) {
  return (
    <li className="flex h-16 w-32 shrink-0 items-center justify-center rounded-2xl border border-ink/10 bg-white px-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:h-20 sm:w-44">
      {client.logo ? (
        <span className="relative block h-full w-full grayscale transition-all duration-300 hover:grayscale-0">
          <SafeImage src={client.logo} alt={client.name} fill sizes="11rem" className="object-contain py-3" />
        </span>
      ) : (
        <span className="flex items-center gap-2 text-ink/30" aria-label={client.name}>
          <Building2 className="h-5 w-5" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-widest">Logo</span>
        </span>
      )}
    </li>
  );
}

/**
 * "Trusted by" band: client logos glide past in two opposite rows. Rows repeat their logos so the loop never has
 * a gap, and the edges fade out. Logos come from `src/data/clientLogos.ts`.
 */
export default function ClientLogos() {
  const isMotionAllowed = !useReducedMotion();
  const secondRow = [...clientLogos].reverse();

  return (
    <section className="overflow-hidden bg-paper py-14 sm:py-20" aria-labelledby="clients-heading">
      <motion.div
        className="mx-auto max-w-7xl px-5 text-center sm:px-10"
        initial={isMotionAllowed ? { opacity: 0, y: 24 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Our clients</p>
        <h2 id="clients-heading" className="mt-2 font-display text-2xl font-bold leading-tight text-ink sm:text-4xl">
          Trusted by businesses across Gujarat.
        </h2>
      </motion.div>

      <div className="mt-8 space-y-4 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] sm:mt-10">
        {[
          { rowId: 'forward', logos: clientLogos, animationClass: 'animate-marquee' },
          { rowId: 'reverse', logos: secondRow, animationClass: 'animate-marquee-reverse' },
        ].map(({ rowId, logos, animationClass }) => (
          <ul key={rowId} className={`${animationClass} flex w-max gap-4`} aria-label={rowId === 'forward' ? 'Client logos' : undefined} aria-hidden={rowId === 'reverse'}>
            {[0, 1].map((copy) =>
              logos.map((client) => <LogoTile key={`${copy}-${client.id}`} client={client} />),
            )}
          </ul>
        ))}
      </div>
    </section>
  );
}
