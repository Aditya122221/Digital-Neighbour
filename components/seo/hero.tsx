"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CustomButton } from "@/components/core/button";

interface SeoHeroProps {
  data: {
    heading: string;
    subheading: string;
  };
}

export default function SeoHero({ data }: SeoHeroProps) {
  return (
    <section className="bg-white pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 lg:pb-32 overflow-x-hidden">
      <div className="container mx-auto py-6 md:py-0 px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 max-w-xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-black leading-tight font-cal-sans">
              {(() => {
                const heading = data.heading;
                const words = heading.split(/\s+/);
                const firstWord = words[0] || "";
                const restWords = words.slice(1).join(" ");
                return (
                  <>
                    <span style={{ color: "#5D50EB" }}>{firstWord}</span>
                    {restWords && <span> {restWords}</span>}
                  </>
                );
              })()}
            </h1>
            <p className="text-lg md:text-xl text-black leading-relaxed">
              {data.subheading}
            </p>
            <CustomButton
              text="Talk to our SEO expert"
              href="/contact"
              textColor="#5D50EB"
              borderColor="#5D50EB"
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
              src="/seo/hero.webp"
              alt="SEO Marketing"
              className="object-cover"
              fill
              priority
            />
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>
    </section>
  );
}

