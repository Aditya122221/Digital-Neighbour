import PortfolioCard from "./portfolio-card"

type PortfolioItem = {
	id: number
	logoText: string
	headline: string
	metrics: { value: string; label: string }[]
	tags: string[]
	image: string
	imageAlt?: string
}

export default async function PortfolioGrid() {
	const portfolio: PortfolioItem[] = await import("@/data/portfolio.json").then(
		(m) => m.default as PortfolioItem[]
	)

	return (
		<section className="py-16 md:py-24 px-4">
			<div className="mx-auto w-full max-w-7xl">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
					{portfolio.map((item) => (
						<PortfolioCard
							key={item.id}
							logoText={item.logoText}
							headline={item.headline}
							metrics={item.metrics}
							tags={item.tags}
							image={item.image}
							imageAlt={item.imageAlt}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

