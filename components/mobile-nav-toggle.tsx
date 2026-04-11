"use client"

import { useState } from "react"
import Link from "next/link"
import type { Route } from "next"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks: { href: Route; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/schedule" as Route, label: "Schedule" },
  { href: "/checkout" as Route, label: "Checkout" },
]

export function MobileNavToggle() {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted transition-colors"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {open && (
        <div
          className={cn(
            "absolute left-0 right-0 top-full z-50 border-b border-border bg-background/95 backdrop-blur-md px-6 py-4 shadow-md"
          )}
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 pt-2 border-t border-border">
              <Link
                href="/services"
                onClick={() => setOpen(false)}
                className="block w-full rounded-full bg-[--primary-container] px-6 py-2.5 text-center text-sm font-semibold text-white transition-all hover:opacity-80 active:scale-95 shadow-lg"
              >
                Book Now
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
