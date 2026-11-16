'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/** Routes where only the navbar is kept and the page fills the rest of the screen (no footer or floating buttons). */
const standaloneRoutePrefixes = ['/invitations'];

interface SiteChromeProps {
  children: ReactNode;
}

/**
 * Wraps the footer and floating buttons and hides them on full-screen routes.
 * The chrome itself stays server-rendered — only the visibility check runs on the client.
 */
export default function SiteChrome({ children }: SiteChromeProps) {
  const currentPath = usePathname();
  const isStandaloneRoute = standaloneRoutePrefixes.some(
    (prefix) => currentPath === prefix || currentPath.startsWith(`${prefix}/`),
  );

  if (isStandaloneRoute) return null;
  return <>{children}</>;
}
