import type { Metadata } from "next";
import { constructMetadata } from "@/seo/metadata";
import { getBreadcrumbSchema } from "@/seo/schemas";
import { siteConfig } from "@/seo/siteConfig";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = constructMetadata({
  title: "Contact Print Studio in Naroda GIDC, Ahmedabad | Request Quotation",
  description:
    "Get in touch with Design N Print for commercial offset printing, packaging samples, and instant job estimates. Located at Naroda GIDC, Ahmedabad. Call +91 97252 81074 or visit our print facility.",
  path: "/contact",
  keywords: [
    "contact design n print ahmedabad",
    "printing press naroda gidc phone number",
    "print shop address ahmedabad",
    "request printing quotation gujarat",
    "commercial printer contact ahmedabad",
  ],
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact Us", url: "/contact" },
  ]);

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Design N Print",
    description: "Contact details and quotation request for Design N Print commercial offset press in Ahmedabad.",
    url: `${siteConfig.siteUrl}/contact`,
    mainEntity: {
      "@type": "LocalBusiness",
      name: siteConfig.siteName,
      telephone: siteConfig.telephone,
      email: siteConfig.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.streetAddress,
        addressLocality: siteConfig.address.addressLocality,
        addressRegion: siteConfig.address.addressRegion,
        postalCode: siteConfig.address.postalCode,
        addressCountry: siteConfig.address.addressCountry,
      },
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={contactPageSchema} />
      {children}
    </>
  );
}
