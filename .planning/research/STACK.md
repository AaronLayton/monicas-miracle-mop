# Stack Research

**Domain:** UK domestic cleaning business website — booking, calendar integration, email, WebMCP, local SEO
**Researched:** 2026-03-23
**Confidence:** MEDIUM-HIGH (see per-section notes)

---

## Existing Stack (Do Not Change)

| Technology | Version | Role |
|------------|---------|------|
| Next.js | 16.2.1 | Full-stack framework, App Router |
| React | 19.2.4 | UI rendering |
| TypeScript | 5.x | All application code |
| Tailwind CSS | 4.x | Styling via CSS custom properties |
| shadcn/ui | 4.1.0 | Component library (base-nova style, RSC enabled) |
| @base-ui/react | 1.3.0 | Unstyled headless primitives backing shadcn |
| lucide-react | 0.577.0 | Icons |
| Vercel | — | Hosting and deployment |

The stack above is decided and must not change. Everything below adds to it.

---

## Recommended Additions

### Google Calendar Integration

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `googleapis` | 171.4.0 | Google Calendar API client | Official Google Node.js client. Covers all Calendar v3 methods (events.insert, events.list). Typed. |
| `google-auth-library` | 10.6.2 | Service account authentication | Required by `googleapis` for server-to-server auth. Use a **service account** (not OAuth user flow) because the site creates events on Kasey's calendar server-side with no user login required. |

**Service account pattern** (not OAuth user flow): Create a Google service account in Google Cloud Console, share Kasey's Google Calendar with the service account email (Make Changes permission), and store the service account JSON key in Vercel environment variables. This avoids the OAuth redirect dance entirely for a single-owner calendar.

**Environment variables required:**
```
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=          # multi-line, store with literal \n
GOOGLE_CALENDAR_ID=          # Kasey's calendar ID
```

**Confidence:** HIGH — `googleapis` is the official Google-maintained package. Service account approach confirmed by multiple sources as correct pattern for server-to-server calendar writes.

---

### Email (Transactional)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `resend` | 6.9.4 | Email sending API | Best DX for Next.js App Router. Native React Email support via `react` param. Free tier covers this use case (100 emails/day). Official docs updated March 2026. |
| `@react-email/components` | 1.0.10 | Email template components | Official React Email component library. Provides Head, Html, Body, Button, Text, Section, etc. Tailored for email rendering quirks. Built-in preview server (`npx react-email dev`). |
| `react-email` | 5.2.10 | Email preview dev server | Local preview of email templates during development. Dev-only workflow tool. |

**Integration pattern:** Create email templates as React components in `src/emails/`. Send from Next.js API route at `app/api/send/route.ts`. Templates receive typed props (booking details). Call templates as functions, not JSX: `react: BookingConfirmation({ ...props })`.

**Note:** Resend requires a verified sending domain. Use a subdomain like `mail.monicasmiraclemop.co.uk`. Free tier is sufficient for this volume.

**Confidence:** HIGH — Resend official docs confirmed current, react-email actively maintained (last push March 23 2026).

---

### Image Comparison Slider

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `react-compare-slider` | 4.0.0 | Before/after cleaning photo slider | Zero dependencies. Accessible (keyboard navigation, screen reader support). Supports any React component as content (not just `<img>`). Compatible with React >=16.8 (React 19 confirmed via peer deps). Actively maintained. |

**Usage pattern:** Wrap with a Client Component (`"use client"`) since it requires DOM interaction. Pass `Next/Image` components as the two items for optimal image loading.

**Avoid:** `react-before-after-slider-component` (last published 2+ years ago, less maintained), `img-comparison-slider` (web component, requires extra setup in React 19).

**Confidence:** MEDIUM — react-compare-slider 4.0.0 peer deps confirmed (`react >=16.8`). React 19 compatibility inferred from broad peer dep range; no explicit incompatibility found.

---

