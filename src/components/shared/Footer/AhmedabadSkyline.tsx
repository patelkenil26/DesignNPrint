"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/** Seconds between one landmark starting to draw and the next. */
const DRAW_STAGGER_S = 0.25;

/** River waves along the bottom edge: one wave, then the same wave repeated. */
const RIVER_PATH = `M0 221 q15 -6 30 0${" t30 0".repeat(39)}`;

interface Landmark {
  id: string;
  /** closed outline — gets the solid fill so it hides the sun behind it */
  outline: string;
  /** open detail lines (arches, jaali, domes) drawn on top of the outline */
  details: string[];
}

/** Ahmedabad's best-known places, left to right, drawn as simple line art on a 1200 × 230 canvas. */
const landmarks: Landmark[] = [
  {
    id: "Bhadra Fort",
    outline:
      "M20 210 V124 H28 V112 H42 V124 H56 V112 H70 V124 H84 V112 H98 V124 H112 V112 H126 V124 H140 V112 H154 V124 H168 V112 H182 V124 H196 V112 H210 V210 Z",
    details: ["M85 210 V162 a20 20 0 0 1 40 0 V210", "M92 112 V86 H118 V112", "M90 86 Q105 62 120 86"],
  },
  {
    id: "Sidi Saiyyed ni Jaali",
    outline: "M240 210 V120 a70 70 0 0 1 140 0 V210 Z",
    details: [
      "M255 210 V122 a55 55 0 0 1 110 0 V210",
      "M310 210 V165",
      "M310 165 C 280 160 270 135 275 108",
      "M310 165 C 340 160 350 135 345 108",
      "M310 165 C 295 140 295 110 310 82",
      "M310 165 C 325 140 325 110 310 82",
      "M290 130 a20 20 0 0 1 40 0",
    ],
  },
  {
    id: "Teen Darwaza",
    outline:
      "M410 210 V120 H420 V108 H436 V120 H452 V108 H468 V120 H484 V108 H500 V120 H516 V108 H532 V120 H548 V108 H564 V120 H580 V108 H596 V120 H612 V108 H628 V120 H640 V210 Z",
    details: ["M429 210 V160 a28 28 0 0 1 56 0 V210", "M489 210 V150 a36 36 0 0 1 72 0 V210", "M565 210 V160 a28 28 0 0 1 56 0 V210"],
  },
  {
    id: "Jama Masjid",
    outline: "M690 210 V76 H706 V150 H884 V76 H900 V210 Z",
    details: [
      "M688 76 Q698 56 708 76",
      "M882 76 Q892 56 902 76",
      "M765 150 V138 a30 30 0 0 1 60 0 V150",
      "M795 108 V92",
      "M722 150 V144 a16 16 0 0 1 32 0 V150",
      "M836 150 V144 a16 16 0 0 1 32 0 V150",
      "M775 210 V182 a20 20 0 0 1 40 0 V210",
    ],
  },
  {
    id: "Atal Bridge on the Sabarmati",
    outline: "M930 190 Q 975 110 1020 190 Q 1065 110 1110 190 Q 1155 110 1200 190 V196 H930 Z",
    details: ["M975 196 V210", "M1065 196 V210", "M1155 196 V210"],
  },
];

const landmarkNames = landmarks.map((landmark) => landmark.id).join(", ");

interface Kite {
  id: string;
  color: string;
  /** position in the sky */
  className: string;
  /** hidden on phones so the sky stays clean */
  isDesktopOnly: boolean;
  rotate: number;
  floatDelay: string;
}

/** Uttarayan kites in the four print colours. */
const kites: Kite[] = [
  { id: "red", color: "var(--color-brand-red)", className: "left-[14%] top-[8%]", isDesktopOnly: false, rotate: -14, floatDelay: "0s" },
  { id: "yellow", color: "var(--color-brand-yellow)", className: "left-[44%] top-[12%]", isDesktopOnly: true, rotate: 10, floatDelay: "-3s" },
  { id: "blue", color: "var(--color-brand-blue)", className: "right-[16%] top-[10%]", isDesktopOnly: false, rotate: 16, floatDelay: "-5s" },
  { id: "green", color: "var(--color-brand-green)", className: "left-[29%] top-[2%]", isDesktopOnly: true, rotate: -8, floatDelay: "-7s" },
];

