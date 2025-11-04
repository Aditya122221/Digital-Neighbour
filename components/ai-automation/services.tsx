"use client"

import { useRef, useState } from "react"
import {
	motion,
	useScroll,
	useTransform,
	useMotionValueEvent,
} from "framer-motion"
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

interface AiAutomationServicesProps {
	data?: string
	serviceCards?: Service[]
	basePath?: string
	premiumCloudServices?: any
}

// Default services data based on screenshots
const defaultServices: Service[] = [
	{
		id: "ai-integrations",
		name: "AI Integrations & Business Process Automation",
		title: "AI Integrations & Business Process Automation",
		description:
			"Streamline complex business processes through real-time, event-driven AI integrations. Our engineering expertise encompasses Apache Kafka, Airflow, AWS Step Functions, and advanced microservices architecture. Automate workflows, increase business efficiency by up to 60%, and eliminate manual tasks through Robotic Process Automation (UiPath, Automation Anywhere).",
		image: "/seo/services/localkey.webp",
	},
	{
		id: "custom-ai-application",
		name: "Custom AI Application & Service Development",
		title: "Custom AI Application & Service Development",
		description:
			"Build scalable and secure AI-driven applications with cutting-edge technologies including Kubernetes, Docker, Python (FastAPI, PyTorch, TensorFlow), Node.js, React, and cloud-native deployments (AWS, Azure, GCP). Deliver customized AI services faster, reducing time-to-market by 40%.",
		image: "/seo/services/url.webp",
	},
	{
		id: "generative-ai-llm",
		name: "Generative AI & LLM Integration",
		title: "Generative AI & LLM Integration",
		description:
			"Integrate cutting-edge generative AI and LLM solutions (GPT-5, Claude-3, LLaMA) into your workflows to automate content creation, data extraction, and knowledge management processes, achieving operational efficiency improvements of up to 50%. Our expertise includes fine-tuning, RLHF, and implementing Retrieval-Augmented Generation (RAG).",
		image: "/seo/services/convseo.webp",
	},
	{
		id: "voice-multimodal",
		name: "Voice and Multimodal Interfaces",
		title: "Voice and Multimodal Interfaces",
		description:
			"Deploy powerful multimodal AI interfaces using advanced speech recognition (Whisper), TTS (Azure, ElevenLabs), NLP (GPT-5), and computer vision technologies. Improve customer engagement by up to 70% by offering seamless and intuitive interactions across voice, text, and visual channels, fully integrated into your existing platforms.",
		image: "/seo/services/secu.webp",
	},
]

export default function AiAutomationServices({
	data,
	serviceCards,
	basePath = "#",
	premiumCloudServices,
}: AiAutomationServicesProps) {
	const services = serviceCards || defaultServices
	const sectionRef = useRef<HTMLDivElement>(null)

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	})

	const [isSticky, setIsSticky] = useState(true)

	// Track scroll progress to remove sticky when all cards are visible
	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		// Remove sticky when we've scrolled past all cards (around 95% of scroll)
		if (latest >= 0.95) {
			setIsSticky(false)
		} else {
			setIsSticky(true)
		}
	})

	// Animation ranges for each card
	const ranges = [
		[0, 0.25],
		[0.25, 0.5],
		[0.5, 0.75],
		[0.75, 1.0],
	]

	const cardAnimations = ranges.map(([start, end], index) => ({
		y: useTransform(scrollYProgress, [start, end], ["100%", "0%"]),
		opacity: useTransform(
			scrollYProgress,
			[start + 0.05, end],
			[0, 1]
		),
	}))

	return (
		<section ref={sectionRef} className="py-20 px-6 bg-white">
			<div className="container max-w-7xl mx-auto">
				{/* Heading - sticky to stay visible */}
				<div
					className={`${
						isSticky
							? "sticky top-16 lg:top-20"
							: ""
					} z-40 w-full bg-white pb-8 pt-4 -mx-6`}
				>
					<div className="container max-w-7xl mx-auto px-6">
						<motion.h2
							className="text-4xl md:text-5xl lg:text-6xl font-regular text-blackbrown font-cal-sans text-center"
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
								duration: 0.8,
								ease: "easeOut",
							}}
						>
							Our{" "}
							<span className="relative inline-block">
								<span className="absolute bottom-1 left-0 right-0 h-2/4 bg-yellow"></span>
								<span className="relative z-10 font-medium italic">
									Services
								</span>
							</span>{" "}
							for{" "}
							{data ||
								"AI & Automation"}
						</motion.h2>
					</div>
				</div>

				{/* Cards stacked vertically */}
				<div className="relative min-h-[400vh]">
					{services.map((service, index) => {
						const isEven = index % 2 === 0
						const anim =
							cardAnimations[index]

						return (
							<motion.div
								key={service.id}
								style={{
									y: anim.y,
									opacity: anim.opacity,
								}}
								className="sticky top-40 lg:top-48 bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden"
							>
								<div
									className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${
										isEven
											? ""
											: "lg:grid-flow-dense"
									}`}
								>
									{/* Image */}
									<div
										className={`relative w-full h-[400px] md:h-[500px] lg:h-[600px] ${
											isEven
												? "lg:order-1"
												: "lg:order-2"
										}`}
									>
										<Image
											src={
												service.image
											}
											alt={
												service.title
											}
											fill
											className="object-cover"
										/>
									</div>

									{/* Content */}
									<div
										className={`flex flex-col justify-center p-8 md:p-12 ${
											isEven
												? "lg:order-2"
												: "lg:order-1"
										}`}
									>
										<h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-blackbrown mb-4 font-cal-sans">
											{
												service.title
											}
										</h3>
										<p className="text-base md:text-lg text-gray-700 leading-relaxed">
											{
												service.description
											}
										</p>
									</div>
								</div>
							</motion.div>
						)
					})}
				</div>
			</div>
		</section>
	)
}
