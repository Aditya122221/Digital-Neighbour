"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

const caseStudies = [
  {
    id: 1,
    title: "Festive Green",
    bgImages: [
      "https://images.pexels.com/photos/1671643/pexels-photo-1671643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/29646117/pexels-photo-29646117.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/17183905/pexels-photo-17183905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/11809060/pexels-photo-11809060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    textColor: "text-white",
    services: ["Website", "Brand Identity"],
    isNew: false,
    metrics: [
      { number: "44+", text: "users increased" },
      { number: "20%", text: "engagement increased" },
      { number: "3x", text: "conversion rate" }
    ]
  },
  {
    id: 2,
    title: "Dyslexia South",
    bgImages: [
      "https://images.pexels.com/photos/1036642/pexels-photo-1036642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/15969201/pexels-photo-15969201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/18091792/pexels-photo-18091792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    textColor: "text-black",
    services: ["Website", "Brand Identity", "Brand Implementation"],
    isNew: false,
    metrics: [
      { number: "67%", text: "accessibility improved" },
      { number: "150+", text: "new members" },
      { number: "85%", text: "user satisfaction" }
    ]
  },
  {
    id: 3,
    title: "Evolve [25]",
    bgImages: [
      "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/7634159/pexels-photo-7634159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/27552013/pexels-photo-27552013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/33206676/pexels-photo-33206676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    textColor: "text-white",
    services: ["Website", "Brand Identity", "Brand Implementation"],
    isNew: true,
    metrics: [
      { number: "2.5x", text: "brand recognition" },
      { number: "90%", text: "lead generation" },
      { number: "35%", text: "cost reduction" }
    ]
  },
  {
    id: 4,
    title: "Creative Studio",
    bgImages: [
      "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/7858745/pexels-photo-7858745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/14263450/pexels-photo-14263450.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    textColor: "text-white",
    services: ["Website", "Brand Identity"],
    isNew: false,
    metrics: [
      { number: "78%", text: "portfolio views" },
      { number: "45+", text: "new clients" },
      { number: "60%", text: "social engagement" }
    ]
  },
]

export default function CaseStudy() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: number]: number}>({})

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

  const cycleImage = (cardId: number) => {
    const study = caseStudies.find(s => s.id === cardId)
    if (study && hoveredCard === cardId) {
      setCurrentImageIndex(prev => ({
        ...prev,
        [cardId]: ((prev[cardId] || 0) + 1) % study.bgImages.length
      }))
    }
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
  }, [hoveredCard])

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
            Latest work
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
                  <h3 className="text-2xl md:text-2xl font-medium">{study.title}</ h3>
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
                    <span className="px-3 py-1 bg-green4 text-blackbrown text-xl rounded-full font-medium">New</span>
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
            className="w-12 h-12 bg-green1 text-pink rounded-full flex items-center justify-center hover:bg-blackbrown/80 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="w-12 h-12 bg-green1 text-pink rounded-full flex items-center justify-center hover:bg-blackbrown/80 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}
