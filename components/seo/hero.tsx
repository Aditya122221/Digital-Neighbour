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
    <section className="bg-green1 py-16 md:py-24 lg:py-32">
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
              text="Talk to our SEO expert"
              href="#contact"
              textColor="black"
              borderColor="black"
              className="mt-6"
            />
          </motion.div>

          {/* Right side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative w-3/4 aspect-[4/4] overflow-hidden mx-auto"
          >
            <Image
              src="/seo/hero.webp"
              alt="SEO Marketing"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

