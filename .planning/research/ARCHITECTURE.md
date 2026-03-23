# Architecture Research

**Domain:** UK domestic cleaning business website with multi-step booking flow
**Researched:** 2026-03-23
**Confidence:** HIGH (Next.js/React patterns), MEDIUM (WebMCP — Chrome 146+ preview spec)

## Standard Architecture

### System Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                        BROWSER (Client)                          │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────┐  │
│  │ Marketing    │  │ Booking Flow │  │ WebMCP Tools           │  │
│  │ Pages (RSC)  │  │ (use client) │  │ (navigator.modelContext)│  │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬─────────────┘  │
│         │                 │                      │                │
│         │        BookingContext Provider         │                │
│         │        (service, details, schedule,    │                │
│         │         contact — client state)        │                │
└─────────┼─────────────────┼──────────────────────┼───────────────┘
          │                 │                      │
┌─────────┼─────────────────┼──────────────────────┼───────────────┐
│                     NEXT.JS SERVER LAYER                         │
│  ┌───────────────┐  ┌──────────────────────────────────────────┐  │
│  │ Page RSCs     │  │ Server Actions                           │  │
│  │ app/**        │  │ - submitBooking() → Calendar + Email     │  │
│  │               │  │ - checkAvailability()                    │  │
│  └───────────────┘  └──────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ Route Handlers  app/api/                                     │  │
│  │ - /api/mcp/tools (WebMCP manifest endpoint)                  │  │
│  │ - /api/book (external agent POST — book_cleaning tool)       │  │
│  └──────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
          │                 │
┌─────────┼─────────────────┼──────────────────────────────────────┐
│                     EXTERNAL SERVICES                            │
│  ┌───────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │ Google        │  │ Resend       │  │ Vercel Edge          │   │
│  │ Calendar API  │  │ Email API    │  │ (deployment host)    │   │
│  │ (service acct)│  │ (free tier)  │  │                      │   │
│  └───────────────┘  └──────────────┘  └──────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Marketing pages | Static SEO content, hero, services overview, social proof | RSC in `app/page.tsx`, `app/services/page.tsx` |
| BookingProvider | Holds entire booking state across the 4-step flow | React Context + useReducer, `"use client"`, wraps `/book` subtree |
| BookingStep components | Render each step UI, read/write context | Client components inside `app/book/*/page.tsx` |
| Service landing pages | Per-service SEO pages with pricing tables and CTA | RSC in `app/services/[slug]/page.tsx` |
| Town landing pages | Per-town SEO pages with LocalBusiness schema | RSC in `app/areas/[town]/page.tsx`, `generateStaticParams` |
| Server Actions | Run booking submission, calendar writes, email sends on server | `lib/actions/booking.ts` — `"use server"` |
| Route Handlers | Expose WebMCP tools for AI agent consumption | `app/api/mcp/route.ts` |
| ImageComparisonSlider | Before/after drag slider | `"use client"` component with Pointer Events |
| Structured data | JSON-LD injection for each page type | Inline `<script>` in RSC page components |
| Email templates | React Email components rendered server-side | `emails/` folder, consumed by Server Action |

## Recommended Project Structure

```
app/
├── layout.tsx                  # Root layout — Nav, Footer, BookingProvider wrapper
├── page.tsx                    # Homepage — hero, services overview, social proof, slider
├── globals.css                 # Tailwind v4 theme, CSS custom properties
├── book/
│   ├── layout.tsx              # Mounts BookingProvider for all booking steps
│   ├── page.tsx                # Step 1: Service + add-on selection
│   ├── details/page.tsx        # Step 2: Home details (bedrooms, bathrooms, etc.)
│   ├── schedule/page.tsx       # Step 3: Date picker + arrival window + frequency
│   └── checkout/page.tsx       # Step 4: Contact/address form + booking summary
├── services/
│   ├── page.tsx                # Services overview page
│   └── [slug]/page.tsx         # Per-service landing (standard-clean, deep-clean, etc.)
├── areas/
│   └── [town]/page.tsx         # Per-town local SEO pages
└── api/
    └── mcp/
        └── route.ts            # WebMCP tool manifest + POST handler for AI agents

