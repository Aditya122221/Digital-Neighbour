"use client";

import { motion } from "framer-motion";

interface IntroParagraphProps {
  data?: {
    heading?: string;
    highlightWord?: string;
    problemStatement?: string;
    valueProposition?: string;
  };
}

export default function IntroParagraph({ data }: IntroParagraphProps) {
  if (!data?.problemStatement && !data?.valueProposition) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 px-6 bg-gradient-to-b from-white to-pink/20">
      <div className="container max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="space-y-6 text-center"
        >
          {data.heading && (
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-regular text-blackbrown leading-tight font-cal-sans mb-6">
              {(() => {
                const heading = data.heading;
                const highlightWord = data.highlightWord;

                if (!highlightWord) {
                  return heading;
                }

                const lowerHeading = heading.toLowerCase();
                const lowerHighlight = highlightWord.toLowerCase();
                const highlightIndex = lowerHeading.indexOf(lowerHighlight);

                if (highlightIndex === -1) {
                  return heading;
                }

                const before = heading.slice(0, highlightIndex);
                const highlighted = heading.slice(
                  highlightIndex,
                  highlightIndex + highlightWord.length
                );
                const after = heading.slice(
                  highlightIndex + highlightWord.length
                );

                return (
                  <>
                    {before}
                    <span className="relative inline-block">
                      <span className="absolute bottom-1 left-0 right-0 h-2/4 bg-yellow -skew-x-12"></span>
                      <span className="relative z-10 font-medium italic">
                        {highlighted}
                      </span>
                    </span>
                    {after}
                  </>
                );
              })()}
            </h2>
          )}

          {data.problemStatement && (
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
              {data.problemStatement}
            </p>
          )}

          {data.valueProposition && (
            <p className="text-lg md:text-xl text-blackbrown leading-relaxed max-w-4xl mx-auto font-medium">
              {data.valueProposition}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

