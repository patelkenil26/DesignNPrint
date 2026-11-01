import type { Metadata } from "next";
import { constructMetadata } from "@/seo/metadata";
import { getBreadcrumbSchema } from "@/seo/schemas";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = constructMetadata({
  title: "About Our Commercial Printing Press & Packaging Facility in Ahmedabad",
  description:
    "Design N Print has provided commercial offset printing, pharmaceutical mono-cartons, and luxury packaging in Naroda GIDC, Ahmedabad since 2008. Explore our factory capabilities, CTP prepress, and quality standards.",
  path: "/about",
  keywords: [
    "about design n print ahmedabad",
    "commercial offset printing press naroda",
    "packaging manufacturers ahmedabad",
    "printing factory gujarat",
    "ctp prepress print shop ahmedabad",
  ],
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {children}
    </>
  );
}
