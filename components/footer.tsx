import { Link } from "next-view-transitions"
import Image from "next/image"
import type { Route } from "next"
import { BUSINESS } from "@/lib/data/services"

const serviceLinks: { href: Route; label: string }[] = [
  { href: "/services", label: "Standard Clean" },
  { href: "/services", label: "Deep Clean" },
  { href: "/services", label: "Move-In / Move-Out" },
]

const companyLinks: { href: Route; label: string }[] = [
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/areas", label: "Service areas" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
]

const legalLinks: { href: Route; label: string }[] = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
]

export function Footer() {
  return (
    <footer
      data-slot="footer"
      className="vt-site-footer relative mt-auto w-full overflow-hidden border-t border-border/60"
      style={{ viewTransitionName: "site-footer" }}
    >
      <div className="absolute inset-0 mesh-soft opacity-60 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <Image
              src="/logo-transparent.png"
              alt={BUSINESS.name}
              width={280}
              height={120}
              className="h-12 w-auto max-w-[11rem] object-contain object-left"
            />
            <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
              Professional domestic cleaning with honest pricing, a friendly
              consultation, and a home that feels genuinely cared for.
            </p>
            <a
              href={`mailto:${BUSINESS.email}`}
              className="text-sm font-medium text-primary hover:underline underline-offset-4 w-fit"
            >
              {BUSINESS.email}
            </a>
          </div>

          <FooterCol title="Services" links={serviceLinks} />
          <FooterCol title="Company" links={companyLinks} />
          <FooterCol title="Legal" links={legalLinks} />
        </div>

        <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-border/50 pt-8">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            UK English · Prices in GBP · Pay on the day — bank transfer or cash
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({
  title,
  links,
}: {
  title: string
  links: { href: Route; label: string }[]
}) {
  return (
    <div className="flex flex-col gap-4">
      <h5 className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {title}
      </h5>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
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
  )
}
