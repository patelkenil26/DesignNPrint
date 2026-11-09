import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ScrollToTopButton from "@/components/shared/ScrollToTopButton";
import WhatsAppFab from "@/components/shared/WhatsAppFab";

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
  title: "Design N Print - Premium Printing Services in Gujarat",
  description: "Design N Prints is specialized in fine-quality printing and supporting services for the commerce and industry of Gujarat since 2008.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${sora.variable} font-poppins antialiased min-h-screen flex flex-col`}>
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
