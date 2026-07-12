"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { Sparkles } from "lucide-react"
import kitchenAfter from "@/public/images/gallery/1000012297.jpeg"

export function HomeHeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-lg aspect-square">
      {/* Soft orb backdrop */}
      <motion.div
        aria-hidden
        className="absolute inset-[8%] rounded-full bg-gradient-to-br from-primary-soft via-lavender/60 to-mist"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        aria-hidden
        className="absolute inset-[4%] rounded-full border border-white/50"
      />
      <div
        aria-hidden
        className="absolute inset-0 rounded-full border border-primary/10"
      />

      {/* Floating pills */}
      <motion.div
        className="absolute left-0 top-[18%] z-20 rounded-2xl bg-white/90 px-3.5 py-2.5 shadow-float ring-1 ring-border/60 backdrop-blur"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="text-xs font-semibold text-foreground">Eco-friendly options</p>
      </motion.div>

      <motion.div
        className="absolute right-0 top-[28%] z-20 rounded-2xl bg-white/90 px-3.5 py-2.5 shadow-float ring-1 ring-border/60 backdrop-blur"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <p className="text-xs font-semibold text-foreground">Trained & insured</p>
      </motion.div>

      <motion.div
        className="absolute left-2 bottom-[22%] z-20 flex items-center gap-2 rounded-2xl bg-white/95 px-3.5 py-2.5 shadow-float ring-1 ring-border/60"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      >
        <div className="flex -space-x-2" aria-hidden>
          <span className="size-7 rounded-full bg-primary-soft ring-2 ring-white" />
          <span className="size-7 rounded-full bg-lavender ring-2 ring-white" />
          <span className="size-7 rounded-full bg-mist ring-2 ring-white" />
        </div>
        <p className="text-xs font-semibold text-foreground">
          Local families trust us
        </p>
      </motion.div>

      {/* Main image card */}
      <motion.div
        className="absolute inset-[14%] overflow-hidden rounded-[2rem] shadow-cinematic ring-1 ring-white/70"
        initial={{ rotate: 2 }}
        whileHover={{ rotate: 0, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <Image
          src={kitchenAfter}
          alt="A real family kitchen, freshly deep-cleaned by Monica's Miracle Mop"
          fill
          sizes="(max-width: 768px) 90vw, 480px"
          placeholder="blur"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 rounded-2xl glass-card px-4 py-3 ring-1 ring-white/40">
          <Sparkles className="size-4 text-primary shrink-0" aria-hidden />
          <p className="text-xs font-medium text-foreground">
            Spotless spaces · Peace of mind
          </p>
        </div>
      </motion.div>

      {/* Sparkle accents */}
      <motion.span
        aria-hidden
        className="absolute top-[12%] right-[18%] text-primary/40 text-2xl"
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        ✦
      </motion.span>
      <motion.span
        aria-hidden
        className="absolute bottom-[12%] right-[12%] text-secondary/40 text-xl"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
      >
        ✦
      </motion.span>
    </div>
  )
}
