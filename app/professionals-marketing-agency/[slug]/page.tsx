import { notFound } from "next/navigation"
import professionalsData from "@/data/professionals-marketing.json"
import IndustriesHero from "@/components/industries/hero"
import SeoContent from "@/components/seo/content"
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
import CreativeShowcase from "@/components/industries/creative-showcase"
import HostingServices from "@/components/hosting-it-security/services"

function getServiceNameFromSlug(slug: string): string | null {
	const mapping =
		(professionalsData as any).otherServices?.slugMapping || {}
	for (const [name, mappedSlug] of Object.entries(mapping)) {
		if (mappedSlug === slug) return name as string
	}
	return null
}

const allowedSlugs: string[] = Object.values(
	((professionalsData as any).otherServices?.slugMapping as Record<
		string,
		string
	>) || {}
) as string[]

export default async function ProfessionalsMarketingServicePage({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	if (!allowedSlugs.includes(slug)) {
		notFound()
	}

	const serviceName =
		getServiceNameFromSlug(slug) || "Professionals Marketing"
	const currentData = (professionalsData as any)[slug] || {}

	const introData = currentData?.introParagraph
		? {
				heading: currentData.introParagraph.heading,
				problemStatement:
					currentData.introParagraph
						?.paragraphs?.[0],
				valueProposition:
					currentData.introParagraph
						?.paragraphs?.[1],
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
					currentData.process.content
				)
					? currentData.process.content
					: Array.isArray(
							currentData.process
								.steps
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
			<HostingServices
				data={currentData?.services}
				serviceCards={currentData?.serviceCards}
				basePath="/professionals-marketing-agency"
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
				processData={compatibleProcess}
			/>
			<KeyBenefits data={benefitsData} />
			<Features data={currentData?.features} />
			<SeoFaq data={currentData?.faq} />
			<SeoCta data={currentData?.services} />
			<Footer />
		</main>
	)
}
