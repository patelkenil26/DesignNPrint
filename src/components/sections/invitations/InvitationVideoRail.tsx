'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import InvitationCard from '@/components/sections/invitations/InvitationCard';
import type { InvitationCardData } from '@/lib/invitations';

interface InvitationVideoRailProps {
  cards: InvitationCardData[];
  /** accessible name for the list */
  label: string;
}

/**
 * Swipeable rail of invitations — about five cards are on screen at once on desktop and every one of them plays.
 * Native scroll-snap keeps swiping smooth on phones; arrows and a progress bar help on desktop.
 */
export default function InvitationVideoRail({ cards, label }: InvitationVideoRailProps) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const scrollableWidth = scroller.scrollWidth - scroller.clientWidth;
    setScrollProgress(scrollableWidth > 0 ? scroller.scrollLeft / scrollableWidth : 0);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    let frame = 0;
    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateProgress);
    };
    scroller.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      scroller.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(frame);
    };
  }, [updateProgress]);

  const scrollByCards = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const cardWidth = scroller.firstElementChild?.getBoundingClientRect().width ?? 220;
    scroller.scrollBy({ left: direction * (cardWidth + 16) * 2, behavior: 'smooth' });
  };

  return (
    <div>
      <ul
        ref={scrollerRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 py-6 sm:px-10 lg:px-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]"
        aria-label={label}
      >
        {cards.map((card, index) => (
          <li key={card.id} className="w-[46vw] max-w-[16rem] shrink-0 snap-start sm:w-[13.5rem] lg:w-[14.5rem]">
            <InvitationCard card={card} isPriority={index < 3} startDelay={index * 300} />
          </li>
        ))}
      </ul>

      <div className="relative mx-auto mt-2 flex max-w-7xl items-center gap-4 px-5 sm:px-10">
        <span className="block h-1 flex-1 overflow-hidden rounded-full bg-white/15" aria-hidden="true">
          <motion.span
            className="cmyk-strip block h-full origin-left"
            animate={{ scaleX: 0.2 + scrollProgress * 0.8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          />
        </span>
        <span className="flex gap-2">
          {[-1, 1].map((direction) => (
            <button
              key={direction}
              type="button"
              onClick={() => scrollByCards(direction as 1 | -1)}
              aria-label={direction === 1 ? 'Next invitations' : 'Previous invitations'}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-all hover:bg-white hover:text-ink active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
            >
              {direction === 1 ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
            </button>
          ))}
        </span>
      </div>
    </div>
  );
}
