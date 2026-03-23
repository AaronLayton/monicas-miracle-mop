# Pitfalls Research

**Domain:** UK domestic cleaning business website — Next.js conversion, booking flow, Google Calendar, Resend, WebMCP, local SEO
**Researched:** 2026-03-23
**Confidence:** MEDIUM-HIGH (most claims verified against official docs or multiple sources; WebMCP findings HIGH due to direct Chrome Developers source)

---

## Critical Pitfalls

### Pitfall 1: Google Calendar Service Account Cannot Access Personal Gmail Calendar Without Manual Sharing

**What goes wrong:**
The service account is created in Google Cloud Console and used in the API route, but all calls return 403 "The caller does not have permission." The code is correct — the fundamental problem is that a service account is its own Google identity and has zero access to Kasey's personal Gmail calendar by default. Domain-wide delegation (the usual server-to-server workaround) only works for Google Workspace accounts, not personal @gmail.com accounts.

**Why it happens:**
Documentation and tutorials focus on Google Workspace setups. Developers assume creating a service account and enabling the Calendar API is sufficient. The required manual sharing step is buried and easy to miss.

**How to avoid:**
1. Create the service account in Google Cloud Console.
2. Note the service account's full email address (e.g., `mop-booking@project-id.iam.gserviceaccount.com`).
3. In Kasey's Google Calendar UI (not the API), open calendar settings and share the calendar with that service account email, granting "Make changes to events" permission.
4. In the API route, use `calendarId: 'kasey@gmail.com'` (the owner's email), not `'primary'`, since `'primary'` resolves to the service account's own empty calendar.
5. Store the service account JSON key in Vercel environment variables — never commit it.

**Warning signs:**
- 403 "The caller does not have permission" errors even with correct scopes
- Events appearing in a mysterious empty calendar that isn't Kasey's
- Working in dev but failing in production (usually because `GOOGLE_SERVICE_ACCOUNT_KEY` env var is missing or malformed as JSON)

**Phase to address:** Google Calendar Integration phase — verify sharing step as the first thing done before writing any API code.

---

### Pitfall 2: React Context Booking State Lost on Page Refresh or Direct URL Navigation

**What goes wrong:**
The booking Context Provider wraps the app but state lives only in memory. If a user bookmarks the checkout URL, refreshes mid-flow, or is sent a link, they arrive at step 4 with empty state — the booking summary is blank, required fields are missing, and the form submission either fails silently or throws.

**Why it happens:**
React Context is not persistent. It resets on every page load. Multi-step flows that span separate URL routes (e.g. `/book/services` → `/book/schedule` → `/book/checkout`) look like they share state but each hard-navigation re-mounts the provider.

**How to avoid:**
- Persist booking state to `sessionStorage` inside the Context Provider using a `useEffect` that syncs on every change.
- On provider mount, read from `sessionStorage` to restore state.
- Add a `suppressHydrationWarning` guard or initialise from `sessionStorage` in a `useEffect` (not during render) to avoid hydration mismatches — `sessionStorage` is undefined during server render.
- Alternative: encode essential state as URL search params for sharable/resumable flows (simpler, but exposes pricing data in the URL).

**Warning signs:**
- Hydration mismatch error: "Text content does not match server-rendered HTML" on booking pages
- Context value is `undefined` on first render of a booking step page
- Checkout form submits with no service selected

**Phase to address:** Booking Flow & State Management phase — design persistence strategy before writing any booking step components.

---

### Pitfall 3: Thin/Templated Town Pages Triggering Google Spam Penalties

**What goes wrong:**
The `/areas/[town]` dynamic route generates 10–20 town pages where the only difference is the town name substituted into a template. Google's 2025 Spam Update was specifically aggressive about "scaled content abuse" — mass-produced location pages with swapped place names. Pages rank poorly or are deindexed.

**Why it happens:**
Programmatic local SEO pages are tempting because they're cheap to generate. The mistake is treating them as purely technical (dynamic route + town name in metadata) rather than as genuinely distinct content. A page for "cleaning in Northampton" and "cleaning in Kettering" that differ only in the town name provide zero unique value.

**How to avoid:**
- Each active town page must contain content unique to that area: local landmarks, neighbourhoods, travel notes, area-specific scheduling notes, local testimonials.
- Use `generateStaticParams` with only Kasey's real service towns — do not generate speculative pages for areas she does not cover.
- Non-active towns ("Register Interest") should be `noindex` in metadata or gated behind a form — do not let thin placeholder pages get indexed.
- Add `LocalBusiness` JSON-LD schema to each town page with the specific `areaServed` field.
- Canonical URLs must be self-referencing; avoid letting `/areas/northampton` and `/areas/northampton/` both render.

**Warning signs:**
- Google Search Console "Thin content with little or no added value" manual action
- Town pages deindexed: run `site:yourdomain.com/areas/` and see fewer results than expected
- All town pages have identical word counts in Screaming Frog crawl

**Phase to address:** Per-Town Landing Pages (Local SEO) phase — write actual unique content per town before enabling indexation. Do not launch indexed town pages with placeholder content.

---

### Pitfall 4: WebMCP Breaks Standard Forms or Registration Crashes Non-Chrome Browsers

**What goes wrong:**
Two separate failure modes:
1. Imperative `navigator.modelContext.registerTool()` called without a feature-detection guard causes `TypeError: Cannot read properties of undefined` in Firefox, Safari, and Chrome < 146, crashing the entire page.
2. React's Strict Mode double-mounts components, causing `registerTool()` to be called twice for the same tool name, throwing a "Duplicate tool name" error in development.

**Why it happens:**
`navigator.modelContext` is Chrome 146+ only (behind a flag in early preview). It does not exist in any other browser. Missing the existence check breaks progressive enhancement. The React Strict Mode issue affects anyone developing in Next.js dev mode, which runs Strict Mode by default.

**How to avoid:**
- Always guard imperative registrations: `if (typeof navigator !== 'undefined' && navigator.modelContext) { ... }`
- Use `useEffect` with a `useRef` guard to prevent double-registration in React Strict Mode:
  ```typescript
  const registered = useRef(false);
  useEffect(() => {
    if (registered.current || !navigator.modelContext) return;
    registered.current = true;
    navigator.modelContext.registerTool(...);
  }, []);
  ```
- For declarative API: `toolname` and `tooldescription` attributes on forms are inert in non-Chrome browsers — no guard needed, but TypeScript types must be extended to avoid compilation errors (add a `.d.ts` declaration for custom HTML attributes).
- Never expose sensitive form fields (pricing logic, customer details) through WebMCP tool schemas.
- Add `/.well-known/webmcp` to Next.js middleware exclusions if using i18n/locale middleware — redirects break agent discovery.

**Warning signs:**
- `TypeError: Cannot read properties of undefined (reading 'registerTool')` in browser console in Firefox/Safari
- "Duplicate tool name" errors appearing only in `next dev`, not production
- TypeScript compilation errors: "Property 'toolname' does not exist on type 'DetailedHTMLProps'"

**Phase to address:** WebMCP Integration phase — progressive enhancement must be the first design decision, not a retrofit.

---

### Pitfall 5: "use client" Proliferation Destroying Server Component Benefits

**What goes wrong:**
During design conversion, every component that uses `onClick`, `useState`, or shadcn/ui interactive components gets `"use client"` added. Because components are nested, the directive propagates upward — large page sections that could be server-rendered end up in the client bundle. The result is slow initial load and SEO-degrading delayed hydration.

**Why it happens:**
The quick fix to any "hooks in server component" error is to add `"use client"` at the top of the file. This works but is usually too coarse-grained. Developers from a Pages Router background don't think in terms of server/client boundaries.

**How to avoid:**
- During design conversion, map each design section to Server or Client before writing a single line of component code.
- Rule of thumb: only components that handle browser events, use hooks, or need Web APIs need `"use client"`. Static marketing sections (hero, features, testimonials, footer) should be Server Components.
- Extract just the interactive slice into a Client Component rather than marking its parent: e.g., a `<BookingCTA>` button client component inside a server-rendered hero section.
- Audit with Next.js bundle analyser after conversion: if the client bundle exceeds 200KB for a marketing page, something's wrong.

**Warning signs:**
- Every component file in the project starts with `"use client"`
- No Server Components exist in the page tree
- Lighthouse "Total Blocking Time" is high for a content page with minimal JS

**Phase to address:** Design Conversion phase — establish the component boundary map before writing components.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| `"use client"` on every component | Eliminates boundary errors | Unnecessary client JS, worse Core Web Vitals | Never — add it surgically |
| Inline styles copied from design HTML | Pixel-accurate in minutes | Diverges from Tailwind theme tokens; hard to maintain | During rapid prototype only — must refactor before launch |
| Hard-coded town list in `generateStaticParams` | Simple to start | Adding a new town requires a code deploy | Acceptable for Phase 1 (Kasey has few towns); move to CMS in v2 |
| Storing full booking state in URL params | Shareable/resumable | Exposes pricing logic in URL; URLs become unwieldy | Only for simple single-step flows |
| Using Google Calendar OAuth user tokens | Works for testing | Tokens expire; Kasey would need to re-auth periodically | Never in production — use service account |
| Template-only town page content | Cheap to generate | Google spam penalty risk | Never — each indexed page needs unique content |
| Calling Resend directly from a client component | No API route needed | Exposes Resend API key in client bundle | Never — always call from a Server Action or API route |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Google Calendar API | Using `calendarId: 'primary'` resolves to the service account's calendar, not Kasey's | Use `calendarId: 'kaseys-email@gmail.com'` after sharing the calendar with the service account |
| Google Calendar API | Storing service account JSON key as a single env var fails when the JSON contains newlines in the private key | Store as a base64-encoded string and decode at runtime, or escape newlines carefully |
| Resend | Sending from `@gmail.com` or an unverified domain | Must verify a custom domain (e.g., `mail.monicas-miracle-mop.co.uk`) with SPF, DKIM, DMARC records — allow up to 48hr DNS propagation |
| Resend | Calling `resend.emails.send()` from a client component | Exposes the API key; always call from `app/api/send/route.ts` or a Server Action |
| Resend + React Email | Using modern CSS (flexbox, grid) in email templates | Email clients render 2004-era HTML; React Email abstracts this, but avoid custom CSS properties — use inline styles or React Email's built-in layout components |
| WebMCP | Calling `registerTool()` during module-level code or outside `useEffect` | Server-side render will throw; always guard with `useEffect` + `navigator.modelContext` check |
| shadcn/ui | Modifying generated component files directly | Prevents safe future upgrades via `shadcn add`; create wrapper components or use `cn()` overrides instead |
| Tailwind v4 + Material Design tokens | Material Design uses `--md-sys-color-primary` naming; Tailwind v4 uses `--color-*` naming | Map MD tokens to Tailwind `@theme` block explicitly: `--color-primary: var(--md-sys-color-primary);` — do not mix naming conventions in JSX |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Importing all of Lucide icons (`import * from 'lucide-react'`) | Large client bundle, slow TTI | Always use named imports: `import { Calendar } from 'lucide-react'` | From day one — tree-shaking won't help with `import *` |
| Booking state re-renders on every keystroke | Checkout form input lag, UI jank | Debounce expensive state updates; keep form input state local to the field, sync to booking context on blur/submit | Once the booking flow has 4+ steps with complex state |
| Before/after image slider loading full-resolution images | Slow LCP on homepage | Use `next/image` with `sizes` and `quality` props; serve WebP; lazy-load the slider component | With images > 500KB |
| `generateStaticParams` generating 50+ town pages at build | Build time explodes; ISR staleness issues | Generate only active service towns (likely 5–15); use `dynamicParams: false` to 404 unknown routes | If speculation generates pages for entire UK |
| Calling Google Calendar API synchronously in booking submission | Calendar request times out Vercel's 10s serverless function limit | Use `Promise.allSettled` for Calendar + Resend calls in parallel; booking confirmation should succeed even if calendar fails | On slow Google API responses |

---

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Exposing Resend API key in client-side code | Anyone can send unlimited emails from your domain, burning sender reputation and free tier | Move all email sends to Server Actions or `app/api/` routes; use Vercel env vars, never `NEXT_PUBLIC_` prefix for secrets |
| Committing Google service account JSON key to git | Full access to Google Calendar (and any other APIs the service account has) | Add `*-service-account*.json` to `.gitignore` immediately; use Vercel env vars |
| WebMCP tools exposing internal pricing logic | AI agents could probe pricing algorithms or discover unlisted discounts | Only expose pricing output (the calculated price), not the formula or discount thresholds |
| No rate limiting on `/api/book` endpoint | Competitor or bot floods Kasey's calendar with fake bookings | Add Vercel's `@upstash/ratelimit` or use Vercel Firewall rules (already installed per project context) to rate-limit booking submission |
| Missing CSRF protection on booking form | Cross-site form submission | Next.js Server Actions have CSRF protection built in; if using API routes, add an origin check |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Booking form loses all data on browser back button | User must restart the entire flow — high abandonment | Persist state to sessionStorage; pre-fill form on back navigation |
| Validating all fields only on final submit | User discovers 3 errors at step 4 after filling in steps 1–3 | Validate each step on "Continue" before advancing; show field-level errors inline |
| Date picker showing all dates as available | User selects a date that's fully booked, gets rejected at the API call | Fetch Kasey's busy times from Google Calendar before rendering the date picker; disable booked dates |
| Price shown only at checkout | User is surprised by total at the final step — trust erosion | Display running total on every step; show subtotal with add-ons in real time |
| UK phone number field with no format guidance | Kasey receives invalid phone numbers, cannot call customers | Show placeholder `07xxx xxxxxx`; validate UK mobile/landline formats |
| "Register Interest" form on non-active towns with no confirmation | Users fill it in and hear nothing — damages brand | Send an auto-reply email via Resend acknowledging the interest registration |

---

## "Looks Done But Isn't" Checklist

- [ ] **Google Calendar integration:** Events created in Kasey's actual calendar (not the service account's empty calendar) — verify by logging in as Kasey and checking the calendar UI
- [ ] **Resend emails:** Delivered to Kasey's inbox AND customer inbox, not spam — check SPF/DKIM with mail-tester.com before launch
- [ ] **WebMCP tools:** Site works identically in Firefox and Safari (no JS errors from missing `navigator.modelContext`) — test in multiple browsers
- [ ] **Town pages:** Each active town page has genuinely unique content beyond the town name swap — review word diff between any two pages
- [ ] **Town pages:** Non-active/placeholder town pages are `noindex` — verify in page source: `<meta name="robots" content="noindex">`
- [ ] **Booking state:** Refreshing the browser at `/book/checkout` either restores state from sessionStorage or gracefully redirects to step 1 — test manually
- [ ] **Tailwind tokens:** Material Design colour variables map correctly through the Tailwind `@theme` block — verify no raw `--md-sys-color-*` references exist in component JSX
- [ ] **shadcn/ui:** Custom modifications live in wrapper components, not in the generated files in `components/ui/` — diff the generated files against what `shadcn add` would produce
- [ ] **Resend free tier:** 3,000 emails/month limit is tracked — a single spam bot hit on the booking form could exhaust this; rate limiting must be live before launch
- [ ] **Google Calendar parallel to Resend:** Both calls are `Promise.allSettled` — a calendar API failure does not prevent the booking confirmation email from sending

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Service account can't access Kasey's calendar | LOW | Share calendar with service account email in Google Calendar UI; no code changes needed |
| Town pages deindexed for thin content | HIGH | Rewrite each page with unique local content; submit for reconsideration in Search Console; wait 4–8 weeks for recovery |
| Resend domain reputation damaged by spam | MEDIUM | Immediately rate-limit the booking endpoint; request sending warm-up reset from Resend support; monitor bounce rates |
| Booking state lost on refresh (reported by user) | MEDIUM | Add sessionStorage persistence to Context Provider; ship as hotfix; no data loss beyond that user's session |
| WebMCP crashing non-Chrome browsers | LOW | Add `navigator.modelContext` guard and redeploy; pure client-side fix, no server changes |
| `"use client"` over-application causing slow Lighthouse score | HIGH | Audit component tree; refactor interactive slices into separate Client Components; requires structural changes to components |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Service account / calendar sharing | Google Calendar Integration | Create a test booking in dev and confirm event appears in Kasey's actual Google Calendar |
| Booking state persistence | Booking Flow & State Management | Manually refresh at each booking step; confirm state is restored or redirect occurs gracefully |
| Thin town pages / SEO penalty | Per-Town Landing Pages (Local SEO) | Run a content diff between any two town pages; verify `noindex` on non-active towns; check Search Console after 4 weeks |
| WebMCP non-Chrome crashes | WebMCP Integration | Run the booking flow in Firefox and Safari with browser DevTools open; zero console errors required |
| `"use client"` proliferation | Design Conversion | Run `next build` and check bundle analysis; no marketing page should have >200KB client JS |
| Email API key exposure | Email Notifications (Resend) | Search codebase for `NEXT_PUBLIC_RESEND` — must return zero results |
| Tailwind / Material Design token conflicts | Design Conversion | Search for raw `--md-sys-color-` usage in JSX/TSX files; all should be mapped through Tailwind tokens |
| Missing rate limiting on booking endpoint | Booking Flow / Pre-launch | Verify Vercel Firewall rules or middleware rate limiting before deploying booking endpoint to production |
| Resend DNS/DKIM not verified before sending | Email Notifications (Resend) | Check Resend dashboard "Domains" section shows all DNS records as "Verified" before first production email |
| React Strict Mode double-registration (WebMCP) | WebMCP Integration | Check browser console in `next dev` for "Duplicate tool name" errors |

