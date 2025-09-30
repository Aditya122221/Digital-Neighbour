"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [cursorPos, setCursorPos] = useState({ x: -9999, y: -9999 }) // hidden initially

  // Scroll tracking for dissolve effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  // Transform scroll progress to opacity and scale
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -50])

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const handleMouseLeave = () => {
      setCursorPos({ x: -9999, y: -9999 }) // hide hole when leaving
    }

    hero.addEventListener("mousemove", handleMouseMove)
    hero.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove)
      hero.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden cursor-none"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/homepage/hero-bg3.jpg')`,
        }}
      />

      {/* Solid overlay with reveal mask */}
      <div
        className="absolute inset-0 bg-junglegreen"
        style={{
          WebkitMaskImage: `radial-gradient(circle 120px at ${cursorPos.x}px ${cursorPos.y}px, transparent 99px, black 100px)`,
          WebkitMaskRepeat: "no-repeat",
          maskImage: `radial-gradient(circle 120px at ${cursorPos.x}px ${cursorPos.y}px, transparent 99px, black 100px)`,
          maskRepeat: "no-repeat",
        }}
      />

      {/* Hero content */}
      <motion.div
        className="relative z-20 max-w-5xl mx-auto px-6 text-center"
        style={{
          opacity: textOpacity,
          scale: textScale,
          y: textY,
        }}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight text-balance text-bone text-center font-cal-sans tracking-wide">
          {"Borderless ".split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.5 + index * 0.05,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className={char === ' ' ? 'inline' : 'inline-block'}
            >
              {char}
            </motion.span>
          ))}
          <motion.span 
            className="inline-block w-8 h-10 md:w-12 md:h-12 lg:w-20 lg:h-18 -mb-1 md:-mb-2 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm border-2 border-white/30 mx-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ 
              opacity: 1, 
              x: [0, 2, -1, 1, 0],
              y: [0, -1, 2, -1, 0]
            }}
            transition={{ 
              opacity: { duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] },
              x: { duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 4 }
            }}
          >
            <img 
              src="/homepage/hero/1.jpg" 
              alt="Hero image 1" 
              className="w-full h-full object-cover"
            />
          </motion.span>
          {"Marketing".split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.9 + index * 0.05,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className={char === ' ' ? 'inline' : 'inline-block'}
            >
              {char}
            </motion.span>
          ))}
        </h1>
        <p className="mt-8 text-lg md:text-xl lg:text-3xl font-semibold leading-tight text-pretty max-w-3xl mx-auto text-bone/90 text-center">
          {"Transform your business into a ".split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 1.5 + index * 0.02,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className={char === ' ' ? 'inline' : 'inline-block'}
            >
              {char}
            </motion.span>
          ))}
          <motion.span 
            className="inline-block w-6 h-7 md:w-8 md:h-8 lg:w-16 lg:h-14 -mb-1 md:-mb-2 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm border-2 border-white/30 mx-1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ 
              opacity: 1, 
              x: [0, -2, 1, -1, 0],
              y: [0, 1, -2, 1, 0]
            }}
            transition={{ 
              opacity: { duration: 0.6, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] },
              x: { duration: 0.6, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] },
              y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 4.2 }
            }}
          >
            <img 
              src="/homepage/hero/2.jpg" 
              alt="Hero image 2" 
              className="w-full h-full object-cover"
            />
          </motion.span>
          {"Digital Success story with ".split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 2.2 + index * 0.02,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className={char === ' ' ? 'inline' : 'inline-block'}
            >
              {char}
            </motion.span>
          ))}
          <motion.span 
            className="inline-block w-6 h-7 md:w-8 md:h-8 lg:w-16 lg:h-14 -mb-1 md:-mb-2 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm border-2 border-white/30 mx-1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ 
              opacity: 1, 
              x: [0, 1, -3, 2, 0],
              y: [0, 2, -1, -1, 0]
            }}
            transition={{ 
              opacity: { duration: 0.6, delay: 1.9, ease: [0.25, 0.1, 0.25, 1] },
              x: { duration: 0.6, delay: 1.9, ease: [0.25, 0.1, 0.25, 1] },
              y: { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 4.4 }
            }}
          >
            <img 
              src="/homepage/hero/3.jpg" 
              alt="Hero image 3" 
              className="w-full h-full object-cover"
            />
          </motion.span>
          {"Digital Neighbour".split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 2.9 + index * 0.02,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className={char === ' ' ? 'inline' : 'inline-block'}
            >
              {char}
            </motion.span>
          ))}
          <motion.span 
            className="inline-block w-6 h-7 md:w-8 md:h-8 lg:w-16 lg:h-14 -mb-1 md:-mb-2 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm border-2 border-white/30 mx-1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ 
              opacity: 1, 
              x: [0, 2, -1, 1, 0],
              y: [0, -1, 2, -1, 0]
            }}
            transition={{ 
              opacity: { duration: 0.6, delay: 2.6, ease: [0.25, 0.1, 0.25, 1] },
              x: { duration: 0.6, delay: 2.6, ease: [0.25, 0.1, 0.25, 1] },
              y: { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 4.6 }
            }}
          >
            <img 
              src="/homepage/hero/4.jpg" 
              alt="Hero image 4" 
              className="w-full h-full object-cover"
            />
          </motion.span>
        </p>
        
        {/* CTA Button */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 3.5,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          <motion.button
            className="px-8 py-4 bg-black text-md text-white font-semibold rounded-full hover:bg-black transition-colors duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}
