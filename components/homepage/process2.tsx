"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const Process2 = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [cardHeights, setCardHeights] = useState<number[]>([]);
  const [cardPositions, setCardPositions] = useState<number[]>([]);
  const [mobileDotPositions, setMobileDotPositions] = useState<{top: number, opacity: number}[]>([
    {top: 0, opacity: 0.3}, {top: 0, opacity: 0.3}, {top: 0, opacity: 0.3}, {top: 0, opacity: 0.3}, {top: 0, opacity: 0.3}
  ]);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Framer Motion values
  const progressValue = useMotionValue(0);
  const [stepPositions, setStepPositions] = useState<number[]>([0, 0, 0, 0, 0]);

  // Placeholder data
  const steps = [
    "Discovery & Research",
    "Strategy & Planning", 
    "Design & Development",
    "Testing & Optimization",
    "Launch & Support"
  ];

  const cardContent = [
    "After analyzing your site, competition, and general market landscape we apply our knowledge and experience in SEO & PPC to build out the best growth strategy for your SaaS.<br><br>We then lay out the roadmap of a potential project together and show you how we can achieve your goals with real-world data using our proprietary AI-powered processes & technology.",
    
    "When our projects kick off we hit the ground running, gathering all of the data we can from you about your business from detailed questionnaires, and tools like Google Analytics & Google Search Console, as well as in strategy calls with your team.<br><br>We get familiarized with your business in an innate way and seek to understand your customers needs and pain points so that we can speak to them on their terms.",
    
    "We deliver a comprehensive strategy to you and your team over multiple strategy deep-dive calls that go in-depth into each area of your SaaS marketing, educating you on our recommendations and why they are important.<br><br>Then we find the best course to implement those recommendations.",
    
    "When you have a solid marketing strategy, there's only one thing left to do - execute.<br><br>We help your team prioritize, optimize, create, and promote content that aligns with your target ICP's pain points, concerns, and search patterns to attract customers at each stage in the buyer's journey. We either produce content for you, or guide your team through the production process, then promote it for you.",
    
    "One of the most important things you can do with any growth project is to keep a close eye on the performance, and use data to adapt over time.<br><br>We provide deep monthly reports with the metrics that matter most to your SaaS growth and analyze them for future opportunities. We continually iterate on our actions, adjusting course when needed to achieve your goals as efficiently as possible."
  ];

  // Calculate dynamic heights and positions
  useEffect(() => {
    const calculateCardDimensions = () => {
      if (cardRefs.current.length === 0) return;

      const heights: number[] = [];
      const positions: number[] = [];
      let currentPosition = 0;

      cardRefs.current.forEach((cardRef, index) => {
        if (cardRef) {
          const height = cardRef.offsetHeight;
          heights[index] = height;
          positions[index] = currentPosition;
          currentPosition += height + 120; // 40px gap between cards
        }
      });

      setCardHeights(heights);
      setCardPositions(positions);
    };

    // Calculate after a short delay to ensure cards are rendered
    const timer = setTimeout(calculateCardDimensions, 100);
    return () => clearTimeout(timer);
  }, [cardContent]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const centerY = windowHeight / 2;
      
      // Check if we're in mobile view
      const isMobile = window.innerWidth < 1024; // lg breakpoint
      
      if (isMobile) {
        // Mobile scroll logic - activate when progress hits the dot (like desktop)
        let currentStep = -1;
        
        steps.forEach((_, index) => {
          const stepElement = document.querySelector(`[data-mobile-step="${index}"]`) as HTMLElement;
          if (stepElement) {
            const rect = stepElement.getBoundingClientRect();
            const containerElement = stepElement.closest('.bg-black') as HTMLElement;
            
            if (containerElement) {
              const containerRect = containerElement.getBoundingClientRect();
              const cardTop = rect.top - containerRect.top;
              const cardBottom = rect.bottom - containerRect.top;
              const cardHeight = cardBottom - cardTop;
              
              // Calculate progress based on scroll position
              const totalHeight = steps.length * 600;
              const currentScrollPosition = scrollProgress * totalHeight;
              
              // Card is active when progress bar reaches its top edge (where the dot starts)
              if (currentScrollPosition >= cardTop) {
                currentStep = index;
              }
            }
          }
        });

        setActiveStep(currentStep);

        // Calculate progress for mobile based on scroll position (like desktop)
        let progress = 0;
        const firstStep = document.querySelector('[data-mobile-step="0"]') as HTMLElement;
        const lastStep = document.querySelector(`[data-mobile-step="${steps.length - 1}"]`) as HTMLElement;
        
        if (firstStep && lastStep) {
          const firstRect = firstStep.getBoundingClientRect();
          const lastRect = lastStep.getBoundingClientRect();
          const containerTop = firstRect.top;
          const containerHeight = lastRect.bottom - firstRect.top;
          
          // Progress from 0 to 1 based on scroll position (same logic as desktop)
          if (containerTop < windowHeight * 0.75 && containerTop > -containerHeight) {
            progress = Math.max(0, Math.min(1, (windowHeight * 0.75 - containerTop) / (containerHeight + windowHeight * 0.1)));
          }
        }

        setScrollProgress(progress);
        animate(progressValue, progress, { duration: 0.1, ease: "easeOut" });
        
        // Update mobile dot positions
        const newDotPositions = steps.map((_, index) => {
          const stepElement = document.querySelector(`[data-mobile-step="${index}"]`) as HTMLElement;
          let dotTop = index * 600; // Fallback
          let opacity = 0.3;
          
          if (stepElement) {
            const rect = stepElement.getBoundingClientRect();
            const containerElement = stepElement.closest('.bg-black') as HTMLElement;
            
            if (containerElement) {
              const containerRect = containerElement.getBoundingClientRect();
              const cardTop = rect.top - containerRect.top;
              const cardBottom = rect.bottom - containerRect.top;
              const cardHeight = cardBottom - cardTop;
              
              // Calculate progress based on scroll position
              const totalHeight = steps.length * 600;
              const currentScrollPosition = progress * totalHeight;
              
              // Dot starts at card top edge
              dotTop = cardTop;
              
              // If progress has reached this card, move dot down
              if (currentScrollPosition >= cardTop) {
                const cardProgress = Math.min(1, (currentScrollPosition - cardTop) / cardHeight);
                dotTop = cardTop + (cardProgress * cardHeight);
                opacity = 1;
              } else if (currentScrollPosition >= cardTop - 100) {
                opacity = 0.6;
              }
            }
          }
          
          return { top: dotTop, opacity };
        });
        
        setMobileDotPositions(newDotPositions);
        
      } else {
        // Desktop scroll logic
        if (!containerRef.current || cardHeights.length === 0) return;

        const container = containerRef.current;
        const containerRect = container.getBoundingClientRect();
        
        // Calculate how much of the container is visible
        const containerTop = containerRect.top;
        const containerHeight = containerRect.height;
        
        // Progress from 0 to 1 based on scroll position
        let progress = 0;
        if (containerTop < windowHeight * 0.75 && containerTop > -containerHeight) {
          progress = Math.max(0, Math.min(1, (windowHeight * 0.75 - containerTop) / (containerHeight + windowHeight * 0.1)));
        }
        
        setScrollProgress(progress);
        
        // Update Framer Motion values smoothly
        animate(progressValue, progress, { duration: 0.1, ease: "easeOut" });
        
        // Calculate which step should be active based on progress
        const totalHeight = cardPositions[cardPositions.length - 1] + cardHeights[cardHeights.length - 1];
        const currentScrollPosition = progress * totalHeight;
        
        // Find which step should be active - only when progress bar reaches the dot
        let currentStep = -1;
        const newStepPositions = [0, 0, 0, 0, 0];
        
        for (let i = 0; i < 5; i++) {
          const cardTop = cardPositions[i] || 0;
          const cardHeight = cardHeights[i] || 400;
          const cardBottom = cardTop + cardHeight;
          
          // Card is active when progress bar reaches its top edge (where the dot starts)
          if (currentScrollPosition >= cardTop) {
            currentStep = i;
          }
          
          // Calculate step name position
          let stepTop = cardTop;
          if (currentScrollPosition >= cardTop) {
            const cardProgress = Math.min(1, (currentScrollPosition - cardTop) / cardHeight);
            const maxStepTop = cardBottom - 80; // Account for step name container height
            stepTop = Math.min(cardTop + (cardProgress * cardHeight), maxStepTop);
          }
          newStepPositions[i] = stepTop;
        }
        
        setActiveStep(currentStep);
        
        // Update step name positions smoothly
        setStepPositions(newStepPositions);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // Handle window resize
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [cardHeights, cardPositions]);

  return (
    <div className="py-20 bg-gradient-to-b from-pink/20 to-white">
      <div className="container mx-auto px-6 mt-20">
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-6xl font-regular text-black mb-4 font-cal-sans tracking-wide">
            Our <span className="relative inline-block">
              <span className="absolute bottom-1 left-0 right-0 h-2/4 bg-green5"></span>
              <span className="relative z-10 font-medium italic">agile process</span>
            </span>
          </h2>
        </motion.div>

        {/* Black Container */}
        <div className="bg-black py-10 pr-5 md:pr-0 rounded-3xl md:mx-6 mx-0 relative overflow-hidden">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div 
              ref={containerRef}
              className="relative max-w-6xl mx-auto py-20"
              style={{ 
                height: cardPositions.length > 0 
                  ? `${cardPositions[cardPositions.length - 1] + cardHeights[cardHeights.length - 1]}px`
                  : '2500px'
              }}
            >
              {/* Left side - Step Names */}
              <div className="absolute left-0 top-0 w-120 h-full">
                {steps.map((step, index) => {
                  if (cardPositions.length === 0) return null;
                  
                  const cardTop = cardPositions[index] || 0;
                  const cardHeight = cardHeights[index] || 400;
                  const cardBottom = cardTop + cardHeight;
                  
                  return (
                    <motion.div
                      key={index}
                      className="absolute text-right"
                      style={{
                        top: `${stepPositions[index] || cardTop}px`,
                        right: '0px',
                        scale: activeStep === index ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <div
                        className={`px-4 py-3 rounded-lg transition-all duration-300 ${
                          activeStep === index
                            ? 'bg-black text-white'
                            : 'bg-black text-white opacity-30'
                        }`}
                      >
                        <div className="text-xl font-bold text-start mb-1 text-yellow">
                          {index + 1}
                        </div>
                        <div className="text-3xl font-medium leading-tight">
                          {step}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Center - Progress Bar */}
              <div className="absolute left-1/2 top-0 w-8 h-full transform -translate-x-1/2">
                <div className="relative h-full">
                  {/* Progress bar background */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200 rounded-full"></div>
                  
                  {/* Animated progress bar */}
                  <motion.div
                    ref={progressBarRef}
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-yellow rounded-full"
                    style={{
                      height: useTransform(progressValue, (value) => 
                        cardPositions.length > 0 
                          ? `${value * (cardPositions[cardPositions.length - 1] + cardHeights[cardHeights.length - 1])}px`
                          : `${value * 100}%`
                      ),
                    }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                  ></motion.div>
                  
                  {/* Progress indicators for each step */}
                  {steps.map((_, index) => {
                    if (cardPositions.length === 0) return null;
                    
                    const cardTop = cardPositions[index] || 0;
                    const cardHeight = cardHeights[index] || 400;
                    const totalHeight = cardPositions[cardPositions.length - 1] + cardHeights[cardHeights.length - 1];
                    const currentScrollPosition = scrollProgress * totalHeight;
                    
                    // Calculate dot position - starts at top edge, moves to bottom edge
                    let dotTop = cardTop;
                    if (currentScrollPosition >= cardTop) {
                      // When progress bar hits this card level
                      const cardProgress = Math.min(1, (currentScrollPosition - cardTop) / cardHeight);
                      dotTop = cardTop + (cardProgress * cardHeight); // Move down to bottom edge
                    }
                    
                    return (
                      <motion.div
                        key={index}
                        className="absolute w-5 h-5 bg-yellow border-4 border-yellow rounded-full transform -translate-x-1/2"
                        style={{
                          top: `${dotTop}px`,
                          left: '50%',
                          opacity: currentScrollPosition >= cardTop ? 1 : 0.3,
                        }}
                        transition={{ duration: 0.1, ease: "easeOut" }}
                      ></motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Right side - Cards */}
              <div className="absolute right-0 top-0 w-120 h-full">
                {cardContent.map((card, index) => (
                  <div
                    key={index}
                    ref={(el) => {
                      if (el) {
                        cardRefs.current[index] = el;
                      }
                    }}
                    className={`absolute p-8 rounded-2xl shadow-lg transition-all duration-500 ${
                      activeStep === index
                        ? 'bg-white text-black transform scale-105'
                        : 'bg-black text-white/80 opacity-30 border border-white/20'
                    }`}
                    style={{ 
                      top: cardPositions[index] ? `${cardPositions[index]}px` : `${index * 500}px`,
                      width: '450px',
                      minHeight: '200px'
                    }}
                    >
                      <p className="text-lg leading-normal font-light pr-8" dangerouslySetInnerHTML={{ __html: card }}></p>
                    </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            <div className="relative flex">
              {/* Left side - Progress Bar (10% width) */}
              <div className="w-[10%] relative">
                <div className="relative h-full" style={{ minHeight: `${steps.length * 600}px` }}>
                  {/* Progress bar background */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200 rounded-full"></div>
                  
                  {/* Animated progress bar */}
                  <motion.div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-green4 rounded-full"
                    style={{
                      height: useTransform(progressValue, (value) => {
                        const totalHeight = steps.length * 600; // Use consistent height
                        return `${value * totalHeight}px`;
                      }),
                    }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                  ></motion.div>
                  
                  {/* Progress indicators for each step */}
                  {steps.map((_, index) => {
                    const dotPosition = mobileDotPositions[index] || { top: index * 600, opacity: 0.3 };
                    
                    return (
                      <motion.div
                        key={index}
                        className="absolute w-5 h-5 bg-green4 border-4 border-green4 rounded-full transform -translate-x-1/2"
                        style={{
                          top: `${dotPosition.top}px`,
                          left: '50%',
                          opacity: dotPosition.opacity,
                        }}
                        transition={{ duration: 0.1, ease: "easeOut" }}
                      ></motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Right side - Steps and Cards (90% width) */}
              <div className="w-[90%] pl-6">
                {steps.map((step, index) => (
                  <div 
                    key={index} 
                    className="mb-12"
                    data-mobile-step={index}
                  >
                    {/* Step Name */}
                    <div className={`mb-4 p-4 rounded-lg transition-all duration-300 ${
                      activeStep === index
                        ? 'bg-black text-white'
                        : 'bg-black text-white opacity-30'
                    }`}>
                      <div className="text-xl font-bold text-start mb-1 text-green4">
                        {index + 1}
                      </div>
                      <div className="text-2xl font-medium leading-tight">
                        {step}
                      </div>
                    </div>

                    {/* Card */}
                    <div className={`p-6 rounded-2xl shadow-lg transition-all duration-500 ${
                      activeStep === index
                        ? 'bg-pink text-black transform scale-105'
                        : 'bg-green2 text-white/80 opacity-30 border border-white/20'
                    }`}>
                      <p className="text-lg leading-normal font-light" dangerouslySetInnerHTML={{ __html: cardContent[index] }}></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process2;
