/** Genuine customer quotes — shown on the homepage and area landing pages. */

export interface Testimonial {
  quote: string
  name: string
  area: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Kasey left our house gleaming. Honest about pricing, gentle with the kids' rooms, and always on time.",
    name: "Sarah M.",
    area: "Local client",
  },
  {
    quote:
      "The deep clean before we moved in was spotless. Managing the booking online was brilliantly simple.",
    name: "James & Priya",
    area: "Move-in clean",
  },
  {
    quote:
      "Finally a cleaner who communicates. The consultation call made everything clear — no surprises.",
    name: "Helen T.",
    area: "Fortnightly standard",
  },
]
