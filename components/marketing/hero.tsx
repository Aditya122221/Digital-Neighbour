"use client"

import { motion } from "framer-motion"
import { CustomButton } from "@/components/core/button"

interface MarketingHeroProps {
	data?: {
		heading?: string
		subheading?: string
		ctaText?: string
		ctaHref?: string
	}
}

export default function MarketingHero({ data }: MarketingHeroProps) {
	const heading =
		data?.heading ||
		"Full-Funnel Marketing Agency for Compounding Growth"
	const subheading =
		data?.subheading ||
		"We blend brand, content, and performance marketing to build predictable demand engines that keep your pipeline full of ideal customers."
	const ctaText = data?.ctaText || "Book a marketing strategy session"
	const ctaHref = data?.ctaHref || "/contact"

	return (
		<section className="relative bg-gradient-to-br from-black via-black to-yellow text-white pt-28 md:pt-36 lg:pt-44 pb-20 md:pb-28">
			<div className="container mx-auto px-6 md:px-10">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.8,
						ease: "easeOut",
					}}
					className="max-w-4xl mx-auto text-center space-y-8"
				>
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-cal-sans font-semibold leading-tight">
						{heading}
					</h1>
					<p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
						{subheading}
					</p>
					<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
						<CustomButton
							text={ctaText}
							href={ctaHref}
							textColor="black"
							borderColor="black"
							className="px-8 py-4 text-base md:text-lg"
						/>
					</div>
				</motion.div>
			</div>
		</section>
	)
}
