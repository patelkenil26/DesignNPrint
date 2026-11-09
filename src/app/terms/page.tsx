import type { Metadata } from 'next';
import LegalPage from '@/components/shared/LegalPage';
import { termsAndConditions } from '@/data/legalContent';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Design N Print',
  description:
    'The terms for using the Design N Print website and ordering printing — quotes, artwork approval, production, delivery and payment.',
};

export default function TermsPage() {
  return <LegalPage document={termsAndConditions} />;
}
