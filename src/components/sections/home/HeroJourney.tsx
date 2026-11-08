'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight, ChevronDown, MessageCircle } from 'lucide-react';
import LinkButton from '@/components/shared/LinkButton';
import { journeyChapters } from '@/data/homeData';
import { buildWhatsAppLink, getYearsInBusiness, siteConfig } from '@/data/siteConfig';
import { useChapterIndex, useScrollTrack } from '@/lib/useScrollTrack';

const JourneyScene = dynamic(() => import('@/components/three/JourneyScene'), { ssr: false });

const chapterStarts = journeyChapters.map((chapter) => chapter.start);

/** Position of the copy block per chapter (the 3D object takes the opposite side). */
const chapterLayout = [
  'lg:items-center lg:justify-start',
  'lg:items-end lg:justify-start',
  'lg:items-end lg:justify-start',
  'lg:items-end lg:justify-start',
  'lg:items-center lg:justify-start',
];

export default function HeroJourney() {
  const { trackRef, stickyRef, getProgress } = useScrollTrack();
  const activeIndex = useChapterIndex(getProgress, chapterStarts);

  return (
    <section ref={trackRef} className="relative h-[780vh]" aria-label="From visiting card to finished box">
      <div
        ref={stickyRef}
        className="bg-studio sticky top-[var(--nav-height)] h-[calc(100svh-var(--nav-height))] w-full overflow-hidden"
      >
        <JourneyScene getProgress={getProgress} />

        {/* ───────── Chapter copy ───────── */}
        <div className="pointer-events-none relative z-10 mx-auto h-full max-w-7xl px-5 sm:px-10">
          {journeyChapters.map((chapter, index) => {
            const isActive = index === activeIndex;
            const isHero = index === 0;
            const isFinale = index === journeyChapters.length - 1;
            return (
              <div
                key={chapter.id}
                className={`absolute inset-x-5 bottom-8 flex flex-col sm:inset-x-10 lg:inset-y-0 lg:flex-row lg:pb-20 lg:pt-6 ${chapterLayout[index]} transition-all duration-700 ease-out ${
                  isActive ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
                aria-hidden={!isActive}
              >
                <div className={`max-w-xl ${isActive ? 'pointer-events-auto' : ''}`}>
                  {isHero ? (
                    <p className="mb-4 hidden items-center sm:inline-flex gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink backdrop-blur">
                      <span className="cmyk-strip h-2 w-8 rounded-full" />
                      Since {siteConfig.foundedYear} · {siteConfig.location}
                    </p>
                  ) : (
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-muted">
                      0{index} — {chapter.label}
                    </p>
                  )}

                  {isHero ? (
                    <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
                      {chapter.title}
                    </h1>
                  ) : (
                    <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                      {chapter.title}
                    </h2>
                  )}
                  <p className="mt-4 max-w-md text-base leading-relaxed text-ink/70 sm:text-lg">{chapter.body}</p>

                  {isHero && (
                    <div className="mt-7 flex flex-wrap gap-3">
                      <LinkButton
                        href={buildWhatsAppLink('Hi Design N Print, I would like a quote.')}
                        isExternal
                        variant="whatsapp"
                      >
                        <MessageCircle className="h-4 w-4" /> Get a Quote on WhatsApp
                      </LinkButton>
                      <LinkButton href="/services" variant="outline">
                        Explore Services <ArrowRight className="h-4 w-4" />
                      </LinkButton>
                    </div>
                  )}

                  {isFinale && (
                    <>
                      <dl className="mt-6 grid max-w-md grid-cols-3 gap-4 border-t border-ink/10 pt-5">
                        <div>
                          <dt className="text-xs text-muted">In business</dt>
                          <dd className="font-display text-2xl font-bold text-ink">{getYearsInBusiness()}+ yrs</dd>
                        </div>
                        <div>
                          <dt className="text-xs text-muted">Product types</dt>
                          <dd className="font-display text-2xl font-bold text-ink">20+</dd>
                        </div>
                        <div>
                          <dt className="text-xs text-muted">Express dispatch</dt>
                          <dd className="font-display text-2xl font-bold text-ink">{siteConfig.expressDispatch}</dd>
                        </div>
                      </dl>
                      <div className="mt-6">
                        <Link
                          href="/services"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-ink underline-offset-4 hover:underline"
                        >
                          See what we can print <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ───────── Progress rail ───────── */}
        <ol
          className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-4 sm:flex"
          aria-label="Story progress"
        >
          {journeyChapters.map((chapter, index) => (
            <li key={chapter.id} className="flex items-center justify-end gap-3">
              <span
                className={`text-[11px] font-semibold uppercase tracking-widest transition-opacity duration-300 ${
                  index === activeIndex ? 'text-ink opacity-100' : 'opacity-0'
                }`}
              >
                {chapter.label}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'h-3 w-3 bg-ink' : 'h-2 w-2 bg-ink/25'
                }`}
              />
            </li>
          ))}
        </ol>

        {activeIndex === 0 && (
          <div className="absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-muted lg:flex">
            Scroll
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </div>
        )}
      </div>
    </section>
  );
}
