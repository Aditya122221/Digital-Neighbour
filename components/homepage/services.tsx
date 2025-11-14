"use client"

import { motion } from "framer-motion"

import homeData from "@/data/home.json"

type ServiceCard = {
	video: string
	title: string
	subheading: string[]
}

type ServicesSection = {
	heading: string
	subheading: string
	rightCard: ServiceCard[]
}

type ServicesProps = {
	data?: ServicesSection | null
	serviceCards?: unknown
	basePath?: string
}

const defaultServicesData = homeData.services as ServicesSection

const isServicesSection = (value: unknown): value is ServicesSection => {
	if (!value || typeof value !== "object") {
		return false
	}

	const section = value as ServicesSection
	return (
		typeof section.heading === "string" &&
		typeof section.subheading === "string" &&
		Array.isArray(section.rightCard)
	)
}

export default function Services({ data }: ServicesProps) {
	const sectionData = isServicesSection(data) ? data : defaultServicesData
	const cards = Array.isArray(sectionData.rightCard)
		? sectionData.rightCard
		: defaultServicesData.rightCard

	return (
		<section className="bg-gradient-to-b from-pink/20 to-white">
			<div className="flex flex-col lg:flex-row min-h-screen">
				{/* Left side - Sticky text */}
				<div className="w-full lg:w-1/2 p-6 lg:p-16">
					<div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center lg:justify-center">
						<div>
							<motion.h2
								className="md:text-6xl text-4xl font-regular text-blackbrown mb-8 leading-tight font-cal-sans tracking-wide"
								initial={{
									opacity: 0,
									y: 50,
								}}
								whileInView={{
									opacity: 1,
									y: 0,
								}}
								viewport={{
									once: true,
									margin: "-100px",
								}}
								transition={{
									duration: 0.8,
									ease: "easeOut",
								}}
							>
								{
									sectionData.heading
								}
							</motion.h2>
							<motion.p
								className="md:text-xl text-lg text-blackbrown font-light leading-relaxed max-w-lg"
								initial={{
									opacity: 0,
									y: 30,
								}}
								whileInView={{
									opacity: 1,
									y: 0,
								}}
								viewport={{
									once: true,
									margin: "-100px",
								}}
								transition={{
									duration: 0.8,
									delay: 0.2,
									ease: "easeOut",
								}}
							>
								{
									sectionData.subheading
								}
							</motion.p>
						</div>
					</div>
				</div>

				{/* Right side - Naturally scrolling cards */}
				<div className="w-full lg:w-1/2">
					<div className="md:py-16 py-8 px-8 space-y-8">
						{cards.map((card) => (
							<div
								key={card.title}
								className="bg-pink rounded-3xl shadow-2xl md:h-180 h-100 overflow-hidden group relative"
							>
								{/* Top part - Video */}
								<div className="md:h-2/3 h-1/2">
									<video
										className="w-full h-full object-cover"
										autoPlay
										muted
										loop
										playsInline
									>
										<source
											src={
												card.video
											}
											type="video/mp4"
										/>
									</video>
								</div>
								{/* Bottom part - Content */}
								<div className="md:h-1/3 h-1/2 p-8 flex flex-col justify-end">
									<h3 className="text-3xl md:text-5xl font-medium text-blackbrown md:mb-8 mb-4">
										{
											card.title
										}
									</h3>
									<div className="space-y-2">
										{card.subheading.map(
											(
												item
											) => (
												<h4
													key={`${card.title}-${item}`}
													className="text-md md:text-lg font-semibold text-gray-700"
												>
													{
														item
													}
												</h4>
											)
										)}
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
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
