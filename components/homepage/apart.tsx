"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"

type ApartData = {
	ours: string[]
	others: string[]
}

const defaultApartData: ApartData = {
	heading: "What sets us apart from others",
	highlightTarget: "apart",
	tagline: "We don't settle for average, and neither should you.",
	oursTitle: "Digital Neighbour",
	othersTitle: "Other Agencies",
	ours: [
		"Tailored, insight-led strategy",
		"Clear pricing, no hidden fees",
		"Agile, efficient, no delays",
		"Flexible terms, no long contracts",
		"Direct access to experts",
	],
	others: [
		"Generic, one-size-fits-all",
		"Vague reports, surprise costs",
		"Slow processes, missed deadlines",
		"Locked into lengthy agreements",
		"Generic account managers",
	],
}

type ApartProps = {
	data?: ApartData
}

export default function Apart({ data }: ApartProps) {
	const isMobile = useIsMobile()
	const sectionRef = useRef<HTMLDivElement | null>(null)
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	})

	const {
		heading = "What sets us apart from others",
		highlightTarget = "apart",
		tagline = "We don't settle for average, and neither should you.",
		oursTitle = "Digital Neighbour",
		othersTitle = "Other Agencies",
		ours,
		others,
	} = {
		...defaultApartData,
		...data,
	}

	// Split text animations (wider range + spring smoothing)
	const rawLeftX = useTransform(
		scrollYProgress,
		[0.25, 0.8],
		["0%", "-130%"]
	)
	const rawRightX = useTransform(
		scrollYProgress,
		[0.25, 0.8],
		["0%", "130%"]
	)

	const springConfig = { stiffness: 120, damping: 24, mass: 0.35 }
	const leftX = useSpring(rawLeftX, springConfig)
	const rightX = useSpring(rawRightX, springConfig)

	// First card animation (enter earlier, settle smoother)
	const rawCardY = useTransform(
		scrollYProgress,
		[0.2, 0.75],
		["100%", "0%"]
	)
	const rawCardOpacity = useTransform(
		scrollYProgress,
		[0.35, 0.7],
		[0, 1]
	)
	const cardY = useSpring(rawCardY, springConfig)
	const cardOpacity = useSpring(rawCardOpacity, {
		...springConfig,
		damping: 22,
	})

	// Second card animation (slides in with more runway and easing)
	const rawSecondCardX = useTransform(
		scrollYProgress,
		[0.55, 0.95],
		["100%", "0%"]
	)
	const rawSecondCardOpacity = useTransform(
		scrollYProgress,
		[0.6, 0.95],
		[0, 1]
	)
	const secondCardX = useSpring(rawSecondCardX, springConfig)
	const secondCardOpacity = useSpring(rawSecondCardOpacity, {
		...springConfig,
		damping: 22,
	})

	const headingParts = (() => {
		const lowerHeading = heading.toLowerCase()
		const target = highlightTarget?.toLowerCase() ?? ""
		const matchIndex = target ? lowerHeading.indexOf(target) : -1

		if (matchIndex === -1) {
			return {
				before: heading,
				highlight: "",
				after: "",
			}
		}

		return {
			before: heading.slice(0, matchIndex),
			highlight: heading.slice(
				matchIndex,
				matchIndex + target.length
			),
			after: heading.slice(matchIndex + target.length),
		}
	})()

	const renderHighlightedWord = (italic = true) => (
		<>
			{headingParts.before}
			{headingParts.highlight && (
				<span className="relative inline-block">
					<span className="absolute bottom-1 left-0 right-0 h-2/4 bg-yellow"></span>
					<span
						className={`relative z-10 font-semibold${
							italic ? " italic" : ""
						}`}
					>
						{headingParts.highlight}
					</span>
				</span>
			)}
		</>
	)

	if (isMobile) {
		return (
			<section className="relative w-full bg-pink/20 flex flex-col items-center justify-center py-16 px-4">
				{/* Title row */}
				<div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-3xl sm:text-4xl font-regular mb-8 px-2">
					<span className="text-center">
						{renderHighlightedWord()}
					</span>
					{headingParts.after && (
						<span className="text-center">
							{headingParts.after}
						</span>
					)}
				</div>

				{/* Tagline above cards */}
				<p className="text-lg font-light text-gray-700 text-center mb-8">
					{tagline}
				</p>

				{/* Cards row */}
				<div className="flex flex-col items-center justify-center gap-8 w-full max-w-7xl px-4">
					{/* First Card */}
					<div className="w-full max-w-sm bg-black rounded-2xl shadow-xl p-8">
						<h3 className="text-2xl font-semibold mb-6 text-yellow">
							{oursTitle}
						</h3>
						<ul className="space-y-4 text-base text-bone">
							{ours.map(
								(
									item,
									index
								) => {
									const isLast =
										index ===
										ours.length -
											1
									return (
										<li
											key={`mobile-ours-${item}`}
											className={`flex items-center gap-3 whitespace-nowrap ${
												isLast
													? "pb-2"
													: "border-b border-white/50 pb-2"
											}`}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="currentColor"
												className="size-6"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="m4.5 12.75 6 6 9-13.5"
												/>
											</svg>
											{
												item
											}
										</li>
									)
								}
							)}
						</ul>
					</div>

					{/* Second Card */}
					<div className="w-full max-w-sm bg-gray-50 rounded-2xl shadow-xl p-8">
						<h3 className="text-2xl font-semibold mb-6 text-yellow">
							{othersTitle}
						</h3>
						<ul className="space-y-4 text-base text-gray-700">
							{others.map(
								(
									item,
									index
								) => {
									const isLast =
										index ===
										others.length -
											1
									return (
										<li
											key={`mobile-others-${item}`}
											className={`flex items-center gap-3 whitespace-nowrap ${
												isLast
													? "pb-2"
													: "border-b border-gray-300 pb-2"
											}`}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="currentColor"
												className="size-6 rotate-45"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M12 4.5v15m7.5-7.5h-15"
												/>
											</svg>
											{
												item
											}
										</li>
									)
								}
							)}
						</ul>
					</div>
				</div>
			</section>
		)
	}

	return (
		<section
			ref={sectionRef}
			className="relative h-[200vh] w-full bg-gradient-to-b from-bone/20 to-white flex flex-col items-center"
		>
			{/* Sticky container for animations */}
			<div className="sticky top-0 h-screen flex flex-col items-center justify-start pt-20 overflow-hidden">
				{/* Title row */}
				<div className="flex items-center justify-center gap-3 text-4xl md:text-5xl font-regular">
					<motion.span
						style={{ x: leftX }}
						className="whitespace-nowrap"
					>
						{renderHighlightedWord()}
					</motion.span>
					{headingParts.after && (
						<motion.span
							style={{ x: rightX }}
							className="whitespace-nowrap"
						>
							{headingParts.after}
						</motion.span>
					)}
				</div>

				{/* Tagline above cards */}
				<motion.p
					style={{ opacity: cardOpacity }}
					className="mt-8 text-lg md:text-3xl font-light text-gray-700 text-center"
				>
					{tagline}
				</motion.p>

				{/* Cards row */}
				<div className="relative mt-8 px-2 flex flex-col md:flex-row items-center md:items-start justify-center gap-8 w-full max-w-7xl">
					{/* First Card */}
					<motion.div
						style={{
							y: cardY,
							opacity: cardOpacity,
						}}
						className="w-96 bg-black rounded-2xl shadow-xl p-8 z-10"
					>
						<h3 className="text-2xl font-semibold mb-6 text-yellow">
							{oursTitle}
						</h3>
						<ul className="space-y-4 text-base text-white">
							{ours.map(
								(
									item,
									index
								) => {
									const isLast =
										index ===
										ours.length -
											1
									return (
										<li
											key={`desktop-ours-${item}`}
											className={`flex items-center gap-3 whitespace-nowrap ${
												isLast
													? "pb-2"
													: "border-b border-white/50 pb-2"
											}`}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="currentColor"
												className="size-6"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="m4.5 12.75 6 6 9-13.5"
												/>
											</svg>
											{
												item
											}
										</li>
									)
								}
							)}
						</ul>
					</motion.div>

					{/* Second Card */}
					<motion.div
						style={{
							x: secondCardX,
							opacity: secondCardOpacity,
						}}
						className="w-96 bg-gray-50 rounded-2xl shadow-xl p-8"
					>
						<h3 className="text-2xl font-semibold mb-6">
							{othersTitle}
						</h3>
						<ul className="space-y-4 text-base text-gray-700">
							{others.map(
								(
									item,
									index
								) => {
									const isLast =
										index ===
										others.length -
											1
									return (
										<li
											key={`desktop-others-${item}`}
											className={`flex items-center gap-3 whitespace-nowrap ${
												isLast
													? "pb-2"
													: "border-b border-gray-300 pb-2"
											}`}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="currentColor"
												className="size-6 rotate-45"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M12 4.5v15m7.5-7.5h-15"
												/>
											</svg>
											{
												item
											}
										</li>
									)
								}
							)}
						</ul>
					</motion.div>
				</div>
			</div>
		</section>
	)
}