### Calendar / Date Picker

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `react-day-picker` | 9.14.0 | Calendar date selection in booking flow | shadcn's Calendar component is built on react-day-picker. v9 is required for React 19 / Next.js 15+ compatibility (v8 has known issues with React 19). Use shadcn `npx shadcn add calendar` to add the Calendar component, then verify it generates a v9-compatible component. |
| `date-fns` | 4.x | Date formatting and manipulation | Peer dependency of react-day-picker v9. Tree-shakeable. Recommended for all date logic in the booking flow (formatting display strings, calculating available date ranges, recurring schedule logic). |

**Key v9 changes vs v8:** `selected` prop is now controlled; class names updated; default design changed. If `npx shadcn add calendar` generates a v8-style component, refer to the shadcn community v9 upgrade guide at https://zhxu.me/en/blog/shadcn-calendar/.

**Disable past dates** by passing a `disabled` prop: `{ before: new Date() }`. Disable unavailable days by passing an array of dates returned from a server-side availability check.

**Confidence:** MEDIUM — react-day-picker v9 + React 19 requirement verified by shadcn community discussion. shadcn's official Calendar docs reference v9 but the generated component quality depends on the shadcn CLI version in use.

---

### Structured Data (JSON-LD)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `schema-dts` | 1.1.5 | TypeScript types for Schema.org JSON-LD | Gives autocomplete and compile-time validation for `LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList` schemas. Zero runtime overhead — types only. Official Next.js docs recommend it. |

