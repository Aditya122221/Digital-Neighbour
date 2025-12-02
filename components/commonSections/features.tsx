"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { urlForImage } from "@/sanity/lib/image"

interface Feature {
	title: string
	description: string
	// Optional icon - can be emoji/text string, URL string, or Sanity image object
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	icon?: string | any
	// Optional uploaded icon image (Sanity image object or URL string) - for backward compatibility
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	image?: any
}

interface FeaturesProps {
	data?: {
		heading?: string
		highlightWord?: string
		subheading?: string
		features?: Feature[]
	}
}

const defaultIcons = ["🤖", "⚡", "🧠", "📊", "🔄"]

// Helper to safely resolve an image URL from icon or image field
// Handles: URL strings, Sanity image objects, emoji/text strings
const getFeatureImageSrc = (feature: Feature): string | undefined => {
	// First, check if icon is a URL string (from transformed data)
	if (feature.icon && typeof feature.icon === "string") {
		// Check if it's a URL (starts with http/https)
		if (
			feature.icon.startsWith("http://") ||
			feature.icon.startsWith("https://")
		) {
			return feature.icon
		}
		// Otherwise, it's likely an emoji/text icon, skip it
	}

	// Check if icon is a Sanity image object
	if (feature.icon && typeof feature.icon === "object") {
		try {
			// Check if it looks like a Sanity image object
			if (
				feature.icon._type === "image" ||
				feature.icon.asset ||
				(feature.icon.asset?.url)
			) {
				return urlForImage(feature.icon).url()
			}
		} catch (error) {
			console.warn("Failed to resolve icon image URL:", error)
		}
	}

	// Fallback: check image field (for backward compatibility)
	if (feature.image) {
		if (typeof feature.image === "string") {
			return feature.image
		}

		if (typeof feature.image === "object") {
			try {
				// Check if it looks like a Sanity image object
				if (
					feature.image._type === "image" ||
					feature.image.asset ||
					(feature.image.asset?.url)
				) {
					return urlForImage(feature.image).url()
				}
				// Fallback to direct URL if available
				if (feature.image.asset?.url) {
					return feature.image.asset.url
				}
			} catch (error) {
				console.warn("Failed to resolve image URL:", error)
			}
		}
	}

	return undefined
}

// Helper to check if icon is an emoji/text (not an image)
const isEmojiOrTextIcon = (icon: Feature["icon"]): boolean => {
	if (!icon) return false
	if (typeof icon === "string") {
		// If it's a URL, it's not an emoji
		if (
			icon.startsWith("http://") ||
			icon.startsWith("https://")
		) {
			return false
		}
		// Otherwise, treat as emoji/text
		return true
	}
	// If it's an object, it's not an emoji
	return false
}

