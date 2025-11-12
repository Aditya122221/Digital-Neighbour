import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site-metadata";
import dataAnalyticsData from "@/data/data-analytics.json";
import DataAnalyticsHero from "@/components/data-analytics/hero";
import Content from "@/components/commonSections/content";
import DataAnalyticsServices from "@/components/data-analytics/services";
import Form from "@/components/commonSections/form";
import Navbar from "@/components/core/navbar";
import Footer from "@/components/core/footer";
import BrandsMarquee from "@/components/homepage/brandsmarquee";
import Process2 from "@/components/homepage/process2";
import Cta from "@/components/commonSections/cta";
import OtherServices from "@/components/commonSections/otherservices";
import Faq from "@/components/commonSections/faq";
import CaseStudy from "@/components/homepage/casestudy";
import IntroParagraph from "@/components/commonSections/introparagraph";
import PainPoints from "@/components/commonSections/painpoints";
import Industries from "@/components/data-analytics/industries";
import KeyBenefits from "@/components/commonSections/keybenefits";
import Features from "@/components/commonSections/features";
import Apart from "@/components/homepage/apart";

const dataAnalyticsOverview = dataAnalyticsData["data-analytics"] as any;
const dataAnalyticsHeading =
	dataAnalyticsOverview?.hero?.heading ?? "Data & Analytics Services";
const dataAnalyticsDescription =
	dataAnalyticsOverview?.hero?.subheading ??
	"Operationalise data, analytics, and business intelligence to deliver insights, automation, and growth with Digital Neighbour.";

export const metadata: Metadata = buildMetadata({
	title: dataAnalyticsHeading,
	description: dataAnalyticsDescription,
	path: "/data-analytics",
});

export default function DataAnalyticsPage() {
  const currentData = dataAnalyticsOverview as any;

  return (
    <main>
      <div className="relative">
        <Navbar />
        <DataAnalyticsHero
          data={
            currentData?.hero || {
              heading: "Data & Analytics Services",
              subheading:
                "Transform your business with comprehensive data analytics and business intelligence solutions to unlock insights and drive growth.",
            }
          }
        />
      </div>
      <Form data={currentData?.form} />
      <BrandsMarquee />
      <IntroParagraph data={currentData?.introParagraph} />
      <PainPoints data={currentData?.painPoints} />
      <DataAnalyticsServices
        data={currentData?.services}
        serviceCards={currentData?.serviceCards}
        basePath="/data-analytics"
        premiumCloudServices={currentData?.premiumCloudServices}
      />
      <Content data={currentData?.content} imagePathPrefix="/seo/content" />
      <Apart />
      <CaseStudy />
      <Process2
        data={currentData?.services}
        processData={currentData?.process}
      />
      <KeyBenefits data={currentData?.keyBenefits} />
      <Features data={currentData?.features} />
  <Faq data={ currentData?.faq } />
  <OtherServices />
      <Cta data={currentData?.services} />
      <Footer />
    </main>
  );
}
