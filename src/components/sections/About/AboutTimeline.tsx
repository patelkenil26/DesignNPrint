import Reveal from '@/components/shared/Reveal';
import { timelineMilestones } from '@/data/aboutData';

/** Our journey — three milestones on a CMYK line. */
export default function AboutTimeline() {
  return (
    <section className="bg-studio-dark py-16 text-white sm:py-24" aria-labelledby="journey-heading">
      <div className="mx-auto max-w-5xl px-5 sm:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-yellow">Our journey</p>
          <h2 id="journey-heading" className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Remarkable growth in the printing industry.
          </h2>
        </Reveal>

        <ol className="relative mt-14 space-y-10 border-l border-white/15 pl-8 sm:pl-12">
          <span className="cmyk-strip absolute -left-px top-0 h-full w-0.5" aria-hidden="true" />
          {timelineMilestones.map((milestone, index) => (
            <li key={milestone.id} className="relative">
              <span className="absolute -left-[2.6rem] top-1.5 h-4 w-4 rounded-full border-2 border-brand-yellow bg-ink sm:-left-[3.6rem]" />
              <Reveal delay={index * 0.1}>
                <p className="font-display text-sm font-bold uppercase tracking-widest text-brand-yellow">{milestone.year}</p>
                <h3 className="mt-1 font-display text-xl font-bold sm:text-2xl">{milestone.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">{milestone.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
