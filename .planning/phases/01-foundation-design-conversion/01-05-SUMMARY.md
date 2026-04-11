---
phase: 01-foundation-design-conversion
plan: 05
subsystem: ui
tags: [nextjs, react, tailwind, shadcn, calendar, counter, schedule]

requires:
  - phase: 01-02
    provides: Nav, Footer, shared layout components used in page wrapper
  - phase: 01-04
    provides: BookingSummary sidebar component reused verbatim

provides:
  - Schedule page at /schedule with 3-section booking flow layout
  - CalendarPicker client component with navigable month grid (UK Mon-first) and date selection
  - CounterInput client component with labeled +/- controls, min/max bounds
  - HomeDetailsSection client component managing 4 counter states (bedrooms, bathrooms, kitchens, pets)
  - DateSection client component wrapping CalendarPicker with selectedDate state
  - ArrivalSection client component with 3 selectable arrival window cards

affects: [01-06, 01-07, booking-context, checkout-page]

tech-stack:
  added: []
  patterns:
    - Server/client component split: page.tsx is Server Component, interactive leaves are "use client"
    - Suspense boundary over CalendarPicker required by Next.js 16 cacheComponents for new Date() in client init
    - useState lazy initializer pattern for client-only date initialization
    - data-slot attribute pattern on all new components for ShadCN composability

key-files:
  created:
    - app/schedule/page.tsx
    - components/schedule/calendar-picker.tsx
    - components/schedule/counter-input.tsx
    - components/schedule/home-details-section.tsx
    - components/schedule/date-section.tsx
    - components/schedule/arrival-section.tsx
  modified: []

key-decisions:
  - "Wrapped DateSection in Suspense on schedule page — Next.js 16 cacheComponents mode requires Suspense boundary over any client component that reads new Date() during prerender"
  - "Used useState lazy initializer for today/currentMonth in CalendarPicker to confine new Date() to client-side only"
  - "UK week starts Monday — day grid offset uses (jsDay + 6) % 7 formula for correct Mon-first layout"
  - "No square footage field per D-10 decision — Home Details has only bedrooms, bathrooms, kitchens, pets"

patterns-established:
  - "Schedule section components: each interactive section is a self-contained client component with its own useState, imported by the Server Component page"
  - "Suspense fallback pattern: animate-pulse skeleton div with matching height used as placeholder for dynamic client sections"

requirements-completed: [DSGN-06]

duration: 35min
completed: 2026-04-11
---

# Phase 01 Plan 05: Schedule Page Summary

**Interactive schedule page with navigable calendar grid, +/- home detail counters, and arrival window selector — all as isolated client components under a server page**

## Performance

- **Duration:** ~35 min
- **Started:** 2026-04-11T10:30:00Z
- **Completed:** 2026-04-11T11:04:54Z
- **Tasks:** 2
- **Files modified:** 6 created, 0 modified

## Accomplishments

- Built reusable `CounterInput` component: circular +/- buttons, min/max bounds, icon + label display, disabled states
- Built `CalendarPicker` component: UK Mon-first 6x7 month grid, prev/next month navigation, today ring, selected date highlight, muted other-month days
- Created `HomeDetailsSection`, `DateSection`, `ArrivalSection` as isolated client components managing their own state
- Created `SchedulePage` as a Server Component with two-column grid layout (sections + BookingSummary sidebar)
- Resolved Next.js 16 `cacheComponents` prerender error by wrapping `DateSection` in `<Suspense>`

## Task Commits

1. **Task 1: CalendarPicker and CounterInput client components** - `c50624e` (feat)
2. **Task 2: Schedule page with 3-section layout** - `f2167a9` (feat)

## Files Created/Modified

- `components/schedule/counter-input.tsx` - Reusable labeled +/- counter with min/max, Lucide icons, data-slot
- `components/schedule/calendar-picker.tsx` - Navigable month grid calendar, UK Mon-first, date selection state
- `components/schedule/home-details-section.tsx` - Client wrapper managing 4 CounterInput states
- `components/schedule/date-section.tsx` - Client wrapper managing CalendarPicker selectedDate state
- `components/schedule/arrival-section.tsx` - 3 selectable time slot cards (Morning/Midday/Afternoon)
- `app/schedule/page.tsx` - Server Component page with grid layout, Suspense over DateSection, BookingSummary sidebar

## Decisions Made

- Suspense boundary over `DateSection` (not CalendarPicker directly) — Next.js 16 with `cacheComponents` enabled runs client component initializers during prerender; `new Date()` in `useState()` lazy initializer still triggers the error, so Suspense at the section level is the correct fix per Next.js 16 migration docs
- `force-dynamic` export removed — incompatible with `cacheComponents` mode; all pages are dynamic by default in this mode
- UK Mon-first week: `(jsDay + 6) % 7` converts JS Sunday=0 convention to Monday=0 offset for grid padding

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Suspense boundary required for CalendarPicker new Date() in cacheComponents mode**
- **Found during:** Task 2 (build verification)
- **Issue:** Next.js 16 with `cacheComponents: true` ran client component lazy initializers during prerender, triggering `next-prerender-current-time-client` error even when using `useState(() => new Date())` pattern
- **Fix:** Wrapped `<DateSection />` in `<Suspense>` on the schedule page; removed incompatible `export const dynamic = "force-dynamic"` (not valid with cacheComponents)
- **Files modified:** `app/schedule/page.tsx`
- **Verification:** `npm run build` passes, `/schedule` listed as static prerendered route
- **Committed in:** `f2167a9` (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - build error)
**Impact on plan:** Fix required for compilation. No scope creep. Suspense fallback also provides a loading skeleton UX improvement.

## Issues Encountered

- Next.js 16 `cacheComponents` mode is incompatible with `export const dynamic` route segment configs — all pages are dynamic by default, and Suspense is the mechanism for deferring client-side date reads

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Schedule page complete and building cleanly at `/schedule`
- All 3 interactive sections work independently with local state
- Phase 2 (booking context) can connect `HomeDetailsSection`, `DateSection`, `ArrivalSection` to `BookingContext` by lifting the state props
- `CounterInput` and `CalendarPicker` are fully reusable primitives ready for context integration

---
*Phase: 01-foundation-design-conversion*
*Completed: 2026-04-11*
