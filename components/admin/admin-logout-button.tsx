"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

export function AdminLogoutButton() {
  const router = useRouter()
  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" })
    router.push("/admin/login")
    router.refresh()
  }
  return (
    <button
      type="button"
      onClick={logout}
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground ring-1 ring-border transition-colors hover:text-foreground hover:bg-muted/60"
    >
      <LogOut className="size-4" aria-hidden />
      Sign out
    </button>
  )
}
