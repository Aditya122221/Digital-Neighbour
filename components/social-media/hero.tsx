"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { CustomButton } from "@/components/core/button";

interface SocialMediaHeroProps {
  data?: {
    heading?: string;
    subheading?: string;
    ctaText?: string;
  };
}

export default function SocialMediaHero({ data }: SocialMediaHeroProps) {
  const heading = data?.heading || "Best Social Media Marketing Agency";
  const subheading =
    data?.subheading ||
    "We help brands grow fast with smart strategies, bold creativity, and marketing that gets clicks, leads, and results.";
  const ctaText = data?.ctaText || "Market My Brand";

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleIntersect: IntersectionObserverCallback = ([entry]) => {
      if (!videoElement) return;
      if (entry.isIntersecting) {
        videoElement.play().catch(() => {
          // Autoplay might be blocked; ignore errors to avoid unhandled promise rejections
        });
      } else {
        videoElement.pause();
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.6,
    });

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="relative pt-20 md:pt-24 lg:pt-28 pb-0 overflow-x-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-black" />

      {/* Subtle vignette for depth */}
      <div className="absolute inset-0 pointer-events-none [background:radial-gradient(70%_60%_at_50%_10%,rgba(255,224,49,0.15)_0%,transparent_60%)]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center space-y-6 max-w-6xl mx-auto"
          >
            <h1 className="font-cal-sans font-semibold text-white leading-[0.95] text-[32px] md:text-5xl lg:text-6xl xl:text-7xl">
              {heading}
            </h1>
            <p className="text-white/80 text-base md:text-lg lg:text-xl max-w-3xl mx-auto">
              {subheading}
            </p>
            <CustomButton
              text={ctaText}
              href="/contact"
              textColor="black"
              borderColor="white"
              className="mt-4"
            />

            {/* Video section: plays when in view, pauses when out of view */}
            <div className="mt-8 relative left-1/2 -translate-x-1/2 w-screen">
              <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[65vh] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover pointer-events-none rounded-4xl"
                  src="/socialMedia/heroVideo.mp4"
                  muted
                  playsInline
                  loop
                  preload="none"
                  controls={false}
                  controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
                  disablePictureInPicture
                  onEnded={(e) => {
                    const vid = e.currentTarget;
                    vid.currentTime = 0;
                    vid.play().catch(() => {});
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


