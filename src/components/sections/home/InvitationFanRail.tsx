'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import InvitationCard from '@/components/sections/invitations/InvitationCard';
import type { InvitationCardData } from '@/lib/invitations';

interface InvitationFanRailProps {
  cards: InvitationCardData[];
  /** accessible name for the list */
  label: string;
}

/** Gap between cards (px) — must match the `gap-3` class below. */
const CARD_GAP_PX = 12;

/**
 * Home-page invitations as a hand of cards. Native scroll-snap keeps swiping smooth; on every scroll frame each card
 * is fanned by its distance from the centre — the centred card stands tall and straight, its neighbours tilt, sink and
 * fade. Transforms are written straight to the DOM (no React re-render per frame). On first view the cards deal out
 * from a stack. With reduced motion the rail is a plain flat swipe list.
 */
export default function InvitationFanRail({ cards, label }: InvitationFanRailProps) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const fanRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const applyFan = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const scrollerBounds = scroller.getBoundingClientRect();
    const scrollerCentre = scrollerBounds.left + scrollerBounds.width / 2;
    const scrollableWidth = scroller.scrollWidth - scroller.clientWidth;
    setScrollProgress(scrollableWidth > 0 ? scroller.scrollLeft / scrollableWidth : 0);

    fanRefs.current.forEach((fanElement) => {
      if (!fanElement) return;
      if (prefersReducedMotion) {
        fanElement.style.transform = '';
        fanElement.style.opacity = '';
        return;
      }
      const cardBounds = fanElement.parentElement!.getBoundingClientRect();
      // offset in "cards from centre": 0 = centred, ±1 = the next card over
      const offset = (cardBounds.left + cardBounds.width / 2 - scrollerCentre) / (cardBounds.width + CARD_GAP_PX);
      const distance = Math.min(Math.abs(offset), 3);
      const rotation = Math.max(-3, Math.min(3, offset)) * 4;
      const sink = distance * distance * 8;
      const scale = 1.06 - distance * 0.06;
      fanElement.style.transform = `translateY(${sink}px) rotate(${rotation}deg) scale(${scale})`;
      fanElement.style.opacity = String(Math.max(0.4, 1 - distance * 0.18));
      fanElement.style.zIndex = String(10 - Math.round(distance));
    });
  }, [prefersReducedMotion]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    let frame = 0;
    const requestFan = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(applyFan);
    };
    // open on the middle card so the fan is balanced on both sides
    const middleCard = scroller.children[Math.floor(cards.length / 2)] as HTMLElement | undefined;
    if (middleCard) {
      scroller.scrollLeft = middleCard.offsetLeft - (scroller.clientWidth - middleCard.offsetWidth) / 2;
    }
    requestFan();
    scroller.addEventListener('scroll', requestFan, { passive: true });
    window.addEventListener('resize', requestFan);
    return () => {
      scroller.removeEventListener('scroll', requestFan);
      window.removeEventListener('resize', requestFan);
      cancelAnimationFrame(frame);
    };
  }, [applyFan, cards.length]);

  const scrollByCards = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const cardWidth = scroller.firstElementChild?.getBoundingClientRect().width ?? 220;
    scroller.scrollBy({ left: direction * (cardWidth + CARD_GAP_PX), behavior: 'smooth' });
  };

  return (
    <div>
      <ul
        ref={scrollerRef}
        className="no-scrollbar relative flex snap-x snap-mandatory gap-3 overflow-x-auto py-14 [--card-w:min(58vw,16rem)] [padding-inline:calc(50%-var(--card-w)/2)] sm:[--card-w:14rem] lg:[--card-w:15.5rem]"
        aria-label={label}
      >
        {cards.map((card, index) => (
          <motion.li
            key={card.id}
            className="w-[var(--card-w)] shrink-0 snap-center"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 70, scale: 0.85 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: Math.min(index, 6) * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              ref={(element) => {
                fanRefs.current[index] = element;
              }}
              className="origin-[50%_130%] will-change-transform"
            >
              <div className="transition-transform duration-300 ease-out motion-safe:hover:-translate-y-2">
                <InvitationCard card={card} isPriority={index < 3} startDelay={index * 300} />
              </div>
            </div>
          </motion.li>
        ))}
      </ul>

      <div className="relative mx-auto flex max-w-7xl items-center gap-4 px-5 sm:px-10">
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
