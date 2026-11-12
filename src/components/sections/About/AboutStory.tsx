import StoryStack from '@/components/sections/About/StoryStack';
import Reveal from '@/components/shared/Reveal';
import { siteConfig } from '@/data/siteConfig';

/** "Who we are" — the company in two paragraphs, beside three proof sheets that drift into a stack. */
export default function AboutStory() {
  return (
    <section className="bg-paper-deep/60 py-16 sm:py-24" aria-labelledby="story-heading">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-10 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Who we are</p>
          <h2 id="story-heading" className="mt-3 text-balance font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">
            A leading printing company in Ahmedabad.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink/75">
            <p>
              {siteConfig.name} is specialised in fine-quality printing and supporting services for commerce and
              industry of Gujarat since {siteConfig.foundedYear}.
            </p>
            <p>
              We are a leading offset press in Ahmedabad. We have successfully executed complex jobs for our clients
              with timely delivery — and we ensure quality stays high with a reliable workflow system from start to
              finish.
            </p>
          </div>
        </Reveal>

        <StoryStack />
      </div>
    </section>
  );
}
