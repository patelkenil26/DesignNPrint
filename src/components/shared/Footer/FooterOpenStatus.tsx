"use client";

import { useBusinessStatus } from "@/lib/useBusinessStatus";

/** Live "open now / closed" line for the footer contact column. */
export default function FooterOpenStatus() {
  const status = useBusinessStatus();

  return (
    <p className="mt-3 flex items-center gap-2 text-xs font-medium text-white/80" role="status">
      <span
        className={`h-2 w-2 shrink-0 rounded-full ${status?.isOpen ? "bg-whatsapp" : "bg-white/30"}`}
        aria-hidden="true"
      />
      {status ? status.statusText : "Checking hours…"}
    </p>
  );
}
