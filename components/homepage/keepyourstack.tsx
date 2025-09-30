"use client"

import Image from "next/image"
import Marquee from "react-fast-marquee"

export default function KeepYourStack() {
  const techLogos = [
    { name: "LinkedIn", svg: "/homepage/techstack/linkedin.svg" },
    { name: "Salesforce", svg: "/homepage/techstack/salesforce.svg" },
    { name: "HubSpot", svg: "/homepage/techstack/hubspot.svg" },
    { name: "Google Analytics", svg: "/homepage/techstack/google-analytics.svg" },
    { name: "Mailchimp", svg: "/homepage/techstack/mailchimp.svg" },
    { name: "Asana", svg: "/homepage/techstack/asana.svg" },
    { name: "Meta", svg: "/homepage/techstack/meta.svg" },
    { name: "Webflow", svg: "/homepage/techstack/webflow.svg" },
    { name: "ActiveCampaign", svg: "/homepage/techstack/active-campaign.svg" },
    { name: "WordPress", svg: "/homepage/techstack/wordpress.svg" },
    { name: "Google Ads", svg: "/homepage/techstack/goolge-ads.svg" },
    { name: "Zoho", svg: "/homepage/techstack/zoho.svg" },
  ]

  return (
    <section className="bg-bone/20 py-20 px-6">
      <div className="container max-w-7xl mx-auto">
        {/* Header Content */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-regular text-blackbrown mb-6 text-balance font-cal-sans tracking-wide">
            Keep your existing <span className="relative inline-block">
              <span className="absolute bottom-1 left-0 right-0 h-2/4 bg-yellow"></span>
              <span className="relative z-10 font-medium italic">tech stack</span>
            </span>
          </h2>
          <p className="text-lg md:text-xl font-light text-blackbrown/80 max-w-2xl mx-auto text-pretty">
            We work with your platforms, meaning we seamlessly slot into your team
          </p>
        </div>

        {/* Tech Stack Marquee */}
        <div className="py-4">
          <Marquee
            speed={50}
            gradient={false}
            pauseOnHover={false}
            className="py-4"
          >
            {techLogos.map((tech, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-3 bg-yellow/20 rounded-full px-6 py-3 mx-3 shadow-sm border border-gray-200 flex-shrink-0"
              >
                <Image
                  src={tech.svg}
                  alt={`${tech.name} logo`}
                  width={24}
                  height={24}
                  className="w-10 h-10"
                />
                <span className="text-blackbrown font-medium">{tech.name}</span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
