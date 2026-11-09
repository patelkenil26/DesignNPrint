"use client";

import { useSearchParams } from "next/navigation";
import { DEFAULT_WORDMARK_ID, wordmarkVariants } from "@/components/shared/Footer/wordmarks";

/**
 * Shows the footer's big wordmark. The default comes from DEFAULT_WORDMARK_ID; while comparing options,
 * add `?wm=<id>` to any page URL (e.g. `/about?wm=halftone`) to preview another one in the real footer.
 */
export default function FooterWordmark() {
  const searchParams = useSearchParams();
  const requestedId = searchParams.get("wm") ?? DEFAULT_WORDMARK_ID;
  const variant = wordmarkVariants.find((item) => item.id === requestedId) ?? wordmarkVariants[0];
  const Wordmark = variant.Component;

  return <Wordmark />;
}
