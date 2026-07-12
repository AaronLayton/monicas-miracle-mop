"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"

/**
 * Opacity-only enter animation.
 * Do NOT animate transform/y — that creates a containing block and breaks
 * position: sticky descendants (booking sidebar).
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-0"
    >
      {children}
    </motion.div>
  )
}
