/**
 * Video invitations — copy, featured picks, steps and FAQs. The designs themselves (50 posters + preview clips, all
 * kept on the studio CDN) are listed in `invitationCatalogue.ts`.
 * NOTE: keep this file free of `@/` imports — scripts may read it directly.
 */

/** the studio's invitation store — its full interface is shown inside /invitations */
export const invitationsStoreUrl = 'https://invitation.designnprints.in/';

export const invitationsCopy = {
  navLabel: 'Invitations',
  path: '/invitations',
  eyebrow: 'Video invitations',
  homeHeading: 'Invites that move. Swipe through them.',
  homeBody: 'Wedding, engagement, birthday and baby-shower video invitations — pick a design, we customise it with your details.',
  pageTitle: 'Video Invitations in Ahmedabad – Wedding, Engagement & Birthday | Design N Print',
  pageDescription:
    'Personalised video invitations for weddings, engagements, birthdays, anniversaries and baby showers — in Gujarati, Hindi, Marathi, Tamil and more. Choose a design, send details on WhatsApp, get your video.',
  heroHeading: 'Make every invite a celebration.',
  heroBody:
    'Ready-made video and card designs for weddings, engagements, birthdays, anniversaries and baby showers. Choose one, share your details on WhatsApp and we customise it for you.',
  catalogueHeading: 'Browse every design',
  catalogueBody: 'Every design in one place. Filter by style, language and colour, tap the one you like and message us — we customise it with your details.',
  videosHeading: 'A few favourites',
  stepsHeading: 'Four simple steps',
};

/** the designs shown on the home page rail, in order — ids come from `invitationCatalogue.ts` */
export interface FeaturedInvitation {
  id: string;
  /** short card title */
  title: string;
  /** one short line under the title */
  tag: string;
}

export const featuredInvitations: FeaturedInvitation[] = [
  { id: 'NAFnJCiM', title: 'Multi-event ceremony', tag: 'Every function in one invite' },
  { id: '96QJ5kVw', title: 'Rajwadi royal wedding', tag: 'Palace-style grandeur' },
  { id: '0VLfZtyM', title: 'Gujarati peacock garden', tag: 'Gujarati wedding invitation' },
  { id: 'b0dl92OE', title: 'Elegant beachside wedding', tag: 'Soft, modern and breezy' },
  { id: 'IsWT3alg', title: 'Marathi royal theme', tag: 'Marathi wedding invitation' },
  { id: 'xiS47WYz', title: 'Traditional mandap', tag: 'Hindi wedding invitation' },
  { id: 'IBLjwszS', title: 'Marathi classic cultural', tag: 'Rooted in tradition' },
];

export interface InvitationStep {
  title: string;
  body: string;
}

export const invitationSteps: InvitationStep[] = [
  { title: 'Choose a design', body: 'Browse the catalogue and pick the video or card you like.' },
  { title: 'Send details', body: 'Share names, dates, venue and photos with us on WhatsApp.' },
  { title: 'We customise', body: 'Our team personalises the design with your details and shares a preview.' },
  { title: 'Get your invite', body: 'Receive your finished invitation, ready to share with family and friends.' },
];

export const invitationFaqs = [
  {
    id: 'what',
    question: 'What are video invitations?',
    answer:
      'Short animated invitations you share on WhatsApp, Instagram or email. They carry your names, dates, venue and music instead of a static card.',
  },
  {
    id: 'events',
    question: 'Which events are covered?',
    answer: 'Weddings, engagements, receptions, birthdays, anniversaries, baby showers and other family functions.',
  },
  {
    id: 'languages',
    question: 'Are designs available in my language?',
    answer:
      'Yes — the catalogue includes Gujarati, Hindi, Marathi, Tamil, Punjabi and Sindhi designs, as well as English. Use the language filter in the catalogue.',
  },
  {
    id: 'order',
    question: 'How do I order?',
    answer:
      'Pick a design, tap Order and message us on WhatsApp with your details. We customise it and share it back with you. Pricing and timing are confirmed on WhatsApp.',
  },
  {
    id: 'print',
    question: 'Can I also get printed invitation cards?',
    answer:
      'Yes. Design N Print is a printing press, so we can print wedding cards and invitations on the paper and finish you choose. Ask us on WhatsApp.',
  },
];

export const invitationWhatsAppMessage = (designTitle?: string) =>
  designTitle
    ? `Hi Design N Print, I like the "${designTitle}" video invitation. Please share the details and pricing.`
    : 'Hi Design N Print, I am interested in a video invitation. Please share the details and pricing.';
