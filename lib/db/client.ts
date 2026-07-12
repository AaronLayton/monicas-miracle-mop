import { neon, type NeonQueryFunction } from "@neondatabase/serverless"

/**
 * Lazily-initialised Neon HTTP SQL client.
 *
 * The connection string is read from `DATABASE_URL` (Neon serverless HTTP
 * driver — the right choice for Vercel's serverless functions). The client is
 * created on first use so that importing this module never throws at build
 * time; a missing `DATABASE_URL` only errors when a query is actually run.
 */
let client: NeonQueryFunction<false, false> | null = null

export function getSql(): NeonQueryFunction<false, false> {
  if (client) return client

  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Add your Neon Postgres connection string " +
        "(postgresql://…neon.tech…) to .env.local before using the booking store."
    )
  }

  client = neon(connectionString)
  return client
}
