# Requirements: Monica's Miracle Mop

**Defined:** 2026-03-23
**Core Value:** Customers can easily understand pricing, choose a service, and book a cleaning job with zero friction

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Design Conversion

- [x] **DSGN-01**: Design-3 colour tokens mapped to Tailwind CSS v4 theme variables with Plus Jakarta Sans font
- [x] **DSGN-02**: Shared Nav component extracted from design-3 (logo, nav links, Book Now CTA, mobile menu)
- [x] **DSGN-03**: Shared Footer component extracted from design-3 (service links, company links, support links, copyright)
- [x] **DSGN-04**: Homepage converted to Next.js with hero, pricing cards, "Monica Difference" section, testimonials, and CTA
- [x] **DSGN-05**: Services page converted with service selection cards, add-on grid, and booking summary sidebar
- [x] **DSGN-06**: Schedule page created (design-1 UX in design-3 style) with home details, calendar, arrival window
- [x] **DSGN-07**: Checkout page converted with contact form, address form, and booking summary
- [x] **DSGN-08**: All Google-hosted images replaced with local placeholders
- [x] **DSGN-09**: All Material Symbols replaced with Lucide icons
- [x] **DSGN-10**: Visual accuracy verified against design-3 screenshots via browser comparison

### UK Localisation

- [x] **UK-01**: All pricing displayed in GBP using Kasey's real prices (£20/hr standard, £100-200 deep clean)
- [x] **UK-02**: UK English throughout all copy (colour, organisation, etc.)
- [x] **UK-03**: UK address format in forms (postcode, not ZIP; no state field)
- [x] **UK-04**: Terms & conditions page reflecting Kasey's cancellation policy and payment terms

### Booking Flow

- [ ] **BOOK-01**: React Context Provider manages booking state across all pages (service, add-ons, details, schedule, contact)
- [ ] **BOOK-02**: User can select a main service (Standard, Deep, Move-In/Out) with price displayed
- [ ] **BOOK-03**: User can select add-on services with running total updated in real-time
- [ ] **BOOK-04**: User can specify home details (bedrooms, bathrooms, kitchens, pets) via +/- counters
- [ ] **BOOK-05**: User can select a date from a calendar picker showing available dates
- [ ] **BOOK-06**: User can choose an arrival window (Morning, Midday, Afternoon)
- [ ] **BOOK-07**: User can select cleaning frequency (one-time, weekly, fortnightly) with discount shown
- [ ] **BOOK-08**: User can enter contact details (name, email, phone) and service address
- [ ] **BOOK-09**: User sees a complete booking summary before confirming
- [ ] **BOOK-10**: User receives a confirmation page after booking with job reference number

### Admin & Google Calendar Integration

- [ ] **ADMIN-01**: Hidden admin page (/admin) with Google OAuth login for Kasey
- [ ] **ADMIN-02**: Google OAuth flow obtains Calendar API access and stores refresh token securely
- [ ] **ADMIN-03**: Admin page shows connection status and allows Kasey to re-authenticate if token expires
- [ ] **GCAL-01**: On booking confirmation, a 15-min consultation call event is created on Kasey's calendar for the day before the job
- [ ] **GCAL-02**: On booking confirmation, a cleaning job event is created for the selected date and arrival window
- [ ] **GCAL-03**: Calendar events include customer name, address, service type, add-ons, and special notes

### Email Notifications

- [ ] **EMAIL-01**: Customer receives a booking confirmation email with full job details and reference number
- [ ] **EMAIL-02**: Kasey receives a new booking notification email with customer details and job summary
- [ ] **EMAIL-03**: Email templates match the design-3 brand (purple/teal palette, Plus Jakarta Sans)

### UX Enhancements

- [ ] **UX-01**: Before/after image comparison drag slider showcasing cleaning results on homepage
- [ ] **UX-02**: Social proof section with trust badges, customer count, and avatar stack
- [ ] **UX-03**: Frequency discount display (e.g., "Save 15% with weekly cleaning")
- [ ] **UX-04**: Forms are graphical and visual — icon-driven cards, not long text fields

### Service Pages

- [ ] **SERV-01**: Dedicated landing page for Standard Clean with full description, inclusions, pricing, FAQ
- [ ] **SERV-02**: Dedicated landing page for Deep Clean with full description, inclusions, pricing, FAQ
- [ ] **SERV-03**: Dedicated landing page for Move-In/Out Clean with full description, inclusions, pricing, FAQ
- [ ] **SERV-04**: Each service page has a "Book This Service" CTA that pre-selects the service in booking flow

### Local SEO (Town Pages)

- [ ] **SEO-01**: Dynamic route at /areas/[town] generates a page for each town Kasey services
- [ ] **SEO-02**: Active town pages include local content, service availability, pricing, and booking CTA
- [ ] **SEO-03**: Non-active town pages show "Register Interest" form for future coverage
- [ ] **SEO-04**: Each town page has LocalBusiness structured data (JSON-LD) with address and service area
- [ ] **SEO-05**: Open Graph and Twitter Card meta tags on all pages

