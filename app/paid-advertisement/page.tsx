import paidAdsData from "@/data/paid-ads.json";
import PaidAdsHero from "@/components/paid-ads/hero";
import Strategic from "@/components/paid-ads/strategic";
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

export default function PaidAdvertisementPage() {
  const currentData = paidAdsData["paid-advertisement"] as any;

  return (
    <main>
      <div className="relative">
        <Navbar />
        <PaidAdsHero data={currentData?.hero || { heading: "Performance-Driven Paid Advertising", subheading: "We scale profitable paid media across Google, Meta, LinkedIn, and YouTube." }} />
      </div>
      <SeoForm data={currentData?.form} />
      <BrandsMarquee />
    < SeoServices data = { currentData?.services } serviceCards = { currentData?.serviceCards } basePath = "/paid-advertisement" />
        <Strategic data={currentData?.strategic} serviceName={currentData?.services} />
        <SeoContent data={currentData?.content} />
      <Process2 data={currentData?.services} processData={currentData?.process} />
          <Apart />
          <CaseStudy />
      <OtherServices />
    < SeoFaq data = { currentData?.faq } />
    <SeoCta data={currentData?.services} />
      <Footer />
    </main>
  );
}

