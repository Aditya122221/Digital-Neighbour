"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CustomButton } from "@/components/core/button";

interface DataAnalyticsHeroProps {
  data: {
    tagline?: string;
    heading: string;
    subheading: string;
  };
}

export default function DataAnalyticsHero({ data }: DataAnalyticsHeroProps) {
  return (
    <section className="relative pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 lg:pb-32 overflow-x-hidden bg-gradient-to-br from-black via-black to-yellow">
      {/* Content */}
      <div className="relative z-20 container mx-auto py-6 md:py-0 px-6 lg:px-12">
        <div className="relative flex items-center justify-center min-h-[70vh]">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Top Tagline */}
            <motion.div
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              {data.tagline && (
                <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                  <span className="text-sm text-white/80">{data.tagline}</span>
                </div>
              )}
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.1,
              }}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight font-cal-sans text-white"
            >
              Data-Driven Intelligence: {data.heading}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.2,
              }}
              className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto"
            >
              {data.subheading}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.3,
              }}
            >
              <CustomButton
                text="Talk to our Data & Analytics expert"
                href="#contact"
                textColor="black"
                borderColor="black"
              />
            </motion.div>
          </div>

          {/* Floating Avatars */}
          {/* Data Analyst Avatar - Top Left */}
          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, -15, 0],
            }}
            transition={{
              opacity: {
                duration: 0.8,
                delay: 0.4,
              },
              x: {
                duration: 0.8,
                delay: 0.4,
              },
              y: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              },
            }}
            className="absolute left-8 top-[15%] md:left-16 lg:left-24"
          >
            <div className="relative w-14 h-14 md:w-16 md:h-16">
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/homepage/hero/1.jpg"
                  alt="Data Analyst"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Online indicator */}
              <div className="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 bg-green3 rounded-full border-2 border-white"></div>
            </div>
          </motion.div>

          {/* User Avatar 1 - Top Right */}
          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, 15, 0],
            }}
            transition={{
              opacity: {
                duration: 0.8,
                delay: 0.5,
              },
              x: {
                duration: 0.8,
                delay: 0.5,
              },
              y: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2,
              },
            }}
            className="absolute right-8 top-[15%] md:right-16 lg:right-24"
          >
            <div className="relative w-14 h-14 md:w-16 md:h-16">
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/homepage/hero/2.jpg"
                  alt="User 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 bg-green3 rounded-full border-2 border-white"></div>
            </div>
          </motion.div>

          {/* User Avatar 2 - Bottom Left */}
          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, -15, 0],
            }}
            transition={{
              opacity: {
                duration: 0.8,
                delay: 0.6,
              },
              x: {
                duration: 0.8,
                delay: 0.6,
              },
              y: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.4,
              },
            }}
            className="absolute left-8 bottom-[25%] md:left-16 lg:left-24"
          >
            <div className="relative w-14 h-14 md:w-16 md:h-16">
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/homepage/hero/3.jpg"
                  alt="User 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 bg-green3 rounded-full border-2 border-white"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
