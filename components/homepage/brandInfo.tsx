"use client"

import { Sparkles, Target, TrendingUp, Users2 } from "lucide-react"

const differentiators = [
	{
		id: 1,
		title: "Full-Funnel Strategy",
		description:
			"Campaigns engineered around revenue targets—from awareness to retention—so every touchpoint pays off.",
		icon: Target,
	},
	{
		id: 2,
		title: "Human + Data Approach",
		description:
			"Our strategists blend behavioural insights with live performance dashboards to steer decisions in real time.",
		icon: Users2,
	},
	{
		id: 3,
		title: "Momentum Mindset",
		description:
			"Rapid testing sprints, weekly learnings, and constant optimisation keep your brand out in front.",
		icon: TrendingUp,
	},
]

const stats = [
	{ id: "years", value: "12+", label: "Years empowering growth brands" },
	{ id: "markets", value: "18", label: "Industries scaled globally" },
	{ id: "roi", value: "4.7x", label: "Average paid + organic ROI" },
]

export default function BrandInfo() {
	return (
		<section className="py-20">
			<div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 lg:px-12">
				<header className="max-w-4xl space-y-6">
					<span className="inline-flex items-center justify-center rounded-full bg-yellow px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-black">
						About Digital Neighbour
					</span>
					<h2 className="text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl font-cal-sans">
						The{" "}
						<span className="relative inline-block text-black">
							<span className="absolute inset-x-0 bottom-0 h-3/5 bg-yellow" />
							<span className="relative z-10 px-2 py-1">
								Impact
							</span>
						</span>{" "}
						marketing agency brands trust to
						grow.
					</h2>
					<p className="text-base text-black/70 md:text-lg">
						Digital Neighbour is the
						embedded marketing partner for
						ambitious teams. We unite
						strategy, storytelling, and
						performance into one streamlined
						crew that ships ideas fast,
						measures what matters, and keeps
						momentum on your side.
					</p>
				</header>

				<div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
					<div className="bg-yellow/10 p-10" style={{ borderTopLeftRadius: "32px", borderBottomLeftRadius: "32px" }}>
						<div className="flex items-center gap-3">
							<span className="flex h-12 w-12 items-center justify-center text-black">
								<Sparkles
									className="h-5 w-6"
									aria-hidden="true"
								/>
							</span>
							<div>
								<h3 className="text-xl font-semibold text-black">
									Why
									brands
									choose
									us
								</h3>
								<p className="text-sm uppercase tracking-[0.25em] text-black/60">
									We stay
									embedded
								</p>
							</div>
						</div>

						<div className="grid gap-6 md:grid-cols-2">
							{differentiators.map(
								({
									id,
									title,
									description,
									icon: Icon,
								}) => (
									<article
										key={
											id
										}
										className="flex flex-col gap-4 rounded-2xl bg-white p-6 text-black"
									>
										<div className="flex items-center gap-3 text-black">
											<Icon
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
							)}
						</div>
					</div>

					<aside className="flex flex-col justify-between gap-6 bg-black p-8 text-white" style={{ borderTopRightRadius: "32px", borderBottomRightRadius: "32px" }}>
						<div>
							<h3 className="text-2xl font-semibold">
								Partners, not
								vendors.
							</h3>
							<p className="mt-4 text-sm leading-relaxed text-white/70">
								We plug into
								your weekly
								cadences, share
								dashboards in
								plain language,
								and make the
								creative + data
								decisions you
								don&apos;t have
								time to juggle.
							</p>
						</div>
						<ul className="grid gap-6">
							{stats.map(
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
