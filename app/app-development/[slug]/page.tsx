import { notFound } from "next/navigation"
import appDevData from "@/data/app-development.json"
import AppDevHero from "@/components/app-development/hero"
import Certificates from "@/components/app-development/certificates"
import SeoContent from "@/components/seo/content"
import SeoServices from "@/components/seo/services"
import SeoForm from "@/components/seo/form"
import Navbar from "@/components/core/navbar"
import Footer from "@/components/core/footer"
import BrandsMarquee from "@/components/homepage/brandsmarquee"
import Process2 from "@/components/homepage/process2"
import SeoCta from "@/components/seo/cta"
import Apart from "@/components/homepage/apart"
import OtherServices from "@/components/seo/otherservices"
import SeoFaq from "@/components/seo/faq"
import CaseStudy from "@/components/homepage/casestudy"
import Blogs from "@/components/homepage/blogs"
import Testimonials from "@/components/homepage/testimonials"
import BookACall from "@/components/homepage/bookacall"

const allowedSlugs = [
	"app-development",
	"ios-app-development",
	"android-app-development",
	"react-native-development",
	"flutter-development",
	"software-development",
	"progressive-web-apps",
]

export default function AppDevSlugPage({
	params,
}: {
	params: { slug: string }
}) {
	if (!allowedSlugs.includes(params.slug)) {
		notFound()
	}

	const currentData = appDevData[
		params.slug as keyof typeof appDevData
	] as any

	return (
		<main>
			<div className="relative">
				<Navbar />
				<AppDevHero
					data={
						currentData?.hero || {
							heading: "Mobile App Development Services",
							subheading: "Design, build, and scale high-performance mobile apps for iOS, Android, and cross-platform platforms.",
						}
					}
				/>
			</div>
			<SeoForm data={currentData?.form} />
			<BrandsMarquee />
			<div>
				Content Section: Intro Paragraph (Problem
				Identification + Value Proposition)
			</div>
			<div>
				Content Section: Briefly highlight the client's
				main pain point and immediately show how our
				service solves it — make them feel understood
				and confident we can deliver results.
			</div>
			<SeoServices
				data={currentData?.services}
				serviceCards={currentData?.serviceCards}
				basePath="/app-development"
			/>
			<SeoContent data={currentData?.content} />
			<CaseStudy />
			<Certificates data={currentData?.certificates} />
			<OtherServices />
			<Process2
				data={currentData?.services}
				processData={
					currentData?.process ||
					appDevData["app-development"]?.process
				}
			/>
			<div>
				Content Section: Show 3–5 key benefits or
				outcomes of the service (not just features),
				each explained in a short block with a clear
				headline and visual support.
			</div>
			<SeoFaq data={currentData?.faq} />
			<SeoCta data={currentData?.services} />
			<Footer />
		</main>
	)
}
