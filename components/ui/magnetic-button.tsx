"use client"

import { Link } from "next-view-transitions"
import { motion, useMotionValue, useSpring } from "motion/react"
import { useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import type { Route } from "next"

type Props = {
  href: Route | string
  children: ReactNode
  className?: string
  variant?: "primary" | "secondary" | "ghost"
}

export function MagneticButton({
  href,
  children,
  className,
  variant = "primary",
}: Props) {
  const shellRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 18 })
  const springY = useSpring(y, { stiffness: 200, damping: 18 })

  function onMove(e: React.MouseEvent) {
    const el = shellRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    x.set(dx * 0.18)
    y.set(dy * 0.18)
  }

  function onLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={shellRef}
      style={{ x: springX, y: springY }}
      className="inline-flex"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <Link
        href={href as Route}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 focus-ring",
          "active:scale-[0.98]",
          variant === "primary" &&
            "bg-primary text-primary-foreground shadow-cinematic hover:bg-primary-container hover:shadow-float",
          variant === "secondary" &&
            "bg-accent text-accent-foreground hover:bg-primary-soft",
          variant === "ghost" &&
            "bg-white/60 text-foreground ring-1 ring-border hover:bg-white",
          className
        )}
      >
        {children}
      </Link>
    </motion.div>
  )
}
