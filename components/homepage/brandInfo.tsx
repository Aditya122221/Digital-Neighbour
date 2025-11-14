"use client"

import { Sparkles, Target, TrendingUp, Users2 } from "lucide-react"

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
}

type BrandInfoProps = {
	data?: BrandInfoData
}

export default function BrandInfo({ data }: BrandInfoProps) {
	if (!data) {
		return null
	}

	return (
		<section className="py-20">
			<div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 lg:px-12">
				<header className="max-w-4xl space-y-6">
					<h2 className="text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl font-cal-sans">
						{data.main.heading}
					</h2>
					<p className="text-base text-black/70 md:text-lg">
						{data.main.subheading}
					</p>
				</header>

				<div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
					<div className="rounded-t-[32px] bg-yellow/10 p-10 lg:rounded-bl-[32px] lg:rounded-br-none lg:rounded-tl-[32px] lg:rounded-tr-none">
						<div className="flex items-center gap-3 mb-5">
							<span className="flex h-12 w-12 items-center justify-center text-black">
								<Sparkles
									className="h-5 w-6"
									aria-hidden="true"
								/>
							</span>
							<div>
								<h3 className="text-xl font-semibold text-black">
									Why brands choose us
								</h3>
								<p className="text-sm uppercase tracking-[0.25em] text-black/60">
									We stay embedded
								</p>
							</div>
						</div>

						<div className="grid gap-6 md:grid-cols-2">
							{data.differentiators.map(
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
										] ?? Target

									return (
										<article
											key={id}
											className="flex flex-col gap-4 rounded-2xl bg-white p-6 text-black"
										>
											<div className="flex items-center gap-3 text-black">
												<IconComponent
													className="h-5 w-5"
													aria-hidden="true"
												/>
												<h4 className="text-lg font-semibold">
													{
														title
													}
												</h4>
											</div>
											<p className="text-sm leading-relaxed text-black/70">
												{
													description
												}
											</p>
										</article>
									)
								}
							)}
						</div>
					</div>

					<aside className="flex flex-col justify-between gap-6 rounded-b-[32px] bg-black p-8 text-white lg:rounded-bl-none lg:rounded-br-[32px] lg:rounded-tl-none lg:rounded-tr-[32px]">
						<div>
							<h3 className="text-2xl font-semibold">
								{data.rightCard.heading}
							</h3>
							<p className="mt-4 text-sm leading-relaxed text-white/70">
								{data.rightCard.description}
							</p>
						</div>
						<ul className="grid gap-6">
							{data.rightCard.stats.map(
								({ id, value, label }) => (
									<li
										key={id}
										className="rounded-2xl bg-white p-5 text-black"
									>
										<p className="text-3xl font-semibold">
											{value}
										</p>
										<p className="mt-2 text-sm text-black/70">
											{label}
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
