import { notFound } from "next/navigation"
import Image from "next/image"
import Navbar from "@/components/core/navbar"
import Footer from "@/components/core/footer"

type Resource = {
	slug: string
	title: string
	category: string
	date: string
	excerpt: string
	image?: string
}

async function getResource(slug: string): Promise<Resource | undefined> {
	const resources: Resource[] = await import(
		"@/data/resources.json"
	).then((m) => m.default as Resource[])
	return resources.find((r) => r.slug === slug)
}

export async function generateStaticParams() {
	const resources: Resource[] = await import(
		"@/data/resources.json"
	).then((m) => m.default as Resource[])
	return resources.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({
	params,
}: {
	params: { slug: string }
}) {
	const resource = await getResource(params.slug)
	if (!resource) return {}
	return {
		title: `${resource.title} | Resources`,
		description: resource.excerpt,
	}
}

export default async function ResourcePage({
	params,
}: {
	params: { slug: string }
}) {
	const resource = await getResource(params.slug)
	if (!resource) notFound()

	return (
		<main>
			<div className="relative">
				<Navbar />
			</div>
			<div className="mx-auto w-full max-w-3xl px-4 py-12 md:py-16">
				<div className="flex items-center gap-3 text-xs text-muted-foreground">
					<span className="rounded-full bg-primary/10 px-2 py-1 font-medium text-primary">
						{resource.category}
					</span>
					<span>
						{new Date(
							resource.date
						).toLocaleDateString()}
					</span>
				</div>
				<h1 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">
					{resource.title}
				</h1>
				<p className="mt-3 text-base text-muted-foreground">
					{resource.excerpt}
				</p>
				{resource.image ? (
					<div className="mt-8 overflow-hidden rounded-xl">
						<Image
							src={resource.image}
							alt={resource.title}
							width={1280}
							height={720}
							className="h-auto w-full object-cover"
							priority
						/>
					</div>
				) : null}
				<article className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
					<p>
						Coming soon: Full write-up. For
						now, this is a placeholder body.
						We'll expand this with
						comprehensive guidance, visuals,
						and templates.
					</p>
				</article>
			</div>
			<Footer />
		</main>
	)
}
