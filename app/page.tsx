import type { Metadata } from "next"
import { buildMetadata } from "@/lib/site-metadata"
// import Hero from "@/components/homepage/hero"
// import Banner from "@/components/homepage/banner"
import BrandsMarquee from "@/components/homepage/brandsmarquee"
import BrandInfo from "@/components/homepage/brandInfo"
import Services from "@/components/homepage/services"
import KeepYourStack from "@/components/homepage/keepyourstack"
import CaseStudy from "@/components/homepage/casestudy"
import FeatureSection from "@/components/homepage/contentSection"
import Blogs from "@/components/homepage/blogs"
import TestimonalTwo from "@/components/homepage/testimonalTwo"
import BookACall from "@/components/homepage/bookacall"
import Footer from "@/components/core/footer"
import Navbar from "@/components/core/navbar"
// import Process from "@/components/homepage/process"
import Apart from "@/components/homepage/apart"
import Process2 from "@/components/homepage/process2"
// import RevealCursor from "@/components/homepage/revealcursor"
import Form from "@/components/commonSections/form"
import HeroSix from "@/components/homepage/herosix"
//mport Hero5 from "@/components/homepage/hero4"
import homeData from "@/data/home.json"

export const metadata: Metadata = buildMetadata({
	title: "Growth Marketing & Digital Experience Agency",
	description:
		"Digital Neighbour blends strategy, creativity, and technology to deliver end-to-end marketing, product, and growth programs that scale ambitious brands.",
	path: "/",
})

export default function HomePage() {
	return (
		<main>
			<div className="relative">
				<Navbar />
				<HeroSix data={homeData.hero} />
				{/* <Hero5 /> */}
			</div>
			{/* <Banner /> */}
			<BrandsMarquee />
			<BrandInfo data={homeData.brandInfo} />
			{/* <RevealCursor /> */}
			<Services data={homeData.services} />
			<KeepYourStack data={homeData.keepYourStack} />
			<CaseStudy data={homeData.caseStudies} />
			<FeatureSection data={homeData.contentSection} />
			<Apart data={homeData.apart} />
			<TestimonalTwo />
			<Process2
				data={homeData.process?.label}
				processData={homeData.process}
			/>
			<Blogs />
			<BookACall />
			<Footer />
		</main>
	)
}
