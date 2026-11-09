import { siteConfig } from '@/data/siteConfig';

/**
 * Copy for the Privacy Policy and Terms & Conditions pages.
 * NOTE: written as a sensible starting draft for a quote-based printing business in India —
 * have the client (or their adviser) read and approve it before launch, then update `legalLastUpdated`.
 */
export const legalLastUpdated = 'November 2026';

export interface LegalSection {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface LegalDocument {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
}

const contactSection: LegalSection = {
  id: 'contact',
  title: 'Contact us',
  paragraphs: [
    `Questions about this page? Reach ${siteConfig.name} at ${siteConfig.email}, on ${siteConfig.phoneDisplay} (also WhatsApp), or visit us at ${siteConfig.addressLines.join(' ')}.`,
  ],
};

export const privacyPolicy: LegalDocument = {
  slug: 'privacy-policy',
  eyebrow: 'Your privacy',
  title: 'Privacy Policy',
  intro: `${siteConfig.name} respects your privacy. This page explains what information we receive when you use this website or contact us, and what we do with it. In short: we only use what you send us to answer your enquiry and complete your order.`,
  sections: [
    {
      id: 'who-we-are',
      title: 'Who we are',
      paragraphs: [
        `${siteConfig.name} is an offset printing and packaging press based in ${siteConfig.location}, Gujarat, India, serving businesses since ${siteConfig.foundedYear}. In this policy, “we”, “us” and “our” mean ${siteConfig.name}.`,
      ],
    },
    {
      id: 'information-we-receive',
      title: 'Information we receive',
      paragraphs: ['We only receive information that you choose to send us. This can include:'],
      bullets: [
        'Your name, phone number and email address.',
        'Details of your enquiry — product, quantity, size, finish and deadline.',
        'Artwork, logos or files you share so we can prepare a quote or print your job.',
        'Messages you send us on WhatsApp, by phone or by email.',
      ],
    },
    {
      id: 'how-the-enquiry-form-works',
      title: 'How the website enquiry form works',
      paragraphs: [
        'Our enquiry form does not send your details to a database on this website. When you press send, it opens WhatsApp with your message already written, and nothing is stored on the website itself. The message reaches us only when you choose to send it from WhatsApp.',
      ],
    },
    {
      id: 'how-we-use-it',
      title: 'How we use your information',
      bullets: [
        'To reply to your enquiry and prepare a quote.',
        'To design, proof, print, pack and deliver your order.',
        'To keep records of orders, invoices and payments, as the law requires.',
        'To contact you about your order. We do not send marketing messages unless you ask for them.',
      ],
    },
    {
      id: 'sharing',
      title: 'Who we share it with',
      paragraphs: [
        'We do not sell your personal information. We share it only when needed to deliver your order — for example with a courier or transport service — or when the law requires us to.',
      ],
    },
    {
      id: 'third-party-services',
      title: 'Third-party services on this website',
      paragraphs: ['This website uses or links to services run by other companies, each with its own privacy policy:'],
      bullets: [
        'WhatsApp (Meta) — when you message us or use the enquiry form.',
        'Google Maps — the map on our Contact and About pages.',
        'Google Fonts — the typefaces used on this website.',
        'Facebook and Instagram — if you follow the links to our profiles.',
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies and tracking',
      paragraphs: [
        'We do not use advertising cookies. Third-party services listed above, such as Google Maps, may set their own cookies when their content loads. If we later add website analytics, we will update this page and tell you.',
      ],
    },
    {
      id: 'retention',
      title: 'How long we keep it',
      paragraphs: [
        'We keep enquiry and order information for as long as it is needed to serve you and to meet our accounting and legal obligations. After that we delete it or keep it only in a form that identifies no one.',
      ],
    },
    {
      id: 'your-choices',
      title: 'Your choices',
      paragraphs: [
        `You can ask us at any time to show you the personal information we hold about you, to correct it, or to delete it — write to ${siteConfig.email}. We will respond as soon as we reasonably can, subject to records we must keep by law.`,
      ],
    },
    {
      id: 'security',
      title: 'Keeping your information safe',
      paragraphs: [
        'We take reasonable care to protect the information and artwork you share with us. No method of sending data over the internet is completely secure, so please avoid sending sensitive personal details that your enquiry does not need.',
      ],
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      paragraphs: ['If we change this policy, the new version will appear on this page with an updated date.'],
    },
    contactSection,
  ],
};

export const termsAndConditions: LegalDocument = {
  slug: 'terms',
  eyebrow: 'The fine print',
  title: 'Terms & Conditions',
  intro: `These terms explain how this website and our printing services work. By using the website or placing an order with ${siteConfig.name}, you agree to them.`,
  sections: [
    {
      id: 'using-the-website',
      title: 'Using this website',
      paragraphs: [
        'This website is for information about our products and services and to help you contact us. It is not an online shop — we work on quotes and confirmed orders.',
      ],
    },
    {
      id: 'product-information',
      title: 'Product information and images',
      paragraphs: [
        'Photos, renders and descriptions on this website are illustrations to help you choose. Printed colour can look different from a screen, and the final look and feel depends on the paper, material, finish and printing process. Ask us for a sample if the exact finish matters to you.',
      ],
    },
    {
      id: 'quotes',
      title: 'Quotes and prices',
      bullets: [
        'A quote is based on the product, quantity, size, paper or material, and finishing you tell us.',
        'If any of these change, the price can change.',
        'Prices on request are valid for the period stated in the quote.',
      ],
    },
    {
      id: 'orders',
      title: 'Orders and artwork approval',
      bullets: [
        'An order is confirmed when we agree the details and any advance payment we ask for.',
        'We share a digital proof before printing. Please check spelling, phone numbers, sizes and colours carefully.',
        'Once you approve a proof, you are responsible for any errors in the approved artwork.',
        'You must have the right to use all text, images and logos you give us.',
      ],
    },
    {
      id: 'production-and-tolerances',
      title: 'Production and tolerances',
      paragraphs: [
        'Small variations in colour, cutting, folding and quantity are a normal part of printing. We work to keep these as small as possible and will tell you about anything that affects your job.',
      ],
    },
    {
      id: 'delivery',
      title: 'Delivery and timelines',
      paragraphs: [
        'Delivery times we give are estimates. Express dispatch is available on selected jobs, and we confirm the timeline with your quote. We are not responsible for delays outside our control, such as transport disruption or supplier delays.',
      ],
    },
    {
      id: 'payment',
      title: 'Payment',
      paragraphs: [
        'Payment terms — including any advance — are agreed with you in the quote or order confirmation. Please make payments only against an invoice or confirmation from us, and confirm payment details with us directly before paying.',
      ],
    },
    {
      id: 'changes-and-cancellations',
      title: 'Changes and cancellations',
      paragraphs: [
        'Tell us as early as possible if you need to change or cancel an order. Once production has started — and for custom or die-cut work — a change or cancellation may not be possible, or may carry a charge for work already done.',
      ],
    },
    {
      id: 'problems',
      title: 'If something is wrong',
      paragraphs: [
        'Please check your order when it arrives and contact us promptly if there is a problem. We will look at it with you and, where the fault is ours, put it right.',
      ],
    },
    {
      id: 'liability',
      title: 'Our responsibility',
      paragraphs: [
        'We take care with every job. To the extent the law allows, our responsibility for any order is limited to the value of that order, and we are not responsible for indirect losses such as lost profit.',
      ],
    },
    {
      id: 'governing-law',
      title: 'Governing law',
      paragraphs: ['These terms are governed by the laws of India. Any dispute will be handled by the courts in Ahmedabad, Gujarat.'],
    },
    {
      id: 'changes',
      title: 'Changes to these terms',
      paragraphs: ['We may update these terms from time to time. The version on this page, with its date, is the one that applies.'],
    },
    contactSection,
  ],
};
