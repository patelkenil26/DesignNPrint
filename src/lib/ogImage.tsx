import { ImageResponse } from 'next/og';
import type { ProductAccent } from '@/data/productCatalog';
import { siteConfig } from '@/data/siteConfig';

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = 'image/png';

/**
 * `next/og` cannot read CSS variables, so these mirror the brand tokens in `src/app/globals.css`
 * (--color-ink, --color-paper, --color-brand-*). Update both places together.
 */
const ogTheme = {
  ink: '#101114',
  paper: '#f4f2ee',
  muted: '#6a6d75',
  red: '#e52421',
  yellow: '#ffd500',
  green: '#009b48',
  blue: '#00a0e3',
} as const;

const accentColour: Record<ProductAccent, string> = {
  red: ogTheme.red,
  yellow: ogTheme.yellow,
  green: ogTheme.green,
  blue: ogTheme.blue,
};

interface OgCardInput {
  eyebrow: string;
  title: string;
  subtitle?: string;
  accent?: ProductAccent;
}

/** 1200×630 branded share card — CMYK strip, big title, location footer. */
export function renderOgCard({ eyebrow, title, subtitle, accent = 'red' }: OgCardInput) {
  const titleSize = title.length > 34 ? 64 : title.length > 22 ? 78 : 92;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: ogTheme.paper,
          color: ogTheme.ink,
          padding: '64px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', height: 14, width: 220, borderRadius: 7, overflow: 'hidden' }}>
            <div style={{ flex: 1, background: ogTheme.blue }} />
            <div style={{ flex: 1, background: ogTheme.red }} />
            <div style={{ flex: 1, background: ogTheme.yellow }} />
            <div style={{ flex: 1, background: ogTheme.ink }} />
          </div>
          <div
            style={{
              marginTop: 40,
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: accentColour[accent] === ogTheme.yellow ? ogTheme.ink : accentColour[accent],
            }}
          >
            {eyebrow}
          </div>
          <div style={{ marginTop: 20, fontSize: titleSize, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            {title}
          </div>
          {subtitle ? (
            <div style={{ marginTop: 24, fontSize: 32, lineHeight: 1.3, color: ogTheme.muted, maxWidth: 900 }}>
              {subtitle}
            </div>
          ) : null}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 20, height: 56, background: accentColour[accent], borderRadius: 6, marginRight: 20 }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 38, fontWeight: 800 }}>{siteConfig.name}</div>
              <div style={{ fontSize: 24, color: ogTheme.muted }}>
                {`${siteConfig.location} · Since ${siteConfig.foundedYear}`}
              </div>
            </div>
          </div>
          <div style={{ fontSize: 26, fontWeight: 600, color: ogTheme.muted }}>
            {siteConfig.siteUrl.replace('https://', '')}
          </div>
        </div>
      </div>
    ),
    ogImageSize,
  );
}
