import { notFound } from "next/navigation";
import androidData from "@/data/android.json";
import SeoHero from "@/components/seo/hero";
import SeoContent from "@/components/seo/content";
import SeoServices from "@/components/seo/services";
import SeoForm from "@/components/seo/form";
import Navbar from "@/components/core/navbar";
import Footer from "@/components/core/footer";
import BrandsMarquee from "@/components/homepage/brandsmarquee";
import Process2 from "@/components/homepage/process2";
import SeoCta from "@/components/seo/cta";
import Apart from "@/components/homepage/apart";
import OtherServices from "@/components/seo/otherservices";
import SeoFaq from "@/components/seo/faq";
import CaseStudy from "@/components/homepage/casestudy";

const allowedSlugs = [
	"android-development",
	"native-android",
	"kotlin-development",
	"java-android-development",
	"react-native-android",
	"flutter-android",
];

export default function AndroidDevSlugPage({ params }: { params: { slug: string } }) {
	if (!allowedSlugs.includes(params.slug)) {
		notFound();
	}

	const currentData = androidData[params.slug as keyof typeof androidData] as any;

	return (
		<main>
			<div className="relative">
				<Navbar />
				<SeoHero data={currentData?.hero || { heading: "Android App Development Agency", subheading: "We design, build, and scale high‑performance Android apps with modern stacks and robust UX." }} />
			</div>
			<SeoForm data={currentData?.form} />
			<BrandsMarquee />
			<SeoServices data={currentData?.services} serviceCards={currentData?.serviceCards} basePath="/android-development" />
			<Process2 data={currentData?.services} processData={currentData?.process} />
			<SeoContent data={currentData?.content} />
			<SeoCta data={currentData?.services} />
			<Apart />
			<OtherServices />
			<CaseStudy />
			<SeoFaq data={currentData?.faq} />
			<Footer />
		</main>
	);
}


