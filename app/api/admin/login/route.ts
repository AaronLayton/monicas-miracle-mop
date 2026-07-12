import { NextResponse } from "next/server"
import {
  checkPassword,
  isAdminConfigured,
  setAdminSessionCookie,
  clearAdminSessionCookie,
} from "@/lib/admin/auth"

export async function POST(req: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Admin access is not configured (set ADMIN_PASSWORD)" },
      { status: 503 }
    )
  }
  const body = await req.json().catch(() => null)
  const password = typeof body?.password === "string" ? body.password : ""
  if (!checkPassword(password)) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 })
  }
  await setAdminSessionCookie()
  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  await clearAdminSessionCookie()
  return NextResponse.json({ ok: true })
}
