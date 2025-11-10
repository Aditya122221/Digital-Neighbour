import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import {
	ensureLocationForService,
	getAllSocialLocationParams,
	getLocationDisplayName,
	getLocationPageData,
	getSocialLocationMetadata,
	normalizeLocationSlug,
} from "@/lib/location-data"
import { personalizeSeoData } from "@/lib/seo-location-personalization"
import socialData from "@/data/social-media.json"
import SocialMediaHero from "@/components/social-media/hero"
import IntroParagraph from "@/components/commonSections/introparagraph"
import PainPoints from "@/components/commonSections/painpoints"
import SectionPainPoint from "@/components/social-media/painpoints"
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
import Features from "@/components/commonSections/features"
import KeyBenefits from "@/components/commonSections/keybenefits"
import WhyWork from "@/components/social-media/whywork"
import type { SocialServiceSlug } from "@/config/social-services"

const slugAliases: Record<string, SocialServiceSlug> = {
	"social-media-management": "social-media-management",
	"social-media-marketing": "social-media-marketing",
	"facebook-management": "facebook-marketing",
	facebookmarketing: "facebook-marketing",
	linkedinmanagement: "linkedin-marketing",
	linkedinmarketing: "linkedin-marketing",
}

const canonicalToDataKey: Record<
	SocialServiceSlug,
	keyof typeof socialData | string
> = {
	"social-media-management": "social-media-marketing",
	"social-media-marketing": "social-media-marketing",
	"facebook-marketing": "facebook-marketing",
	"linkedin-marketing": "linkedin-marketing",
	"instagram-marketing": "instagram-marketing",
	"tiktok-marketing": "tiktok-marketing",
	"youtube-community-marketing": "youtube-community-marketing",
}

const LOCATION_ENABLED_SOCIAL_SLUGS: SocialServiceSlug[] = [
	"social-media-management",
	"facebook-marketing",
	"linkedin-marketing",
]

function resolveSocialSlug(requestedSlug: string): SocialServiceSlug | null {
	if (requestedSlug in slugAliases) {
		return slugAliases[requestedSlug]
	}

	if (
		Object.prototype.hasOwnProperty.call(
			socialData,
			requestedSlug as keyof typeof socialData
		)
	) {
		return requestedSlug as SocialServiceSlug
	}

	return null
}

function getDataKeyForSlug(slug: SocialServiceSlug) {
	return canonicalToDataKey[slug] ?? slug
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string; location: string }>
}): Promise<Metadata> {
	const { slug, location } = await params
	const canonicalSlug = resolveSocialSlug(slug)

	if (
		!canonicalSlug ||
		!LOCATION_ENABLED_SOCIAL_SLUGS.includes(canonicalSlug)
	) {
		return { title: "Page Not Found" }
	}

	const normalizedLocation = normalizeLocationSlug(location) ?? location

	const ensuredLocation =
		ensureLocationForService(
			"social",
			canonicalSlug,
			normalizedLocation
		) ?? normalizeLocationSlug(normalizedLocation)

	if (!ensuredLocation) {
		return { title: "Page Not Found" }
	}

	const metadata = getSocialLocationMetadata(
		canonicalSlug === "social-media-management"
			? "social-media-marketing"
			: canonicalSlug,
		ensuredLocation
	)

	const canonicalUrl =
		canonicalSlug === "social-media-management"
			? `https://digital-neighbour.com/social-media-marketing/${ensuredLocation}`
			: `https://digital-neighbour.com/social-media-marketing/${canonicalSlug}/${ensuredLocation}`

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
	return getAllSocialLocationParams(LOCATION_ENABLED_SOCIAL_SLUGS)
}

export default async function SocialMediaLocationPage({
	params,
}: {
	params: Promise<{ slug: string; location: string }>
}) {
	const { slug: requestedSlug, location: requestedLocation } =
		await params

	const canonicalSlug = resolveSocialSlug(requestedSlug)

	if (
		!canonicalSlug ||
		!LOCATION_ENABLED_SOCIAL_SLUGS.includes(canonicalSlug)
	) {
		notFound()
	}

	const normalizedLocation =
		normalizeLocationSlug(requestedLocation) ?? requestedLocation

	const ensuredLocation =
		ensureLocationForService(
			"social",
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
		if (canonicalSlug === "social-media-management") {
			redirect(`/social-media-marketing/${ensuredLocation}`)
		}

		redirect(
			`/social-media-marketing/${canonicalSlug}/${ensuredLocation}`
		)
	}

	const dataKey = getDataKeyForSlug(canonicalSlug)
	const baseData = (socialData as any)[dataKey] as any

	if (!baseData) {
		notFound()
	}

	const localizedBase = await getLocationPageData(
		"social",
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
				<SocialMediaHero
					data={
						personalizedData?.hero || {
							heading: "Social Media Marketing that Drives Growth",
							subheading: "Strategic content, community marketing, and insights for Meta, LinkedIn, TikTok, and more.",
							ctaText: "Market My Brand",
						}
					}
				/>
			</div>
			<Form data={personalizedData?.form} />
			<BrandsMarquee />
			<IntroParagraph
				data={
					personalizedData?.introParagraph ||
					personalizedData?.introparagraph
				}
			/>
			<PainPoints
				data={
					personalizedData?.painPoints ||
					personalizedData?.painpoints
				}
			/>
			<Services
				data={personalizedData?.services}
				serviceCards={personalizedData?.serviceCards}
				basePath="/social-media-marketing"
			/>
			<Content
				data={personalizedData?.content}
				imagePathPrefix="/seo/content"
			/>
			<SectionPainPoint />
			<WhyWork />
			<CaseStudy />
			<Process2
				data={personalizedData?.services}
				processData={personalizedData?.process}
			/>
			<KeyBenefits
				data={
					personalizedData?.keyBenefits ||
					personalizedData?.keybenefits
				}
			/>
			<Features data={personalizedData?.features} />
			<Faq data={personalizedData?.faq} />
			<OtherServices />
			<Cta data={personalizedData?.services} />
			<Footer />
		</main>
	)
}
