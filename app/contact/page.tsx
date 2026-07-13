import type { Metadata } from "next"
import { BUSINESS } from "@/lib/data/services"
import { Reveal } from "@/components/motion/reveal"
import { Mail, MessageCircle } from "lucide-react"
import { Link } from "next-view-transitions"
import { JsonLd } from "@/components/json-ld"
import { localBusinessSchema, breadcrumbSchema } from "@/lib/seo/schema"

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact",
  description: `Get in touch with ${BUSINESS.name}.`,
}

export default function ContactPage() {
  return (
    <div className="page-nav-offset mx-auto max-w-3xl px-4 md:px-8 pb-14 md:pb-20">
        <JsonLd
          data={[
            localBusinessSchema(),
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Contact", url: "/contact" },
            ]),
          ]}
        />
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary mb-3">
            Contact
          </p>
          <h1 className="text-display text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            Let&apos;s talk
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-xl">
            Prefer to chat before booking? Email us — or start a booking and
            leave a note; every job includes a short consultation call.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-5">
          <Reveal>
            <a
              href={`mailto:${BUSINESS.email}`}
              className="flex flex-col gap-4 rounded-3xl bg-card p-7 shadow-float shine-border h-full hover:-translate-y-0.5 transition-transform"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <Mail className="size-5" />
              </span>
              <div>
                <h2 className="font-semibold text-foreground mb-1">Email</h2>
                <p className="text-sm text-primary font-medium break-all">
                  {BUSINESS.email}
                </p>
              </div>
            </a>
          </Reveal>
          <Reveal delay={0.08}>
            <Link
              href="/services"
              className="flex flex-col gap-4 rounded-3xl bg-primary p-7 shadow-cinematic h-full text-primary-foreground hover:-translate-y-0.5 transition-transform"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-white/15">
                <MessageCircle className="size-5" />
              </span>
              <div>
                <h2 className="font-semibold mb-1">Book online</h2>
                <p className="text-sm text-primary-foreground/80">
                  Fastest path — pick a service and we&apos;ll call to confirm.
                </p>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
  )
}
