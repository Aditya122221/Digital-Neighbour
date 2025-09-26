"use client"

export default function Services() {
  return (
    <section className="bg-bone">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left side - Sticky text */}
        <div className="w-full lg:w-1/2 p-6 lg:p-16">
          <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center lg:justify-center">
            <div>
              <h2 className="md:text-6xl text-4xl font-bold text-blackbrown mb-8 leading-tight">Services</h2>
              <p className="md:text-xl text-lg text-blackbrown font-light leading-relaxed max-w-lg">
                We offer big agency services at <span></span>small agency prices. Focused on three core disciplines we use our
                expertise to help you uncover your business needs, create traction and accelerate growth.
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Naturally scrolling cards */}
        <div className="w-full lg:w-1/2">
          <div className="md:py-16 py-8 px-8 space-y-8">
            {/* Marketing Card */}
            <div className="bg-gray-100 rounded-3xl shadow-2xl md:h-180 h-100 overflow-hidden group relative">
              {/* Top part - Video */}
              <div className="md:h-2/3 h-1/2">
                <video 
                  className="w-full h-full object-cover" 
                  autoPlay 
                  muted 
                  loop
                  playsInline
                >
                  <source src="/homepage/services/marketing.mp4" type="video/mp4" />
                </video>
              </div>
              {/* Bottom part - Content */}
              <div className="md:h-1/3 h-1/2 p-8 flex flex-col justify-end">
                <h3 className="text-3xl md:text-5xl font-semibold text-blackbrown md:mb-8 mb-4">Marketing</h3>
                <div className="space-y-2">
                  <h4 className="text-md md:text-lg font-semibold text-gray-700">Digital Strategy</h4>
                  <h4 className="text-md md:text-lg font-semibold text-gray-700">Content Creation</h4>
                  <h4 className="text-md md:text-lg font-semibold text-gray-700">Social Media</h4>
                </div>
              </div>
              {/* Arrow SVG */}
              <div className="absolute bottom-6 right-6 -rotate-45">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="md:size-14 size-10 text-blackbrown transition-transform duration-300 group-hover:rotate-45"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </div>

            {/* Development Card */}
            <div className="bg-gray-100 rounded-3xl shadow-2xl md:h-180 h-100 overflow-hidden group relative">
              {/* Top part - Video */}
              <div className="md:h-2/3 h-1/2">
                <video 
                  className="w-full h-full object-cover" 
                  autoPlay 
                  muted 
                  loop
                  playsInline
                >
                  <source src="/homepage/services/website.mp4" type="video/mp4" />
                </video>
              </div>
              {/* Bottom part - Content */}
              <div className="md:h-1/3 h-1/2 p-8 flex flex-col justify-end">
                <h3 className="text-3xl md:text-5xl font-semibold text-blackbrown md:mb-8 mb-4">Development</h3>
                <div className="space-y-2">
                  <h4 className="text-md md:text-lg font-semibold text-gray-700">Web Development</h4>
                  <h4 className="text-md md:text-lg font-semibold text-gray-700">Mobile Apps</h4>
                  <h4 className="text-md md:text-lg font-semibold text-gray-700">E-commerce</h4>
                </div>
              </div>
              {/* Arrow SVG */}
              <div className="absolute bottom-6 right-6 -rotate-45">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="md:size-14 size-10 text-blackbrown transition-transform duration-300 group-hover:rotate-45"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </div>

            {/* Automation Card */}
            <div className="bg-gray-100 rounded-3xl shadow-2xl md:h-180 h-100 overflow-hidden group relative">
              {/* Top part - Video */}
              <div className="md:h-2/3 h-1/2">
                <video 
                  className="w-full h-full object-cover" 
                  autoPlay 
                  muted 
                  loop
                  playsInline
                >
                  <source src="/homepage/services/automation.mp4" type="video/mp4" />
                </video>
              </div>
              {/* Bottom part - Content */}
              <div className="md:h-1/3 h-1/2 p-8 flex flex-col justify-end">
                <h3 className="text-3xl md:text-5xl font-semibold text-blackbrown md:mb-8 mb-4">Automation</h3>
                <div className="space-y-2">
                  <h4 className="text-md md:text-lg font-semibold text-gray-700">Workflow Automation</h4>
                  <h4 className="text-md md:text-lg font-semibold text-gray-700">Process Optimization</h4>
                  <h4 className="text-md md:text-lg font-semibold text-gray-700">System Integration</h4>
                </div>
              </div>
              {/* Arrow SVG */}
              <div className="absolute bottom-6 right-6 -rotate-45">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="md:size-14 size-10 text-blackbrown transition-transform duration-300 group-hover:rotate-45"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
