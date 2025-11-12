import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { buildMetadata, humanizeSlug } from "@/lib/site-metadata"
import aiAutomationData from "@/data/ai-automation.json"
import AiAutomationHero from "@/components/ai-automation/hero"
import Content from "@/components/commonSections/content"
import Services from "@/components/commonSections/services"
import Form from "@/components/commonSections/form"
import Navbar from "@/components/core/navbar"
import Footer from "@/components/core/footer"
import BrandsMarquee from "@/components/homepage/brandsmarquee"
import Process2 from "@/components/homepage/process2"
import Cta from "@/components/commonSections/cta"
import OtherServices from "@/components/commonSections/otherservices"
import Faq from "@/components/commonSections/faq"
import CaseStudy from "@/components/homepage/casestudy"
import IntroParagraph from "@/components/commonSections/introparagraph"
import PainPoints from "@/components/commonSections/painpoints"
import KeyBenefits from "@/components/commonSections/keybenefits"
import Apart from "@/components/homepage/apart"
import Features from "@/components/commonSections/features"
import Chaos from "@/components/ai-automation/chaos"
import Industries from "@/components/ai-automation/industries"
import AiAutomationServices from "@/components/ai-automation/services"

const allowedSlugs = [
	"ai-automation",
	"chatbots-and-virtual-assistants",
	"process-automation",
	"ai-powered-analytics",
	"machine-learning-solutions",
	"natural-language-processing",
	"predictive-analytics",
	"robotic-process-automation",
	"ai-integration-services",
	"intelligent-document-processing",
	"customer-service-automation",
	"workflow-automation",
	"ai-chatbots",
	"ai-receptionists",
	"factory-automation",
	"social-media-automation",
	"erp-systems",
	"lead-follow-up-agent",
	"customer-feedback-collector",
	"automation-blogging",
	"ai-content-generation-tools",
	"ai-driven-email-marketing",
	"ai-website-personalisation",
	"ai-customer-segmentation",
	"ai-lead-nurturing",
	"ai-product-recommendations",
	"ai-for-sales",
	"ai-survey-bots",
	"generative-ai",
	"ai-transcription",
]

export function generateMetadata({
	params,
}: {
	params: { slug: string }
}): Metadata {
	const { slug } = params

	if (!allowedSlugs.includes(slug)) {
		return {
			title: "Page Not Found",
		}
	}

	const currentData = aiAutomationData[
		slug as keyof typeof aiAutomationData
	] as any
	const heading =
		currentData?.hero?.heading ?? `${humanizeSlug(slug)} Services`
	const description =
		currentData?.hero?.subheading ??
		currentData?.introParagraph?.heading ??
		`Explore ${humanizeSlug(
			slug
		)} programmes designed by Digital Neighbour.`

	const path =
		slug === "ai-automation" ? "/ai-automation" : `/ai-automation/${slug}`

	return buildMetadata({
		title: heading,
		description,
		path,
	})
}

export default function AiAutomationSlugPage({
	params,
}: {
	params: { slug: string }
}) {
	if (!allowedSlugs.includes(params.slug)) {
		notFound()
	}

	const currentData = aiAutomationData[
		params.slug as keyof typeof aiAutomationData
	] as any

	return (
		<main>
			<div className="relative">
				<Navbar />
				<AiAutomationHero
					data={
						currentData?.hero || {
							heading: "AI & Automation Services",
							subheading: "Transform your business with intelligent automation and cutting-edge AI solutions to streamline operations and boost productivity.",
						}
					}
				/>
			</div>
			<Form data={currentData?.form} />
			<BrandsMarquee />
			<IntroParagraph data={currentData?.introParagraph} />
			<PainPoints data={currentData?.painPoints} />
			<Chaos />
			<AiAutomationServices
				data={currentData?.services}
				serviceCards={currentData?.serviceCards}
				basePath="/ai-automation"
				premiumCloudServices={
					currentData?.premiumCloudServices
				}
			/>
			<Content data={currentData?.content} imagePathPrefix="/seo/content" />
			<Apart />
			<Industries data={currentData?.industries} />
			<CaseStudy />
			<Process2
				data={currentData?.services}
				processData={
					currentData?.process ||
					aiAutomationData["ai-automation"]
						?.process
				}
			/>
			<KeyBenefits data={currentData?.keyBenefits} />
			<Features data={currentData?.features} />
	< Faq data = { currentData?.faq } />
	<OtherServices />
			<Cta data={currentData?.services} />
			<Footer />
		</main>
	)
}

