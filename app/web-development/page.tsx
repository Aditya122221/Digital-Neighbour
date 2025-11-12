import React from "react"
import type { Metadata } from "next"
import { buildMetadata } from "@/lib/site-metadata"
import webDevData from "@/data/web-development.json"
import WebDevHero from "@/components/web-development/hero"
import IntroParagraph from "@/components/commonSections/introparagraph"
import PainPoints from "@/components/commonSections/painpoints"
import KeyBenefits from "@/components/commonSections/keybenefits"
import Features from "@/components/commonSections/features"
import Functionalities from "@/components/web-development/functionalities"
import Content from "@/components/commonSections/content"
import Services from "@/components/commonSections/services"
import Form from "@/components/commonSections/form"
import Navbar from "@/components/core/navbar"
import Footer from "@/components/core/footer"
import BrandsMarquee from "@/components/homepage/brandsmarquee"
import Process2 from "@/components/homepage/process2"
import Cta from "@/components/commonSections/cta"
import Industries from "@/components/web-development/industries"
import OtherServices from "@/components/commonSections/otherservices"
import Faq from "@/components/commonSections/faq"
import CaseStudy from "@/components/homepage/casestudy"

const webDevOverview = (webDevData as any)["web-development"] as any
const webDevHeading =
	webDevOverview?.hero?.heading ?? "Web Development Services"
const webDevDescription =
	webDevOverview?.hero?.subheading ??
	"Design and ship high-performing websites, web apps, and digital platforms with Digital Neighbour’s full-stack web development team."

export const metadata: Metadata = buildMetadata({
	title: webDevHeading,
	description: webDevDescription,
	path: "/web-development",
})

export default function WebDevelopmentPage() {
	const currentData = webDevOverview as any

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
				<WebDevHero
					data={
						currentData?.hero || {
							heading: "High-Performance Web Development",
							subheading: "We design, build, and scale fast, secure, and conversion-focused websites and web apps.",
						}
					}
				/>
			</div>
			<Form data={currentData?.form} />
			<BrandsMarquee />
	< IntroParagraph data = { introData } />
	<PainPoints data={painData} />
			<Functionalities />
			<Services
				data={currentData?.services}
				serviceCards={currentData?.serviceCards}
				basePath="/web-development"
					/>
	<Content data={ currentData?.content } imagePathPrefix = "/seo/content" />
		<Industries />
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
