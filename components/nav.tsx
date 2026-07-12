"use client"

import { Link } from "next-view-transitions"
import Image from "next/image"
import type { Route } from "next"
import { usePathname } from "next/navigation"
import { useEffect, useLayoutEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks: { href: Route; label: string }[] = [
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/areas", label: "Areas" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
]

const SCROLL_THRESHOLD = 16
const LOGO_SRC = "/logo-transparent.png"

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isHome = pathname === "/"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useLayoutEffect(() => {
    setOpen(false)
    setScrolled(false)
  }, [pathname])

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD)
    })
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return (
    <header
      data-slot="nav"
      className="pointer-events-none fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          "vt-site-nav vt-nav-shell pointer-events-auto mx-auto",
          "transition-[max-width,margin,padding,background-color,box-shadow,border-radius,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled
            ? "mt-3 max-w-[min(72rem,calc(100%-1.5rem))] rounded-[1.75rem] bg-white/80 px-3 py-2 shadow-[0_8px_32px_-8px_rgba(81,45,142,0.16)] backdrop-blur-xl backdrop-saturate-150 sm:px-4 md:rounded-full"
            : "mt-0 max-w-7xl bg-transparent px-4 py-3 shadow-none backdrop-blur-0 md:px-8 md:py-4"
        )}
        style={{ viewTransitionName: "site-nav" }}
      >
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="flex min-w-0 shrink items-center transition-opacity hover:opacity-90"
            aria-label="Monica's Miracle Mop — Home"
          >
            {/* Wordmark includes the company name — no separate text label */}
            <Image
              src={LOGO_SRC}
              alt="Monica's Miracle Mop"
              width={720}
              height={300}
              priority
              className={cn(
                "h-auto w-auto object-contain object-left transition-[height,width,max-width,max-height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                scrolled
                  ? "max-h-10 max-w-[9rem] sm:max-h-11 sm:max-w-[10.5rem]"
                  : isHome
                    ? "max-h-16 max-w-[13rem] sm:max-h-[4.5rem] sm:max-w-[16rem] md:max-h-20 md:max-w-[18rem]"
                    : "max-h-14 max-w-[11rem] sm:max-h-16 sm:max-w-[13rem] md:max-h-[4.5rem] md:max-w-[15rem]"
              )}
            />
          </Link>

          <nav
            className="hidden lg:flex items-center gap-0.5"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-primary-soft/80"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/services"
              className={cn(
                "hidden sm:inline-flex items-center gap-2 rounded-full",
                "bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground",
                "shadow-cinematic transition-all duration-300",
                "hover:bg-primary-container hover:scale-[1.02] active:scale-[0.98]"
              )}
            >
              <Sparkles className="size-3.5" aria-hidden />
              Book now
            </Link>

            <button
              type="button"
              className={cn(
                "lg:hidden inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors",
                scrolled
                  ? "bg-primary-soft/60 hover:bg-primary-soft"
                  : "bg-white/70 ring-1 ring-border hover:bg-white"
              )}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden"
            >
              <nav
                className={cn(
                  "flex flex-col gap-1 pt-3 pb-1",
                  !scrolled && "mt-2 border-t border-border/40"
                )}
                aria-label="Mobile"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-base font-medium",
                      pathname === link.href
                        ? "bg-primary-soft text-primary"
                        : "text-foreground hover:bg-muted/80"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/services"
                  className="mt-1 rounded-full bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground sm:hidden"
                >
                  Book a clean
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
