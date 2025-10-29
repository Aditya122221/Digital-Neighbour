"use client";

import Image from "next/image";

type PainPointItem = {
  icon?: string; // emoji fallback
  image?: string; // optional image path in public/
  title: string;
  description?: string;
};

export default function PainPoints({
  data,
}: {
  data?: { heading?: string; items?: PainPointItem[] };
}) {
  const heading = data?.heading ?? "Tired of social media efforts that don’t deliver?";
  const items: PainPointItem[] =
    data?.items ?? [
      {
        icon: "💸",
        title: "Lack of leads or sales from social?",
      },
      {
        icon: "⚡",
        title: "Struggling to keep up with trends & platforms?",
      },
      {
        icon: "📊",
        title: "Unsure how to measure social media ROI?",
      },
      {
        icon: "🎨",
        title: "Lacking creative production capabilities?",
      },
    ];

  return (
    <section className="relative">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-16 md:py-24">
        <h2 className="text-center text-2xl md:text-4xl lg:text-5xl font-semibold text-black font-cal-sans">
          {heading}
        </h2>

        <div className="mt-10 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="relative max-w-[300px] w-full mx-auto">
              {/* bottom oval shadow (behind offset base) */}
              <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 w-[86%] h-6 rounded-full bg-black/60 blur-md md:h-7 md:blur-lg" aria-hidden />

              {/* offset backdrop (yellow) aligned to left, extended right & bottom */}
              <div className="absolute left-0 right-[-8px] top-2 bottom-[-8px] rounded-2xl bg-[#FFF7CC] border border-[#FDE68A]" aria-hidden />

              {/* main card with yellow border + soft yellow shadow */}
              <div
                className="relative z-10 rounded-2xl bg-white border p-6 md:p-7 text-center"
                style={{
                  borderColor: "#FACC15",
                  boxShadow: "0 8px 16px rgba(250, 204, 21, 0.25)",
                }}
              >
                <div className="mx-auto mb-4 md:mb-5 h-12 w-12 md:h-14 md:w-14 flex items-center justify-center rounded-full bg-slate-50 text-2xl">
                  {item.image ? (
                    <Image src={item.image} alt="" width={48} height={48} />
                  ) : (
                    <span>{item.icon}</span>
                  )}
                </div>
                <p className="text-sm md:text-base font-bold tracking-wide uppercase text-black leading-snug">
                  {item.title}
                </p>
                {item.description ? (
                  <p className="mt-2 text-xs text-slate-600">{item.description}</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave pattern in black */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 md:h-44 lg:h-56" aria-hidden>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,40 C240,100 480,0 720,40 C960,80 1200,20 1440,60 L1440,120 L0,120 Z" fill="#000000" />
        </svg>
      </div>
    </section>
  );
}


