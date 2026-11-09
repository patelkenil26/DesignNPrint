import ValueCard from '@/components/sections/About/ValueCard';
import Reveal from '@/components/shared/Reveal';
import { coreValues } from '@/data/aboutData';

/** Four values, four process inks — each card is "printed" in its ink (hover on desktop, centred-on-screen on phones). */
export default function AboutValues() {
  return (
    <section className="bg-paper py-16 sm:py-24" aria-labelledby="values-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">What drives us</p>
          <h2 id="values-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">
            Quality is a habit, not a promise.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-ink/70">
            Four colours make every print. Four principles make every job.
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {coreValues.map((value, index) => {
            const Icon = value.icon;
            return (
              <li key={value.id}>
                <Reveal delay={index * 0.08} className="h-full">
                  <ValueCard
                    value={{ title: value.title, description: value.description, ink: value.ink, plate: value.plate }}
                    icon={<Icon className="h-5 w-5" />}
                  />
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