components/
├── ui/                         # shadcn/ui primitives (button, input, card, etc.)
├── booking/
│   ├── BookingProvider.tsx     # Context + useReducer for booking state
│   ├── BookingStepper.tsx      # Progress indicator across 4 steps
│   ├── ServiceCard.tsx         # Selectable service card with price
│   ├── AddOnSelector.tsx       # Add-on checkboxes with running total
│   ├── HomeDetailsForm.tsx     # Counter inputs for bedrooms/bathrooms/kitchen
│   ├── DatePicker.tsx          # Calendar grid for date selection
│   ├── ArrivalWindowPicker.tsx # Morning/Midday/Afternoon selector
│   ├── FrequencySelector.tsx   # Once/Weekly/Fortnightly with discount badge
│   └── BookingSummary.tsx      # Running total sidebar / review panel
├── layout/
│   ├── Nav.tsx                 # Site navigation with booking CTA
│   └── Footer.tsx              # Footer with address, contact, T&Cs
├── marketing/
│   ├── HeroSection.tsx         # Above-the-fold hero with CTA
│   ├── SocialProofSection.tsx  # Trust badges, avatar stack, testimonials
│   ├── ImageComparisonSlider.tsx # Before/after drag slider
│   └── ServiceGrid.tsx         # Services card grid on homepage
└── seo/
    └── JsonLd.tsx              # Typed JSON-LD injector component

lib/
├── utils.ts                    # cn() className utility (existing)
├── actions/
│   └── booking.ts              # submitBooking() Server Action
├── calendar.ts                 # Google Calendar API client (googleapis)
├── email.ts                    # Resend client initialisation
├── pricing.ts                  # Pricing calculation logic (pure functions)
├── towns.ts                    # Serviced towns data + active/inactive flags
└── services.ts                 # Service definitions (slug, name, description, pricing)

emails/
├── BookingConfirmation.tsx     # Customer confirmation email (React Email)
└── BookingNotification.tsx     # Kasey internal notification email (React Email)

public/
├── images/
│   ├── before/                 # Before cleaning images for slider
│   └── after/                  # After cleaning images for slider
└── llms.txt                    # LLM discoverability file for WebMCP
```

### Structure Rationale

- **`app/book/` subtree:** Booking steps live under a shared `layout.tsx` that mounts `BookingProvider`. This means the Context is only active for the booking flow — not the entire site — keeping state scope tight.
- **`components/booking/`:** All booking-specific components are co-located. None depend on `app/` internals, so they are portable if the route structure changes.
- **`lib/actions/booking.ts`:** Server Actions that touch external APIs (Google Calendar, Resend) are isolated here. The client never imports calendar or email clients directly.
- **`lib/towns.ts` and `lib/services.ts`:** Static data files. These are the single source of truth for `generateStaticParams` in `app/areas/[town]/page.tsx` and `app/services/[slug]/page.tsx`.
- **`emails/`:** React Email templates are pure components. They are imported by the Server Action, not exposed to the client bundle.
- **`public/llms.txt`:** Required for WebMCP AI discoverability alongside the API route.

## Architectural Patterns

### Pattern 1: BookingContext with useReducer

**What:** A single React Context wraps the entire `/book` subtree. State is a typed `BookingState` object updated via dispatched actions. Any step component reads the context without prop drilling.

**When to use:** Multi-step flows where 4+ pages need shared state, no server persistence required mid-flow (persisted only on final submission).

**Trade-offs:** Simple and zero-dependency. Does not survive page refresh — acceptable because booking abandonment restarting from step 1 is expected UX for this domain.

**Example:**
```typescript
// components/booking/BookingProvider.tsx
"use client"
import { createContext, useContext, useReducer } from "react"

