import Image from "next/image"
import Link from "next/link"
import React from "react"

type Resource = {
	slug: string
	title: string
	category: string
	date: string
	excerpt: string
	image?: string
}

export default async function ResourcesGrid() {
	const resources: Resource[] = await import(
		"@/data/resources.json"
	).then((m) => m.default as Resource[])

	return (
		<section
			id="start"
			className="mx-auto w-full max-w-7xl px-4 pb-20 mt-20"
		>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{resources.map((item) => (
					<Link
						key={item.slug}
						href={`/resources/${item.slug}`}
						className="group relative rounded-xl border bg-card text-card-foreground shadow-sm transition hover:shadow-md"
					>
						<div className="aspect-[16/10] w-full overflow-hidden rounded-t-xl bg-muted">
							{item.image ? (
								<Image
									src={
										item.image
									}
									alt={
										item.title
									}
									width={
										640
									}
									height={
										400
									}
									className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
								/>
							) : null}
						</div>
						<div className="p-5">
							<div className="flex items-center gap-3 text-xs text-muted-foreground">
								<span className="rounded-full bg-primary/10 px-2 py-1 font-medium text-primary">
									{
										item.category
									}
								</span>
								<span>
									{new Date(
										item.date
									).toLocaleDateString()}
								</span>
							</div>
							<h3 className="mt-3 text-lg font-semibold leading-snug">
								{item.title}
							</h3>
							<p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
								{item.excerpt}
							</p>
							<div className="mt-4 inline-flex items-center text-sm font-medium text-primary">
								Read more
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5"
								>
									<path
										d="M13.5 4.5l6 6-6 6m5.25-6H4.5"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						</div>
					</Link>
				))}
			</div>
		</section>
	)
}
