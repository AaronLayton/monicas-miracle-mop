import Link from "next/link"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"

const serviceLinks = [
  { href: "/services", label: "Standard Clean" },
  { href: "/services", label: "Deep Clean" },
  { href: "/services", label: "Move-In/Out Clean" },
]

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
]

const supportLinks = [
  { href: "/contact", label: "Contact Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/areas", label: "Service Areas" },
]

export function Footer() {
  return (
    <footer
      data-slot="footer"
      className="w-full bg-foreground text-background"
    >
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Monica's Miracle Mop logo"
                width={36}
                height={36}
                className="size-9 object-contain brightness-0 invert"
              />
              <span className="text-base font-bold italic leading-tight">
                Monica&apos;s Miracle Mop
              </span>
            </div>
            <p className="text-sm leading-relaxed text-background/70 max-w-xs">
              Restoring order, one room at a time. Professional house cleaning
              services across the local area.
            </p>
          </div>

          {/* Column 2: Services */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-widest text-background/50">
              Services
            </h5>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-widest text-background/50">
              Company
            </h5>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-widest text-background/50">
              Support
            </h5>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-2 space-y-1 text-sm text-background/70">
              <p>Service area: Local & surrounding towns</p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-background/10" />

        <p className="text-center text-sm text-background/50 md:text-left">
          &copy; 2024 Monica&apos;s Miracle Mop. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
