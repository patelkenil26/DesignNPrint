import type { Metadata } from "next";
import { constructMetadata } from "@/seo/metadata";
import { getBreadcrumbSchema } from "@/seo/schemas";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = constructMetadata({
  title: "Print Paper Stocks, GSM Guide & Luxury Finishes Lab | Ahmedabad",
  description:
    "Comprehensive technical guide to commercial print substrates (80 GSM Maplitho to 600+ GSM Rigid Greyboard) and specialty embellishments: Thermal Velvet, Raised Spot UV, Gold Foil, and MetPET.",
  path: "/materials",
  keywords: [
    "print paper stocks ahmedabad",
    "gsm paper weight guide",
    "foil stamping finishes gujarat",
    "spot uv printing naroda",
    "rigid board kappa board printing",
  ],
});

export default function MaterialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Paper Stocks & Finishes", url: "/materials" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {children}
    </>
  );
}
