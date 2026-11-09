import type { Metadata } from "next";
import Link from "next/link";
import { DEFAULT_WORDMARK_ID, wordmarkVariants } from "@/components/shared/Footer/wordmarks";

export const metadata: Metadata = {
  title: "Footer wordmark options | Design N Print",
  robots: { index: false, follow: false },
};

/** Internal preview page — all footer wordmark options stacked for comparison. Delete once one is chosen. */
export default function FooterVariantsPage() {
  return (
    <div className="bg-ink text-white">
      <header className="mx-auto max-w-7xl px-5 py-14 sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-yellow">Internal preview · not linked anywhere</p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Footer wordmark options</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
          Six ways to show “DESIGN N PRINT”. Scroll each into view, move your cursor over it and (on a phone) just watch.
          Use <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm">?wm=id</code> on any page to try one in the real footer. Current default:{" "}
          <strong className="text-brand-yellow">{DEFAULT_WORDMARK_ID}</strong>.
        </p>
      </header>

      {wordmarkVariants.map((variant) => {
        const Wordmark = variant.Component;
        return (
          <section key={variant.id} className="border-t border-white/10 py-10" aria-labelledby={`variant-${variant.id}`}>
            <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-4 px-5 sm:px-10">
              <div className="max-w-2xl">
                <p className="font-display text-sm font-bold text-brand-yellow">
                  Option {variant.letter}
                  {variant.id === DEFAULT_WORDMARK_ID && <span className="ml-3 inline-block rounded-full bg-brand-yellow px-2 py-0.5 align-middle text-[11px] text-ink">current</span>}
                </p>
                <h2 id={`variant-${variant.id}`} className="mt-1 font-display text-2xl font-bold">
                  {variant.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{variant.description}</p>
              </div>
              <Link
                href={`/about?wm=${variant.id}#site-footer`}
                className="text-sm font-semibold text-brand-yellow underline-offset-4 hover:underline"
              >
                See it in the real footer →
              </Link>
            </div>
            <div className="mt-6">
              <Wordmark />
            </div>
          </section>
        );
      })}
    </div>
  );
}
