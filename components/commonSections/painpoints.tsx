"use client"

import { motion } from "framer-motion"
import { AlertCircle, CheckCircle2 } from "lucide-react"

interface PainPoint {
	problem: string
	solution: string
}

interface PainPointsProps {
	data?: {
		heading?: string
		subheading?: string
		painPoints?: PainPoint[]
	}
}

export default function PainPoints({ data }: PainPointsProps) {
	if (!data?.painPoints || data.painPoints.length === 0) {
		return null
	}

	const painPoints = data.painPoints

	return (
		<section className="relative py-12 md:py-20 lg:py-32 bg-gradient-to-b from-pink/20 to-white">
			<div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
				{/* Header Section */}
				<motion.div
					className="text-center mb-8 md:mb-12 lg:mb-16"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{
						duration: 0.8,
						ease: "easeOut",
					}}
				>
					{data.heading && (
						<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-regular text-blackbrown leading-tight font-cal-sans mb-4 md:mb-6">
							{(() => {
								const heading =
									data.heading
								// Find words that should be highlighted (like "Challenges", "Problems", etc.)
								const highlightWords =
									[
										"Challenges",
										"Problems",
										"Issues",
										"Pain Points",
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
												word
													.toLowerCase()
													.includes(
														hw.toLowerCase()
													)
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
						<p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto px-2">
							{data.subheading}
						</p>
					)}
				</motion.div>

				{/* Main Content Panels */}
				<motion.div
					className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto"
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{
						duration: 0.8,
						delay: 0.2,
						ease: "easeOut",
					}}
				>
					{/* Left Panel - Challenges List */}
					<div
						className="p-4 sm:p-6 md:p-8 space-y-0 rounded-t-2xl lg:rounded-tr-none lg:rounded-br-none lg:rounded-tl-[20px] lg:rounded-bl-[20px]"
						style={{
							backgroundColor:
								"#5D50EB",
						}}
					>
						<div className="flex items-center gap-3 sm:gap-4 mb-4 md:mb-6">
							<div
								className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#0e0e59]"
							>
								<AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
							</div>
							<h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
								Common
								Challenges
							</h3>
						</div>
						{painPoints.map(
							(item, index) => (
								<div
									key={
										index
									}
									className="py-3 sm:py-4 px-2 sm:px-4"
								>
									<div className="flex items-start gap-3 sm:gap-4">
										<div
											className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#0e0e59]"
										>
											<AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
										</div>
										<span className="text-sm sm:text-base md:text-lg font-medium text-white leading-relaxed">
											{
												item.problem
											}
										</span>
									</div>
									{index <
										painPoints.length -
											1 && (
										<div className="border-b border-white/30 mt-3 sm:mt-4"></div>
									)}
								</div>
							)
						)}
					</div>

					{/* Right Panel - Solutions */}
					<div className="bg-white p-4 sm:p-6 md:p-8 border border-gray-200 shadow-lg rounded-b-2xl lg:rounded-tl-none lg:rounded-bl-none lg:rounded-tr-[20px] lg:rounded-br-[20px]">
						<div className="flex items-center gap-3 sm:gap-4 mb-4 md:mb-6">
							<div
								className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#0e0e59]"
							>
								<CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
							</div>
							<h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-blackbrown">
								Our Solutions
							</h3>
						</div>
						{painPoints.map(
							(item, index) => (
								<div
									key={
										index
									}
									className="mb-4 sm:mb-6 last:mb-0"
								>
									<div className="space-y-2">
										<p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
											{
												item.solution
											}
										</p>
									</div>
									{index <
										painPoints.length -
											1 && (
										<div className="border-b border-gray-200 mt-4 sm:mt-6"></div>
									)}
								</div>
							)
						)}
					</div>
				</motion.div>
			</div>
		</section>
	)
}
