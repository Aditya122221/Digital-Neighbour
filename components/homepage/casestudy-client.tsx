"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { CustomButton } from "@/components/core/button"

export default function CaseStudyClient({
	caseStudiesList,
}: {
	caseStudiesList: any[]
}) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [hoveredCard, setHoveredCard] = useState<string | null>(null)
	const [hoveredStudyId, setHoveredStudyId] = useState<number | null>(
		null
	)
	const [currentImageIndex, setCurrentImageIndex] = useState<{
		[key: string]: number
	}>({})

	const caseStudies = caseStudiesList || []
	const sectionHeading = "Latest work"

	if (!caseStudies || caseStudies.length === 0) {
		return null
	}

	const nextSlide = () => {
		setCurrentIndex((prev) => (prev + 1) % caseStudies.length)
	}

	const prevSlide = () => {
		setCurrentIndex(
			(prev) =>
				(prev - 1 + caseStudies.length) %
				caseStudies.length
		)
	}

	const handleMouseEnter = (cardUniqueId: string, studyId: number) => {
		setHoveredCard(cardUniqueId)
		setHoveredStudyId(studyId)
		setCurrentImageIndex((prev) => ({ ...prev, [cardUniqueId]: 0 }))
	}

	const handleMouseLeave = (cardUniqueId: string, studyId: number) => {
		setHoveredCard(null)
		setHoveredStudyId(null)
		// Reset image index for this specific card
		setCurrentImageIndex((prev) => {
			const newState = { ...prev }
			delete newState[cardUniqueId]
			return newState
		})
	}

	// Auto-cycle images when hovering
	useEffect(() => {
		if (hoveredCard !== null && hoveredStudyId !== null) {
			const study = caseStudies.find(
				(s) => s.id === hoveredStudyId
			)
			// Only cycle if there are multiple images
			if (
				study &&
				study.bgImages &&
				study.bgImages.length > 1
			) {
				const interval = setInterval(() => {
					setCurrentImageIndex((prev) => ({
						...prev,
						[hoveredCard]:
							((prev[hoveredCard] ||
								0) +
								1) %
							study.bgImages.length,
					}))
				}, 1000) // Change image every 1 second

				return () => clearInterval(interval)
			}
		}
	}, [hoveredCard, hoveredStudyId, caseStudies])

	const getVisibleCards = () => {
		if (!caseStudies || caseStudies.length === 0) {
			return []
		}
		const cards = []
		for (let i = 0; i < 3; i++) {
			const index = (currentIndex + i) % caseStudies.length
			cards.push(caseStudies[index])
		}
		return cards
	}

	return (
		<section className="py-20 min-h-screen px-6 bg-bone/20">
			<div className="max-w-7xl mx-auto">
				{/* Section Header */}
				<motion.div
					className="text-center mb-16"
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{
						once: true,
						margin: "-100px",
					}}
					transition={{
						duration: 0.8,
						ease: "easeOut",
					}}
				>
					<h2 className="text-4xl md:text-6xl font-regular text-blackbrown mb-6 text-balance font-cal-sans tracking-wide">
						{sectionHeading}
					</h2>
				</motion.div>

				{/* Cards Container */}
				<div className="flex gap-6 mb-8 overflow-hidden">
					{getVisibleCards().map(
						(study, index) => {
							const cardUniqueId = `${study.id}-${currentIndex}-${index}`
							const imageCount =
								study.bgImages
									?.length ||
								0
							const rawImgIndex =
								currentImageIndex[
									cardUniqueId
								] || 0
							// Ensure index is within bounds
							const currentImgIndex =
								imageCount > 0
									? rawImgIndex %
										imageCount
									: 0
							const currentBgImage =
								study
									.bgImages?.[
									currentImgIndex
								] ||
								study
									.bgImages?.[0]
							const isHovered =
								hoveredCard ===
								cardUniqueId

							return (
								<div
									key={
										cardUniqueId
									}
									className={`
                flex-shrink-0 basis-full sm:basis-[calc((100%_-_1.5rem)/2)] lg:basis-[calc((100%_-_3rem)/3)] h-[36rem] rounded-4xl p-6 relative flex flex-col
                ${study.textColor}
                transition-all duration-500 ease-in-out
                bg-cover bg-center bg-no-repeat
              `}
									style={{
										backgroundImage:
											currentBgImage
												? `url(${currentBgImage})`
												: "none",
									}}
									onMouseEnter={() =>
										handleMouseEnter(
											cardUniqueId,
											study.id
										)
									}
									onMouseLeave={() =>
										handleMouseLeave(
											cardUniqueId,
											study.id
										)
									}
								>
									{/* Header */}
									<div className="mb-6 w-full">
										<div className="backdrop-blur-md bg-white/20 rounded-full px-4 py-3 flex items-center justify-between w-full border border-white/30">
											<h3 className="text-2xl md:text-2xl font-medium">
												{
													study.title
												}
											</h3>
											<div className="bg-[#0e0e59] rounded-full p-2 flex items-center justify-center">
												<ArrowUpRight
													className={`w-6 h-6 text-white transition-transform duration-300 ease-in-out ${
														isHovered
															? "rotate-45"
															: ""
													}`}
													strokeWidth={
														2.5
													}
												/>
											</div>
										</div>
									</div>

									{/* Hover Overlay with Metrics */}
									{isHovered && (
										<div className="absolute inset-0 bg-[#5D50EB]/80 backdrop-blur-sm rounded-4xl flex items-center justify-center opacity-100 transition-opacity duration-300 ease-in-out z-10">
											<div className="text-center px-6">
												<div className="grid grid-cols-1 gap-8">
													{study.metrics.map(
														(
															metric: {
																number: string
																text: string
															},
															index: number
														) => (
															<div
																key={
																	index
																}
																className="text-center"
															>
																<div className="text-4xl md:text-5xl font-bold text-white mb-2">
																	{
																		metric.number
																	}
																</div>
																<div className="text-lg md:text-xl text-white/80 font-light capitalize">
																	{
																		metric.text
																	}
																</div>
															</div>
														)
													)}
												</div>
											</div>
										</div>
									)}

									{/* Services Tags - Bottom of card */}
									<div className="mt-auto relative z-5">
										<div className="flex flex-wrap gap-2">
											{study.isNew && (
												<span className="px-3 py-1 bg-yellow text-blackbrown text-xl rounded-full font-medium">
													New
												</span>
											)}
											{study.services.map(
												(
													service: string
												) => (
													<span
														key={
															service
														}
														className="px-3 py-1 text-xl rounded-full font-light bg-white/20 backdrop-blur-sm border border-white/30"
													>
														{
															service
														}
													</span>
												)
											)}
										</div>
									</div>
								</div>
							)
						}
					)}
				</div>

				{/* Navigation */}
				<div className="flex gap-4 items-center justify-between">
					<div className="flex gap-4">
						<button
							onClick={prevSlide}
							className="w-12 h-12 bg-[#0e0e59] text-white rounded-full flex items-center justify-center hover:bg-[#0e0e59]/80 transition-colors"
						>
							<ChevronLeft className="w-6 h-6" />
						</button>
						<button
							onClick={nextSlide}
							className="w-12 h-12 bg-[#0e0e59] text-white rounded-full flex items-center justify-center hover:bg-[#0e0e59]/80 transition-colors"
						>
							<ChevronRight className="w-6 h-6" />
						</button>
					</div>
					<CustomButton
						text="More Insight"
						href="/resources"
						textColor="white"
						borderColor="white"
					/>
				</div>
			</div>
		</section>
	)
}
