"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { CustomButton } from "@/components/core/button"

type HeroData = {
	heading: string
	subheading: string
	images: string[]
}

type AnimatedTextConfig = {
	text: string
	baseDelay: number
	delayIncrement?: number
	duration?: number
	yOffset?: number
	keyPrefix: string
}

const renderAnimatedText = ({
	text,
	baseDelay,
	delayIncrement = 0.05,
	duration = 0.6,
	yOffset = 50,
	keyPrefix,
}: AnimatedTextConfig) => {
	if (!text?.trim()) {
		return null
	}

	const words = text.trim().split(/\s+/)

	return words.map((word, wordIndex) => {
		const previousCharacters =
			words.slice(0, wordIndex).join(" ").length +
			(wordIndex > 0 ? 1 : 0)

		return (
			<span
				key={`${keyPrefix}-word-${wordIndex}`}
				className="inline-block mr-[0.25em]"
			>
				{word.split("").map((char, charIndex) => (
					<motion.span
						key={`${keyPrefix}-char-${wordIndex}-${charIndex}`}
						initial={{
							opacity: 0,
							y: yOffset,
						}}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration,
							delay:
								baseDelay +
								(previousCharacters +
									charIndex) *
									delayIncrement,
							ease: [
								0.25, 0.1, 0.25,
								1,
							],
						}}
						className="inline-block"
					>
						{char}
					</motion.span>
				))}
			</span>
		)
	})
}

type HeroSixProps = {
	data?: HeroData
}