### WebMCP

- [ ] **WMCP-01**: `check_availability` tool exposed — AI agents can query available dates/times for a given area
- [ ] **WMCP-02**: `get_pricing` tool exposed — AI agents can look up prices based on service type and property details
- [ ] **WMCP-03**: `book_cleaning` tool exposed — AI agents can submit a full booking
- [ ] **WMCP-04**: `get_service_info` tool exposed — AI agents can retrieve service details, areas, and T&Cs
- [ ] **WMCP-05**: llms.txt file at site root for LLM discoverability
- [ ] **WMCP-06**: Progressive enhancement — site works fully without WebMCP support

### Project Documentation

- [ ] **DOCS-01**: AGENTS.md updated with project context, design system, and development guidelines
- [ ] **DOCS-02**: CLAUDE.md updated with project-specific instructions for LLM contributors

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Payments

- **PAY-01**: Stripe integration for online payment at booking
- **PAY-02**: Invoice generation and email delivery

### Expansion

- **EXP-01**: Jobs/Careers page to recruit additional cleaners
- **EXP-02**: Admin dashboard for Kasey to manage bookings
- **EXP-03**: Customer accounts with booking history

### Content

- **CONT-01**: Blog for SEO content marketing
- **CONT-02**: Before/after photo gallery with real customer images

### Notifications

- **NOTF-01**: SMS reminders to customers before appointments
- **NOTF-02**: Automated review request emails after completed jobs

## Out of Scope

| Feature | Reason |
|---------|--------|
| Payment processing | Phase 1 is booking-only; Kasey collects payment on day of clean (bank transfer or cash) |
| User accounts / auth | Not needed for one-off booking flow; Kasey manages via Calendar + email |
| Dark mode | Consumer-facing cleaning site doesn't need it; adds design complexity |
| Mobile app | Responsive web covers mobile users adequately |
| Real-time chat | WebMCP covers AI interaction; human chat adds support burden |
| Multi-language | UK English only for now; single market |
| Online scheduling conflicts | Phase 1 assumes availability; Kasey manually manages calendar |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| DSGN-01 | Phase 1 | Complete |
| DSGN-02 | Phase 1 | Complete |
| DSGN-03 | Phase 1 | Complete |
| DSGN-04 | Phase 1 | Complete |
| DSGN-05 | Phase 1 | Complete |
| DSGN-06 | Phase 1 | Complete |
| DSGN-07 | Phase 1 | Complete |
| DSGN-08 | Phase 1 | Complete |
| DSGN-09 | Phase 1 | Complete |
| DSGN-10 | Phase 1 | Complete |
| UK-01 | Phase 1 | Complete |
| UK-02 | Phase 1 | Complete |
| UK-03 | Phase 1 | Complete |
| UK-04 | Phase 1 | Complete |
| DOCS-01 | Phase 1 | Pending |
| DOCS-02 | Phase 1 | Pending |
| BOOK-01 | Phase 2 | Pending |
| BOOK-02 | Phase 2 | Pending |
| BOOK-03 | Phase 2 | Pending |
| BOOK-04 | Phase 2 | Pending |
| BOOK-05 | Phase 2 | Pending |
| BOOK-06 | Phase 2 | Pending |
| BOOK-07 | Phase 2 | Pending |
| BOOK-08 | Phase 2 | Pending |
| BOOK-09 | Phase 2 | Pending |
| BOOK-10 | Phase 2 | Pending |
| UX-03 | Phase 2 | Pending |
| UX-04 | Phase 2 | Pending |
| ADMIN-01 | Phase 3 | Pending |
| ADMIN-02 | Phase 3 | Pending |
| ADMIN-03 | Phase 3 | Pending |
| GCAL-01 | Phase 3 | Pending |
| GCAL-02 | Phase 3 | Pending |
| GCAL-03 | Phase 3 | Pending |
| EMAIL-01 | Phase 3 | Pending |
| EMAIL-02 | Phase 3 | Pending |
| EMAIL-03 | Phase 3 | Pending |
| SERV-01 | Phase 4 | Pending |
| SERV-02 | Phase 4 | Pending |
| SERV-03 | Phase 4 | Pending |
| SERV-04 | Phase 4 | Pending |
| SEO-01 | Phase 4 | Pending |
| SEO-02 | Phase 4 | Pending |
| SEO-03 | Phase 4 | Pending |
| SEO-04 | Phase 4 | Pending |
| SEO-05 | Phase 4 | Pending |
| UX-01 | Phase 5 | Pending |
| UX-02 | Phase 5 | Pending |
| WMCP-01 | Phase 6 | Pending |
| WMCP-02 | Phase 6 | Pending |
| WMCP-03 | Phase 6 | Pending |
| WMCP-04 | Phase 6 | Pending |
| WMCP-05 | Phase 6 | Pending |
| WMCP-06 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 54 total (corrected from initial count of 42)
- Mapped to phases: 54
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-23*
*Last updated: 2026-03-23 — traceability populated by roadmapper*
