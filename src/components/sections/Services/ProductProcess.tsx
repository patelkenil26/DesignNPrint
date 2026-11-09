import Reveal from '@/components/shared/Reveal';
import { pressSteps } from '@/data/homeData';

/** Four-step "what happens after you say yes" strip — same steps as the home-page press story. */
export default function ProductProcess() {
  return (
    <section className="bg-paper-deep/60 py-16 sm:py-24" aria-labelledby="process-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">How it works</p>
          <h2 id="process-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            From your idea to your doorstep.
          </h2>
        </Reveal>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pressSteps.map((step, index) => (
            <li key={step.id}>
              <Reveal delay={index * 0.08} className="h-full">
                <div className="relative h-full rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
                  <span className="font-display text-4xl font-black text-outline">{step.number}</span>
                  <h3 className="mt-3 font-display text-lg font-bold text-ink">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{step.body}</p>
                  <span className="cmyk-strip mt-5 block h-1 w-10 rounded-full" />
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
