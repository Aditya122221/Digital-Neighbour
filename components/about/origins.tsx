"use client"

import { motion } from "framer-motion"

export default function Origins() {
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
							The Origins
						</h2>
					</motion.div>

					{/* Right Column - Content */}
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
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
						<p className="text-lg font-light text-blackbrown/80 leading-relaxed">
							Our journey began with a
							small group of creative
							minds—marketers,
							designers,
							strategists—who shared a
							passion for turning
							ideas into impact. We
							were tired of seeing
							brands waste time on
							cookie-cutter solutions
							that didn't work. So, we
							took a different
							approach: blending
							data-driven strategy
							with storytelling,
							creativity, and a touch
							of intuition.
						</p>
					</motion.div>
					<div
						style={{
							display: "flex",
		gap: "10px",
						}}
					>
						<img className="rounded-2xl ml-20"
							src="firstimage.avif"
alt = "Origin 1"
								width={600}
								height={200}
						/>
						<img className="rounded-2xl"
							src="secondimage.avif"
alt = "Origin 2"
width = { 1200}
									height={200}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
