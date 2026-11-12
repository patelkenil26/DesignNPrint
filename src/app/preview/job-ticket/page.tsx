import type { Metadata } from 'next';
import SmoothScrollProvider from '@/components/shared/SmoothScrollProvider';
import JobTicket from '@/components/sections/home/JobTicket';
import JobTicketStack from '@/components/sections/home/JobTicketStack';

export const metadata: Metadata = { title: 'Job ticket — compare versions', robots: { index: false, follow: false } };

/** Internal page: both "How a job moves" versions one after the other, to pick one for the home page. */
export default function JobTicketComparePage() {
  return (
    <SmoothScrollProvider>
      <p className="bg-ink px-5 py-3 text-center font-mono text-xs font-bold uppercase tracking-widest text-white">Version A — pinned printing ticket</p>
      <JobTicket />
      <p className="bg-ink px-5 py-3 text-center font-mono text-xs font-bold uppercase tracking-widest text-white">Version B — stacking tickets</p>
      <JobTicketStack />
    </SmoothScrollProvider>
  );
}
