# Feature Research

**Domain:** UK domestic cleaning business website with booking flow and local SEO
**Researched:** 2026-03-23
**Confidence:** HIGH (competitor sites verified directly, supplemented by 2026 SEO and UX research)

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Clear pricing display (upfront, no guesswork) | UK consumers rate pricing transparency as primary trust driver; hiding prices forces users to call and they don't | LOW | Kasey's actual prices from flyer: £20/hr standard, £100–200 deep clean, add-ons itemised. Static display, not a calculator. |
| Service pages per service type | Users arrive via "end of tenancy cleaner [town]" searches and expect a dedicated page — Buzzmaids, Bright & Beautiful, Mel's all have these | MEDIUM | One page per service (Standard Clean, Deep Clean, Move-In/Out). Include: what's included checklist, estimated time, pricing, FAQ accordion, Book CTA. |
| Online booking / enquiry flow | UK homeowners expect to initiate a booking without picking up the phone; phone-first sites feel dated | HIGH | Phase 1: Booking confirmation only (no payment). Multi-step: service → details → schedule → checkout. |
| Mobile-responsive design | Majority of local service searches happen on mobile; non-responsive = immediate bounce | LOW | Already handled by design-3 Tailwind implementation. Verify touch targets. |
| Contact details (phone + email visible) | Users must see contact options immediately; no visible phone number = low trust signal | LOW | Should appear in navigation and footer. No chat needed. |
| Clear service area statement | "Do you cover my town?" is the first question — users leave if they can't verify coverage | LOW | Cover on homepage and in navigation. Feeds per-town SEO strategy. |
| Customer testimonials / reviews | UK homeowners will not hire a cleaner without social proof; DBS check alone is insufficient | LOW | Minimum 5–8 genuine testimonials. Platform integration (Google Reviews) preferred over screenshots. |
| DBS check + insurance badge | UK-specific trust requirement. Bright & Beautiful, Mel's, Mums Helping Hands all prominently display this. Homeowners ask about this before booking. | LOW | Display badges above the fold or near booking CTA. |
| Terms, cancellation policy, and payment terms | Kasey's 24hr cancellation policy, locked-out policy, and "payment on completion" are key differentiators that also manage expectations | LOW | Display on checkout and as a dedicated page. |
| FAQs | Reduces pre-booking friction. Buzzmaids uses accordion FAQs on every service page. | LOW | Per-service FAQs + a global FAQ page. Cover: how key handover works, what to expect, DBS, insurance, cancellation. |
| Structured data (LocalBusiness schema) | Google uses this to populate the knowledge panel and local pack; missing it reduces local search visibility | MEDIUM | Schema.org LocalBusiness per town page, Service schema per service page, FAQPage schema on FAQ sections. |
| Open Graph / social meta tags | Required for any shared link to display correctly on WhatsApp, Facebook, etc. — word-of-mouth referrals often start here | LOW | Already in Next.js head metadata. |

---

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required, but valued.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Before/after image comparison slider | Visual proof is the strongest converter for cleaning services. Bright & Beautiful uses this and Kasey specifically called it out. Competitors using static photos lose impact. | MEDIUM | Single drag slider component per service page and homepage. Need real before/after photos from Kasey. |
| Per-town landing pages with genuine local content | City pages are a primary local SEO pillar in 2026. Google AI Overviews and ChatGPT now recommend local businesses using these pages. Copy-pasting with swapped town names is penalised — pages must have unique content (local area references, specific coverage radius, local testimonials). | HIGH | Dynamic route at /areas/[town]. Active towns: full page. Inactive towns: "Register Interest" CTA. Start with 4–6 towns Kasey genuinely services. Do NOT generate 50 thin pages. |
| Transparent recurring discount display | "Save X% with fortnightly bookings" shown inline during service selection. Incentivises recurring revenue for Kasey and gives user a reason to commit upfront. | LOW | Calculate discount in booking state. Display on service selection and checkout summary. |
| 15-minute consultation framing as a feature, not overhead | Most competitors hide their pre-job process. Kasey's consultation (keys, dos/don'ts, T&Cs) can be positioned as a premium trust signal — "we always do a consultation so nothing is left to chance." | LOW | Mention on homepage, service pages, and booking confirmation. |
| "Payment on completion, no deposits" trust badge | Explicitly stated counter to the norm. Reduces commitment anxiety — users who've been burned by deposits elsewhere will respond strongly. | LOW | Prominent badge near booking CTA. One sentence: "We never ask for a deposit. You only pay once the job is done." |
| Add-on service configuration with running price total | Buzzmaids offers service listings; none of the competitors reviewed offer real-time price calculation during booking. Interactive pricing = fewer abandoned enquiries. | MEDIUM | Running total in booking state. Add-ons: ironing £5/hr, oven £25, fridge £10, microwave £5, bathroom cabinet £10. |
| WebMCP booking tools | No UK cleaning companies are currently using WebMCP (confirmed: the protocol is in early preview as of early 2026, no service industry adoption found). First-mover advantage: AI agents (ChatGPT, Gemini, Perplexity) will be able to book directly. BrightEdge reports 340% increase in agent-referred transactions for early WebMCP adopters. | HIGH | Must use progressive enhancement — Chrome 146+ only. Site must function 100% without it. Expose: check_availability, get_pricing, book_cleaning, get_service_info. Also implement llms.txt for discoverability. |
| Graphical, step-based booking form (not a long text form) | Kasey explicitly flagged this. Design-1's counter-based home details (bedrooms, bathrooms, etc.) is a known conversion pattern. Service businesses with visual booking flows convert significantly better than those with long text forms. | HIGH | Already designed in design-1/design-3. Implement the 4-step flow: service+addons → home details → schedule → checkout. |
| Service area map | Bright & Beautiful's location map was called out by Kasey. Visual confirmation of coverage is more reassuring than a text list of towns. | MEDIUM | Static or interactive map showing covered area. Could be a simple embedded map with service radius. |
| Jobs/vacancies section (future) | Mums Helping Hands uses this to recruit cleaners for expansion. Kasey flagged this for when she is ready to grow. | LOW | Defer to v2. Placeholder page acceptable. |

