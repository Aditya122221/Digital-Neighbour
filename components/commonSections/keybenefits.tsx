"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface Benefit {
	title: string
	description: string
	icon?: string
	image?: string
}

interface KeyBenefitsProps {
	data?: {
		heading?: string
		subheading?: string
		benefits?: Benefit[]
	}
}

const defaultIcons = [
	<svg
		key="rocket"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth="1.5"
		stroke="currentColor"
		className="w-8 h-8"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.75 3v4.8m-5.84 2.58a14.98 14.98 0 0 0-6.16 12.12A14.98 14.98 0 0 0 4.41 19.37M9.75 15.75v4.8a6 6 0 0 1-5.84-7.38m5.84 2.58a6 6 0 0 1 5.84-7.38v-4.8m-5.84 2.58a6 6 0 0 1-5.84 7.38v4.8"
		/>
	</svg>,
	<svg
		key="chart"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth="1.5"
		stroke="currentColor"
		className="w-8 h-8"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
		/>
	</svg>,
	<svg
		key="shield"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth="1.5"
		stroke="currentColor"
		className="w-8 h-8"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
		/>
	</svg>,
	<svg
		key="clock"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth="1.5"
		stroke="currentColor"
		className="w-8 h-8"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
		/>
	</svg>,
	<svg
		key="user"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth="1.5"
		stroke="currentColor"
		className="w-8 h-8"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
		/>
	</svg>,
]

export default function KeyBenefits({ data }: KeyBenefitsProps) {
	if (!data?.benefits || data.benefits.length === 0) {
		return null
	}

	return (
		<section className="py-16 md:py-20 px-6 bg-gradient-to-b from-white to-pink/20">
			<div className="container max-w-7xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{
						duration: 0.8,
						ease: "easeOut",
					}}
					className="text-center mb-12 md:mb-16"
				>
					{data.heading && (
						<h2 className="text-4xl md:text-5xl lg:text-6xl font-regular text-blackbrown leading-tight font-cal-sans mb-4">
							{(() => {
								const heading =
									data.heading
								// Highlight "Benefits", "Advantages", or "Outcomes"
								const highlightWords =
									[
										"Benefits",
										"Advantages",
										"Outcomes",
									]
								const words =
									heading.split(
										" "
									)
								let result = []

								for (
									let i = 0;
									i <
									words.length;
									i++
								) {
									const word =
										words[
											i
										].replace(
											/[.,;:!?]/g,
											""
										)
									const punctuation =
										words[
											i
										].replace(
											word,
											""
										)

									if (
										highlightWords.some(
											(
												hw
											) =>
												word.toLowerCase() ===
												hw.toLowerCase()
										)
									) {
										result.push(
											<span
												key={
													i
												}
												className="relative inline-block"
											>
												<span className="absolute bottom-1 left-0 right-0 h-2/4 bg-yellow"></span>
												<span className="relative z-10 font-medium italic">
													{
														word
													}
													{
														punctuation
													}
												</span>
											</span>
										)
									} else {
										result.push(
											<span
												key={
													i
												}
											>
												{
													words[
														i
													]
												}
											</span>
										)
									}
									if (
										i <
										words.length -
											1
									)
										result.push(
											" "
										)
								}

								return result.length >
									0
									? result
									: heading
							})()}
						</h2>
					)}
					{data.subheading && (
						<p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
							{data.subheading}
						</p>
					)}
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
					{data.benefits.map((benefit, index) => (
						<motion.div
							key={index}
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
							}}
							transition={{
								duration: 0.6,
								ease: "easeOut",
								delay:
									index *
									0.1,
							}}
							className="bg-[#5D50EB] !rounded-none md:!rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
						>
							{/* Icon/Image Section */}
							<div className="mb-6">
								{benefit.image ? (
									<div className="relative w-full h-48 !rounded-none md:!rounded-xl overflow-hidden bg-gradient-to-br from-yellow/20 to-pink/20">
										<Image
											src={
												benefit.image
											}
											alt={
												benefit.title
											}
											fill
											className="object-cover"
										/>
									</div>
								) : (
									<div className="w-16 h-16 !rounded-none md:!rounded-xl bg-[#0e0e59] flex items-center justify-center mb-4 text-white">
										{benefit.icon ? (
											<span className="text-3xl">
												{
													benefit.icon
												}
											</span>
										) : (
											defaultIcons[
												index %
													defaultIcons.length
											]
										)}
									</div>
								)}
							</div>

							{/* Content Section */}
							<div className="space-y-3">
								<h3 className="text-xl md:text-2xl font-semibold text-white leading-tight">
									{
										benefit.title
									}
								</h3>
								<p className="text-base md:text-lg text-white/90 leading-relaxed">
									{
										benefit.description
									}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
