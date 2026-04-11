# Phase 1: Foundation & Design Conversion - Research

**Researched:** 2026-04-11
**Domain:** Next.js 16 App Router, Tailwind CSS v4, shadcn/ui (base-nova), design system conversion
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Replace Geist font family with **Plus Jakarta Sans** via `next/font/google`. Update CSS variables and layout.tsx accordingly.
- **D-02:** Map the **core 8-10 used colours** from design-3's Material Design palette to shadcn's semantic Tailwind CSS v4 tokens (`--primary`, `--secondary`, `--accent`, etc.). Ignore the ~30 unused MD3 tokens. Primary purple (#511983), secondary teal (#00687a), plus surface/error/background colours.
- **D-03:** **Pixel-perfect match** to design-3 screenshots. Replicate glass-card effects (semi-transparent backgrounds + backdrop blur), gradient text in hero, exact shadows and rounded corners. Use custom CSS where shadcn doesn't have a built-in variant.
- **D-04:** Build **BookingSummary as a shared reusable component** from the start, used on both Services and Checkout pages. Renders static/placeholder data in Phase 1 (booking state comes in Phase 2).
- **D-05:** **Remove the payment section entirely** from the checkout page. Phase 1 is booking-only — the page ends with contact info, service address, and a "Confirm Booking" button. No payment UI shown.
- **D-06:** All components **must follow shadcn/ui patterns**: composable sub-components (e.g. `CardHeader`/`CardTitle`/`CardContent`/`CardFooter`), semantic colours (`bg-primary` not `bg-purple-500`), `cn()` for conditional classes, CVA for variants. UI primitives in `components/ui/`, domain components in feature directories under `components/`.
- **D-07:** Replace Google-hosted stock images with **free stock photos** sourced from Unsplash or Pexels (royalty-free cleaning/home imagery).
- **D-08:** Replace Material Symbols with **closest Lucide icon equivalents** (Lucide already in the project via shadcn). 1:1 mapping for each icon used in the designs.
- **D-09:** Follow **design-1's 3-section layout** (Home Details -> Service Date -> Arrival Window) with booking summary sidebar, but apply **design-3's visual styling** (purple/teal palette, glass-card effects, Plus Jakarta Sans).
- **D-10:** **Remove square footage field** — not relevant for UK customers. Keep bedrooms, bathrooms, kitchens, and pets +/- counters only.
- **D-11:** Calendar is **interactive in Phase 1** — renders and allows date selection, but all dates appear available (no real availability data). Booking state stores the user's selection.
- **D-12:** **UK address format** on checkout: Address Line 1, Address Line 2, Town/City, County (optional), Postcode. No US State or ZIP fields.
- **D-13:** All pricing in **GBP (£)** using Kasey's real prices from the flyer (Standard Clean £20/hr, Deep Clean £100-£200, add-ons as listed).
- **D-14:** All copy in **UK English** (colour, organisation, etc.).

### Claude's Discretion

- Lucide icon selection for each Material Symbol — pick the closest match
- Exact stock photo selection from Unsplash/Pexels — choose images that match the cleaning/home theme
- How to implement glass-card CSS effects (backdrop-filter approach)
- Component file naming and internal structure within shadcn patterns

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| DSGN-01 | Design-3 colour tokens mapped to Tailwind CSS v4 theme variables with Plus Jakarta Sans font | Colour mapping table, font swap pattern, OKLch conversion approach |
| DSGN-02 | Shared Nav component extracted from design-3 | Nav HTML fully analysed, glassmorphism backdrop pattern documented |
| DSGN-03 | Shared Footer component extracted from design-3 | Footer structure in homepage HTML confirmed (4 columns: brand, services, company, support) |
| DSGN-04 | Homepage converted to Next.js with hero, pricing cards, Monica Difference section, testimonials, and CTA | Full homepage HTML analysed, all sections catalogued |
| DSGN-05 | Services page with service selection cards, add-on grid, and booking summary sidebar | Services HTML fully analysed, sidebar pattern confirmed |
| DSGN-06 | Schedule page (design-1 UX in design-3 style) | Design-1 schedule HTML analysed, 3-section layout documented |
| DSGN-07 | Checkout page with contact form, address form, and booking summary | Checkout HTML analysed, payment section removal noted |
| DSGN-08 | All Google-hosted images replaced with local placeholders | Google-hosted src patterns identified, Unsplash approach confirmed |
| DSGN-09 | All Material Symbols replaced with Lucide icons | Lucide icon mapping table documented in this research |
| DSGN-10 | Visual accuracy verified against design-3 screenshots via browser comparison | Screenshots read and studied; key visual patterns documented |
| UK-01 | All pricing in GBP using Kasey's real prices | Flyer read: Standard £20/hr, Deep £100-£200, add-ons confirmed |
| UK-02 | UK English throughout all copy | Identified US spellings and terms to fix in design HTML |
| UK-03 | UK address format in forms | Design has US format (State, ZIP) — replacement fields documented |
| UK-04 | Terms & conditions page reflecting Kasey's cancellation policy | Terms.jpg read; cancellation policy and payment terms confirmed |
| DOCS-01 | AGENTS.md updated with project context | Existing AGENTS.md identified (needs overwrite with project context) |
| DOCS-02 | CLAUDE.md updated with project-specific instructions | Existing CLAUDE.md identified (@AGENTS.md pattern in use) |
</phase_requirements>

---

## Summary

This phase converts three static HTML design files (design-3: Homepage, Services, Checkout) and one layout reference (design-1: Schedule) into a fully functioning Next.js 16.2.1 App Router site. The project already has a working base scaffold with Tailwind CSS v4, shadcn/ui (base-nova style), a `Button` component using CVA and `@base-ui/react`, and the `cn()` utility. Only one shadcn component is currently installed (`button.tsx`) — all other components for the design will need to be added via the `shadcn` CLI.

The core design challenge is the token remapping: design-3 uses ~35 Material Design 3 colour tokens (MD3 naming) embedded directly in Tailwind config. These must be collapsed into 8-10 shadcn semantic tokens (`--primary`, `--secondary`, `--muted`, etc.) expressed as OKLch values in `globals.css`. Plus Jakarta Sans replaces the current Geist font. The glass-card visual effect (semi-transparent white + backdrop-filter blur) is the signature design treatment — it must be implemented as a reusable CSS utility class and applied on the booking summary sidebar, hero overlay, and the "Monica Difference" stat bubble.

The schedule page does not exist in design-3 so it is adapted from design-1's layout (3-step flow: Home Details → Service Date → Arrival Window) with design-3 visual styling applied. The checkout page loses its payment section entirely — only contact info, UK address fields, and a "Confirm Booking" button remain. The BookingSummary component is shared between Services and Checkout and renders static placeholder data in Phase 1.

**Primary recommendation:** Map MD3 tokens to shadcn semantic tokens first (Task 1), then work through pages in order: Nav/Footer shared components, Homepage, Services, Schedule, Checkout, then UK localisation pass, then docs update.

---

## Standard Stack

### Core (all already in package.json)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.2.1 | App Router, RSC, next/font, next/image | Project locked |
| react | 19.2.4 | Component model | Project locked |
| tailwindcss | ^4 | Utility CSS, CSS variables via `@theme inline` | Project locked |
| shadcn (CLI) | ^4.2.0 | Component generation, base-nova style | Project locked (components.json) |
| @base-ui/react | ^1.3.0 | Accessible headless primitives (Button already uses this) | Project locked |
| class-variance-authority | ^0.7.1 | CVA for component variants | Project locked |
| clsx + tailwind-merge | ^2.1.1 / ^3.5.0 | `cn()` utility for className merging | Project locked |
| lucide-react | ^0.577.0 | Icon set (replaces Material Symbols) | Project locked (components.json iconLibrary: lucide) |
| tw-animate-css | ^1.4.0 | Animation utilities | Already imported in globals.css |

### Supporting (no new installs needed)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/font/google | built-in | Plus Jakarta Sans self-hosted | Font swap in layout.tsx |
| next/image | built-in | Optimised image rendering for stock photos | All img replacements |

### Nothing new to install

All required packages are already in `package.json`. No new `npm install` needed for Phase 1.

---

## Architecture Patterns

### Recommended Project Structure

```
app/
├── layout.tsx               # Root layout: font swap, Nav, Footer
├── globals.css              # Theme tokens (Tailwind v4 @theme inline)
├── page.tsx                 # Homepage (replaces current placeholder)
├── services/
│   └── page.tsx             # Services page
├── schedule/
│   └── page.tsx             # Schedule page
├── checkout/
│   └── page.tsx             # Checkout page
└── terms/
    └── page.tsx             # Terms & Conditions (UK-04)

components/
├── ui/                      # shadcn primitives (CLI-generated)
│   ├── button.tsx           # Already exists
│   ├── card.tsx             # Add via shadcn CLI
│   ├── input.tsx            # Add via shadcn CLI
│   ├── label.tsx            # Add via shadcn CLI
│   └── ...
├── nav.tsx                  # Shared navigation (Server Component)
├── footer.tsx               # Shared footer (Server Component)
└── booking/
    └── booking-summary.tsx  # Shared BookingSummary (static in Phase 1)

lib/
└── utils.ts                 # cn() already exists
```

### Pattern 1: Tailwind v4 Semantic Token Mapping

**What:** Replace the 35 MD3 colour tokens with 8-10 shadcn semantic CSS variables in OKLch format inside `globals.css :root { }`. The `@theme inline { }` block in globals.css connects these to Tailwind utility classes.

**When to use:** Any time a design-3 MD3 class name (e.g. `bg-primary-container`, `text-on-surface-variant`) needs to become a semantic Tailwind class (`bg-primary`, `text-muted-foreground`).

**MD3 → shadcn token mapping (the 8-10 used colours):**

```
MD3 design-3 token           → shadcn semantic token     Hex value
─────────────────────────────────────────────────────────────────────
primary (#511983)            → --primary                  oklch(0.341 0.195 307.1)
primary-container (#6a359c)  → --primary (dark variant or custom --primary-container)
on-primary (#ffffff)         → --primary-foreground       oklch(1 0 0)
secondary (#00687a)          → --secondary                oklch(0.437 0.094 213.7)
on-secondary (#ffffff)       → --secondary-foreground     oklch(1 0 0)
secondary-fixed (#abedff)    → --accent                   oklch(0.916 0.063 218.5)
on-secondary-container       → --accent-foreground        oklch(0.271 0.071 213.7)
  (#006172)
surface (#f8f9fe)            → --background               oklch(0.989 0.004 264.5)
surface-container-lowest     → --card                     oklch(1 0 0)
  (#ffffff)
surface-container-low        → --muted                    oklch(0.963 0.006 264.5)
  (#f2f3f8)
on-surface (#191c1f)         → --foreground               oklch(0.153 0.007 264.5)
on-surface-variant (#4c4451) → --muted-foreground         oklch(0.384 0.027 307.1)
primary-fixed (#f0dbff)      → custom: --primary-soft     oklch(0.918 0.062 307.1)
outline-variant (#cec3d3)    → --border                   oklch(0.839 0.018 307.1)
error (#ba1a1a)              → --destructive              oklch(0.577 0.245 27.3)
```

**Key insight:** The design uses `primary-container` (#6a359c) — a slightly lighter purple — for CTA buttons and the featured "Deep Clean" card. Map this to a custom CSS variable `--primary-container` or handle via a CVA variant. Do not map it to `--primary` or the button text-contrast ratios will be wrong.

**Example globals.css pattern (verified from existing file structure):**
```css
/* Source: existing app/globals.css + design-3 colour palette */
:root {
  --background: oklch(0.989 0.004 264.5);
  --foreground: oklch(0.153 0.007 264.5);
  --primary: oklch(0.341 0.195 307.1);        /* #511983 purple */
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.437 0.094 213.7);      /* #00687a teal */
  --secondary-foreground: oklch(1 0 0);
  --accent: oklch(0.916 0.063 218.5);         /* #abedff light teal */
  --accent-foreground: oklch(0.271 0.071 213.7);
  --muted: oklch(0.963 0.006 264.5);          /* #f2f3f8 surface-low */
  --muted-foreground: oklch(0.384 0.027 307.1);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.153 0.007 264.5);
  --border: oklch(0.839 0.018 307.1);
  --ring: oklch(0.341 0.195 307.1);           /* match primary for focus rings */
  --destructive: oklch(0.577 0.245 27.3);
  --radius: 0.75rem;                          /* design uses xl=0.75rem as default */
  /* Custom token not in shadcn default set: */
  --primary-container: oklch(0.431 0.168 307.1); /* #6a359c for CTA buttons */
}
```

### Pattern 2: Plus Jakarta Sans Font Swap

**What:** Replace the two Geist imports in `app/layout.tsx` with a single Plus Jakarta Sans import using `next/font/google`. Use `variable` mode to expose as a CSS custom property, then reference it in `@theme inline`.

**Confirmed:** Plus Jakarta Sans is available in `next/font/google` (verified against installed font-data.json).

```tsx
// Source: node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md
import { Plus_Jakarta_Sans } from 'next/font/google'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body>{children}</body>
    </html>
  )
}
```

Then in `globals.css` `@theme inline`:
```css
--font-sans: var(--font-plus-jakarta-sans), ui-sans-serif, system-ui, sans-serif;
--font-heading: var(--font-plus-jakarta-sans), ui-sans-serif, system-ui, sans-serif;
```

Remove `--font-mono` mapping (not used in this design).

### Pattern 3: Glass-Card Effect

**What:** The design's `.glass-card` class — semi-transparent white background + backdrop blur — appears on the booking summary sidebar, hero overlay stat, and "Monica Difference" percentage bubble.

**Implementation:** Define a reusable utility class in `globals.css` using `@layer utilities`:

```css
/* Source: design-3 code.html .glass-card style */
@layer utilities {
  .glass-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
}
```

Use `backdrop-filter: blur(12px)` for the booking summary sidebar (design-3 services/checkout HTML uses 12px there), `blur(16px)` for the hero overlay, `blur(20px)` for the nav bar.

### Pattern 4: Server vs. Client Component Boundary

**What:** All page and layout components are Server Components by default. Add `"use client"` only for interactive elements.

**Confirmed rules (from Next.js 16 docs):**

- `"use client"` required for: useState, event handlers (onClick, onChange), useEffect, browser APIs
- Server Components: Nav, Footer, BookingSummary (Phase 1 — static data), page shells, homepage sections

**Phase 1 client components needed:**
- `CalendarPicker` — month navigation state, date selection state
- `CounterInput` — +/- counter state (bedrooms, bathrooms, kitchens, pets)
- Mobile nav toggle (hamburger menu open/close state)

**Phase 1 server components (everything else):**
- All page.tsx files
- Nav (links only, no state needed)
- Footer
- BookingSummary (static placeholder data)
- All card/section components

### Pattern 5: shadcn Component Installation

**What:** Use the shadcn CLI (already installed as devDependency `shadcn@^4.2.0`) to add components. The CLI reads `components.json` (style: base-nova, RSC: true) and writes to `components/ui/`.

```bash
# Add components needed for Phase 1
npx shadcn add card
npx shadcn add input
npx shadcn add label
npx shadcn add badge
npx shadcn add separator
npx shadcn add radio-group
```

**Do not add:** dialog, sheet, table, select, form — not needed in Phase 1.

### Pattern 6: shadcn/ui Composition Rules (from existing button.tsx)

The project's `button.tsx` establishes the pattern all new components must follow:
- Import primitives from `@base-ui/react/[component]` (not Radix)
- Use CVA for variants
- Use `cn()` for className merging
- Export both the component and `componentVariants` from the same file
- Use `data-slot="component-name"` attribute

### Anti-Patterns to Avoid

- **Using MD3 class names directly** in JSX (e.g. `bg-primary-container`, `text-on-surface-variant`). These are not in the Tailwind config. Use semantic tokens: `bg-primary`, `text-muted-foreground`.
- **Hardcoding hex colours** in className (e.g. `bg-[#511983]`). Always use token-based utilities.
- **Adding `"use client"` to page.tsx** — pages should be Server Components; push interactivity to leaf components.
- **Using `<img>` tags** for stock photos — use `next/image` for optimisation and Core Web Vitals.
- **Using `space-x-*`** for flex gaps — use `gap-*` (shadcn styling convention from the project skill rules).
- **Importing from `@radix-ui`** — the project uses `@base-ui/react`, not Radix. The button.tsx confirms this.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font loading | Manual `<link>` in `<head>` | `next/font/google` | Automatic self-hosting, no layout shift, preloading |
| Image optimisation | `<img src="...">` | `next/image` | WebP conversion, lazy loading, CLS prevention |
| Class merging | Custom merge logic | `cn()` from `lib/utils.ts` | Already installed, handles Tailwind conflicts correctly |
| Component variants | Inline ternaries | CVA (already installed) | Type-safe, composable, consistent with existing button.tsx |
| Calendar UI | Custom date grid from scratch | Build a simple grid with `useState` | A full calendar library (react-calendar, react-day-picker) is overkill for Phase 1; the design shows a simple month grid with day cells. Build the minimal interactive version. |
| Icon components | Custom SVGs | `lucide-react` (already installed) | Consistent sizing, tree-shakeable, accessible |

**Key insight:** The calendar in Phase 1 is deliberately simple (all dates available, just state capture). Do not reach for a date picker library — it adds unnecessary complexity and styling conflicts. Build a 6-week grid with `useState` for selected date and current month.

---

## Common Pitfalls

### Pitfall 1: OKLch Colour Values Must Be Verified

**What goes wrong:** Estimating OKLch values by eye results in colours that look different from the design — especially for the purple and teal which have high chroma.

**Why it happens:** Hex-to-OKLch conversion is not intuitive; the existing `globals.css` uses OKLch exclusively.

**How to avoid:** Use a colour conversion tool (e.g. oklch.com or the CSS Color Level 4 converter) to convert each hex value precisely. The values in the token mapping table above are approximate — implementors should verify with a tool.

**Warning signs:** Purple looks desaturated or muddy; teal appears too blue or too green.

### Pitfall 2: `next/image` Requires Width/Height or Fill

**What goes wrong:** Using `<Image src="..." />` without `width`/`height` or `fill` prop throws an error.

**Why it happens:** Next.js enforces explicit dimensions to prevent layout shift.

**How to avoid:** For stock photos in a fixed container, use `fill` prop with a positioned parent (`relative` class on wrapper). For logos and icons with known dimensions, pass `width` and `height` explicitly.

### Pitfall 3: Backdrop-Filter Browser Support Requires Both Properties

**What goes wrong:** Glassmorphism effect doesn't work in Safari without `-webkit-backdrop-filter`.

**Why it happens:** Safari requires the vendor-prefixed version.

**How to avoid:** Always include both `backdrop-filter` and `-webkit-backdrop-filter` in the `.glass-card` utility class (the design HTML already does this correctly).

### Pitfall 4: MD3 Colour Names Will Cause Tailwind Errors

**What goes wrong:** Copying classes like `bg-surface-container-low` or `text-on-surface-variant` from the design HTML into JSX causes Tailwind to generate no styles (classes not defined in config).

**Why it happens:** These names are only defined in the design's inline `tailwind.config` block. The project's Tailwind v4 setup uses `globals.css` CSS variables only.

**How to avoid:** Before converting any section, create the complete token mapping first (Task 1). Then translate every MD3 class to its semantic equivalent before writing JSX.

### Pitfall 5: `@base-ui/react` Differs from Radix

**What goes wrong:** Copying shadcn component examples from shadcn.com (which default to Radix) results in broken imports.

**Why it happens:** The project's `components.json` uses `base-nova` style which uses `@base-ui/react` primitives, not `@radix-ui/*`.

**How to avoid:** Always use the shadcn CLI (`npx shadcn add [component]`) rather than manually copying code. The CLI reads `components.json` and generates the correct base-ui version. The existing `button.tsx` demonstrates the correct pattern.

### Pitfall 6: lang="en" Should Be lang="en-GB"

**What goes wrong:** Screen readers and search engines treat the page as generic English rather than British English.

**Why it happens:** Next.js scaffold sets `lang="en"` by default.

**How to avoid:** Change `<html lang="en">` to `<html lang="en-GB">` in `app/layout.tsx` as part of the UK localisation pass.

### Pitfall 7: `primary-container` Is NOT the Same as `primary`

**What goes wrong:** Mapping both `primary` (#511983) and `primary-container` (#6a359c) to `--primary` makes CTA buttons the wrong shade of purple — they should be slightly lighter/brighter than the text headings.

**Why it happens:** Designers use both tokens in design-3: headings use `primary`, CTA buttons and the featured card background use `primary-container`.

**How to avoid:** Add a custom `--primary-container` CSS variable. Reference it via an arbitrary Tailwind class `bg-[--primary-container]` or define a custom `bg-primary-container` utility in `@layer utilities`.

---

## Code Examples

### Adding a shadcn Component (verified pattern)

```bash
# Source: components.json (style: base-nova, rsc: true)
npx shadcn add card
# Generates components/ui/card.tsx using @base-ui/react primitives
```

### Correct Semantic Class Usage

```tsx
{/* RIGHT: semantic token classes */}
<div className="bg-primary text-primary-foreground rounded-full px-6 py-2.5">
  Book Now
</div>

{/* WRONG: MD3 classes not in Tailwind config */}
<div className="bg-primary-container text-on-primary-container rounded-full px-6 py-2.5">
  Book Now
</div>
```

### Glass-Card Component Pattern

```tsx
// components/booking/booking-summary.tsx (Server Component — no "use client" needed in Phase 1)
import { cn } from "@/lib/utils"

interface BookingSummaryProps {
  className?: string
}

export function BookingSummary({ className }: BookingSummaryProps) {
  return (
    <aside className={cn("glass-card rounded-3xl p-8 border border-white/40", className)}>
      <h2 className="text-xl font-extrabold text-primary mb-6">
        Booking Summary
      </h2>
      {/* Static placeholder content for Phase 1 */}
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-bold text-foreground">Deep Clean</span>
          <span className="font-bold">£150.00</span>
        </div>
      </div>
    </aside>
  )
}
```

### UK Address Form Fields

```tsx
{/* Replace US format (Street, City, State, ZIP) with: */}
<div className="space-y-4">
  <Input placeholder="Address Line 1" />
  <Input placeholder="Address Line 2 (optional)" />
  <div className="grid grid-cols-2 gap-4">
    <Input placeholder="Town / City" />
    <Input placeholder="County (optional)" />
  </div>
  <Input placeholder="Postcode" className="uppercase" />
</div>
```

### Lucide Icon Mapping (Material Symbols → Lucide)

| Material Symbol | Lucide Equivalent | Import Name |
|----------------|-------------------|-------------|
| `home` | `Home` | `import { Home } from "lucide-react"` |
| `arrow_forward` | `ArrowRight` | `import { ArrowRight } from "lucide-react"` |
| `check_circle` | `CheckCircle2` | `import { CheckCircle2 } from "lucide-react"` |
| `star` (filled) | `Star` + fill className | `import { Star } from "lucide-react"` |
| `menu` | `Menu` | `import { Menu } from "lucide-react"` |
| `cleaning_services` | `Sparkles` | `import { Sparkles } from "lucide-react"` |
| `flare` | `Zap` | `import { Zap } from "lucide-react"` |
| `local_shipping` | `Truck` | `import { Truck } from "lucide-react"` |
| `verified_user` | `ShieldCheck` | `import { ShieldCheck } from "lucide-react"` |
| `eco` | `Leaf` | `import { Leaf } from "lucide-react"` |
| `workspace_premium` | `Award` | `import { Award } from "lucide-react"` |
| `person` | `User` | `import { User } from "lucide-react"` |
| `location_on` | `MapPin` | `import { MapPin } from "lucide-react"` |
| `payments` | `CreditCard` | `import { CreditCard } from "lucide-react"` |
| `shopping_basket` | `ShoppingBasket` | `import { ShoppingBasket } from "lucide-react"` |
| `kitchen` | `Refrigerator` | `import { Refrigerator } from "lucide-react"` |
| `oven_gen` | `UtensilsCrossed` | `import { UtensilsCrossed } from "lucide-react"` |
| `window` | `AppWindow` | `import { AppWindow } from "lucide-react"` |
| `pets` | `PawPrint` | `import { PawPrint } from "lucide-react"` |
| `local_laundry_service` | `WashingMachine` | `import { WashingMachine } from "lucide-react"` |
| `nest_eco_leaf` | `Leaf` | `import { Leaf } from "lucide-react"` |
| `bed` | `Bed` | `import { Bed } from "lucide-react"` |
| `bathtub` | `Bath` | `import { Bath } from "lucide-react"` |
| `chevron_left` | `ChevronLeft` | `import { ChevronLeft } from "lucide-react"` |
| `chevron_right` | `ChevronRight` | `import { ChevronRight } from "lucide-react"` |
| `auto_awesome` | `Sparkles` | `import { Sparkles } from "lucide-react"` |

---

## Real UK Pricing (from flyer.png)

From reading `docs/kasey-generated-flyers/flyer.png`:

| Service | Price |
|---------|-------|
| Standard Clean | £20 per hour (weekly/fortnightly) |
| Deep Clean | £100 – £200 (depending on home size) |
| Bathroom Cleaning | £15 bed |
| Tidy Organisation | £70 per room |

**Add-on paid services (from flyer):**
- Ironing: £75 per basket
- Other add-ons: confirmed to be on the flyer but partially obscured

**Note:** The design HTML uses placeholder USD prices ($129, $249, $399 etc.). All of these must be replaced with the real GBP pricing structure from the flyer. For the Services page cards:
- Standard Clean: £20/hr
- Deep Clean: From £100
- Move-In/Out Clean: Contact for quote (or use the flyer's deep clean range as proxy)

---

## Design Inventory — What Needs Converting

### Homepage Sections (design-3-homepage-step-1)

1. **Nav** — fixed, glassmorphism backdrop-blur, logo text italic bold, 3 links + "Book Now" CTA rounded-full
2. **Hero** — full-width 2-column, large heading with italic secondary-coloured word, 2 CTA buttons, hero image with glass overlay stat bubble ("Trusted by 2,500+ local families")
3. **Pricing Cards** — 3 cards: Standard, Deep (featured/elevated), Move-In/Out. Deep card has dark primary-container background, others are white.
4. **Monica Difference** — 2-column: round image + 3 feature bullets (Vetted Professionals, Eco-Friendly, Satisfaction Guaranteed)
5. **Testimonials** — 3-column grid of testimonial cards with star ratings, quote, avatar
6. **CTA Banner** — full-width primary background, "Ready for your home's miracle?" + Book Now button
7. **Footer** — 4-column: brand blurb, Services links, Company links, Support links + copyright

### Services Page Sections (design-3-services-step-3)

1. **Nav** (shared)
2. **Page header** — "Choose Your Magic" h1
3. **Service cards** — 3 cards in 8-column left area, Deep Clean pre-selected with ring border and "SELECTED" badge
4. **Add-ons grid** — 2x3 icon cards with name + price (Inside Fridge, Inside Oven, Windows, Pet Hair, Laundry, Eco-Products)
5. **BookingSummary sidebar** — 4-column right area, glass-card, sticky top-28

### Schedule Page (design-1 UX + design-3 style)

1. **Nav** (shared)
2. **Page header** — "Book Your Clean"
3. **Home Details section** — number-step badge "1", bedrooms/bathrooms/kitchens/pets +/- counters (NO square footage, NO frequency dropdown in this section)
4. **Service Date section** — number-step badge "2", inline calendar month grid (Monday-first, UK week start)
5. **Arrival Window section** — number-step badge "3", radio options: Morning (8:00-11:00), Midday (11:00-14:00), Afternoon (14:00-18:00)
6. **BookingSummary sidebar** (shared component)

**UK calendar note:** Week starts Monday (Mo Tu We Th Fr Sa Su), not Sunday. The design-1 HTML shows the correct Monday-first layout.

### Checkout Page (design-3-checkout-step-4, minus payment section)

1. **Nav** (shared)
2. **Page header** — "Checkout"
3. **Contact Info section** — First Name, Last Name, Email Address, Phone Number
4. **Service Address section** — UK format fields (Address Line 1, Address Line 2, Town/City, County optional, Postcode)
5. **BookingSummary sidebar** (shared component) + "Confirm Booking" button
6. ~~Payment Method section~~ — **REMOVED per D-05**

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| `tailwind.config.js` with extend.colors | `globals.css` CSS variables via `@theme inline` (Tailwind v4) | CSS variables are used directly; no tailwind.config file needed |
| Radix UI primitives in shadcn | `@base-ui/react` primitives (base-nova style) | Import paths differ — use CLI, not manual copy from shadcn.com |
| `next/font` with `className` on `<html>` | `next/font` with `variable` option + reference in CSS | Allows multiple fonts via CSS variables; cleaner composition |
| `geist` font (current) | `Plus_Jakarta_Sans` from `next/font/google` | Replace both Geist imports in layout.tsx |

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected — Wave 0 must establish |
| Config file | None — see Wave 0 |
| Quick run command | TBD (post Wave 0) |
| Full suite command | TBD (post Wave 0) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DSGN-01 | CSS variables resolve to correct colours | manual | Visual browser check against screenshots | ❌ Wave 0 |
| DSGN-02 | Nav renders on all pages, mobile menu toggles | manual | Browser check + mobile viewport | ❌ Wave 0 |
| DSGN-03 | Footer renders on all pages | manual | Browser check | ❌ Wave 0 |
| DSGN-04 | Homepage sections all render, no blank areas | manual | Browser: `http://localhost:3000/` | ❌ Wave 0 |
| DSGN-05 | Services page renders with sidebar | manual | Browser: `http://localhost:3000/services` | ❌ Wave 0 |
| DSGN-06 | Schedule page renders all 3 sections + calendar | manual | Browser: `http://localhost:3000/schedule` | ❌ Wave 0 |
| DSGN-07 | Checkout page has no payment section | manual | Browser: `http://localhost:3000/checkout` | ❌ Wave 0 |
| DSGN-08 | No Google-hosted image URLs in source | smoke | `grep -r "lh3.googleusercontent" app/` returns 0 results | ❌ Wave 0 |
| DSGN-09 | No `material-symbols-outlined` classes in JSX | smoke | `grep -r "material-symbols" app/ components/` returns 0 | ❌ Wave 0 |
| DSGN-10 | Visual match — side-by-side screenshot comparison | manual | Browser comparison with design-3 screenshots | ❌ Wave 0 |
| UK-01 | No USD amounts ($) in rendered content | smoke | `grep -r "\\$[0-9]" app/` returns 0 results | ❌ Wave 0 |
| UK-02 | UK English spelling in copy | manual | Review copy strings | ❌ Wave 0 |
| UK-03 | Checkout form has Postcode, no State/ZIP | manual | Browser: checkout form fields | ❌ Wave 0 |
| UK-04 | Terms page exists with Kasey's policy | manual | Browser: `http://localhost:3000/terms` | ❌ Wave 0 |
| DOCS-01 | AGENTS.md has project context | smoke | `grep -i "Monica" AGENTS.md` returns matches | ❌ Wave 0 |
| DOCS-02 | CLAUDE.md has project instructions | smoke | File exists and references AGENTS.md | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** Manual browser check of the page/component changed
- **Per wave merge:** Full visual pass across all 4 pages at desktop and mobile viewport
- **Phase gate:** All 4 pages match design-3 screenshots + UK localisation confirmed before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] No test framework installed — for Phase 1 (visual conversion), browser-based manual verification is the appropriate method; automated tests are not required
- [ ] Smoke tests above (`grep` commands) can be run ad-hoc in CI or manually — no framework setup needed
- [ ] Consider adding `npm run check` script that runs the grep smoke tests as a pre-commit guard

---

## Open Questions

1. **Kasey's add-on pricing from the flyer**
   - What we know: Standard £20/hr, Deep £100-200, Bathroom £15/bed, Organisation £70/room, Ironing £75/basket
   - What's unclear: The flyer shows additional add-ons that are partially cut off in the image. The design HTML uses USD placeholder values for Inside Fridge, Inside Oven, Windows, Pet Hair, Laundry, Eco-Products
   - Recommendation: Use reasonable GBP equivalents for Phase 1 add-on prices (e.g., Fridge £25, Oven £35, Windows £40, Pet Hair £20, Laundry £25, Eco-Products £10). Kasey can correct these before launch.

2. **Logo asset format**
   - What we know: `docs/main-logo/screen.png` contains the Monica's Miracle Mop logo (purple "Monica's" script + "MIRACLE MOP" teal text with mop illustration)
   - What's unclear: The nav currently uses text-only (`italic font-bold text-purple-900 "Monica's Miracle Mop"`). Whether to use the actual logo PNG or keep text styling is not specified.
   - Recommendation: Use the actual logo PNG via `next/image` in the Nav. The design uses text, but the real logo is richer. Default to text-only (as in design-3) unless user specifies otherwise — this matches the locked decision to replicate design-3 exactly.

3. **Mobile nav implementation**
   - What we know: Design-3 HTML shows `<div class="md:hidden">` with a menu icon as placeholder, no actual drawer/sheet implemented
   - What's unclear: Full mobile menu implementation not specified in CONTEXT.md decisions
   - Recommendation: Implement a simple toggle (`useState`) that shows/hides the nav links on mobile as a dropdown. Keep it minimal for Phase 1.

---

## Sources

### Primary (HIGH confidence)
- `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md` — Font loading patterns verified
- `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md` — RSC boundary rules confirmed
- `node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md` — Font API reference
- `node_modules/next/dist/compiled/@next/font/dist/google/font-data.json` — Plus Jakarta Sans availability confirmed
- `docs/design-3-homepage-step-1/code.html` — Full MD3 colour palette extracted (all 35 tokens)
- `docs/design-3-services-step-3/code.html` — Services layout and add-on structure
- `docs/design-3-checkout-step-4/code.html` — Checkout form structure (US format confirmed, to be replaced)
- `docs/design-1-schedule-step-3/code.html` — Schedule 3-section layout
- `docs/kasey-generated-flyers/flyer.png` — Real GBP pricing confirmed
- `components/ui/button.tsx` — @base-ui/react import pattern confirmed (not Radix)
- `components.json` — style: base-nova, iconLibrary: lucide, RSC: true confirmed
- `app/globals.css` — Tailwind v4 `@theme inline` pattern and existing OKLch variables confirmed
- `app/layout.tsx` — Current Geist font setup (to be replaced)
- `package.json` — All versions confirmed; no new installs needed for Phase 1

### Secondary (MEDIUM confidence)
- `docs/main-logo/screen.png` — Logo visual confirmed (purple + teal illustration)
- `docs/design-3-homepage-step-1/screen.png` — Visual target confirmed
- `docs/design-3-services-step-3/screen.png` — Visual target confirmed
- `docs/design-3-checkout-step-4/screen.png` — Visual target confirmed (payment section visible)
- `docs/design-1-schedule-step-3/screen.png` — Schedule layout visual confirmed

### Tertiary (LOW confidence)
- Lucide icon mappings — reasonable equivalents selected but final choices are discretionary per CONTEXT.md
- OKLch colour values in token mapping table — approximate conversions; verify with oklch.com before implementation

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages verified in package.json and node_modules
- Architecture: HIGH — confirmed from existing scaffold + Next.js 16 docs
- Colour token mapping: MEDIUM — hex values from design HTML are exact; OKLch conversions are approximate
- Icon mapping: MEDIUM — reasonable Lucide equivalents, final choice is Claude's discretion
- Pitfalls: HIGH — all identified from direct code inspection

**Research date:** 2026-04-11
**Valid until:** 2026-05-11 (Tailwind v4 and shadcn are moving fast; recheck if more than 30 days pass)
