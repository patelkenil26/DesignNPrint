import { MessageCircle } from 'lucide-react';
import LinkButton from '@/components/shared/LinkButton';
import Reveal from '@/components/shared/Reveal';
import { startPaths } from '@/data/homeData';
import { buildWhatsAppLink } from '@/data/siteConfig';

/** "I have a design" vs "I need a design" — routes B2B repeat buyers and first-time brands separately. */
export default function StartPaths() {
  return (
    <section className="bg-paper pt-20 sm:pt-28" aria-labelledby="start-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Start your project</p>
          <h2 id="start-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">
            Two ways to begin. Both end with a print you&apos;re proud of.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {startPaths.map((path, index) => {
            const isPrimary = index === 0;
            return (
              <Reveal key={path.id} delay={index * 0.1}>
                <article
                  className={`flex h-full flex-col rounded-3xl p-7 shadow-sm sm:p-9 ${
                    isPrimary ? 'bg-ink text-white' : 'border border-ink/15 bg-white text-ink'
                  }`}
                >
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.25em] ${
                      isPrimary ? 'text-brand-yellow' : 'text-muted'
                    }`}
                  >
                    {path.eyebrow}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-bold sm:text-4xl">{path.title}</h3>
                  <p className={`mt-3 max-w-md text-base leading-relaxed ${isPrimary ? 'text-white/70' : 'text-ink/70'}`}>
                    {path.body}
                  </p>

                  <ol className="mt-6 grid gap-2 sm:grid-cols-3">
                    {path.steps.map((step, stepIndex) => (
                      <li
                        key={step}
                        className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                          isPrimary ? 'bg-white/10' : 'bg-paper'
                        }`}
                      >
                        <span className={`mr-1.5 font-display font-bold ${isPrimary ? 'text-brand-yellow' : 'text-brand-red'}`}>
                          {stepIndex + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>

                  <div className="mt-auto pt-8">
                    <LinkButton
                      href={buildWhatsAppLink(path.whatsappMessage)}
                      isExternal
                      variant={isPrimary ? 'whatsapp' : 'solid'}
                    >
                      <MessageCircle className="h-4 w-4" /> {path.ctaLabel}
                    </LinkButton>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