type BookingState = {
  service: "standard" | "deep" | "move-in-out" | null
  addOns: string[]
  bedrooms: number
  bathrooms: number
  date: string | null
  arrivalWindow: "morning" | "midday" | "afternoon" | null
  frequency: "once" | "weekly" | "fortnightly"
  contactName: string
  contactEmail: string
  contactPhone: string
  address: string
  postcode: string
  notes: string
}

// Reducer handles typed actions: SET_SERVICE, SET_ADDON, SET_SCHEDULE, etc.
// Context exports useBooking() hook — consuming components import only the hook
```

### Pattern 2: Server Action for Booking Submission

**What:** The checkout form `<form action={submitBooking}>` calls a `"use server"` function. This function validates data with Zod, creates two Google Calendar events, sends two Resend emails, and returns a result object.

**When to use:** Mutations called only from within the Next.js app. Using Server Actions over a Route Handler avoids explicit HTTP handling and keeps type safety across the call boundary.

**Trade-offs:** Cannot be called by external clients (AI agents use the Route Handler instead). Has a 1 MB request size limit (not a concern for booking data).

**Example:**
```typescript
// lib/actions/booking.ts
"use server"
import { z } from "zod"
import { createCalendarEvents } from "@/lib/calendar"
import { sendBookingEmails } from "@/lib/email"

export async function submitBooking(formData: FormData) {
  const parsed = BookingSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { error: parsed.error.flatten() }

  await createCalendarEvents(parsed.data)   // 2 events: consultation + clean
  await sendBookingEmails(parsed.data)      // 2 emails: customer + Kasey
  return { success: true }
}
```

### Pattern 3: generateStaticParams for Town and Service Pages

**What:** Town and service pages are pre-rendered at build time. `generateStaticParams` returns the list of towns/slugs from the static data files in `lib/`. Pages not in the list return 404 (`dynamicParams: false`).

**When to use:** Any content that is known at build time and doesn't change per request. Critical for SEO — pre-rendered HTML has significantly better TTFB and indexability than on-demand rendered pages.

**Trade-offs:** Adding a new town requires a redeploy. Acceptable for a sole trader who adds towns infrequently. Vercel rebuilds are fast.

**Example:**
```typescript
// app/areas/[town]/page.tsx
import { towns } from "@/lib/towns"

export const dynamicParams = false  // 404 for unknown towns

export function generateStaticParams() {
  return towns.map((t) => ({ town: t.slug }))
}

export default async function TownPage({ params }: { params: { town: string } }) {
  const town = towns.find((t) => t.slug === params.town)
  // Render page content + inject LocalBusiness JSON-LD
}
```

### Pattern 4: JSON-LD in RSC Page Components

**What:** Each page that benefits from structured data (town pages, service pages, homepage) inlines a `<script type="application/ld+json">` directly in the RSC page component. No third-party library required — Next.js 16's official recommendation is the native `<script>` with `dangerouslySetInnerHTML`.

**When to use:** Every town page (LocalBusiness schema), every service page (Service schema), homepage (Organization schema), booking pages (no structured data needed).

**Trade-offs:** XSS risk if content contains `<` characters — mitigate by replacing `<` with `\u003c` as shown in official docs. Using `schema-dts` npm package provides TypeScript type safety for the schema objects.

**Example:**
```typescript
// app/areas/[town]/page.tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Monica's Miracle Mop",
  address: { "@type": "PostalAddress", addressLocality: town.name, addressCountry: "GB" },
  // ...
}

