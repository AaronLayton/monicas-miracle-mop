import Link from "next/link"
import Image from "next/image"
import type { Route } from "next"
import { Separator } from "@/components/ui/separator"

const serviceLinks: { href: Route; label: string }[] = [
  { href: "/services", label: "Standard Clean" },
  { href: "/services", label: "Deep Clean" },
  { href: "/services", label: "Move-In/Out Clean" },
]

const companyLinks: { href: Route; label: string }[] = [
  { href: "/about", label: "About" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
]

const supportLinks: { href: Route; label: string }[] = [
  { href: "/contact", label: "Contact Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/areas", label: "Service Areas" },
]

export function Footer() {
  return (
    <footer
      data-slot="footer"
      className="w-full bg-muted border-t border-border"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Monica's Miracle Mop logo"
                width={36}
                height={36}
                className="size-9 object-contain"
              />
              <span className="text-base font-bold italic text-primary leading-tight">
                Monica&apos;s Miracle Mop
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
              Restoring order, one room at a time. Professional house cleaning
              services across the local area.
            </p>
          </div>

          {/* Column 2: Services */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Services
            </h5>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Company
            </h5>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Support
            </h5>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-2 space-y-1 text-sm text-muted-foreground">
              <p>Service area: Local & surrounding towns</p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; 2024 Monica&apos;s Miracle Mop. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
