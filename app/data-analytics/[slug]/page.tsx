import { notFound } from "next/navigation";
import dataAnalyticsData from "@/data/data-analytics.json";
import DataAnalyticsHero from "@/components/data-analytics/hero";
import SeoContent from "@/components/seo/content";
import SeoServices from "@/components/seo/services";
import SeoForm from "@/components/seo/form";
import Navbar from "@/components/core/navbar";
import Footer from "@/components/core/footer";
import BrandsMarquee from "@/components/homepage/brandsmarquee";
import Process2 from "@/components/homepage/process2";
import SeoCta from "@/components/seo/cta";
import OtherServices from "@/components/seo/otherservices";
import SeoFaq from "@/components/seo/faq";
import CaseStudy from "@/components/homepage/casestudy";
import IntroParagraph from "@/components/data-analytics/introparagraph";
import PainPoints from "@/components/data-analytics/painpoints";
import KeyBenefits from "@/components/data-analytics/keybenefits";
import Apart from "@/components/homepage/apart";

const allowedSlugs = [
  "data-analytics",
  "business-intelligence",
  "data-integration",
  "data-warehousing",
  "predictive-analytics",
  "data-visualization",
  "reporting-automation",
  "data-governance",
  "customer-analytics",
  "operational-analytics",
  "financial-analytics",
];

export default function DataAnalyticsSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!allowedSlugs.includes(params.slug)) {
    notFound();
  }

  const currentData = dataAnalyticsData[
    params.slug as keyof typeof dataAnalyticsData
  ] as any;

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
      <SeoForm data={currentData?.form} />
      <BrandsMarquee />
      <IntroParagraph data={currentData?.introParagraph} />
      <PainPoints data={currentData?.painPoints} />
      <SeoServices
        data={currentData?.services}
        serviceCards={currentData?.serviceCards}
        basePath="/data-analytics"
      />
      <SeoContent data={currentData?.content} />
      <Apart />
      <CaseStudy />
      <OtherServices />
      <Process2
        data={currentData?.services}
        processData={
          currentData?.process || dataAnalyticsData["data-analytics"]?.process
        }
      />
      <KeyBenefits data={currentData?.keyBenefits} />
      <div>
        Feature Section: Show 3–5 key benefits or outcomes of the service (not
        just features), each explained in a short block with a clear headline
        and visual support.
      </div>
      <SeoFaq data={currentData?.faq} />
      <SeoCta data={currentData?.services} />
      <Footer />
    </main>
  );
}
