# Monica's Miracle Mop

## What This Is

A professional website for Monica's Miracle Mop, Kasey's domestic house cleaning business based in the UK. The site serves as both a marketing presence and a booking platform where customers can browse services, configure their clean, schedule a date, and book — with confirmation events added to Google Calendar and a confirmation email sent via Resend. The site also exposes its booking functionality to AI agents via WebMCP, and uses per-town and per-service landing pages for local SEO.

## Core Value

Customers can easily understand pricing, choose a service, and book a cleaning job with zero friction — no long forms, no guesswork, no deposits.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

- ✓ Next.js 16 App Router project scaffolded with TypeScript — existing
- ✓ Tailwind CSS v4 with CSS custom properties theming — existing
- ✓ shadcn/ui (base-nova style, RSC enabled) with Button component — existing
- ✓ Vercel deployment pipeline with OIDC token — existing
- ✓ Geist font family configured — existing
- ✓ cn() utility for className merging — existing

### Active

<!-- Current scope. Building toward these. -->

**Design Conversion (Priority 1 — Foundation)**
- [ ] Convert design-3 homepage HTML to Next.js App Router pages with ShadCN components
- [ ] Convert design-3 services page HTML to Next.js with ShadCN components
- [ ] Create schedule page (adapted from design-1's layout) in design-3 visual style
- [ ] Convert design-3 checkout page HTML to Next.js with ShadCN components
- [ ] Extract shared layout: Nav, Footer, page wrapper as composable components
- [ ] Map design-3's Material Design colour tokens to Tailwind CSS v4 theme variables
- [ ] Replace Google-hosted images with local placeholder/stock images
- [ ] Replace Material Symbols with Lucide icons (already in the project)
- [ ] Ensure pixel-accurate match to design-3 screenshots via browser comparison
- [ ] All new components must use ShadCN primitives and be composable

**UK Localisation**
- [ ] All pricing in GBP (£) using Kasey's real pricing from flyer
- [ ] UK English throughout (colour, organisation, etc.)
- [ ] UK address format in forms (postcode, not ZIP code)
- [ ] Copyright and legal text updated for UK

**Booking Flow & State Management**
- [ ] React Context Provider for booking state across pages (service, add-ons, schedule, contact details)
- [ ] Service selection page with main services + add-on selection with running total
- [ ] Home details step with bedroom/bathroom/kitchen/pets counters (from design-1 UX)
- [ ] Schedule page with calendar date picker and arrival window (Morning/Midday/Afternoon)
- [ ] Frequency selector with recurring booking discount display
- [ ] Checkout/confirmation page with booking summary and contact/address form
- [ ] Phase 1: No payment processing — booking confirmation only

**Google Calendar Integration**
- [ ] On booking confirmation, create Google Calendar event for Kasey's 15-min phone consultation (day before the job)
- [ ] Create second Google Calendar event for the actual cleaning job
- [ ] Calendar events include customer name, address, service type, and special notes

**Email Notifications (Resend)**
- [ ] Send booking confirmation email to customer with job details
- [ ] Send notification email to Kasey with new booking details
- [ ] React Email templates matching the site's design-3 brand

**UX Features**
- [ ] Before/after image comparison drag slider for showcasing cleaning results
- [ ] Social proof section ("Trusted by X local families" with avatars and trust badges)
- [ ] Frequency discount display (save % with recurring bookings)
- [ ] Graphical, easy-to-use forms — no long text-heavy forms

**Per-Service Landing Pages**
- [ ] Dedicated page for Standard Clean with full details, pricing breakdown, FAQ
- [ ] Dedicated page for Deep Clean with full details, pricing breakdown, FAQ
- [ ] Dedicated page for Move-In/Out Clean with full details, pricing breakdown, FAQ
- [ ] Each service page includes specific inclusions list, estimated time, and "Book This Service" CTA

**Per-Town Landing Pages (Local SEO)**
- [ ] Dynamic route template at /areas/[town] generating pages for each serviced town
- [ ] Kasey selects active towns she currently services
- [ ] Non-active towns show "Register Interest" form for future expansion
- [ ] Each town page includes local content, service availability, and booking CTA
- [ ] Structured data (LocalBusiness schema) per town page

**WebMCP Integration**
- [ ] Expose `check_availability` tool — AI agents can query available dates/times for a given area and service
- [ ] Expose `get_pricing` tool — AI agents can look up prices based on service type and property details
- [ ] Expose `book_cleaning` tool — AI agents can submit a full booking with all required details
- [ ] Expose `get_service_info` tool — AI agents can retrieve service details, coverage areas, and T&Cs
- [ ] Implement both declarative (form attributes) and imperative (navigator.modelContext) approaches
- [ ] Include llms.txt for LLM discoverability

**SEO & Standards**
- [ ] Structured data (LocalBusiness, Service, FAQPage schemas)
- [ ] Open Graph and Twitter Card meta tags
- [ ] Semantic HTML with proper heading hierarchy
- [ ] Accessible forms with proper labels and ARIA attributes

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- Payment processing (Stripe/PayPal) — Phase 1 is booking only, no deposits taken per business model
- Jobs/Careers page — Defer to v2 when Kasey is ready to expand the team
- User accounts / authentication — Not needed for Phase 1 booking flow
- Admin dashboard — Kasey manages via Google Calendar and email for now
- Dark mode — Light mode only for a consumer-facing cleaning business site
- Mobile app — Web-first, responsive design covers mobile users
- Real-time chat / chatbot — WebMCP covers AI agent interaction; human chat deferred
- Blog / content marketing — Defer to v2

## Context

**Business Context:**
- Kasey is a sole trader (domestic house cleaner) starting her business in the UK
- The business name "Monica's Miracle Mop" is a Friends TV show reference (Monica Geller)
- No deposits taken — payment on day of clean (bank transfer or cash)
- Kasey does a 15-minute phone consultation before every job to discuss keys, requirements, dos and don'ts, and T&Cs
- Cancellation policy: 24hrs notice required, under 24hrs = 50% fee, locked out = 100%

**Technical Context:**
- Existing Next.js 16.2.1 project with App Router, TypeScript, Tailwind v4, shadcn/ui
- Design-3 was created in Google Stitch as static HTML files — needs conversion to component-based Next.js
- Design-3 has 3 pages (Homepage, Services, Checkout) — missing Schedule page
- Schedule page will be adapted from design-1's layout but styled in design-3's visual language
- The logo uses blue/purple/teal colours; the design-3 palette (purple/teal Material Design tokens) complements it well
- Google Stitch designs use Google-hosted images and Material Symbols — these must be replaced

**Tooling Context:**
- Vercel and Next.js best-practice plugins and skills are installed in the development environment
- These MUST be utilised when creating all new code to ensure best-practice compliance
- Browser comparison (Chrome) should be used to verify visual accuracy against design-3 screenshots
- All components must be ShadCN-based and composable for future extensibility

**Design Reference Files (in /docs/):**
- `design-3-homepage-step-1/` — Homepage design (selected design)
- `design-3-services-step-3/` — Services/booking page design (selected design)
- `design-3-checkout-step-4/` — Checkout page design (selected design)
- `design-1-schedule-step-3/` — Schedule page UX reference (to adapt)
- `design-1-homepage-step-1/` — Home details counters UX reference
- `kasey-generated-flyers/flyer.png` — Real UK pricing reference
- `kasey-generated-flyers/terms.jpg` — Terms & Conditions reference
- `main-logo/screen.png` — Official logo
- `kasey-notes/notes.md` — Feature wishlist and competitor research

**Real Pricing (from flyer):**
- Standard Clean: £20/hour (weekly/fortnightly)
- Deep Clean: £100–£200 (depending on home size)
- Add-ons: Ironing £5/hr, Oven £25, Fridge £10, Microwave £5, Bathroom Cabinet Clean £10/per
- Busy Parent Add-Ons: Ironing Service £75, Fridge Organise £50, Bathroom Overhaul £50

## Constraints

- **Tech stack**: Next.js 16 App Router + shadcn/ui + Tailwind CSS v4 — already established, must stay
- **Design fidelity**: Final pages must visually match design-3 screenshots — verified via browser comparison
- **Components**: All UI must use ShadCN primitives; new components must be composable
- **Best practices**: Vercel/Next.js best-practice plugins MUST be used for all new code
- **No payments**: Phase 1 has no payment processing — booking confirmation only
- **UK market**: All content, pricing, and formats must be UK-appropriate (GBP, UK English, UK addresses)
- **WebMCP**: Chrome 146+ only (early preview) — implement with progressive enhancement so site works without it
- **Budget**: Minimal external service costs — Google Calendar API (free tier), Resend (free tier)

## Key Decisions

<!-- Decisions that constrain future work. Add throughout project lifecycle. -->

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Design-3 selected as base design | Kasey's preference from 4 Google Stitch options | — Pending |
| Schedule page adapted from design-1 | Design-3 missing schedule step; design-1 has clean UX with home details counters | — Pending |
| All UX features included (slider, counters, discounts, social proof) | User wants the full feature set from competitor research | — Pending |
| React Context for booking state | Need state across 4 pages without heavy state management library | — Pending |
| Google Calendar + Resend for Phase 1 | No payment processing needed; Kasey manages via calendar + email | — Pending |
| WebMCP with progressive enhancement | Cutting-edge tech (Chrome 146 only) — must not break the site for other browsers | — Pending |
| Dynamic town pages at /areas/[town] | Local SEO value for capturing "cleaner in [town]" search intent | — Pending |
| Per-service landing pages | Detailed pages improve SEO and conversion for each service type | — Pending |
| Keep design-3 colour palette as-is | Purple/teal Material Design tokens complement the logo without needing adjustment | — Pending |
| Real UK pricing from flyer | Kasey's actual prices, not placeholder USD amounts from the Stitch designs | — Pending |
| Update AGENTS.md and CLAUDE.md | Persist project context for all LLMs working on this codebase | — Pending |

---
*Last updated: 2026-03-23 after initialization*
