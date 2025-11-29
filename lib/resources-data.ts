import resourcesJson from "@/data/resources.json"
import { sanityFetch } from "@/sanity/lib/fetch"
import {
	resourceArticleBySlugQuery,
	resourceArticlesQuery,
	resourcesPageContentQuery,
	resourcesPageQuery,
} from "@/sanity/lib/queries"

export type ResourceHeroContent = {
	title: string
	description: string
	details: string[]
}

export type ResourceArticle = {
	slug: string
	title: string
	category: string
	date: string
	excerpt: string
	image?: string
	imageAlt?: string
	content?: string
}

type ResourcesJsonEntry = Partial<
	ResourceHeroContent & ResourceArticle & { details?: string | string[] }
>

type SanityResourceRecord = {
	title?: string | null
	slug?: { current?: string | null } | string | null
	category?: string | null
	date?: string | null
	excerpt?: string | null
	image?: any | string | null
	imageAlt?: string | null
	content?: string | null
}

type SanityHeroRecord = Partial<
	ResourceHeroContent & { details?: string | string[] | null }
>

const DEFAULT_HERO: ResourceHeroContent = {
	title: "Explore insights on marketing, branding, and social media.",
	description:
		"Fresh perspectives, practical frameworks, and playbooks to help your brand grow and stand out.",
	details: [
		"Curated thinking across growth, product, and creative operations—updated weekly with lessons from the brands we partner with.",
	],
}

const parsedJson = Array.isArray(resourcesJson)
	? (resourcesJson as ResourcesJsonEntry[])
	: []

const heroEntry = parsedJson.find((entry) => typeof entry.slug !== "string")

const fallbackHeroContent = normalizeHeroContent(heroEntry) ?? DEFAULT_HERO

const fallbackArticles = parsedJson
	.filter((entry) => typeof entry.slug === "string")
	.map((entry) => normalizeArticle(entry))
	.filter((entry): entry is ResourceArticle => Boolean(entry))
	.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	)

const fallbackArticleMap = new Map(
	fallbackArticles.map((article) => [article.slug, article])
)

function normalizeDetails(details?: string | string[] | null): string[] {
	if (!details) return []
	if (Array.isArray(details)) {
		return details
			.map((detail) => (typeof detail === "string" ? detail.trim() : ""))
			.filter((detail): detail is string => Boolean(detail))
	}
	if (typeof details === "string" && details.trim()) {
		return [details.trim()]
	}
	return []
}

function normalizeHeroContent(
	entry?: ResourcesJsonEntry | SanityHeroRecord | null
): ResourceHeroContent | null {
	if (!entry) return null

	const title = typeof entry.title === "string" ? entry.title : null
	const description =
		typeof entry.description === "string" ? entry.description : null
	const details = normalizeDetails(entry.details)

	if (!title && !description && details.length === 0) {
		return null
	}

	return {
		title: title ?? DEFAULT_HERO.title,
		description: description ?? DEFAULT_HERO.description,
		details: details.length > 0 ? details : DEFAULT_HERO.details,
	}
}

function getImageUrl(image: any): string {
	if (!image) return "";
	if (typeof image === "string") return image;
	if (image.asset?.url) {
		return image.asset.url;
	}
	return "";
}

function normalizeArticle(
	entry?: ResourcesJsonEntry | SanityResourceRecord | null
): ResourceArticle | null {
	if (!entry) return null

	const slug =
		typeof entry.slug === "string"
			? entry.slug.trim()
			: entry.slug?.current || ""
	const title = typeof entry.title === "string" ? entry.title.trim() : ""
	const category =
		typeof entry.category === "string" ? entry.category.trim() : ""
	const dateValue =
		typeof entry.date === "string" ? entry.date.trim() : undefined
	const excerpt =
		typeof entry.excerpt === "string" ? entry.excerpt.trim() : ""
	const image = getImageUrl(entry.image)
	const content =
		typeof entry.content === "string" ? entry.content.trim() : undefined
	const imageAlt =
		typeof entry.imageAlt === "string" ? entry.imageAlt.trim() : undefined

	if (!slug || !title || !category || !excerpt) {
		return null
	}

	return {
		slug,
		title,
		category,
		date: normalizeDate(dateValue),
		excerpt,
		image: image || undefined,
		imageAlt,
		content,
	}
}

function normalizeDate(value?: string): string {
	if (!value) return new Date().toISOString()
	const parsed = new Date(value)
	if (Number.isNaN(parsed.getTime())) {
		return new Date().toISOString()
	}
	return parsed.toISOString()
}

export async function getResourcesHeroContent(): Promise<ResourceHeroContent> {
	try {
		const hero = await sanityFetch<SanityHeroRecord | null>({
			query: resourcesPageContentQuery,
		})
		const normalized = normalizeHeroContent(hero)
		if (normalized) {
			return normalized
		}
	} catch (error) {
		console.error(
			"Error fetching resources hero content from Sanity:",
			error
		)
	}

	return fallbackHeroContent
}

export async function getAllResources(): Promise<ResourceArticle[]> {
	try {
		const entries = await sanityFetch<SanityResourceRecord[]>({
			query: resourceArticlesQuery,
		})
		const normalized =
			entries
				?.map((entry) => normalizeArticle(entry))
				.filter((entry): entry is ResourceArticle => Boolean(entry))
				.sort(
					(a, b) =>
						new Date(b.date).getTime() - new Date(a.date).getTime()
				) ?? []

		if (normalized.length > 0) {
			return normalized
		}
	} catch (error) {
		console.error("Error fetching resources list from Sanity:", error)
	}

	return fallbackArticles
}

export async function getResourceBySlug(
	slug: string
): Promise<ResourceArticle | undefined> {
	if (!slug) return undefined

	try {
		const entry = await sanityFetch<SanityResourceRecord | null>({
			query: resourceArticleBySlugQuery,
			params: { slug },
		})
		const normalized = normalizeArticle(entry)
		if (normalized) {
			return normalized
		}
	} catch (error) {
		console.error(
			`Error fetching resource article "${slug}" from Sanity:`,
			error
		)
	}

	return fallbackArticleMap.get(slug)
}

type ResourcesPageData = {
	metadata?: string;
	description?: string;
	hero?: ResourceHeroContent;
	articles?: ResourceArticle[];
};

function transformSanityData(sanityData: any): ResourcesPageData | null {
	if (!sanityData) return null;

	const settings = sanityData.settings ?? {};
	const heroDoc = sanityData.hero ?? {};
	const articlesData = sanityData.articles ?? {};
	const articles = articlesData.articles || [];

	return {
		metadata: settings.metadata || settings.title || "",
		description: settings.description || "",
		hero: {
			title: heroDoc.title || "",
			description: heroDoc.description || "",
			details: heroDoc.details || [],
		},
		articles: articles
			.map((article: any) => normalizeArticle(article))
			.filter((article): article is ResourceArticle => Boolean(article))
			.sort(
				(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
			),
	};
}

export async function getResourcesPageData(): Promise<ResourcesPageData> {
	try {
		const sanityData = await sanityFetch({ query: resourcesPageQuery });
		const transformed = transformSanityData(sanityData);
		if (transformed && transformed.metadata) {
			return transformed;
		}
	} catch (error) {
		// Silently fallback to JSON
	}

	// Fallback to JSON
	return {
		metadata: "Resources | Digital Neighbour",
		description:
			"Explore insights on marketing, branding, social media, and growth. Curated by Digital Neighbour.",
		hero: fallbackHeroContent,
		articles: fallbackArticles,
	};
}