---

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Online payment / deposit at booking | Looks professional; mainstream booking platforms charge upfront | Contradicts Kasey's explicit business model: "no deposits, payment on completion." Adds Stripe integration complexity, refund handling, dispute risk. | Confirm via email only. State "payment on day, bank transfer or cash" clearly. |
| User accounts / login | Customers want to "manage their bookings" | Phase 1 has no booking database to manage. Auth adds significant complexity for zero Phase 1 value. Kasey manages via Google Calendar. | Booking confirmation email with all details. Re-book by contacting Kasey. |
| Live chat widget | Feels responsive; reduces phone calls | Requires Kasey to monitor a live channel she can't staff as a sole trader. Often goes unanswered and damages trust more than having no chat. | Visible phone + email. WhatsApp Business link is a better sole-trader alternative if desired later. |
| Generic "Contact Us" form only (no inline booking) | Simpler to build | Forces users to wait for a callback; abandonment is very high for service enquiries that require back-and-forth. Modern users expect to self-serve a booking. | Multi-step booking flow that captures all required information upfront. |
| 50+ thin per-town pages (town-name swap only) | Maximises SEO coverage on paper | Google actively penalises duplicate thin content. A cluster of 50 near-identical pages will suppress ranking for the genuine service area pages. | 4–8 high-quality town pages with genuine local content. Register Interest pages for unserviced areas (minimal content, no SEO value claimed). |
| Dark mode | Expected by tech-savvy users | A domestic cleaning business site is consumer-facing, local, and trust-focused. Dark mode adds implementation overhead and brand inconsistency. No competitor offers it. | Light mode only. The design-3 palette (purple/teal) reads well in natural light conditions. |
| Blog / content marketing | Good for long-term SEO | Requires ongoing content production Kasey cannot maintain as a sole trader. A stale blog with 2 posts from launch damages credibility more than having no blog. | Per-service and per-town pages provide the SEO value without content maintenance burden. Add blog in v2 if there's capacity. |
| Admin dashboard | Centralises booking management | Google Calendar + Resend email already provides Kasey everything she needs. Building a custom admin UI delays launch significantly. | Google Calendar events for all bookings. Re-evaluate in v2. |
| Real-time availability calendar (customer-facing) | Lets users see Kasey's free slots | Requires bidirectional Google Calendar sync (read availability, block slots on booking). High complexity, easy to get wrong, creates double-booking risk. | Arrival window selection (Morning/Midday/Afternoon) + date preference. Kasey confirms manually via consultation call. |

---

## Feature Dependencies

