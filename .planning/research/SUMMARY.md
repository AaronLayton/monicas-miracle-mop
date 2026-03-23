# Project Research Summary

**Project:** Monica's Miracle Mop
**Domain:** UK domestic cleaning business website — booking flow, calendar integration, email, local SEO, WebMCP
**Researched:** 2026-03-23
**Confidence:** HIGH (stack, architecture, features), MEDIUM (WebMCP — evolving spec)

## Executive Summary

Monica's Miracle Mop is a sole-trader domestic cleaning business that needs a marketing and booking website targeting local UK homeowners. Research confirms this product type is built as a static-forward Next.js App Router site: content-heavy RSC pages for SEO and trust-building, a client-side multi-step booking flow backed by React Context, and server-side integrations with Google Calendar and Resend email triggered via a Server Action on booking submission. The established stack (Next.js 16, React 19, Tailwind v4, shadcn/ui) is already in place and must not change — six library additions have confirmed version compatibility and well-understood integration patterns.

The primary competitive differentiators are upfront pricing (no UK competitor displays prices), a self-serve multi-step booking flow (competitors use contact forms only), and transparent policies (no-deposit, 24hr cancellation) that directly address homeowner anxiety. Per-town local SEO pages (4–6 active towns with genuine unique content, not templated swaps) are the main organic acquisition channel. WebMCP — registering booking tools with `navigator.modelContext` — is a first-mover opportunity: zero UK cleaning competitors have adopted it as of March 2026.

The four critical risks requiring early mitigation are: (1) Google Calendar service account access requires a one-time manual sharing step in Kasey's Google Calendar UI that is easy to miss — verify this before writing any API code; (2) React Context booking state does not survive page refresh, requiring sessionStorage persistence designed in from the start; (3) thin or templated per-town pages trigger Google's 2025 Spam Update penalties — each indexed town page must contain genuinely unique local content; (4) `"use client"` proliferation during design conversion degrades Core Web Vitals — establish the server/client component boundary map before writing any components.

## Key Findings

### Recommended Stack

The existing stack is the foundation. Six additions are needed: `googleapis` + `google-auth-library` (Google Calendar via service account — no user OAuth), `resend` + `@react-email/components` (transactional email with React templates), `react-compare-slider` (before/after image slider), `react-day-picker` v9 + `date-fns` v4 (shadcn Calendar — v9 required for React 19 compatibility), and `schema-dts` as a dev-only type package for JSON-LD. WebMCP requires no npm package — it is a browser API guarded by feature detection. Booking state across the 4-step wizard is handled by React Context + useReducer; no external state management library needed.

See [STACK.md](.planning/research/STACK.md) for the full version table, installation commands, and alternatives considered.

**Core technologies:**
- `googleapis` 171.4.0: Google Calendar event creation — service account auth avoids OAuth user flow entirely
- `google-auth-library` 10.6.2: Required peer for googleapis service account auth
- `resend` 6.9.4: Transactional email — best DX for Next.js App Router, free tier (100/day) sufficient for this volume
- `@react-email/components` 1.0.10: React Email templates — typed props, live preview, handles email rendering quirks
- `react-day-picker` v9 + `date-fns` v4: Date selection in booking flow — v9 required for React 19; shadcn Calendar is built on it
- `react-compare-slider` 4.0.0: Before/after slider — zero deps, accessible, React 19 compatible
- `schema-dts` 1.1.5 (dev): TypeScript types for JSON-LD — zero runtime overhead

### Expected Features

Research confirms this domain has clear table stakes that are non-negotiable for trust, and a small set of genuine differentiators that no UK competitor currently implements.

**Must have (table stakes):**
- Upfront pricing display in GBP — no UK competitor shows prices; this alone is a major differentiator
- Per-service landing pages (Standard Clean, Deep Clean, Move-In/Out) — users arrive from service-specific searches
- Multi-step booking flow (4 steps: service + add-ons, home details, schedule, checkout) — phone-first is dated
- Google Calendar + Resend booking confirmation — makes bookings real for Kasey without an admin dashboard
- Trust signals: DBS check badge, insurance badge, "no deposit" badge — UK homeowners require these before hiring
- Customer testimonials — minimum 5–8 genuine testimonials; fake ones are a trust anti-pattern
- 4–6 active per-town landing pages with unique local content — primary local SEO play
- Structured data (LocalBusiness, Service, FAQPage schemas) — Google Knowledge Panel and local pack eligibility
- UK localisation (GBP, UK English, cancellation and locked-out policies clearly stated)
- Mobile-responsive design — majority of local service searches are on mobile

