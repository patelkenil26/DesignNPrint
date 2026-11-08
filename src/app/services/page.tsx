import type { Metadata } from "next";
import ServicesSection from "@/components/sections/Services/ServicesSection";

export const metadata: Metadata = {
  title: "Our Services – Design N Print | Premium Printing & Packaging, Ahmedabad",
  description:
    "Explore 23+ premium printing and packaging services by Design N Print — visiting cards, rigid boxes, pharmaceutical cartons, pouches, brochures, roll labels and more. Ahmedabad's trusted commercial printing press.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 px-6 text-center">
        <p className="text-xs uppercase tracking-[4px] text-amber-400 font-semibold mb-3">
          Design N Print · Ahmedabad
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
          Printing & Packaging Services
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          From 450 GSM velvet-matte visiting cards to pharmaceutical mono-cartons and retail-ready rigid boxes —
          precision-manufactured at our Ahmedabad press.
        </p>
      </section>

      {/* Services Grid */}
      <ServicesSection />
    </div>
  );
}

