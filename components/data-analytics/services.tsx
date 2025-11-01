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
  link?: string;
}

interface DataAnalyticsServicesProps {
  data?: string;
  serviceCards?: Service[];
  basePath?: string;
  premiumCloudServices?: any;
}

// Generic fallback services if no serviceCards provided
const defaultServices: Service[] = [
  {
    id: "real-time-insights",
    name: "Real-Time Insights",
    title: "Real-Time Insights",
    description:
      "Access real-time data insights and analytics that enable immediate decision-making and responsive business operations.",
    image: "/homepage/services/automation.mp4",
  },
  {
    id: "seamless-integration",
    name: "Seamless Integration",
    title: "Seamless Integration",
    description:
      "Easily integrate analytics solutions into your existing systems with our robust APIs and comprehensive integration support.",
    image: "/homepage/services/automation.mp4",
  },
  {
    id: "custom-dashboards",
    name: "Custom Dashboards",
    title: "Custom Dashboards",
    description:
      "Build and deploy analytics dashboards tailored to your specific industry requirements and business objectives.",
    image: "/homepage/services/automation.mp4",
  },
  {
    id: "flexible-deployment",
    name: "Flexible Deployment",
    title: "Flexible Deployment",
    description:
      "Deploy analytics solutions on-premises, in the cloud, or in a hybrid environment based on your preferences.",
    image: "/homepage/services/automation.mp4",
  },
  {
    id: "multi-platform",
    name: "Multi-Platform",
    title: "Multi-Platform Support",
    description:
      "Seamless integration with popular platforms including AWS, Azure, Google Cloud, and your existing infrastructure.",
    image: "/homepage/services/automation.mp4",
  },
  {
    id: "data-optimization",
    name: "Data Optimization",
    title: "Data Optimization",
    description:
      "Optimize data processing and analytics performance to eliminate inefficiencies and maximize insights generation.",
    image: "/homepage/services/automation.mp4",
  },
];

export default function DataAnalyticsServices({
  data,
  serviceCards,
  basePath = "#",
  premiumCloudServices,
}: DataAnalyticsServicesProps) {
  const services = serviceCards || defaultServices;
  const [activeTab, setActiveTab] = useState(services[0]?.id || "");

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
          Our{" "}
          <span className="relative inline-block">
            <span className="absolute bottom-1 left-0 right-0 h-2/4 bg-yellow"></span>
            <span className="relative z-10 font-medium italic">Services</span>
          </span>{" "}
          for {data || "Data & Analytics"}
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
                    text="Get Started"
                    href={activeService.link || "#contact"}
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