**Should have (competitive):**
- Before/after image comparison slider — blocked on Kasey providing real photos; do not launch with stock images
- Recurring discount display inline in booking flow — "save X% fortnightly" shown with running total
- Service area map — visual confirmation of coverage radius
- WebMCP booking tools (get_pricing, get_service_info, check_availability, book_cleaning) — first-mover in niche
- llms.txt for LLM discoverability — low-effort companion to WebMCP
- Register Interest form for unserviced towns (noindex, auto-reply via Resend)

**Defer (v2+):**
- User accounts and booking management — requires auth and a booking database; premature at this scale
- Blog / content marketing — requires ongoing content production capacity Kasey does not have as a sole trader
- Admin dashboard — Google Calendar workflow handles current volume
- Jobs/vacancies section — only relevant when Kasey begins recruiting
- Payment processing — contradicts the no-deposit business model

**Anti-features to reject outright:**
- Online payments or deposits — contradicts Kasey's explicit business model
- Live chat — cannot staff it as a sole trader; unanswered chat damages trust more than no chat
- 50+ thin templated town pages — Google spam penalty risk
- Dark mode — no UK competitor offers it; adds overhead with no brand benefit

See [FEATURES.md](.planning/research/FEATURES.md) for the full competitor analysis and prioritisation matrix.

### Architecture Approach

The site is structured as a Next.js App Router application with a clean server/client split. Marketing pages (homepage, service pages, town pages) are RSCs pre-rendered at build time with JSON-LD structured data inlined directly in page components. The booking flow (`app/book/` subtree) mounts a `BookingProvider` (React Context + useReducer) in its own layout — scoped to the booking subtree only, not the root layout. Booking submission calls a `"use server"` Server Action that validates with Zod, then calls `lib/calendar.ts` and `lib/email.ts` in parallel via `Promise.allSettled`. WebMCP tool definitions live in a single `lib/mcp-tools.ts` file consumed by both the client-side registrar component and the `/api/mcp` Route Handler.

See [ARCHITECTURE.md](.planning/research/ARCHITECTURE.md) for the full file structure, component responsibility table, data flow diagrams, and a 16-step build order.

**Major components:**
1. `BookingProvider` (React Context + useReducer) — holds all booking state across 4 steps; mounted in `app/book/layout.tsx` only
2. `lib/actions/booking.ts` (Server Action) — validates input with Zod, creates Google Calendar events, sends Resend emails; the sole mutation boundary
3. `app/areas/[town]/page.tsx` (RSC + generateStaticParams) — per-town SEO pages with LocalBusiness JSON-LD, pre-rendered at build time from `lib/towns.ts`
4. `app/services/[slug]/page.tsx` (RSC + generateStaticParams) — per-service pages with Service + FAQPage JSON-LD
5. `lib/pricing.ts` (pure functions) — shared by booking UI running total and WebMCP tools; must not be tightly coupled to React
6. `app/api/mcp/route.ts` (Route Handler) — exposes WebMCP tools for AI agent HTTP access; shares tool definitions with client-side registrar

### Critical Pitfalls

1. **Google Calendar service account 403 error** — The service account cannot access Kasey's personal Gmail calendar until she manually shares it with the service account email ("Make changes to events" permission) in the Google Calendar UI. Domain-wide delegation does not work for personal Gmail accounts. Use `calendarId: 'kasey@gmail.com'` (not `'primary'`, which resolves to the service account's own empty calendar). Verify this sharing step before writing any API code.

2. **Booking state lost on page refresh** — React Context resets on every page load. Persist booking state to `sessionStorage` inside the Context Provider using `useEffect`; restore on mount. Guard against hydration mismatches by reading sessionStorage in `useEffect`, never during render. Design this in from the start — it is a structural decision, not a hotfix.

3. **Thin town pages triggering Google spam penalty** — Google's 2025 Spam Update targets "scaled content abuse" — town pages that differ only in the town name substituted into a template. Each indexed town page must contain genuinely unique content (local landmarks, local testimonials, area-specific notes). Non-active town pages must have `noindex` in metadata. Never launch indexed town pages with placeholder content.

