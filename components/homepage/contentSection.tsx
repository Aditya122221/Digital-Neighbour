"use client"

import Image from "next/image"

type ContentSectionBenefit = {
	id: number
	title: string
	description: string
	stat: string
	icon?: string
}

type ContentSectionData = {
	heading: string
	subheading: string
	highlightWord?: string
	benefits: ContentSectionBenefit[]
}

type ContentSectionProps = {
	data?: ContentSectionData
}

export default function ContentSection({ data }: ContentSectionProps) {
	if (!data) {
		return null
	}

	const { heading, subheading, benefits = [] } = data

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
		<section className="bg-white py-20">
			<div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 lg:px-12">
				<header className="text-center">
					<h2 className="mt-8 text-4xl font-semibold leading-tight text-black md:text-5xl lg:text-6xl font-cal-sans">
						{highlightHeading(heading, data.highlightWord)}
					</h2>
					<p className="mx-auto mt-6 max-w-2xl text-base text-black md:text-lg">
						{subheading}
					</p>
				</header>

				<div className="grid gap-6 md:grid-cols-2">
					{benefits.map(
						({ id, icon, title, description, stat }) => (
							<article
								key={id}
								className="flex h-full flex-col gap-6 rounded-[28px] bg-[#5D50EB] p-8"
							>
								<div className="flex items-center gap-4">
									<span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0e0e59] text-white overflow-hidden">
										{icon ? (
											<Image
												src={icon}
												alt={title}
												width={32}
												height={32}
												className="h-8 w-8 object-contain"
											/>
										) : null}
									</span>
									<div>
										<h3 className="text-xl font-semibold text-white">
											{title}
										</h3>
										<p className="mt-1 text-sm font-medium uppercase tracking-[0.2em] text-white/70">
											{stat}
										</p>
									</div>
								</div>
								<p className="text-base leading-relaxed text-white">
									{description}
								</p>
							</article>
						)
					)}
				</div>
			</div>
		</section>
	)
}
