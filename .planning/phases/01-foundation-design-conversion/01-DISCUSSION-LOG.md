# Phase 1: Foundation & Design Conversion - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-11
**Phase:** 01-foundation-design-conversion
**Areas discussed:** Colour & typography mapping, Component conversion strategy, Image & icon replacement, Schedule page adaptation

---

## Colour & Typography Mapping

### Font Choice

| Option | Description | Selected |
|--------|-------------|----------|
| Plus Jakarta Sans | Match design-3 exactly. Replace Geist with Plus Jakarta Sans via next/font/google. | :heavy_check_mark: |
| Geist Sans (keep current) | Keep existing Geist font. Simpler but won't match design-3 screenshots. | |
| You decide | Claude picks whichever best balances design fidelity and performance. | |

**User's choice:** Plus Jakarta Sans
**Notes:** Design-3 was built with Plus Jakarta Sans; matching it ensures visual fidelity.

### Colour Token Mapping

| Option | Description | Selected |
|--------|-------------|----------|
| Map core subset to Tailwind | Extract 8-10 used colours and map to shadcn semantic tokens. | :heavy_check_mark: |
| Full MD3 palette in theme | Map all ~40 Material Design tokens into Tailwind CSS variables. | |
| You decide | Claude picks the approach. | |

**User's choice:** Map core subset to Tailwind
**Notes:** Focus on actually-used colours; ignore unused MD3 tokens.

---

## Component Conversion Strategy

### Visual Fidelity

| Option | Description | Selected |
|--------|-------------|----------|
| Pixel-perfect match | Replicate glass-card effects, gradient text, exact shadows. Custom CSS where needed. | :heavy_check_mark: |
| Adapted to shadcn defaults | Use shadcn defaults with colour adjustments. Don't chase exact glass effects. | |
| You decide | Claude balances fidelity with maintainability. | |

**User's choice:** Pixel-perfect match
**Notes:** User wants the site to match design-3 screenshots exactly.

### Booking Summary Sidebar

| Option | Description | Selected |
|--------|-------------|----------|
| Shared component | Build BookingSummary as reusable component now with static data. | :heavy_check_mark: |
| Page-specific, refactor later | Build inline on each page, consolidate in Phase 2. | |

**User's choice:** Shared component
**Notes:** Reusable from day one even though booking state comes later.

### Payment Section on Checkout

| Option | Description | Selected |
|--------|-------------|----------|
| Remove payment section entirely | No payment UI in Phase 1. Page ends with contact info + Confirm Booking. | :heavy_check_mark: |
| Show disabled/greyed out | Keep payment section visible but disabled. | |
| You decide | Claude picks. | |

**User's choice:** Remove payment section entirely
**Notes:** User confirmed the booking-only flow. Long-term plan: booking -> Google Calendar events (consultation call + cleaning job) -> confirmation email. Payment processing deferred.

---

## Image & Icon Replacement

### Image Replacement

| Option | Description | Selected |
|--------|-------------|----------|
| Simple placeholders for now | Coloured placeholder boxes or SVG illustrations. | |
| Free stock photos | Royalty-free cleaning/home images from Unsplash or Pexels. | :heavy_check_mark: |
| Kasey's own photos | Real photos from Kasey's business. | |

**User's choice:** Free stock photos
**Notes:** Source from Unsplash/Pexels for a polished look.

### Icon Mapping

| Option | Description | Selected |
|--------|-------------|----------|
| Closest Lucide match | Map each Material Symbol to closest Lucide equivalent. | :heavy_check_mark: |
| You decide | Claude picks best matching Lucide icons. | |

**User's choice:** Closest Lucide match
**Notes:** Straightforward 1:1 replacement.

---

## Schedule Page Adaptation

### Layout Approach

| Option | Description | Selected |
|--------|-------------|----------|
| Same layout, design-3 styling | Keep design-1's 3-section layout, apply design-3's visual styling. | :heavy_check_mark: |
| Reimagine for design-3 | Use design-1 as loose inspiration, redesign from scratch. | |
| You decide | Claude picks. | |

**User's choice:** Same layout, design-3 styling
**Notes:** Preserve the UX flow from design-1 but apply design-3's aesthetic.

### Square Footage Field

| Option | Description | Selected |
|--------|-------------|----------|
| Remove square footage | Not relevant for UK. Keep bedrooms, bathrooms, kitchens, pets only. | :heavy_check_mark: |
| Replace with number of rooms | General room counter instead. | |
| Keep it | Keep for customers who know their home size. | |

**User's choice:** Remove square footage
**Notes:** UK customers don't typically know square footage.

### Calendar Interactivity

| Option | Description | Selected |
|--------|-------------|----------|
| Visual with date selection | Calendar renders, allows clicks, all dates available, stores selection. | :heavy_check_mark: |
| Fully static mockup | Visual only, no interaction until Phase 2. | |
| You decide | Claude picks. | |

**User's choice:** Visual with date selection
**Notes:** Interactive from Phase 1, just without real availability data.

### UK Address Format

| Option | Description | Selected |
|--------|-------------|----------|
| UK format: street, town, county, postcode | Standard UK fields. No State or ZIP. | :heavy_check_mark: |
| Simplified: street + postcode only | Minimal fields. | |
| You decide | Claude picks. | |

**User's choice:** UK format
**Notes:** Address Line 1, Address Line 2, Town/City, County (optional), Postcode.

---

## Additional Notes

User explicitly emphasised that all components must follow shadcn/ui conventions — composable sub-components, correct folder structure (`components/ui/` for primitives, feature directories for domain components), semantic colours, and adherence to the shadcn skill rules.

## Claude's Discretion

- Lucide icon selection for each Material Symbol
- Stock photo selection from Unsplash/Pexels
- Glass-card CSS implementation approach
- Component file naming within shadcn patterns

## Deferred Ideas

None — discussion stayed within phase scope.
