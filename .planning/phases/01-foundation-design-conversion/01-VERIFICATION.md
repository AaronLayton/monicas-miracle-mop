---
phase: 01-foundation-design-conversion
verified: 2026-04-11T12:00:00Z
status: gaps_found
score: 10/16 requirements verified
gaps:
  - truth: "Homepage, Services, Schedule, and Checkout pages visually match design-3 screenshots when compared side-by-side"
    status: failed
    reason: "Multiple confirmed visual fidelity gaps across all four pages when compared to design-3 HTML/screenshots"
    artifacts:
      - path: "app/page.tsx"
        issue: "Featured pricing card uses bg-primary (dark purple) instead of bg-primary-container (lighter purple) as design shows. Monica Difference stat bubble size/position differs."
      - path: "app/services/page.tsx"
        issue: "Extra 'Select' buttons on service cards not present in design. Service card icon background uses bg-muted (grey) instead of bg-accent (cyan) for non-highlighted cards. Add-on grid uses grid-cols-2 md:grid-cols-3 — column count may not match design."
      - path: "app/checkout/page.tsx"
        issue: "Missing decorative blobs in sidebar. Missing date display in booking summary. Padding differs from design."
      - path: "components/footer.tsx"
        issue: "Footer uses bg-foreground (dark background) but design uses a light slate background."
      - path: "components/nav.tsx"
        issue: "Nav shows Home/Services/Schedule/Checkout links; design shows Services/Reviews/About. The Home link and Checkout link in the nav are not present in design-3."
    missing:
      - "Fix featured pricing card: change bg-primary to bg-primary-container on the featured ServiceCard"
      - "Remove 'Select' buttons from services page service cards (or align with design)"
      - "Fix service card icon backgrounds: use bg-accent instead of bg-muted for non-highlighted cards"
      - "Fix footer background: change bg-foreground to a light slate/muted background to match design"
      - "Fix nav links: update to Services/Reviews/About (remove Home and Checkout from nav)"
      - "Add decorative blobs to checkout sidebar"
      - "Add date display row to booking summary in checkout"
  - truth: "Container width and padding is consistent across all pages (max-w-7xl, px-4 md:px-8)"
    status: failed
    reason: "Container widths are inconsistent: nav uses max-w-7xl, footer uses max-w-7xl, homepage uses max-w-7xl, services uses max-w-7xl, but schedule uses max-w-6xl with sm:px-6 lg:px-8 padding"
    artifacts:
      - path: "app/schedule/page.tsx"
        issue: "Uses max-w-6xl and sm:px-6 lg:px-8 instead of max-w-7xl with px-4 md:px-8"
    missing:
      - "Standardise schedule page container to max-w-7xl px-4 md:px-8 to match other pages"
human_verification:
  - test: "Open each page in a browser and compare side-by-side with design-3 screenshots"
    expected: "All four pages match docs/design-3-homepage-step-1/screen.png, docs/design-3-services-step-3/screen.png, docs/design-3-checkout-step-4/screen.png, and docs/design-1-schedule-step-3/screen.png"
    why_human: "Visual fidelity cannot be fully verified programmatically — colour rendering, spacing, blur effects, and responsive layout all require browser comparison"
  - test: "Resize browser to mobile width and test hamburger menu on mobile nav"
    expected: "Mobile menu opens and closes correctly, all nav links are accessible"
    why_human: "Interactive mobile menu behaviour requires browser testing"
---

# Phase 1: Foundation & Design Conversion Verification Report

