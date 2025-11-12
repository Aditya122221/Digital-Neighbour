import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site-metadata";
import paidAdsData from "@/data/paid-ads.json";
import PaidAdsHero from "@/components/paid-ads/hero";
import Strategic from "@/components/paid-ads/strategic";
import Content from "@/components/commonSections/content";
import Services from "@/components/commonSections/services";
import Form from "@/components/commonSections/form";
import Navbar from "@/components/core/navbar";
import Footer from "@/components/core/footer";
import BrandsMarquee from "@/components/homepage/brandsmarquee";
import Process2 from "@/components/homepage/process2";
import Cta from "@/components/commonSections/cta";
import Apart from "@/components/homepage/apart";
import OtherServices from "@/components/commonSections/otherservices";
import Faq from "@/components/commonSections/faq";
import CaseStudy from "@/components/homepage/casestudy";
import IntroParagraph from "@/components/commonSections/introparagraph";
import PainPoints from "@/components/commonSections/painpoints";
import KeyBenefits from "@/components/commonSections/keybenefits";
import Features from "@/components/commonSections/features";

const paidAdsOverview = paidAdsData["paid-advertisement"] as any;
const paidAdsHeading =
	paidAdsOverview?.hero?.heading ?? "Paid Advertising Services";
const paidAdsDescription =
	paidAdsOverview?.hero?.subheading ??
	"Launch and optimise high-ROI paid media programmes across Google, Meta, LinkedIn, and YouTube with Digital Neighbour.";

export const metadata: Metadata = buildMetadata({
	title: paidAdsHeading,
	description: paidAdsDescription,
	path: "/paid-advertisement",
});

export default function PaidAdvertisementPage() {
  const currentData = paidAdsOverview as any;

  return (
    <main>
      <div className="relative">
        <Navbar />
        <PaidAdsHero data={currentData?.hero || { heading: "Performance-Driven Paid Advertising", subheading: "We scale profitable paid media across Google, Meta, LinkedIn, and YouTube." }} />
      </div>
      <Form data={currentData?.form} />
        <BrandsMarquee />
        <IntroParagraph data={currentData?.introparagraph} />
      <PainPoints data={currentData?.painpoints} />
      <Services data={currentData?.services} serviceCards={currentData?.serviceCards} basePath="/paid-advertisement" />
  <Strategic data={ currentData?.strategic } serviceName = { currentData?.services } />
  <Content data={ currentData?.content } imagePathPrefix = "/seo/content" />
    <Apart />
    < CaseStudy />
    <Process2 data={currentData?.services} processData={currentData?.process} />
      <KeyBenefits data={currentData?.keybenefits} />
  < Features data = { currentData?.features } />
  <Faq data={currentData?.faq} />
      <OtherServices />
      <Cta data={currentData?.services} />
      <Footer />
    </main>
  );
}

