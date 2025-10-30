"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import seoData from "@/data/seo.json"
import paidAdsData from "@/data/paid-ads.json"
import socialMediaData from "@/data/social-media.json"
import contentMarketingData from "@/data/content-marketing.json"
import webDevelopmentData from "@/data/web-development.json"

// Types for the data structure
interface OtherServicesData {
	services: string[]
	slugMapping: Record<string, string>
	config: {
		title: string
		highlightedText: string
		columns: number
		baseUrl: string
	}
}

// Function to convert service name to slug using dynamic data
const serviceToSlug = (
	service: string,
	slugMapping: Record<string, string>
): string => {
	return (
		slugMapping[service] ||
		service
			.toLowerCase()
			.replace(/\s+/g, "-")
			.replace(/[^a-z0-9-]/g, "")
	)
}

// Function to divide services into equal columns dynamically
const divideIntoColumns = (
	services: string[],
	columnCount: number
): string[][] => {
	const columns: string[][] = []
	const itemsPerColumn = Math.ceil(services.length / columnCount)

	for (let i = 0; i < columnCount; i++) {
		const start = i * itemsPerColumn
		const end = start + itemsPerColumn
		columns.push(services.slice(start, end))
	}

	return columns
}

export default function OtherServices() {
	const pathname = usePathname()

	// Determine which data to use based on the current path
	let data: OtherServicesData

	if (pathname.startsWith("/paid-advertisement")) {
		// Use paid ads data
		data = {
			services: paidAdsData.otherServices.paidAdsServices,
			slugMapping: paidAdsData.otherServices.slugMapping,
			config: paidAdsData.otherServices.config,
		}
	} else if (pathname.startsWith("/social-media-marketing")) {
		// Use social media data
		data = {
			services: (socialMediaData as any).otherServices
				.socialMediaServices,
			slugMapping: (socialMediaData as any).otherServices
				.slugMapping,
			config: (socialMediaData as any).otherServices.config,
		}
	} else if (pathname.startsWith("/content-marketing")) {
		// Use content marketing data
		data = {
			services: (contentMarketingData as any).otherServices
				.contentMarketingServices,
			slugMapping: (contentMarketingData as any).otherServices
				.slugMapping,
			config: (contentMarketingData as any).otherServices
				.config,
		}
	} else if (pathname.startsWith("/web-development")) {
		// Use web development data
		data = {
			services: webDevelopmentData.otherServices
				.webdevelopmentServices,
			slugMapping:
				webDevelopmentData.otherServices.slugMapping,
			config: webDevelopmentData.otherServices.config,
		}
	} else {
		// Default to SEO data (for /seo routes)
		data = {
			services: seoData.otherServices.seoServices,
			slugMapping: seoData.otherServices.slugMapping,
			config: seoData.otherServices.config,
		}
	}

	const { services, slugMapping, config } = data

	// Dynamically divide services into columns
	const serviceColumns = divideIntoColumns(services, config.columns)

	return (
		<section className="py-20 px-6 bg-gradient-to-b from-pink/20 to-white">
			<div className="container max-w-7xl mx-auto">
				{/* Heading */}
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{
						once: true,
						margin: "-100px",
					}}
					transition={{
						duration: 0.6,
						ease: "easeOut",
					}}
					className="text-center text-3xl md:text-6xl font-regular text-blackbrown font-cal-sans tracking-wide mb-12"
				>
					{
						config.title.split(
							config.highlightedText
						)[0]
					}
					<span className="relative inline-block">
						<span className="absolute bottom-1 left-0 right-0 h-2/4 bg-yellow"></span>
						<span className="relative z-10 font-medium italic">
							{config.highlightedText}
						</span>
					</span>
				</motion.h2>

				<div
					className={`grid grid-cols-1 md:grid-cols-2 ${
						config.columns === 3
							? "lg:grid-cols-3"
							: config.columns === 4
							? "lg:grid-cols-4"
							: "lg:grid-cols-2"
					} gap-10`}
				>
					{serviceColumns.map(
						(column, columnIndex) => (
							<motion.div
								key={
									columnIndex
								}
								initial={{
									opacity: 0,
									y: 20,
								}}
								whileInView={{
									opacity: 1,
									y: 0,
								}}
								viewport={{
									once: true,
									margin: "-100px",
								}}
								transition={{
									duration: 0.6,
									delay:
										columnIndex *
										0.1,
									ease: "easeOut",
								}}
								className="space-y-4"
							>
								<ul className="space-y-3">
									{column.map(
										(
											service
										) => (
											<li
												key={
													service
												}
												className="flex items-center gap-3 text-blackbrown/90"
											>
												<span className="w-2 h-2 rounded-full bg-yellow inline-block flex-shrink-0" />
												<Link
													href={`${
														config.baseUrl
													}${serviceToSlug(
														service,
														slugMapping
													)}`}
													className="text-lg hover:text-yellow transition-colors duration-200"
												>
													{
														service
													}
												</Link>
											</li>
										)
									)}
								</ul>
							</motion.div>
						)
					)}
				</div>
			</div>
		</section>
	)
}
