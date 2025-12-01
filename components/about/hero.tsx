import Image from "next/image"

import type { AboutHeroContent } from "@/lib/about-data"

type AboutHeroProps = {
	content: AboutHeroContent
}

type HighlightSegments = {
	before: string
	match: string
	after: string
}

const getHighlightSegments = (
	text: string,
	highlight?: string | null,
): HighlightSegments | null => {
	if (!text || !highlight) {
		return null
	}

	const trimmed = highlight.trim()
	if (!trimmed) {
		return null
	}

	const lowerText = text.toLowerCase()
	const lowerHighlight = trimmed.toLowerCase()
	const index = lowerText.indexOf(lowerHighlight)

	if (index === -1) {
		return null
	}

	return {
		before: text.slice(0, index),
		match: text.slice(index, index + trimmed.length),
		after: text.slice(index + trimmed.length),
	}
}

const HighlightWord = ({ text }: { text: string }) => (
	<span className="relative inline-block">
		<span className="absolute bottom-2 left-0 right-0 h-3/5 bg-[#ffbe11] -skew-x-12" />
		<span
			className="relative z-10 font-medium italic"
			style={{
				color: "#111",
			}}
		>
			{text}
		</span>
	</span>
)

export default function AboutHero({ content }: AboutHeroProps) {
	const words = content.words ?? []
	const highlightWord = content.highlight?.trim()
	const highlightedTitle = getHighlightSegments(content.title, highlightWord)

	const renderTitle = () => {
		if (highlightedTitle) {
			return (
				<>
					{highlightedTitle.before}
					<HighlightWord text={highlightedTitle.match} />
					{highlightedTitle.after}
				</>
			)
		}

		if (highlightWord) {
			return (
				<>
					{content.title}{" "}
					<HighlightWord text={highlightWord} />
				</>
			)
		}

		return content.title
	}

	return (
		<section className="relative px-6 bg-white overflow-hidden pt-28 md:pt-32">
			<div className="absolute top-0 left-0 right-0 h-16 md:h-20 bg-[#5D50EB] z-0" />

			<div className="relative w-full h-[60vh] md:h-[65vh] mb-16 z-10">
				<Image
					src={content.image}
					alt={`${content.title} ${content.highlight}`.trim()}
					fill
					className="object-cover rounded-xl"
					priority
				/>
			</div>

			<div className="container max-w-7xl mx-auto relative z-10 pb-32">
				<div className="text-center mb-16">
					<h1 className="text-5xl md:text-6xl lg:text-7xl font-regular text-black mb-8 text-balance font-cal-sans tracking-wide">
						{renderTitle()}
					</h1>
					<p className="text-lg md:text-xl font-light text-black max-w-3xl mx-auto text-pretty">
						{content.description}
					</p>
				</div>

				<div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-20 relative z-10">
					{words.map((word, index) => (
						<span
							key={`${word}-${index}`}
							className="text-2xl md:text-3xl lg:text-4xl font-medium text-black"
						>
							{word}
						</span>
					))}
				</div>
			</div>
			<div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>
		</section>
	)
}
