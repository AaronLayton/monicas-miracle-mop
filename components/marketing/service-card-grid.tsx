import { ArrowRight } from "lucide-react"
import { Link } from "next-view-transitions"
import { formatServicePrice, type Service } from "@/lib/data/services"
import { Stagger, StaggerItem } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

/** The numbered service cards used on the homepage and area landing pages. */
export function ServiceCardGrid({ services }: { services: Service[] }) {
  return (
    <Stagger className="grid md:grid-cols-3 gap-6">
      {services.map((service, i) => (
        <StaggerItem key={service.id}>
          <Link
            href={`/services?service=${service.id}`}
            className={cn(
              "group relative flex h-full flex-col rounded-3xl p-7 md:p-8",
              "bg-card shine-border shadow-float",
              "transition-all duration-500 hover:-translate-y-1 hover:shadow-cinematic",
              service.popular && "ring-2 ring-primary/30"
            )}
          >
            {service.badge && (
              <span className="absolute top-5 right-5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                {service.badge}
              </span>
            )}
            <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <span className="text-display text-lg font-semibold">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="text-display text-2xl font-semibold text-foreground mb-2">
              {service.name}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
              {service.description}
            </p>
            <div className="flex items-end justify-between gap-3 pt-4 border-t border-border/60">
              <p className="text-xl font-bold text-primary">
                {formatServicePrice(service)}
              </p>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors inline-flex items-center gap-1">
                Select
                <ArrowRight className="size-3.5" />
              </span>
            </div>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  )
}
