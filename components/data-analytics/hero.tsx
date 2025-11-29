"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CustomButton } from "@/components/core/button";

type ImageSource =
  | string
  | {
      asset?: {
        url?: string;
      };
      url?: string;
    };

interface DataAnalyticsHeroProps {
  data?: {
    tagline?: string;
    heading?: string;
    subheading?: string;
    heroImages?: ImageSource[];
  };
  defaultImages?: ImageSource[] | null;
}

const FALLBACK_IMAGES = [
  {
    id: "hero-one",
    image: "/dataanaly/heroOne.webp",
    alt: "Data Analyst",
  },
  {
    id: "hero-two",
    image: "/dataanaly/heroTwo.webp",
    alt: "User 1",
  },
  {
    id: "hero-three",
    image: "/dataanaly/heroThree.webp",
    alt: "User 2",
  },
];

const resolveImageUrl = (source?: ImageSource): string | undefined => {
  if (!source) return undefined;
  if (typeof source === "string") return source;
  return source.asset?.url || source.url;
};

export default function DataAnalyticsHero({
  data,
  defaultImages,
}: DataAnalyticsHeroProps) {
  const heading = data?.heading || "Data & Analytics Services";
  const subheading =
    data?.subheading ||
    "Transform your business with comprehensive data analytics and business intelligence solutions to unlock insights and drive growth.";

  const images = useMemo(() => {
    // Priority: page-specific images > default images > fallback images
    const pageImages = data?.heroImages || [];
    const defaultImgs = defaultImages || [];
    const imagesToUse = pageImages.length > 0 ? pageImages : defaultImgs;

    if (imagesToUse.length > 0) {
      return imagesToUse.map((img, index) => {
        const url = resolveImageUrl(img);
        return {
          id: FALLBACK_IMAGES[index]?.id || `hero-${index + 1}`,
          image:
            url || FALLBACK_IMAGES[index]?.image || FALLBACK_IMAGES[0].image,
          alt: FALLBACK_IMAGES[index]?.alt || `Hero image ${index + 1}`,
        };
      });
    }

    return FALLBACK_IMAGES;
  }, [data?.heroImages, defaultImages]);

  return (
    <section className="relative pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 lg:pb-32 overflow-x-hidden bg-white">
      {/* Content */}
      <div className="relative z-20 container mx-auto py-6 md:py-0 px-6 lg:px-12">
        <div className="relative flex items-center justify-center min-h-[70vh]">
          <div className="max-w-5xl mx-auto text-center space-y-8">
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
              className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight font-cal-sans text-black"
            >
              <span style={{ color: "#5D50EB" }}>
                Data-Driven Intelligence:
              </span>{" "}
              {heading}
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
              className="text-lg md:text-xl text-black leading-relaxed max-w-3xl mx-auto"
            >
              {subheading}
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
                href="/contact"
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
            className="hidden md:block pointer-events-none absolute md:left-16 md:top-[4%]"
          >
            <div className="relative w-12 h-12 md:w-16 md:h-16">
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image
                  src={images[0]?.image || FALLBACK_IMAGES[0].image}
                  alt={images[0]?.alt || FALLBACK_IMAGES[0].alt}
                  fill
                  className="object-cover"
                  style={{ borderRadius: "50%" }}
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
            className="hidden md:block pointer-events-none absolute md:right-16 md:top-[3%]"
          >
            <div className="relative w-12 h-12 md:w-16 md:h-16">
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image
                  src={images[1]?.image || FALLBACK_IMAGES[1].image}
                  alt={images[1]?.alt || FALLBACK_IMAGES[1].alt}
                  fill
                  className="object-cover"
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 bg-green3 rounded-full border-2 border-white"></div>
            </div>
          </motion.div>

          {/* User Avatar 2 - Bottom */}
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
            className="hidden md:block pointer-events-none absolute md:bottom-[6%] md:left-32 md:translate-x-0 lg:left-24"
          >
            <div className="relative w-12 h-12 md:w-16 md:h-16">
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image
                  src={images[2]?.image || FALLBACK_IMAGES[2].image}
                  alt={images[2]?.alt || FALLBACK_IMAGES[2].alt}
                  fill
                  className="object-cover"
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 bg-green3 rounded-full border-2 border-white"></div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>
    </section>
  );
}
