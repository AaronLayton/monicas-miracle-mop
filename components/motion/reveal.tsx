"use client"

import { motion, type HTMLMotionProps } from "motion/react"
import { cn } from "@/lib/utils"

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number
  y?: number
  once?: boolean
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
  ...props
}: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.15, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      // Always paint for print / reduced-motion / crawlers after first frame
      style={{ willChange: "opacity, transform" }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function Stagger({
  children,
  className,
  stagger = 0.08,
}: {
  children: React.ReactNode
  className?: string
  stagger?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
