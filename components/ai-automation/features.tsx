"use client"

import { motion } from "framer-motion"

interface Feature {
	title: string
	description: string
	icon?: string
}

interface FeaturesProps {
	data?: {
		heading?: string
		subheading?: string
		features?: Feature[]
	}
}

const defaultIcons = ["🤖", "⚡", "🧠", "📊", "🔄"]

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

	const features = data?.features && data.features.length > 0 ? data.features : fallbackFeatures

	return (
		<section className="relative py-16 md:py-24 lg:py-32">
			{/* Background with image */}
			<div
				className="absolute inset-0"
				style={{
					backgroundColor: "#1a1a1a",
					backgroundImage: `url('/bullets-bg.png')`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					borderTopLeftRadius: "10%",
					borderTopRightRadius: "10%",
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
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight font-cal-sans mb-4">
							<span style={{ color: "white" }}>
								{data.heading}
							</span>
						</h2>
					)}
					{data?.subheading && (
						<p className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto" style={{ color: "white" }}>
							{data.subheading}
						</p>
					)}
				</motion.div>

				{/* Feature Blocks */}
				<div className="space-y-12 md:space-y-16">
					{/* Top Row - 3 blocks */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
						{features.slice(0, 3).map((feature, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{
									duration: 0.6,
									ease: "easeOut",
									delay: index * 0.1,
								}}
								className="flex flex-col items-center text-center space-y-4"
							>
								{/* Icon */}
								<div className="relative">
									<div
										className="w-20 h-20 rounded-full border-2 flex items-center justify-center"
										style={{
											borderColor: "#ffe031",
											backgroundColor: "rgba(255, 224, 49, 0.1)",
										}}
									>
										<span className="text-4xl">
											{feature.icon ? (
												feature.icon
											) : (
												defaultIcons[index % defaultIcons.length]
											)}
										</span>
									</div>
								</div>

								{/* Content */}
								<div className="space-y-3 max-w-sm">
									<h3
										className="font-semibold text-xl leading-tight"
										style={{ color: "#ffe031" }}
									>
										{feature.title}
									</h3>
									<p
										className="text-white text-base leading-relaxed"
									>
										{feature.description}
									</p>
								</div>
							</motion.div>
						))}
					</div>

					{/* Bottom Row - 2 blocks centered */}
					<div className="flex justify-center">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl">
							{features.slice(3, 5).map((feature, index) => (
								<motion.div
									key={index + 3}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{
										duration: 0.6,
										ease: "easeOut",
										delay: (index + 3) * 0.1,
									}}
									className="flex flex-col items-center text-center space-y-4"
								>
									{/* Icon */}
									<div className="relative">
										<div
											className="w-20 h-20 rounded-full border-2 flex items-center justify-center"
											style={{
												borderColor: "#ffe031",
												backgroundColor: "rgba(255, 224, 49, 0.1)",
											}}
										>
											<span className="text-4xl">
												{feature.icon ? (
													feature.icon
												) : (
													defaultIcons[(index + 3) % defaultIcons.length]
												)}
											</span>
										</div>
									</div>

									{/* Content */}
									<div className="space-y-3 max-w-sm">
										<h3
											className="font-semibold text-xl leading-tight"
											style={{ color: "#ffe031" }}
										>
											{feature.title}
										</h3>
										<p
											className="text-white text-base leading-relaxed"
										>
											{feature.description}
										</p>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

