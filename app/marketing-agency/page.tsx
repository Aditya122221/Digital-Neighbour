import type { Metadata } from "next"
import { buildMetadata } from "@/lib/site-metadata"
import MarketingHero from "@/components/marketing/hero"
import BrandsMarquee from "@/components/homepage/brandsmarquee"
import Navbar from "@/components/core/navbar"
import Form from "@/components/commonSections/form"
import IntroParagraph from "@/components/commonSections/introparagraph"
import PainPoints from "@/components/commonSections/painpoints"
import Services from "@/components/homepage/services"
import Cta from "@/components/commonSections/cta"
import Apart from "@/components/homepage/apart"
import HowFast from "@/components/marketing/howfast"
import Process2 from "@/components/homepage/process2"
import KeyBenefits from "@/components/commonSections/keybenefits"
import Features from "@/components/commonSections/features"
import CaseStudy from "@/components/homepage/casestudy"
import Faq from "@/components/commonSections/faq"
import OtherServices from "@/components/commonSections/otherservices"
import Footer from "@/components/core/footer"
import marketingAgencyData from "@/data/marketing-agency.json"

const marketingData = (marketingAgencyData as any)["marketing-agency"] as any

const keyBenefitsData = marketingData?.keyBenefits
	? {
			heading: marketingData.keyBenefits.heading,
			subheading: marketingData.keyBenefits.subheading,
			benefits: (marketingData.keyBenefits.items || []).map(
				(item: any) => ({
					title: item.title,
					description: item.description,
					icon: item.icon,
					image: item.image,
				})
			),
	  }
: undefined

const marketingHeading =
	marketingData?.hero?.heading ?? "Full-Service Marketing Agency"
const marketingDescription =
	marketingData?.hero?.subheading ??
	"Partner with Digital Neighbour to deliver brand, demand, and digital programs that compound growth across every channel."

export const metadata: Metadata = buildMetadata({
	title: marketingHeading,
	description: marketingDescription,
	path: "/marketing-agency",
})

export default function MarketingAgencyPage() {
	return (
		<main>
			<div className="relative">
				<Navbar />
				<MarketingHero data={marketingData?.hero} />
			</div>
    < Form data = { marketingData?.form } />
        <Services />
			<IntroParagraph data={marketingData?.introParagraph} />
    < PainPoints data = { marketingData?.painPoints } />
    <Apart />
    < BrandsMarquee />
    <HowFast />
    <Process2
    data={marketingData?.services}
    processData={marketingData?.process}
  />
  <KeyBenefits data={keyBenefitsData} />
  <Features data={marketingData?.features} />
  <CaseStudy />
    < Faq data = { marketingData?.faq } />
    <OtherServices />
			<Cta data={marketingData?.services} />
			<Footer />
		</main>
	)
}