4. **WebMCP crashing non-Chrome browsers** — `navigator.modelContext` does not exist in Firefox, Safari, or Chrome < 146. Missing the guard throws `TypeError` and crashes the page. Always guard with `if (typeof navigator !== 'undefined' && navigator.modelContext)`. Use a `useRef` guard in `useEffect` to prevent React Strict Mode double-registration ("Duplicate tool name" error in dev).

5. **"use client" proliferation degrading Core Web Vitals** — Adding `"use client"` to parent components to suppress hook errors propagates the boundary outward, shipping server-renderable marketing content in the client bundle. Map the server/client boundary before writing any components. Static marketing sections (hero, testimonials, footer) must be Server Components. Extract only the interactive slice into a Client Component.

See [PITFALLS.md](.planning/research/PITFALLS.md) for the full pitfall list, technical debt patterns, security mistakes, UX pitfalls, and a "Looks Done But Isn't" verification checklist.

## Implications for Roadmap

Based on research, the dependency graph and pitfall-to-phase mapping suggest the following phase structure.

### Phase 1: Foundation and Design Conversion

**Rationale:** Every other phase depends on the global layout, Tailwind v4 theme tokens, and the server/client component boundary being correctly established. Design conversion is the highest-risk phase for `"use client"` proliferation — establishing the boundary map first prevents structural rework in every subsequent phase.
**Delivers:** Global layout (Nav, Footer), homepage, design system validation, Tailwind v4 `@theme` token mapping from Material Design CSS variables, component boundary map documented before any components are written.
**Addresses:** Mobile-responsive design, contact details visible above fold, service area statement, Open Graph meta tags.
**Avoids:** `"use client"` proliferation pitfall; Tailwind/Material Design token naming conflict (`--md-sys-color-*` must map through `@theme` block, never referenced directly in JSX).

### Phase 2: Service and Town SEO Pages

**Rationale:** These are pure RSCs with no external service dependencies, making them the safest next step. `lib/services.ts` and `lib/towns.ts` established here become the single source of truth for both `generateStaticParams` and the booking flow. Town pages must have genuine unique content before launch — writing them early allows content review time with Kasey.
**Delivers:** 3 per-service landing pages (Standard Clean, Deep Clean, Move-In/Out) with pricing, inclusions, FAQ accordions, and Book CTAs. 4–6 active per-town landing pages with unique content and LocalBusiness JSON-LD. Structured data (LocalBusiness, Service, FAQPage schemas) across all pages.
**Uses:** `schema-dts` for JSON-LD types; `generateStaticParams` + `dynamicParams: false`; native `<script type="application/ld+json">` (not `next/script`, which is wrong for structured data per official Next.js 16.2.1 docs).
**Avoids:** Thin town page spam penalty — review content before enabling indexation; canonical URL configuration for trailing slash consistency; noindex on inactive/Register Interest town pages.

### Phase 3: Booking Flow and State Management

**Rationale:** The booking flow is the core product feature and the most complex to build. It must be built before the integrations that depend on it — Calendar, email, and WebMCP all require booking logic. Pricing logic must be extracted to pure functions in `lib/pricing.ts` now, as WebMCP tools will call these same functions directly.
**Delivers:** Full 4-step booking flow (service + add-ons, home details, schedule, checkout) with React Context state, real-time running price total, recurring discount display, per-step validation on Continue (not only at final submit), and sessionStorage persistence.
**Uses:** `BookingProvider` (React Context + useReducer), `react-day-picker` v9 via shadcn Calendar (`npx shadcn add calendar`), `date-fns` v4, `lib/pricing.ts` pure functions.
**Avoids:** Booking state lost on refresh (sessionStorage persistence designed in from the start); global BookingProvider anti-pattern (mount in `app/book/layout.tsx` only, not root layout); PII in URL params (use Context, not search params).

### Phase 4: Google Calendar and Email Integration

