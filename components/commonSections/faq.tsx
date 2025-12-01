"use client"

import { motion } from "framer-motion"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"

interface FaqItem {
	q: string
	a: string
}

interface FaqProps {
	data?: {
		serviceName?: string
		tagline?: string
		faqs?: FaqItem[]
	}
}

const defaultFaqs: FaqItem[] = [
	{
		q: "What's an SEO audit?",
		a: "An SEO audit is a crucial step in our methodology. Our team conducts a comprehensive review of your entire SEO setup—both on and off‑site—to develop a deep understanding of your current strategy. We evaluate metadata, backlinks, content, technical setup, and keywords, then use those findings to develop a robust plan that increases rankings and drives more traffic to your website.",
	},
	{
		q: "How long does SEO take?",
		a: "SEO is compounding. Most businesses begin to see material gains within 3–6 months, with momentum accelerating as high‑quality content and links compound.",
	},
	{
		q: "What are SEO keywords?",
		a: "Keywords are the phrases your customers type into search engines. We use research to prioritise high‑intent, achievable keywords and map them to pages and content.",
	},
	{
		q: "What are SEO backlinks?",
		a: "Backlinks are links from other websites to yours. Authoritative, relevant links act as votes of confidence and can significantly improve rankings when earned naturally.",
	},
	{
		q: "What SEO tools do you use?",
		a: "We use a modern tool stack including Google Search Console, GA4, Ahrefs, Screaming Frog, and programmatic dashboards for reporting and QA.",
	},
	{
		q: "How much does SEO cost?",
		a: "Pricing depends on scope, competitiveness, and speed required. After an audit we provide a clear roadmap and fixed monthly investment options.",
	},
	{
		q: "What is local SEO?",
		a: "Local SEO helps you show up for searches in your area (e.g., 'dentist near me'). It focuses on Google Business Profiles, reviews, citations, and location‑targeted pages.",
	},
]

export default function Faq({ data }: FaqProps) {
	const faqs = data?.faqs || defaultFaqs
	const serviceName = data?.serviceName || "SEO"
	const tagline =
		data?.tagline ||
		"A quick intro to a complex, ever‑changing topic."
	
	// Determine font size based on service name length
	const getServiceNameSize = (name: string) => {
		const length = name.length
		if (length > 30) {
			return "text-3xl md:text-4xl lg:text-5xl"
		} else if (length > 20) {
			return "text-3xl md:text-5xl lg:text-6xl"
		}
		return "text-4xl md:text-6xl"
	}

	return (
		<section className="py-20 px-6 bg-white" style={{overflowX: "hidden"}}>
			<div className="container max-w-7xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
					{/* Left column */}
					<motion.div
						initial={{ opacity: 0, x: -40 }}
						whileInView={{
							opacity: 1,
							x: 0,
						}}
						viewport={{
							once: true,
							margin: "-100px",
						}}
						transition={{
							duration: 0.7,
							ease: "easeOut",
						}}
						className="space-y-6"
					>
						<h2 className="text-4xl md:text-6xl font-regular text-blackbrown font-cal-sans leading-tight">
							Learn more about{" "}
							<span className={`relative inline-block ${getServiceNameSize(serviceName)}`}>
								<span className="absolute bottom-1 left-0 right-0 h-[45%] bg-yellow -z-0 -skew-x-12"></span>
								<span className="relative z-10 font-medium italic break-words inline-block">
									{serviceName}.
								</span>
							</span>
						</h2>
						<p className="text-lg text-blackbrown/80 max-w-xl">
							{tagline}
						</p>
					</motion.div>

					{/* Right column - FAQ */}
					<motion.div
						initial={{ opacity: 0, x: 40 }}
						whileInView={{
							opacity: 1,
							x: 0,
						}}
						viewport={{
							once: true,
							margin: "-100px",
						}}
						transition={{
							duration: 0.7,
							ease: "easeOut",
							delay: 0.15,
						}}
					>
						<Accordion
							type="single"
							collapsible
							className="w-full divide-y divide-black/10"
						>
							{faqs.map(
								(item, idx) => (
									<AccordionItem
										key={
											idx
										}
										value={`item-${idx}`}
										className="py-4"
									>
										<AccordionTrigger className="text-left text-xl md:text-2xl font-semibold text-blackbrown hover:no-underline">
											{
												item.q
											}
										</AccordionTrigger>
										<AccordionContent className="text-blackbrown/80 text-base md:text-lg leading-relaxed">
											{
												item.a
											}
										</AccordionContent>
									</AccordionItem>
								)
							)}
						</Accordion>
					</motion.div>
				</div>
			</div>
		</section>
	)
}

