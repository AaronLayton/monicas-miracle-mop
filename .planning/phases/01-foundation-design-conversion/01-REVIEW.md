---
status: issues_found
phase: 01-foundation-design-conversion
depth: standard
files_reviewed: 15
findings:
  critical: 2
  warning: 5
  info: 2
  total: 9
---

# Code Review — Phase 01: Foundation Design Conversion

Reviewed 15 source files. 9 findings meet the >= 80% confidence threshold.

---

## Critical

---

### CR-1 — Past date selection not blocked in CalendarPicker

**File:** `components/schedule/calendar-picker.tsx`
**Line:** 126-159
**Issue:** `buildCalendarGrid` generates cells that include dates before today (prior-month padding and earlier days in the current month). No guard prevents `onDateSelect` being called with a past date. A user can reach checkout with a booking date of yesterday or earlier.
**Fix:** Before rendering each cell, compute `const isPast = date < today && !isSameDay(date, today)`. Add `disabled={isPast}` to the `<button>` and apply `cursor-not-allowed opacity-40` via `cn()` when `isPast` is true.

---

### CR-2 — Oven Cleaning add-on price in BookingSummary does not match AGENTS.md

**File:** `components/booking/booking-summary.tsx`
**Line:** 65
**Issue:** The booking summary line item "Oven Cleaning (Add-on Service)" displays `£45.00`. AGENTS.md pricing table lists the add-on price as `Oven: £25`. The standalone oven-cleaning service is £45 per the flyer, but the label explicitly says "Add-on Service".
**Fix:** Change line 65 to `£25.00` to match the add-on price. If the standalone service price (£45) is intended, change the subtitle from "Add-on Service" to "Standalone Service".

---

## Warning

---

### WR-1 — Hardcoded `rgba()` colour values in shadow utilities

**Files:**
- `app/services/page.tsx` lines 98, 100
- `app/schedule/page.tsx` line 50
- `components/booking/booking-summary.tsx` lines 25, 114
- `components/nav.tsx` line 19

**Issue:** CLAUDE.md states "Never hardcode hex values" and AGENTS.md states "Never use hardcoded hex values or arbitrary Tailwind colours." Arbitrary `rgba()` literals embedded in `shadow-[...]` classes are hardcoded colour values.
**Fix:** Add RGB-channel custom properties to `:root` in `globals.css` and reference them in component files.

---

### WR-2 — `MobileNavToggle` button missing `aria-controls`

**File:** `components/mobile-nav-toggle.tsx`
**Line:** 22-25, 37
**Issue:** The toggle `<button>` sets `aria-expanded` correctly but omits `aria-controls`. Screen readers can report the expanded state but cannot programmatically navigate from the button to the controlled nav region.
**Fix:** Add `id="mobile-nav"` to the `<nav>` element. Add `aria-controls="mobile-nav"` to the `<button>`.

---

### WR-3 — Footer copyright year hardcoded as 2024

**File:** `components/footer.tsx`
**Line:** 116
**Issue:** The footer reads "2024 Monica's Miracle Mop". The terms page is dated April 2026. The year is stale by two years.
**Fix:** Compute the year server-side: `const year = new Date().getFullYear()` and render dynamically.

---

### WR-4 — Checkout form inputs not wrapped in a `<form>` element

**File:** `app/checkout/page.tsx`
**Lines:** 37-237
**Issue:** All `<input>` and `<textarea>` elements have no enclosing `<form>`. Pressing Enter does not submit; there is no accessible form landmark for screen readers.
**Fix:** Wrap the three contact/address/notes sections in a `<form>` element.

---

### WR-5 — `bg-slate-*` non-semantic palette colours used for avatar placeholders

**File:** `app/page.tsx`
**Lines:** 107-109, 447
**Issue:** `bg-slate-200`, `bg-slate-300`, `bg-slate-400` are hardcoded Tailwind palette colours outside the design system.
**Fix:** Replace with semantic tokens: `bg-muted` and `bg-border`.

---

## Info

---

### IR-1 — "Secure 256-bit Encrypted Checkout" copy is inaccurate for Phase 1

**File:** `components/booking/booking-summary.tsx`
**Line:** 122
**Issue:** No payment processing exists in Phase 1. The copy creates a false expectation.
**Fix:** Replace with: "No payment required today - Kasey will collect on the day."

---

### IR-2 — `Route` type import used inconsistently across pages

**File:** `app/schedule/page.tsx`
**Line:** 3, 49
**Issue:** `import type { Route } from "next"` is used solely for a single `as Route` cast. Other pages do not use typed `Route` hints.
**Fix (optional):** Either adopt `Route` typing consistently or remove it from schedule to match other pages.
