---
phase: 01-foundation-design-conversion
plan: "06"
subsystem: pages
tags: [checkout, forms, uk-address, booking-flow]
dependency_graph:
  requires: ["01-04"]
  provides: ["checkout-page"]
  affects: ["booking-flow"]
tech_stack:
  added: []
  patterns: ["server-component-page", "two-column-layout", "uk-address-format"]
key_files:
  created:
    - app/checkout/page.tsx
  modified: []
decisions:
  - "UK address format: Address Line 1/2, Town/City, County, Postcode — no State/ZIP"
  - "Payment section removed entirely per D-05 (Phase 1 = booking only, no payment)"
  - "Confirm Booking button is non-functional in Phase 1 — Phase 2 connects to Server Action"
  - "Textarea styled with matching Input classes via cn() rather than using Input component"
metrics:
  duration: "~8 minutes"
  completed: "2026-04-11"
  tasks_completed: 1
  files_created: 1
  files_modified: 0
---

# Phase 01 Plan 06: Checkout Page Summary

**One-liner:** Checkout page with UK address form (Postcode/Town/City/County), contact details, special notes textarea, and BookingSummary sidebar — no payment section.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create checkout page with contact form, UK address form, and sidebar | 26b5c8a | app/checkout/page.tsx |

## What Was Built

`app/checkout/page.tsx` — a Next.js Server Component implementing the full checkout UI for Phase 1:

- **Contact Details** section (Card): Full Name (full width), Email Address + Phone Number (side by side). UK phone placeholder format (`07700 900000`), UK email placeholder (`.co.uk`).
- **Service Address** section (Card): UK format with Address Line 1, Address Line 2, Town/City, County, Postcode fields. No State field, no ZIP code field. Postcode half-width per UK convention.
- **Special Notes** section (Card): Textarea styled with Input classes for visual consistency.
- **Confirm Booking** button: Full-width, `bg-[--primary-container]` purple CTA, non-functional in Phase 1 with comment for Phase 2 Server Action connection.
- **BookingSummary sidebar**: Imported from `@/components/booking/booking-summary`, rendered with `sticky top-24`.
- Two-column layout: `grid lg:grid-cols-[1fr_380px] gap-8` consistent with Services and Schedule pages.

## Acceptance Criteria Verification

- [x] `app/checkout/page.tsx` exists
- [x] Imports `BookingSummary` from `@/components/booking/booking-summary`
- [x] Imports `Input` from `@/components/ui/input`
- [x] Imports `Label` from `@/components/ui/label`
- [x] Contains "Contact Details" section
- [x] Contains "Service Address" section
- [x] Contains "Postcode" field label
- [x] Contains "Town/City" field label
- [x] Does NOT contain "State" as form field
- [x] Does NOT contain "ZIP" text
- [x] Does NOT contain "payment", "credit card", or "card number"
- [x] Contains "Confirm Booking" button text
- [x] Contains "Special Notes" section
- [x] `npm run build` completes without errors (13/13 pages)

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- `app/checkout/page.tsx` — FOUND
- Commit `26b5c8a` — FOUND (`git log --oneline` confirms)
- Build passes with `/checkout` route listed as static
