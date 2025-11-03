"use client"

import Image from "next/image"
import { motion } from "framer-motion"

type HeroIndustry = {
	name: string
	slug: string
	image: string
}

interface IndustriesHeroProps {
	data?: {
		heading?: string
		subheading?: string
		industries?: HeroIndustry[]
	}
}

export default function IndustriesHero({ data }: IndustriesHeroProps) {
	const heading = data?.heading || "Home Services"
	const subheading = data?.subheading || "Choose your industry."
	const industries: HeroIndustry[] = data?.industries || [
		{
			name: "Electrical",
			slug: "electrical",
			image: "/industry/electrical.webp",
		},
		{ name: "HVAC", slug: "hvac", image: "/industry/hvac.webp" },
		{
			name: "Pest Control",
			slug: "pest-control",
			image: "/industry/pestcontrol.webp",
		},
		{
			name: "Plumbing",
			slug: "plumbing",
			image: "/industry/plumber.webp",
		},
		{
			name: "Landscaping",
			slug: "landscaping",
			image: "/industry/landscaping.webp",
		},
		{ name: "Roofing", slug: "roofing", image: "/industry/roofing.webp" },
	]

	return (
		<section className="relative pt-24 md:pt-32 lg:pt-40 overflow-x-hidden bg-gradient-to-br from-black via-black to-yellow">
			<div className="relative z-10 w-full px-0">
				{/* Cards container with fixed responsive height */}
				<div className="h-[420px] sm:h-[480px] lg:h-[640px]">
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6 h-full">
						{industries.map(
							(item, index) => (
								<div
									key={
										item.slug
									}
									className="group relative rounded-3xl overflow-hidden"
								>
									<div className="relative h-full">
										<Image
											src={
												item.image
											}
											alt={
												item.name
											}
											fill
											priority={
												index <
												3
											}
											className="object-cover"
										/>
										<div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />
										<div className="absolute left-4 bottom-4">
											<p className="text-white text-xl sm:text-2xl font-semibold drop-shadow">
												{
													item.name
												}
											</p>
										</div>
									</div>
								</div>
							)
						)}
					</div>
				</div>

				{/* Center overlay text */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{
						duration: 0.6,
						ease: "easeOut",
					}}
					className="pointer-events-none select-none absolute inset-x-0 top-24 md:top-32 flex flex-col items-center text-center z-20"
				>
					<h1 className="text-white/95 text-4xl md:text-6xl lg:text-7xl font-cal-sans font-semibold tracking-tight">
						{heading}
					</h1>
					<p className="mt-4 text-white/90 text-lg md:text-xl">
						{subheading}
					</p>
				</motion.div>
			</div>
		</section>
	)
}