**Rationale:** The Server Action integrating Google Calendar and Resend is the final piece needed before booking is end-to-end functional. Isolated from Phase 3 to allow independent testing of calendar and email before wiring into the checkout form.
**Delivers:** `submitBooking()` Server Action with Zod validation; two Google Calendar events per booking (consultation + cleaning job); two Resend emails per booking (customer confirmation + Kasey notification) using React Email templates.
**Uses:** `googleapis` 171.4.0, `google-auth-library` 10.6.2, `resend` 6.9.4, `@react-email/components` 1.0.10.
**Avoids:** Service account 403 error — verify calendar sharing with service account email before writing code; Resend API key in client bundle (always call from Server Action); parallel `Promise.allSettled` for Calendar + Resend so a calendar failure does not block the confirmation email; React Server Action duplicate-send risk (use `POST /api/send` route with idempotency guard if needed).

### Phase 5: Visual and Trust Enhancements

**Rationale:** These components enhance conversion but have external content dependencies (real before/after photos and genuine testimonials from Kasey) that make them risky to block the core launch on. Building as a distinct phase means Phase 4 can ship and be validated first.
**Delivers:** Before/after image comparison slider (blocked on Kasey providing real photos), service area map, trust badges (DBS, insurance, no-deposit), testimonials section with genuine client reviews.
**Uses:** `react-compare-slider` 4.0.0, `next/image` with `sizes` and WebP optimisation for slider images.
**Avoids:** Launching slider with stock images (wait for real photos); LCP regression from full-resolution slider images (use `next/image` quality and sizes props; lazy-load slider component).

### Phase 6: WebMCP and AI Discoverability

**Rationale:** WebMCP depends on the booking logic being complete and extracted to pure functions in `lib/pricing.ts`. It is a progressive enhancement — the site must work identically without it. It is last because it requires the highest confidence that the booking flow is stable before exposing it to AI agents.
**Delivers:** `WebMCPRegistrar` client component registering 4 tools (`get_pricing`, `get_service_info`, `check_availability`, `book_cleaning`); `/api/mcp` Route Handler for HTTP-based AI agent access; `public/llms.txt` for LLM discoverability; `lib/mcp-tools.ts` as single source of truth for tool definitions shared between both surfaces.
**Uses:** `navigator.modelContext` browser API (no npm package).
**Avoids:** Non-Chrome browser crash — `navigator.modelContext` guard is the first implementation decision; React Strict Mode double-registration — `useRef` guard in `useEffect`; tool definition drift between browser API and Route Handler (single `lib/mcp-tools.ts` import).

### Phase Ordering Rationale

- Foundation before everything — Tailwind token mapping and component boundary decisions cannot be safely retrofitted after components are written.
- SEO pages before booking flow — they have no dependencies and allow content review time for town pages before launch.
- Booking flow before integrations — Calendar and email integrations have nothing to test without a working form submitting valid data.
- Calendar and email integrated together — both triggered by the same Server Action; testing independently then wiring is safer than building the wiring blind.
- Visual enhancements after booking works — content dependencies (real photos, testimonials) make this phase externally blocked; do not let it delay the core launch.
- WebMCP last — requires stable booking logic in pure functions; the spec is still evolving; lowest risk from being deferred.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 4 (Google Calendar + Email):** Service account JSON key formatting for Vercel env vars (private key contains literal newlines) needs a confirmed encoding pattern (base64 or escaped) before implementation sprint. Resend DNS verification takes up to 48 hours — initiate at Phase 4 kickoff, not the day of integration testing.
- **Phase 6 (WebMCP):** The `navigator.modelContext` API shape is confirmed but Chrome version specifics and flag names are in flux. Re-check the Chrome Developers blog and W3C spec at Phase 6 implementation time. The `/.well-known/webmcp` discovery endpoint should be verified against the latest spec.

Phases with standard patterns (skip research during planning):
- **Phase 1 (Foundation):** Tailwind v4 `@theme` config and Next.js App Router layout are well-documented.
- **Phase 2 (SEO Pages):** `generateStaticParams`, JSON-LD inline script, and `generateMetadata` are all standard App Router patterns in official Next.js 16 docs.
- **Phase 3 (Booking Flow):** React Context + useReducer multi-step wizard is a well-understood pattern; shadcn Calendar component path is documented.
- **Phase 5 (Visual/Trust):** react-compare-slider and next/image are straightforward integrations with no research gaps.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Exact version numbers confirmed via npm registry on 2026-03-23. Official Next.js 16.2.1 docs referenced directly. react-day-picker v9 React 19 compatibility inferred from broad peer dep range; no explicit incompatibility found. |
| Features | HIGH | Competitor sites verified directly. Kasey's preferences sourced from docs/kasey-notes/notes.md (primary source). SEO effectiveness claims from MEDIUM-confidence SEO agency sources but cross-referenced. |
| Architecture | HIGH | App Router patterns sourced from official Next.js 16 docs. Server Action vs Route Handler boundary confirmed. WebMCP architecture is MEDIUM due to evolving spec. |
| Pitfalls | MEDIUM-HIGH | Google Calendar 403 pitfall confirmed by multiple community sources and googleapis GitHub issues. WebMCP pitfalls sourced from Chrome for Developers blog (HIGH). Thin content penalty sourced from Sterling Sky (trusted SEO source). |

