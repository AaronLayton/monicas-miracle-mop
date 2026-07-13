import type { Metadata } from "next"
import Image from "next/image"
import { Link } from "next-view-transitions"
import { BUSINESS } from "@/lib/data/services"
import { Reveal } from "@/components/motion/reveal"
import { CheckCircle2, Heart, Sparkles } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { organizationSchema, breadcrumbSchema, NODE_ID } from "@/lib/seo/schema"
import { getSiteUrl } from "@/lib/site"

const ABOUT_DESCRIPTION = `Meet the team behind ${BUSINESS.name} — professional domestic cleaning with heart.`

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About",
  description: ABOUT_DESCRIPTION,
}

export default function AboutPage() {
  const siteUrl = getSiteUrl()
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${siteUrl}/about#webpage`,
    url: `${siteUrl}/about`,
    name: "About",
    description: ABOUT_DESCRIPTION,
    inLanguage: BUSINESS.locale,
    isPartOf: { "@id": `${siteUrl}${NODE_ID.website}` },
    about: { "@id": `${siteUrl}${NODE_ID.business}` },
    mainEntity: { "@id": `${siteUrl}${NODE_ID.business}` },
  }

  return (
    <div className="page-nav-offset mx-auto max-w-7xl px-4 md:px-8 pb-14 md:pb-20">
        <JsonLd
          data={[
            organizationSchema(),
            aboutPageSchema,
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "About", url: "/about" },
            ]),
          ]}
        />
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary mb-3">
              Our story
            </p>
            <h1 className="text-display text-4xl md:text-5xl font-semibold tracking-tight mb-6">
              Cleaning with care,{" "}
              <span className="italic text-primary">not chaos</span>
            </h1>
            <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
              <p>
                {BUSINESS.name} is a domestic house cleaning business run by{" "}
                {BUSINESS.ownerName} — named with a wink to Monica Geller&apos;s
                legendary standards (yes, that Friends reference is intentional).
              </p>
              <p>
                We believe you deserve clear prices, a friendly consultation, and
                a home that feels genuinely looked after. No hard sell. No
                surprise fees. Just reliable cleans you can book and manage
                online.
              </p>
            </div>
            <ul className="mt-8 flex flex-col gap-3">
              {[
                "15-minute consultation before every job",
                "Honest pricing matching our flyer",
                "Pay on the day by cash or bank transfer",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="size-5 text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/services"
              className="mt-10 inline-flex rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-cinematic"
            >
              Book a clean
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-[4/5] max-h-[520px] rounded-[2rem] overflow-hidden shadow-cinematic">
              <Image
                src="/images/professional-cleaner.jpg"
                alt="Professional cleaner at work"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 glass-card rounded-2xl p-5 ring-1 ring-white/40">
                <div className="flex items-center gap-3">
                  <Heart className="size-5 text-primary" />
                  <p className="text-sm font-medium">
                    Homes cared for like our own
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-20 rounded-3xl mesh-soft p-8 md:p-12">
          <div className="flex items-start gap-4 max-w-2xl">
            <Sparkles className="size-6 text-primary shrink-0 mt-1" />
            <div>
              <h2 className="text-display text-2xl font-semibold mb-3">
                Why “Miracle Mop”?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Because a great clean should feel a little bit magic — without
                the drama. We show up prepared, communicate clearly, and leave
                your space ready for real life.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
  )
}
