import { CheckCircle2, Phone, Star } from "lucide-react"
import { BUSINESS } from "@/lib/data/services"

/** Slim reassurance band shown under marketing heroes. */
export function TrustStrip() {
  return (
    <section className="border-y border-border/50 bg-white/40">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <Star className="size-4 fill-primary text-primary" aria-hidden />
          Honest, flyer-matched pricing
        </span>
        <span className="inline-flex items-center gap-2">
          <Phone className="size-4 text-primary" aria-hidden />
          {BUSINESS.consultationMinutes}-min consultation every job
        </span>
        <span className="inline-flex items-center gap-2">
          <CheckCircle2 className="size-4 text-primary" aria-hidden />
          Manage or cancel via your private booking link
        </span>
      </div>
    </section>
  )
}
