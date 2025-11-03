"use client"

import { motion } from "framer-motion"

interface AchievementCardProps {
	number: string
	label: string
	index: number
}

function AchievementCard({ number, label, index }: AchievementCardProps) {
	return (
		<motion.div
			className="text-center"
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-100px" }}
			transition={{
				duration: 0.6,
				delay: index * 0.1,
				ease: "easeOut",
			}}
		>
			<h3 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3">
				{number}
			</h3>
			<p className="text-base md:text-lg font-light text-white/80">
				{label}
			</p>
		</motion.div>
	)
}

export default function Achievements() {
	const achievements = [
		{ number: "100+", label: "Brands Transformed" },
		{ number: "300M+", label: "Impressions Generated" },
		{ number: "5x", label: "Average ROI on Campaigns" },
		{ number: "$25M+", label: "in Client Revenue Growth" },
	]

	return (
		<section className="py-32 px-6 bg-black">
			<div className="container max-w-7xl mx-auto">
				<div className="space-y-16">
					{/* Top Section - Heading and Description */}
					<div className="grid md:grid-cols-2 gap-12 items-start">
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{
								opacity: 1,
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
							<h2 className="text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-6 font-cal-sans tracking-wide">
								Achievements
							</h2>
						</motion.div>
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{
								opacity: 1,
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
							<p className="text-lg font-light text-white/80 leading-relaxed">
								Over the years,
								we've helped
								businesses grow,
								engaged
								audiences with
								compelling
								content, and set
								new benchmarks
								in digital
								marketing. Every
								milestone
								reflects our
								commitment to
								creativity,
								strategy, and
								continuous
								innovation in
								the
								ever-evolving
								digital
								landscape.
							</p>
						</motion.div>
					</div>

					{/* Bottom Section - Stats Grid */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
						{achievements.map(
							(
								achievement,
								index
							) => (
								<AchievementCard
									key={
										achievement.label
									}
									number={
										achievement.number
									}
									label={
										achievement.label
									}
									index={
										index
									}
								/>
							)
						)}
					</div>
				</div>
			</div>
		</section>
	)
}
