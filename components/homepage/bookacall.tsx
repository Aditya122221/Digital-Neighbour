"use client";

import CustomButton from '../core/button';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

type BookACallProps = {
	data?: {
		heading?: string;
		description?: string;
		subDescription?: string;
		buttonText?: string;
		buttonLink?: string;
		illustrationImage?: string;
	};
}

export default function BookACall({ data }: BookACallProps) {
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

  const heading = data?.heading || "Book a call now.";
  const description = data?.description || "Let's talk about what's holding your growth back.";
  const subDescription = data?.subDescription || "No sales pitch, just a genuine conversation with our agency's director about your business.";
  const buttonText = data?.buttonText || "Book a call";
  const buttonLink = data?.buttonLink || "/contact";
  const illustrationImage = data?.illustrationImage || "/homepage/contactus-vector.svg";

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
                src={illustrationImage}
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
            <h2 className="md:text-6xl text-4xl font-light mb-6 text-balance">{heading}</h2>

            <p className="text-xl mb-4 font-light text-pretty">{description}</p>

            <p className="text-lg mb-8 font-light text-pretty opacity-90">
              {subDescription}
            </p>

            <CustomButton text={buttonText} href={buttonLink} textColor="black" borderColor="black" iconBG="#5D50EB" iconColor="white" />
          </div>
        </div>
      </div>
    </motion.section>
    </div>
  )
}
