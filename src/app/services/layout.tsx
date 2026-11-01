import type { Metadata } from "next";
import { constructMetadata } from "@/seo/metadata";
import { getBreadcrumbSchema } from "@/seo/schemas";
import { services } from "@/data/servicesData";
import { siteConfig } from "@/seo/siteConfig";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = constructMetadata({
  title: "Commercial Printing & Custom Packaging Services Catalog | 20+ Categories",
  description:
    "Explore Design N Print's comprehensive printing and packaging catalog in Ahmedabad. From pharmaceutical mono cartons and luxury rigid boxes to brochures, catalogs, stickers, and corporate identity stationery.",
  path: "/services",
  keywords: [
    "commercial printing services ahmedabad",
    "packaging catalog gujarat",
    "offset printing products naroda",
    "box manufacturing catalog ahmedabad",
    "corporate printing services gujarat",
  ],
});

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services & Products", url: "/services" },
  ]);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Commercial Printing and Packaging Services Catalog",
    description: "Complete list of offset printing, digital printing, and packaging solutions by Design N Print.",
    url: `${siteConfig.siteUrl}/services`,
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: `${siteConfig.siteUrl}/services/${service.name}`,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />
      {children}
    </>
  );
}