export default function Features({ data }: FeaturesProps) {
	const fallbackFeatures: Feature[] = [
		{
			title: "Intelligent Automation",
			description:
				"Streamline your business processes with AI-powered automation that learns and adapts to your workflow, reducing manual effort and increasing efficiency.",
		},
		{
			title: "Advanced Machine Learning",
			description:
				"Leverage cutting-edge machine learning models to extract insights, predict trends, and make data-driven decisions that drive business growth.",
		},
		{
			title: "Seamless Integration",
			description:
				"Easily integrate AI solutions into your existing systems with robust APIs and comprehensive integration support across all major platforms.",
		},
		{
			title: "Scalable Solutions",
			description:
				"Scale your AI infrastructure seamlessly as your business grows, handling increased workloads without compromising performance or reliability.",
		},
		{
			title: "Custom AI Development",
			description:
				"Build tailored AI models and automation workflows designed specifically for your industry and business requirements with expert guidance.",
		},
	]

	const features =
		data?.features && data.features.length > 0
			? data.features
			: fallbackFeatures

	return (
		<section className="relative py-16 md:py-24 lg:py-32">
			{/* Background with image */}
			<div
				className="absolute inset-0 md:rounded-tl-[10%] md:rounded-tr-[10%]"
				style={{
					backgroundColor: "#5D50EB",
					backgroundImage: `url('/bullets-bg.png')`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
				}}
			/>

			{/* Content */}
			<div className="relative z-10 container mx-auto px-6 lg:px-12">
				{/* Main Title */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{
						duration: 0.8,
						ease: "easeOut",
					}}
					className="text-center mb-16 md:mb-20"
				>
					{data?.heading && (
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight font-cal-sans mb-4 text-black">
							{(() => {
								const heading = data.heading
								const highlightWord = data.highlightWord

								if (!highlightWord) {
									return heading
								}

								const lowerHeading = heading.toLowerCase()
								const lowerHighlight = highlightWord.toLowerCase()
								const highlightIndex = lowerHeading.indexOf(
									lowerHighlight
								)

								if (highlightIndex === -1) {
									return heading
								}

								const before = heading.slice(0, highlightIndex)
								const highlighted = heading.slice(
									highlightIndex,
									highlightIndex + highlightWord.length
								)
								const after = heading.slice(
									highlightIndex + highlightWord.length
								)

								return (
									<>
										{before}
										<span className="relative inline-block">
											<span className="absolute bottom-1 left-0 right-0 h-2/4 bg-yellow -skew-x-12"></span>
											<span className="relative z-10 font-medium italic">
												{highlighted}
											</span>
										</span>
										{after}
									</>
								)
							})()}
						</h2>
					)}
					{data?.subheading && (
						<p
							className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto"
							style={{
								color: "white",
							}}
						>
							{data.subheading}
						</p>
					)}
				</motion.div>

				{/* Feature Blocks */}
				<div className="space-y-12 md:space-y-16">
					{/* Top Row - 3 blocks */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
						{features
							.slice(0, 3)
							.map(
								(
									feature,
									index
								) => (
									<motion.div
										key={
											index
										}
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
										className="flex flex-col items-center text-center space-y-4"
									>
										{/* Icon */}
										<div className="relative">
											<div className="w-20 h-20 rounded-full flex items-center justify-center bg-[#0e0e59] overflow-hidden">
												{(() => {
													const imageSrc = getFeatureImageSrc(feature)

													if (imageSrc) {
														return (
															<Image
																src={imageSrc}
																alt={feature.title}
																width={80}
																height={80}
																className="w-full h-full object-cover"
															/>
														)
													}

													// Check if icon is emoji/text
													if (isEmojiOrTextIcon(feature.icon)) {
														return (
															<span className="text-4xl">
																{feature.icon}
															</span>
														)
													}

													// Fallback to default emoji
													return (
														<span className="text-4xl">
															{
																defaultIcons[
																	index %
																		defaultIcons.length
																]
															}
														</span>
													)
												})()}
											</div>
										</div>

										{/* Content */}
										<div className="space-y-3 max-w-sm">
											<h3 className="font-semibold text-xl leading-tight text-black">
												{
													feature.title
												}
											</h3>
											<p className="text-white text-base leading-relaxed">
												{
													feature.description
												}
											</p>
										</div>
									</motion.div>
								)
							)}
					</div>

					{/* Bottom Row - 2 blocks centered */}
					<div className="flex justify-center">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl">
							{features
								.slice(3, 5)
								.map(
									(
										feature,
										index
									) => (
										<motion.div
											key={
												index +
												3
											}
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
													(index +
														3) *
													0.1,
											}}
											className="flex flex-col items-center text-center space-y-4"
										>
											{/* Icon */}
											<div className="relative">
												<div className="w-20 h-20 rounded-full flex items-center justify-center bg-[#0e0e59] overflow-hidden">
													{(() => {
														const imageSrc = getFeatureImageSrc(feature)

														if (imageSrc) {
															return (
																<Image
																	src={imageSrc}
																	alt={feature.title}
																	width={80}
																	height={80}
																	className="w-full h-full object-cover"
																/>
															)
														}

														// Check if icon is emoji/text
														if (isEmojiOrTextIcon(feature.icon)) {
															return (
																<span className="text-4xl">
																	{feature.icon}
																</span>
															)
														}

														// Fallback to default emoji
														return (
															<span className="text-4xl">
																{
																	defaultIcons[
																		(index + 3) %
																			defaultIcons.length
																	]
																}
															</span>
														)
													})()}
												</div>
											</div>

											{/* Content */}
											<div className="space-y-3 max-w-sm">
												<h3 className="font-semibold text-xl leading-tight text-black">
													{
														feature.title
													}
												</h3>
												<p className="text-white text-base leading-relaxed">
													{
														feature.description
													}
												</p>
											</div>
										</motion.div>
									)
								)}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