**Implementation pattern** (from official Next.js 16.2.1 docs at https://nextjs.org/docs/app/guides/json-ld): Inline `<script type="application/ld+json">` directly in Server Component page files. Use `JSON.stringify(jsonLd).replace(/</g, '\\u003c')` to prevent XSS. Do NOT use `next/script` for JSON-LD — it is structured data, not executable code.

```tsx
// app/areas/[town]/page.tsx
import type { LocalBusiness, WithContext } from 'schema-dts'

const jsonLd: WithContext<LocalBusiness> = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: "Monica's Miracle Mop",
  // ...
}

return (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
    {/* page content */}
  </>
)
```

**Schemas to implement:**
- `LocalBusiness` — on every `/areas/[town]` page with town-specific address/geo
- `Service` — on each `/services/[type]` page
- `FAQPage` — wherever FAQ sections appear (service and town pages)

**Confidence:** HIGH — implementation pattern sourced directly from official Next.js 16.2.1 docs (https://nextjs.org/docs/app/guides/json-ld, updated 2026-03-20).

---

### WebMCP (AI Agent Tool Exposure)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `navigator.modelContext` | Browser API (no npm package) | Expose booking tools to AI agents natively | W3C Draft Community Group Report (March 23 2026). `registerTool()` / `unregisterTool()` API. Native Chrome Canary support; MCP-B browser extension provides today-polyfill for Chrome/Edge/Firefox. |

**Implementation approach — progressive enhancement mandatory:**

```typescript
// lib/webmcp.ts — Client-side, must be "use client"
export function registerBookingTools() {
  if (!('modelContext' in navigator)) {
    // WebMCP not available — site works normally, just no AI agent tools
    return
  }

  navigator.modelContext.registerTool({
    name: 'get_pricing',
    description: "Returns Monica's Miracle Mop pricing for a given service type and property size",
    inputSchema: {
      type: 'object',
      properties: {
        service: { type: 'string', enum: ['standard', 'deep', 'move-in-out'] },
        bedrooms: { type: 'number' },
      },
      required: ['service'],
    },
    execute(args) {
      // Return pricing data — no side effects
      return getPricingData(args)
    },
  })
  // register additional tools...
}
```

**Four tools to register:**
1. `get_pricing` — read-only, returns price table based on service + property size
2. `get_service_info` — read-only, returns service details, coverage areas, T&Cs
3. `check_availability` — read-only, queries available dates for a given area
4. `book_cleaning` — write, submits booking (should use `annotations: { readOnlyHint: false }`)

**Browser support as of March 2026:**
- Chrome 146 Canary: native, behind feature flag
- Chrome/Edge/Firefox today: via MCP-B browser extension (polyfill, same API)
- Safari: no timeline committed

**llms.txt:** Add a static `/public/llms.txt` file summarising what the site does, available tools, and service area. Serve at `https://domain/llms.txt`. This is the low-effort companion to WebMCP for LLM crawlers. No npm package required for a static site; for dynamic content, use a Next.js Route Handler at `app/llms.txt/route.ts`.

**Confidence:** MEDIUM — API shape (`navigator.modelContext.registerTool`) confirmed by W3C spec and multiple Feb-March 2026 sources. Chrome version specifics are in flux (Canary flag, not stable release). Progressive enhancement is non-negotiable given limited browser support.

---

### Per-Town Dynamic Routes (Local SEO)

No additional packages needed. Use Next.js App Router dynamic segments:

```
app/areas/[town]/page.tsx       — individual town page
app/areas/[town]/opengraph-image.tsx  — OG image per town
```

**`generateStaticParams`** to pre-render the known towns at build time:

```typescript
export async function generateStaticParams() {
  return SERVICED_TOWNS.map((town) => ({ town: town.slug }))
}
```

Store the towns config in `src/data/towns.ts` — a typed array of `{ slug, name, county, isActive }` objects. This is all that is needed for local SEO; no CMS or database required for a sole-trader business.

**`generateMetadata`** for per-town title tags: `"House Cleaning in ${townName} | Monica's Miracle Mop"`.

**Confidence:** HIGH — standard Next.js App Router patterns, documented in official Next.js 16 docs.

---

## Supporting Libraries (Booking State)

| Library | Version | Purpose | Notes |
|---------|---------|---------|-------|
| React Context (built-in) | React 19.2.4 | Booking state across 4 pages | No external library needed. A single `BookingContext` provider wrapping the booking route group covers service selection, add-ons, schedule, and contact details. |

**Why not Zustand/Jotai/Redux:** The booking flow is a linear 4-step wizard. State does not need to persist across sessions (no accounts) and does not need to be shared across unrelated parts of the app. React Context is the right tool here — introducing a state management library adds complexity with no benefit.

---

## Installation

```bash
# Google Calendar integration
npm install googleapis google-auth-library

# Email
npm install resend @react-email/components
npm install -D react-email

# Image comparison slider
npm install react-compare-slider

# Date picker (react-day-picker v9 + date-fns)
npm install react-day-picker date-fns

# JSON-LD types (dev/type-check only)
npm install -D schema-dts

# shadcn Calendar component (uses shadcn CLI, not npm directly)
npx shadcn add calendar
```

No npm install for WebMCP — it is a browser-native API. Implement with `if ('modelContext' in navigator)` guard.

---

## Alternatives Considered

| Recommended | Alternative | Why Not |
|-------------|-------------|---------|
| `googleapis` service account | OAuth user flow via NextAuth | OAuth requires Kasey to authenticate in the browser. Service account is server-to-server with no user interaction — correct for an automated event creation flow. |
| `resend` | Nodemailer + SMTP | Nodemailer requires managing an SMTP server or third-party relay. Resend has first-class React Email support and a generous free tier. DX is significantly better. |
| `resend` | SendGrid | SendGrid is heavier, older API design, and less React-friendly. Resend is purpose-built for modern Next.js apps. |
| `@react-email/components` | MJML | MJML is a markup language, not React. Harder to compose, no type safety, no live preview in Next.js dev server. |
| `react-compare-slider` | `img-comparison-slider` (web component) | Web component version requires extra Next.js configuration for custom elements and has React 19 hydration friction. react-compare-slider is a native React component. |
| `react-day-picker` v9 + shadcn Calendar | Custom calendar build | react-day-picker v9 is production-grade, accessible, and is already the foundation of shadcn's Calendar — no reason to build from scratch. |
| `schema-dts` (types only) | `next-seo` | next-seo is Pages Router-era. App Router has first-class `generateMetadata` for meta tags. schema-dts handles JSON-LD types without adding a Pages-era abstraction. |
| React Context | Zustand / Jotai | State is local to a 4-step booking wizard. No cross-app sharing needed. No persistence needed. Zero-dependency built-in solution is correct. |
| Static `llms.txt` in `/public` | `next-llms-txt` npm package | The site's content is simple enough for a hand-authored static file. A package adds a build dependency for no meaningful benefit at this scale. |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `next-auth` / `@auth/nextjs` | No user authentication is needed in Phase 1. Adding it now creates scope creep and complexity. | No auth library — booking is anonymous. |
| `@google-calendar/client` (unofficial packages) | Multiple low-quality unofficial wrappers exist on npm. None are maintained by Google. | `googleapis` (official, 171.x) |
| `react-datepicker` | jQuery-era library. Not built for React 19 / Tailwind / shadcn. Poor accessibility. | `react-day-picker` v9 via shadcn Calendar |
| `moment.js` | Deprecated. 67kb bundle. Mutable API. | `date-fns` v4 (tree-shakeable, immutable) |
| `next/script` for JSON-LD | Official Next.js docs explicitly warn against this — JSON-LD is not executable code and `next/script` is wrong for it. | Native `<script type="application/ld+json">` in Server Component |
| React Server Actions for email sending | RSAs can be called multiple times on retry — risk of duplicate emails. | Dedicated `POST /api/send` route with idempotency guard. |

---

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| `react-compare-slider@4.0.0` | React >=16.8 | React 19.2.4 confirmed compatible via peer dep range |
| `react-day-picker@9.14.0` | React 19 | v9 required for React 19; v8 has known issues |
| `date-fns@4.x` | react-day-picker v9 | v9 peer dep; do not use date-fns v3 with react-day-picker v9 |
| `googleapis@171.4.0` | Node.js 18+ | Requires Node.js 18+; project runs Node.js 22 |
| `resend@6.9.4` | React 19.2.4 | React Email templates render server-side; compatible |
| `schema-dts@1.1.5` | TypeScript 5.x | Types only, no runtime; any TypeScript version works |

---

## Environment Variables (New, to Add to Vercel)

```bash
# Google Calendar
GOOGLE_SERVICE_ACCOUNT_EMAIL=calendar-bot@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID=kasey@gmail.com

# Resend
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=bookings@monicasmiraclemop.co.uk
```

---

## Sources

- Next.js 16.2.1 official docs (JSON-LD): https://nextjs.org/docs/app/guides/json-ld — version 16.2.1, updated 2026-03-20 — HIGH confidence
- Resend official docs: https://resend.com/docs/send-with-nextjs — confirmed current (March 2026) — HIGH confidence
- W3C WebMCP spec: https://webmachinelearning.github.io/webmcp/ — Draft Community Group Report, 2026-03-23 — MEDIUM confidence (draft, evolving)
- Patrick Brosset (WebMCP author), clarifications post: https://patrickbrosset.com/articles/2026-02-23-webmcp-updates-clarifications-and-next-steps/ — MEDIUM confidence
- Richard MacManus WebMCP implementation guide: https://ricmac.org/2026/03/11/webmcp-ai-agents-interact-website/ — MEDIUM confidence
- npm version queries (googleapis, resend, react-email, react-compare-slider, schema-dts, react-day-picker, date-fns, google-auth-library) — run 2026-03-23 — HIGH confidence for version numbers
- shadcn react-day-picker v9 upgrade discussion: https://github.com/shadcn-ui/ui/discussions/6452 — MEDIUM confidence
- Google Calendar service account pattern: https://dev.to/pedrohase/create-google-calender-events-using-the-google-api-and-service-accounts-in-nodejs-22m8 — MEDIUM confidence (community source, verified against official auth-library docs)

---

*Stack research for: Monica's Miracle Mop — booking, calendar, email, WebMCP, local SEO additions*
*Researched: 2026-03-23*
