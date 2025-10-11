import Marquee from "react-fast-marquee"

export default function BrandsMarquee() {
  const logos = [
    { name: "A1", path: "/topbrands/A1-Logo.png" },
    { name: "Balustrading Concepts", path: "/topbrands/balustrading-concepts-logo.jpg.webp" },
    { name: "Christchurch City Flowers", path: "/topbrands/christchurchcityflowers-logo.webp" },
    { name: "City Clean", path: "/topbrands/cityclean-logo.png" },
    { name: "CSG", path: "/topbrands/csg-logo.png" },
    { name: "Foodland", path: "/topbrands/foodland-logo.webp" },
    { name: "Krishna", path: "/topbrands/krishna-logo.jpg" },
    { name: "Little Climbers", path: "/topbrands/littleclimbers-logo.webp" },
    { name: "Mughal Kitchen", path: "/topbrands/mughalkitchen-logo.jpg" },
    { name: "PRA", path: "/topbrands/pra-logo.png" },
    { name: "Quality Care Dental", path: "/topbrands/qualitycaredental.jpg" },
    { name: "VP", path: "/topbrands/vp-logo.png" },
  ]

  return (
    <section className="py-16 bg-pink/20 overflow-hidden">
      <div className="px-6 lg:px-32">
        <h2 className="text-4xl md:text-5xl font-regular text-center text-blackbrown mb-20 text-balance font-cal-sans tracking-wide">
          Trusted by <span className="relative inline-block">
            <span className="absolute bottom-1 left-0 right-0 h-2/4 bg-yellow"></span>
            <span className="relative z-10 font-medium italic">top brands</span>
          </span>
        </h2>

        <Marquee
          speed={50}
          gradient={false}
          pauseOnHover={false}
          className="py-4"
        >
          {logos.map((logo, index) => (
            <div
              key={index}
              className="inline-flex items-center justify-center bg-yellow/30 rounded-full px-8 py-4 mx-3 shadow-sm border border-gray-200 flex-shrink-0"
            >
              <img
                src={logo.path}
                alt={logo.name}
                className="h-10 md:h-12 w-auto object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
