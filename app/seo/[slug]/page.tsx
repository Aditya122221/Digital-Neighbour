import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { buildMetadata, humanizeSlug } from "@/lib/site-metadata"
import {
	ensureLocationForService,
	getLocationDisplayName,
	getLocationPageData,
	normalizeLocationSlug,
	isValidLocationSlug,
} from "@/lib/location-data"
import { personalizeSeoData } from "@/lib/seo-location-personalization"
import { loadSeoPageData, type SeoPageData } from "@/lib/seo-page-data"
import SeoHero from "@/components/seo/hero"
import Content from "@/components/commonSections/content"
import Services from "@/components/commonSections/services"
import Form from "@/components/commonSections/form"
import Navbar from "@/components/core/navbar"
import Footer from "@/components/core/footer"
import BrandsMarquee from "@/components/homepage/brandsmarquee"
import Process2 from "@/components/homepage/process2"
import Cta from "@/components/commonSections/cta"
import Apart from "@/components/homepage/apart"
import OtherServices from "@/components/commonSections/otherservices"
import Faq from "@/components/commonSections/faq"
import CaseStudy from "@/components/homepage/casestudy"
import Blogs from "@/components/homepage/blogs"
import Testimonials from "@/components/homepage/testimonials"
import TestimonalTwo from "@/components/homepage/testimonalTwo"
import BookACall from "@/components/homepage/bookacall"
import IntroParagraph from "@/components/commonSections/introparagraph"
import PainPoints from "@/components/commonSections/painpoints"
import KeyBenefits from "@/components/commonSections/keybenefits"
import Features from "@/components/commonSections/features"

const slugAliases: Record<string, string> = {
	seo: "search-engine-optimisation",
	localseo: "local-seo",
	"seo-audit": "seo-audits",
	orm: "online-reputation-management",
}

const allowedSlugs = [
	"seo",
	"local-seo",
	"wordpress-seo",
	"ecom-seo",
	"ai-seo",
	"shopify-seo",
	"seo-audits",
	"online-reputation-management",
	"seo-migration",
	"small-business-seo",
	"lead-generation",
	"link-building",
	"international-seo",
	"mobile-seo",
	"voice-search-optimisation",
	"video-seo",
	"youtube-seo",
	"seo-strategy",
	"geo",
	"sge",
	"app-store-optimisation",
	"guest-posting",
	"local-citations",
	"penalty-recovery",
	"multilingual-seo",
]

const DEFAULT_SEO_SLUG = "search-engine-optimisation" as const

// Force dynamic rendering to always fetch fresh data from Sanity
export const dynamic = "force-dynamic"
export const revalidate = 0

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const { slug: requestedSlug } = await params

	const resolvedKey = slugAliases[requestedSlug] || requestedSlug

	const defaultSeoData = await loadSeoPageData(DEFAULT_SEO_SLUG)

	// Get base data from Sanity
	const baseHeading =
		defaultSeoData?.metadata ??
		defaultSeoData?.hero?.heading ??
		"SEO Services"
	const baseDescription =
		defaultSeoData?.description ??
		defaultSeoData?.hero?.subheading ??
		"Scale organic traffic, visibility, and revenue with full-funnel SEO programmes built by Digital Neighbour."

	if (
		requestedSlug === DEFAULT_SEO_SLUG ||
		resolvedKey === DEFAULT_SEO_SLUG
	) {
		return buildMetadata({
			title: baseHeading,
			description: baseDescription,
			path: "/seo",
		})
	}

	const locationSlug = normalizeLocationSlug(requestedSlug)

	if (!allowedSlugs.includes(resolvedKey)) {
		if (locationSlug) {
			// First try to ensure location is enabled for the service
			let ensuredLocation = ensureLocationForService(
				"seo",
				DEFAULT_SEO_SLUG,
				locationSlug
			)

			// If not enabled for service, but it's a valid location slug, use it anyway
			if (
				!ensuredLocation &&
				isValidLocationSlug(locationSlug)
			) {
				ensuredLocation = locationSlug
			}

			if (!ensuredLocation) {
				return {
					title: "Page Not Found",
				}
			}

			const localizedBase = await getLocationPageData(
				"seo",
				DEFAULT_SEO_SLUG,
				ensuredLocation,
				(defaultSeoData ?? {}) as SeoPageData
			)
			const locationName =
				getLocationDisplayName(ensuredLocation) ??
				humanizeSlug(ensuredLocation)
			const personalizedData = personalizeSeoData(
				localizedBase,
				locationName
			)

			const heading =
				personalizedData?.hero?.heading ??
				`SEO Services in ${locationName}`
			const description =
				personalizedData?.hero?.subheading ??
				`Partner with Digital Neighbour for SEO programmes tailored to ${locationName}.`

			return buildMetadata({
				title: heading,
				description,
				path: `/seo/${requestedSlug}`,
			})
		}

		return {
			title: "Page Not Found",
		}
	}

	// Fetch from Sanity with JSON fallback
	const currentSeoData = await loadSeoPageData(resolvedKey)

	if (!currentSeoData) {
		return {
			title: "Page Not Found",
		}
	}

	const heading =
		currentSeoData?.metadata ??
		currentSeoData?.hero?.heading ??
		`${humanizeSlug(resolvedKey)} Services`
	const description =
		currentSeoData?.description ??
		currentSeoData?.hero?.subheading ??
		currentSeoData?.introParagraph?.heading ??
		`Explore ${humanizeSlug(
			resolvedKey
		)} programmes delivered by Digital Neighbour.`

	return buildMetadata({
		title: heading,
		description,
		path: `/seo/${requestedSlug}`,
	})
}

