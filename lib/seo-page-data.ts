import seoData from "@/data/seo.json"
import { getSeoServiceBySlug } from "@/lib/sanity-service-data"
import { sanityFetch } from "@/sanity/lib/fetch"
import { seoPageQuery } from "@/sanity/lib/queries"
import { urlForImage } from "@/sanity/lib/image"

// Helper function to get image URL from Sanity image object
const getImageUrl = (image: any): string | undefined => {
	if (!image) return undefined
	if (image.asset?.url) {
		return image.asset.url
	}
	try {
		return urlForImage(image).url()
	} catch {
		return undefined
	}
}

export interface SeoPageData {
	hero?: Record<string, any>
	form?: Record<string, any>
	introParagraph?: Record<string, any>
	painPoints?: {
		heading?: string
		subheading?: string
		painPoints?: any[]
		[key: string]: any
	}
	services?: string | Record<string, any>
	serviceCards?: any[]
	specialisations?: any[]
	content?: Record<string, any>
	process?: {
		steps?: any[]
		content?: any[]
		[key: string]: any
	}
	keyBenefits?: {
		heading?: string
		subheading?: string
		benefits?: any[]
		items?: any[]
		[key: string]: any
	}
	features?: {
		heading?: string
		subheading?: string
		features?: any[]
		items?: any[]
		[key: string]: any
	}
	faq?: {
		heading?: string
		subheading?: string
		faqs?: any[]
		items?: any[]
		[key: string]: any
	}
	[key: string]: any
}

const seoJsonData = seoData as Record<string, SeoPageData>

function pickArray<T>(primary?: T[] | null, fallback?: T[] | null) {
	if (Array.isArray(primary) && primary.length > 0) {
		return primary
	}
	if (Array.isArray(fallback) && fallback.length > 0) {
		return fallback
	}
	return undefined
}

function mergeObjects<T extends Record<string, any> | undefined>(
	fallback?: T,
	remote?: T
) {
	if (fallback && remote) {
		return { ...fallback, ...remote }
	}
	return remote ?? fallback
}

function normalizeKeyBenefits(
	fallback?: SeoPageData["keyBenefits"],
	remote?: SeoPageData["keyBenefits"]
) {
	if (!fallback && !remote) {
		return undefined
	}

	const fallbackItems =
		fallback?.benefits?.length
			? fallback.benefits
			: fallback?.items?.length
				? fallback.items
				: undefined
	const remoteItems =
		remote?.benefits?.length
			? remote.benefits
			: remote?.items?.length
				? remote.items
				: undefined

	return {
		...(fallback ?? {}),
		...(remote ?? {}),
		benefits: pickArray(remoteItems, fallbackItems),
	}
}

function normalizeFeatures(
	fallback?: SeoPageData["features"],
	remote?: SeoPageData["features"]
) {
	if (!fallback && !remote) {
		return undefined
	}

	const fallbackItems =
		fallback?.features?.length
			? fallback.features
			: fallback?.items?.length
				? fallback.items
				: undefined
	const remoteItems =
		remote?.features?.length
			? remote.features
			: remote?.items?.length
				? remote.items
				: undefined

	return {
		...(fallback ?? {}),
		...(remote ?? {}),
		features: pickArray(remoteItems, fallbackItems),
	}
}

function normalizeFaq(
	fallback?: SeoPageData["faq"],
	remote?: SeoPageData["faq"]
) {
	if (!fallback && !remote) {
		return undefined
	}

	const fallbackItems =
		fallback?.faqs?.length
			? fallback.faqs
			: fallback?.items?.length
				? fallback.items
				: undefined
	const remoteItems =
		remote?.faqs?.length
			? remote.faqs
			: remote?.items?.length
				? remote.items
				: undefined

	return {
		...(fallback ?? {}),
		...(remote ?? {}),
		faqs: pickArray(remoteItems, fallbackItems),
	}
}

