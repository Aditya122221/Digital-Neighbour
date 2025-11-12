import type { Metadata } from "next"
import { buildMetadata } from "@/lib/site-metadata"
import socialData from "@/data/social-media.json"
import SocialMediaHero from "@/components/social-media/hero"
import IntroParagraph from "@/components/commonSections/introparagraph"
import PainPoints from "@/components/commonSections/painpoints"
import SectionPainPoint from "@/components/social-media/painpoints"
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
import WhyWork from "@/components/social-media/whywork"

const socialOverview = (socialData as any)["social-media-marketing"] as any
const socialHeading =
	socialOverview?.hero?.heading ??
	"Social Media Marketing that Drives Growth"
const socialDescription =
	socialOverview?.hero?.subheading ??
	"Plan, create, and optimise social media programmes that grow community, engagement, and demand across Meta, LinkedIn, TikTok, and more."

export const metadata: Metadata = buildMetadata({
	title: socialHeading,
	description: socialDescription,
	path: "/social-media-marketing",
})

export default function SocialMediaMarketingPage() {
	const currentData = socialOverview as any
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
	const painData = currentData?.painpoints
		? {
				heading: currentData.painpoints.heading,
				subheading: currentData.painpoints.subheading,
				painPoints: (
					currentData.painpoints.items || []
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
				<SocialMediaHero
					data={
						currentData?.hero || {
							heading: "Social Media Marketing that Drives Growth",
							subheading: "Strategic content, community marketing, and insights for Meta, LinkedIn, TikTok, and more.",
							ctaText: "Market My Brand",
						}
					}
				/>
			</div>
			<Form data={currentData?.form} />
			<BrandsMarquee />
			<IntroParagraph data={introData} />
			<PainPoints data={painData} />
			<Services
				data={currentData?.services}
				serviceCards={currentData?.serviceCards}
				basePath="/social-media-marketing"
			/>
			<Content
				data={currentData?.content}
				imagePathPrefix="/seo/content"
			/>
					<SectionPainPoint />
					<WhyWork />
          <CaseStudy />
			<Process2
				data={currentData?.services}
				processData={currentData?.process}
          />
          <KeyBenefits data={benefitsData} />
  < Features data = { currentData?.features } />
  <Faq data={currentData?.faq} />
			<OtherServices />
			<Cta data={currentData?.services} />
			<Footer />
		</main>
	)
}
