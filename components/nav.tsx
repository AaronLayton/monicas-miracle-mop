import Link from "next/link"
import Image from "next/image"
import type { Route } from "next"
import { MobileNavToggle } from "@/components/mobile-nav-toggle"
import { cn } from "@/lib/utils"

const navLinks: { href: Route; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/schedule" as Route, label: "Schedule" },
  { href: "/checkout" as Route, label: "Checkout" },
]

export function Nav() {
  return (
    <header
      data-slot="nav"
      className={cn(
        "glass-card-nav fixed top-0 z-50 w-full",
        "shadow-[0_40px_40px_-10px_rgba(25,28,31,0.06)]",
        "antialiased tracking-[-0.02em]"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 text-primary hover:opacity-80 transition-opacity"
          aria-label="Monica's Miracle Mop — Home"
        >
          <Image
            src="/logo.png"
            alt="Monica's Miracle Mop logo"
            width={40}
            height={40}
            className="size-10 object-contain"
            priority
          />
          <span className="text-lg font-bold italic text-primary leading-tight">
            Monica&apos;s Miracle Mop
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/services"
            className={cn(
              "hidden md:inline-flex items-center justify-center",
              "rounded-full bg-primary-container px-6 py-2.5",
              "text-sm font-semibold text-white",
              "shadow-lg shadow-primary/20",
              "transition-all duration-300 hover:opacity-80 active:scale-95"
            )}
          >
            Book Now
          </Link>

          <MobileNavToggle />
        </div>
      </div>
    </header>
  )
}
