"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import type { CaseStudiesSectionData } from "@/lib/home-sections"

type CaseStudyProps = {
	data: CaseStudiesSectionData
}

export default function CaseStudyClient({ data }: CaseStudyProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: number]: number}>({})

  const caseStudies = data.items ?? []
  const sectionHeading = data.heading ?? "Latest work"

  if (!caseStudies.length) {
    return null
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % caseStudies.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length)
  }

  const handleMouseEnter = (cardId: number) => {
    setHoveredCard(cardId)
    setCurrentImageIndex(prev => ({ ...prev, [cardId]: 0 }))
  }

  const handleMouseLeave = (cardId: number) => {
    setHoveredCard(null)
    setCurrentImageIndex(prev => ({ ...prev, [cardId]: 0 }))
  }

  // Auto-cycle images when hovering
  useEffect(() => {
    if (hoveredCard !== null) {
      const interval = setInterval(() => {
        const study = caseStudies.find(s => s.id === hoveredCard)
        if (study) {
          setCurrentImageIndex(prev => ({
            ...prev,
            [hoveredCard]: ((prev[hoveredCard] || 0) + 1) % study.bgImages.length
          }))
        }
      }, 1000) // Change image every 1 second

      return () => clearInterval(interval)
    }
  }, [hoveredCard, caseStudies])

  const getVisibleCards = () => {
    const cards = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % caseStudies.length
      cards.push(caseStudies[index])
    }
    return cards
  }

  return (
    <section className="py-20 min-h-screen px-6 bg-bone/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-6xl font-regular text-blackbrown mb-6 text-balance font-cal-sans tracking-wide">
            {sectionHeading}
          </h2>
        </motion.div>

        {/* Cards Container */}
        <div className="flex gap-6 mb-8 overflow-hidden">
          {getVisibleCards().map((study, index) => {
            const currentImgIndex = currentImageIndex[study.id] || 0
            const currentBgImage = study.bgImages[currentImgIndex]
            
            return (
            <div
              key={`${study.id}-${currentIndex}-${index}`}
              className={`
                flex-shrink-0 basis-full sm:basis-[calc((100%_-_1.5rem)/2)] lg:basis-[calc((100%_-_3rem)/3)] h-[36rem] rounded-4xl p-6 relative flex flex-col group
                ${study.textColor}
                transition-all duration-500 ease-in-out
                bg-cover bg-center bg-no-repeat
              `}
              style={{
                backgroundImage: `url(${currentBgImage})`
              }}
              onMouseEnter={() => handleMouseEnter(study.id)}
              onMouseLeave={() => handleMouseLeave(study.id)}
            >
              {/* Header */}
              <div className="mb-6 w-full">
                <div className="backdrop-blur-md bg-white/20 rounded-full px-4 py-3 flex items-center justify-between w-full border border-white/30">
                  <h3 className="text-2xl md:text-2xl font-medium">{study.title}</h3>
                  <ArrowUpRight className="w-10 h-10 transition-transform duration-300 ease-in-out group-hover:rotate-45" />
                </div>
              </div>

              {/* Hover Overlay with Metrics */}
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-4xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-10">
                <div className="text-center px-6">
                  <div className="grid grid-cols-1 gap-8">
                    {study.metrics.map((metric, index) => (
                      <div key={index} className="text-center">
                        <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                          {metric.number}
                        </div>
                        <div className="text-lg md:text-xl text-white/80 font-light capitalize">
                          {metric.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Services Tags - Bottom of card */}
              <div className="mt-auto relative z-5">
                <div className="flex flex-wrap gap-2">
                  {study.isNew && (
                    <span className="px-3 py-1 bg-yellow text-blackbrown text-xl rounded-full font-medium">New</span>
                  )}
                  {study.services.map((service) => (
                    <span
                      key={service}
                      className="px-3 py-1 text-xl rounded-full font-light bg-white/20 backdrop-blur-sm border border-white/30"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            )
          })}
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <button
            onClick={prevSlide}
            className="w-12 h-12 bg-black text-yellow rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="w-12 h-12 bg-black text-yellow rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}
