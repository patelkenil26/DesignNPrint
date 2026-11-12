import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ScrollToTopButton from "@/components/shared/ScrollToTopButton";
import WhatsAppFab from "@/components/shared/WhatsAppFab";
import JsonLd from "@/components/shared/JsonLd";
import { siteConfig } from "@/data/siteConfig";
import { buildLocalBusinessSchema, buildWebSiteSchema, defaultOgImage } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Design N Print - Premium Printing & Packaging Press in Ahmedabad",
    template: "%s",
  },
  description:
    "Design N Print is an offset printing and packaging press in Ahmedabad — visiting cards, brochures, boxes, stickers and more, designed and printed under one roof since 2008.",
  keywords: [...siteConfig.seoKeywords],
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_IN",
    url: "/",
    title: "Design N Print - Premium Printing & Packaging Press in Ahmedabad",
    description:
      "Offset printing and packaging press in Ahmedabad. Designed and printed under one roof since 2008.",
    images: [{ url: defaultOgImage, alt: "Design N Print — printing press in Ahmedabad" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Design N Print - Premium Printing & Packaging Press in Ahmedabad",
    description: "Offset printing and packaging press in Ahmedabad. Since 2008.",
    images: [defaultOgImage],
  },
  robots: { index: true, follow: true },
  // Set in the host's environment after claiming the site in Google Search Console / Bing Webmaster Tools.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION ? { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${sora.variable} font-poppins antialiased min-h-screen flex flex-col`}>
        <JsonLd data={[buildLocalBusinessSchema(), buildWebSiteSchema()]} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-brand-yellow focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
          {children}
        </main>
        <Footer />
        <WhatsAppFab />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
