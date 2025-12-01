"use client";

import { motion } from "framer-motion";

interface IntroParagraphProps {
  data?: {
    heading?: string;
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
                // Find and highlight key words like "Challenge", "Problem", "Dilemma", etc.
                const highlightWords = [
                  "Challenge",
                  "Challenges",
                  "Problem",
                  "Problems",
                  "Dilemma",
                  "Issue",
                  "Issues",
                  "Missing Out",
                ];
                const words = heading.split(/(\s+)/);
                let result = [];

                for (let i = 0; i < words.length; i++) {
                  const word = words[i].trim();
                  if (!word) {
                    result.push(words[i]);
                    continue;
                  }

                  const cleanWord = word.replace(/[.,;:!?]/g, "");
                  const punctuation = word.replace(cleanWord, "");

                  if (
                    highlightWords.some(
                      (hw) =>
                        cleanWord.toLowerCase() === hw.toLowerCase() ||
                        cleanWord.toLowerCase().includes(hw.toLowerCase()),
                    )
                  ) {
                    result.push(
                      <span key={i} className="relative inline-block">
                        <span className="absolute bottom-1 left-0 right-0 h-2/4 bg-yellow -skew-x-12"></span>
                        <span className="relative z-10 font-medium italic">
                          {cleanWord}
                          {punctuation}
                        </span>
                      </span>,
                    );
                  } else {
                    result.push(<span key={i}>{word}</span>);
                  }
                  if (
                    i < words.length - 1 &&
                    words[i + 1] &&
                    words[i + 1].trim() === ""
                  ) {
                    result.push(words[i + 1]);
                    i++;
                  }
                }

                return result.length > 0 ? result : heading;
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

