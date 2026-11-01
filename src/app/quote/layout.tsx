import type { Metadata } from "next";
import { constructMetadata } from "@/seo/metadata";
import { getBreadcrumbSchema } from "@/seo/schemas";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = constructMetadata({
  title: "Instant Commercial Print Cost Estimator & Quote Calculator | Ahmedabad",
  description:
    "Calculate instant price ranges, minimum order quantities, and turnaround times for brochures, business cards, mono cartons, and labels in Ahmedabad. Direct WhatsApp quotes available.",
  path: "/quote",
  keywords: [
    "printing cost calculator ahmedabad",
    "print quote naroda gidc",
    "instant brochure price estimate",
    "packaging box quotation online",
    "commercial print estimator gujarat",
  ],
});

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Instant Cost Estimator", url: "/quote" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {children}
    </>
  );
}
