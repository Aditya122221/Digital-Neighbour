"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { CustomButton } from "@/components/core/button"

interface Service {
	id: string
	name: string
	title: string
	description: string
	image: string
	link?: string
}

interface DataAnalyticsServicesProps {
	data?: string
	serviceCards?: Service[]
	basePath?: string
	premiumCloudServices?: any
}

// Generic fallback services if no serviceCards provided
const defaultServices: Service[] = [
	{
		id: "real-time-insights",
		name: "Real-Time Insights",
		title: "Real-Time Insights",
		description:
			"Access real-time data insights and analytics that enable immediate decision-making and responsive business operations.",
		image: "/homepage/services/automation.mp4",
	},
	{
		id: "seamless-integration",
		name: "Seamless Integration",
		title: "Seamless Integration",
		description:
			"Easily integrate analytics solutions into your existing systems with our robust APIs and comprehensive integration support.",
		image: "/homepage/services/automation.mp4",
	},
	{
		id: "custom-dashboards",
		name: "Custom Dashboards",
		title: "Custom Dashboards",
		description:
			"Build and deploy analytics dashboards tailored to your specific industry requirements and business objectives.",
		image: "/homepage/services/automation.mp4",
	},
	{
		id: "flexible-deployment",
		name: "Flexible Deployment",
		title: "Flexible Deployment",
		description:
			"Deploy analytics solutions on-premises, in the cloud, or in a hybrid environment based on your preferences.",
		image: "/homepage/services/automation.mp4",
	},
	{
		id: "multi-platform",
		name: "Multi-Platform",
		title: "Multi-Platform Support",
		description:
			"Seamless integration with popular platforms including AWS, Azure, Google Cloud, and your existing infrastructure.",
		image: "/homepage/services/automation.mp4",
	},
	{
		id: "data-optimization",
		name: "Data Optimization",
		title: "Data Optimization",
		description:
			"Optimize data processing and analytics performance to eliminate inefficiencies and maximize insights generation.",
		image: "/homepage/services/automation.mp4",
	},
]

export default function DataAnalyticsServices({
	data,
	serviceCards,
	basePath = "#",
	premiumCloudServices,
}: DataAnalyticsServicesProps) {
	const services = serviceCards || defaultServices
	const [activeTab, setActiveTab] = useState(services[0]?.id || "")

	const activeService = services.find(
		(service) => service.id === activeTab
	)
	const activeIndex = services.findIndex(
		(service) => service.id === activeTab
	)

	return (
		<section className="py-20 px-6 bg-gradient-to-b from-pink/20 to-white">
			<div className="container max-w-7xl mx-auto">
				{/* Main Layout: Left (tabs), Middle (image), Right (content) */}
				{activeService && (
					<motion.div
						key={activeTab}
						className="grid grid-cols-1 lg:grid-cols-12"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{
							opacity: 1,
							y: 0,
						}}
						viewport={{ once: true }}
						transition={{
							duration: 0.6,
							ease: "easeOut",
						}}
					>
						{/* Left - Vertical Buttons matching design */}
						<div className="lg:col-span-4">
							<div className="bg-black p-6 md:p-8 lg:p-10 h-full overflow-hidden" style={{borderTopLeftRadius: "54px", borderBottomLeftRadius: "54px"}}>
								<div className="flex flex-col gap-6 md:gap-7">
									{services.map(
										(
											service
										) => {
											const isActive =
												activeTab ===
												service.id
											return (
												<button
													key={
														service.id
													}
													onClick={() =>
														setActiveTab(
															service.id
														)
													}
													className={`w-full text-left rounded-[64px] transition-all duration-300 font-medium ${
														isActive
															? "px-8 py-8 md:py-10 text-xl md:text-2xl bg-yellow text-black shadow-xl"
															: "px-2 md:px-3 py-3 md:py-4 text-white/95 hover:text-white"
													}`}
												>
													{
														service.name
													}
												</button>
											)
										}
									)}
								</div>
							</div>
						</div>

						{/* Right - Details and Image */}
						<div className="lg:col-span-8">
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#f7f7fa]" style={{padding: "25px", borderRadius: "54px"}}>
								{/* Details */}
								<div className="space-y-6">
									<motion.h2
										className="text-3xl md:text-4xl lg:text-5xl font-light text-blackbrown font-cal-sans"
										initial={{
											opacity: 0,
											y: 20,
										}}
										animate={{
											opacity: 1,
											y: 0,
										}}
										transition={{
											duration: 0.5,
											ease: "easeOut",
										}}
									>
										{
											activeService.title
										}
									</motion.h2>
									<p className="text-lg md:text-xl text-blackbrown/80 leading-relaxed">
										{
											activeService.description
										}
									</p>
									<CustomButton
										text="Learn More"
										href={
											activeService.link ||
											basePath
										}
										textColor="black"
										borderColor="black"
									/>
								</div>

								{/* Image */}
								<div>
									<div className="relative w-full h-[300px] md:h-[420px] rounded-[32px] overflow-hidden bg-black flex items-center justify-center">
										<Image
											src={
												activeService.image
											}
											alt={
												activeService.title
											}
											fill
											className="object-contain p-6"
										/>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</div>
		</section>
	)
}
