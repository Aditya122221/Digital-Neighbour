"use client";

import { motion } from "framer-motion";
import { CustomButton } from "@/components/core/button";

interface WebDevHeroProps {
  data: {
    heading: string;
    subheading: string;
  };
}

export default function WebDevHero({ data }: WebDevHeroProps) {
  return (
    <section className="relative pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 lg:pb-32 overflow-x-hidden min-h-screen">
      {/* Background Video */}
      <video
        src="/footer-vid.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 container mx-auto py-6 md:py-0 px-6 lg:px-12">
        <div className="flex items-center justify-center min-h-[60vh]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full"
          >
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
              <div className="text-left space-y-6 max-w-3xl">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight font-cal-sans">
                  {data.heading}
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed">
                  {data.subheading}
                </p>
              </div>
              <div className="w-full md:w-auto md:self-center">
                <CustomButton
                  text="Talk to our WEB DEVELOPMENT expert"
                  href="#contact"
                  textColor="black"
                  borderColor="black"
                  className="mt-6 md:mt-0"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


