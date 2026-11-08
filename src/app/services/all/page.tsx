import type { Metadata } from 'next';
import PageHero from '@/components/shared/PageHero';
import QuoteBand from '@/components/shared/QuoteBand';
import ServicesBrowser from '@/components/sections/Services/ServicesBrowser';
import { serviceCatalog } from '@/data/serviceCatalog';

export const metadata: Metadata = {
  title: 'All Printing Services | Design N Print, Ahmedabad',
  description:
    'Browse every printing and packaging service by Design N Print in one place — filter by category or search by name.',
};

export default function AllServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Complete list"
        title="All services"
        description={`${serviceCatalog.length} printing and packaging services — filter by category or search for exactly what you need.`}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'All services' }]}
      />
      <section className="bg-paper py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <ServicesBrowser />
        </div>
      </section>
      <QuoteBand />
    </>
  );
}
