import { featuredInvitations } from '@/data/invitationsData';
import { invitationDesigns, type InvitationDesign } from '@/data/invitationCatalogue';

/** What a card needs to render. Media stays on the studio CDN and is loaded lazily by the card. */
export interface InvitationCardData {
  id: string;
  title: string;
  /** occasion or short line under the title */
  tag: string;
  poster: string;
  /** short looping clip, or null for a still-image design */
  clip: string | null;
  /** width ÷ height of the original design */
  aspect: number;
}

function toCard(design: InvitationDesign, titleOverride?: string, tagOverride?: string): InvitationCardData {
  return {
    id: design.id,
    title: titleOverride ?? design.title,
    tag: tagOverride ?? design.category,
    poster: design.poster,
    clip: design.video ?? null,
    aspect: design.aspect,
  };
}

/** The curated designs for the home page rail. */
export function getFeaturedInvitationCards(): InvitationCardData[] {
  return featuredInvitations.flatMap((featured) => {
    const design = invitationDesigns.find((candidate) => candidate.id === featured.id);
    return design ? [toCard(design, featured.title, featured.tag)] : [];
  });
}
