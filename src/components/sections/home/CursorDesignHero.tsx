'use client';

import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowRight, ChevronDown, MessageCircle } from 'lucide-react';
import CursorWriteText from '@/components/shared/CursorWriteText';
import LinkButton from '@/components/shared/LinkButton';
import { journeyChapters } from '@/data/homeData';
import { buildWhatsAppLink, siteConfig } from '@/data/siteConfig';
import { useScrollTrack } from '@/lib/useScrollTrack';

const CursorDesignScene = dynamic(() => import('@/components/three/CursorDesignScene'), { ssr: false });

const heroCopy = journeyChapters[0];

/**
 * Hero: a team of cursors designs and colours our print products on a design canvas.
 * The sequence plays by itself (~10s). The section stays pinned a little longer so that
 * scrolling can push the sequence forward; once it is complete the page simply continues.
 */
export default function CursorDesignHero() {
  const { trackRef, stickyRef, getProgress } = useScrollTrack();
  const [hasTitleWritten, setHasTitleWritten] = useState(false);
  const [hasBodyWritten, setHasBodyWritten] = useState(false);
  const markTitleWritten = useCallback(() => setHasTitleWritten(true), []);
  const markBodyWritten = useCallback(() => setHasBodyWritten(true), []);

  return (
    <section ref={trackRef} className="relative h-[190vh]" aria-label="Design N Print — we design and print everything">
      <div
        ref={stickyRef}
        className="bg-studio sticky top-[var(--nav-height)] h-[calc(100svh-var(--nav-height))] min-h-[560px] w-full overflow-hidden"
      >
        {/* studio atmosphere: soft CMYK light pools + fine design-canvas grid + vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: [
              'radial-gradient(ellipse 45% 55% at 78% 30%, color-mix(in srgb, var(--color-brand-blue) 20%, transparent), transparent 70%)',
              'radial-gradient(ellipse 40% 50% at 92% 82%, color-mix(in srgb, var(--color-brand-red) 16%, transparent), transparent 70%)',
              'radial-gradient(ellipse 35% 45% at 58% 8%, color-mix(in srgb, var(--color-brand-yellow) 22%, transparent), transparent 70%)',
              'radial-gradient(ellipse 30% 40% at 40% 95%, color-mix(in srgb, var(--color-brand-green) 12%, transparent), transparent 70%)',
            ].join(','),
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'radial-gradient(color-mix(in srgb, var(--color-ink) 18%, transparent) 1px, transparent 1.5px)',
            backgroundSize: '26px 26px',
            maskImage: 'radial-gradient(ellipse 75% 80% at 65% 50%, black 30%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse 75% 80% at 65% 50%, black 30%, transparent 85%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 120% 100% at 50% 50%, transparent 55%, color-mix(in srgb, var(--color-ink) 10%, transparent) 100%)',
          }}
        />

        <CursorDesignScene getScrollProgress={getProgress} />

        <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-start px-5 pt-8 sm:px-10 lg:justify-center lg:pt-0">
          <div className="pointer-events-auto max-w-xl">
            <p
              className={`mb-4 hidden items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink backdrop-blur transition-all duration-700 sm:inline-flex ${
                hasTitleWritten ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }`}
            >
              <span className="cmyk-strip h-2 w-8 rounded-full" />
              Since {siteConfig.foundedYear} · {siteConfig.location}
            </p>
            <CursorWriteText
              as="h1"
              text={heroCopy.title}
              className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl"
              delaySeconds={0.4}
              durationSeconds={1.9}
              cursorColor="var(--color-brand-blue)"
              onWritten={markTitleWritten}
            />
            <CursorWriteText
              as="p"
              text={heroCopy.body}
              className="mt-4 max-w-md text-base leading-relaxed text-ink/70 sm:text-lg"
              delaySeconds={1.6}
              durationSeconds={2.4}
              cursorColor="var(--color-brand-red)"
              onWritten={markBodyWritten}
            />
            <div
              className={`mt-7 flex flex-wrap gap-3 transition-all duration-700 ${
                hasBodyWritten ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
              }`}
            >
              <LinkButton href={buildWhatsAppLink('Hi Design N Print, I would like a quote.')} isExternal variant="whatsapp">
                <MessageCircle className="h-4 w-4" /> Get a Quote on WhatsApp
              </LinkButton>
              <LinkButton href="/services" variant="outline">
                Explore Services <ArrowRight className="h-4 w-4" />
              </LinkButton>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-muted lg:flex">
          Scroll
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
