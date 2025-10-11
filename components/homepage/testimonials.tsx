"use client"

import Marquee from "react-fast-marquee"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    quote: "Smart design, smooth delivery, Franklin is great to work with.",
    author: "Lucas Bennett",
    position: "Product Manager, Hexa Studio",
    number: "01/05",
    image: "https://images.pexels.com/photos/34014652/pexels-photo-34014652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    quote: "Exceptional creativity and attention to detail. The team exceeded our expectations.",
    author: "Sarah Chen",
    position: "Marketing Director, TechFlow",
    number: "02/05",
    image: "https://images.pexels.com/photos/34013983/pexels-photo-34013983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 3,
    quote: "Professional, reliable, and innovative. Our brand transformation was remarkable.",
    author: "Michael Rodriguez",
    position: "CEO, GrowthLab",
    number: "03/05",
    image: "https://images.pexels.com/photos/7432338/pexels-photo-7432338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 4,
    quote: "Outstanding results delivered on time. Highly recommend their services.",
    author: "Emma Thompson",
    position: "Brand Manager, Innovate Co",
    number: "04/05",
    image: "https://images.pexels.com/photos/34006459/pexels-photo-34006459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 5,
    quote: "Creative solutions that perfectly captured our vision. Amazing collaboration.",
    author: "David Park",
    position: "Founder, StartupHub",
    number: "05/05",
    image: "https://images.pexels.com/photos/34006447/pexels-photo-34006447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
]

export default function Testimonials() {
  return (
    <section className="relative bg-gradient-to-b from-pink/20 to-white py-20 overflow-hidden">
      {/* Background Text */}
      <div className="absolute inset-0 flex items-start justify-center pointer-events-none overflow-hidden">
        <h2 className="text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[13rem] font-regular text-yellow select-none whitespace-nowrap font-cal-sans tracking-wide">
          Testimonials
        </h2>
      </div>

      <div className="relative z-10 max-w-full px-0 md:px-6 -mt-8 md:mt-28">
        {/* Header */}
        {/* <div className="text-center mb-16">
          <p className="text-gray-600 text-lg mb-4">(Why clients love Digital Neighbour)</p>
        </div> */}

        {/* Testimonials Marquee */}
        <div className="relative">
          <Marquee
            direction="left"
            speed={50}
            gradient={false}
            pauseOnHover={true}
            className="py-4"
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 md:w-[400px] md:h-[400px] w-[300px] h-[400px] bg-pink rounded-3xl p-6 flex flex-col justify-between mx-4"
              >
                {/* Card Number */}
                <div className="text-gray-400 text-sm font-mono">{testimonial.number}</div>

                {/* Content Area */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    {/* Client Portrait */}
                    <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 relative">
                      <Image
                        src={testimonial.image}
                        alt={`${testimonial.author} portrait`}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Quote */}
                    <blockquote className="text-black text-lg font-medium mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                </div>

                {/* Author Info */}
                <div className="text-gray-300">
                  <p className="font-semibold text-black">{testimonial.author}</p>
                  <p className="text-sm text-gray-400">{testimonial.position}</p>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
