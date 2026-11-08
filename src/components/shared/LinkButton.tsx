import React from 'react';
import Link from 'next/link';

type LinkButtonVariant = 'solid' | 'whatsapp' | 'outline' | 'light';

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: LinkButtonVariant;
  isExternal?: boolean;
  className?: string;
}

const variantClasses: Record<LinkButtonVariant, string> = {
  solid: 'bg-ink text-white hover:bg-ink-soft',
  whatsapp: 'bg-whatsapp text-ink hover:brightness-105',
  outline: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-white',
  light: 'bg-white text-ink hover:bg-paper',
};

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold tracking-wide ' +
  'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue';

/** Shared pill button for internal links (next/link) and external links (new tab). */
export default function LinkButton({ href, children, variant = 'solid', isExternal = false, className = '' }: LinkButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
