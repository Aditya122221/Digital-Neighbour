"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface ContentData {
	heading?: string
	text1?: string
	text2?: string
	text3?: string
	image?:
		| string
		| {
				url?: string
				asset?: { url?: string }
				// Allow any extra Sanity fields without being strict here
				[key: string]: unknown
		  }
	alt?: string
}

interface ContentProps {
	data?: ContentData
	imagePathPrefix?: string
}

export default function Content({ data, imagePathPrefix = "/seo/content" }: ContentProps) {
	// Determine the image source: handle strings and Sanity image objects safely
	const getImageSrc = () => {
		const fallback = `${imagePathPrefix}/seo.png`

		if (!data?.image) {
			return fallback
		}

		// If image is a string (local path or full URL)
		if (typeof data.image === "string") {
			const image = data.image

			// Full URL (e.g. Sanity CDN)
			if (image.startsWith("http://") || image.startsWith("https://")) {
				return image
			}

			// Already a rooted path
			if (image.startsWith("/")) {
				return image
			}

			// Otherwise, prepend the path prefix
			return `${imagePathPrefix}/${image}`
		}

		// If image is a Sanity-style object, try to resolve URL
		if (typeof data.image === "object" && data.image !== null) {
			const maybeUrl =
				(data.image as any).url || (data.image as any).asset?.url

			if (typeof maybeUrl === "string" && maybeUrl.length > 0) {
				return maybeUrl
			}
		}

		return fallback
	}

	return (
		<section className="py-20 px-6 bg-gradient-to-b from-pink/20 to-white" style={{ overflowX: "hidden" }}>
			<div className="container max-w-7xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Left side - Image */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{
							opacity: 1,
							x: 0,
						}}
						viewport={{ once: true }}
						transition={{
							duration: 0.8,
							ease: "easeOut",
						}}
						className="relative w-full h-[400px] md:h-[500px]"
					>
						<Image
							src={getImageSrc()}
							alt={data?.alt || "Marketing illustration"}
							fill
							className="object-contain"
						/>
					</motion.div>

					{/* Right side - Text content */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{
							opacity: 1,
							x: 0,
						}}
						viewport={{ once: true }}
						transition={{
							duration: 0.8,
							ease: "easeOut",
							delay: 0.2,
						}}
						className="space-y-6"
					>
						<h2 className="text-4xl md:text-5xl font-semibold text-blackbrown leading-tight">
							{data?.heading || "Helping you stay competitive."}
						</h2>
						<p className="text-lg text-gray-700 leading-relaxed">
							{data?.text1 ||
								"This requires a very different approach than what you'd find in global SEO campaigns. The key point to remember is this:"}
						</p>
						<p className="text-lg text-gray-700 leading-relaxed">
							{data?.text2 ||
								"You don't need hundreds of people from New York or London admiring your mouth-watering burger website and wishing they could visit New Zealand someday. You need to be found by people in NZ – people who are hungry, who want a quick bite near their tennis club, or who are looking for the perfect birthday venue."}
						</p>
						<p className="text-lg text-gray-700 leading-relaxed">
							{data?.text3 ||
								"The same is true no matter what type of local business you run. Dental clinics, accounting firms, flower shops, and cafés all rely on the same SEO techniques to stay competitive and attract new customers."}
						</p>
					</motion.div>
				</div>
			</div>
		</section>
	)
}