```
Booking Flow (multi-step)
    └──requires──> Service Selection Page
                       └──requires──> Services Data (pricing, add-ons)
    └──requires──> Home Details Step
    └──requires──> Schedule Page (date + arrival window)
    └──requires──> Checkout Page (contact + address form)
    └──requires──> React Context (booking state across steps)
                       └──requires──> Booking State Shape (service, addons, home details, schedule, contact)

Booking Confirmation
    └──requires──> Booking Flow complete
    └──requires──> Google Calendar API integration (2 events: consultation + job)
    └──requires──> Resend email (customer confirmation + Kasey notification)

Per-Town Landing Pages (SEO)
    └──requires──> Dynamic route /areas/[town]
    └──requires──> Town data (active vs inactive, local content)
    └──requires──> LocalBusiness structured data per page
    └──enhances──> Booking Flow (town pre-selected from landing page)

Per-Service Landing Pages (SEO)
    └──requires──> Services data
    └──requires──> FAQPage structured data
    └──enhances──> Booking Flow (service pre-selected from landing page)

WebMCP Tools
    └──requires──> Booking Flow logic (same validation, same rules)
    └──requires──> Availability logic (date + area checking)
    └──requires──> Pricing logic (service + home details calculation)
    └──requires──> Progressive enhancement wrapper (Chrome 146+ only)
    └──enhances──> Per-Town Pages (AI agents discover coverage via get_service_info)

Before/After Slider
    ──standalone──> Requires real photos from Kasey (external dependency)

Recurring Discount Display
    └──requires──> Frequency selector in booking flow
    └──enhances──> Booking Flow (shown in running total)

Trust Signals (DBS, insurance, no-deposit badge)
    ──standalone──> Static content, no dependencies

Social Proof (testimonials, review count)
    ──standalone──> Content dependency: requires Kasey to supply testimonials
    └──enhances──> Per-Town Pages (local testimonials strengthen town-specific content)
```

### Dependency Notes

- **Booking flow requires React Context:** State must persist across 4 pages (service → details → schedule → checkout). Context is the right tool at this scale — no Redux/Zustand needed.
- **WebMCP requires booking logic to be extracted:** The booking flow validation and pricing logic must be in pure functions that both the UI booking flow and the WebMCP tools can call. If the UI logic is tightly coupled to React, WebMCP tools will need to duplicate it.
- **Per-town pages enhance booking flow:** A user arriving at /areas/belper should have "Belper" pre-selected (or at minimum pre-filled) in the booking flow. This requires the town page to pass context to the booking flow.
- **Before/after slider is blocked on Kasey:** No real content = no feature. Can ship the component with placeholder images; replace when Kasey provides photos.
- **Social proof is blocked on Kasey:** At least 5 genuine testimonials needed before launch. Fake or borrowed testimonials are a trust anti-pattern.

---

## MVP Definition

### Launch With (v1)

Minimum viable product — what's needed to validate the concept.

- [ ] Homepage with hero, services overview, trust signals (DBS + insurance + no-deposit), and social proof — establishes brand and converts visitors to enquiries
- [ ] 3 service pages (Standard Clean, Deep Clean, Move-In/Out) with full details, inclusions, FAQ accordion, and Book CTA — captures service-specific search intent
- [ ] Multi-step booking flow (service → home details → schedule → checkout) with React Context — the core product feature
- [ ] Booking confirmation: Google Calendar events + Resend confirmation email — makes bookings real for Kasey
- [ ] 4–6 per-town landing pages with genuine unique content — primary local SEO play for Kasey's service area
- [ ] Transparent pricing throughout — upfront, in GBP, matching flyer pricing
- [ ] UK localisation (GBP, UK English, UK addresses, cancellation policy clearly stated)
- [ ] Structured data (LocalBusiness, Service, FAQPage schemas)
- [ ] Mobile-responsive, accessible design matching design-3 visual language

### Add After Validation (v1.x)

Features to add once core is working.

- [ ] Before/after image comparison slider — add when Kasey provides real photos; do not launch with stock images
- [ ] Recurring discount display in booking flow — add once standard booking flow is stable
- [ ] Register Interest form for unserviced towns — low effort, captures future leads
- [ ] WebMCP booking tools (check_availability, get_pricing, book_cleaning, get_service_info) — Chrome 146+ progressive enhancement; add once booking logic is extracted to pure functions
- [ ] llms.txt for LLM discoverability — add alongside WebMCP or independently
- [ ] Service area map — add when Kasey confirms full service area

### Future Consideration (v2+)

Features to defer until product-market fit is established.

