import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/core/navbar"
import Footer from "@/components/core/footer"
import {
	getPortfolioProjectBySlug,
	getPortfolioProjects,
} from "@/lib/portfolio-data"
import { buildMetadata } from "@/lib/site-metadata"

function summarizeContent(input?: string, limit = 160) {
	if (!input) return ""
	const normalized = input.replace(/\s+/g, " ").trim()
	return normalized.length > limit
		? `${normalized.slice(0, Math.max(0, limit - 3))}...`
		: normalized
}

export async function generateStaticParams() {
	const projects = await getPortfolioProjects()
	return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
	params,
}: {
	params: { slug: string }
}): Promise<Metadata> {
	const { slug } = params
	const currentProject = await getPortfolioProjectBySlug(slug)

	if (!currentProject) {
		return buildMetadata({
			title: "Case Study",
			description:
				"See how Digital Neighbour designs growth programs that deliver measurable outcomes.",
			path: `/portfolio/${slug}`,
			type: "article",
		})
	}

	const summary =
		summarizeContent(currentProject.content) ||
		(currentProject.metrics?.length
			? `See how ${currentProject.logoText} achieved ${
					currentProject.metrics[0].value
			  } ${currentProject.metrics[0].label.toLowerCase()} with Digital Neighbour.`
			: `Discover how Digital Neighbour partnered with ${currentProject.logoText} to drive growth.`)

	return buildMetadata({
		title: currentProject.headline,
		description: summary,
		path: `/portfolio/${slug}`,
		type: "article",
	})
}

export default async function PortfolioSlugPage({
	params,
}: {
	params: { slug: string }
}) {
	const currentProject = await getPortfolioProjectBySlug(params.slug)

	if (!currentProject) {
		notFound()
	}

	// Get 3 other projects (excluding current one)
	const allProjects = await getPortfolioProjects()
	const otherProjects = allProjects
		.filter((p) => p.slug !== params.slug)
		.slice(0, 3)

	const imageSrc = currentProject.image?.startsWith("/")
		? currentProject.image
		: `/${currentProject.image}`

	return (
		<main>
			<div className="relative bg-black">
				<Navbar />
			</div>

			{/* Hero Image with Heading Overlay */}
			<section className="relative w-full h-[60vh] md:h-[70vh] mt-16 md:mt-20">
				{currentProject.image && (
					<Image
						src={imageSrc}
						alt={
							currentProject.imageAlt ||
							currentProject.headline
						}
						fill
						className="object-cover"
						priority
					/>
				)}
				{/* Gradient overlay and heading at bottom */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
				<div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
					<div className="container max-w-7xl mx-auto">
						<div className="flex items-center gap-3 text-sm text-white/80 mb-4">
							<span className="text-white/90 font-medium">
								{
									currentProject.logoText
								}
							</span>
							<span>•</span>
							<div className="flex flex-wrap gap-2">
								{currentProject.tags.map(
									(
										tag,
										index
									) => (
										<span
											key={
												index
											}
											className="rounded-full bg-primary/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white border border-white/20"
										>
											{
												tag
											}
										</span>
									)
								)}
							</div>
						</div>
						<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl mb-6">
							{
								currentProject.headline
							}
						</h1>
						{/* Metrics */}
						<div className="flex flex-wrap gap-6 md:gap-8">
							{currentProject.metrics.map(
								(
									metric,
									index
								) => (
									<div
										key={
											index
										}
										className="flex flex-col"
									>
										<span className="text-2xl md:text-3xl font-bold text-white leading-none">
											{
												metric.value
											}
										</span>
										<span className="text-sm text-white/80 mt-1">
											{
												metric.label
											}
										</span>
									</div>
								)
							)}
						</div>
					</div>
				</div>
			</section>

			{/* Content Section */}
			<section className="py-12 md:py-20 px-6 bg-white">
				<div className="container max-w-4xl mx-auto">
					{currentProject.content && (
						<div className="prose prose-lg max-w-none">
							<p className="text-lg md:text-xl leading-relaxed text-blackbrown/90 whitespace-pre-line">
								{
									currentProject.content
								}
							</p>
						</div>
					)}
				</div>
			</section>

			{/* More Projects Section */}
			<section className="py-12 md:py-20 px-6 bg-pink/20">
				<div className="container max-w-7xl mx-auto">
					<h2 className="text-3xl md:text-4xl font-bold text-blackbrown mb-8 md:mb-12 text-center">
						More Projects
					</h2>
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
						{otherProjects.map(
							(project) => {
								const otherImageSrc =
									project.image?.startsWith(
										"/"
									)
										? project.image
										: `/${project.image}`

								return (
									<Link
										key={
											project.id
										}
										href={`/portfolio/${project.slug}`}
										className="group relative rounded-xl border bg-card text-card-foreground shadow-sm transition hover:shadow-md overflow-hidden"
									>
										<div className="aspect-[16/10] w-full overflow-hidden rounded-t-xl bg-muted">
											{project.image && (
												<Image
													src={
														otherImageSrc
													}
													alt={
														project.imageAlt ||
														project.headline
													}
													width={
														640
													}
													height={
														400
													}
													className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
												/>
											)}
										</div>
										<div className="p-5">
											<div className="flex items-center gap-2 mb-2">
												<span className="text-xs font-medium text-muted-foreground">
													{
														project.logoText
													}
												</span>
												<span className="text-muted-foreground">
													•
												</span>
												<div className="flex flex-wrap gap-1">
													{project.tags
														.slice(
															0,
															2
														)
														.map(
															(
																tag,
																index
															) => (
																<span
																	key={
																		index
																	}
																	className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
																>
																	{
																		tag
																	}
																</span>
															)
														)}
												</div>
											</div>
											<h3 className="text-lg font-semibold leading-snug mb-3 group-hover:text-primary transition-colors">
												{
													project.headline
												}
											</h3>
											<div className="flex gap-4 pb-3 border-b border-muted">
												{project.metrics
													.slice(
														0,
														2
													)
													.map(
														(
															metric,
															index
														) => (
															<div
																key={
																	index
																}
																className="flex flex-col"
															>
																<span className="text-base font-bold text-foreground leading-none">
																	{
																		metric.value
																	}
																</span>
																<span className="text-xs text-muted-foreground mt-1">
																	{
																		metric.label
																	}
																</span>
															</div>
														)
													)}
											</div>
											<div className="mt-4 inline-flex items-center text-sm font-medium text-primary">
												View
												case
												study
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
								)
							}
						)}
					</div>
					<div className="text-center">
						<Link
							href="/portfolio"
							className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
						>
							View More Projects
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="ml-2 h-4 w-4"
							>
								<path
									d="M13.5 4.5l6 6-6 6m5.25-6H4.5"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</Link>
					</div>
				</div>
			</section>

			<Footer />
		</main>
	)
}
