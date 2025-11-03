import dataAnalyticsData from "@/data/data-analytics.json";
import DataAnalyticsHero from "@/components/data-analytics/hero";
import SeoContent from "@/components/seo/content";
import DataAnalyticsServices from "@/components/data-analytics/services";
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
import Industries from "@/components/data-analytics/industries";
import KeyBenefits from "@/components/data-analytics/keybenefits";
import Features from "@/components/data-analytics/features";
import Apart from "@/components/homepage/apart";

export default function DataAnalyticsPage() {
  const currentData = dataAnalyticsData["data-analytics"] as any;

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
      <DataAnalyticsServices
        data={currentData?.services}
        serviceCards={currentData?.serviceCards}
        basePath="/data-analytics"
        premiumCloudServices={currentData?.premiumCloudServices}
      />
      <SeoContent data={currentData?.content} />
      <Apart />
      <CaseStudy />
      <OtherServices />
      <Process2
        data={currentData?.services}
        processData={currentData?.process}
      />
      <KeyBenefits data={currentData?.keyBenefits} />
      <Features data={currentData?.features} />
      <SeoFaq data={currentData?.faq} />
      <SeoCta data={currentData?.services} />
      <Footer />
    </main>
  );
}
