---
phase: 01-foundation-design-conversion
plan: 01
subsystem: design-system
tags: [tailwind, shadcn, fonts, css-variables, design-tokens]
dependency_graph:
  requires: []
  provides: [design-tokens, glass-card-utilities, plus-jakarta-sans-font, shadcn-components]
  affects: [01-02, 01-03, 01-04, 01-05, 01-06, 01-07, 01-08]
tech_stack:
  added: [Plus_Jakarta_Sans via next/font/google]
  patterns: [OKLch colour tokens in Tailwind CSS v4 @theme inline, glass-card backdrop-filter utilities, shadcn CLI component installation]
key_files:
  created:
    - components/ui/card.tsx
    - components/ui/input.tsx
    - components/ui/label.tsx
    - components/ui/badge.tsx
    - components/ui/separator.tsx
  modified:
    - app/globals.css
    - app/layout.tsx
decisions:
  - "Design-3 purple/teal palette (primary #511983, secondary #00687a) mapped to shadcn semantic OKLch tokens"
  - "Custom --primary-container token added for CTA buttons (#6a359c, lighter purple)"
  - "Dark mode removed entirely per project out-of-scope decision"
  - "lang=en-GB set on html element for UK localisation"
metrics:
  duration: "~15 minutes"
  completed: "2026-04-11T10:30:34Z"
  tasks_completed: 2
  files_modified: 7
---

# Phase 01 Plan 01: Design System Foundation Summary

Design-3 purple/teal Material Design tokens mapped to shadcn OKLch semantic variables, Plus Jakarta Sans font loaded via next/font/google, glass-card utilities added, and 5 shadcn UI primitives installed — all subsequent page plans now have the correct design system in place.

## What Was Built

### Task 1: Colour tokens and glass-card utilities (commit: f749602)

Replaced the default shadcn greyscale colour scheme in `app/globals.css` with the design-3 Material Design 3 palette:

- **Primary purple**: `--primary: oklch(0.341 0.195 307.1)` (#511983)
- **Secondary teal**: `--secondary: oklch(0.437 0.094 213.7)` (#00687a)
- **Accent light teal**: `--accent: oklch(0.916 0.063 218.5)` (#abedff)
- **Custom CTA token**: `--primary-container: oklch(0.431 0.168 307.1)` (#6a359c)
- **Custom soft token**: `--primary-soft: oklch(0.918 0.062 307.1)` (#f0dbff)
- All surface, border, muted, and destructive tokens updated to match design-3

Removed: `.dark` block, all `--sidebar-*` variables, all `--chart-*` variables.

Added three glass-card utilities using `backdrop-filter: blur()`:
- `.glass-card` — general use (70% white, 16px blur)
- `.glass-card-nav` — navigation bar (85% white, 20px blur)
- `.glass-card-sidebar` — sidebar panels (70% white, 12px blur)

Updated `@theme inline` to use `--font-plus-jakarta-sans` for both `--font-sans` and `--font-heading`.

### Task 2: Font swap and shadcn components (commit: b2f56e5)

Updated `app/layout.tsx`:
- Replaced Geist font imports with `Plus_Jakarta_Sans` from `next/font/google`
- Set `lang="en-GB"` on the `<html>` element for UK localisation
- Updated metadata with Monica's Miracle Mop title and description
- Removed both Geist font variables from the html className

Installed shadcn UI components via CLI:
- `card.tsx` — for service cards, pricing cards, booking summary
- `input.tsx` — for checkout form fields
- `label.tsx` — for form field labels
- `badge.tsx` — for service tags and status indicators
- `separator.tsx` — for visual dividers in summaries

Build result: `✓ Compiled successfully` — zero TypeScript errors, zero warnings.

## Verification

- `npm run build` passes cleanly
- All 5 required shadcn components created in `components/ui/`
- `app/globals.css` contains 20 OKLch colour values
- No `.dark` block, no `--sidebar-*`, no `--chart-*` tokens remain
- `app/layout.tsx` uses `Plus_Jakarta_Sans` with `lang="en-GB"`

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

Files created:
- components/ui/card.tsx — FOUND
- components/ui/input.tsx — FOUND
- components/ui/label.tsx — FOUND
- components/ui/badge.tsx — FOUND
- components/ui/separator.tsx — FOUND

Commits:
- f749602 — FOUND
- b2f56e5 — FOUND