export default function HeroSix({ data }: HeroSixProps) {
	if (!data) {
		return null
	}

	const heroRef = useRef<HTMLDivElement>(null)
	const { heading, subheading, images = [] } = data
	const [primaryImage, ...inlineImages] = images

	const headingWords = heading.trim().split(/\s+/)
	const headingPrimary = headingWords.shift() ?? ""
	const headingSecondary = headingWords.join(" ")

	const baseImageConfigs = [
		{
			delay: 1.2,
			x: [0, -2, 1, -1, 0],
			y: [0, 1, -2, 1, 0],
			floatDuration: 3.5,
			extraDelay: 4.2,
		},
		{
			delay: 1.9,
			x: [0, 1, -3, 2, 0],
			y: [0, 2, -1, -1, 0],
			floatDuration: 4.2,
			extraDelay: 4.4,
		},
		{
			delay: 2.6,
			x: [0, 2, -1, 1, 0],
			y: [0, -1, 2, -1, 0],
			floatDuration: 3.8,
			extraDelay: 4.6,
		},
	]

	const inlineImageConfigs = inlineImages
		.slice(0, 3)
		.filter(Boolean)
		.map((src, index) => ({
			src: src as string,
			...baseImageConfigs[
				Math.min(index, baseImageConfigs.length - 1)
			],
		}))
	const subheadingWords = subheading.trim().split(/\s+/)
	const segmentCount = inlineImageConfigs.length + 1
	const wordsPerSegment = Math.max(
		Math.ceil(subheadingWords.length / Math.max(segmentCount, 1)),
		1
	)
	const subheadingSegments = Array.from(
		{ length: segmentCount },
		(_, index) => {
			const start = index * wordsPerSegment
			const end =
				index === segmentCount - 1
					? undefined
					: (index + 1) * wordsPerSegment
			return subheadingWords.slice(start, end).join(" ")
		}
	)

	// Scroll tracking for dissolve effect
	const { scrollYProgress } = useScroll({
		target: heroRef,
		offset: ["start start", "end start"],
	})

	// Transform scroll progress to opacity and scale
	const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
	const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])
	const textY = useTransform(scrollYProgress, [0, 0.3], [0, -50])

	return (
		<section
			ref={heroRef}
			className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden"
		>
			{/* Background image */}
			<div
				className="absolute inset-0 bg-cover bg-center"
				style={{
					backgroundImage: `url('/homepage/hero-bg3.jpg')`,
				}}
			/>

			{/* Diagonal gradient overlay */}
			<div className="absolute inset-0 bg-gradient-to-br from-black via-black to-yellow" />

			{/* Hero content */}
			<motion.div
				className="relative z-20 max-w-5xl mx-auto px-6 text-center"
				style={{
					opacity: textOpacity,
					scale: textScale,
					y: textY,
				}}
			>
				<h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight text-balance text-white text-center font-cal-sans tracking-wide">
					{renderAnimatedText({
						text: `${headingPrimary} `,
						baseDelay: 0.5,
						keyPrefix: "heading-primary",
					})}
					{primaryImage && (
						<motion.span
							className="inline-block w-8 h-10 md:w-12 md:h-12 lg:w-32 lg:h-18 -mb-1 md:-mb-2 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm border-2 border-white/30 mx-2"
							initial={{ opacity: 0, x: 50 }}
							animate={{
								opacity: 1,
								x: [0, 2, -1, 1, 0],
								y: [0, -1, 2, -1, 0],
							}}
							transition={{
								opacity: {
									duration: 0.6,
									delay: 0.3,
									ease: [
										0.25,
										0.1,
										0.25,
										1,
									],
								},
								x: {
									duration: 0.6,
									delay: 0.3,
									ease: [
										0.25,
										0.1,
										0.25,
										1,
									],
								},
								y: {
									duration: 4,
									repeat: Infinity,
									ease: "easeInOut",
									delay: 4,
								},
							}}
						>
							<img
								src={primaryImage}
								alt={`${heading} primary visual`}
								className="w-full h-full object-cover"
							/>
						</motion.span>
					)}
					{renderAnimatedText({
						text: headingSecondary,
						baseDelay: 0.9,
						keyPrefix: "heading-secondary",
					})}
				</h1>
				<p className="mt-8 text-lg md:text-xl lg:text-3xl font-semibold leading-tight text-pretty max-w-3xl mx-auto text-white/90 text-center">
					{subheadingSegments.map(
						(segment, index) => {
							const textWithSpace =
								index <
								subheadingSegments.length -
									1
									? `${segment} `
									: segment

							return (
								<span
									key={`subheading-segment-${index}`}
									className="inline-block"
								>
									{renderAnimatedText(
										{
											text: textWithSpace,
											baseDelay:
												1.5 +
												index *
													0.7,
											delayIncrement: 0.02,
											duration: 0.5,
											yOffset: 30,
											keyPrefix: `subheading-${index}`,
										}
									)}
									{inlineImageConfigs[
										index
									] && (
										<motion.span
											className="inline-block w-6 h-7 md:w-8 md:h-8 lg:w-24 lg:h-14 -mb-1 md:-mb-2 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm border-2 border-white/30 mx-1"
											initial={{
												opacity: 0,
												x: 50,
											}}
											animate={{
												opacity: 1,
												x: inlineImageConfigs[
													index
												]
													.x,
												y: inlineImageConfigs[
													index
												]
													.y,
											}}
											transition={{
												opacity: {
													duration: 0.6,
													delay: inlineImageConfigs[
														index
													]
														.delay,
													ease: [
														0.25,
														0.1,
														0.25,
														1,
													],
												},
												x: {
													duration: 0.6,
													delay: inlineImageConfigs[
														index
													]
														.delay,
													ease: [
														0.25,
														0.1,
														0.25,
														1,
													],
												},
												y: {
													duration: inlineImageConfigs[
														index
													]
														.floatDuration,
													repeat: Infinity,
													ease: "easeInOut",
													delay: inlineImageConfigs[
														index
													]
														.extraDelay,
												},
											}}
										>
											<img
												src={
													inlineImageConfigs[
														index
													]
														.src
												}
												alt={`${heading} inline visual ${
													index +
													2
												}`}
												className="w-full h-full object-cover"
											/>
										</motion.span>
									)}
								</span>
							)
						}
					)}
				</p>

				{/* CTA Button */}
				<motion.div
					className="mt-12 flex justify-center"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.6,
						delay: 3.5,
						ease: [0.25, 0.1, 0.25, 1],
					}}
				>
					<CustomButton
						text="Get Started Today"
						href="/contact"
						textColor="black"
						borderColor="white"
					/>
				</motion.div>
			</motion.div>
		</section>
	)
}
