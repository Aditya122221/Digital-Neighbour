import { notFound } from "next/navigation"
import hostingData from "@/data/hosting-it-security.json"
import HostingHero from "@/components/hosting-it-security/hero"
import SeoContent from "@/components/seo/content"
import SeoServices from "@/components/seo/services"
import SeoForm from "@/components/seo/form"
import Navbar from "@/components/core/navbar"
import Footer from "@/components/core/footer"
import BrandsMarquee from "@/components/homepage/brandsmarquee"
import Process2 from "@/components/homepage/process2"
import SeoCta from "@/components/seo/cta"
import OtherServices from "@/components/seo/otherservices"
import SeoFaq from "@/components/seo/faq"
import CaseStudy from "@/components/homepage/casestudy"
import IntroParagraph from "@/components/hosting-it-security/introparagraph"
import PainPoints from "@/components/hosting-it-security/painpoints"
import KeyBenefits from "@/components/hosting-it-security/keybenefits"
import Apart from "@/components/homepage/apart"
import HostingServices from "@/components/hosting-it-security/services"
import Features from "@/components/ai-automation/features"

const allowedSlugs = [
	"hosting-it-security",
	"web-hosting",
	"wordpress-hosting",
	"email-hosting",
	"reseller-hosting",
	"ecommerce-hosting",
	"dedicated-servers",
	"windows-virtual-servers",
	"linux-servers",
	"vps",
	"shared-hosting-services",
	"cloud-hosting-and-management",
	"dedicated-hosting-services",
	"aws-hosting-solutions",
	"data-migration",
	"website-security",
	"ssl-certificate-setup",
	"web-application-firewall-setup",
	"malware-removal-services",
	"web-maintenance",
]

export default function HostingItSecuritySlugPage({
	params,
}: {
	params: { slug: string }
}) {
	if (!allowedSlugs.includes(params.slug)) {
		notFound()
	}

	const currentData = hostingData[
		params.slug as keyof typeof hostingData
	] as any

	return (
		<main>
			<div className="relative">
				<Navbar />
				<HostingHero
					data={
						currentData?.hero || {
							heading: "Hosting, IT & Security Services",
							subheading: "Reliable hosting solutions and comprehensive IT security services to keep your business online, secure, and running smoothly.",
						}
					}
				/>
			</div>
			<SeoForm data={currentData?.form} />
			<BrandsMarquee />
			<IntroParagraph data={currentData?.introParagraph} />
			<PainPoints data={currentData?.painPoints} />
			<HostingServices
				data={currentData?.services}
				serviceCards={currentData?.serviceCards}
				basePath="/hosting-it-security"
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
				processData={
					currentData?.process ||
					hostingData["hosting-it-security"]
						?.process
				}
			/>
			<KeyBenefits data={currentData?.keyBenefits} />
			<Features data={currentData?.features} />
			<SeoFaq data={currentData?.faq} />
			<SeoCta data={currentData?.services} />
			<Footer />
		</main>
	)
}
