"use client";

import { motion } from "framer-motion";

/** Two lines on phones ("DESIGN N" / "PRINT"), one line from `sm` up. */
export const WORDMARK_PARTS = ["DESIGN N", "PRINT"];

/** Shared type settings so every layer of every variant lines up letter for letter. */
export const wordmarkTypography =
  "font-display font-black uppercase leading-[0.82] tracking-tight text-[18.5vw] sm:text-[10vw] text-center whitespace-nowrap";

/** Position of an overlay layer — matches the padding of the frame below. */
export const wordmarkLayerPosition = "pointer-events-none absolute inset-x-2 bottom-3 top-4";

export const wordmarkFrameClasses = "relative mx-auto w-full select-none overflow-hidden px-2 pb-3 pt-4";

export const WORDMARK_INK_SEQUENCE = ["blue", "red", "yellow", "green"] as const;

interface LettersProps {
  isStatic: boolean;
}

/** The wordmark, one letter at a time, so each can rise into place when it scrolls into view. */
export function Letters({ isStatic }: LettersProps) {
  let letterIndex = 0;
  return (
    <>
      {WORDMARK_PARTS.map((part, partIndex) => (
        <span key={part} className="block sm:inline">
          {[...part].map((character) => {
            const delay = letterIndex * 0.05;
            letterIndex += 1;
            return (
              <motion.span
                key={`${part}-${letterIndex}`}
                className="inline-block"
                initial={isStatic ? false : { y: "60%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.95, delay, ease: [0.22, 1, 0.36, 1] }}
              >
                {character === " " ? " " : character}
              </motion.span>
            );
          })}
          {partIndex === 0 && <span className="hidden sm:inline">{" "}</span>}
        </span>
      ))}
    </>
  );
}
