"use client";
import React from "react";

interface StrategicBlockProps {
  icon: string;
  title: string;
  description: string;
}

function StrategicBlock({ icon, title, description }: StrategicBlockProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      {/* Icon */}
      <div className="relative">
        <div
          className="w-20 h-20 rounded-full border-2 flex items-center justify-center"
          style={{
            borderColor: "#ffe031",
            backgroundColor: "rgba(255, 224, 49, 0.1)",
          }}
        >
          <div className="text-2xl" style={{ color: "#ffe031" }}>
            {icon}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 max-w-sm">
        <h3
          className="font-semibold text-xl leading-tight"
          style={{ color: "#ffe031" }}
        >
          {title}
        </h3>
        <p className="text-white text-base leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

interface StrategicSectionData {
  heading?: string;
  blocks: StrategicBlockProps[];
}

export default function Strategic({
  data,
  serviceName,
}: {
  data?: StrategicSectionData;
  serviceName?: string;
}) {
  const heading =
    (data && data.heading) ||
    (serviceName
      ? `Dominate With a Strategic Approach to ${serviceName}`
      : "Dominate With a Strategic Approach to Content Marketing");
  const fallbackBlocks: StrategicBlockProps[] = [
    {
      icon: "📝",
      title: "Create Engaging Content That Resonates",
      description:
        "We craft compelling content that speaks to your audience, builds trust, and drives engagement. Our content strategy focuses on understanding your target audience's needs, pain points, and interests to create content that truly resonates and converts.",
    },
    {
      icon: "🎯",
      title: "Develop Strategic Content Plans",
      description:
        "We develop comprehensive content strategies aligned with your business goals and target audience. Our strategic approach includes content calendars, topic ideation, keyword research, and content distribution plans to maximize reach and impact.",
    },
    {
      icon: "📊",
      title: "Optimize Content for Performance",
      description:
        "We continuously analyze and optimize your content performance to improve engagement, conversions, and ROI. Our data-driven approach includes performance tracking, A/B testing, and iterative improvements to ensure your content delivers measurable results.",
    },
    {
      icon: "🚀",
      title: "Scale Content Production Efficiently",
      description:
        "We help you scale your content production with streamlined workflows, editorial calendars, and quality assurance processes. Our scalable approach ensures consistent, high-quality content delivery that supports your business growth objectives.",
    },
    {
      icon: "🔍",
      title: "Enhance Content Discoverability",
      description:
        "We optimize your content for search engines and social media platforms to maximize visibility and reach. Our approach includes SEO optimization, social media optimization, content promotion strategies, and distribution tactics that increase your content's discoverability and impact.",
    },
  ];
  const blocks =
    Array.isArray(data?.blocks) && data.blocks.length > 0
      ? data.blocks
      : fallbackBlocks;

  return (
    <section className="relative py-16 md:py-24 lg:py-32">
      {/* Background with image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#1a1a1a",
          backgroundImage: `url('/bullets-bg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderTopLeftRadius: "10%",
          borderTopRightRadius: "10%",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Main Title */}
        <div className="text-center mb-16 md:mb-20">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight font-cal-sans"
            style={{ color: "white" }}
          >
            {heading}
          </h2>
        </div>

        {/* Strategic Blocks */}
        <div className="space-y-16 md:space-y-20">
          {/* Top Row - 3 blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {blocks.slice(0, 3).map((block, index) => (
              <StrategicBlock
                key={index}
                icon={block.icon}
                title={block.title}
                description={block.description}
              />
            ))}
          </div>

          {/* Bottom Row - 2 blocks centered */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-5xl">
              {blocks.slice(3, 5).map((block, index) => (
                <StrategicBlock
                  key={index + 3}
                  icon={block.icon}
                  title={block.title}
                  description={block.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
