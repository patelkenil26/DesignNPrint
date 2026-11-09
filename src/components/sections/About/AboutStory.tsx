import Reveal from '@/components/shared/Reveal';
import SafeImage from '@/components/shared/SafeImage';
import TiltCard from '@/components/shared/TiltCard';
import { siteConfig } from '@/data/siteConfig';

const storyImages = [
  { src: '/images/Card/box_designing.png', alt: 'Premium printed product boxes', className: 'col-span-2 aspect-[16/9]' },
  { src: '/images/Card/company_file_folder.jpg', alt: 'Branded company file folders', className: 'aspect-[4/3]' },
  { src: '/images/Card/product_catalogue.jpg', alt: 'Printed product catalogue', className: 'aspect-[4/3]' },
];

/** "Who we are" — copy on one side, a tilting photo collage on the other. */
export default function AboutStory() {
  return (
    <section className="bg-paper py-16 sm:py-24" aria-labelledby="story-heading">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-10 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Who we are</p>
          <h2 id="story-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
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

        <div className="grid grid-cols-2 gap-4">
          {storyImages.map((image, index) => (
            <Reveal key={image.src} delay={index * 0.1} className={image.className.includes('col-span-2') ? 'col-span-2' : ''}>
              <TiltCard>
                <div className={`relative overflow-hidden rounded-3xl bg-paper-deep shadow-xl ${image.className.replace('col-span-2', '')}`}>
                  <SafeImage
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