return (
  <main>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
    {/* page content */}
  </main>
)
```

### Pattern 5: WebMCP Progressive Enhancement

**What:** WebMCP tools are registered client-side via `navigator.modelContext.registerTool()` inside a `useEffect`. Because the API only exists in Chrome 146+, the call is guarded by a feature-detection check. The site functions identically without the API. A Route Handler at `/api/mcp` exposes the same tool definitions for AI agents that call via HTTP rather than the browser API.

**When to use:** Cutting-edge browser APIs with limited availability. Progressive enhancement ensures the booking flow works for all users while AI agents get enhanced access.

**Trade-offs:** Two surfaces to maintain (browser API + Route Handler). Mitigation: share tool definitions from a single `lib/mcp-tools.ts` file imported by both.

**Example:**
```typescript
// components/booking/WebMCPRegistrar.tsx
"use client"
import { useEffect } from "react"
import { mcpTools } from "@/lib/mcp-tools"

export function WebMCPRegistrar() {
  useEffect(() => {
    if (!("modelContext" in navigator)) return  // Progressive enhancement guard
    for (const tool of mcpTools) {
      navigator.modelContext.registerTool(tool.name, tool.description, tool.handler)
    }
    return () => {
      for (const tool of mcpTools) {
        navigator.modelContext.unregisterTool(tool.name)
      }
    }
  }, [])
  return null
}
```

## Data Flow

### Booking Submission Flow

```
User fills step 4 checkout form
    ↓
<form action={submitBooking}>   [client — BookingContext hydrates form fields]
    ↓
submitBooking(formData)         [Server Action — lib/actions/booking.ts]
    ↓ validate
Zod schema parse
    ↓ parallel
createCalendarEvents()          sendBookingEmails()
    ↓                               ↓
Google Calendar API             Resend API
  - consultation event            - customer confirmation
  - cleaning job event            - Kasey notification
    ↓                               ↓
    └──────────── success ──────────┘
    ↓
redirect to /book/confirmed     [or return error to form]
```

### BookingContext State Flow

```
BookingProvider (app/book/layout.tsx)
    ↓ provides context
Step 1: /book             → dispatch(SET_SERVICE, SET_ADDONS)
Step 2: /book/details     → dispatch(SET_HOME_DETAILS)
Step 3: /book/schedule    → dispatch(SET_DATE, SET_WINDOW, SET_FREQUENCY)
Step 4: /book/checkout    → reads full state for summary + submits
```

### AI Agent Booking Flow (WebMCP)

```
AI Agent (Chrome 146+ / external HTTP client)
    ↓
navigator.modelContext.call("book_cleaning", args)
    OR
POST /api/mcp  { tool: "book_cleaning", args: {...} }
    ↓
Route Handler (app/api/mcp/route.ts)
    ↓
Calls same submitBooking() logic (shared lib function)
    ↓
Google Calendar + Resend (identical path to browser flow)
```

### Town Page SEO Flow

```
Build time:
lib/towns.ts → generateStaticParams() → pre-render /areas/[town] for each active town

Request time (pre-rendered):
Browser → /areas/coventry → Static HTML with LocalBusiness JSON-LD
    ↓
