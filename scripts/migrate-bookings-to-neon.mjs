// Migrate existing file-based bookings (data/bookings.json) into Neon Postgres.
//
// Usage:
//   node --env-file=.env.local scripts/migrate-bookings-to-neon.mjs
//
// Idempotent: each booking is upserted with ON CONFLICT (id) DO NOTHING, so it
// is safe to run repeatedly. Existing rows are left untouched.

import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { neon } from "@neondatabase/serverless"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, "..")
const bookingsFile = path.join(projectRoot, "data", "bookings.json")

// Fallback .env.local parser so the script also works without `node --env-file`.
async function loadEnvLocal() {
  if (process.env.DATABASE_URL) return
  try {
    const raw = await readFile(path.join(projectRoot, ".env.local"), "utf8")
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/)
      if (!m) continue
      const key = m[1]
      let val = m[2].trim()
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1)
      }
      if (!(key in process.env)) process.env[key] = val
    }
  } catch {
    // no .env.local — rely on the existing environment
  }
}

async function main() {
  await loadEnvLocal()

  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    console.error("DATABASE_URL is not set (checked env and .env.local).")
    process.exit(1)
  }

  const sql = neon(connectionString)

  await sql`
    CREATE TABLE IF NOT EXISTS bookings (
      id text PRIMARY KEY,
      token text UNIQUE NOT NULL,
      reference text UNIQUE NOT NULL,
      stripe_session_id text,
      date date NOT NULL,
      status text NOT NULL,
      data jsonb NOT NULL,
      created_at timestamptz NOT NULL,
      updated_at timestamptz NOT NULL
    )
  `
  await sql`
    CREATE INDEX IF NOT EXISTS bookings_stripe_session_id_idx
      ON bookings (stripe_session_id)
  `

  let bookings = []
  try {
    const raw = await readFile(bookingsFile, "utf8")
    bookings = JSON.parse(raw)
  } catch {
    console.log(`No ${bookingsFile} found (or unreadable). Nothing to migrate.`)
    return
  }

  if (!Array.isArray(bookings) || bookings.length === 0) {
    console.log("bookings.json is empty. Nothing to migrate.")
    return
  }

  // `ON CONFLICT DO NOTHING` returns no rows either way, so pre-fetch the
  // existing ids to report accurate inserted/skipped counts.
  const existingRows = await sql`SELECT id FROM bookings`
  const existing = new Set(existingRows.map((r) => r.id))

  let inserted = 0
  let skipped = 0
  for (const b of bookings) {
    if (existing.has(b.id)) {
      skipped++
      continue
    }
    await sql.query(
      `INSERT INTO bookings
         (id, token, reference, stripe_session_id, date, status, data, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8, $9)
       ON CONFLICT (id) DO NOTHING`,
      [
        b.id,
        b.token,
        b.reference,
        b.stripeSessionId ?? null,
        b.date,
        b.status,
        JSON.stringify(b),
        b.createdAt,
        b.updatedAt,
      ]
    )
    inserted++
  }

  const [{ count }] = await sql`SELECT count(*)::int AS count FROM bookings`
  console.log(
    `Read ${bookings.length} booking(s) from bookings.json. ` +
      `Inserted ${inserted}, skipped ${skipped} (already present). ` +
      `Table now holds ${count} row(s).`
  )
}

main().catch((err) => {
  console.error("Migration failed:", err)
  process.exit(1)
})