export function mergeSeoPageData(
	remoteData: SeoPageData | null | undefined,
	slugKey: string
): SeoPageData | null {
	const fallbackData = seoJsonData[slugKey]

	if (!fallbackData && !remoteData) {
		return null
	}

	const fallback = fallbackData ?? {}
	const remote = remoteData ?? {}

	return {
		...fallback,
		...remote,
		hero: mergeObjects(fallback.hero, remote.hero),
		form: mergeObjects(fallback.form, remote.form),
		introParagraph: mergeObjects(
			fallback.introParagraph,
			remote.introParagraph
		),
		painPoints: {
			...(fallback.painPoints ?? {}),
			...(remote.painPoints ?? {}),
			painPoints: pickArray(
				remote.painPoints?.painPoints,
				fallback.painPoints?.painPoints
			),
		},
		services: remote.services ?? fallback.services,
		serviceCards: pickArray(remote.serviceCards, fallback.serviceCards),
		specialisations: pickArray(
			remote.specialisations,
			fallback.specialisations
		),
		content: mergeObjects(fallback.content, remote.content),
		process: {
			...(fallback.process ?? {}),
			...(remote.process ?? {}),
			steps: pickArray(remote.process?.steps, fallback.process?.steps),
			content: pickArray(
				remote.process?.content,
				fallback.process?.content
			),
		},
		keyBenefits: normalizeKeyBenefits(
			fallback.keyBenefits,
			remote.keyBenefits
		),
		features: normalizeFeatures(fallback.features, remote.features),
		faq: normalizeFaq(fallback.faq, remote.faq),
	}
}

/**
 * Transform Sanity SEO page data to match the expected format
 */
function transformSeoPageData(sanityData: any): SeoPageData | null {
	if (!sanityData) {
		return null
	}

	return {
		hero: sanityData.hero
			? {
					heading: sanityData.hero.heading,
					subheading: sanityData.hero.subheading,
				}
			: undefined,
		form: sanityData.form
			? {
					heading: sanityData.form.heading,
					content: sanityData.form.content,
					subContent: sanityData.form.subContent,
					cta: sanityData.form.cta,
					formHeading: sanityData.form.formHeading,
					buttonText: sanityData.form.buttonText,
				}
			: undefined,
		introParagraph: sanityData.introParagraph
			? {
					heading: sanityData.introParagraph.heading,
					problemStatement: sanityData.introParagraph.problemStatement,
					valueProposition: sanityData.introParagraph.valueProposition,
				}
			: undefined,
		painPoints: sanityData.painPoints
			? {
					heading: sanityData.painPoints.heading,
					subheading: sanityData.painPoints.subheading,
					painPoints: sanityData.painPoints.painPoints || [],
				}
			: undefined,
		services: sanityData.services?.serviceName,
		serviceCards: sanityData.services?.serviceCards?.map((card: any) => ({
			id: card.id,
			name: card.name,
			title: card.title,
			description: card.description,
			image: card.image ? getImageUrl(card.image) : undefined,
		})),
		content: sanityData.content
			? {
					heading: sanityData.content.heading,
					text1: sanityData.content.text1,
					text2: sanityData.content.text2,
					text3: sanityData.content.text3,
					image: sanityData.content.image
						? getImageUrl(sanityData.content.image)
						: undefined,
					alt: sanityData.content.alt,
				}
			: undefined,
		process: sanityData.process
			? {
					steps: sanityData.process.steps || [],
					content: sanityData.process.content || [],
				}
			: undefined,
		keyBenefits: sanityData.keyBenefits
			? {
					heading: sanityData.keyBenefits.heading,
					subheading: sanityData.keyBenefits.subheading,
					benefits: sanityData.keyBenefits.benefits || [],
				}
			: undefined,
		features: sanityData.features
			? {
					heading: sanityData.features.heading,
					subheading: sanityData.features.subheading,
					features: sanityData.features.features || [],
				}
			: undefined,
		faq: sanityData.faq
			? {
					serviceName: sanityData.faq.serviceName,
					heading: sanityData.faq.heading,
					subheading: sanityData.faq.subheading,
					faqs: sanityData.faq.faqs || [],
				}
			: undefined,
	}
}

export async function loadSeoPageData(
	slugKey: string
): Promise<SeoPageData | null> {
	// Try to fetch from the new seoPage schema for any SEO service page
	try {
		const sanityData = await sanityFetch(seoPageQuery, { slug: slugKey })
		if (sanityData) {
			const transformedData = transformSeoPageData(sanityData)
			return mergeSeoPageData(transformedData, slugKey)
		}
	} catch (error) {
		// Silently fallback to existing service data
	}

	// Fallback to existing service data if not found in Sanity
	const remoteData = await getSeoServiceBySlug(slugKey)
	return mergeSeoPageData(remoteData, slugKey)
}

