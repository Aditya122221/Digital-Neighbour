"use client";

import CustomButton from '../core/button';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function BookACall() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Create floating effect - moves up when scrolling down with smooth easing
  const y = useTransform(
    scrollYProgress, 
    [0.3, 0.9], 
    [350, 0],
    { clamp: false }
  );

  return (
    <div className="bg-pink/20 py-16 px-0 lg:px-0 relative z-20" ref={sectionRef}>
    <motion.section 
      className="bg-[#5D50EB] py-6 px-6 rounded-3xl shadow-2xl relative"
      style={{ y }}
      transition={{ type: "spring", stiffness: 100, damping: 30 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Hand-drawn illustrations */}
          <div className="flex-1 flex items-center justify-center gap-8 order-1 lg:order-1">
          

            {/* Contact Vector */}
            <div className="relative text-white">
              <Image
                src="/homepage/contactus-vector.svg"
                alt="Contact us illustration"
                width={200}
                height={200}
                className="w-96 h-96"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>

          </div>

          {/* Right side - Content */}
          <div className="flex-1 text-cream text-white order-2 lg:order-2 text-center lg:text-left">
            <h2 className="md:text-6xl text-4xl font-light mb-6 text-balance">Book a call now.</h2>

            <p className="text-xl mb-4 font-light text-pretty">Let's talk about what's holding your growth back.</p>

            <p className="text-lg mb-8 font-light text-pretty opacity-90">
              No sales pitch, just a genuine conversation with our agency's director about your business.
            </p>

            <CustomButton text="Book a call" href="/contact" textColor="black" borderColor="black" iconBG="#5D50EB" iconColor="white" />
          </div>
        </div>
      </div>
    </motion.section>
    </div>
  )
}
