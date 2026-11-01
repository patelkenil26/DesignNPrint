import type { Metadata } from "next";
import { constructMetadata } from "@/seo/metadata";
import { getBreadcrumbSchema, getServiceSchema } from "@/seo/schemas";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = constructMetadata({
  title: "Custom Packaging Box & Mono Carton Manufacturers in Ahmedabad | Pharma & Retail",
  description:
    "Industrial packaging solutions engineered in Naroda GIDC: pharmaceutical mono cartons, cosmetic item boxes, agrochemical pesticide packaging, and corrugated mailers with spot UV, MetPET board, and foil finishes.",
  path: "/packaging",
  keywords: [
    "custom packaging box ahmedabad",
    "mono carton manufacturers naroda",
    "pharma box printing gujarat",
    "cosmetic packaging ahmedabad",
    "corrugated mailer boxes gujarat",
  ],
});

export default function PackagingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Packaging Solutions", url: "/packaging" },
  ]);

  const packagingServiceSchema = getServiceSchema({
    name: "Custom Packaging & Carton Manufacturing",
    description: "Industrial mono cartons, pharmaceutical packaging, rigid boxes, and custom die-cut product packaging.",
    url: "/packaging",
    types: [
      "Pharmaceutical Medicine Mono Cartons",
      "Cosmetic & Skincare Boxes",
      "Chemical & Agrochemical Packaging",
      "Rigid Gift & Presentation Boxes",
      "Corrugated E-Commerce Mailers",
    ],
  });

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={packagingServiceSchema} />
      {children}
    </>
  );
}
