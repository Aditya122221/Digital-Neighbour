import { notFound } from "next/navigation"
import professionalsData from "@/data/professionals-marketing.json"
import Navbar from "@/components/core/navbar"
import Footer from "@/components/core/footer"
import SeoForm from "@/components/seo/form"
import SeoFaq from "@/components/seo/faq"

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
	const faqData = (professionalsData as any)["professionals"]?.faq || {
		serviceName: serviceName,
	}

	return (
		<main>
			<div className="relative">
				<Navbar />
				<section className="relative pt-24 md:pt-32 lg:pt-40 pb-12 bg-gradient-to-br from-black via-black to-yellow">
					<div className="container mx-auto px-6 text-center">
						<h1 className="text-4xl md:text-6xl font-cal-sans font-semibold text-white">
							{serviceName}
						</h1>
						<p className="text-white/80 mt-4 max-w-2xl mx-auto">
							Tailored digital growth
							solutions for{" "}
							{serviceName.toLowerCase()}
							.
						</p>
					</div>
				</section>
			</div>
			<SeoForm
				data={
					(professionalsData as any)[
						"professionals"
					]?.form
				}
			/>
			<SeoFaq data={{ ...faqData, serviceName }} />
			<Footer />
		</main>
	)
}
