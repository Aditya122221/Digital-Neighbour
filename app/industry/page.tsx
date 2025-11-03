import industriesData from "@/data/industries.json"
import IndustriesHero from "@/components/industries/hero"
import SeoContent from "@/components/seo/content"
import DataAnalyticsServices from "@/components/data-analytics/services"
import SeoForm from "@/components/seo/form"
import Navbar from "@/components/core/navbar"
import Footer from "@/components/core/footer"
import BrandsMarquee from "@/components/homepage/brandsmarquee"
import Process2 from "@/components/homepage/process2"
import SeoCta from "@/components/seo/cta"
import OtherServices from "@/components/seo/otherservices"
import SeoFaq from "@/components/seo/faq"
import CaseStudy from "@/components/homepage/casestudy"
import IntroParagraph from "@/components/data-analytics/introparagraph"
import PainPoints from "@/components/data-analytics/painpoints"
import KeyBenefits from "@/components/data-analytics/keybenefits"
import Features from "@/components/ai-automation/features"
import Apart from "@/components/homepage/apart"
import IndustryBrowserSection from "@/components/industries/industry-browser"
import CreativeShowcase from "@/components/industries/creative-showcase"

export default function IndustryPage() {
	const currentData = industriesData["industries"] as any
	const introData = currentData?.introParagraph
		? {
				heading: currentData.introParagraph.heading,
				problemStatement:
					currentData.introParagraph
						.paragraphs?.[0],
				valueProposition:
					currentData.introParagraph
						.paragraphs?.[1],
		  }
		: undefined
	const painData = currentData?.painPoints
		? {
				heading: currentData.painPoints.heading,
				subheading: currentData.painPoints.subheading,
				painPoints: (
					currentData.painPoints.items || []
				).map((p: any) => ({
					problem: p.title,
					solution: p.description,
				})),
		  }
		: undefined
	const benefitsData = currentData?.keyBenefits
		? {
				heading: currentData.keyBenefits.heading,
				subheading: currentData.keyBenefits.subheading,
				benefits: (
					currentData.keyBenefits.items || []
				).map((b: any) => ({
					title: b.title,
					description: b.description,
					icon: b.icon,
					image: b.image,
				})),
		  }
		: undefined
	const compatibleProcess = currentData?.process
		? {
				steps: Array.isArray(currentData.process.steps)
					? currentData.process.steps.map(
							(s: any) =>
								typeof s ===
								"string"
									? s
									: s.title
					  )
					: [],
				content: Array.isArray(
					currentData.process.steps
				)
					? currentData.process.steps.map(
							(s: any) =>
								typeof s ===
								"string"
									? ""
									: s.description ||
									  ""
					  )
					: [],
		  }
		: undefined

	return (
		<main>
			<div className="relative">
				<Navbar />
				<IndustriesHero data={currentData?.hero} />
			</div>
			<SeoForm data={currentData?.form} />
			<BrandsMarquee />
			<IntroParagraph data={introData} />
			<PainPoints data={painData} />
			<IndustryBrowserSection />
    <SeoContent data={ currentData?.content } />
    <CreativeShowcase speedMsPerLoop={3000} />
			<Apart />
			<CaseStudy />
			<OtherServices />
			<Process2
				data={"industries"}
				processData={compatibleProcess}
			/>
			<KeyBenefits data={benefitsData} />
			<Features data={currentData?.features} />
			<SeoFaq
				data={(industriesData as any).industries?.faq}
			/>
			<SeoCta data={"industries"} />
			<Footer />
		</main>
	)
}
