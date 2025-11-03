export default function PortfolioHero() {
	return (
		<section className="relative bg-black">
			<div className="mx-auto w-full max-w-7xl px-4 py-16 md:py-24">
				<div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
					<div className="max-w-2xl">
						<p className="text-sm uppercase tracking-widest text-white/80">
							Portfolio
						</p>
						<h1 className="mt-2 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
							Success stories from brands we've helped grow
						</h1>
						<p className="mt-4 text-base text-white/70">
							Discover how our strategic approach drives measurable results
							for businesses across industries.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

