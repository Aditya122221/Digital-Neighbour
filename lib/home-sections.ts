import homeData from "@/data/home.json"
import { sanityFetch } from "@/sanity/lib/fetch"
import {
	apartSectionQuery,
	caseStudiesSectionQuery,
} from "@/sanity/lib/queries"

type SanityCaseStudyMetric = {
	number?: string
	text?: string
}

type SanityCaseStudyItem = {
	_key?: string
	id?: number
	title?: string
	bgImages?: Array<string | null | undefined>
	textColor?: string
	services?: string[]
	isNew?: boolean
	metrics?: SanityCaseStudyMetric[]
}

type SanityCaseStudies = {
	heading?: string
	items?: SanityCaseStudyItem[]
}

type SanityApart = {
	heading?: string
	highlightTarget?: string
	tagline?: string
	oursTitle?: string
	othersTitle?: string
	ours?: Array<string | null | undefined>
	others?: Array<string | null | undefined>
}

export type CaseStudyMetric = {
	number: string
	text: string
}

export type CaseStudyItem = {
	id: number
	title: string
	bgImages: string[]
	textColor: string
	services: string[]
	isNew?: boolean
	metrics: CaseStudyMetric[]
}

export type CaseStudiesSectionData = {
	heading?: string
	items: CaseStudyItem[]
}

export type ApartSectionData = {
	heading?: string
	highlightTarget?: string
	tagline?: string
	oursTitle?: string
	othersTitle?: string
	ours: string[]
	others: string[]
}

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T

const normalizeCaseStudies = (
	data: SanityCaseStudies
): CaseStudiesSectionData => {
	const items =
		data.items?.reduce<CaseStudyItem[]>((acc, item, index) => {
			const bgImages = (item.bgImages ?? []).filter(
				(image): image is string => Boolean(image)
			)

			if (bgImages.length === 0) {
				return acc
			}

			acc.push({
				id:
					typeof item.id === "number"
						? item.id
						: index + 1,
				title: item.title ?? `Case Study ${index + 1}`,
				bgImages,
				textColor: item.textColor ?? "text-white",
				services: item.services ?? [],
				isNew: item.isNew,
				metrics:
					item.metrics?.map((metric) => ({
						number: metric.number ?? "",
						text: metric.text ?? "",
					})) ?? [],
			})

			return acc
		}, []) ?? []

	return {
		heading: data.heading,
		items,
	}
}

const normalizeApart = (data: SanityApart): ApartSectionData => ({
	heading: data.heading,
	highlightTarget: data.highlightTarget,
	tagline: data.tagline,
	oursTitle: data.oursTitle,
	othersTitle: data.othersTitle,
	ours:
		data.ours?.filter(
			(item): item is string => typeof item === "string"
		) ?? [],
	others:
		data.others?.filter(
			(item): item is string => typeof item === "string"
		) ?? [],
})

const FALLBACK_CASE_STUDIES = normalizeCaseStudies(
	(homeData.caseStudies ?? { items: [] }) as SanityCaseStudies
)

const FALLBACK_APART = normalizeApart(
	(homeData.apart ?? { ours: [], others: [] }) as SanityApart
)

export async function getCaseStudiesSectionData(): Promise<CaseStudiesSectionData> {
	try {
		const sanityData = await sanityFetch<SanityCaseStudies | null>(
			caseStudiesSectionQuery
		)

		if (sanityData) {
			const normalized = normalizeCaseStudies(sanityData)
			if (normalized.items.length > 0) {
				return normalized
			}
		}
	} catch (error) {
		console.error(
			"Failed to fetch case studies section from Sanity:",
			error
		)
	}

	return clone(FALLBACK_CASE_STUDIES)
}

export async function getApartSectionData(): Promise<ApartSectionData> {
	try {
		const sanityData = await sanityFetch<SanityApart | null>(
			apartSectionQuery
		)

		if (sanityData) {
			const normalized = normalizeApart(sanityData)
			if (
				normalized.ours.length > 0 ||
				normalized.others.length > 0
			) {
				return normalized
			}
		}
	} catch (error) {
		console.error(
			"Failed to fetch apart section from Sanity:",
			error
		)
	}

	return clone(FALLBACK_APART)
}
