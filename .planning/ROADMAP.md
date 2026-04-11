# Roadmap: Monica's Miracle Mop

## Overview

Six phases take Monica's Miracle Mop from a scaffolded Next.js shell to a fully deployed UK cleaning business website with a multi-step booking flow, Google Calendar and email integrations, local SEO landing pages, and WebMCP AI agent tools. Phase 1 converts the design-3 HTML into component-based Next.js pages and locks in the design system — everything downstream inherits from it. Phase 2 builds the core booking flow. Phase 3 wires up calendar and email integrations that make bookings real. Phase 4 adds SEO landing pages for services and towns. Phase 5 adds conversion-focused trust content. Phase 6 exposes the booking tools to AI agents as a first-mover differentiator.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation & Design Conversion** - Convert design-3 HTML into Next.js App Router pages with a locked-in design system, UK localisation, and project docs
- [ ] **Phase 2: Booking Flow** - Implement the complete 4-step booking wizard with React Context state, real-time pricing, and graphical form UX
- [ ] **Phase 3: Calendar & Email Integration** - Wire the booking Server Action to Google Calendar and Resend so every confirmed booking creates calendar events and sends emails
- [ ] **Phase 4: SEO & Content Pages** - Build per-service and per-town landing pages as pure RSCs with structured data and metadata
- [ ] **Phase 5: Visual & Trust Enhancements** - Add the before/after slider and social proof section that require real content from Kasey
- [ ] **Phase 6: WebMCP & AI Discoverability** - Expose booking tools via WebMCP and publish llms.txt for AI agent discoverability

## Phase Details

### Phase 1: Foundation & Design Conversion
**Goal**: The site looks exactly like design-3, runs on Next.js with a stable server/client component boundary, and all design system decisions are locked in before any feature work begins
**Depends on**: Nothing (first phase)
**Requirements**: DSGN-01, DSGN-02, DSGN-03, DSGN-04, DSGN-05, DSGN-06, DSGN-07, DSGN-08, DSGN-09, DSGN-10, UK-01, UK-02, UK-03, UK-04, DOCS-01, DOCS-02
**Success Criteria** (what must be TRUE):
  1. A visitor can open the homepage, services page, schedule page, and checkout page in a browser and each matches the design-3 screenshots when compared side-by-side in Chrome
  2. All pricing displayed on every page shows GBP amounts using Kasey's real prices from the flyer (e.g. Standard Clean £20/hr), not placeholder USD amounts
  3. Address fields throughout the site use UK format (postcode field, no US state field) and all copy uses UK English spelling
  4. The Tailwind v4 theme tokens, shared Nav, and shared Footer are the single source of truth for colours and layout — no inline design-3 Material Design tokens remain in JSX
  5. AGENTS.md and CLAUDE.md are updated with project context so any LLM contributor can orient themselves from those files alone
**Plans:** 8 plans

Plans:
- [ ] 01-01-PLAN.md — Design system foundation (colour tokens, font swap, glass-card utilities, shadcn installs)
- [ ] 01-02-PLAN.md — Shared Nav and Footer components wired into root layout
- [ ] 01-03-PLAN.md — Homepage conversion (hero, pricing cards, Monica Difference, testimonials, CTA)
- [ ] 01-04-PLAN.md — Services page with service cards, add-ons grid, and BookingSummary sidebar
- [ ] 01-05-PLAN.md — Schedule page (Home Details, Calendar, Arrival Window) with interactive components
- [ ] 01-06-PLAN.md — Checkout page with contact form, UK address form, and sidebar
- [ ] 01-07-PLAN.md — UK localisation sweep, Terms & Conditions page, image/icon verification
- [ ] 01-08-PLAN.md — Visual verification checkpoint and AGENTS.md/CLAUDE.md docs update

### Phase 2: Booking Flow
**Goal**: A customer can complete a full booking from service selection through to a confirmation page with a job reference number, with their selections preserved across all four steps
**Depends on**: Phase 1
**Requirements**: BOOK-01, BOOK-02, BOOK-03, BOOK-04, BOOK-05, BOOK-06, BOOK-07, BOOK-08, BOOK-09, BOOK-10, UX-03, UX-04
**Success Criteria** (what must be TRUE):
  1. A customer can select a service (Standard, Deep, Move-In/Out), add optional extras (ironing, oven clean, etc.), and see the running total update in real-time as they make selections
  2. A customer can specify their home details using +/- counter buttons (bedrooms, bathrooms, kitchens) and choose a cleaning frequency, with a discount percentage displayed when weekly or fortnightly is chosen
  3. A customer can pick a date from a calendar picker and select an arrival window (Morning, Midday, Afternoon), then navigate back to a previous step without losing any of their selections
  4. A customer can enter their contact details and service address using a graphical form with icon-driven fields, review their complete booking summary, and submit the booking
  5. After submitting, the customer sees a confirmation page displaying a job reference number and their booking details
