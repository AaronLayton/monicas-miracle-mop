---
phase: 01-foundation-design-conversion
plan: "07"
subsystem: pages/localisation
tags: [terms, uk-localisation, gbp, uk-english, lucide, local-images]
dependency-graph:
  requires: ["01-03", "01-04", "01-05", "01-06"]
  provides: ["app/terms/page.tsx", "uk-localisation-verified"]
  affects: ["all pages"]
tech-stack:
  added: []
  patterns: ["Server Component with metadata", "semantic HTML article/section/h2"]
key-files:
  created:
    - app/terms/page.tsx
  modified:
    - app/page.tsx (restored from 01-03 git history, was overwritten by default template)
decisions:
  - Add-on prices on services page (£45 oven, £30 fridge, etc.) retained as per plan spec even though flyer shows different add-on categories (Busy Parent Add-Ons)
  - next/font/google import in layout.tsx retained as it is a Next.js built-in font system, not a Google CDN dependency
metrics:
  duration: "~20 minutes"
  completed: "2026-04-11"
  tasks-completed: 2
  tasks-total: 2
  files-created: 1
  files-modified: 1
---

# Phase 01 Plan 07: Terms & Conditions and UK Localisation Summary

**One-liner:** Terms & Conditions page created from Kasey's actual policy (terms.jpg), and a full UK localisation sweep confirmed GBP pricing, UK English, local images, and Lucide icons across all pages.

## Tasks Completed

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Create Terms and Conditions page | b66d87e | app/terms/page.tsx |
| 2 | UK localisation and image/icon sweep | 08517b8 | app/page.tsx (restored), all pages verified |

## What Was Built

### Task 1: Terms & Conditions Page

Created `app/terms/page.tsx` as a Server Component with full content transcribed from `docs/kasey-generated-flyers/terms.jpg`.

Sections included:
- **Service Agreement** — Standard Clean (£20/hr), Deep Clean (£100–£200), Move-In/Out (£150)
- **Pricing & Payment** — Day of clean, bank transfer or cash, no deposit required
- **Cancellation Policy** — 24hr+ free, under 24hr = 50% fee, locked out = 100% fee
- **Rescheduling** — 24hr notice required
- **Access & Keys** — Key or person present required; 15-min phone consultation noted
- **Liability & Insurance** — Fully insured, secure valuables, secure pets
- **Contact** — monicasmiraclemop@gmail.com

The footer already had the `/terms` link in the Company column (from plan 01-02).

### Task 2: UK Localisation Sweep

Systematically verified all pages and shared components:

**GBP Pricing (UK-01):** All prices in GBP matching Kasey's flyer:
- Homepage: £20, £100–£200, £150
- Services: £20/hr, £100, £150, £45, £30, £30, £25, £25, £40

**UK English (UK-02):** No US spellings found in user-visible copy. All occurrences of "color" are in CSS class names (e.g. `transition-colors`) — not user-facing text — so correctly left unchanged.

**Image Sources (DSGN-08):** No Google-hosted or external image URLs in any page. All images use local `/images/` paths (`/images/hero-clean-home.jpg`, `/images/professional-cleaner.jpg`) via Next.js `Image` component.

**Icon Sources (DSGN-09):** No Material Symbols or Material Icons references. All icons are Lucide imports.

**Build:** `npm run build` passed cleanly — 13 static pages generated including `/terms`.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocker] Restored homepage and assets that were overwritten**
- **Found during:** Task 2
- **Issue:** `app/page.tsx` was the default Next.js template (from `create-next-app`), not the homepage built in plan 01-03. Planning files and public assets (logo, hero images) had been staged as deletions by the `git reset --soft` worktree setup step.
- **Fix:** Restored `app/page.tsx` from the plan 01-03 commit (`40f2ef8`) using `git show`. Restored planning files and public assets from the target commit (`9270ae4`) using `git checkout`.
- **Files modified:** `app/page.tsx`, `.planning/phases/01-foundation-design-conversion/`, `public/images/`, `public/logo.png`
- **Commits:** b66d87e, 08517b8

## Self-Check

### Files exist:
- [x] `app/terms/page.tsx` — created, contains Terms heading, Cancellation section, Payment section, £ prices, metadata, UK English
- [x] `app/page.tsx` — restored with full homepage content using local images

### Commits exist:
- [x] b66d87e — feat(01-07): create Terms & Conditions page
- [x] 08517b8 — feat(01-07): UK localisation and image/icon sweep

### Build: PASSED — 13 static routes including /terms

## Self-Check: PASSED