Google crawler reads JSON-LD → LocalBusiness rich result eligible
```

### Key Data Flows Summary

1. **Booking state:** Flows client-side through React Context across 4 steps; submitted in one Server Action call.
2. **Pricing calculation:** Pure function in `lib/pricing.ts` — called client-side for running total display and server-side in the Server Action for validation.
3. **Calendar events:** Server Action → `lib/calendar.ts` → googleapis client → Google Calendar API. Service account auth, no user OAuth needed.
4. **Email sending:** Server Action → `lib/email.ts` → Resend SDK. React Email templates rendered to HTML server-side.
5. **Structured data:** Assembled inline in RSC page components from static `lib/towns.ts` / `lib/services.ts` data.
6. **WebMCP tools:** Defined once in `lib/mcp-tools.ts`, consumed by both the client-side registrar component and the `/api/mcp` Route Handler.

## Suggested Build Order

Build in dependency order — foundations before features that depend on them.

| Order | Component/System | Depends On | Rationale |
|-------|-----------------|------------|-----------|
| 1 | Layout (Nav, Footer), globals.css theme | — | Every page needs this |
| 2 | Marketing homepage | Layout | Foundation; validates design system |
| 3 | `lib/services.ts` + `lib/towns.ts` data files | — | Both service and town pages need these |
| 4 | Per-service landing pages | services.ts, Layout | Simple RSC; validates `generateStaticParams` pattern |
| 5 | Per-town landing pages + JSON-LD | towns.ts, Layout | Validates structured data pattern |
| 6 | BookingProvider + step 1 (service selection) | Layout, services.ts, pricing.ts | Establishes context architecture |
| 7 | Step 2 (home details) | BookingProvider | Simple form step |
| 8 | Step 3 (schedule/date picker) | BookingProvider | More complex UI; needs DatePicker component |
| 9 | Step 4 (checkout/summary) | BookingProvider | Reads full state |
| 10 | `lib/calendar.ts` + Server Action (no email yet) | Google Calendar credentials | Test calendar events independently |
| 11 | React Email templates + `lib/email.ts` | Resend credentials | Test emails independently |
| 12 | Wire Server Action into checkout form | Steps 9+10+11 | Integration point |
| 13 | ImageComparisonSlider | Layout | Self-contained UI component |
| 14 | `lib/mcp-tools.ts` + WebMCPRegistrar client component | Booking submission working | Depends on booking being complete |
| 15 | `/api/mcp` Route Handler | mcp-tools.ts | Shares tool definitions |
| 16 | `public/llms.txt` | All above | Final discoverability artifact |

## Scaling Considerations

This is a sole-trader booking site. Scale concerns are minimal but noted:

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-500 bookings/month | Current architecture handles this with zero changes. Vercel free tier, Resend free tier (100 emails/day), Google Calendar API (free quota). |
| 500-5k bookings/month | Resend paid plan. Google Calendar API quota monitoring. No structural changes needed. |
| 5k+ bookings/month | Google Calendar polling limits may require a queuing layer. Consider a database (Neon/PlanetScale) for booking records rather than relying solely on Calendar events. |

### Scaling Priorities

1. **First bottleneck:** Resend free tier (100 emails/day = 50 bookings/day). Upgrade to paid plan when consistently hitting this.
2. **Second bottleneck:** Google Calendar API write quota (10,000 requests/day). At 2 events per booking, this supports 5,000 bookings/day — unlikely to be hit.

## Anti-Patterns

### Anti-Pattern 1: Global BookingProvider in Root Layout

**What people do:** Mount `BookingProvider` in `app/layout.tsx` to make booking state available everywhere.

**Why it's wrong:** Every page in the site re-renders when booking state changes. The provider re-mounts on navigation away from the booking flow, losing state anyway.

**Do this instead:** Mount `BookingProvider` in `app/book/layout.tsx`. It only wraps the booking subtree, scoping state correctly and keeping the provider out of marketing pages.

### Anti-Pattern 2: Calling Google Calendar from a Client Component

**What people do:** Import `googleapis` directly in a React component, expose service account credentials via `NEXT_PUBLIC_` environment variables.

**Why it's wrong:** Service account private keys are exposed in the browser bundle. `googleapis` is a large Node.js library incompatible with Edge/browser runtimes.

**Do this instead:** All Google Calendar calls go through a Server Action or Route Handler. The googleapis client only ever runs server-side. Credentials use `GOOGLE_PRIVATE_KEY` (no `NEXT_PUBLIC_` prefix).

### Anti-Pattern 3: Duplicating Tool Definitions Between WebMCP and Route Handler

**What people do:** Write tool names, descriptions, and parameter schemas twice — once for `navigator.modelContext.registerTool()` and once in the Route Handler response.

**Why it's wrong:** Tools drift out of sync. AI agents calling the HTTP API get different tool behaviour than browser-based agents.

**Do this instead:** Define all tools in `lib/mcp-tools.ts`. Both `WebMCPRegistrar.tsx` and `app/api/mcp/route.ts` import from this single file.

### Anti-Pattern 4: Storing Booking State in URL Search Params

**What people do:** Pass service selection, dates, and customer details as URL query strings between booking steps.

**Why it's wrong:** Customer PII (name, address, phone) appears in browser history, server logs, and analytics. Step URLs become fragile to share/bookmark mid-flow.

**Do this instead:** React Context for in-progress state. Only submit data to the server at the final step. The booking confirmation page can use a reference ID in the URL if deep-linking is needed.

### Anti-Pattern 5: Rendering JSON-LD via next/script

**What people do:** Use `<Script type="application/ld+json">` from `next/script`.

**Why it's wrong:** `next/script` is optimised for executable JavaScript and applies loading strategies (defer, lazy) that may delay or skip JSON-LD injection. The official Next.js 16 docs explicitly state that native `<script>` is the correct choice for structured data.

**Do this instead:** Use a native `<script type="application/ld+json" dangerouslySetInnerHTML={...} />` in the RSC page component, with `<` replaced by `\u003c` to prevent XSS.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Google Calendar API | Server Action → `lib/calendar.ts` → googleapis with service account auth | Service account: no user OAuth, Kasey grants access to her calendar once. Private key in env var. |
| Resend | Server Action → `lib/email.ts` → Resend SDK | `import { Resend } from "resend"`. React Email templates rendered to HTML at send time. |
| WebMCP (browser) | `useEffect` in client component → `navigator.modelContext.registerTool()` | Feature-gated for Chrome 146+. Falls back silently. |
| WebMCP (HTTP) | Route Handler at `app/api/mcp/route.ts` | Handles POST with `{ tool, args }` body. Same logic as Server Action but with HTTP semantics for external callers. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| BookingProvider ↔ Step pages | React Context (`useBooking()` hook) | Step pages never accept booking state as props |
| Server Action ↔ Google Calendar | Direct function call in same Node.js process | `lib/calendar.ts` exports `createCalendarEvents()` |
| Server Action ↔ Resend | Direct function call | `lib/email.ts` exports `sendBookingEmails()` |
| Route Handler ↔ booking logic | Shared `lib/` functions (not the Server Action directly) | Server Actions can't be called from Route Handlers |
| RSC page ↔ static data | Direct import of `lib/towns.ts` / `lib/services.ts` | No API call — data is in the bundle |
| `generateStaticParams` ↔ data | Import `lib/towns.ts` at build time | Changing a town's active status requires redeploy |

## Sources

- [Next.js 16 JSON-LD guide (official, last updated 2026-03-20)](https://nextjs.org/docs/app/guides/json-ld)
- [Next.js generateStaticParams API reference](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
- [Server Actions vs Route Handlers — makerkit.dev](https://makerkit.dev/blog/tutorials/server-actions-vs-route-handlers)
- [WebMCP updates and clarifications — Patrick Brosset, 2026-02-23](https://patrickbrosset.com/articles/2026-02-23-webmcp-updates-clarifications-and-next-steps/)
- [Resend + Next.js official integration guide](https://resend.com/docs/send-with-nextjs)
- [Multi-step form with Next.js, React Context, and shadcn/ui — Medium](https://medium.com/@wdswy/how-to-build-a-multi-step-form-using-nextjs-typescript-react-context-and-shadcn-ui-ef1b7dcceec3)
- [React Email + Resend integration](https://resend.com/nextjs)
- [Google Calendar API with service account — DEV Community](https://dev.to/pedrohase/create-google-calender-events-using-the-google-api-and-service-accounts-in-nodejs-22m8)

---
*Architecture research for: Monica's Miracle Mop — UK domestic cleaning booking site*
*Researched: 2026-03-23*
