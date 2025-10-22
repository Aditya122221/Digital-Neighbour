import { notFound } from "next/navigation";
import paidAdsData from "@/data/paid-ads.json";
import PaidAdsHero from "@/components/paid-ads/hero";
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
import Blogs from "@/components/homepage/blogs";
import Testimonials from "@/components/homepage/testimonials";

const allowedSlugs = [
  "paid-advertisement",
  "google-ads",
  "google-remarketing",
  "google-shopping",
  "paid-social",
  "youtube-ads",
];

export default function PaidAdsSlugPage({ params }: { params: { slug: string } }) {
  if (!allowedSlugs.includes(params.slug)) {
    notFound();
  }

  const currentData = paidAdsData[params.slug as keyof typeof paidAdsData];

  return (
    <main>
      <div className="relative">
        <Navbar />
        <PaidAdsHero data={currentData?.hero || { heading: "Performance-Driven Paid Advertising", subheading: "We scale profitable paid media across Google, Meta, LinkedIn, and YouTube." }} />
      </div>
      <SeoForm data={currentData?.form} />
      <BrandsMarquee />
      <SeoServices data={currentData?.services} serviceCards={currentData?.serviceCards} basePath="/paid-advertisement" />
      <Process2 data={currentData?.services} />
      <SeoContent data={currentData?.content} />
      <SeoCta data={currentData?.services} />
      <Apart />
      <OtherServices />
      <CaseStudy />
      <SeoFaq data={currentData?.faq} />
      <Blogs />
      <Testimonials />
      <Footer />
    </main>
  );
}


