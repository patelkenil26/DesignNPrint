import type { Metadata } from "next";
import { constructMetadata } from "@/seo/metadata";
import { getBreadcrumbSchema, getServiceSchema, getFaqSchema } from "@/seo/schemas";
import { serviceSeoData } from "@/seo/serviceSeoData";
import { services } from "@/data/servicesData";
import JsonLd from "@/components/seo/JsonLd";

const SLUG = "company-file-folder";
const seo = serviceSeoData[SLUG];
const serviceItem = services.find((s) => s.id === SLUG);

export const metadata: Metadata = constructMetadata({
  title: seo?.metaTitle || `${serviceItem?.title || "Printing Service"} in Ahmedabad`,
  description:
    seo?.metaDescription ||
    `Commercial ${serviceItem?.title} printing and packaging solutions in Naroda GIDC, Ahmedabad. High-definition offset reproduction, custom finishes, and fast Gujarat delivery.`,
  path: `/services/${SLUG}`,
  keywords: seo?.keywords || [
    `${serviceItem?.title.toLowerCase()} printing ahmedabad`,
    `${serviceItem?.title.toLowerCase()} naroda gidc`,
  ],
});

export default function ServicePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: serviceItem?.title || "Service", url: `/services/${SLUG}` },
  ]);

  const serviceSchema = getServiceSchema({
    name: serviceItem?.title || "Commercial Printing Service",
    description:
      seo?.metaDescription ||
      `Commercial ${serviceItem?.title} printing services in Ahmedabad.`,
    url: `/services/${SLUG}`,
    image: serviceItem?.image,
  });

  const faqSchema = seo?.faqs && seo.faqs.length > 0 ? getFaqSchema(seo.faqs) : null;

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={serviceSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      {children}
    </>
  );
}
