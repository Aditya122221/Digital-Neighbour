"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import industriesData from "@/data/industries.json"

type IndustryBrowserItem = {
	label: string
	slug: string
	image: string
}

const AVAILABLE_IMAGE_SLUGS = new Set([
	"electrical",
	"hvac",
	"pest-control",
	"plumbing",
	"landscaping",
	"roofing",
])

const FALLBACK_IMAGES = [
	"/industry/electrical.webp",
	"/industry/hvac.webp",
	"/industry/pestcontrol.webp",
	"/industry/plumber.webp",
	"/industry/landscaping.webp",
	"/industry/roofing.webp",
]

function hashString(value: string): number {
	let h = 0
	for (let i = 0; i < value.length; i++) {
		h = (h * 31 + value.charCodeAt(i)) >>> 0
	}
	return h
}

function resolveImageForSlug(slug: string): string {
	if (AVAILABLE_IMAGE_SLUGS.has(slug))
		return `/industry/${slug
			.replace("plumbing", "plumber")
			.replace("pest-control", "pestcontrol")}.webp`
	const idx = hashString(slug) % FALLBACK_IMAGES.length
	return FALLBACK_IMAGES[idx]
}

function getIconForSlug(slug: string): string {
	if (slug.includes("electrical")) return "⚡"
	if (slug.includes("hvac")) return "❄️"
	if (slug.includes("pest")) return "🐞"
	if (slug.includes("plumb")) return "🔧"
	if (slug.includes("landscap")) return "🌿"
	if (slug.includes("roof")) return "🏠"
	return "🧰"
}

export default function IndustryBrowserSection() {
	const other = (industriesData as any).otherServices

	const items: IndustryBrowserItem[] = useMemo(() => {
		const list: string[] = other?.industriesServices || []
		const slugMap: Record<string, string> = other?.slugMapping || {}
		return list.map((label: string) => {
			const slug =
				slugMap[label] ||
				label
					.toLowerCase()
					.replace(/\s+/g, "-")
					.replace(/[^a-z0-9-]/g, "")
			return {
				label,
				slug,
				image: resolveImageForSlug(slug),
			}
		})
	}, [other])

	const [activeIndex, setActiveIndex] = useState(0)
	const active = items[activeIndex]

	return (
		<section className="w-full bg-gradient-to-b from-white to-[#F5F8FF] py-16">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-10">
					<p className="text-center text-xs font-semibold tracking-[0.3em] text-black">
						OUR INDUSTRIES
					</p>
					<h2 className="mt-3 text-center text-4xl md:text-5xl lg:text-6xl font-cal-sans font-regular leading-tight text-blackbrown">
						We&apos;re proud to serve the{" "}
						<span className="relative inline-block">
							<span className="absolute bottom-1 left-0 right-0 h-2/4 bg-yellow"></span>
							<span className="relative z-10 font-medium italic">
								home services
							</span>
						</span>{" "}
						industry
					</h2>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
					{/* Left: scrollable list */}
					<div className="order-2 -mx-2 md:order-1 md:mx-0">
						<div className="h-[520px] overflow-y-auto rounded-3xl bg-white p-2 shadow-sm ring-1 ring-black/5">
							<ul className="space-y-3">
								{items.map(
									(
										item,
										index
									) => (
										<li
											key={
												item.slug
											}
										>
											<button
												type="button"
												onClick={() =>
													setActiveIndex(
														index
													)
												}
												className={`flex w-full items-center justify-between rounded-2xl px-4 py-5 text-left transition-all ${
													index ===
													activeIndex
														? "bg-yellow/30 ring-1 ring-yellow/60"
														: "bg-gray-50 hover:bg-gray-100"
												}`}
											>
												<div className="flex items-center gap-3">
													<span
														className={`inline-flex h-9 w-9 items-center justify-center rounded-xl text-lg ${
															index ===
															activeIndex
																? "bg-yellow text-black"
																: "bg-yellow/40 text-black"
														}`}
													>
														{getIconForSlug(
															item.slug
														)}
													</span>
													<span className="text-base font-semibold text-gray-900">
														{
															item.label
														}
													</span>
												</div>
												{/* removed right meta */}
											</button>
										</li>
									)
								)}
							</ul>
						</div>
					</div>

					{/* Right: active image */}
					<div className="order-1 md:order-2">
						<div className="relative h-[520px] overflow-hidden rounded-3xl">
							<Image
								src={
									active?.image ||
									"/placeholder.jpg"
								}
								alt={
									active?.label ||
									"Industry image"
								}
								fill
								className="object-cover"
								sizes="(min-width: 1024px) 42rem, 100vw"
								priority
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
