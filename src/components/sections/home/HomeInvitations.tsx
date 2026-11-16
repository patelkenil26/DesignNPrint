import Link from 'next/link';
import { preconnect } from 'react-dom';
import { ArrowRight } from 'lucide-react';
import InvitationVideoRail from '@/components/sections/invitations/InvitationVideoRail';
import Reveal from '@/components/shared/Reveal';
import { invitationMediaHosts } from '@/data/invitationCatalogue';
import { invitationsCopy } from '@/data/invitationsData';
import { getFeaturedInvitationCards } from '@/lib/invitations';

/**
 * Home-page invitations showcase (replaces "Fresh off the press"): a swipeable rail of video invitations,
 * each playing while it is on screen (media streamed lazily from the studio CDN), with a "View all" link into the full /invitations catalogue.
 * The previous gallery is kept on branch `archive/home-press-gallery`.
 */
export default function HomeInvitations() {
  // open the connections to the media CDN early, so the first poster and clip start without a handshake delay
  invitationMediaHosts.forEach((host) => preconnect(host));
  return (
    <section className="relative overflow-hidden bg-ink py-16 text-white sm:py-24" aria-labelledby="home-invitations-heading">
      <span className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-brand-red/20 blur-[110px]" aria-hidden="true" />
      <span className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-brand-yellow/15 blur-[110px]" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 px-5 sm:px-10">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-yellow">{invitationsCopy.eyebrow}</p>
          <h2 id="home-invitations-heading" className="mt-3 max-w-xl text-balance font-display text-3xl font-bold leading-tight sm:text-5xl">
            {invitationsCopy.homeHeading}
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/70">{invitationsCopy.homeBody}</p>
        </Reveal>
        <Link
          href={invitationsCopy.path}
          className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold text-ink transition-all hover:brightness-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          View all invitations <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="relative mt-8">
        <InvitationVideoRail cards={getFeaturedInvitationCards()} label="Sample video invitations" />
      </div>
    </section>
  );
}
