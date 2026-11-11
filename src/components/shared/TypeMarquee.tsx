const marqueeWords = ['Design', 'Print', 'Finish', 'Pack', 'Deliver'] as const;

interface TypeMarqueeProps {
  /** scroll direction of the band */
  isReverse?: boolean;
}

/** Oversized outlined / solid type that glides across the page — an editorial breather between big sections. */
export default function TypeMarquee({ isReverse = false }: TypeMarqueeProps) {
  return (
    <div className="relative overflow-hidden border-y border-ink/10 bg-paper py-5 sm:py-7" aria-hidden="true">
      <div className={`${isReverse ? 'animate-marquee-reverse' : 'animate-marquee'} flex w-max items-center gap-8 whitespace-nowrap sm:gap-12`}>
        {[0, 1].map((copy) =>
          marqueeWords.map((word, index) => (
            <span key={`${copy}-${word}`} className="flex items-center gap-8 sm:gap-12">
              <span
                className={`font-display text-5xl font-black uppercase leading-none tracking-tight sm:text-8xl ${
                  index % 2 === 0 ? 'text-ink' : 'text-outline'
                }`}
              >
                {word}
              </span>
              <span className="cmyk-strip inline-block h-3 w-12 rounded-full sm:h-4 sm:w-20" />
            </span>
          )),
        )}
      </div>
    </div>
  );
}
