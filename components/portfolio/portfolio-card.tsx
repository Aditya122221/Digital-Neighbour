import Image from "next/image"

interface PortfolioCardProps {
	logo?: string
	logoText: string
	headline: string
	metrics: {
		value: string
		label: string
	}[]
	tags: string[]
	image: string
	imageAlt?: string
}

export default function PortfolioCard({
	logo,
	logoText,
	headline,
	metrics,
	tags,
	image,
	imageAlt = "Portfolio project",
}: PortfolioCardProps) {
	return (
		<div className="group flex flex-col rounded-xl bg-white shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
			{/* Image Section */}
			<div className="relative w-full aspect-[16/10] overflow-hidden">
				<Image
					src={image}
					alt={imageAlt}
					fill
					className="object-cover transition-transform duration-300 group-hover:scale-105"
				/>
			</div>

			{/* Content Section */}
			<div className="flex flex-col p-5 space-y-3">
				{/* Logo */}
				<div className="flex items-center gap-2">
					{logo ? (
						<div className="relative h-5 w-5">
							<Image src={logo} alt="" fill className="object-contain" />
						</div>
					) : (
						<div className="h-5 w-5 rounded bg-foreground flex items-center justify-center">
							<span className="text-white text-xs font-bold">U</span>
						</div>
					)}
					<span className="text-xs font-medium text-foreground">
						{logoText}
					</span>
				</div>

				{/* Headline */}
				<h3 className="text-lg md:text-xl font-serif font-bold leading-tight text-foreground">
					{headline}
				</h3>

				{/* Metrics */}
				<div className="flex gap-5 py-2.5 border-b border-muted">
					{metrics.map((metric, index) => (
						<div key={index} className="flex flex-col">
							<span className="text-lg md:text-xl font-bold text-foreground leading-none">
								{metric.value}
							</span>
							<span className="text-xs text-muted-foreground mt-1 leading-tight">
								{metric.label}
							</span>
						</div>
					))}
				</div>

				{/* Tags */}
				<div className="flex flex-wrap gap-2">
					{tags.map((tag, index) => (
						<span
							key={index}
							className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-foreground border border-muted rounded-full bg-white"
						>
							{tag}
						</span>
					))}
				</div>
			</div>
		</div>
	)
}

