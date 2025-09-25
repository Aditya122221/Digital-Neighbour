"use client"

import { useEffect, useRef, useState } from 'react'

export default function Process() {
  const [activeStep, setActiveStep] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const steps = [
    {
      number: "01",
      title: "Planning & Strategy",
      description: "After analyzing your site, competition, and general market landscape we apply our knowledge and experience in SEO & PPC to build out the best growth strategy for your SaaS.\n\nWe then lay out the roadmap of a potential project together and show you how we can achieve your goals with real-world data using our proprietary AI-powered processes & technology."
    },
    {
      number: "02", 
      title: "Kick-Off & On-Boarding",
      description: "When our projects kick off we hit the ground running, gathering all of the data we can from you about your business from detailed questionnaires, and tools like Google Analytics & Google Search Console, as well as in strategy calls with your team.\n\nWe get familiarized with your business in an innate way and seek to understand your customers needs and pain points so that we can speak to them on their terms."
    },
    {
      number: "03",
      title: "Recommendations & Implementation", 
      description: "We deliver a comprehensive strategy to you and your team over multiple strategy deep-dive calls that go in-depth into each area of your SaaS marketing, educating you on our recommendations and why they are important.\n\nThen we find the best course to implement those recommendations."
    },
    {
      number: "04",
      title: "Production & Promotion",
      description: "When you have a solid marketing strategy, there's only one thing left to do - execute.\n\nWe help your team prioritize, optimize, create, and promote content that aligns with your target ICP's pain points, concerns, and search patterns to attract customers at each stage in the buyer's journey.\n\nWe either produce content for you, or guide your team through the production process, then promote it for you."
    },
    {
      number: "05",
      title: "Reporting & Analysis",
      description: "One of the most important things you can do with any growth project is to keep a close eye on the performance, and use data to adapt over time.\n\nWe provide deep monthly reports with the metrics that matter most to your SaaS growth and analyze them for future opportunities.\n\nWe continually iterate on our actions, adjusting course when needed to achieve your goals as efficiently as possible."
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const centerY = windowHeight / 2
      let closestStep = 0
      let minDistance = Infinity

      steps.forEach((_, index) => {
        const stepElement = document.querySelector(`[data-step="${index}"]`) as HTMLElement
        if (stepElement) {
          const rect = stepElement.getBoundingClientRect()
          const stepCenter = rect.top + rect.height / 2
          const distance = Math.abs(stepCenter - centerY)
          
          if (distance < minDistance) {
            minDistance = distance
            closestStep = index
          }
        }
      })

      setActiveStep(closestStep)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-6 mt-20">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-light text-black mb-4">
            An <span className="text-yellow">agile process</span> built to scale with your needs.
          </h2>
        </div>

        {/* Process Timeline */}
        <div ref={containerRef} className="relative">
          {/* Black Container */}
          <div className="bg-black rounded-3xl md:mx-6 mx-0 relative overflow-hidden">
            {/* Desktop Layout */}
            <div className="hidden lg:block">
              {/* Central Timeline Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white transform -translate-x-1/2"></div>

              {/* Steps */}
              <div className="relative z-10">
                {steps.map((step, index) => (
                  <div 
                    key={index}
                    data-step={index}
                    className="flex items-center h-auto py-20 px-12"
                  >
                    {/* Left Side - Step Info */}
                    <div className="w-1/2 pr-12 flex flex-col justify-center">
                      <div className="text-right">
                        <div className="text-yellow text-2xl font-semibold mb-2">
                          {step.number}
                        </div>
                        <h3 className="text-white text-3xl md:text-4xl font-semibold">
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    {/* Right Side - Description Box */}
                    <div className="w-1/2 pl-12 flex items-center">
                      <div className={`rounded-2xl p-8 transition-all duration-500 ${
                        index === activeStep 
                          ? 'bg-white' 
                          : 'bg-gray-800 opacity-50'
                      }`}>
                        <div className={`text-sm leading-relaxed ${
                          index === activeStep ? 'text-black' : 'text-gray-300'
                        }`}>
                          {step.description.split('\n\n').map((paragraph, pIndex) => (
                            <p key={pIndex} className="mb-4 last:mb-0 text-lg font-light">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Timeline Dot */}
                    <div 
                      data-dot={index}
                      className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                        index === activeStep 
                          ? 'bg-yellow border-yellow scale-125' 
                          : 'bg-transparent border-gray-400'
                      }`}
                      style={{ top: `${(index + 0.5) * (100 / steps.length)}%` }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden">
              {/* Steps */}
              <div className="px-6">
                {steps.map((step, index) => (
                  <div 
                    key={index}
                    className="py-6"
                  >
                    {/* Step Info */}
                    <div className="mb-6">
                      <div className="text-yellow text-2xl font-semibold mb-2">
                        {step.number}
                      </div>
                      <h3 className="text-white text-3xl font-semibold mb-4">
                        {step.title}
                      </h3>
                    </div>

                    {/* Description Box */}
                    <div className="bg-white rounded-2xl p-6">
                      <div className="text-sm leading-relaxed text-black">
                        {step.description.split('\n\n').map((paragraph, pIndex) => (
                          <p key={pIndex} className="mb-4 last:mb-0 text-base font-light">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