---

## Sources

- [WebMCP Early Preview — Chrome for Developers](https://developer.chrome.com/blog/webmcp-epp)
- [WebMCP Implementation Guide: Chrome 146+ Best Practices](https://www.halmob.com/blog/implementing-webmcp-chrome-146)
- [navigator.modelContext.provideContext overwrites registered tools — GitHub Issue #101](https://github.com/webmachinelearning/webmcp/issues/101)
- [App Router Pitfalls — imidef.com](https://imidef.com/en/2026-02-11-app-router-pitfalls)
- [Next.js Hydration Errors 2026 — Medium](https://medium.com/@blogs-world/next-js-hydration-errors-in-2026-the-real-causes-fixes-and-prevention-checklist-4a8304d53702)
- [Google Calendar API: service account calendar access — googleapis/google-api-nodejs-client Issue #1574](https://github.com/googleapis/google-api-nodejs-client/issues/1574)
- [Google Calendar API Quota Management — Google Developers](https://developers.google.com/workspace/calendar/api/guides/quota)
- [Integration with Google Calendar API using Service Account — IceApple Tech Notes](https://medium.com/iceapple-tech-talks/integration-with-google-calendar-api-using-service-account-1471e6e102c8)
- [Resend Domain Authentication Guide](https://resend.com/blog/email-authentication-a-developers-guide)
- [shadcn/ui Best Practices 2026 — Medium](https://medium.com/write-a-catalyst/shadcn-ui-best-practices-for-2026-444efd204f44)
- [Next.js Dynamic Route SEO — WebPeak](https://webpeak.org/blog/nextjs-dynamic-route-seo-best-practices/)
- [18 Local SEO Mistakes 2026 — Connectica](https://www.connecticallc.com/local-seo-mistakes/)
- [The State of Local SEO in 2026 — Sterling Sky](https://www.sterlingsky.ca/the-state-of-local-seo-in-2026/)
- [Next.js App Router Pitfalls: Patterns That Actually Matter 2026 — DEV Community](https://dev.to/teguh_coding/nextjs-app-router-the-patterns-that-actually-matter-in-2026-146)

---
*Pitfalls research for: UK domestic cleaning business website (Monica's Miracle Mop)*
*Researched: 2026-03-23*
