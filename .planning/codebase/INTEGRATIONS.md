# External Integrations

**Analysis Date:** 2026-03-23

## APIs & External Services

**Content Delivery:**
- Google Fonts (via next/font) - Font hosting and delivery
  - SDK/Client: Built-in `next/font/google`
  - Fonts: Geist, Geist_Mono
  - No authentication required

**Vercel Services:**
- Vercel Platform - Deployment and hosting
  - OIDC Token: VERCEL_OIDC_TOKEN environment variable
  - Project: monicas-miracle-mop (in aronlaytons-projects team)
  - Environment: development

## Data Storage

**Databases:**
- Not detected - No active database integration present
- No ORM or database client configured (Prisma, Drizzle, SQLAlchemy, etc.)

**File Storage:**
- Local filesystem only
- Next.js public assets served from `public/` directory
- Static images referenced via `next/image` component (optimized at build time)

**Caching:**
- Next.js built-in caching
  - Component caching enabled via `cacheComponents: true` in `next.config.ts`
  - No external cache layer (Redis, Memcached) configured

## Authentication & Identity

**Auth Provider:**
- Custom or none - No auth provider configured
- No authentication libraries detected (auth0, next-auth, supabase-auth, etc.)
- No protected routes or session management code present

**Current Implementation Status:**
- Authentication not implemented
- All pages are public/unprotected

## Monitoring & Observability

**Error Tracking:**
- Not detected - No error tracking service configured (Sentry, Rollbar, etc.)

**Logs:**
- Console logging only
- Application does not integrate with external logging service
- Vercel provides platform-level logs automatically

**Analytics:**
- Not detected - No analytics service integrated (Google Analytics, Mixpanel, Amplitude, etc.)

## CI/CD & Deployment

**Hosting:**
- Vercel platform
  - Project configuration: `.vercel/project.json` (present)
  - OIDC token-based authentication for CI/CD
  - Development environment active

**CI Pipeline:**
- Vercel automatic deployments
  - Triggered by Git pushes to repository
  - Node.js and build environment managed by Vercel
  - No custom CI configuration (GitHub Actions, GitLab CI, etc.) detected

**Build Process:**
- Next.js native build: `next build`
- Development: `next dev` (localhost:3000)
- Production start: `next start`
- Vercel handles production build and deployment automatically

## Environment Configuration

**Required env vars:**
- `VERCEL_OIDC_TOKEN` - Vercel CI/CD authentication (present in `.env.local`)

**Optional env vars:**
- None currently defined
- `.env.local` file exists but contains only Vercel configuration

**Secrets location:**
- `.env.local` - Local development environment file
- Vercel Environment Variables dashboard - Production/preview secrets (accessed via Vercel web UI)

**Configuration approach:**
- Environment-based configuration not actively used in codebase
- No references to `process.env.*` for feature flags or service credentials

## Webhooks & Callbacks

**Incoming:**
- None detected - No API routes configured to receive webhooks

**Outgoing:**
- None detected - No external webhook calls present
- No integration with third-party services that would require callbacks

## Third-Party Services Summary

**Currently Not Integrated:**
- Payment processing (Stripe, PayPal)
- Real-time databases (Supabase, Firebase)
- Authentication services (Auth0, Okta, NextAuth)
- Email services (SendGrid, Mailgun, Resend)
- File upload services (Cloudinary, AWS S3)
- Analytics platforms (Google Analytics, Segment)
- Error tracking (Sentry, LogRocket)
- API monitoring (Datadog, New Relic)

**Why:**
This is a frontend-focused starter project based on `create-next-app`. All currently integrated services are framework dependencies or platform utilities provided by Vercel and Next.js.

---

*Integration audit: 2026-03-23*
