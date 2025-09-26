"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Apart() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Split text animations (wider range + spring smoothing)
  const rawLeftX = useTransform(scrollYProgress, [0.25, 0.8], ["0%", "-130%"]);
  const rawRightX = useTransform(scrollYProgress, [0.25, 0.8], ["0%", "130%"]);

  const springConfig = { stiffness: 120, damping: 24, mass: 0.35 };
  const leftX = useSpring(rawLeftX, springConfig);
  const rightX = useSpring(rawRightX, springConfig);

  // First card animation (enter earlier, settle smoother)
  const rawCardY = useTransform(scrollYProgress, [0.2, 0.75], ["100%", "0%"]);
  const rawCardOpacity = useTransform(scrollYProgress, [0.35, 0.7], [0, 1]);
  const cardY = useSpring(rawCardY, springConfig);
  const cardOpacity = useSpring(rawCardOpacity, { ...springConfig, damping: 22 });

  // Second card animation (slides in with more runway and easing)
  const rawSecondCardX = useTransform(scrollYProgress, [0.55, 0.95], ["100%", "0%"]);
  const rawSecondCardOpacity = useTransform(scrollYProgress, [0.6, 0.95], [0, 1]);
  const secondCardX = useSpring(rawSecondCardX, springConfig);
  const secondCardOpacity = useSpring(rawSecondCardOpacity, { ...springConfig, damping: 22 });

  if (isMobile) {
    return (
      <section className="relative w-full bg-white flex flex-col items-center justify-center py-16 px-4">
        {/* Title row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-3xl sm:text-4xl font-regular mb-8 px-2">
          <span className="text-center">
            What sets us <span className="relative inline-block">
              <span className="absolute bottom-1 left-0 right-0 h-2/4 bg-yellow"></span>
              <span className="relative z-10 font-semibold italic">apart</span>
            </span>
          </span>
          <span className="text-center">
            from others
          </span>
        </div>

        {/* Tagline above cards */}
        <p className="text-lg font-light text-gray-700 text-center mb-8">
          We don't settle for average, and neither should you.
        </p>

        {/* Cards row */}
        <div className="flex flex-col items-center justify-center gap-8 w-full max-w-7xl px-4">
          {/* First Card */}
          <div className="w-full max-w-sm bg-junglegreen rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-semibold mb-6 text-bone">Digital Neighbour</h3>
            <ul className="space-y-4 text-base text-bone">
              <li className="flex items-center gap-3 whitespace-nowrap border-b border-white/50 pb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Generic, one-size-fits-all
              </li>
              <li className="flex items-center gap-3 whitespace-nowrap border-b border-white/50 pb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Clear pricing, no hidden fees
              </li>
              <li className="flex items-center gap-3 whitespace-nowrap border-b border-white/50 pb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Agile, efficient, no delays
              </li>
              <li className="flex items-center gap-3 whitespace-nowrap border-b border-white/50 pb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Flexible terms, no long contracts
              </li>
              <li className="flex items-center gap-3 whitespace-nowrap pb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Direct access to experts
              </li>
            </ul>
          </div>

          {/* Second Card */}
          <div className="w-full max-w-sm bg-gray-50 rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-semibold mb-6">Other Agencies</h3>
            <ul className="space-y-4 text-base text-gray-700">
              <li className="flex items-center gap-3 whitespace-nowrap border-b border-gray-300 pb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 rotate-45">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Generic, one-size-fits-all
              </li>
              <li className="flex items-center gap-3 whitespace-nowrap border-b border-gray-300 pb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 rotate-45">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Vague reports, surprise costs
              </li>
              <li className="flex items-center gap-3 whitespace-nowrap border-b border-gray-300 pb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 rotate-45">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Slow processes, missed deadlines
              </li>
              <li className="flex items-center gap-3 whitespace-nowrap border-b border-gray-300 pb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 rotate-45">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Locked into lengthy agreements
              </li>
              <li className="flex items-center gap-3 whitespace-nowrap pb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 rotate-45">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Generic account managers
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[200vh] w-full bg-white flex flex-col items-center justify-center"
    >
      {/* Sticky container for animations */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Title row */}
        <div className="flex items-center justify-center gap-3 text-4xl md:text-5xl font-regular">
          <motion.span style={{ x: leftX }} className="whitespace-nowrap">
            What sets us <span className="relative inline-block">
              <span className="absolute bottom-1 left-0 right-0 h-2/4 bg-yellow"></span>
              <span className="relative z-10 font-semibold italic">apart</span>
            </span>
          </motion.span>
          <motion.span style={{ x: rightX }} className="whitespace-nowrap">
            from others
          </motion.span>
        </div>

        {/* Tagline above cards */}
        <motion.p
          style={{ opacity: cardOpacity }}
          className="mt-8 text-lg md:text-3xl font-light text-gray-700 text-center"
        >
          We don't settle for average, and neither should you.
        </motion.p>

        {/* Cards row */}
        <div className="relative mt-8 px-2 flex flex-col md:flex-row items-center md:items-start justify-center gap-8 w-full max-w-7xl">
          {/* First Card */}
          <motion.div
            style={{ y: cardY, opacity: cardOpacity }}
            className="w-96 bg-junglegreen rounded-2xl shadow-xl p-8 z-10"
          >
            <h3 className="text-2xl font-semibold mb-6 text-bone">Digital Neighbour</h3>
             <ul className="space-y-4 text-base text-bone">
               <li className="flex items-center gap-3 whitespace-nowrap border-b border-white/50 pb-2">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                 </svg>
                 Generic, one-size-fits-all
               </li>
               <li className="flex items-center gap-3 whitespace-nowrap border-b border-white/50 pb-2">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                 </svg>
                 Clear pricing, no hidden fees
               </li>
               <li className="flex items-center gap-3 whitespace-nowrap border-b border-white/50 pb-2">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                 </svg>
                 Agile, efficient, no delays
               </li>
               <li className="flex items-center gap-3 whitespace-nowrap border-b border-white/50 pb-2">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                 </svg>
                 Flexible terms, no long contracts
               </li>
               <li className="flex items-center gap-3 whitespace-nowrap pb-2">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                 </svg>
                 Direct access to experts
               </li>
             </ul>
          </motion.div>

          {/* Second Card */}
          <motion.div
            style={{ x: secondCardX, opacity: secondCardOpacity }}
            className="w-96 bg-gray-50 rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-semibold mb-6">Other Agencies</h3>
             <ul className="space-y-4 text-base text-gray-700">
               <li className="flex items-center gap-3 whitespace-nowrap border-b border-gray-300 pb-2">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 rotate-45">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                 </svg>
                 Generic, one-size-fits-all
               </li>
               <li className="flex items-center gap-3 whitespace-nowrap border-b border-gray-300 pb-2">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 rotate-45">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                 </svg>
                 Vague reports, surprise costs
               </li>
               <li className="flex items-center gap-3 whitespace-nowrap border-b border-gray-300 pb-2">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 rotate-45">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                 </svg>
                 Slow processes, missed deadlines
               </li>
               <li className="flex items-center gap-3 whitespace-nowrap border-b border-gray-300 pb-2">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 rotate-45">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                 </svg>
                 Locked into lengthy agreements
               </li>
               <li className="flex items-center gap-3 whitespace-nowrap pb-2">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 rotate-45">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                 </svg>
                 Generic account managers
               </li>
             </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
