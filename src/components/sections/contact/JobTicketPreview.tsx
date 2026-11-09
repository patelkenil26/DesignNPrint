'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, MessageCircle } from 'lucide-react';

export interface TicketRow {
  id: string;
  label: string;
  value: string;
}

interface JobTicketPreviewProps {
  ticketNumber: string;
  rows: TicketRow[];
  /** 0–1 — how much of the ticket is filled in */
  progress: number;
  isSending: boolean;
  isSent: boolean;
  formId: string;
}

/**
 * The enquiry as a printed job ticket. Rows "print" in as the visitor fills the form,
 * and the ticket gets stamped SENT when it goes to WhatsApp.
 */
export default function JobTicketPreview({ ticketNumber, rows, progress, isSending, isSent, formId }: JobTicketPreviewProps) {
  return (
    <div className="relative">
      <div className="relative rounded-3xl bg-white shadow-2xl ring-1 ring-ink/10">
        <span className="cmyk-strip absolute inset-x-0 top-0 h-1.5 rounded-t-3xl" aria-hidden="true" />

        <div className="px-6 pb-5 pt-7 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted">Job ticket</p>
              <p className="mt-1 font-display text-2xl font-bold tabular-nums text-ink">{ticketNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Design N Print</p>
              <p className="text-xs text-muted">Naroda, Ahmedabad</p>
            </div>
          </div>

          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-paper-deep" role="progressbar" aria-label="Ticket completion" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100}>
            <motion.span
              className="cmyk-strip block h-full rounded-full"
              initial={false}
              animate={{ width: `${Math.max(progress, 0.04) * 100}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        <div className="border-t border-dashed border-ink/20 px-6 py-5 sm:px-8">
          <ul className="space-y-3.5">
            <AnimatePresence initial={false}>
              {rows.map((row) => {
                const isFilled = row.value.length > 0;
                return (
                  <li key={row.id} className="grid grid-cols-[5.5rem_1fr] items-baseline gap-3 text-sm">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">{row.label}</span>
                    {isFilled ? (
                      <motion.span
                        key={row.value}
                        initial={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="break-words font-semibold text-ink"
                      >
                        {row.value}
                      </motion.span>
                    ) : (
                      <span className="h-px translate-y-[-3px] bg-[repeating-linear-gradient(90deg,var(--color-ink)_0_3px,transparent_3px_8px)] opacity-25" aria-label="Not filled yet" />
                    )}
                  </li>
                );
              })}
            </AnimatePresence>
          </ul>
        </div>

        <div className="border-t border-dashed border-ink/20 px-6 pb-7 pt-5 sm:px-8">
          <div
            className="h-9 w-full opacity-80 [background:repeating-linear-gradient(90deg,var(--color-ink)_0_2px,transparent_2px_5px,var(--color-ink)_5px_6px,transparent_6px_10px,var(--color-ink)_10px_13px,transparent_13px_16px)]"
            aria-hidden="true"
          />
          <button
            type="submit"
            form={formId}
            disabled={isSending}
            className="mt-5 hidden w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-4 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue lg:inline-flex"
          >
            {isSending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Opening WhatsApp…
              </>
            ) : (
              <>
                <MessageCircle className="h-4 w-4" /> Send this ticket on WhatsApp
              </>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isSent && (
          <motion.div
            initial={{ opacity: 0, scale: 2.2, rotate: -22 }}
            animate={{ opacity: 1, scale: 1, rotate: -12 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 220, damping: 14 }}
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-xl border-4 border-brand-green px-6 py-2 font-display text-4xl font-black uppercase tracking-widest text-brand-green"
            aria-hidden="true"
          >
            Sent ✓
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
