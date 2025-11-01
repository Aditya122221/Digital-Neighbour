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

	return (
		<section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-pink/20 to-white">
			<div className="container mx-auto px-6 lg:px-12">
				{/* Header Section */}
				<motion.div
					className="text-center mb-12 md:mb-16"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{
						duration: 0.8,
						ease: "easeOut",
					}}
				>
					{data.heading && (
						<h2 className="text-4xl md:text-5xl lg:text-6xl font-regular text-blackbrown leading-tight font-cal-sans mb-6">
							{(() => {
								const heading = data.heading
								// Find words that should be highlighted (like "Challenges", "Problems", etc.)
								const highlightWords = [
									"Challenges",
									"Problems",
									"Issues",
									"Pain Points",
								]
								const words = heading.split(" ")
								let result = []

								for (let i = 0; i < words.length; i++) {
									const word = words[i].replace(/[.,;:!?]/g, "")
									const punctuation = words[i].replace(word, "")

									if (
										highlightWords.some((hw) =>
											word.toLowerCase().includes(hw.toLowerCase())
										)
									) {
										result.push(
											<span key={i} className="relative inline-block">
												<span className="absolute bottom-1 left-0 right-0 h-2/4 bg-yellow"></span>
												<span className="relative z-10 font-medium italic">
													{word}
													{punctuation}
												</span>
											</span>
										)
									} else {
										result.push(<span key={i}>{words[i]}</span>)
									}
									if (i < words.length - 1) result.push(" ")
								}

								return result.length > 0 ? result : heading
							})()}
						</h2>
					)}
					{data.subheading && (
						<p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
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
						className="p-6 md:p-8 space-y-0"
						style={{
							backgroundColor: "#1a1a1a",
							borderTopLeftRadius: "20px",
							borderBottomLeftRadius: "20px",
						}}
					>
						<div className="flex items-center gap-4 mb-6">
							<div
								className="w-12 h-12 rounded-lg flex items-center justify-center"
								style={{
									backgroundColor: "#ffe031",
								}}
							>
								<AlertCircle className="w-6 h-6 text-black" />
							</div>
							<h3 className="text-xl md:text-2xl font-semibold text-white">
								Common Challenges
							</h3>
						</div>
						{data.painPoints.map((item, index) => (
							<div key={index} className="py-4 px-4">
								<div className="flex items-start gap-4">
									<div
										className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
										style={{
											backgroundColor: "#ffe031",
										}}
									>
										<AlertCircle className="w-5 h-5 text-black" />
									</div>
									<span className="text-base md:text-lg font-medium text-white">
										{item.problem}
									</span>
								</div>
								{index < data.painPoints.length - 1 && (
									<div className="border-b border-white/30 mt-4"></div>
								)}
							</div>
						))}
					</div>

					{/* Right Panel - Solutions */}
					<div
						className="bg-white p-6 md:p-8 border border-gray-200 shadow-lg"
						style={{
							borderTopRightRadius: "20px",
							borderBottomRightRadius: "20px",
						}}
					>
						<div className="flex items-center gap-4 mb-6">
							<div
								className="w-12 h-12 rounded-lg flex items-center justify-center"
								style={{
									backgroundColor: "#ffe031",
								}}
							>
								<CheckCircle2 className="w-6 h-6 text-black" />
							</div>
							<h3 className="text-xl md:text-2xl font-semibold text-blackbrown">
								Our Solutions
							</h3>
						</div>
						{data.painPoints.map((item, index) => (
							<div key={index} className="mb-6 last:mb-0">
								<div className="space-y-2">
									<p className="text-base md:text-lg text-gray-700 leading-relaxed">
										{item.solution}
									</p>
								</div>
								{index < data.painPoints.length - 1 && (
									<div className="border-b border-gray-200 mt-6"></div>
								)}
							</div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	)
}

