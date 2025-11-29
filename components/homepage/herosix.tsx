"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { CustomButton } from "@/components/core/button"
import Image from "next/image"

type HeroData = {
	heading: string
	subheading: string
	trustedBy?: {
		text: string
		profiles: string[]
	}
	images?: {
		effortlessO?: string
		designD?: string
		aucklandO?: string
	}
	buttonText?: string
	buttonLink?: string
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
	const {
		heading,
		subheading,
		trustedBy,
		images,
		buttonText = "Call Now",
		buttonLink = "/contact",
	} = data

	// Parse heading to identify where images should be embedded
	const headingParts = heading.split(/\s+/)

	// Scroll tracking for dissolve effect
	const { scrollYProgress } = useScroll({
		target: heroRef,
		offset: ["start start", "end start"],
	})

	// Transform scroll progress to opacity and scale
	const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
	const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])
	const textY = useTransform(scrollYProgress, [0, 0.3], [0, -50])

	// Helper to get image for a word (if it should appear after the word)
	const getImageAfterWord = (
		word: string,
		wordIndex: number
	): string | undefined => {
		const lowerWord = word.toLowerCase()

		if (lowerWord === "effortless" && images?.effortlessO) {
			return images.effortlessO
		} else if (
			lowerWord === "design" &&
			wordIndex === 1 &&
			images?.designD
		) {
			// First "Design" word (index 1)
			return images.designD
		} else if (lowerWord === "auckland" && images?.aucklandO) {
			return images.aucklandO
		}

		return undefined
	}

	// Helper to render a word with optional image after it
	const renderWord = (word: string, wordIndex: number, color: string) => {
		const imageAfterWord = getImageAfterWord(word, wordIndex)

		return (
			<span
				key={`word-${wordIndex}`}
				className="inline-flex items-center mr-[0.25em]"
			>
				{renderAnimatedText({
					text: word,
					baseDelay: 0.5 + wordIndex * 0.1,
					keyPrefix: `heading-${wordIndex}`,
				})}
				{imageAfterWord && (
					<motion.span
						className="relative inline-block align-middle ml-1"
						initial={{
							opacity: 0,
							scale: 0,
						}}
						animate={{
							opacity: 1,
							scale: 1,
						}}
						transition={{
							duration: 0.6,
							delay:
								0.5 +
								wordIndex *
									0.1 +
								word.length *
									0.05,
							ease: [
								0.25, 0.1, 0.25,
								1,
							],
						}}
					>
						<span className="relative inline-block w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-md overflow-hidden border-2 border-gray-300">
							<Image
								src={
									imageAfterWord
								}
								alt=""
								fill
								className="object-cover"
							/>
						</span>
					</motion.span>
				)}
			</span>
		)
	}

	// Determine colors for each word based on the image description
	const getWordColor = (word: string, index: number): string => {
		const lowerWord = word.toLowerCase()
		// Black words: "Effortless", "Design" (second one at index 3), "Startups", "Auckland", "NZ"
		if (
			lowerWord === "effortless" ||
			(lowerWord === "design" && index === 3) ||
			lowerWord === "startups" ||
			lowerWord === "auckland" ||
			lowerWord === "nz"
		) {
			return "#000000" // black
		}
		// Blue words: "Design" (first one at index 1), "for", "based", "in"
		if (
			(lowerWord === "design" && index === 1) ||
			lowerWord === "for" ||
			lowerWord === "based" ||
			lowerWord === "in"
		) {
			return "#5D50EB" // blue
		}
		return "#000000" // default black
	}

	return (
		<section
			ref={heroRef}
			className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-white py-20"
		>
			{/* Trusted by founders section */}
			{trustedBy &&
				trustedBy.profiles &&
				trustedBy.profiles.length > 0 && (
					<motion.div
						className="relative z-20 mb-8 flex flex-col items-center"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.6,
							delay: 0.2,
						}}
					>
						<div className="flex items-center gap-2 mb-2">
							{trustedBy.profiles
								.slice(0, 3)
								.map(
									(
										profile,
										index
									) => (
										<motion.div
											key={
												index
											}
											className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-gray-200 -ml-2 first:ml-0"
											initial={{
												opacity: 0,
												scale: 0,
											}}
											animate={{
												opacity: 1,
												scale: 1,
											}}
											transition={{
												duration: 0.4,
												delay:
													0.3 +
													index *
														0.1,
											}}
										>
											<Image
												src={
													profile
												}
												alt=""
												fill
												className="object-cover"
											/>
										</motion.div>
									)
								)}
						</div>
						<p className="text-sm text-gray-600 font-medium">
							{trustedBy.text}
						</p>
					</motion.div>
				)}

			{/* Hero content */}
			<motion.div
				className="relative z-20 max-w-5xl mx-auto px-6 text-center"
				style={{
					opacity: textOpacity,
					scale: textScale,
					y: textY,
				}}
			>
				<h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight text-balance text-center font-cal-sans tracking-wide">
					{headingParts.map((word, index) => {
						const color = getWordColor(
							word,
							index
						)
						return (
							<span
								key={index}
								style={{
									color,
								}}
							>
								{renderWord(
									word,
									index,
									color
								)}
							</span>
						)
					})}
				</h1>

				<p className="mt-8 text-base md:text-lg lg:text-xl leading-relaxed text-pretty max-w-3xl mx-auto text-gray-600 text-center">
					{renderAnimatedText({
						text: subheading,
						baseDelay: 1.5,
						delayIncrement: 0.02,
						duration: 0.5,
						yOffset: 30,
						keyPrefix: "subheading",
					})}
				</p>

				{/* CTA Button */}
				<motion.div
					className="mt-12 flex justify-center"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.6,
						delay: 2.5,
						ease: [0.25, 0.1, 0.25, 1],
					}}
				>
					<CustomButton
						text={buttonText}
						href={buttonLink}
						textColor="white"
						borderColor="white"
						iconBG="white"
						iconColor="#5D50EB"
					/>
				</motion.div>
			</motion.div>

			{/* Bottom shadow divider */}
			<div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>
		</section>
	)
}
