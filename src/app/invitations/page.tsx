import type { Metadata } from 'next';
import { preconnect } from 'react-dom';
import InvitationStoreFrame from '@/components/sections/invitations/InvitationStoreFrame';
import JsonLd from '@/components/shared/JsonLd';
import { invitationsCopy, invitationsStoreUrl } from '@/data/invitationsData';
import { absoluteUrl, buildBreadcrumbSchema, buildPageMetadata, buildWebPageSchema } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: invitationsCopy.pageTitle,
  description: invitationsCopy.pageDescription,
  path: invitationsCopy.path,
  keywords: [
    'video invitation Ahmedabad',
    'wedding invitation video',
    'Gujarati wedding invitation video',
    'engagement invitation video',
    'birthday invitation video',
    'baby shower invitation video',
    'wedding card printing Ahmedabad',
    'digital invitation card',
  ],
});

const invitationServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Video invitations',
  serviceType: 'Personalised video invitation design',
  description: invitationsCopy.pageDescription,
  url: absoluteUrl(invitationsCopy.path),
  provider: { '@id': absoluteUrl('/#business') },
  areaServed: { '@type': 'Country', name: 'India' },
};

export default function InvitationsPage() {
  // warm up the connection to the store so the frame starts loading without a handshake delay
  preconnect(new URL(invitationsStoreUrl).origin);
  return (
    <>
      <JsonLd
        data={[
          invitationServiceSchema,
          buildWebPageSchema({
            name: invitationsCopy.pageTitle,
            description: invitationsCopy.pageDescription,
            path: invitationsCopy.path,
          }),
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Invitations', path: invitationsCopy.path },
          ]),
        ]}
      />
      {/* text for search engines and screen readers — the visible page is the store, full-screen */}
      <h1 className="sr-only">{invitationsCopy.heroHeading}</h1>
      <p className="sr-only">{invitationsCopy.heroBody}</p>
      <InvitationStoreFrame src={invitationsStoreUrl} />
    </>
  );
}
