'use client';

import { useEffect, useRef } from 'react';

interface CursorWriteTextProps {
  /** the text that gets "written" */
  text: string;
  /** heading level or paragraph */
  as?: 'h1' | 'h2' | 'p';
  className?: string;
  /** seconds to wait before the cursor starts writing */
  delaySeconds?: number;
  /** seconds the whole text takes to be written */
  durationSeconds?: number;
  /** CSS colour token for the writing cursor, e.g. "var(--color-brand-blue)" */
  cursorColor: string;
  /** called once the text is fully written and the cursor has left */
  onWritten?: () => void;
}

const EXIT_SECONDS = 0.5;

/**
 * Text that is written word by word by a small multiplayer-style cursor, which then leaves.
 * Words are clipped left → right with the cursor riding on the writing edge. Pure DOM + rAF,
 * no layout shift: all words are laid out from the start. Reduced motion shows the text at once.
 */
export default function CursorWriteText({
  text,
  as: Tag = 'p',
  className = '',
  delaySeconds = 0,
  durationSeconds = 1.6,
  cursorColor,
  onWritten,
}: CursorWriteTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const words = text.split(' ');

  useEffect(() => {
    const container = containerRef.current;
    const cursor = cursorRef.current;
    const wordElements = wordRefs.current.filter((word): word is HTMLSpanElement => word !== null);
    if (!container || !cursor || wordElements.length === 0) return;

    const showEverything = () => {
      wordElements.forEach((word) => {
        word.style.clipPath = 'none';
      });
      cursor.style.opacity = '0';
      onWritten?.();
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      showEverything();
      return;
    }

    const characterTotal = wordElements.reduce((sum, word) => sum + (word.textContent?.length ?? 0) + 1, 0);
    const startMs = performance.now() + delaySeconds * 1000;
    let animationFrame = 0;
    let hasFinished = false;

    const render = (nowMs: number) => {
      const elapsed = (nowMs - startMs) / 1000;
      if (elapsed < 0) {
        animationFrame = requestAnimationFrame(render);
        return;
      }
      const written = Math.min(1, elapsed / durationSeconds) * characterTotal;

      let consumed = 0;
      let edgeX = 0;
      let edgeY = 0;
      let edgeFound = false;
      const containerBox = container.getBoundingClientRect();
      wordElements.forEach((word) => {
        const wordLength = (word.textContent?.length ?? 0) + 1;
        const wordProgress = Math.min(1, Math.max(0, (written - consumed) / wordLength));
        // tiny overshoot on the right so descenders / italics are never clipped
        word.style.clipPath = `inset(-10% ${(1 - wordProgress) * 100}% -10% 0)`;
        if (!edgeFound && wordProgress < 1) {
          const box = word.getBoundingClientRect();
          edgeX = box.left - containerBox.left + box.width * wordProgress;
          edgeY = box.top - containerBox.top + box.height * 0.62;
          edgeFound = true;
        }
        consumed += wordLength;
      });

      if (!edgeFound) {
        // finished: park the cursor after the last word, then let it leave
        const lastBox = wordElements[wordElements.length - 1].getBoundingClientRect();
        edgeX = lastBox.right - containerBox.left;
        edgeY = lastBox.top - containerBox.top + lastBox.height * 0.62;
        const leaving = Math.min(1, (elapsed - durationSeconds) / EXIT_SECONDS);
        cursor.style.opacity = String(1 - leaving);
        cursor.style.transform = `translate3d(${edgeX + leaving * 40}px, ${edgeY - leaving * 30}px, 0) scale(${1 - leaving * 0.6})`;
        if (leaving >= 1) {
          if (!hasFinished) {
            hasFinished = true;
            onWritten?.();
          }
          return;
        }
      } else {
        cursor.style.opacity = '1';
        cursor.style.transform = `translate3d(${edgeX}px, ${edgeY}px, 0)`;
      }
      animationFrame = requestAnimationFrame(render);
    };
    animationFrame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrame);
  }, [delaySeconds, durationSeconds, onWritten, text]);

  return (
    <Tag ref={containerRef as never} className={`relative ${className}`}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span
            ref={(element) => {
              wordRefs.current[index] = element;
            }}
            className="inline-block"
            style={{ clipPath: 'inset(-10% 100% -10% 0)' }}
          >
            {word}
          </span>
          {index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
      <span
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 opacity-0"
        style={{ willChange: 'transform' }}
      >
        {/* small Figma-style arrow, tip at the writing edge */}
        <svg width="18" height="22" viewBox="0 0 18 22" className="-translate-x-[1px] -translate-y-[1px] drop-shadow-sm">
          <path
            d="M1 1 L1 17 L5.2 13.2 L8 20 L11 18.8 L8.2 12.2 L14 12 Z"
            fill={cursorColor}
            stroke="var(--color-paper)"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Tag>
  );
}
