import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ScrollToTopButton from "@/components/shared/ScrollToTopButton";
import ThemeSwitcher from "@/components/shared/ThemeSwitcher";

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
  title: "Design N Print - Commercial Printing & Packaging in Gujarat",
  description: "Specialized in high-precision commercial offset printing, pharmaceutical cartons, luxury foil finishes, and corporate branding in Naroda, Ahmedabad since 2008.",
  icons: {
    icon: [
      { url: "/images/Logo/DesignNPrint.png", sizes: "any" },
    ],
    shortcut: "/images/Logo/DesignNPrint.png",
    apple: "/images/Logo/DesignNPrint.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} font-poppins antialiased min-h-screen flex flex-col bg-surface text-text-main`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <ScrollToTopButton />
        <ThemeSwitcher />
      </body>
    </html>
  );
}
