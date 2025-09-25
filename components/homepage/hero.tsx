"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function Hero() {
  const circleRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  
  // Scroll tracking for dissolve effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  // Transform scroll progress to opacity and scale
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -50])

  useEffect(() => {
    const circle = circleRef.current
    const hero = heroRef.current
    if (!circle || !hero) return

    let rafId: number | null = null
    let latestX = 0
    let latestY = 0
    let needsUpdate = false
    let lastTextCheck = 0

    const update = () => {
      needsUpdate = false
      const heroRect = hero.getBoundingClientRect()
      const relativeX = latestX - heroRect.left
      const relativeY = latestY - heroRect.top

      circle.style.left = `${relativeX}px`
      circle.style.top = `${relativeY}px`

      // Throttle elementFromPoint checks (~ every 60ms)
      const now = performance.now()
      if (now - lastTextCheck > 60) {
        lastTextCheck = now
        const elementUnderCursor = document.elementFromPoint(latestX, latestY)
        const isOverTextElement =
          elementUnderCursor?.tagName === "H1" ||
          elementUnderCursor?.tagName === "P" ||
          elementUnderCursor?.closest("h1") ||
          elementUnderCursor?.closest("p")
        if (isOverTextElement) {
          circle.classList.add("behind-text")
        } else {
          circle.classList.remove("behind-text")
        }
      }

      rafId = null
    }

    const handleMouseMove = (e: MouseEvent) => {
      latestX = e.clientX
      latestY = e.clientY
      if (!needsUpdate) {
        needsUpdate = true
        rafId = requestAnimationFrame(update)
      }
    }

    const handleMouseEnter = () => {
      circle.style.opacity = "1"
    }

    const handleMouseLeave = () => {
      circle.style.opacity = "0"
    }

    hero.addEventListener("mousemove", handleMouseMove, { passive: true })
    hero.addEventListener("mouseenter", handleMouseEnter, { passive: true })
    hero.addEventListener("mouseleave", handleMouseLeave, { passive: true })

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove)
      hero.removeEventListener("mouseenter", handleMouseEnter)
      hero.removeEventListener("mouseleave", handleMouseLeave)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative h-[70vh] md:h-screen bg-darkbeige flex items-center justify-center overflow-hidden cursor-none"
    >
      {/* Mouse following circle */}
      <div ref={circleRef} className="cursor-circle opacity-0 bg-yellow" />

      {/* Hero content */}
      <motion.div 
        className="relative z-20 max-w-4xl mx-auto px-6 text-center"
        style={{
          opacity: textOpacity,
          scale: textScale,
          y: textY
        }}
      >
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance text-blackbrown"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Borderless Marketing
        </motion.h1>
        <motion.p 
          className="mt-8 text-lg md:text-xl lg:text-4xl leading-tight text-pretty max-w-7xl mx-auto text-blackbrown/90"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Transform your business into a Digital Success story with <span className="italic">Digital Neighbour's</span> data driven Digital Marketing
          Services in New Zealand.
        </motion.p>
      </motion.div>
    </section>
  )
}