**Overall confidence:** HIGH for Phases 1–5. MEDIUM for Phase 6 (WebMCP) due to evolving browser spec and limited stable browser support.

### Gaps to Address

- **Real photos and testimonials from Kasey:** Before/after slider and testimonials section are blocked on content that must come from Kasey. Flag as an external dependency at project kickoff — do not let it block Phase 1–4 launch.
- **Kasey's confirmed service town list:** `lib/towns.ts` needs Kasey's active service towns and postcode coverage before per-town pages can be written with accurate local content. Establish this in Phase 2 planning.
- **Resend domain verification timing:** DNS propagation can take up to 48 hours. Domain verification should be initiated at Phase 4 kickoff, not the day of integration testing. Requires access to DNS records for monicasmiraclemop.co.uk (or a mail subdomain).
- **Google service account manual setup:** Service account creation in Google Cloud Console and Kasey's calendar sharing step are manual prerequisites for Phase 4. Should be completed before the Phase 4 sprint starts and confirmed with a test event in Kasey's actual calendar (not the service account's empty calendar).
- **shadcn Calendar CLI output version:** The quality of the generated shadcn Calendar component depends on the shadcn CLI version installed. Verify the generated component uses react-day-picker v9 API (controlled `selected` prop) at implementation time; if it generates a v8-style component, apply the community upgrade guide manually.

## Sources

### Primary (HIGH confidence)
- Next.js 16.2.1 official docs — JSON-LD guide (updated 2026-03-20): https://nextjs.org/docs/app/guides/json-ld
- Chrome for Developers — WebMCP Early Preview: https://developer.chrome.com/blog/webmcp-epp
- W3C WebMCP spec (2026-03-23): https://webmachinelearning.github.io/webmcp/
- npm package registry — version queries run 2026-03-23: googleapis, resend, react-email, react-compare-slider, schema-dts, react-day-picker, date-fns, google-auth-library
- Resend official docs (confirmed March 2026): https://resend.com/docs/send-with-nextjs
- Kasey's competitor notes (primary business source): docs/kasey-notes/notes.md

### Secondary (MEDIUM confidence)
- Bright & Beautiful Nottingham (verified directly): https://www.brightandbeautifulhome.com/locations/nottingham/
- Buzzmaids End of Tenancy (verified directly): https://www.buzzmaids.co.uk/end-of-tenancy-cleaning/
- Mel's Cleaning Bristol (verified directly): https://www.melscleaning.co.uk/
- Mums Helping Hands (verified directly): https://www.mumshelpinghands.com/
- Patrick Brosset (WebMCP author) — clarifications and next steps: https://patrickbrosset.com/articles/2026-02-23-webmcp-updates-clarifications-and-next-steps/
- Sterling Sky — State of Local SEO 2026: https://www.sterlingsky.ca/the-state-of-local-seo-in-2026/
- shadcn react-day-picker v9 upgrade discussion: https://github.com/shadcn-ui/ui/discussions/6452
- googleapis/google-api-nodejs-client Issue #1574 — service account calendar access
- Google Calendar service account pattern: https://dev.to/pedrohase/create-google-calender-events-using-the-google-api-and-service-accounts-in-nodejs-22m8

### Tertiary (LOW confidence)
- BrightEdge WebMCP adoption stats (340% agent-referred transaction increase) — single source, treat as directional signal only; needs corroboration at Phase 6 planning time
- WebMCP Chrome version specifics (flag name, exact Chrome 146 enablement steps) — in flux; confirm against Chrome release notes at Phase 6 implementation time

---
*Research completed: 2026-03-23*
*Ready for roadmap: yes*