**Phase Goal:** The site looks exactly like design-3, runs on Next.js with a stable server/client component boundary, and all design system decisions are locked in before any feature work begins.
**Verified:** 2026-04-11
**Status:** gaps_found
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|---------|
| 1 | All pages use Plus Jakarta Sans font instead of Geist | VERIFIED | `app/layout.tsx` imports `Plus_Jakarta_Sans` with `variable: "--font-plus-jakarta-sans"`; globals.css maps `--font-sans` to the variable |
| 2 | Primary purple (#511983), secondary teal (#00687a), and design-3 colours are available as semantic Tailwind classes | VERIFIED | `globals.css` contains `--primary: oklch(0.341 0.195 307.1)`, `--secondary: oklch(0.437 0.094 213.7)`, `--primary-container`, `--primary-soft`, all mapped via `@theme inline` |
| 3 | Glass-card effect is available as utility classes | VERIFIED | `.glass-card`, `.glass-card-nav`, `.glass-card-sidebar` all defined in `globals.css @layer utilities` |
| 4 | Nav component extracted with logo, links, Book Now CTA | VERIFIED | `components/nav.tsx` exists (80 lines), uses glass-card-nav, has logo, link list, Book Now CTA — BUT nav links differ from design (see gap) |
| 5 | Footer component extracted with 4-column layout | VERIFIED | `components/footer.tsx` exists (121 lines) — BUT uses dark `bg-foreground` background instead of light slate as per design |
| 6 | Homepage converted with hero, pricing cards, Monica Difference, testimonials, CTA | VERIFIED | `app/page.tsx` exists (570 lines), all sections present — BUT featured pricing card colour is wrong (bg-primary vs bg-primary-container) |
| 7 | Services page with service selection cards, add-on grid, booking summary sidebar | PARTIAL | `app/services/page.tsx` exists (232 lines) with the correct structure — BUT has extra "Select" buttons not in design, icon backgrounds use bg-muted not bg-accent |
| 8 | Schedule page with home details, calendar, arrival window | VERIFIED | `app/schedule/page.tsx` exists (65 lines), imports HomeDetailsSection, DateSection, ArrivalSection, BookingSummary — all schedule sub-components present |
| 9 | Checkout page with contact form, UK address form, booking summary | VERIFIED | `app/checkout/page.tsx` exists (249 lines), UK address format (Address Line 1, Address Line 2, Town/City, County, Postcode) present, no ZIP/State fields |
| 10 | All pages visually match design-3 screenshots | FAILED | Confirmed visual gaps: wrong footer bg, wrong nav links, wrong pricing card colour, extra Select buttons, missing checkout blobs, inconsistent container widths (schedule uses max-w-6xl vs max-w-7xl elsewhere) |
| 11 | All Google-hosted images replaced with local placeholders | VERIFIED | Only `/images/hero-clean-home.jpg` and `/images/professional-cleaner.jpg` used; no googleapis or external image URLs found |
| 12 | All Material Symbols replaced with Lucide icons | VERIFIED | All icon imports are `from "lucide-react"` across all pages and components; no Material references found |
| 13 | All pricing in GBP | VERIFIED | £20, £100–£200, £150 on homepage; £20/hr, £45, £30, £25, £40 on services; £ throughout terms page |
| 14 | UK English copy throughout | VERIFIED | No US-specific spellings in user-facing text; "colour" appears only in CSS class names (e.g. `transition-colors`) which is correct |
| 15 | UK address format in checkout forms | VERIFIED | Address Line 1, Address Line 2, Town/City, County (optional), Postcode — no ZIP or State fields |
| 16 | Terms & Conditions page with Kasey's cancellation policy | VERIFIED | `app/terms/page.tsx` (246 lines) contains cancellation policy, 24hr rule, GBP pricing, payment terms |
| 17 | AGENTS.md contains comprehensive project context | VERIFIED | 211 lines; contains Plus Jakarta Sans, @base-ui/react, glass-card, £20/hr pricing, data-slot, UK localisation rules, colour token table, routes table |
| 18 | CLAUDE.md references AGENTS.md with project-specific rules | VERIFIED | CLAUDE.md opens with `@AGENTS.md`, contains UK English, base-nova, Server Components, glass-card, and @base-ui/react rules |
| 19 | lang="en-GB" set on html element | VERIFIED | `app/layout.tsx` line 27: `lang="en-GB"` |
| 20 | Dark mode removed entirely | VERIFIED | No `.dark` block in globals.css; confirmed 0 occurrences |

**Score:** 16/20 observable truths verified (4 failed or partial — all in the visual fidelity category)

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `app/globals.css` | Design-3 colour tokens, glass-card utility, font variable mapping | VERIFIED | Contains all oklch tokens, 3 glass-card utilities, --font-plus-jakarta-sans mapping |
| `app/layout.tsx` | Plus Jakarta Sans font, lang="en-GB" | VERIFIED | Plus_Jakarta_Sans import, lang="en-GB", Monica's Miracle Mop metadata |
| `components/ui/card.tsx` | shadcn card primitive | VERIFIED | Exists |
| `components/ui/input.tsx` | shadcn input primitive | VERIFIED | Exists |
| `components/ui/label.tsx` | shadcn label primitive | VERIFIED | Exists |
| `components/ui/badge.tsx` | shadcn badge primitive | VERIFIED | Exists |
| `components/ui/separator.tsx` | shadcn separator primitive | VERIFIED | Exists |
| `components/nav.tsx` | Shared nav with logo, links, Book Now CTA, mobile menu | VERIFIED (with gap) | 80 lines, substantive — BUT nav links differ from design-3 |
| `components/footer.tsx` | Shared footer with 4-column layout | VERIFIED (with gap) | 121 lines, substantive — BUT uses dark background, design uses light slate |
| `components/booking/booking-summary.tsx` | Shared booking summary sidebar component | VERIFIED | Exists, glass-card-sidebar, static placeholder data as specified for Phase 1 |
| `app/page.tsx` | Homepage with all design-3 sections | VERIFIED (with gap) | 570 lines — BUT featured card uses bg-primary not bg-primary-container |
| `app/services/page.tsx` | Services page with cards, add-on grid, sidebar | STUB (partial) | 232 lines — BUT has extra "Select" buttons not in design; icon bg wrong |
| `app/schedule/page.tsx` | Schedule with home details, calendar, arrival window | VERIFIED | 65 lines + all sub-components; container is max-w-6xl (inconsistent) |
| `app/checkout/page.tsx` | Checkout with contact form, UK address, sidebar | VERIFIED (with gap) | 249 lines — BUT missing sidebar decorative blobs and date display |
| `app/terms/page.tsx` | Terms & Conditions page | VERIFIED | 246 lines, full cancellation policy and payment terms |
| `AGENTS.md` | 80+ lines comprehensive project context | VERIFIED | 211 lines with all required sections |
| `CLAUDE.md` | @AGENTS.md reference + project rules | VERIFIED | Contains @AGENTS.md and all required rules |

### Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| `app/layout.tsx` | `app/globals.css` | CSS variable `--font-plus-jakarta-sans` referenced in `@theme inline --font-sans` | VERIFIED | globals.css line 8: `var(--font-plus-jakarta-sans)` |
| `app/layout.tsx` | `components/nav.tsx` | `import { Nav }` + `<Nav />` in body | VERIFIED | Lines 4 and 31 of layout.tsx |
| `app/layout.tsx` | `components/footer.tsx` | `import { Footer }` + `<Footer />` in body | VERIFIED | Lines 5 and 33 of layout.tsx |
| `app/schedule/page.tsx` | `components/booking/booking-summary.tsx` | import + `<BookingSummary />` | VERIFIED | Line 6 import, line 59 usage |
| `app/checkout/page.tsx` | `components/booking/booking-summary.tsx` | import + `<BookingSummary />` | VERIFIED | Line 3 import, line 243 usage |
| `CLAUDE.md` | `AGENTS.md` | `@AGENTS.md` reference | VERIFIED | First line of CLAUDE.md |

### Requirements Coverage

| Requirement | Description | Status | Evidence |
|-------------|-------------|--------|---------|
| DSGN-01 | Design-3 colour tokens mapped to Tailwind CSS v4 theme variables with Plus Jakarta Sans | SATISFIED | globals.css has full oklch palette, layout.tsx has Plus_Jakarta_Sans |
| DSGN-02 | Shared Nav component extracted from design-3 | PARTIAL | Nav exists and is substantive — but nav links differ from design (Home/Services/Schedule/Checkout vs design's Services/Reviews/About) |
| DSGN-03 | Shared Footer component extracted from design-3 | PARTIAL | Footer exists and is substantive — but uses dark background (bg-foreground) vs design's light slate |
| DSGN-04 | Homepage converted with hero, pricing cards, Monica Difference, testimonials, CTA | PARTIAL | All sections present — but featured pricing card colour wrong (bg-primary vs bg-primary-container) |
| DSGN-05 | Services page with service selection cards, add-on grid, booking summary sidebar | PARTIAL | Page exists — but has extra Select buttons not in design; icon backgrounds wrong colour |
| DSGN-06 | Schedule page with home details, calendar, arrival window | SATISFIED | All three sections and booking summary sidebar present |
| DSGN-07 | Checkout page with contact form, address form, booking summary | PARTIAL | Page exists — missing decorative blobs and date display in sidebar |
| DSGN-08 | All Google-hosted images replaced with local placeholders | SATISFIED | Only /images/ local paths found; no external image URLs |
| DSGN-09 | All Material Symbols replaced with Lucide icons | SATISFIED | All icon imports from lucide-react across all files |
| DSGN-10 | Visual accuracy verified against design-3 screenshots | BLOCKED | Known visual gaps listed in context; human verification gated on these fixes being made |
| UK-01 | All pricing in GBP using Kasey's real prices | SATISFIED | £20/hr, £100–£200, £150, add-ons at correct GBP amounts throughout |
| UK-02 | UK English throughout all copy | SATISFIED | No US spellings in user-facing text confirmed |
| UK-03 | UK address format in forms | SATISFIED | Postcode, Town/City, County fields present; no ZIP or State |
| UK-04 | Terms & Conditions page reflecting Kasey's cancellation policy | SATISFIED | app/terms/page.tsx fully populated from terms.jpg |
| DOCS-01 | AGENTS.md updated with project context, design system, and development guidelines | SATISFIED | 211-line AGENTS.md with tech stack, tokens, conventions, routes, pricing |
| DOCS-02 | CLAUDE.md updated with project-specific instructions for LLM contributors | SATISFIED | CLAUDE.md has @AGENTS.md reference plus 10 project rules |

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `app/page.tsx` | 155 | `bg-primary` on featured ServiceCard | Warning | Featured pricing card is darker purple than design-3 shows; design uses lighter bg-primary-container |
| `app/services/page.tsx` | 139 | `bg-muted` on non-highlighted service card icon bg | Warning | Service card icons have grey bg instead of cyan (bg-accent) matching design |
| `app/services/page.tsx` | 172 | `Select` button in service card | Warning | Extra bordered "Select" button not present in design-3; creates visual divergence |
| `components/footer.tsx` | 28 | `bg-foreground` footer background | Warning | Design uses light slate background; dark background is a significant visual divergence |
| `components/nav.tsx` | 7-12 | Nav links: Home, Services, Schedule, Checkout | Warning | Design-3 nav shows Services, Reviews, About — Home and Checkout are not in the design nav |
| `app/schedule/page.tsx` | 20 | `max-w-6xl` container | Info | Inconsistent with max-w-7xl used on all other pages |
| `components/booking/booking-summary.tsx` | 1 | Static placeholder data comment | Info | Intentional for Phase 1 per decision D-04; Phase 2 connects booking context |

### Human Verification Required

1. **Full visual comparison with design-3 screenshots**
   - **Test:** Start dev server (`npm run dev`), open each page, compare side-by-side with design screenshots
   - **Expected:** Pages match docs/design-3-homepage-step-1/screen.png, docs/design-3-services-step-3/screen.png, docs/design-3-checkout-step-4/screen.png, docs/design-1-schedule-step-3/screen.png
   - **Why human:** Visual fidelity (colour rendering, spacing, blur effects, layout proportions) cannot be verified programmatically

2. **Mobile responsive layout and hamburger menu**
   - **Test:** Resize browser to mobile width; tap the hamburger menu toggle
   - **Expected:** Mobile menu opens/closes correctly; all pages are usable at 375px width
   - **Why human:** Requires interactive browser testing

### Gaps Summary

The phase successfully delivered the core design system foundation (DSGN-01: tokens, font, glass-card utilities) and completed most requirements (UK-01 through UK-04, DSGN-06, DSGN-08, DSGN-09, DOCS-01, DOCS-02). However, the primary goal — "the site looks exactly like design-3" — is not yet achieved.

Visual fidelity gaps fall into two categories:

**Category 1 — Wrong colour tokens (quick fixes):**
- Featured pricing card: `bg-primary` should be `bg-primary-container`
- Service card icon backgrounds: `bg-muted` should be `bg-accent`
- Footer background: `bg-foreground` should be a light slate or `bg-muted`

**Category 2 — Structural divergence from design:**
- Nav links do not match design-3 (Home/Schedule/Checkout added; Reviews/About missing)
- Services page has extra "Select" buttons not in design-3
- Checkout sidebar missing decorative blobs and date display
- Schedule page uses `max-w-6xl` while all other pages use `max-w-7xl`

These gaps collectively block DSGN-02 (partial), DSGN-03 (partial), DSGN-04 (partial), DSGN-05 (partial), DSGN-07 (partial), and DSGN-10 (blocked).

---

_Verified: 2026-04-11T12:00:00Z_
_Verifier: Claude (gsd-verifier)_
