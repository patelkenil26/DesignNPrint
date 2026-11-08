import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ScrollToTopButton from "@/components/shared/ScrollToTopButton";
import SmoothScrollProvider from "@/components/shared/SmoothScrollProvider";

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
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} font-poppins antialiased min-h-screen flex flex-col relative`}>
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-grow relative z-10">
            {children}
          </main>
          <Footer />
          <ScrollToTopButton />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
