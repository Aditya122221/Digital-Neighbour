import aiAutomationData from "@/data/ai-automation.json"
import AiAutomationHero from "@/components/ai-automation/hero"
import SeoContent from "@/components/seo/content"
import AiAutomationServices from "@/components/ai-automation/services"
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
import Features from "@/components/ai-automation/features"
import Apart from "@/components/homepage/apart"

export default function AiAutomationPage() {
	const currentData = aiAutomationData["ai-automation"] as any

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
			<AiAutomationServices
				data={currentData?.services}
				serviceCards={currentData?.serviceCards}
				basePath="/ai-automation"
				premiumCloudServices={
					currentData?.premiumCloudServices
				}
			/>
			<SeoContent data={currentData?.content} />
			<Apart />
			<CaseStudy />
			<OtherServices />
			<Process2
				data={currentData?.services}
				processData={currentData?.process}
			/>
			<KeyBenefits data={currentData?.keyBenefits} />
			<Features data={currentData?.features} />
			<SeoFaq data={currentData?.faq} />
			<SeoCta data={currentData?.services} />
			<Footer />
		</main>
	)
}

