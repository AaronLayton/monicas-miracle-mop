/**
 * Canonical site URL for links in emails, calendar events, and metadata.
 *
 * Resolution order:
 *  1. NEXT_PUBLIC_SITE_URL — explicit (set this in Vercel for the real domain)
 *  2. VERCEL_PROJECT_PRODUCTION_URL — Vercel's production domain (system env
 *     var, auto-exposed on Vercel; no protocol)
 *  3. VERCEL_URL — the current deployment's URL (previews)
 *  4. localhost fallback for local dev
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit.replace(/\/$/, "")

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (production) return `https://${production}`

  const deployment = process.env.VERCEL_URL
  if (deployment) return `https://${deployment}`

  return "http://localhost:3000"
}
