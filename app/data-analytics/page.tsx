import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/site-metadata";
import { getDataAnalyticsServiceBySlug } from "@/lib/sanity-service-data";
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

// Force dynamic rendering to always fetch fresh data from Sanity
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const dataAnalyticsOverview =
    await getDataAnalyticsServiceBySlug("data-analytics");
  const dataAnalyticsHeading =
    dataAnalyticsOverview?.hero?.heading ?? "Data & Analytics Services";
  const dataAnalyticsDescription =
    dataAnalyticsOverview?.hero?.subheading ??
    "Operationalise data, analytics, and business intelligence to deliver insights, automation, and growth with Digital Neighbour.";

  return buildMetadata({
    title: dataAnalyticsHeading,
    description: dataAnalyticsDescription,
    path: "/data-analytics",
  });
}

export default async function DataAnalyticsPage() {
  const currentData = await getDataAnalyticsServiceBySlug("data-analytics");

  if (!currentData) {
    notFound();
  }

  const defaultHeroImages = currentData?.hero?.defaultHeroImages || null;

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
          defaultImages={defaultHeroImages}
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
      <Faq data={currentData?.faq} />
      <OtherServices />
      <Cta data={currentData?.services} />
      <Footer />
    </main>
  );
}
