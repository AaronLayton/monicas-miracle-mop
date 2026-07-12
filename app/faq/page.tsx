import type { Metadata } from "next"
import { BUSINESS } from "@/lib/data/services"
import { Reveal } from "@/components/motion/reveal"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Common questions about booking, pricing, and cancellations.",
}

const faqs = [
  {
    q: "Do I need to create an account?",
    a: "No. After you book, you get a private link to manage that booking — change the date, leave a message, or cancel. Keep the link safe like a hotel confirmation.",
  },
  {
    q: "How does pricing work?",
    a: "Prices match our published flyer. Hourly services are estimated from the hours you select; deep cleans and move-outs are confirmed on your consultation once we understand the property.",
  },
  {
    q: "Is a deposit required?",
    a: "No deposit needed. You pay in full on the day by cash or bank transfer, once your clean is done.",
  },
  {
    q: "What is the consultation call?",
    a: `Every job includes a short ~${BUSINESS.consultationMinutes}-minute call covering keys/access, what you need, and our terms — so there are no surprises.`,
  },
  {
    q: "What is the cancellation policy?",
    a: `Please give at least ${BUSINESS.cancellationHours} hours' notice. Under ${BUSINESS.cancellationHours} hours incurs a ${BUSINESS.lateCancelFeePercent}% fee. If we are locked out, the full fee may apply.`,
  },
  {
    q: "Can I change my booking later?",
    a: "Yes — open your private booking page from the confirmation email. You can update the date, arrival window, or leave a message for us.",
  },
]

export default function FaqPage() {
  return (
    <div className="page-nav-offset mx-auto max-w-3xl px-4 md:px-8 pb-14 md:pb-20">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary mb-3">
            FAQ
          </p>
          <h1 className="text-display text-4xl md:text-5xl font-semibold tracking-tight mb-12">
            Questions, answered
          </h1>
        </Reveal>
        <div className="flex flex-col gap-4">
          {faqs.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.04}>
              <details className="group rounded-3xl bg-card shadow-float shine-border open:shadow-cinematic transition-shadow">
                <summary className="cursor-pointer list-none px-6 py-5 font-semibold text-foreground flex items-center justify-between gap-4">
                  {item.q}
                  <span className="text-primary text-xl group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed -mt-1">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
  )
}