- [ ] Jobs/vacancies section — only relevant when Kasey is actively recruiting; premature now
- [ ] Blog / content marketing — requires ongoing content production capacity
- [ ] User accounts for booking management — requires auth and a booking database; only needed at scale
- [ ] Admin dashboard — only needed when Google Calendar workflow breaks down at volume
- [ ] Payment processing (no-deposit model makes this low priority; reconsider if Kasey changes her terms)
- [ ] WhatsApp Business integration — good sole-trader tool, but chat is out of scope for Phase 1

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Upfront pricing display | HIGH | LOW | P1 |
| Per-service landing pages | HIGH | MEDIUM | P1 |
| Multi-step booking flow | HIGH | HIGH | P1 |
| Google Calendar + Resend integration | HIGH | MEDIUM | P1 |
| Trust signals (DBS, insurance, no-deposit) | HIGH | LOW | P1 |
| Social proof (testimonials) | HIGH | LOW | P1 |
| Per-town landing pages (4–6 active) | HIGH | MEDIUM | P1 |
| Structured data (schema.org) | MEDIUM | MEDIUM | P1 |
| UK localisation | HIGH | LOW | P1 |
| Before/after image slider | MEDIUM | MEDIUM | P2 — blocked on Kasey providing photos |
| Recurring discount display | MEDIUM | LOW | P2 |
| Register Interest form (inactive towns) | LOW | LOW | P2 |
| Service area map | MEDIUM | MEDIUM | P2 |
| WebMCP tools | MEDIUM | HIGH | P2 — Chrome 146+ only, progressive enhancement |
| llms.txt | LOW | LOW | P2 — alongside WebMCP |
| Jobs/vacancies page | LOW | LOW | P3 |
| Blog | LOW | HIGH (ongoing) | P3 |
| User accounts | LOW | HIGH | P3 |
| Admin dashboard | LOW | HIGH | P3 |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

---

## Competitor Feature Analysis

| Feature | Bright & Beautiful (Nottingham) | Buzzmaids | Mel's Cleaning (Bristol) | Mums Helping Hands | Our Approach |
|---------|-------------------------------|-----------|--------------------------|-------------------|--------------|
| Upfront pricing | Hidden — "book a home visit" to get price | Request quote only | No pricing visible | No pricing visible | Show actual prices from Kasey's flyer — major differentiator |
| Online booking | Contact form only | Request quote form | Phone + email only | Phone only | Full multi-step booking flow |
| Before/after slider | Yes — mentioned by Kasey | No | No | No | Yes — real photos from Kasey required |
| Per-town pages | Yes — 35+ area mentions on location pages | Limited | Yes — dedicated /town pages | Limited (Nottingham/Derby/Leicester) | 4–6 active towns, quality over quantity |
| DBS + insurance badges | Yes — prominently | Yes | Yes — prominently | Yes — SSIP/Safe Contractor | Yes — above the fold |
| Recurring discount | No | No | No | No | Yes — percentage display in booking flow |
| No-deposit policy | Not stated | Not stated | Not stated | Not stated | Explicit badge — strong differentiator |
| Testimonials / reviews | Trustpilot + Google Reviews | Star rating widget | Implied (DBS/insurance as proxy) | FAQ + testimonials section | Genuine testimonials from Kasey's clients |
| Service pages | Yes — comprehensive | Yes — full service pages | Limited | Yes — multiple services | Yes — one per service with inclusions + FAQ |
| FAQ accordion | Yes (homepage) | Yes (per service) | No | Yes | Yes — per-service + global FAQ page |
| Jobs section | Yes — careers link | No | No | Yes — vacancies page | Defer to v2 |
| WebMCP | No | No | No | No | Yes — first-mover in this niche |
| Cancellation policy | Not prominent | Not visible | Not visible | Not visible | Prominent — manages expectations, builds trust |

---

## Sources

- Bright & Beautiful Nottingham: https://www.brightandbeautifulhome.com/locations/nottingham/ (verified directly)
- Buzzmaids End of Tenancy: https://www.buzzmaids.co.uk/end-of-tenancy-cleaning/ (verified directly)
- Mel's Cleaning Bristol: https://www.melscleaning.co.uk/Sparkle-Cleaning/Bristol/index.html (verified directly)
- Mums Helping Hands Vacancies: https://www.mumshelpinghands.com/vacancies/ (verified directly)
- Local SEO city landing pages effectiveness 2026: https://www.sangfroidwebdesign.com/local-seo/city-pages/ (MEDIUM confidence — SEO agency source)
- Local landing pages guide 2026: https://arc4.com/local-landing-pages/ (MEDIUM confidence)
- WebMCP travel/hospitality adoption: https://dataconomy.com/2026/02/25/google-webmcp-protocol-everything-you-need-to-know/ (MEDIUM confidence)
- WebMCP overview: https://visby.ai/blogs/what-is-google-webmcp-ai-agent-web-standard-2026 (MEDIUM confidence)
- UK cleaning trust signals: https://cleanerconnect.co.uk/get-more-cleaning-clients-in-2026/ (MEDIUM confidence)
- Service booking UX patterns: https://bookafy.com/how-to-build-an-online-booking-page-for-service-businesses-that-actually-converts/ (MEDIUM confidence)
- Booking flow conversion: https://www.getconversionux.com/blogs/the-booking-flow-blueprint----how-small-ux-tweaks-drive-big-revenue-wins (MEDIUM confidence)
- Kasey's competitor notes: docs/kasey-notes/notes.md (PRIMARY source — business owner preference)

---

*Feature research for: Monica's Miracle Mop — UK domestic cleaning website*
*Researched: 2026-03-23*
