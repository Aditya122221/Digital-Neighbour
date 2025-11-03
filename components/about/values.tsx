"use client"

import { motion } from "framer-motion"

interface ValueCardProps {
	title: string
	description: string
	index: number
	isLast?: boolean
}

function ValueCard({ title, description, index, isLast }: ValueCardProps) {
	return (
		<motion.div
			className="pb-12 border-b border-gray-200 last:border-b-0"
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-100px" }}
			transition={{
				duration: 0.6,
				delay: index * 0.1,
				ease: "easeOut",
			}}
		>
			<h3 className="text-xl md:text-5xl lg:text-6xl font-bold text-blackbrown mb-4 font-cal-sans tracking-wide">
				{title}
			</h3>
			<p className="text-base font-light text-blackbrown/80 leading-relaxed">
				{description}
			</p>
		</motion.div>
	)
}

export default function Values() {
	const values = [
		{
			title: "Clarity in Strategy",
			description:
				"We believe great marketing starts with clear, intentional strategy. Every campaign we create is driven by data, insight, and a deep understanding of our clients' goals.",
		},
		{
			title: "Creativity with Purpose",
			description:
				"Innovation is at the heart of everything we do. We craft compelling, original content that doesn't just look good—it connects, engages, and drives meaningful results.",
		},
		{
			title: "Collaboration that Elevates",
			description:
				"Success is a shared journey. We work closely with our clients, fostering open communication and mutual trust to build brands that thrive in the digital space.",
		},
	]

	return (
		<section className="py-32 px-6 bg-white">
			<div className="container max-w-7xl mx-auto">
				<div className="grid md:grid-cols-2 gap-16 items-start">
					{/* Left Column - Heading */}
					<motion.div
						className="flex items-start"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{
							once: true,
							margin: "-100px",
						}}
						transition={{
							duration: 0.8,
							ease: "easeOut",
						}}
					>
						<h2 className="text-5xl md:text-6xl lg:text-7xl font-medium text-blackbrown font-cal-sans tracking-wide">
							Our Values
						</h2>
					</motion.div>

					{/* Right Column - Values */}
					<div className="space-y-0">
						{values.map((value, index) => (
							<ValueCard
								key={
									value.title
								}
								title={
									value.title
								}
								description={
									value.description
								}
								index={index}
								isLast={
									index ===
									values.length -
										1
								}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
