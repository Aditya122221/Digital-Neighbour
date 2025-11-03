"use client";

import React from "react";

export default function ResourcesHero() {
  return (
    <section className="relative bg-black">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:py-24">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-widest text-white/80">
              Resources
            </p>
            <h1 className="mt-2 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              Explore insights on marketing, branding, and social media.
            </h1>
            <p className="mt-4 text-base text-white/70">
              Fresh perspectives, practical frameworks, and playbooks to help
              your brand grow and stand out.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


