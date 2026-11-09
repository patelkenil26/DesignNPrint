'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, ChevronDown, Ticket } from 'lucide-react';
import JobTicketPreview, { type TicketRow } from '@/components/sections/contact/JobTicketPreview';

interface MobileTicketBarProps {
  ticketNumber: string;
  rows: TicketRow[];
  progress: number;
  filledSteps: number;
  totalSteps: number;
  isSending: boolean;
  isSent: boolean;
  formId: string;
}

/**
 * Phones have no room for the ticket beside the form, so it rides along as a slim bar under the navbar:
 * ticket number, a progress strip and a "Preview" toggle that opens the full live ticket.
 */
export default function MobileTicketBar({ ticketNumber, rows, progress, filledSteps, totalSteps, isSending, isSent, formId }: MobileTicketBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-ink text-white shadow-xl">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls="mobile-ticket-panel"
        className="flex w-full items-center gap-3 px-5 py-3 text-left focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-brand-yellow"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-ink">
          {isSent ? <CheckCircle2 className="h-4 w-4" /> : <Ticket className="h-4 w-4" />}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60">{isSent ? 'Ticket sent' : 'Your job ticket'}</span>
          <span className="block font-display text-sm font-bold tabular-nums">{ticketNumber}</span>
        </span>
        <span className="flex shrink-0 flex-col items-end gap-1.5">
          <span className="text-xs font-semibold text-white/80">
            {filledSteps}/{totalSteps} filled
          </span>
          <span className="h-1.5 w-20 overflow-hidden rounded-full bg-white/20">
            <motion.span
              className="cmyk-strip block h-full rounded-full"
              initial={false}
              animate={{ width: `${Math.max(progress, 0.06) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>
        </span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-white/70 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="mobile-ticket-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="max-h-[calc(100svh-var(--nav-height)-5.5rem)] overflow-y-auto overscroll-contain bg-paper-deep px-4 py-4">
              <JobTicketPreview
                ticketNumber={ticketNumber}
                rows={rows}
                progress={progress}
                isSending={isSending}
                isSent={isSent}
                formId={formId}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
