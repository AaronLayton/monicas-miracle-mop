---
phase: 01-foundation-design-conversion
plan: 11
subsystem: ui
tags: [tailwind-v4, nextjs, design-conversion, semantic-colours, glass-card, uk-localisation]

# Dependency graph
requires:
  - phase: none
    provides: initial scaffold with shadcn/ui base-nova
provides:
  - Faithful design-3 homepage with 5 sections (Hero, Pricing, Monica Difference, Testimonials, CTA)
  - Services page with plain div cards, add-on grid, and booking summary sidebar
  - Checkout page with UK address format, no payment section
  - Schedule page with max-w-7xl container and borderless counter inputs
  - BookingSummary component with configurable trust badge placement and blob visibility
  - Nav with Services/Reviews/About links and Book Now CTA
  - Footer with light bg-muted background
  - globals.css with full design-3 colour token mapping via @theme inline
affects: [02-booking-state, 03-calendar-email, 05-seo-content]

# Tech tracking
tech-stack:
  added: []
  patterns: [semantic-colour-classes-only, no-bg-var-syntax, plain-divs-not-card-wrappers, server-components-default]

key-files:
  created: []
  modified:
    - app/page.tsx
    - app/services/page.tsx
    - app/schedule/page.tsx
    - components/booking/booking-summary.tsx

key-decisions:
  - "Use bg-primary-container for CTA buttons matching design-3 lighter purple"
  - "Plain divs for service cards instead of shadcn Card wrappers to match design HTML"
  - "BookingSummary gains showTrustBadgesOutside and hideBlobs props for per-page layout control"
  - "Remove nested <main> tags from all pages since layout.tsx already wraps in <main>"

patterns-established:
  - "Semantic colour only: bg-primary, text-secondary, bg-accent -- never bg-[--var] in Tailwind v4"
  - "No nested <main> tags: layout.tsx provides the single <main> wrapper"
  - "Plain divs where design uses plain divs: do not wrap in shadcn Card unless design does"
  - "GBP pricing with unicode pound sign \\u00a3 in string literals"

requirements-completed: [DSGN-01, DSGN-02, DSGN-03, DSGN-04, DSGN-05, DSGN-06, DSGN-07, DSGN-08, DSGN-09, DSGN-10, UK-01, UK-02, UK-03, UK-04]

# Metrics
duration: 5min
completed: 2026-04-11
---

# Phase 01 Plan 11: Gap Closure - Faithful Design-3 Conversion Summary

**Faithful design-3 page conversion with semantic Tailwind v4 colours, plain div cards, GBP pricing, and UK address format across all 4 pages**

## Performance

- **Duration:** 5 min
- **Started:** 2026-04-11T16:21:54Z
- **Completed:** 2026-04-11T16:27:17Z
- **Tasks:** 5
- **Files modified:** 4

## Accomplishments
- Homepage faithfully matches design-3 HTML with bg-primary-container CTA, correct pricing card borders, and 5 complete sections
- Services page converted from shadcn Card wrappers to plain divs, with "Enhance Your Experience" heading, badge placement (Popular/Best Value), and transparent-border add-on items
- BookingSummary component enhanced with configurable trust badge placement and blob visibility for per-page design matching
- All pages cleaned of nested <main> tags (layout.tsx provides the single <main>)
- All GBP prices verified against Kasey's flyer

## Task Commits

Each task was committed atomically:

1. **Task 1: Verify globals.css and layout.tsx foundation** - No changes needed (already correct)
2. **Task 2: Rewrite homepage from design-3 HTML** - `ecae41e` (feat)
3. **Task 3: Rewrite services page from design-3 HTML** - `f9e571a` (feat)
4. **Task 4: Rewrite checkout page from design-3 HTML** - No changes needed (already correct)
5. **Task 5: Verify schedule page and shared components** - `b847b51` (fix)

## Files Created/Modified
- `app/page.tsx` - Homepage: bg-primary-container CTA, min-h hero, remove nested main
- `app/services/page.tsx` - Full rewrite: plain divs, Popular/Best Value badges, Enhance Your Experience heading, transparent borders
- `app/schedule/page.tsx` - Remove nested main tag
- `components/booking/booking-summary.tsx` - Add showTrustBadgesOutside and hideBlobs props, restructure with inner div wrapper

## Decisions Made
- Used bg-primary-container (lighter purple #6a359c) for hero CTA button to match design-3 HTML exactly
- Service cards use plain divs with p-8 rounded-xl, not shadcn Card components, matching the design HTML structure
- BookingSummary uses rounded-2xl when trust badges are outside (services), rounded-3xl when inside (checkout)
- Checkout page verified as already correct -- no changes needed (UK address format, no payment section, proper icon circles)
- globals.css and layout.tsx verified as already correct -- foundation was solid from prior plans

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed nested main tags across all pages**
- **Found during:** Task 2 (Homepage rewrite)
- **Issue:** Pages wrapped content in <main> but layout.tsx already wraps children in <main>, creating invalid nested main elements
- **Fix:** Changed page wrappers from <main> to <> (fragment) or <div> as appropriate
- **Files modified:** app/page.tsx, app/schedule/page.tsx (services/checkout already used div)
- **Verification:** grep confirms no <main> tags in any page file
- **Committed in:** ecae41e (homepage), b847b51 (schedule)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Necessary HTML validity fix. No scope creep.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 4 pages and shared components faithfully match design-3 HTML
- Phase 1 (foundation-design-conversion) is complete
- Ready for Phase 2 (booking state management with React Context + useReducer)
- BookingSummary is prepared with static placeholder data; Phase 2 will connect it to booking context

---
## Self-Check: PASSED

All modified files verified present. All commit hashes verified in git log.

---
*Phase: 01-foundation-design-conversion*
*Completed: 2026-04-11*
