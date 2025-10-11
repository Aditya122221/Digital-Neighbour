"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CustomButton } from "@/components/core/button";

interface Service {
  id: string;
  name: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function SeoServices() {
  const [activeTab, setActiveTab] = useState("on-page-seo");

  const services: Service[] = [
    {
      id: "on-page-seo",
      name: "On-Page SEO",
      title: "On-Page SEO",
      description:
        "Improve rankings and attract qualified visitors with strategic optimizations customized to your industry and audience.",
      image: "/seo/services/on-page.png",
      link: "/services/on-page-seo",
    },
    {
      id: "keyword-research",
      name: "Keyword Research",
      title: "Keyword Research",
      description:
        "Discover high-value keywords that your target audience is searching for and create content strategies that drive qualified traffic to your website.",
      image: "/seo/services/seo.png",
      link: "/services/keyword-research",
    },
    {
      id: "technical-seo",
      name: "Technical SEO",
      title: "Technical SEO",
      description:
        "Optimize your website's technical infrastructure to ensure search engines can crawl, index, and rank your pages effectively for maximum visibility.",
      image: "/seo/services/technical.png",
      link: "/services/technical-seo",
    },
    {
      id: "off-page-seo",
      name: "Off-Page SEO",
      title: "Off-Page SEO",
      description:
        "Build your website's authority and credibility through strategic external optimization techniques that improve your search engine rankings.",
      image: "/seo/services/off-page.png",
      link: "/services/off-page-seo",
    },
    {
      id: "link-building",
      name: "Link Building",
      title: "Link Building",
      description:
        "Acquire high-quality backlinks from authoritative websites to boost your domain authority and improve your search engine rankings.",
      image: "/seo/services/link-building.png",
      link: "/services/link-building",
    },
    {
      id: "seo-audit",
      name: "SEO Audit",
      title: "SEO Audit",
      description:
        "Get a comprehensive analysis of your website's SEO performance with actionable insights and recommendations to improve your rankings.",
      image: "/seo/services/seo-audit.png",
      link: "/services/seo-audit",
    },
  ];

  const activeService = services.find((service) => service.id === activeTab);
  const activeIndex = services.findIndex((service) => service.id === activeTab);

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-pink/20 to-white">
      <div className="container max-w-7xl mx-auto">
        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-regular text-blackbrown mb-12 font-cal-sans"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          What We <span className="relative inline-block">
              <span className="absolute bottom-1 left-0 right-0 h-2/4 bg-yellow"></span>
              <span className="relative z-10 font-medium italic">Offer</span>
            </span>
        </motion.h2>

        {/* Tabs */}
        <motion.div
          className="overflow-x-auto scrollbar-hide mb-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="flex gap-0 min-w-full">
            {services.map((service, index) => (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`flex-1 px-4 py-4 text-base md:text-lg font-medium transition-all duration-300 whitespace-nowrap ${
                  activeTab === service.id
                    ? "bg-black text-white rounded-t-3xl"
                    : "bg-transparent text-blackbrown hover:border-b hover:border-blackbrown/50"
                } ${index === 0 ? "rounded-tl-3xl" : ""} ${
                  index === services.length - 1 ? "rounded-tr-3xl" : ""
                }`}
              >
                {service.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content Area */}
        {activeService && (
          <motion.div
            key={activeTab}
            className={`bg-black p-8 md:p-12 ${
              activeIndex === 0
                ? "rounded-b-3xl rounded-tr-3xl"
                : activeIndex === services.length - 1
                ? "rounded-b-3xl rounded-tl-3xl"
                : "rounded-b-3xl rounded-tl-3xl rounded-tr-3xl"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left side - Text content */}
              <div className="space-y-6">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-white font-cal-sans">
                  {activeService.title}
                </h3>
                <p className="text-lg md:text-xl text-white leading-relaxed">
                  {activeService.description}
                </p>
                <div>
                  <CustomButton
                    text="Learn More"
                    href={activeService.link}
                    textColor="black"
                    borderColor="black"
                  />
                </div>
              </div>

              {/* Right side - Image */}
              <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden bg-black p-4 flex items-center justify-center">
                <Image
                  src={activeService.image}
                  alt={activeService.title}
                  fill
                  className="object-contain p-4"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

