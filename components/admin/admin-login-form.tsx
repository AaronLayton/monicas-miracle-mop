"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, LockKeyhole } from "lucide-react"
import { cn } from "@/lib/utils"

export function AdminLoginForm() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error ?? "Sign in failed")
      router.push("/admin")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed")
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Password
        </span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          autoFocus
          className="rounded-2xl border-0 bg-muted/60 px-4 py-3 text-sm focus-ring"
        />
      </label>
      {error && (
        <p role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting || !password}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all",
          submitting || !password
            ? "bg-muted text-muted-foreground cursor-not-allowed"
            : "bg-primary text-primary-foreground shadow-cinematic hover:bg-primary-container"
        )}
      >
        {submitting ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <LockKeyhole className="size-4" aria-hidden />
        )}
        Sign in
      </button>
    </form>
  )
}
