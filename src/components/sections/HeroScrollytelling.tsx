'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Box, ShieldCheck, PhoneCall } from 'lucide-react';
import { useSceneStore } from '@/lib/store';

export default function HeroScrollytelling() {
  const activeChapter = useSceneStore((state) => state.activeChapter);
  const scrollProgress = useSceneStore((state) => state.scrollProgress);

  return (
    <div className="relative w-full z-10 text-white pointer-events-none">
      {/* ============================================================ */}
      {/* CHAPTER INDICATOR (Floating Left Rail)                       */}
      {/* ============================================================ */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-4 pointer-events-auto">
        {[
          { label: '01. Luxury Cards', desc: '450 GSM Velvet' },
          { label: '02. Dieline Fold', desc: 'CNC Precision' },
          { label: '03. 3D Packaging', desc: 'Rigid Boxes' },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-3 transition-all duration-300 ${
              activeChapter === idx ? 'opacity-100 scale-105' : 'opacity-40 hover:opacity-75'
            }`}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeChapter === idx
                  ? 'bg-amber-400 ring-4 ring-amber-400/20'
                  : 'bg-white/40'
              }`}
            />
            <div className="text-xs">
              <p className="font-semibold tracking-wider text-slate-200">{item.label}</p>
              <p className="text-[10px] text-slate-400">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ============================================================ */}
      {/* ACT 1: HERO & VISITING CARD (Scroll: 0vh - 100vh)            */}
      {/* ============================================================ */}
      <section className="min-h-screen flex flex-col justify-between p-6 sm:p-12 max-w-7xl mx-auto">
        <div className="pt-24 max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-300 text-xs font-medium tracking-wide mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>COMMERCIAL PRINTING & PACKAGING • AHMEDABAD</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight text-white mb-6">
            Precision on Paper, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">
              Perfection in 3D.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mb-8">
            Experience the tactile craftsmanship of 450 GSM velvet matte paper, 
            24K hot-foil stamping, and spot UV coating — engineered for brands that command attention.
          </p>

          <div className="flex flex-wrap items-center gap-4 pointer-events-auto">
            <Link
              href="/services"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold text-sm hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/25 active:scale-95"
            >
              <span>Explore All Print Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/919979855589?text=Hi%20Design%20N%20Print,%20mujhe%20visiting%20cards%20aur%20printing%20ka%20quote%20chahiye"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 text-white font-medium text-sm transition-all"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Instant WhatsApp Quote</span>
            </a>
          </div>
        </div>

        {/* Scroll down prompt */}
        <div className="pb-8 flex items-center justify-between border-t border-white/10 pt-6">
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <div>
              <span className="text-amber-400 font-bold block text-sm">450 GSM</span>
              <span>Velvet Stock</span>
            </div>
            <div className="w-px h-6 bg-white/15" />
            <div>
              <span className="text-amber-400 font-bold block text-sm">0.01 mm</span>
              <span>Dieline Cut Accuracy</span>
            </div>
            <div className="w-px h-6 bg-white/15" />
            <div>
              <span className="text-amber-400 font-bold block text-sm">10,000+</span>
              <span>Daily Production</span>
            </div>
          </div>

          <p className="text-xs text-amber-300/80 animate-pulse hidden sm:block">
            Scroll down to unfold the 3D packaging →
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* ACT 2: DIELINE & STRUCTURAL FOLD (Scroll: 100vh - 200vh)     */}
      {/* ============================================================ */}
      <section className="min-h-screen flex flex-col justify-center p-6 sm:p-12 max-w-7xl mx-auto">
        <div className="max-w-xl ml-auto text-right">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 backdrop-blur-md border border-blue-400/20 text-blue-300 text-xs font-medium tracking-wide mb-6">
            <Box className="w-3.5 h-3.5 text-blue-400" />
            <span>ACT 2: STRUCTURAL DIELINE ENGINEERING</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            From Flat Sheet to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-300 to-indigo-400">
              Precision 3D Box.
            </span>
          </h2>

          <p className="text-base text-slate-300 leading-relaxed mb-8">
            Watch as laser-scored dieline crease marks fold seamlessly along the hinges. 
            Automated high-speed box pasting with reinforced corrugated fluting, 
            mono-cartons, and rigid boxes ready for pharmaceutical and retail dominance.
          </p>

          <div className="flex justify-end gap-3 pointer-events-auto">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-sm font-semibold text-white transition-all"
            >
              <span>Custom Packaging Solutions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* ACT 3: FULLY ASSEMBLED 3D SHOWCASE (Scroll: 200vh - 300vh)   */}
      {/* ============================================================ */}
      <section className="min-h-screen flex flex-col justify-center p-6 sm:p-12 max-w-7xl mx-auto">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 backdrop-blur-md border border-emerald-400/20 text-emerald-300 text-xs font-medium tracking-wide mb-6">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>ACT 3: RETAIL READY PRODUCTION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Manufactured for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-amber-300">
              Unrivaled Shelf Presence.
            </span>
          </h2>

          <p className="text-base text-slate-300 leading-relaxed mb-8">
            The finished rigid box features high-gloss UV accents, scratch-resistant matte lamination, 
            and precision magnetic closures. Designed, printed, and manufactured directly in Ahmedabad.
          </p>

          <div className="flex flex-wrap items-center gap-4 pointer-events-auto">
            <a
              href="https://wa.me/919979855589?text=Hi%20Design%20N%20Print,%20mujhe%20custom%20rigid%20boxes%20ka%20quotation%20chahiye"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-emerald-500/25"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Request Box Quotation</span>
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium text-sm transition-all"
            >
              <span>Visit Our Press in Ahmedabad</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Scroll Progress Bar at very bottom */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-white/10 z-40">
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 transition-all duration-75"
          style={{ width: `${Math.round(scrollProgress * 100)}%` }}
        />
      </div>
    </div>
  );
}

