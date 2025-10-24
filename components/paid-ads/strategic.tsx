"use client";

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
        <div className="w-20 h-20 rounded-full border-2 flex items-center justify-center" style={{ borderColor: '#ffe031', backgroundColor: 'rgba(255, 224, 49, 0.1)' }}>
          <div className="text-2xl" style={{ color: '#ffe031' }}>
            {icon}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="space-y-4 max-w-sm">
        <h3 className="font-semibold text-xl leading-tight" style={{ color: '#ffe031' }}>
          {title}
        </h3>
        <p className="text-white text-base leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function Strategic() {
  const strategicBlocks = [
    {
      icon: "👥",
      title: "Enhance Your Lead Generation Strategy",
      description: "Let us help you boost your lead generation. We focus on attracting high-quality prospects in substantial volumes to propel your business growth."
    },
    {
      icon: "💰",
      title: "Maximize Budget Efficiency and ROI",
      description: "We'll overhaul your paid search marketing campaigns to ensure efficient spending and optimized cost per acquisition so you can achieve the highest possible return on investment."
    },
    {
      icon: "🎯",
      title: "Optimize Targeting and Campaign Structure",
      description: "By refining your audience targeting, campaign structure, and keyword strategies, we'll enhance your efforts to ensure your ads reach the most relevant and engaged audiences."
    },
    {
      icon: "⚙️",
      title: "Leverage Our End-to-End Campaign Management",
      description: "Addressing any internal resource gaps, we provide comprehensive support in setting up, managing, and optimizing your paid search marketing campaigns. Our expertise and access to cutting-edge tools and strategies ensure your campaigns consistently perform at their peak and deliver exceptional results."
    },
    {
      icon: "🌐",
      title: "Elevate Audience Targeting",
      description: "Using first-party data, custom audience segments, and detailed demographic insights, we'll improve your audience targeting to make sure you connect with potential customers effectively."
    }
  ];

  return (
    <section className="relative py-16 md:py-24 lg:py-32">
      {/* Background with image */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: '#1a1a1a',
          backgroundImage: `url('/bullets-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderTopLeftRadius: '10%',
          borderTopRightRadius: '10%',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Main Title */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight font-cal-sans" style={{ color: 'white' }}>
            Dominate With a Strategic Approach to Paid Search
          </h2>
        </div>

        {/* Strategic Blocks */}
        <div className="space-y-16 md:space-y-20">
          {/* Top Row - 3 blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {strategicBlocks.slice(0, 3).map((block, index) => (
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
              {strategicBlocks.slice(3, 5).map((block, index) => (
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