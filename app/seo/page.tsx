import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { buildMetadata } from "@/lib/site-metadata"
import { loadSeoPageData } from "@/lib/seo-page-data"
import SeoHero from "@/components/seo/hero"
import Form from "@/components/commonSections/form"
import Navbar from "@/components/core/navbar"
import Footer from "@/components/core/footer"
import BrandsMarquee from "@/components/homepage/brandsmarquee"
import IntroParagraph from "@/components/commonSections/introparagraph"
import PainPoints from "@/components/commonSections/painpoints"
import Services from "@/components/commonSections/services"
import Content from "@/components/commonSections/content"
import Cta from "@/components/commonSections/cta"
import Apart from "@/components/homepage/apart"
import Process2 from "@/components/homepage/process2"
import KeyBenefits from "@/components/commonSections/keybenefits"
import Features from "@/components/commonSections/features"
import CaseStudy from "@/components/homepage/casestudy"
import Faq from "@/components/commonSections/faq"
import OtherServices from "@/components/commonSections/otherservices"
import Blogs from "@/components/homepage/blogs"
import TestimonalTwo from "@/components/homepage/testimonalTwo"
import BookACall from "@/components/homepage/bookacall"

// Force dynamic rendering to always fetch fresh data from Sanity
export const dynamic = "force-dynamic"
export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> {
	const seoOverview = await loadSeoPageData("seo")

	const overviewHeading = seoOverview?.hero?.heading ?? "SEO Services"
	const overviewDescription =
		seoOverview?.hero?.subheading ??
		"Grow organic visibility, traffic, and revenue with full-funnel SEO programmes built for ambitious brands."

	return buildMetadata({
		title: overviewHeading,
		description: overviewDescription,
		path: "/seo",
	})
}

export default async function SeoOverviewPage() {
	const seoOverview = await loadSeoPageData("seo")

	if (!seoOverview) {
		notFound()
	}

	return (
		<main>
			<div className="relative">
				<Navbar />
				<SeoHero data={seoOverview.hero} />
			</div>
			<Form data={seoOverview.form} />
			<BrandsMarquee />
			<IntroParagraph data={seoOverview.introParagraph} />
			<PainPoints data={seoOverview.painPoints} />
			<Services
				data={seoOverview.services}
				serviceCards={seoOverview.serviceCards}
				basePath="/seo"
			/>
			<Content
				data={seoOverview.content}
				imagePathPrefix="/seo/content"
			/>
			<Cta data={seoOverview.services} />
			<Apart />
			<Process2
				data={seoOverview.services}
				processData={seoOverview.process}
			/>
			<KeyBenefits data={seoOverview.keyBenefits} />
			<Features data={seoOverview.features} />
			<CaseStudy />
			<Faq data={seoOverview.faq} />
			<OtherServices />
			<TestimonalTwo />
			<BookACall />
			<Blogs />
			<Footer />
		</main>
	)
}