export default async function SeoSlugPage({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug: requestedSlug } = await params

	const resolvedKey = slugAliases[requestedSlug] || requestedSlug

	// Redirect "search-engine-optimisation" to the main SEO page
	if (
		requestedSlug === "search-engine-optimisation" ||
		resolvedKey === "search-engine-optimisation"
	) {
		redirect("/seo")
	}

	const locationSlug = normalizeLocationSlug(requestedSlug)

	if (!allowedSlugs.includes(resolvedKey)) {
		if (locationSlug) {
			// First try to ensure location is enabled for the service
			let ensuredLocation = ensureLocationForService(
				"seo",
				DEFAULT_SEO_SLUG,
				locationSlug
			)

			// If not enabled for service, but it's a valid location slug, use it anyway
			if (
				!ensuredLocation &&
				isValidLocationSlug(locationSlug)
			) {
				ensuredLocation = locationSlug
			}

			if (!ensuredLocation) {
				notFound()
			}

			// Get base data merged with JSON fallback
			const baseData = await loadSeoPageData(DEFAULT_SEO_SLUG)

			if (!baseData) {
				notFound()
			}

			const localizedBase = await getLocationPageData(
				"seo",
				DEFAULT_SEO_SLUG,
				ensuredLocation,
				baseData
			)
			const locationName =
				getLocationDisplayName(ensuredLocation) ??
				ensuredLocation
			const personalizedData = personalizeSeoData(
				localizedBase,
				locationName
			)

			return renderSeoPage(personalizedData)
		}

		notFound()
	}

	// Fetch service data with JSON fallback
	const currentSeoData = await loadSeoPageData(resolvedKey)

	if (!currentSeoData) {
		notFound()
	}

	return renderSeoPage(currentSeoData)
}

function renderSeoPage(data: SeoPageData) {
	return (
		<main>
			<div className="relative">
				<Navbar />
				<SeoHero
					data={
						data?.hero || {
							heading: "Award-Winning SEO Marketing Agency",
							subheading: "We've helped leading and emerging brands scale their traffic and revenue organically for over a decade with our experience in seo consulting.",
						}
					}
				/>
			</div>
			<Form data={data?.form} />
			<BrandsMarquee />
			<IntroParagraph data={data?.introParagraph} />
			<PainPoints data={data?.painPoints} />
			<Services
				data={data?.services}
				serviceCards={data?.serviceCards}
			/>
			<Content
				data={data?.content}
				imagePathPrefix="/seo/content"
			/>
			<Cta data={data?.services} />
			<Apart />
			<Process2
				data={data?.services}
				processData={data?.process}
			/>
			<KeyBenefits data={data?.keyBenefits} />
			<Features data={data?.features} />
			<CaseStudy />
			<Faq data={data?.faq} />
			<OtherServices />
			<TestimonalTwo />
			<BookACall />
			<Blogs />
			<Footer />
		</main>
	)
}
