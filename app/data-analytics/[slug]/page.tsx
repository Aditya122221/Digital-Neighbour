import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata, humanizeSlug } from "@/lib/site-metadata";
import { getDataAnalyticsServiceBySlug } from "@/lib/sanity-service-data";
import DataAnalyticsHero from "@/components/data-analytics/hero";
import Content from "@/components/commonSections/content";
import Services from "@/components/commonSections/services";
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
import KeyBenefits from "@/components/commonSections/keybenefits";
import Apart from "@/components/homepage/apart";
import Features from "@/components/commonSections/features";
import DataAnalyticsServices from "@/components/data-analytics/services";

const allowedSlugs = [
  "data-analytics",
  "reporting-and-dashboards",
  "conversion-rate-optimization",
  "call-tracking",
  "google-analytics",
  "google-tag-manager",
];

// Force dynamic rendering to always fetch fresh data from Sanity
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;

  if (!allowedSlugs.includes(slug)) {
    return {
      title: "Page Not Found",
    };
  }

  // Fetch from Sanity
  const currentData = await getDataAnalyticsServiceBySlug(slug);
  if (!currentData) {
    return {
      title: "Page Not Found",
    };
  }

  const heading =
    currentData?.metadata ??
    currentData?.hero?.heading ??
    `${humanizeSlug(slug)} Services`;
  const description =
    currentData?.description ??
    currentData?.hero?.subheading ??
    currentData?.introParagraph?.heading ??
    `Unlock insights with Digital Neighbour's ${humanizeSlug(
      slug,
    ).toLowerCase()} expertise.`;

  const path =
    slug === "data-analytics" ? "/data-analytics" : `/data-analytics/${slug}`;

  return buildMetadata({
    title: heading,
    description,
    path,
  });
}

export default async function DataAnalyticsSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!allowedSlugs.includes(params.slug)) {
    notFound();
  }

  const rootDataPromise = getDataAnalyticsServiceBySlug("data-analytics");

  const resolveDefaultHeroImages = async () => {
    const rootData = await rootDataPromise;
    return rootData?.hero?.defaultHeroImages || null;
  };

  // Fetch from Sanity
  const currentData = await getDataAnalyticsServiceBySlug(params.slug);
  if (!currentData) {
    notFound();
  }

  const defaultHeroImages = await resolveDefaultHeroImages();

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
