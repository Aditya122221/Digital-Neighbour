"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Origins() {
  return (
    <section className="px-6 py-24 bg-white md:py-32">
      <div className="max-w-7xl mx-auto container">
        <div className="grid items-start gap-16 md:grid-cols-2">
          {/* Left Column - Heading */}
          <motion.div
            className="flex items-start"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{
              once: true,
              margin: "-100px",
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="font-cal-sans text-5xl font-medium tracking-wide text-blackbrown md:text-6xl lg:text-7xl">
              The Origins
            </h2>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{
              once: true,
              margin: "-100px",
            }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-lg font-light leading-relaxed text-blackbrown/80">
              Our journey began with a small group of creative minds—marketers,
              designers, strategists—who shared a passion for turning ideas into
              impact. We were tired of seeing brands waste time on cookie-cutter
              solutions that didn't work. So, we took a different approach:
              blending data-driven strategy with storytelling, creativity, and a
              touch of intuition.
            </p>
          </motion.div>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl md:col-span-2">
            <Image
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              src="/firstimage.avif"
              alt="Origin 1"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[5/3] overflow-hidden rounded-2xl md:col-span-3">
            <Image
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              src="/secondimage.avif"
              alt="Origin 2"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
