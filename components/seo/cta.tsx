"use client";

import { motion } from "framer-motion";
import { CustomButton } from "@/components/core/button";

export default function SeoCta() {
  return (
    <section className="px-6 py-20 bg-gradient-to-b from-pink/20 to-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto rounded-3xl bg-black text-white p-8 md:p-12 lg:p-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left copy */}
          <div className="lg:col-span-8 space-y-5">
            <p className="text-yellow text-sm md:text-base tracking-wide">
              No empty promises, just Real SEO Results
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-cal-sans font-regular leading-tight">
              Quality SEO services that exceed expectations
            </h2>
            <p className="text-white/80 text-base md:text-lg max-w-3xl">
              We’ll only move forward if we’re absolutely confident in our ability to deliver the results you need. Schedule a free consultation to see if we’re the right fit for your goals.
            </p>
          </div>

          {/* Right action */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-4">
            <CustomButton
              text="Book a free consultation"
              href="#contact"
              textColor="black"
              borderColor="white"
              className="whitespace-nowrap"
            />
            <p className="text-white/70 text-sm md:text-base max-w-sm lg:text-right">
              Tap the button above to schedule a free consultation and see if our professional SEO service is a good fit for your business.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
