"use client"

import { Sparkles, Target, TrendingUp, Users2 } from "lucide-react"
import Image from "next/image"
import CustomButton from "../core/button"

const iconMap = {
	Target,
	Users2,
	TrendingUp,
}

type IconName = keyof typeof iconMap

type Differentiator = {
	id: number
	title: string
	description: string
	icon?: string
}

type Stat = {
	id: string
	value: string
	label: string
}

type BrandInfoData = {
	main: {
		heading: string
		subheading: string
	}
	differentiators: Differentiator[]
	rightCard: {
		heading: string
		description: string
		stats: Stat[]
	}
	buttonText?: string
	buttonLink?: string
}

type BrandInfoProps = {
	data?: BrandInfoData
}

export default function BrandInfo({ data }: BrandInfoProps) {
	if (!data) {
		return null
	}

	const highlightHeading = (
		heading: string,
		highlightWord?: string
	) => {
		if (!heading) return null;
		if (!highlightWord) return heading;

		const lowerHeading = heading.toLowerCase();
		const lowerHighlight = highlightWord.toLowerCase();
		const highlightIndex = lowerHeading.indexOf(lowerHighlight);

		if (highlightIndex === -1) {
			return heading;
		}

		const before = heading.slice(0, highlightIndex);
		const highlighted = heading.slice(
			highlightIndex,
			highlightIndex + highlightWord.length
		);
		const after = heading.slice(highlightIndex + highlightWord.length);

		return (
			<>
				{before}
				<span className="relative inline-block">
					<span className="absolute bottom-1 left-0 right-0 h-2/4 bg-yellow -skew-x-12" />
					<span className="relative z-10 font-semibold">
						{highlighted}
					</span>
				</span>
				{after}
			</>
		);
	};

	return (
		<section className="py-20">
			<div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 lg:px-12">
				<header className="max-w-4xl mx-auto text-center space-y-6">
					<h2 className="text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl font-cal-sans">
						{highlightHeading(data.main.heading, data.main.highlightWord)}
					</h2>
					<p className="text-base text-black/70 md:text-lg">
						{data.main.subheading}
					</p>
				</header>

				<div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
					<div className="rounded-t-[32px] bg-[#5D50EB] p-10 lg:rounded-bl-[32px] lg:rounded-br-none lg:rounded-tl-[32px] lg:rounded-tr-none">
						<div className="flex items-center gap-3 mb-5">
							<span className="flex h-12 w-12 items-center justify-center text-white">
								<Sparkles
									className="h-5 w-6 text-white"
									aria-hidden="true"
								/>
							</span>
							<div>
								<h3 className="text-xl font-semibold text-white">
									Why
									brands
									choose
									us
								</h3>
								<p className="text-sm uppercase tracking-[0.25em] text-white/60">
									We stay
									embedded
								</p>
							</div>
						</div>

						<div className="grid gap-6 md:grid-cols-2">
							{data.differentiators
								.slice(0, 3)
								.map(
									({
										id,
										title,
										description,
										icon,
									}) => {
										const IconComponent =
											iconMap[
												(icon as IconName) ??
													"Target"
											] ??
											Target

										return (
											<article
												key={
													id
												}
												className="flex flex-col gap-4 rounded-2xl bg-white p-6"
											>
												<div className="flex items-center gap-3 text-[#5D50EB]">
													<IconComponent
														className="h-5 w-5 text-[#5D50EB]"
														aria-hidden="true"
													/>
													<h4 className="text-lg font-semibold text-[#5D50EB]">
														{
															title
														}
													</h4>
												</div>
												<p className="text-sm leading-relaxed text-black">
													{
														description
													}
												</p>
											</article>
										)
									}
								)}
							{/* CTA button always in fourth position */}
							<div
								key={`cta-button`}
								className="flex items-center justify-center w-full min-h-[200px] rounded-2xl bg-transparent p-6"
							>
								<CustomButton
									text={data.buttonText || "Connect with Us"}
									href={data.buttonLink || "/contact"}
									className="w-full max-w-md"
								/>
							</div>
							{/* Render 4th differentiator if it exists */}
							{data
								.differentiators[3] &&
								(() => {
									const item =
										data
											.differentiators[3]
									const IconComponent =
										iconMap[
											(item.icon as IconName) ??
												"Target"
										] ??
										Target
									return (
										<article
											key={
												item.id
											}
											className="flex flex-col gap-4 rounded-2xl bg-white p-6"
										>
											<div className="flex items-center gap-3 text-[#5D50EB]">
												<IconComponent
													className="h-5 w-5 text-[#5D50EB]"
													aria-hidden="true"
												/>
												<h4 className="text-lg font-semibold text-[#5D50EB]">
													{
														item.title
													}
												</h4>
											</div>
											<p className="text-sm leading-relaxed text-black">
												{
													item.description
												}
											</p>
										</article>
									)
								})()}
						</div>
					</div>

					<aside className="flex flex-col justify-between gap-6 rounded-b-[32px] bg-[#e9e5ff] p-8 text-black lg:rounded-bl-none lg:rounded-br-[32px] lg:rounded-tl-none lg:rounded-tr-[32px]">
						<div>
							<h3 className="text-2xl font-semibold text-black">
								{
									data
										.rightCard
										.heading
								}
							</h3>
							<p className="mt-4 text-sm leading-relaxed text-black/70">
								{
									data
										.rightCard
										.description
								}
							</p>
						</div>
						<ul className="grid gap-6">
							{data.rightCard.stats.map(
								({
									id,
									value,
									label,
								}) => (
									<li
										key={
											id
										}
										className="rounded-2xl bg-white p-5 text-black"
									>
										<p className="text-3xl font-semibold">
											{
												value
											}
										</p>
										<p className="mt-2 text-sm text-black/70">
											{
												label
											}
										</p>
									</li>
								)
							)}
						</ul>
					</aside>
				</div>
			</div>
		</section>
	)
}
