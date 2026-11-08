import Reveal from '@/components/shared/Reveal';
import { coreValues } from '@/data/aboutData';

export default function AboutValues() {
  return (
    <section className="bg-paper py-16 sm:py-24" aria-labelledby="values-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">What drives us</p>
          <h2 id="values-heading" className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
            Quality is a habit, not a promise.
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {coreValues.map((value, index) => {
            const Icon = value.icon;
            return (
              <li key={value.id}>
                <Reveal delay={index * 0.08} className="h-full">
                  <div className="group h-full rounded-3xl bg-white p-7 shadow-sm ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-brand-yellow transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-bold text-ink">{value.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/70">{value.description}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