**Plans**: TBD

### Phase 3: Calendar & Email Integration
**Goal**: Every confirmed booking automatically creates two events on Kasey's Google Calendar and sends two emails — one to the customer and one to Kasey — so the business runs without manual admin
**Depends on**: Phase 2
**Requirements**: ADMIN-01, ADMIN-02, ADMIN-03, GCAL-01, GCAL-02, GCAL-03, EMAIL-01, EMAIL-02, EMAIL-03
**Success Criteria** (what must be TRUE):
  1. After a test booking is submitted, Kasey's Google Calendar shows a 15-minute consultation call event for the day before the job date, and a separate cleaning job event on the job date, both containing the customer's name, address, service type, and any special notes
  2. The customer receives a confirmation email at their provided address showing their job reference number, service details, date, arrival window, and Kasey's cancellation policy
  3. Kasey receives a notification email showing the new customer's name, phone number, address, and full job summary — everything she needs to prepare for the consultation call
  4. Kasey can visit /admin, log in with Google OAuth, and see whether the Calendar API connection is active; if the token has expired she can re-authenticate without developer intervention
**Plans**: TBD

### Phase 4: SEO & Content Pages
**Goal**: Customers arriving from Google searches for specific services or local towns land on purpose-built pages with complete pricing, inclusions, FAQ content, and a direct booking CTA
**Depends on**: Phase 1
**Requirements**: SERV-01, SERV-02, SERV-03, SERV-04, SEO-01, SEO-02, SEO-03, SEO-04, SEO-05
**Success Criteria** (what must be TRUE):
  1. A visitor can navigate to /services/standard-clean, /services/deep-clean, and /services/move-in-out-clean and each page shows the service description, inclusions list, pricing, FAQ section, and a "Book This Service" button that starts the booking flow with that service pre-selected
  2. A visitor can navigate to /areas/[town] for each active town Kasey services and the page contains unique local content (not templated swaps), service availability, pricing, and a booking CTA
  3. Inactive town pages exist at /areas/[town] but show a "Register Interest" form and are marked noindex so they do not appear in Google search results
  4. Viewing page source on any service or town page shows a valid JSON-LD script block containing LocalBusiness, Service, or FAQPage structured data with no syntax errors
  5. Sharing any page URL on social media renders the correct Open Graph title, description, and image (verifiable in og:title and og:image meta tags in page source)
**Plans**: TBD

### Phase 5: Visual & Trust Enhancements
**Goal**: The homepage communicates trust and demonstrates cleaning quality through real visual proof, converting hesitant visitors into booking customers
**Depends on**: Phase 1
**Requirements**: UX-01, UX-02
**Success Criteria** (what must be TRUE):
  1. A visitor to the homepage can drag a slider to compare a before and after cleaning photo, with the slider accessible via keyboard and functional on both desktop and mobile
  2. The homepage displays a social proof section showing trust badges (DBS check, insured, no deposit required), a customer count, and an avatar stack — visible without scrolling past the hero on desktop
**Plans**: TBD

### Phase 6: WebMCP & AI Discoverability
**Goal**: AI agents using Chrome 146+ can discover Monica's Miracle Mop, query pricing and availability, and submit bookings on behalf of customers — without breaking the site for any other browser
**Depends on**: Phase 2, Phase 3
**Requirements**: WMCP-01, WMCP-02, WMCP-03, WMCP-04, WMCP-05, WMCP-06
**Success Criteria** (what must be TRUE):
  1. An AI agent with WebMCP support can call get_pricing with a service type and property size and receive the correct GBP price in response
  2. An AI agent can call check_availability, get_service_info, and book_cleaning successfully via the /api/mcp Route Handler without requiring a browser session
  3. A file exists at /llms.txt on the live site describing the site's capabilities and available tools in plain text
  4. Loading the site in Firefox or Safari (without WebMCP support) produces no JavaScript errors and all booking functionality works identically to Chrome
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

Note: Phases 4 and 5 depend only on Phase 1 and could be planned earlier, but are sequenced after the core booking system for focus.

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Design Conversion | 0/8 | Planning complete | - |
| 2. Booking Flow | 0/TBD | Not started | - |
| 3. Calendar & Email Integration | 0/TBD | Not started | - |
| 4. SEO & Content Pages | 0/TBD | Not started | - |
| 5. Visual & Trust Enhancements | 0/TBD | Not started | - |
| 6. WebMCP & AI Discoverability | 0/TBD | Not started | - |
