import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServiceDetail from '@/components/sections/Services/ServiceDetail';
import { findCategory } from '@/data/categories';
import { findService, serviceCatalog } from '@/data/serviceCatalog';

interface ServicePageProps {
  params: Promise<{ category: string; service: string }>;
}

export function generateStaticParams() {
  return serviceCatalog.map((service) => ({ category: service.categorySlug, service: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { category: categorySlug, service: serviceSlug } = await params;
  const service = findService(categorySlug, serviceSlug);
  if (!service) return { title: 'Service not found | Design N Print' };

  return {
    title: `${service.title} in Ahmedabad | Design N Print`,
    description: `${service.summary} ${service.types.slice(0, 4).join(', ')} and more.`,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { category: categorySlug, service: serviceSlug } = await params;
  const service = findService(categorySlug, serviceSlug);
  const category = findCategory(categorySlug);
  if (!service || !category) notFound();

  return <ServiceDetail service={service} category={category} />;
}
