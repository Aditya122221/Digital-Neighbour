import type { Metadata } from "next"
import { buildMetadata } from "@/lib/site-metadata"
import contentMarketingData from "@/data/content-marketing.json"
import ContentMarketingHero from "@/components/content-marketing/hero"
import IntroParagraph from "@/components/commonSections/introparagraph"
import PainPoints from "@/components/commonSections/painpoints"
import KeyBenefits from "@/components/commonSections/keybenefits"
import Features from "@/components/commonSections/features"
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

const contentOverview = contentMarketingData["content-marketing"] as any
const contentHeading =
	contentOverview?.hero?.heading ?? "Content Marketing Services"
const contentDescription =
	contentOverview?.hero?.subheading ??
	"Plan, create, and distribute high-performing content that builds authority and converts with Digital Neighbour’s content marketing team."

export const metadata: Metadata = buildMetadata({
	title: contentHeading,
	description: contentDescription,
	path: "/content-marketing",
})

export default function ContentMarketingPage() {
	const currentData = contentOverview as any

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

	return (
		<main>
			<div className="relative">
				<Navbar />
				<ContentMarketingHero
					data={
						currentData?.hero || {
							heading: "Strategic Content Marketing",
							subheading: "We create compelling content that drives engagement, builds authority, and converts visitors into customers.",
						}
					}
				/>
			</div>
			<Form data={currentData?.form} />
			<BrandsMarquee />
  < IntroParagraph data = { introData } />
  <PainPoints data={ painData } />
    <Apart />
    < CaseStudy />
    <Process2
				data={currentData?.services}
				processData={currentData?.process}
          />
          <Content
  data={currentData?.content}
  imagePathPrefix="/seo/content"
    />
    < KeyBenefits data = { benefitsData } />
  <Features data={ currentData?.features } />
  <Faq data={currentData?.faq} />
			<OtherServices />
			<Cta data={currentData?.services} />
			<Footer />
		</main>
	)
}
