import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import LegalPage from '@/components/shared/LegalPage';
import { privacyPolicy } from '@/data/legalContent';

export const metadata: Metadata = buildPageMetadata({
  title: 'Privacy Policy | Design N Print',
  description:
    'How Design N Print handles the information you share when you enquire or order — what we receive, how we use it and your choices.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return <LegalPage document={privacyPolicy} />;
}
