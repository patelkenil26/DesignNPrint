import { Navigation } from 'lucide-react';
import LinkButton from '@/components/shared/LinkButton';
import Reveal from '@/components/shared/Reveal';
import { siteConfig } from '@/data/siteConfig';

export default function ContactMapCard() {
  return (
    <Reveal>
      <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-ink/5">
        <iframe
          src={siteConfig.mapsEmbedUrl}
          width="100%"
          height="420"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Design N Print location on Google Maps"
        />
        <div className="flex flex-wrap items-center justify-between gap-4 p-5">
          <p className="text-sm text-ink/70">{siteConfig.addressLines[2]}</p>
          <LinkButton href={siteConfig.mapsDirectionsUrl} isExternal variant="solid">
            <Navigation className="h-4 w-4" /> Get directions
          </LinkButton>
        </div>
      </div>
    </Reveal>
  );
}
