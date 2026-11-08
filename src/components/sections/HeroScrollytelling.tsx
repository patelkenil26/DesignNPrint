'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Box, ShieldCheck, PhoneCall, ChevronDown } from 'lucide-react';
import { useSceneStore } from '@/lib/store';

const WA = 'https://wa.me/919979855589?text=';

const chapters = [
  { id: '01', name: 'Luxury Cards',  hint: '450 GSM Velvet' },
  { id: '02', name: 'Dieline Fold',  hint: 'CNC Precision' },
  { id: '03', name: '3D Packaging',  hint: 'Rigid Boxes' },
];

export default function HeroScrollytelling() {
  const chapter  = useSceneStore((s) => s.activeChapter);
  const progress = useSceneStore((s) => s.scrollProgress);

  return (
    /*
      This div has NO background — it sits transparently over the sticky 3D canvas.
      Each section is min-h-screen so together they create enough scroll distance
      for the 3D animation to play through all chapters.
    */
    <div className="pointer-events-none select-none text-white w-full">

      {/* ── Chapter dot-nav (left rail) ── */}
      <nav aria-label="Story chapters"
        className="fixed left-5 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-6 pointer-events-auto">
        {chapters.map((c, i) => (
          <div key={i} className={`flex items-center gap-3 transition-all duration-500 ${chapter === i ? 'opacity-100' : 'opacity-30 hover:opacity-60'}`}>
            <span className={`block rounded-full border-2 transition-all duration-300 ${chapter === i ? 'w-3 h-3 bg-amber-400 border-amber-400 shadow-[0_0_12px_#f59e0b]' : 'w-2 h-2 bg-transparent border-slate-500'}`} />
            <div className="text-[11px] leading-snug">
              <p className="font-bold tracking-widest text-slate-200">{c.id} · {c.name}</p>
              <p className="text-[10px] text-slate-500">{c.hint}</p>
            </div>
          </div>
        ))}
      </nav>

      {/* ═══════════════════════════════════
          ACT 1 — VISITING CARD  (0–100vh)
      ═══════════════════════════════════ */}
      <section className="min-h-screen flex flex-col justify-between px-6 sm:px-16 pt-28 pb-8 max-w-7xl mx-auto">

        {/* Hero copy — left side, 3D card is on right/center */}
        <div className="max-w-xl pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                          bg-black/40 backdrop-blur-md border border-white/10
                          text-amber-300 text-[11px] font-semibold tracking-[3px] mb-6 uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Ahmedabad's Finest Commercial Printing Press
          </div>

          <h1 className="text-5xl sm:text-[64px] font-black tracking-tight leading-[1.04] text-white mb-5">
            Precision<br />
            on Paper.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500">
              Premium<br />in 3D.
            </span>
          </h1>

          <p className="text-slate-300/90 text-base leading-relaxed max-w-md mb-8">
            Scroll to watch a 450 GSM velvet-matte sheet crease, fold, and lock into
            a finished rigid packaging box — engineered live in your browser.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/services"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl
                         bg-gradient-to-r from-amber-500 to-yellow-500
                         text-slate-950 font-bold text-sm
                         hover:from-amber-400 hover:to-yellow-400
                         transition-all shadow-lg shadow-amber-500/30 active:scale-95">
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>

            <a href={`${WA}Hi%20Design%20N%20Print,%20mujhe%20visiting%20cards%20ka%20quote%20chahiye`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl
                         bg-black/40 hover:bg-black/60 backdrop-blur-md
                         border border-white/15 text-white font-semibold text-sm transition-all">
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              Instant WhatsApp Quote
            </a>
          </div>
        </div>

        {/* Bottom stats strip */}
        <div className="pointer-events-auto pb-2">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-slate-400 mb-5">
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
          <div className="flex items-center gap-2 text-amber-300/60 text-xs animate-bounce">
            <ChevronDown className="w-4 h-4" /> Scroll to fold the box →
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          ACT 2 — DIELINE FOLD  (100–200vh)
      ═══════════════════════════════════ */}
      <section className="min-h-screen flex items-center justify-end px-6 sm:px-16 max-w-7xl mx-auto">
        <div className="max-w-md pointer-events-auto text-right">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                          bg-black/40 backdrop-blur-md border border-sky-400/20
                          text-sky-300 text-[11px] font-semibold tracking-[2px] mb-6 uppercase">
            <Box className="w-3.5 h-3.5" />
            Act 2 · Structural Dieline Engineering
          </div>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-5 leading-tight">
            Flat Sheet to<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-indigo-400">
              Perfect Box.
            </span>
          </h2>

          <p className="text-slate-300/90 text-sm leading-relaxed mb-7">
            CNC laser-scored crease lines. Automatic high-speed pasting.
            Watch the pivot-panel fold happen in real-time as you scroll.
          </p>

          <Link href="/services"
            className="inline-flex items-center justify-end gap-2 px-6 py-3.5 rounded-xl
                       bg-black/40 hover:bg-black/60 backdrop-blur-md
                       border border-white/15 text-white font-semibold text-sm transition-all">
            Packaging Solutions <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════
          ACT 3 — BOX SHOWCASE  (200–300vh)
      ═══════════════════════════════════ */}
      <section className="min-h-screen flex items-center px-6 sm:px-16 max-w-7xl mx-auto">
        <div className="max-w-md pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                          bg-black/40 backdrop-blur-md border border-emerald-400/20
                          text-emerald-300 text-[11px] font-semibold tracking-[2px] mb-6 uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            Act 3 · Retail-Ready Production
          </div>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-5 leading-tight">
            Manufactured for<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-amber-300">
              Shelf Dominance.
            </span>
          </h2>

          <p className="text-slate-300/90 text-sm leading-relaxed mb-8">
            Spot UV · Foil Stamping · Embossing · Matte Lamination.
            All produced in-house at our Ahmedabad facility.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href={`${WA}Hi%20Design%20N%20Print,%20mujhe%20custom%20rigid%20boxes%20ka%20quotation%20chahiye`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl
                         bg-emerald-500 hover:bg-emerald-400
                         text-slate-950 font-bold text-sm
                         transition-all shadow-lg shadow-emerald-500/25">
              <PhoneCall className="w-4 h-4" /> Request Box Quotation
            </a>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl
                         bg-black/40 hover:bg-black/60 backdrop-blur-md
                         border border-white/15 text-white font-semibold text-sm transition-all">
              Visit Our Press
            </Link>
          </div>
        </div>
      </section>

      {/* Scroll progress bar */}
      <div className="fixed bottom-0 left-0 w-full h-[3px] bg-white/5 z-50 pointer-events-none">
        <div className="h-full bg-gradient-to-r from-amber-400 to-yellow-500"
          style={{ width: `${Math.round(progress * 100)}%`, transition: 'none' }} />
      </div>
    </div>
  );
}
