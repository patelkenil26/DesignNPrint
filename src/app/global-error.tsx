'use client';

import { useEffect } from 'react';
import './globals.css';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/** Last-resort screen for errors in the root layout itself (it replaces the whole page, so it brings its own <html>). */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Root layout failed to render', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-ink px-5 text-center text-white">
        <div role="alert" className="max-w-md">
          <span className="cmyk-strip mx-auto block h-1.5 w-20 rounded-full" />
          <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Design N Print is taking a short break.</h1>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            Something went wrong while loading the page. Please try again in a moment.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-8 rounded-full bg-brand-yellow px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 active:scale-95"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
