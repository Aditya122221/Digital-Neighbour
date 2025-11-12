"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

type IndustryItem = {
	name?: string
	slug?: string
	image?: string
}

interface MainHeroProps {
	data?: {
		heading?: string
		subheading?: string
		industries?: IndustryItem[]
	}
}

const FALLBACK_INDUSTRIES: Required<IndustryItem>[] = [
	{
		name: "Real Estate",
		slug: "real-estate-marketing-agency",
		image: "/industry/electrical.webp",
	},
	{
		name: "Law firm",
		slug: "law-firm-marketing-agency",
		image: "/industry/hvac.webp",
	},
	{
		name: "Accountant Marketing",
		slug: "accountant-marketing-agency",
		image: "/industry/pestcontrol.webp",
	},
	{
		name: "Financial Advisor",
		slug: "financial-advisor-marketing-agency",
		image: "/industry/plumber.webp",
	},
	{
		name: "Consulting firm",
		slug: "consulting-firm-marketing-agency",
		image: "/industry/landscaping.webp",
	},
	{
		name: "Coaches Marketing",
		slug: "coaches-marketing-agency",
		image: "/industry/roofing.webp",
	},
]

function slugify(value: string): string {
	return value
		.toLowerCase()
		.replace(/&/g, "and")
		.replace(/[^\w\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-")
}

function getIndustries(data?: IndustryItem[]): Required<IndustryItem>[] {
	if (!Array.isArray(data) || data.length === 0)
		return FALLBACK_INDUSTRIES
	return data.map((item, index) => {
		const fallback =
			FALLBACK_INDUSTRIES[index % FALLBACK_INDUSTRIES.length]
		const name = item.name?.trim() || fallback.name
		const slug = item.slug?.trim() || slugify(name)
		const image = item.image?.trim() || fallback.image
		return { name, slug, image }
	})
}

export default function MainHero({ data }: MainHeroProps) {
	const heading = data?.heading || "Home Services"
	const subheading = data?.subheading || "Choose your industry."
	const industries = getIndustries(data?.industries)

	return (
		<section
			className="relative isolate flex flex-col overflow-hidden bg-gradient-to-br from-black via-black to-yellow min-h-[640px] md:min-h-[760px]"
			style={{
				paddingTop: "100px",
				paddingLeft: "25px",
				paddingRight: "25px",
			}}
		>
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute inset-0" />
				<div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
				<div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 via-black/20 to-transparent" />
			</div>

			<div className="relative z-10 w-full">
				<div className="text-center text-white lg:hidden">
					<h1 className="text-4xl font-semibold tracking-tight drop-shadow-[0_12px_45px_rgba(59,130,246,0.35)] md:text-5xl font-cal-sans">
						<span className="bg-gradient-to-r from-[#B8C5FF] via-[#D5E3FF] to-[#88B4FF] bg-clip-text text-transparent">
							{heading}
						</span>
					</h1>
					<p className="mt-4 text-base text-white/85 md:mt-5 md:text-lg">
						{subheading}
					</p>
				</div>

				<div className="relative mt-8 lg:mt-0">
					<div className="grid grid-cols-1 gap-4 pb-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:flex lg:items-stretch lg:gap-6 lg:overflow-x-auto">
						{industries.map(
							(industry, index) => {
								return (
									<Link
										key={`${industry.slug}-${index}`}
										href={`/professionals-marketing-agency/${industry.slug}`}
										className={cn(
											"group relative flex h-full min-h-[240px] flex-1 cursor-pointer select-none overflow-hidden rounded-[24px] bg-neutral-900/40 ring-1 ring-white/10 transition duration-300 ease-out hover:ring-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06070F]",
											"sm:min-h-[260px] md:min-h-[320px] lg:min-h-[640px] lg:min-w-0 lg:flex-[1_1_0%]"
										)}
									>
										<Image
											src={
												industry.image
											}
											alt={
												industry.name
											}
											fill
											sizes="(min-width: 1280px) 14rem, (min-width: 768px) 30vw, 80vw"
											className="object-cover transition duration-500 group-hover:scale-105"
											priority={
												index <
												2
											}
											loading={
												index <
												2
													? "eager"
													: "lazy"
											}
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/0 opacity-90 transition duration-300 group-hover:opacity-80" />
										<div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-80" />
										<div className="absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/10 group-hover:ring-white/30" />
										<div className="absolute bottom-6 left-6 right-6 text-white">
											<p className="text-2xl font-semibold tracking-tight md:text-[1.65rem] lg:text-[1.75rem]">
												{
													industry.name
												}
											</p>
										</div>
									</Link>
								)
							}
						)}
					</div>

					<div className="pointer-events-none absolute inset-0 hidden items-center justify-center text-center lg:flex">
						<div className="px-4 sm:px-8">
							<h1 className="text-6xl font-semibold tracking-tight text-white drop-shadow-[0_12px_45px_rgba(59,130,246,0.35)] lg:text-7xl font-cal-sans">
								<span className="bg-gradient-to-r from-[#B8C5FF] via-[#D5E3FF] to-[#88B4FF] bg-clip-text text-transparent">
									{
										heading
									}
								</span>
							</h1>
							<p className="mt-6 text-xl text-white/85 lg:text-2xl">
								{subheading}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
