import seoData from "@/data/seo.json"
import SeoHero from "@/components/seo/hero"
import Form from "@/components/commonSections/form"
import Navbar from "@/components/core/navbar"
import Footer from "@/components/core/footer"
import BrandsMarquee from "@/components/homepage/brandsmarquee"
import IntroParagraph from "@/components/commonSections/introparagraph"
import PainPoints from "@/components/commonSections/painpoints"
import Services from "@/components/commonSections/services"
import SeoSpecialisations from "@/components/seo/specialisations"
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
import Testimonials from "@/components/homepage/testimonials"
import TestimonalTwo from "@/components/homepage/testimonalTwo"
import BookACall from "@/components/homepage/bookacall"

const seoOverview = (seoData as any)["search-engine-optimisation"] as any

export default function SeoOverviewPage() {
	const specialisations = seoOverview?.specialisations || []

	return (
		<main>
			<div className="relative">
				<Navbar />
				<SeoHero
					data={
						seoOverview?.hero || {
							heading: "Award-Winning SEO Marketing Agency",
							subheading:
								"We've helped leading and emerging brands scale their traffic and revenue organically for over a decade with our experience in seo consulting.",
						}
					}
				/>
			</div>
			<Form data={seoOverview?.form} />
			<BrandsMarquee />
			<IntroParagraph data={seoOverview?.introParagraph} />
			<PainPoints data={seoOverview?.painPoints} />
			<Services
				data={seoOverview?.services}
				serviceCards={seoOverview?.serviceCards}
				basePath="/seo"
			/>
			<Content data={seoOverview?.content} imagePathPrefix="/seo/content" />
			<Cta data={seoOverview?.services} />
			<Apart />
			<Process2 data={seoOverview?.services} processData={seoOverview?.process} />
			<KeyBenefits data={seoOverview?.keyBenefits} />
			<Features data={seoOverview?.features} />
			<CaseStudy />
			<Faq data={seoOverview?.faq} />
			<OtherServices />
			<Blogs />
			<TestimonalTwo />
			<BookACall />
			<Footer />
		</main>
	)
}


