import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import {
	ensureLocationForService,
	getAllSeoLocationParams,
	getLocationPageData,
	getSeoLocationMetadata,
	getLocationDisplayName,
	normalizeLocationSlug,
} from "@/lib/location-data"
import { personalizeSeoData } from "@/lib/seo-location-personalization"
import seoData from "@/data/seo.json"
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
import type { SeoServiceSlug } from "@/config/seo-services"

const slugAliases: Record<string, SeoServiceSlug> = {
	seo: "search-engine-optimisation",
	localseo: "local-seo",
	"seo-audit": "seo-audits",
	orm: "online-reputation-management",
}

const LOCATION_ENABLED_SEO_SLUGS: SeoServiceSlug[] = [
	"search-engine-optimisation",
	"seo-audits",
	"small-business-seo",
]

function resolveSeoSlug(requestedSlug: string): SeoServiceSlug | null {
	const directMatch = Object.prototype.hasOwnProperty.call(
		seoData,
		requestedSlug
	)
		? (requestedSlug as SeoServiceSlug)
		: slugAliases[requestedSlug]

	if (!directMatch) {
		return null
	}

	return directMatch
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string; location: string }>
}): Promise<Metadata> {
	const { slug, location } = await params
	const canonicalSlug = resolveSeoSlug(slug)

	if (
		!canonicalSlug ||
		!LOCATION_ENABLED_SEO_SLUGS.includes(canonicalSlug)
	) {
		return { title: "Page Not Found" }
	}

	const normalizedLocation = normalizeLocationSlug(location) ?? location

	const ensuredLocation =
		ensureLocationForService(
			"seo",
			canonicalSlug,
			normalizedLocation
		) ?? normalizeLocationSlug(normalizedLocation)

	if (!ensuredLocation) {
		return { title: "Page Not Found" }
	}

	const metadata = getSeoLocationMetadata(canonicalSlug, ensuredLocation)

	const canonicalUrl =
		canonicalSlug === "search-engine-optimisation"
			? `https://digital-neighbour.com/seo/${ensuredLocation}`
			: `https://digital-neighbour.com/seo/${canonicalSlug}/${ensuredLocation}`

	return {
		title: metadata.title,
		description: metadata.description,
		alternates: {
			canonical: canonicalUrl,
		},
		openGraph: {
			title: metadata.title,
			description: metadata.description,
			type: "website",
			url: canonicalUrl,
		},
	}
}

export async function generateStaticParams() {
	return getAllSeoLocationParams(LOCATION_ENABLED_SEO_SLUGS)
}

export default async function SeoLocationPage({
	params,
}: {
	params: Promise<{ slug: string; location: string }>
}) {
	const { slug: requestedSlug, location: requestedLocation } =
		await params

	const canonicalSlug = resolveSeoSlug(requestedSlug)

	if (
		!canonicalSlug ||
		!LOCATION_ENABLED_SEO_SLUGS.includes(canonicalSlug)
	) {
		notFound()
	}

	const normalizedLocation =
		normalizeLocationSlug(requestedLocation) ?? requestedLocation

	const ensuredLocation =
		ensureLocationForService(
			"seo",
			canonicalSlug,
			normalizedLocation
		) ?? normalizeLocationSlug(normalizedLocation)

	if (!ensuredLocation) {
		notFound()
	}

	if (
		requestedSlug !== canonicalSlug ||
		normalizeLocationSlug(requestedLocation) !== ensuredLocation
	) {
		redirect(`/seo/${canonicalSlug}/${ensuredLocation}`)
	}

	const baseData = seoData[canonicalSlug] as any

	if (!baseData) {
		notFound()
	}

	const localizedBase = await getLocationPageData(
		"seo",
		canonicalSlug,
		ensuredLocation,
		baseData
	)
	const locationName =
		getLocationDisplayName(ensuredLocation) ?? ensuredLocation
	const personalizedData = personalizeSeoData(localizedBase, locationName)

	return (
		<main>
			<div className="relative">
				<Navbar />
				<SeoHero
					data={
						personalizedData?.hero || {
							heading: "Award-Winning SEO Marketing Agency",
							subheading: "We've helped leading and emerging brands scale their traffic and revenue organically for over a decade with our experience in seo consulting.",
						}
					}
				/>
			</div>
			<Form data={personalizedData?.form} />
			<BrandsMarquee />
			<IntroParagraph
				data={personalizedData?.introParagraph}
			/>
			<PainPoints data={personalizedData?.painPoints} />
			<Services
				data={personalizedData?.services}
				serviceCards={personalizedData?.serviceCards}
			/>
			<Content
				data={personalizedData?.content}
				imagePathPrefix="/seo/content"
			/>
			<Cta data={personalizedData?.services} />
			<Apart />
			<Process2
				data={personalizedData?.services}
				processData={
					personalizedData?.process ||
					seoData["search-engine-optimisation"]
						?.process ||
					baseData?.process
				}
			/>
			<KeyBenefits data={personalizedData?.keyBenefits} />
			<Features data={personalizedData?.features} />
			<CaseStudy />
			<Faq data={personalizedData?.faq} />
			<OtherServices />
			<Blogs />
			<Testimonials />
			<TestimonalTwo />
			<BookACall />
			<Footer />
		</main>
	)
}
