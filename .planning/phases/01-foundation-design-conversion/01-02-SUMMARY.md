---
phase: 01-foundation-design-conversion
plan: 02
subsystem: shared-layout
tags: [nav, footer, layout, glassmorphism, shadcn, server-components]
dependency_graph:
  requires: [01-01]
  provides: [shared-nav, shared-footer, root-layout-chrome]
  affects: [all-pages]
tech_stack:
  added: []
  patterns: [server-component-first, client-component-island, next-image, next-link, shadcn-separator]
key_files:
  created:
    - components/nav.tsx
    - components/mobile-nav-toggle.tsx
    - components/footer.tsx
    - public/logo.png
  modified:
    - app/layout.tsx
decisions:
  - Nav is a Server Component; only mobile toggle is a Client Component island (useState)
  - Book Now CTA links to /services as the entry point for the booking flow
  - Footer logo uses brightness-0 invert filter to render white on dark background
  - Copyright year kept as 2024 to match design-3 HTML (update on launch)
metrics:
  duration: 20m
  completed: 2026-04-11T10:40:55Z
  tasks_completed: 2
  files_created: 4
  files_modified: 1
---

# Phase 1 Plan 2: Shared Nav and Footer Summary

Shared navigation and footer components extracted from design-3 HTML and wired into the root layout, providing consistent chrome across all pages. Nav uses glassmorphism, logo, 4 nav links, a Book Now CTA, and a client-side mobile hamburger toggle. Footer uses a dark 4-column grid layout with UK English copy.

## Tasks Completed

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Create shared Nav component | b126041 | components/nav.tsx, components/mobile-nav-toggle.tsx, public/logo.png |
| 2 | Create Footer and wire into layout | 5d9f0af | components/footer.tsx, app/layout.tsx |

## What Was Built

### Nav (`components/nav.tsx`)
- Server Component (no `"use client"`) with `data-slot="nav"`
- Fixed/sticky top bar with `glass-card-nav` glassmorphism effect (white/85% + 20px blur)
- Logo: `next/image` of `public/logo.png` with Monica's Miracle Mop italic text
- Desktop links: Home (`/`), Services (`/services`), Schedule (`/schedule`), Checkout (`/checkout`)
- Book Now CTA: `bg-[--primary-container]` (#6a359c purple), rounded-full, white text, links to `/services`
- Responsive: desktop links hidden on mobile, mobile toggle shown instead

### Mobile Nav Toggle (`components/mobile-nav-toggle.tsx`)
- Client Component (`"use client"`) with `useState` for open/close
- Hamburger icon: Lucide `Menu`; close icon: Lucide `X`
- Dropdown renders below nav with same 4 links + Book Now stacked vertically
- Accessible: `aria-expanded`, `aria-label` on toggle button

### Footer (`components/footer.tsx`)
- Server Component with `data-slot="footer"`
- Dark `bg-foreground` background (#191c1f) with `text-background` (white) text
- 4-column grid (col-span-2 on mobile, 4-col on `md`):
  - Brand: logo (white via invert filter) + tagline
  - Services: Standard Clean, Deep Clean, Move-In/Out Clean (all link to `/services`)
  - Company: About, Terms & Conditions (`/terms`), Privacy Policy
  - Support: Contact, FAQ, Service Areas
- `Separator` from shadcn/ui above copyright bar
- Copyright: "© 2024 Monica's Miracle Mop. All rights reserved."

### Root Layout (`app/layout.tsx`)
- Imports and renders `<Nav />` before `{children}` and `<Footer />` after
- `<main className="flex-1">` ensures footer sticks to bottom on short pages

## Verification

- `npm run build` passes with zero TypeScript or compilation errors
- All 10 acceptance criteria for Task 1 pass
- All 9 acceptance criteria for Task 2 pass
- nav.tsx: 79 lines (min 40 required)
- footer.tsx: 120 lines (min 30 required)

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- `components/nav.tsx`: EXISTS (79 lines)
- `components/mobile-nav-toggle.tsx`: EXISTS (61 lines)
- `components/footer.tsx`: EXISTS (120 lines)
- `public/logo.png`: EXISTS
- `app/layout.tsx`: modified with Nav + Footer imports
- Commit b126041: Task 1 — nav + mobile toggle + logo
- Commit 5d9f0af: Task 2 — footer + layout update
- Build: PASSED (no errors)
