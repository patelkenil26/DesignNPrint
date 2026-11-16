'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Pause, Play } from 'lucide-react';
import SafeImage from '@/components/shared/SafeImage';
import { invitationWhatsAppMessage } from '@/data/invitationsData';
import { buildWhatsAppLink } from '@/data/siteConfig';
import type { InvitationCardData } from '@/lib/invitations';

/** Data-saver mode or a very slow link: wait for a tap instead of auto-playing clips. */
function connectionAllowsAutoplay(): boolean {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  if (!connection) return true;
  return !connection.saveData && !['slow-2g', '2g'].includes(connection.effectiveType ?? '');
}

/** Runs the callback once the page (HTML, fonts, hero images) has finished loading — clips never compete with it. */
function whenPageHasLoaded(callback: () => void): () => void {
  if (document.readyState === 'complete') {
    callback();
    return () => undefined;
  }
  window.addEventListener('load', callback, { once: true });
  return () => window.removeEventListener('load', callback);
}

interface InvitationCardProps {
  card: InvitationCardData;
  /** true for the first cards on a page — their poster loads straight away */
  isPriority?: boolean;
  /** how long to wait (ms) before this card's clip starts, so clips ease in one after another */
  startDelay?: number;
  /** extra classes on the outer element */
  className?: string;
}

/**
 * One invitation. How it stays fast:
 *  1. the small poster paints first (lazy, off-screen posters wait until they are close);
 *  2. the clip is requested only when the card is on screen, the page has finished loading, and a short
 *     staggered delay has passed — so it never competes with the page itself or with its neighbours;
 *  3. when the card leaves the screen the <video> is removed, which cancels the download and frees memory.
 * Tap the card to pause or play.
 */
export default function InvitationCard({ card, isPriority = false, startDelay = 0, className = '' }: InvitationCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [canAutoplay, setCanAutoplay] = useState(false);
  const [isClipAllowed, setIsClipAllowed] = useState(false);
  const [isVideoShowing, setIsVideoShowing] = useState(false);
  /** the visitor's own tap — overrides autoplay until the card leaves the screen */
  const [viewerChoice, setViewerChoice] = useState<'play' | 'pause' | null>(null);

  const hasClip = card.clip !== null;
  const shouldPlay = hasClip && isClipAllowed && (viewerChoice === 'play' || (viewerChoice === null && canAutoplay));
  // portrait video-shaped designs fill the card; other shapes (A4 cards) are shown whole
  const isVideoShaped = card.aspect > 0.5 && card.aspect < 0.62;

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setCanAutoplay(!prefersReducedMotion && connectionAllowsAutoplay());
        } else {
          // off screen: drop the clip (cancels its download) and forget any tap
          setIsClipAllowed(false);
          setIsVideoShowing(false);
          setViewerChoice(null);
        }
      },
      { threshold: 0.45 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || !hasClip) return;
    let startTimer: ReturnType<typeof setTimeout> | undefined;
    const stopWaiting = whenPageHasLoaded(() => {
      startTimer = setTimeout(() => setIsClipAllowed(true), startDelay);
    });
    return () => {
      stopWaiting();
      clearTimeout(startTimer);
    };
  }, [isInView, hasClip, startDelay]);

  const handleCardPress = () => {
    setIsClipAllowed(true);
    if (shouldPlay) {
      setViewerChoice('pause');
      setIsVideoShowing(false);
    } else {
      setViewerChoice('play');
    }
  };

  return (
    <div ref={cardRef} className={className}>
      <div className="relative aspect-[9/16] overflow-hidden rounded-[1.5rem] bg-ink-soft shadow-[0_24px_50px_-24px_color-mix(in_srgb,black_75%,transparent)]">
        <SafeImage
          src={card.poster}
          alt={`${card.title} — video invitation design`}
          fill
          unoptimized
          sizes="(min-width: 1024px) 16rem, 46vw"
          preload={isPriority}
          className={isVideoShaped ? 'object-cover' : 'object-contain'}
        />
        {shouldPlay && (
          <video
            src={card.clip ?? undefined}
            poster={card.poster}
            autoPlay
            loop
            muted
            playsInline
            disableRemotePlayback
            preload="auto"
            aria-hidden="true"
            onPlaying={() => setIsVideoShowing(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${isVideoShowing ? 'opacity-100' : 'opacity-0'}`}
          />
        )}

        {hasClip && (
          <button
            type="button"
            onClick={handleCardPress}
            aria-label={shouldPlay ? `Pause ${card.title}` : `Play ${card.title}`}
            className="absolute inset-0 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-brand-yellow"
          />
        )}
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" aria-hidden="true" />

        {hasClip && (
          <span
            className="pointer-events-none absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-ink/60 text-white backdrop-blur"
            aria-hidden="true"
          >
            {shouldPlay ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </span>
        )}

        <span className="absolute inset-x-0 bottom-0 p-3.5 text-white sm:p-4">
          <span className="pointer-events-none line-clamp-2 block font-display text-base font-bold leading-tight sm:text-lg">{card.title}</span>
          <span className="pointer-events-none mt-0.5 block text-xs leading-snug text-white/70">{card.tag}</span>
          <a
            href={buildWhatsAppLink(invitationWhatsAppMessage(card.title))}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-whatsapp px-3 py-1.5 text-xs font-semibold text-ink transition-all hover:brightness-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" /> I want this
          </a>
        </span>
      </div>
    </div>
  );
}
