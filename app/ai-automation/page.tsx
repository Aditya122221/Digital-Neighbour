import type { Metadata } from "next"
import { buildMetadata } from "@/lib/site-metadata"
import aiAutomationData from "@/data/ai-automation.json"
import AiAutomationHero from "@/components/ai-automation/hero"
import Content from "@/components/commonSections/content"
import AiAutomationServices from "@/components/ai-automation/services"
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
import Chaos from "@/components/ai-automation/chaos"
import Industries from "@/components/ai-automation/industries"
import KeyBenefits from "@/components/commonSections/keybenefits"
import Features from "@/components/commonSections/features"
import Apart from "@/components/homepage/apart"

const aiAutomationOverview = aiAutomationData["ai-automation"] as any
const aiAutomationHeading =
	aiAutomationOverview?.hero?.heading ?? "AI & Automation Services"
const aiAutomationDescription =
	aiAutomationOverview?.hero?.subheading ??
	"Deploy intelligent automation, machine learning, and AI assistants that streamline operations, unlock insights, and drive innovation."

export const metadata: Metadata = buildMetadata({
	title: aiAutomationHeading,
	description: aiAutomationDescription,
	path: "/ai-automation",
})

export default function AiAutomationPage() {
	const currentData = aiAutomationOverview as any

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
				processData={currentData?.process}
			/>
			<KeyBenefits data={currentData?.keyBenefits} />
			<Features data={currentData?.features} />
	<Faq data={ currentData?.faq } />
	<OtherServices />
			<Cta data={currentData?.services} />
			<Footer />
		</main>
	)
}
