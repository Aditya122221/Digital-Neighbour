"use client"

import React, { useState } from "react"

import type { LucideIcon } from "lucide-react"
import {
	Bot,
	BarChart3,
	Plus,
	Puzzle,
	RefreshCw,
	Rocket,
	Target,
} from "lucide-react"

type IconKey =
	| "rocket"
	| "target"
	| "barChart"
	| "refresh"
	| "puzzle"
	| "bot"

const ICON_MAP: Record<IconKey, LucideIcon> = {
	rocket: Rocket,
	target: Target,
	barChart: BarChart3,
	refresh: RefreshCw,
	puzzle: Puzzle,
	bot: Bot,
}

type RemotePrinciple = {
	title?: string
	description?: string
	// When coming from Sanity, icon will be an uploaded image.
	// When using defaults, we'll rely on iconKey.
	icon?: {
		url?: string
	}
	iconKey?: IconKey
}

const defaultPrinciples: RemotePrinciple[] = [
	{
		title: "We default to action",
		description:
			"You will never win by sitting still. Every day the incumbents of your industry are adding to their lead. We are focused on bringing simple, effective action to every recommendation we make.",
		iconKey: "rocket",
	},
	{
		title: "We focus on the biggest return for time spent",
		description:
			"We use the 80/20 principle to make sure we're focusing on the 20% of actions that will yield 80% of your results, so we can have the greatest impact in the least amount of time.",
		iconKey: "target",
	},
	{
		title: "We use data-led strategy",
		description:
			"We turn data into advantage - tracking, measuring, and optimising every channel so your marketing engine compounds results quarter after quarter.",
		iconKey: "barChart",
	},
	{
		title: "We reverse engineer what works",
		description:
			"We study market leaders, analyse past wins, and break down customer journeys to rebuild the plays that deliver predictable revenue growth.",
		iconKey: "refresh",
	},
	{
		title: "We fill in the gaps",
		description:
			"We plug into your team wherever you need leverage—from strategy and creative to operations—so momentum never stalls.",
		iconKey: "puzzle",
	},
	{
		title: "We use proprietary AI tools & processes",
		description:
			"We combine human expertise with our AI systems to accelerate insights, automate execution, and uncover opportunities your competitors miss.",
		iconKey: "bot",
	},
]

type MarketingHowFastProps = {
	data?: {
		heading?: string
		highlightWord?: string
		headline?: string
		principles?: RemotePrinciple[]
	}
}

export default function MarketingHowFast({ data }: MarketingHowFastProps) {
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

	const handleToggle = (index: number) => {
		setExpandedIndex((previous) =>
			previous === index ? null : index
		)
	}

	const headingText =
		data?.heading || "How are we so fast?"
	const highlightWord = data?.highlightWord

	const headlineCopy =
		data?.headline ||
		"We help our SaaS clients grow quickly using a combination of principles, proprietary AI technology, and our own proven playbook of our top rated strategies and tactics that take a typically slow process and expedite it."

	const items =
		data?.principles && data.principles.length > 0
			? data.principles
			: defaultPrinciples

	return (
		<section className="relative bg-white py-24">
			<div className="container mx-auto px-6 md:px-10 lg:px-16">
				<div className="mx-auto max-w-3xl text-center">
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-cal-sans font-semibold text-black mb-8">
						{(() => {
							if (
								highlightWord &&
								headingText.includes(
									highlightWord
								)
							) {
								const [before, after] =
									headingText.split(
										highlightWord
									)
								return (
									<>
										{before}
										<span className="relative inline-block">
											<span className="absolute bottom-1 left-0 right-0 h-2/4 bg-yellow -skew-x-12"></span>
											<span className="relative z-10">
												{
													highlightWord
												}
											</span>
										</span>
										{after}
									</>
								)
							}

							return (
								<span className="relative inline-block">
									<span className="absolute bottom-1 left-0 right-0 h-2/4 bg-yellow -skew-x-12"></span>
									<span className="relative z-10">
										{headingText}
									</span>
								</span>
							)
						})()}
					</h2>
					<p className="mt-8 text-base leading-relaxed text-black md:text-lg">
						{headlineCopy}
					</p>
				</div>
				<div className="mt-16 grid gap-6 md:grid-cols-2 items-start">
					{items.map((item, index) => {
						const isExpanded =
							expandedIndex === index

						// Prefer uploaded icon image; fall back to a Lucide icon if no image provided.
						const IconComponent =
							item.iconKey
								? ICON_MAP[
										item
											.iconKey
								  ]
								: null

						return (
							<div
								key={item.title}
								onClick={() =>
									handleToggle(
										index
									)
								}
								onKeyDown={(
									event
								) => {
									if (
										event.key ===
											"Enter" ||
										event.key ===
											" "
									) {
										event.preventDefault()
										handleToggle(
											index
										)
									}
								}}
								role="button"
								tabIndex={0}
								aria-expanded={
									isExpanded
								}
								className="group relative cursor-pointer overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/60"
								style={{
									cursor: "pointer",
								}}
							>
								<div className="absolute right-8 top-8 text-neutral-300 transition-transform duration-300 group-hover:text-neutral-700">
									<Plus
										className={`h-5 w-5 transition-transform duration-300 ${
											isExpanded
												? "rotate-45"
												: ""
										}`}
									/>
								</div>
								<div className="flex flex-col gap-6">
									<div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0e0e59] text-white overflow-hidden">
										{item.icon?.url ? (
											// eslint-disable-next-line @next/next/no-img-element
											<img
												src={item.icon.url}
												alt={item.title || "Principle icon"}
												className="h-6 w-6 object-contain"
											/>
										) : IconComponent ? (
											<IconComponent className="h-6 w-6" />
										) : null}
									</div>
									<div className="space-y-3">
										<h3 className="text-xl font-semibold text-black">
											{
												item.title
											}
										</h3>
										<div
											className={`grid transition-[grid-template-rows] duration-300 ease-out ${
												isExpanded
													? "grid-rows-[1fr]"
													: "grid-rows-[0fr]"
											}`}
										>
											<div className="overflow-hidden">
												<p className="pt-1 text-sm leading-relaxed text-black/80 md:text-base">
													{
														item.description
													}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}


