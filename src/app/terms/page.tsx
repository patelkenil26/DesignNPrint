import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import LegalPage from '@/components/shared/LegalPage';
import { termsAndConditions } from '@/data/legalContent';

export const metadata: Metadata = buildPageMetadata({
  title: 'Terms & Conditions | Design N Print',
  description:
    'The terms for using the Design N Print website and ordering printing — quotes, artwork approval, production, delivery and payment.',
  path: '/terms',
});

export default function TermsPage() {
  return <LegalPage document={termsAndConditions} />;
}
