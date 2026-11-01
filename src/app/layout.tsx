import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ScrollToTopButton from "@/components/shared/ScrollToTopButton";
import JsonLd from "@/components/seo/JsonLd";
import { getRootGraphSchema } from "@/seo/schemas";
import { siteConfig } from "@/seo/siteConfig";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Design N Print - Commercial Printing & Packaging in Gujarat",
    template: "%s | Design N Print Ahmedabad",
  },
  description:
    "Specialized in high-precision commercial offset printing, pharmaceutical medicine cartons, luxury rigid gift packaging, corporate catalogues, and custom foil branding in Naroda, Ahmedabad since 2008.",
  keywords: [
    "commercial printing ahmedabad",
    "offset printing press naroda",
    "packaging box manufacturers gujarat",
    "pharmaceutical medicine box printing",
    "rigid box manufacturer ahmedabad",
    "catalog brochure printing gujarat",
    "custom sticker label printing",
    "mono carton packaging gidc",
    "uv varnishing foil stamping ahmedabad",
    "design n print naroda",
  ],
  authors: [{ name: siteConfig.siteName, url: siteConfig.siteUrl }],
  creator: siteConfig.siteName,
  publisher: siteConfig.siteName,
  metadataBase: new URL(siteConfig.siteUrl),
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  icons: {
    icon: [
      { url: "/images/Logo/DesignNPrint.png", sizes: "any" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/images/Logo/DesignNPrint.png",
    apple: "/images/Logo/DesignNPrint.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.siteUrl,
    title: "Design N Print - Commercial Printing & Packaging in Gujarat",
    description:
      "Premier commercial offset and digital printing press in Naroda, Ahmedabad. 24–48h express turnaround on pharma cartons, boxes, catalogues, and corporate stationery.",
    siteName: siteConfig.siteName,
    images: [
      {
        url: siteConfig.ogImageUrl,
        width: 967,
        height: 259,
        alt: `${siteConfig.siteName} Commercial Printing & Packaging Facility`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Design N Print - Commercial Printing & Packaging in Gujarat",
    description:
      "Premier commercial offset press in Naroda, Ahmedabad. Pharma cartons, rigid boxes, catalogues, and finishes.",
    images: [siteConfig.ogImageUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": siteConfig.geo.region,
    "geo.placename": siteConfig.geo.placename,
    "geo.position": `${siteConfig.geo.latitude};${siteConfig.geo.longitude}`,
    ICBM: siteConfig.geo.icbm,
    "revisit-after": "7 days",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rootSchema = getRootGraphSchema();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} font-poppins antialiased min-h-screen flex flex-col bg-surface text-text-main`}
      >
        {/* SSR JSON-LD Schema: Organization + LocalBusiness + WebSite */}
        <JsonLd data={rootSchema} />

        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
