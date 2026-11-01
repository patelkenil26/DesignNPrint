/**
 * Central Theme Colors Configuration
 * 
 * NOTE: CSS variables are defined in `src/app/globals.css`.
 * Any theme updates should primarily be made in `src/app/globals.css` :root.
 * 
 * This file provides TypeScript constants and variable mappings for use in
 * JavaScript/TypeScript code, Framer Motion props, dynamic inline styles, or canvas utilities.
 */

export const colors = {
  primary: {
    DEFAULT: "var(--color-brand-primary)",
    dark: "var(--color-brand-primary-dark)",
    surface: "var(--color-brand-surface-dark)",
  },
  accent: {
    DEFAULT: "var(--color-brand-accent)",
    hover: "var(--color-brand-accent-hover)",
    light: "var(--color-brand-accent-light)",
  },
  secondary: {
    DEFAULT: "var(--color-brand-secondary)",
    hover: "var(--color-brand-secondary-hover)",
    bg: "var(--color-brand-secondary-bg)",
  },
  surface: {
    DEFAULT: "var(--color-brand-bg)",
    light: "var(--color-brand-surface-light)",
    muted: "var(--color-brand-surface-muted)",
    dark: "var(--color-brand-surface-dark)",
    card: "var(--color-brand-surface-card)",
  },
  text: {
    main: "var(--color-brand-text)",
    subtle: "var(--color-brand-text-subtle)",
    muted: "var(--color-brand-text-muted)",
    light: "var(--color-brand-text-light)",
    lightMuted: "var(--color-brand-text-light-muted)",
  },
  border: {
    subtle: "var(--color-brand-border-subtle)",
    dark: "var(--color-brand-border-dark)",
  },
  whatsapp: {
    DEFAULT: "var(--color-brand-whatsapp)",
    hover: "var(--color-brand-whatsapp-hover)",
  },
} as const;

export type ThemeColors = typeof colors;
