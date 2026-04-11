---
phase: 01-foundation-design-conversion
plan: "04"
subsystem: ui
tags: [nextjs, tailwind, shadcn, lucide, server-components, booking-flow]

requires:
  - phase: 01-02
    provides: Nav and Footer components, glass-card-sidebar utility class, themed design tokens

provides:
  - components/booking/booking-summary.tsx — Reusable glass-card sidebar with GBP static placeholder data
  - app/services/page.tsx — Services page with 3 service cards, 6 add-ons grid, BookingSummary sidebar
  - Two-column responsive layout pattern (1fr_380px grid with sticky sidebar)

affects:
  - 01-06 (checkout page reuses BookingSummary component)
  - 01-05 (schedule page follows same layout pattern)

tech-stack:
  added: []
  patterns:
    - Server Component pages with static metadata export
    - Reusable sidebar component with data-slot and cn() className prop
    - Next.js 16 typed Route imports for future pages using `as Route` cast
    - Add-on grid with Lucide icon replacement for Material Symbols

key-files:
  created:
    - components/booking/booking-summary.tsx
    - app/services/page.tsx
  modified:
    - components/footer.tsx
    - components/nav.tsx
    - components/mobile-nav-toggle.tsx

key-decisions:
  - "BookingSummary is a Server Component (no use client) — Phase 1 uses static data, Phase 2 will add BookingContext"
  - "Link rendered as styled anchor instead of Button asChild — base-ui Button does not support asChild prop"
  - "Future routes (/schedule, /checkout, /about, etc.) cast as Route to satisfy Next.js 16 typed routes at build time"

patterns-established:
  - "data-slot on root element of all shared components (data-slot=booking-summary)"
  - "className?: string prop merged with cn() for all composable components"
  - "Add-ons defined as const arrays with icon, name, price — ready for Phase 2 dynamic toggle"
  - "Service cards defined as const arrays — easy to iterate; Phase 2 will add selection state"

requirements-completed:
  - DSGN-05

duration: 25min
completed: 2026-04-11
---

# Phase 01 Plan 04: Services Page Summary

**Services page with 3 service selection cards and 6 add-ons grid in a two-column layout, plus reusable BookingSummary glass-card sidebar with GBP pricing from Kasey's flyer**

## Performance

- **Duration:** ~25 min
- **Started:** 2026-04-11T00:00:00Z
- **Completed:** 2026-04-11T00:25:00Z
- **Tasks:** 2
- **Files modified:** 5 (2 created, 3 fixed)

## Accomplishments

- Created `BookingSummary` as a reusable Server Component with glass-card-sidebar styling, data-slot pattern, and static GBP placeholder data (£150 Deep Clean, £45 Oven Cleaning, £30 Ironing, £225 total)
- Created `app/services/page.tsx` with two-column grid (`lg:grid-cols-[1fr_380px]`), 3 service cards (Standard/Deep/Move-In-Out) using shadcn Card primitives, and 6 add-on cards with Lucide icons
- Fixed Next.js 16 typed-route build errors across nav.tsx, footer.tsx, and mobile-nav-toggle.tsx — `npm run build` now completes cleanly with `/services` prerendered as static

## Task Commits

1. **Task 1: Create BookingSummary shared component** - `2a2f57e` (feat)
2. **Task 2: Convert services page with cards, add-ons, and sidebar** - `a8f2174` (feat)

## Files Created/Modified

- `components/booking/booking-summary.tsx` — Reusable glass-card sidebar; static placeholder data; data-slot, cn(), Phase 1/2 comment
- `app/services/page.tsx` — Services page; metadata; two-column grid; 3 service cards; 6 add-on cards; BookingSummary import
- `components/footer.tsx` — Added `Route` type import to fix Next.js 16 typed-routes build error
- `components/nav.tsx` — Added `Route` type import to fix typed-routes build error
- `components/mobile-nav-toggle.tsx` — Added `Route` type import to fix typed-routes build error

## Decisions Made

- `BookingSummary` is a pure Server Component — no `use client`. Phase 2 will pass state via props or context from a parent client boundary.
- `Button asChild` pattern not available in base-ui Button variant — used a styled `<Link>` directly for the Continue CTA.
- Routes that don't exist yet (`/schedule`, `/checkout`, etc.) are cast with `as Route` to satisfy Next.js 16's typed routes without disabling the type check globally.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Button `asChild` prop not supported by base-ui Button**
- **Found during:** Task 1 (BookingSummary component)
- **Issue:** `Button` wraps `@base-ui/react/button` which does not accept `asChild` — TypeScript error on build
- **Fix:** Replaced `<Button asChild><Link>` with a styled `<Link>` using equivalent Tailwind classes
- **Files modified:** `components/booking/booking-summary.tsx`
- **Verification:** Build TypeScript check passes
- **Committed in:** a8f2174 (Task 2 commit)

**2. [Rule 3 - Blocking] Next.js 16 typed-route errors in existing shared components**
- **Found during:** Task 2 verification (npm run build)
- **Issue:** `footer.tsx`, `nav.tsx`, `mobile-nav-toggle.tsx` used string hrefs for future routes (`/schedule`, `/checkout`, `/about`, etc.) which fail Next.js 16 typed-route checking
- **Fix:** Added `import type { Route } from "next"` and typed link arrays as `{ href: Route; label: string }[]`, casting future routes with `as Route`
- **Files modified:** `components/footer.tsx`, `components/nav.tsx`, `components/mobile-nav-toggle.tsx`
- **Verification:** `npm run build` completes, `/services` page prerendered as static
- **Committed in:** a8f2174 (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (2 blocking)
**Impact on plan:** Both auto-fixes necessary for the build to succeed. No scope creep — no new features added, only corrected type constraints introduced by the Next.js 16 typed-route system.

## Issues Encountered

Next.js 16's typed routes feature rejects string literals for routes that don't exist as app directory pages yet. All three pre-existing shared components (Nav, Footer, MobileNavToggle) contained links to future pages. Fixed by importing `Route` from `"next"` and casting unrecognised routes.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- `BookingSummary` is ready to be imported on the Checkout page (Plan 06) — same import path `@/components/booking/booking-summary`
- Services page is statically prerendered at `/services` and wired into the Nav
- Phase 2 can connect `BookingSummary` to `BookingContext` by lifting state into a parent client boundary and passing selected service/add-ons as props

---
*Phase: 01-foundation-design-conversion*
*Completed: 2026-04-11*
