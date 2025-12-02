"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import industriesData from "@/data/industries.json";

type IndustryBrowserItem = {
  label: string;
  slug?: string;
  image: string;
  icon?: string;
};

type IndustryBrowserItemInput = {
  label: string;
  iconUrl?: string | null;
  imageUrl?: string | null;
};

type IndustryBrowserProps = {
  heading?: string;
  highlightWord?: string;
  items?: IndustryBrowserItemInput[];
};

const AVAILABLE_IMAGE_SLUGS = new Set([
  "electrical",
  "hvac",
  "pest-control",
  "plumbing",
  "landscaping",
  "roofing",
]);

const FALLBACK_IMAGES = [
  "/industry/electrical.webp",
  "/industry/hvac.webp",
  "/industry/pestcontrol.webp",
  "/industry/plumber.webp",
  "/industry/landscaping.webp",
  "/industry/roofing.webp",
];

function hashString(value: string): number {
  let h = 0;
  for (let i = 0; i < value.length; i++) {
    h = (h * 31 + value.charCodeAt(i)) >>> 0;
  }
  return h;
}

function resolveImageForSlug(slug: string): string {
  if (AVAILABLE_IMAGE_SLUGS.has(slug))
    return `/industry/${slug
      .replace("plumbing", "plumber")
      .replace("pest-control", "pestcontrol")}.webp`;
  const idx = hashString(slug) % FALLBACK_IMAGES.length;
  return FALLBACK_IMAGES[idx];
}

function getIconForSlug(slug: string): string {
  if (slug.includes("electrical")) return "⚡";
  if (slug.includes("hvac")) return "❄️";
  if (slug.includes("pest")) return "🐞";
  if (slug.includes("plumb")) return "🔧";
  if (slug.includes("landscap")) return "🌿";
  if (slug.includes("roof")) return "🏠";
  return "🧰";
}

export default function IndustryBrowserSection({
  heading,
  highlightWord,
  items: itemsProp,
}: IndustryBrowserProps) {
  const other = (industriesData as any).otherServices;

  const fallbackItems: IndustryBrowserItem[] = useMemo(() => {
    const list: string[] = other?.industriesServices || [];
    const slugMap: Record<string, string> = other?.slugMapping || {};
    return list.map((label: string) => {
      const slug =
        slugMap[label] ||
        label
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
      return {
        label,
        slug,
        image: resolveImageForSlug(slug),
      };
    });
  }, [other]);

  const items: IndustryBrowserItem[] = useMemo(() => {
    if (Array.isArray(itemsProp) && itemsProp.length) {
      return itemsProp.map((item, index) => {
        const baseSlug = item.label
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
        const slug = baseSlug || `item-${index}`;
        return {
          label: item.label,
          slug,
          image: item.imageUrl || resolveImageForSlug(slug),
          icon: item.iconUrl || undefined,
        };
      });
    }
    return fallbackItems;
  }, [itemsProp, fallbackItems]);

  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex];

  const defaultHeading = "We're proud to serve the home services industry";
  const title = heading || defaultHeading;

  const renderTitle = () => {
    if (!highlightWord || !title) return title;

    const trimmed = highlightWord.trim();
    if (!trimmed) return title;

    const index = title.indexOf(trimmed);
    if (index === -1) return title;

    const before = title.slice(0, index);
    const match = title.slice(index, index + trimmed.length);
    const after = title.slice(index + trimmed.length);

    return (
      <>
        {before}
        <span className="font-medium italic">{match}</span>
        {after}
      </>
    );
  };

  return (
    <section className="w-full bg-gradient-to-b from-white to-[#F5F8FF] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="mt-3 text-center text-4xl md:text-5xl lg:text-6xl font-cal-sans font-regular leading-tight text-blackbrown">
            {title.includes(highlightWord || "") ? <>{renderTitle()}</> : title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
          {/* Left: scrollable list */}
          <div className="order-2 -mx-2 md:order-1 md:mx-0">
            <div className="h-[520px] overflow-y-auto rounded-3xl bg-white p-2 shadow-sm ring-1 ring-black/5">
              <ul className="space-y-3">
                {items.map((item, index) => (
                  <li key={item.slug || `${item.label}-${index}`}>
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`flex w-full items-center justify-between rounded-2xl px-4 py-5 text-left transition-all ${
                        index === activeIndex
                          ? "bg-[#5D50EB]/30 ring-1 ring-[#5D50EB]/60"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex h-9 w-9 items-center justify-center rounded-xl text-lg ${
                            index === activeIndex
                              ? "bg-[#5D50EB] text-white"
                              : "bg-[#5D50EB]/40 text-white"
                          }`}
                        >
                          {item.icon ? (
                            <Image
                              src={item.icon}
                              alt={item.label}
                              width={24}
                              height={24}
                              className="object-contain"
                            />
                          ) : (
                            getIconForSlug(
                              item.slug || item.label.toLowerCase(),
                            )
                          )}
                        </span>
                        <span className="text-base font-semibold text-gray-900">
                          {item.label}
                        </span>
                      </div>
                      {/* removed right meta */}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: active image */}
          <div className="order-1 md:order-2">
            <div className="relative h-[520px] overflow-hidden rounded-3xl">
              <Image
                src={active?.image || "/placeholder.jpg"}
                alt={active?.label || "Industry image"}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 42rem, 100vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
