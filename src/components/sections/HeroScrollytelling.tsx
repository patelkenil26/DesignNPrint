'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Box, ShieldCheck, PhoneCall, ChevronDown } from 'lucide-react';
import { useSceneStore } from '@/lib/store';

const WA_BASE = 'https://wa.me/919979855589?text=';

const chapters = [
  { label: '01', name: 'Luxury Cards', desc: '450 GSM Velvet' },
  { label: '02', name: 'Dieline Fold',  desc: 'CNC Precision' },
  { label: '03', name: '3D Packaging',  desc: 'Rigid Boxes' },
];

export default function HeroScrollytelling() {
  const activeChapter  = useSceneStore((s) => s.activeChapter);
  const scrollProgress = useSceneStore((s) => s.scrollProgress);

  return (
    <div className="relative w-full z-10 text-white select-none pointer-events-none">

      {/* ── Chapter nav rail (left, desktop) ── */}
      <nav aria-label="Story chapters" className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-5 pointer-events-auto">
        {chapters.map((c, i) => (
          <div key={i} className={`flex items-center gap-3 transition-all duration-500 ${activeChapter === i ? 'opacity-100' : 'opacity-35 hover:opacity-60'}`}>
            <span className={`block w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 ${activeChapter === i ? 'bg-amber-400 border-amber-400 shadow-[0_0_10px_#f59e0b]' : 'bg-transparent border-slate-500'}`} />
            <div className="text-[11px] leading-tight">
              <p className="font-bold tracking-widest text-slate-200">{c.label} {c.name}</p>
              <p className="text-slate-500">{c.desc}</p>
            </div>
          </div>
        ))}
      </nav>

      {/* ═══════════════════════════════════════════════════════════
          ACT 1  –  VISITING CARD HERO
          Viewport: 0 → 100vh
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-between px-6 sm:px-16 py-8 max-w-7xl mx-auto">

        {/* Top content */}
        <div className="pt-28 max-w-2xl pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/8 backdrop-blur-sm border border-white/12 text-amber-300 text-[11px] font-semibold tracking-[3px] mb-7 uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Ahmedabad's Finest Commercial Printing Press
          </div>

          <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[1.05] text-white mb-6">
            Precision on<br />
            Paper.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500">
              Premium<br />in 3D.
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-lg mb-10">
            Scroll to watch a flat 450 GSM velvet-matte sheet transform — 
            crease by crease — into a finished rigid packaging box, right here in your browser.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-sm hover:from-amber-400 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/30 active:scale-95"
            >
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`${WA_BASE}Hi%20Design%20N%20Print,%20mujhe%20visiting%20cards%20ka%20quote%20chahiye`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/18 backdrop-blur-md border border-white/15 text-white font-semibold text-sm transition-all"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              Instant WhatsApp Quote
            </a>
          </div>
        </div>

        {/* Bottom stats strip */}
        <div className="pointer-events-auto pb-6 border-t border-white/10 pt-6">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-slate-400">
            {[
              { val: '450 GSM', label: 'Velvet Stock' },
              { val: '0.01 mm', label: 'Dieline Accuracy' },
              { val: '10,000+', label: 'Units / Day' },
              { val: 'Since 2008', label: 'Commercial Press' },
            ].map((s, i) => (
              <div key={i}>
                <span className="text-amber-400 font-bold block text-sm">{s.val}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-2 text-amber-300/70 text-xs animate-pulse">
            <ChevronDown className="w-4 h-4" />
            <span>Scroll to unfold the packaging →</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          ACT 2  –  DIELINE FOLD
          Viewport: 100vh → 200vh
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-end px-6 sm:px-16 max-w-7xl mx-auto">
        <div className="pointer-events-auto max-w-lg text-right">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-[11px] font-semibold tracking-[2px] mb-6 uppercase">
            <Box className="w-3.5 h-3.5" />
            Act 2 · Structural Dieline Engineering
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-5 leading-tight">
            Flat Sheet to<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-indigo-400">
              Perfect Box.
            </span>
          </h2>

          <p className="text-slate-300 text-base leading-relaxed mb-8">
            CNC laser-scored crease lines. Automatic high-speed pasting. Mono-cartons, 
            retail boxes, and pharmaceutical packaging — folded live before your eyes.
          </p>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/18 border border-white/15 text-white font-semibold text-sm transition-all"
          >
            Packaging Solutions <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          ACT 3  –  ASSEMBLED BOX SHOWCASE
          Viewport: 200vh → 300vh
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center px-6 sm:px-16 max-w-7xl mx-auto">
        <div className="pointer-events-auto max-w-lg">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-[11px] font-semibold tracking-[2px] mb-6 uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            Act 3 · Retail-Ready Production
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-5 leading-tight">
            Manufactured for<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-amber-300">
              Shelf Dominance.
            </span>
          </h2>

          <p className="text-slate-300 text-base leading-relaxed mb-8">
            High-gloss UV, scratch-resistant matte lamination, foil stamping, 
            and embossing — all produced in-house at our Ahmedabad facility.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href={`${WA_BASE}Hi%20Design%20N%20Print,%20mujhe%20custom%20rigid%20boxes%20ka%20quotation%20chahiye`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/25"
            >
              <PhoneCall className="w-4 h-4" />
              Request Box Quotation
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/18 border border-white/15 text-white font-semibold text-sm transition-all"
            >
              Visit Our Press
            </Link>
          </div>
        </div>
      </section>

      {/* ── Scroll progress bar (bottom) ── */}
      <div className="fixed bottom-0 left-0 w-full h-[3px] bg-white/8 z-50">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 transition-none"
          style={{ width: `${Math.round(scrollProgress * 100)}%` }}
        />
      </div>
    </div>
  );
}
