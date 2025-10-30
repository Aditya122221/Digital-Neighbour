import React from "react"
import { notFound } from "next/navigation"
import webDevData from "@/data/web-development.json"
import WebDevHero from "@/components/web-development/hero"
import Functionalities from "@/components/web-development/functionalities"
import SeoContent from "@/components/seo/content"
import SeoServices from "@/components/seo/services"
import SeoForm from "@/components/seo/form"
import Navbar from "@/components/core/navbar"
import Footer from "@/components/core/footer"
import BrandsMarquee from "@/components/homepage/brandsmarquee"
import Process2 from "@/components/homepage/process2"
import SeoCta from "@/components/seo/cta"
import Industries from "@/components/web-development/industries"
import OtherServices from "@/components/seo/otherservices"
import SeoFaq from "@/components/seo/faq"
import CaseStudy from "@/components/homepage/casestudy"

type WebDevJson = Record<string, any> & {
	otherServices?: { webdevelopmentServices?: string[] }
}

const data = webDevData as unknown as WebDevJson

function toKebabCase(input: string) {
	return input
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)+/g, "")
}

function fromKebabToTitle(input: string) {
	return input
		.split("-")
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join(" ")
}

function getAllowedSlugs() {
	const jsonSlugs = Object.keys(data).filter((k) => k !== "otherServices")
	const otherServiceSlugs = (
		data.otherServices?.webdevelopmentServices || []
	).map((s) => toKebabCase(s))
	return new Set([...jsonSlugs, ...otherServiceSlugs])
}

function resolveDataForSlug(slug: string) {
	const base = (data as any)["web-development"] || {}
	const direct = (data as any)[slug]
	if (direct) return direct

	const otherList = data.otherServices?.webdevelopmentServices || []
	const match = otherList.find((label) => toKebabCase(label) === slug)
	if (!match) return null

	// Virtualize content for other services using the base as fallback
	return {
		...base,
		hero: {
			...(base?.hero || {}),
			heading: match,
			subheading: `Professional ${match} services tailored to your business needs.`,
		},
		services: match,
		form: base?.form || {},
		content: base?.content || {},
		serviceCards: base?.serviceCards || [],
		process: base?.process || {},
		faq: {
			...(base?.faq || {}),
			serviceName: match,
		},
	}
}

export async function generateStaticParams() {
	return Array.from(getAllowedSlugs()).map((slug) => ({ slug }))
}

export default function WebDevSlugPage({
	params,
}: {
	params: { slug: string }
}) {
	const allowed = getAllowedSlugs()
	if (!allowed.has(params.slug)) {
		notFound()
	}

	const currentData = resolveDataForSlug(params.slug)
	const heroFallback = {
		heading: fromKebabToTitle(params.slug),
		subheading: "We design, build, and scale fast, secure, and conversion-focused websites and web apps.",
	}

	return (
		<main>
			<div className="relative">
				<Navbar />
				<WebDevHero
					data={currentData?.hero || heroFallback}
				/>
			</div>
			<SeoForm data={currentData?.form} />
			<BrandsMarquee />
			<Functionalities />
			<SeoServices
				data={currentData?.services}
				serviceCards={currentData?.serviceCards}
				basePath="/web-development"
			/>
			<Process2
				data={currentData?.services}
				processData={
					currentData?.process ||
					(data as any)["web-development"]
						?.process
				}
			/>
			<SeoContent data={currentData?.content} />
			<Industries />
			<CaseStudy />
			<OtherServices />
			<SeoFaq data={currentData?.faq} />
			<SeoCta data={currentData?.services} />
			<Footer />
		</main>
	)
}
