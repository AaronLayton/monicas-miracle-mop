---
phase: 01-foundation-design-conversion
plan: 03
subsystem: homepage
tags: [homepage, server-component, pricing, hero, testimonials, tailwind, shadcn]
dependency_graph:
  requires: ["01-02"]
  provides: ["homepage-page-tsx", "stub-route-pages"]
  affects: ["app/page.tsx", "components/footer.tsx", "components/nav.tsx", "components/mobile-nav-toggle.tsx"]
tech_stack:
  added: []
  patterns:
    - "Server Component homepage with no use client directive"
    - "next/image with fill prop for responsive hero photos"
    - "Route type annotation for typedRoutes compatibility"
    - "glass-card utility class for stat bubbles and trust overlays"
    - "shadcn Card/Badge/Button primitives for pricing cards"
key_files:
  created:
    - app/page.tsx
    - app/services/page.tsx
    - app/schedule/page.tsx
    - app/checkout/page.tsx
    - app/about/page.tsx
    - app/areas/page.tsx
    - app/contact/page.tsx
    - app/faq/page.tsx
    - app/privacy/page.tsx
    - app/terms/page.tsx
    - public/images/hero-clean-home.jpg
    - public/images/professional-cleaner.jpg
  modified:
    - components/footer.tsx
    - components/mobile-nav-toggle.tsx
    - components/nav.tsx
decisions:
  - "Stub route pages created for all nav/footer hrefs to satisfy typedRoutes: true TypeScript requirement"
  - "Route type imported from 'next' and applied to all link-array definitions in nav components"
  - "All 5 homepage sections written as sub-components in a single file for clarity at this stage"
metrics:
  duration_minutes: 35
  tasks_completed: 2
  files_created: 12
  files_modified: 3
  completed_date: "2026-04-11"
---

# Phase 01 Plan 03: Homepage Conversion Summary

**One-liner:** Full homepage converted from design-3 HTML to Next.js Server Component with hero, GBP pricing cards, Monica Difference stats, testimonials, and CTA — using shadcn Card/Badge/Button primitives and glass-card utilities.

## Tasks Completed

| Task | Description | Commit |
|------|-------------|--------|
| 1 | Hero section + 3 pricing cards (Standard £20/hr, Deep £100-£200, Move-In/Out £150+) | 60e769a |
| 2 | Monica Difference stats, testimonials, bottom CTA section | 60e769a |
| Deviation fix | Route type annotations in nav/footer/mobile-nav for typedRoutes | ede5514 |

## What Was Built

### Hero Section
- Full-width section with decorative blur blobs in primary/accent colours
- Large heading: "Sparkling Homes, Stress-Free Living" with italic secondary-coloured emphasis
- Subheading describing professional domestic cleaning in UK English
- Two CTA links: "Book Your Clean" (filled, rounded-full) and "View Services" (outlined)
- Right column: `next/image` with `fill` prop in a rounded-3xl container, hover rotation effect
- Glass-card trust bubble at image bottom: "Trusted by 500+ local families"

### Pricing Cards Section
- 3-column responsive grid (`grid-cols-1 md:grid-cols-3`)
- Each card uses shadcn `Card` with `CardHeader`, `CardContent`, `CardFooter`
- Lucide icons: `Home` (Standard), `Sparkles` (Deep), `Truck` (Move-In/Out)
- Standard Clean: £20/hr — featured card with `ring-1` border style
- Deep Clean: £100–£200 — featured (scale-105, `bg-[--primary-container]`, white text), Badge "Most Popular"
- Move-In/Out: £150+ — standard style matching design-3
- All prices in GBP (£), all copy in UK English

### Monica Difference Section
- 2-column layout: circular image (professional-cleaner.jpg) with floating 100% satisfaction glass bubble
- 4 stat bubbles in a 2x4 responsive grid using `glass-card` class: 100% Satisfaction, DBS Checked, Eco Friendly, No Deposit
- 3 feature bullet points with icon+text layout and hover rotation: Vetted Professional, Eco-Friendly Products, Satisfaction Guaranteed
- Lucide icons: `ShieldCheck`, `Award`, `Leaf`

### Testimonials Section
- Light purple background (`bg-[--primary-soft]/40`) matching design-3 tonal palette
- 3 testimonial cards using shadcn `Card` with 5-star rating (`Star` icon, `fill-secondary`)
- Customer initials avatar, name, and role
- UK-adapted testimonial copy (busy parent, deposit-back scenario)

### Bottom CTA Section
- Full-width rounded-[3rem] block with `bg-primary` (deep purple)
- Decorative blur blobs for depth
- Large heading + subheading encouraging booking
- Two CTA links: "Book Your Clean Now" (accent/teal) and "View Services" (white/glass)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] typedRoutes TypeScript errors in footer/nav/mobile-nav**
- **Found during:** Task 2 build verification (`npm run build`)
- **Issue:** `typedRoutes: true` in `next.config.ts` causes TypeScript to reject `string`-typed `href` props on Link components when the route doesn't exist. The nav/footer components from plan 01-02 referenced `/services`, `/schedule`, `/checkout`, `/about`, `/areas`, `/contact`, `/faq`, `/privacy`, `/terms` — none of which had page files yet.
- **Fix (part 1):** Created stub `page.tsx` files for all 9 missing routes so TypeScript's route registry includes them.
- **Fix (part 2):** Added `import type { Route } from "next"` and typed all link arrays as `{ href: Route; label: string }[]` in `footer.tsx`, `mobile-nav-toggle.tsx`, and `nav.tsx`.
- **Files modified:** `components/footer.tsx`, `components/mobile-nav-toggle.tsx`, `components/nav.tsx`
- **New files:** `app/services/page.tsx`, `app/schedule/page.tsx`, `app/checkout/page.tsx`, `app/about/page.tsx`, `app/areas/page.tsx`, `app/contact/page.tsx`, `app/faq/page.tsx`, `app/privacy/page.tsx`, `app/terms/page.tsx`
- **Commit:** ede5514

## Self-Check: PASSED

- app/page.tsx: FOUND
- public/images/hero-clean-home.jpg: FOUND
- public/images/professional-cleaner.jpg: FOUND
- .planning/phases/01-foundation-design-conversion/01-03-SUMMARY.md: FOUND
- Commit 60e769a: FOUND
- Commit ede5514: FOUND
