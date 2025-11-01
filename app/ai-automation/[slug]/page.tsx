import { notFound } from "next/navigation"
import aiAutomationData from "@/data/ai-automation.json"
import AiAutomationHero from "@/components/ai-automation/hero"
import SeoContent from "@/components/seo/content"
import SeoServices from "@/components/seo/services"
import SeoForm from "@/components/seo/form"
import Navbar from "@/components/core/navbar"
import Footer from "@/components/core/footer"
import BrandsMarquee from "@/components/homepage/brandsmarquee"
import Process2 from "@/components/homepage/process2"
import SeoCta from "@/components/seo/cta"
import OtherServices from "@/components/seo/otherservices"
import SeoFaq from "@/components/seo/faq"
import CaseStudy from "@/components/homepage/casestudy"
import IntroParagraph from "@/components/ai-automation/introparagraph"
import PainPoints from "@/components/ai-automation/painpoints"
import KeyBenefits from "@/components/ai-automation/keybenefits"
import Apart from "@/components/homepage/apart"

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
			<SeoForm data={currentData?.form} />
			<BrandsMarquee />
			<IntroParagraph data={currentData?.introParagraph} />
			<PainPoints data={currentData?.painPoints} />
			<SeoServices
				data={currentData?.services}
				serviceCards={currentData?.serviceCards}
				basePath="/ai-automation"
			/>
			<SeoContent data={currentData?.content} />
			<Apart />
			<CaseStudy />
			<OtherServices />
			<Process2
				data={currentData?.services}
				processData={
					currentData?.process ||
					aiAutomationData["ai-automation"]
						?.process
				}
			/>
			<KeyBenefits data={currentData?.keyBenefits} />
			<div>
				Feature Section: Show 3–5 key benefits or
				outcomes of the service (not just features),
				each explained in a short block with a clear
				headline and visual support.
			</div>
			<SeoFaq data={currentData?.faq} />
			<SeoCta data={currentData?.services} />
			<Footer />
		</main>
	)
}