interface KiteFlyerProps {
  kite: Kite;
  isMotionAllowed: boolean;
}

/** A kite that bobs on its own and gives a little tug upward when tapped. */
function KiteFlyer({ kite, isMotionAllowed }: KiteFlyerProps) {
  return (
    <div className={`absolute ${kite.className} ${kite.isDesktopOnly ? "hidden sm:block" : ""}`}>
      <div className="animate-float-slow" style={{ animationDelay: kite.floatDelay }}>
        <motion.button
          type="button"
          aria-label={`Give the ${kite.id} kite a tug`}
          whileTap={isMotionAllowed ? { y: -26, rotate: kite.rotate + 12, scale: 1.12 } : undefined}
          whileHover={isMotionAllowed ? { y: -8 } : undefined}
          transition={{ type: "spring", stiffness: 300, damping: 12 }}
          className="block cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
          style={{ rotate: kite.rotate }}
        >
          <svg viewBox="0 0 44 96" className="h-16 w-7 sm:h-20 sm:w-9" aria-hidden="true">
            <polygon points="22,0 44,20 22,52 0,20" fill={kite.color} />
            <path d="M22 0 V52 M0 20 H44" stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="1.2" />
            <path d="M22 52 C 10 62 34 72 22 82 C 14 88 28 92 22 96" fill="none" stroke={kite.color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
}

/**
 * Footer scene for Ahmedabad: the city's landmarks draw themselves in line art as the footer scrolls in, a sun
 * rises behind them, Uttarayan kites drift above (tap one to tug it) and the Sabarmati ripples underneath.
 */
export default function AhmedabadSkyline() {
  const isMotionAllowed = !useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sceneRef, { once: true, amount: 0.2 });

  return (
    <div className="relative mx-auto mt-2 w-full max-w-7xl overflow-hidden sm:mt-8">
      <p className="relative z-10 px-5 text-center font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-white/50 sm:px-10">
        Printed with pride in Amdavad
      </p>

      <div ref={sceneRef} className={`relative h-36 w-full sm:h-auto sm:aspect-[1200/260] ${isInView ? "skyline-on" : ""}`}>
        {kites.map((kite) => (
          <KiteFlyer key={kite.id} kite={kite} isMotionAllowed={isMotionAllowed} />
        ))}

        {/* wider than a phone, centred, so only the middle landmarks show on small screens */}
        <svg
          viewBox="0 0 1200 230"
          role="img"
          aria-label={`Ahmedabad skyline: ${landmarkNames}`}
          className="absolute bottom-0 left-1/2 w-[720px] max-w-none -translate-x-1/2 sm:w-full"
        >
          <circle cx="600" cy="130" r="78" className="skyline-sun fill-brand-yellow" />

          {landmarks.map((landmark, landmarkIndex) => {
            const delay = 0.3 + landmarkIndex * DRAW_STAGGER_S;
            return (
              <g key={landmark.id} className="stroke-white/70" fill="none" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
                <path d={landmark.outline} pathLength={1} className="skyline-draw fill-ink-soft" style={{ "--draw-delay": `${delay}s` } as CSSProperties} />
                {landmark.details.map((detail) => (
                  <path key={detail} d={detail} pathLength={1} className="skyline-draw" style={{ "--draw-delay": `${delay + 0.5}s` } as CSSProperties} />
                ))}
              </g>
            );
          })}

          {/* ground and the river */}
          <path d="M0 210 H1200" className="stroke-white/70" strokeWidth="2" />
          <path d={RIVER_PATH} className="animate-river stroke-brand-blue/70" fill="none" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
