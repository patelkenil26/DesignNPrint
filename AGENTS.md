<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


# DesignNPrint Project Rules

## 1. Global Theming and Colors (CSS Variables)
- **Centralized Design System:** All primary colors, background colors, and theme-related values MUST be defined centrally in `src/app/globals.css` (using CSS variables or Tailwind's theme configuration).
- **Avoid Hardcoding:** Do not hardcode hex codes or arbitrary colors directly in component files. Reference the global CSS variables so that any future theme updates apply across the entire application instantly.

## 2. Responsive Design First
- **Mobile First Approach:** Always ensure that any new component or layout is fully responsive.
- **Tailwind Breakpoints:** Use Tailwind's built-in responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`) rigorously to adapt designs for mobile, tablet, and desktop screens seamlessly.

## 3. Strict Folder Structure Maintenance
- **Adhere to Architecture:** Always follow the existing project folder structure (`src/components/sections`, `src/components/shared`, `src/app`, `src/data`).
- **Organization:** Do not scatter files. Keep assets in `/public`, data constants in `src/data/`, and encapsulate logic properly.

## 4. Next.js App Router Best Practices
- **Server Components Default:** Default to using Server Components for better SEO and performance.
- **"use client" Directive:** Use `"use client"` ONLY at the leaf component level where interactivity (like `useState`, `useEffect`, or `framer-motion`) is strictly required.
- **Optimized Assets:** Always use `next/image` (`<Image />`) for images and `next/link` (`<Link>`) for internal routing instead of traditional `<img>` and `<a>` tags.

## 5. Modular and Reusable Components
- **DRY Principle (Don't Repeat Yourself):** Keep components small and focused on a single responsibility.
- **Shared UI:** If a component (like a Button, Input, or Modal) is used in multiple places, place it in `src/components/shared/` or `src/components/ui/` and reuse it.

## 6. Accessibility (a11y) & SEO
- **Semantic HTML:** Use proper HTML tags (`<nav>`, `<main>`, `<section>`, `<article>`).
- **Alt Text:** Every single image must have a descriptive `alt` attribute.
- **Metadata:** Ensure dynamic pages (`app/services/[id]/page.tsx`) have proper SEO metadata implemented using Next.js `generateMetadata`.

## 7. Developer Rules (Code Quality & Maintenance)
- **Descriptive Naming Conventions:** Variables and functions must be descriptive. (e.g., use `handleContactSubmit` instead of just `submit`).
- **Error Handling:** Avoid silent failures. Use `try-catch` blocks for complex logic and API calls. 
- **Type Safety:** Minimize the use of `any` type. Define interfaces for complex objects.
- **Lazy Loading:** For heavy components (like 3D animations or complex sliders), use Next.js `dynamic()` imports to speed up initial load times.
- **No Hardcoded Data:** Content that is prone to changes (like list of services or config) should reside in data files (`src/data/`), not directly inside JSX.

## 8. User Experience Rules (UI / UX)
- **Loading States & Feedback:** Whenever an asynchronous action runs (e.g., submitting a form), the button must show a loading state to prevent double clicks. Provide success or error toasts.
- **Micro-Interactions:** Interactive elements (buttons, links) must have clear hover and active states (like subtle scaling or color shifts) to make the app feel alive.
- **Smooth Transitions:** Page navigation and anchor links should scroll smoothly without abrupt jumps.
- **Image Fallbacks:** Provide a placeholder state or fallback for images in case they fail to load.
- **Readable Typography & Contrast:** Ensure that text has high contrast against its background and is easily readable on all screen sizes.
