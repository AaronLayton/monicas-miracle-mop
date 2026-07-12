import { createHmac, timingSafeEqual } from "crypto"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

/**
 * Admin auth — a single shared password (ADMIN_PASSWORD env var) exchanged
 * for a signed, expiring session cookie. No user accounts; this protects
 * Kasey's dashboard only.
 */

const COOKIE_NAME = "mmm_admin"
const SESSION_DAYS = 30

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD)
}

function signingKey(): string {
  // Derive from the password so rotating the password invalidates sessions
  return `mmm-admin-session:${process.env.ADMIN_PASSWORD ?? ""}`
}

function sign(payload: string): string {
  return createHmac("sha256", signingKey()).update(payload).digest("hex")
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ab.length !== bb.length) return false
  return timingSafeEqual(ab, bb)
}

export function checkPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  return safeEqual(password, expected)
}

/** Token format: `<expiryEpochMs>.<hmac(expiry)>` */
export function createSessionToken(): string {
  const expires = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000
  return `${expires}.${sign(String(expires))}`
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token || !isAdminConfigured()) return false
  const [expiresStr, mac] = token.split(".")
  if (!expiresStr || !mac) return false
  if (!safeEqual(mac, sign(expiresStr))) return false
  return Number(expiresStr) > Date.now()
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  return verifySessionToken(cookieStore.get(COOKIE_NAME)?.value)
}

/**
 * Page guard — redirects to the login screen when not signed in. Pass the
 * current path so email deep links land back on the right page after login.
 */
export async function requireAdmin(nextPath?: string): Promise<void> {
  if (!(await isAdminAuthenticated())) {
    redirect(
      nextPath
        ? `/admin/login?next=${encodeURIComponent(nextPath)}`
        : "/admin/login"
    )
  }
}

/** Set the session cookie (route handlers only). */
export async function setAdminSessionCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  })
}

export async function clearAdminSessionCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, "", { path: "/", maxAge: 0 })
}
