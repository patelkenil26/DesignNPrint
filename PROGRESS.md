# DesignNPrint — Progress Log

> **For Claude (new chat):** read this file first. It records what is built, every decision and opinion the user has given, what was rejected, and what is pending.
> **Rule:** after finishing every task, append a short entry to the "Work log" at the bottom and update "Branches" / "Pending" if they changed.
> The user speaks Hinglish and is the developer; the client is a printing press in Ahmedabad (Design N Print) who wants a premium, "real-feeling" 3D animated site.

## Project
Next.js (App Router) website. Stack: Next.js, React 19, Tailwind v4 (tokens in `src/app/globals.css`), three.js / @react-three/fiber / drei, framer-motion, Lenis. GSAP is installed but unused. Project rules are in `CLAUDE.md` (colours only from CSS tokens, mobile-first, `"use client"` only at leaves, data in `src/data`, `dynamic()` for 3D, etc.).

## User working preferences (important)
- **Verify visual/3D work yourself** with screenshots (puppeteer-core + headless Chrome). `tsc --noEmit` and eslint must be clean. (Earlier "don't run builds" rule was reversed.)
- **Do not commit unless asked.** Do not implement until the user says "start" when they are only discussing; they like to read options first and verify, then say implement.
- When the user asks for ideas, give a few options with a recommendation, not an essay. Keep replies in Hinglish.
- Layout rule for Category Stories: **text left, product/image right** in every chapter. Alternating left/right was tried and rejected.
- The client already loved: the **hero box (card → box fold)**, **"What we print" ring** and **"Inside the press"**. Do not break those on existing branches.
- The client wants **maximum real 3D**, premium, smooth, not cartoonish.
- Taste feedback so far: rejected "balloon-like colour blobs" (cartoon), rejected "liquid ink pour" (looked like smoke/clouds), rejected generic ideas (CMYK plates, pantone fan, designer's desk, etc. felt "generic"). The user wants something **unique** and in the same premium studio language as the Category Stories (clean studio, real-looking 3D products, camera, big typography), and the hero must show **design + printing** at first glance. The existing "Inside the press" section already covers the printing machine, so the hero must not repeat it.
- Environment: a dev server for this project already runs on **port 3000** (serves whichever branch is checked out). Starting another on 3001 fails ("another next dev server is already running"). `MSYS_NO_PATHCONV=1` is needed for route args in Git Bash. No Python on this machine (use node). Big heredocs in Bash sometimes fail — use the Write tool.

## Branches
| Branch | State |
|---|---|
| `uat` | Base: CMYK Studio theme, 7-section 3D home, category-driven Services/About/Contact. |
| `feat/category-stories-depth-tunnel` | Category Stories as a depth tunnel (camera flies through 6 rooms, reflective floors), commit `9d8e790`. |
| `feat/category-stories-camera-journey` | Category Stories as one continuous studio, different camera shot per category, colour flood, big letter-rise typography, commit `7fac5f4` (Phase A). Also holds the press-reveal fix `e15f0fd`. |
| `feat/home-v2-color-burst-hero` | **Current work**: new home structure + new cursor-design hero (see below). Created from `uat`. **All work is UNCOMMITTED** (including this file). |
| `main`, `backup-before-revert` | Older. |

- The client will choose between depth-tunnel and camera-journey for the 6 Category Stories; **the user will tell me when to merge the chosen one** (do not merge before).
- The press-reveal fix (`PressProcess.tsx`, `PressScene.tsx`, commit `e15f0fd`) is only on the camera-journey branch; if the tunnel is chosen, cherry-pick it.
- `feat/home-v2-color-burst-hero` was meant as the branch for the **new home structure** ("home v2"). The branch name still says color-burst (history of attempts); rename if desired.

## What is built (on uat)
**Theme "CMYK Studio"**: tokens in `globals.css` (ink, paper, paper-deep, brand red/yellow/green/blue, foil, whatsapp, `--nav-height`), `.bg-studio`, `.cmyk-strip`, animations (fade-up, float-slow, marquee).

**Home (7 sections the client approved, + Category Stories)**: HeroJourney (card folds into a box), ProductShowcase/ProductRingScene, CategoryStories, FinishesLab, PressProcess/PressScene, IndustriesSection, ProofSection (placeholder reviews/stats — client must confirm), QuoteCta (3D box + WhatsApp). Shared scroll pattern: `useScrollTrack` (progress read from the DOM) + damped value per frame; `StageCanvas` (renders only when visible, transparent canvas, studio lighting).

**Category Stories** (`CategoryStories.tsx`, `CategoryStoriesScene.tsx`, `three/stories/*`): 6 chapters: Stickers & Labels (aluminium can + label + stickers; **bottle and can are treated as the same thing**), Cards & Stationery, Brochures/Flyers, Boxes & Packaging (horizontal + vertical box that open), Files & Folders, Pouches & Display. Textures painted procedurally on canvas (`canvasKit.ts`, `boxTextures.ts`, `finishTextures.ts`, `storyTextures.ts`); brand colours read from CSS tokens (`readBrandPalette`).

**Data-driven pages**: `src/data/categories.ts` (6 categories + sub-categories), `serviceCatalog.ts` (20 services), `homeData.ts`, `siteConfig.ts` (real contact data), `aboutData.ts`. Services: `/services`, `/services/all`, `/services/[category]`, `/services/[category]/[service]` (old routes removed; site not indexed yet so URLs may change). About and Contact redone in the new theme. Navbar mega menu + mobile accordion + search; Footer updated.

## HOME V2 — the user's plan (current work, in their words, summarised)
1. New branch from `uat` for a **new home structure**. The Category Stories "wow" section stays, but **sections get re-ordered up/down** so the home page flows well. Existing branches/sections must not be broken.
2. **The old card → box hero (HeroJourney) must not be broken** — the client now wants it shown **in the Boxes category** (so the full box-forming animation is visible there), and the **hero becomes something new**. `HeroJourney.tsx` / `JourneyScene.tsx` are kept in the repo, currently unused on this branch.
3. **New hero idea evolution**: (a) colours flying in, then objects, then colours fall on objects → built, REJECTED (cartoonish balloons); (b) coffee/Thums-Up-like liquid colour → built as ink pour, REJECTED (smoke-like); (c) final idea from the user, which is **implemented**: *a multiplayer-cursors hero*: many cursors (Figma-style, **no name tags**, only cursors) fly onto the screen and **design the main products in the UI**, then **colour is added by cursors too**. 3D, smooth, premium.
4. Hero details the user decided: **8–10 products**; the sequence runs **automatically over ~8–10 s**; **if the user scrolls** (e.g. after 2–3 s) the animation should follow the scroll instead; i.e. it must work both ways.
5. After the hero, the next step is a **second Category Stories block with 6 new categories**, placed **after another section** (not mixed with the first 6), using a **third, new animation style** (client then picks among 3 styles). The user said: "first finish the hero, we'll do the 6 categories after".

## Hero implementation (done, uncommitted, verified by screenshots on desktop 1440px and mobile 390px; tsc + eslint clean)
Files: `src/components/sections/home/CursorDesignHero.tsx` (section, 190vh track + sticky stage, dot-grid background from tokens, copy from `journeyChapters[0]`), `src/components/three/CursorDesignScene.tsx` (scene), `src/components/three/hero/{heroObjects,heroArt,revealMaterial,designSchedule,heroOverlays}.ts`, `src/data/heroLayout.ts` (slot positions, desktop + mobile), `src/app/page.tsx` (uses `CursorDesignHero` as the first section).
- **Sequence**: 5 "designer" cursors draw each product into existence (blueprint edges + grey clay, left→right front, with a Figma-style selection box + corner handles), then 4 "colourist" cursors paint it with real print colours (top→bottom). Cursors fly on curved paths (ease + arc), enter from off-screen, idle with a gentle drift. Timing lives in `designSchedule.ts` (`BUILD_DURATION`, `PAINT_DURATION`, windows start at 1.0 s / 3.3 s; total ≈ 10 s). Shader patch in `revealMaterial.ts` (`uBuild`, `uReveal`).
- **Auto + scroll**: timeline time = `damp(max(autoSeconds, scrollProgress * totalSeconds))`; scrolling can only push it forward. Section is 190vh so ~90vh of pinned scroll; after completion the page continues normally. `prefers-reduced-motion` jumps to the final state.
- **10 products (desktop)**: box, bottle label (bottle), brochure, visiting card, pouch, file, pamphlet/flyer, sticker, acrylic board, flex banner. **Mobile shows the first 6** (box, bottle, brochure, card, pouch, file) in a grid under the copy.
- Not done / ideas: cursor **trails**; user's own cursor acting as a designer at the end; click ripples. Real-browser speed check is needed (screenshots were taken with a slowed clock because headless Chrome is slow).
- Screenshot method: scratchpad scripts `timeline.mjs` (frames after load), `slow.mjs` (same but `performance.now` slowed 5× to catch mid-animation states), `scrolltest.mjs`; run with node against `http://localhost:3000`.

## Product lists the user gave (for later reference)
- **First list (14)**: visiting card, brochure, pamphlet/flyer, bottle, letterhead, envelope, sticker, file, box, book, challan/bill book, label, pouch (as per Madhur — Madhur Sugar's stand-up pouch style, reference), BOPP bag.
- **Final list (17)**: 1 visiting card, 2 brochure, 3 pamphlet/flyer, 4 bottle label, 5 letterhead, 6 envelope, 7 sticker, 8 file, 9 box, 10 book, 11 challan/bill book, 12 pouch, 13 BOPP bag, 14 corrugated box, 15 rigid box, 16 acrylic board, 17 flex banner.
- **Hero uses 10** of them (above). The remaining 7 (letterhead, envelope, book, bill book, BOPP bag, corrugated box, rigid box) are kept for later sections. Builders for letterhead, envelope, book, bill book, BOPP bag, calendar, hang tag, tape, carry bag, can, label roll already exist in `heroObjects.ts` (unused by the hero) and can be reused.

## Second Category Stories block (NOT started — waiting for the user to say start)
- The user wants **6 new categories**, animated in a **third new style**, shown **after another section** (not mixed with the first 6). They said categories may come from the 14/17-item list **or from the existing service/category list**, and that already-built items still count (do not skip something just because it exists as a model).
- Current 6 (done): Stickers & Labels, Cards & Stationery, Brochures/Flyers, Boxes & Packaging, Files & Folders, Pouches & Display.
- My last suggestion for the new 6 (needs user confirmation): **Letterhead + Envelope, Book/Booklet, Challan/Bill book, BOPP bag, Corrugated box, Rigid box** (earlier I also suggested Calendar). Corrugated/rigid are box types → could also live in the Boxes chapter.
- On the home, the first 6 appear first; the next 6 come after another section so the two blocks do not mix.

## Pending / open items
- Client decision: depth tunnel vs camera journey (then merge the chosen one into `uat` — only when the user says).
- Home v2 re-ordering of sections and moving the old box-fold hero into the Boxes category — **not done yet**.
- Camera journey Phase B (making-of animations per category) and Phase C (hotspots, lighter mobile version) — only if asked.
- Category Stories scroll length is ~1000vh (10 screens); not decided whether to shorten.
- Camera-journey cards chapter: product briefly leaves the frame mid-flight.
- Mobile checks not done for the Category Stories camera journey and the new pages.
- Contact map iframe did not render in headless Chrome; check in a real browser.
- ProofSection placeholder reviews/stats need client confirmation.
- Everything on `feat/home-v2-color-burst-hero` (including this file) is uncommitted.

## Work log (newest last)
- Redesign analysis, theme and 7-section home built; client approved.
- Category architecture, services/about/contact pages built.
- Category Stories 3D upgrade (can, cards, brochure, boxes, folder, pouch).
- Press section reveals the printed sheet after the 4th unit.
- Depth-tunnel version committed on `feat/category-stories-depth-tunnel`.
- Camera-journey Phase A committed on `feat/category-stories-camera-journey`; press-reveal fix committed there as `e15f0fd`.
- Created this PROGRESS.md.
- Home v2: branch `feat/home-v2-color-burst-hero` created from `uat`. Tried and discarded two hero concepts (colour blobs; ink pour). Implemented the multiplayer-cursor design hero (details above); verified desktop, mobile and scroll behaviour.
- Updated this file with all of the user's thoughts and decisions (so a new chat has the full context).
- Hero premium pass (uncommitted): cursors ~2x smaller and 12 on desktop / 8 on mobile (2 cursors per product, `lane` in `designSchedule.ts`); cursors fly off and vanish after their last task (`EXIT_DELAY`/`EXIT_SECONDS`); comet trails (`createCursorTrails`) + soft floating drop shadows (`createSoftShadow`) + "pop" on paint complete + stronger pointer parallax in `CursorDesignScene.tsx`; headline + body are now written word-by-word by a small cursor (`src/components/shared/CursorWriteText.tsx`), buttons fade in after; richer CMYK light-pool + vignette background in `CursorDesignHero.tsx`. tsc (src) + eslint clean; desktop 1440 and mobile 390 screenshot-verified (cursors gone at the end).
- Hero realism pass (uncommitted): user said hero still looked cartoonish and asked to replace the bottle with a can. Causes found: flat primary-colour clip-art artwork, uniform rough "clay" materials, sharp-edged geometry, simple lathe bottle. Fixes: bottle removed → realistic printed aluminium **can** (`buildCan`, shares `stories/canProfile.ts` with `CanStory.tsx`; hero slot id is now `can`); `heroArt.ts` rewritten (gradients, foil logo/borders, hairlines, real typography, photo block, ring-text sticker, can wrap at 2048px; yellow stock prints in ink); paper materials now MeshPhysical with grain bump + lamination clearcoat + sheen (`art.grain`); box uses `RoundedBoxGeometry` with ivory interior; pouch is glossy metallised film. tsc/eslint clean; desktop + mobile screenshot-verified.
- Hero "ultra" pass 3 (uncommitted): each product now does a full 360° turntable spin from its build start to its paint end (`spin` in `CursorDesignScene.tsx`); real cast shadows (VSM, soft) of finished products onto a backdrop `shadowMaterial` wall (`StageCanvas` got a `shadows` prop, `StudioLighting` got `stripLights`); travelling glint point light; real reflective foil via metalness/roughness masks (`art.makeFoil`, `maskMode` in `heroArt.ts`, `foilPrint()` in `heroObjects.ts`); can has condensation bump (`art.dew`); box interior no longer grey (emissive ivory); glass name tags (drei `Html`) appear under each product after it is coloured (desktop only; labels come from `heroObjects.ts`). tsc/eslint clean, desktop + mobile screenshot-verified. Not done / ideas: post-processing (bloom/DOF) needs `@react-three/postprocessing` (not installed — ask before adding); clicking a tag → category page.
- Installed `@react-three/postprocessing` (user approved) for bloom / depth-of-field / vignette in the hero — NOT used yet. User also asked (discussion only, do not implement until they say so): reduce the 10 hero products to fewer, but each premium and well animated. My recommendation: 6 products = the 6 category stories (can, visiting card, brochure, box, file, pouch).
- Hero reduced to **6 products** (user approved): box, can, visiting card, brochure, file, pouch = the 6 Category Stories (`heroLayout.ts`; desktop bigger, mobile = same 6). Schedule: one "moment" per product (`MOMENT_SPACING` 1.25 s, `designSchedule.ts`), 12 cursors, ~11 s total. Camera now dollies/pans toward the product being made (weights over each product's moment, in `CursorDesignScene.tsx`). Post-processing added via `@react-three/postprocessing`: Bloom + ACES ToneMapping + Vignette. **DepthOfField was tried and removed: it turns the transparent canvas black.** If DOF is ever wanted, the studio background must be rendered inside the scene (opaque canvas) first. Dropped products (sticker, flyer, acrylic board, flex banner) still have builders in `heroObjects.ts` for later sections. tsc/eslint clean; desktop + mobile verified.
