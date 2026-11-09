"use client";

import { motion, useReducedMotion } from "framer-motion";
import { WORDMARK_INK_SEQUENCE, WORDMARK_PARTS, wordmarkFrameClasses, wordmarkTypography } from "@/components/shared/Footer/wordmarks/shared";

interface PopLetterProps {
  character: string;
  index: number;
  isStatic: boolean;
}

/** One letter: pale outline by default; on hover it lifts, fills with its ink and throws a printed offset shadow. */
function PopLetter({ character, index, isStatic }: PopLetterProps) {
  const ink = WORDMARK_INK_SEQUENCE[index % WORDMARK_INK_SEQUENCE.length];
  const nextInk = WORDMARK_INK_SEQUENCE[(index + 1) % WORDMARK_INK_SEQUENCE.length];
  const label = character === " " ? " " : character;

  return (
    <motion.span
      className="inline-block"
      initial={isStatic ? false : { y: "60%", opacity: 0 }}
      whileInView={{ y: "0%", opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.95, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="group relative inline-block cursor-default transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-[0.12em] hover:scale-110">
        <span className="text-outline-light inline-block opacity-70">{label}</span>
        {/* filled copy — shown on hover, and flashes in a wave across the word every few seconds */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ color: `var(--color-brand-${ink})`, textShadow: `0.05em 0.05em 0 var(--color-brand-${nextInk})` }}
        >
          {label}
        </span>
        <span
          aria-hidden="true"
          className="letter-wave pointer-events-none absolute inset-0"
          style={{ color: `var(--color-brand-${ink})`, animationDelay: `${index * 0.09}s` }}
        >
          {label}
        </span>
      </span>
    </motion.span>
  );
}

/**
 * VARIANT F — "Letter pop".
 * Every letter is its own button-like object: hover one and it jumps up and prints itself in its ink with
 * an offset shadow. When nobody touches it, a wave of colour runs along the name every few seconds.
 */
export default function LetterPopWordmark() {
  const isStatic = Boolean(useReducedMotion());
  let letterIndex = 0;

  return (
    <div className={wordmarkFrameClasses} aria-hidden="true">
      <div className={`relative ${wordmarkTypography}`}>
        {WORDMARK_PARTS.map((part, partIndex) => (
          <span key={part} className="block sm:inline">
            {[...part].map((character) => {
              const currentIndex = letterIndex;
              letterIndex += 1;
              return <PopLetter key={`${part}-${currentIndex}`} character={character} index={currentIndex} isStatic={isStatic} />;
            })}
            {partIndex === 0 && <span className="hidden sm:inline">{" "}</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
