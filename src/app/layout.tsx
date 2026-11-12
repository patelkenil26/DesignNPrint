import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Poppins, Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ScrollToTopButton from "@/components/shared/ScrollToTopButton";
import WhatsAppFab from "@/components/shared/WhatsAppFab";
import WebMcpTools from "@/components/shared/WebMcpTools";
import JsonLd from "@/components/shared/JsonLd";
import { getAllProductCards } from "@/lib/productCards";
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

/** Browser chrome colour matches the dark navbar; pinch-zoom stays enabled (WCAG 1.4.4). */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101114",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "printing and packaging",
  formatDetection: { telephone: true, email: true, address: true },
  title: {
    default: siteConfig.seoTitle,
    template: "%s",
  },
  description: siteConfig.seoDescription,
  keywords: [...siteConfig.seoKeywords],
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
    languages: { "en-IN": "/", "x-default": "/" },
    types: { "text/plain": "/llms.txt" },
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_IN",
    url: "/",
    title: siteConfig.seoTitle,
    description: siteConfig.shareDescription,
    images: [{ url: defaultOgImage, width: 1200, height: 630, alt: "Design N Print — printing press in Ahmedabad" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seoTitle,
    description: siteConfig.shareDescription,
    images: [defaultOgImage],
  },
  // local-search hints (Bing and other engines read these; harmless for Google)
  other: {
    "geo.region": "IN-GJ",
    "geo.placename": "Naroda, Ahmedabad",
    "geo.position": `${siteConfig.geo.latitude};${siteConfig.geo.longitude}`,
    ICBM: `${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`,
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
        <Navbar menuProducts={getAllProductCards()} />
        <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
          {children}
        </main>
        <Footer />
        <WhatsAppFab />
        <WebMcpTools />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
