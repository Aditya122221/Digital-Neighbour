"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CustomButton } from "@/components/core/button";

interface AppDevHeroProps {
  data: {
    heading: string;
    subheading: string;
  };
}

export default function AppDevHero({ data }: AppDevHeroProps) {
  return (
    <section className="bg-gradient-to-br from-black via-black to-yellow pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 lg:pb-32 overflow-x-hidden">
      <div className="container mx-auto py-6 md:py-0 px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 max-w-xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight font-cal-sans">
              {data.heading}
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              {data.subheading}
            </p>
            <CustomButton
              text="Talk to our App Development expert"
              href="#contact"
              textColor="black"
              borderColor="black"
              className="mt-6"
            />
          </motion.div>

          {/* Right side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              y: [0, -20, 0]
            }}
            transition={{ 
              opacity: { duration: 0.8, ease: "easeOut", delay: 0.2 },
              x: { duration: 0.8, ease: "easeOut", delay: 0.2 },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
            className="relative w-4/4 h-4/4 overflow-hidden mx-auto rounded-3xl"
          >
            <Image
              src="/seo/mobileHero.webp"
              alt="App Development"
              className="object-cover"
              fill
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

