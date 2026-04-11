# Phase 1: Foundation & Design Conversion - Context

**Gathered:** 2026-04-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Convert the design-3 static HTML (Homepage, Services, Checkout) plus the design-1 Schedule page into a Next.js App Router site with shadcn/ui components. Establish the design system (colour tokens, typography, shared components), apply UK localisation, and lock in all design decisions before any feature work begins. The booking summary sidebar, Nav, and Footer are shared components from the start.

</domain>

<decisions>
## Implementation Decisions

### Colour & Typography
- **D-01:** Replace Geist font family with **Plus Jakarta Sans** via `next/font/google`. Update CSS variables and layout.tsx accordingly.
- **D-02:** Map the **core 8-10 used colours** from design-3's Material Design palette to shadcn's semantic Tailwind CSS v4 tokens (`--primary`, `--secondary`, `--accent`, etc.). Ignore the ~30 unused MD3 tokens. Primary purple (#511983), secondary teal (#00687a), plus surface/error/background colours.

### Component Conversion
- **D-03:** **Pixel-perfect match** to design-3 screenshots. Replicate glass-card effects (semi-transparent backgrounds + backdrop blur), gradient text in hero, exact shadows and rounded corners. Use custom CSS where shadcn doesn't have a built-in variant.
- **D-04:** Build **BookingSummary as a shared reusable component** from the start, used on both Services and Checkout pages. Renders static/placeholder data in Phase 1 (booking state comes in Phase 2).
- **D-05:** **Remove the payment section entirely** from the checkout page. Phase 1 is booking-only — the page ends with contact info, service address, and a "Confirm Booking" button. No payment UI shown.
- **D-06:** All components **must follow shadcn/ui patterns**: composable sub-components (e.g. `CardHeader`/`CardTitle`/`CardContent`/`CardFooter`), semantic colours (`bg-primary` not `bg-purple-500`), `cn()` for conditional classes, CVA for variants. UI primitives in `components/ui/`, domain components in feature directories under `components/`.

### Image & Icon Replacement
- **D-07:** Replace Google-hosted stock images with **free stock photos** sourced from Unsplash or Pexels (royalty-free cleaning/home imagery).
- **D-08:** Replace Material Symbols with **closest Lucide icon equivalents** (Lucide already in the project via shadcn). 1:1 mapping for each icon used in the designs.

### Schedule Page Adaptation
- **D-09:** Follow **design-1's 3-section layout** (Home Details -> Service Date -> Arrival Window) with booking summary sidebar, but apply **design-3's visual styling** (purple/teal palette, glass-card effects, Plus Jakarta Sans).
- **D-10:** **Remove square footage field** — not relevant for UK customers. Keep bedrooms, bathrooms, kitchens, and pets +/- counters only.
- **D-11:** Calendar is **interactive in Phase 1** — renders and allows date selection, but all dates appear available (no real availability data). Booking state stores the user's selection.

### UK Localisation
- **D-12:** **UK address format** on checkout: Address Line 1, Address Line 2, Town/City, County (optional), Postcode. No US State or ZIP fields.
- **D-13:** All pricing in **GBP (£)** using Kasey's real prices from the flyer (Standard Clean £20/hr, Deep Clean £100-£200, add-ons as listed).
- **D-14:** All copy in **UK English** (colour, organisation, etc.).

### Claude's Discretion
- Lucide icon selection for each Material Symbol — pick the closest match
- Exact stock photo selection from Unsplash/Pexels — choose images that match the cleaning/home theme
- How to implement glass-card CSS effects (backdrop-filter approach)
- Component file naming and internal structure within shadcn patterns

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design References
- `docs/design-3-homepage-step-1/code.html` — Homepage HTML source with full MD3 colour palette and layout
- `docs/design-3-homepage-step-1/screen.png` — Homepage visual reference (pixel-perfect target)
- `docs/design-3-services-step-3/code.html` — Services page HTML source
- `docs/design-3-services-step-3/screen.png` — Services page visual reference
- `docs/design-3-checkout-step-4/code.html` — Checkout page HTML source
- `docs/design-3-checkout-step-4/screen.png` — Checkout page visual reference
- `docs/design-1-schedule-step-3/screen.png` — Schedule page layout reference (adapt to design-3 style)
- `docs/design-1-homepage-step-1/screen.png` — Home details counters UX reference

### Brand & Pricing
- `docs/kasey-generated-flyers/flyer.png` — Real UK pricing reference (GBP amounts)
- `docs/kasey-generated-flyers/terms.jpg` — Terms & Conditions reference
- `docs/main-logo/screen.png` — Official logo

### Project Config
- `components.json` — shadcn/ui configuration (style: base-nova, RSC enabled)
- `app/globals.css` — Current theme variables (to be remapped)
- `AGENTS.md` — Must be updated with project context per DOCS-01

### shadcn/ui Skill
- `.agents/skills/shadcn/SKILL.md` — shadcn component principles and critical rules
- `.agents/skills/shadcn/rules/styling.md` — Styling rules (semantic colours, no space-x, use cn())
- `.agents/skills/shadcn/rules/composition.md` — Composition rules (composable sub-components, asChild)
- `.agents/skills/shadcn/rules/forms.md` — Form rules (FieldGroup + Field, ToggleGroup for options)
- `.agents/skills/shadcn/rules/icons.md` — Icon rules (data-icon, no sizing classes on icons)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `components/ui/button.tsx` — Button component with CVA variants, can be extended
- `lib/utils.ts` — `cn()` utility for className merging (clsx + twMerge)
- `app/globals.css` — Existing Tailwind v4 theme setup with OKLch colours (needs remapping to design-3 palette)

### Established Patterns
- shadcn/ui with base-nova style, RSC enabled
- CVA (class-variance-authority) for component variants
- Server Components by default, `"use client"` only when needed
- Path alias `@/*` maps to project root
- 2-space indentation, ESLint v9 flat config

### Integration Points
- `app/layout.tsx` — Root layout (font swap from Geist to Plus Jakarta Sans happens here)
- `app/page.tsx` — Current homepage (will be replaced with design-3 conversion)
- New routes needed: `/services`, `/schedule`, `/checkout`
- Shared Nav and Footer components will be added to layout or page wrappers

</code_context>

<specifics>
## Specific Ideas

- The booking flow long-term: customer books -> Google Calendar events created (1. consultation call day before, 2. cleaning job event) -> confirmation email. Phase 1 just captures the booking, Calendar + email come in Phase 3.
- No payment processing — Kasey collects payment on day of clean (bank transfer or cash)
- The design uses glass-card effects that should be faithfully reproduced (backdrop-filter: blur with semi-transparent white backgrounds)
- Component organisation must strictly follow shadcn/ui conventions — this was explicitly important to the user

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation-design-conversion*
*Context gathered: 2026-04-11*
