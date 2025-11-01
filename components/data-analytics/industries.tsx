"use client";

import { useState } from "react";
import {
  Shield,
  Building,
  ShoppingCart,
  GraduationCap,
  DollarSign,
  Zap,
  SquareStack,
  CloudCog,
  ChevronDown,
  Heart,
  Factory,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Industry {
  id: string;
  name: string;
  icon: string;
  details?: string;
}

interface IndustriesProps {
  data: {
    heading: string;
    description: string;
    industries: Industry[];
  };
}

// Icon mapping for data analytics industries
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } =
  {
    shield: Shield,
    building: Building,
    shoppingCart: ShoppingCart,
    graduationCap: GraduationCap,
    dollarSign: DollarSign,
    zap: Zap,
    blocks: SquareStack,
    cloudCog: CloudCog,
    heart: Heart,
    factory: Factory,
  };

export default function Industries({ data }: IndustriesProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const IconComponent = ({ iconName }: { iconName: string }) => {
    const Icon = iconMap[iconName] || Building;
    return <Icon className="w-6 h-6 text-white" />;
  };

  // Split heading to highlight key words - handles "Custom Data Analytics Solutions"
  const headingText = data.heading;
  const highlightText = "Data Analytics Solutions";
  const beforeHighlight = headingText.includes(highlightText)
    ? headingText.split(highlightText)[0]
    : headingText.split("Custom")[0] || "";
  const afterHighlight = headingText.includes(highlightText)
    ? headingText.split(highlightText)[1] || ""
    : "";

  return (
    <section className="bg-black py-16 md:py-24 lg:py-32 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Left Column - Sticky Content */}
          <div className="lg:col-span-2 lg:h-full">
            <div className="lg:sticky lg:top-24 space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight font-cal-sans">
                {beforeHighlight}
                <span className="relative inline-block">
                  <span className="absolute bottom-1 left-0 right-0 h-2/4 bg-yellow"></span>
                  <span className="relative z-10 font-medium italic">
                    Data Analytics Solutions
                  </span>
                </span>
                {afterHighlight}
              </h2>
              <p className="text-base md:text-lg text-white/90 leading-relaxed">
                {data.description}
              </p>
            </div>
          </div>

          {/* Right Column - Scrollable Industries List */}
          <div className="lg:col-span-3">
            <div className="space-y-0">
              {data.industries.map((industry, index) => {
                const isExpanded = expandedId === industry.id;
                return (
                  <div key={industry.id} className="border-b border-white/10">
                    <button
                      onClick={() => toggleExpanded(industry.id)}
                      className="w-full flex items-center justify-between py-6"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex-shrink-0">
                          <IconComponent iconName={industry.icon} />
                        </div>
                        <span className="text-lg md:text-xl text-white underline underline-offset-4 decoration-white/50 hover:text-yellow transition-colors">
                          {industry.name}
                        </span>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center">
                          <ChevronDown
                            className={cn(
                              "w-5 h-5 text-white transition-transform duration-200",
                              isExpanded && "rotate-180",
                            )}
                          />
                        </div>
                      </div>
                    </button>

                    {/* Expandable Details */}
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300 ease-in-out",
                        isExpanded
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0",
                      )}
                    >
                      <div className="px-0 pb-6 pt-2">
                        {industry.details ? (
                          <p className="text-white/80 leading-relaxed">
                            {industry.details}
                          </p>
                        ) : (
                          <p className="text-white/60 italic">
                            Details coming soon...
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
