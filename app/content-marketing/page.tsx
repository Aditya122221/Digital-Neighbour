import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/site-metadata";
import { getContentMarketingServiceBySlug } from "@/lib/sanity-service-data";
import ContentMarketingHero from "@/components/content-marketing/hero";
import IntroParagraph from "@/components/commonSections/introparagraph";
import PainPoints from "@/components/commonSections/painpoints";
import KeyBenefits from "@/components/commonSections/keybenefits";
import Features from "@/components/commonSections/features";
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

// Force dynamic rendering to always fetch fresh data from Sanity
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const contentOverview =
    await getContentMarketingServiceBySlug("content-marketing");
  const contentHeading =
    contentOverview?.hero?.heading ?? "Content Marketing Services";
  const contentDescription =
    contentOverview?.hero?.subheading ??
    "Plan, create, and distribute high-performing content that builds authority and converts with Digital Neighbour's content marketing team.";

  return buildMetadata({
    title: contentHeading,
    description: contentDescription,
    path: "/content-marketing",
  });
}

export default async function ContentMarketingPage() {
  const currentData =
    await getContentMarketingServiceBySlug("content-marketing");

  if (!currentData) {
    notFound();
  }
  const defaultHeroVideo =
    currentData?.hero?.defaultHeroVideo?.asset?.url ||
    currentData?.hero?.defaultHeroVideo?.url ||
    null;

  return (
    <main>
      <div className="relative">
        <Navbar />
        <ContentMarketingHero
          data={
            currentData?.hero || {
              heading: "Strategic Content Marketing",
              subheading:
                "We create compelling content that drives engagement, builds authority, and converts visitors into customers.",
            }
          }
          defaultVideoSrc={defaultHeroVideo}
        />
      </div>
      <Form data={currentData?.form} />
      <BrandsMarquee />
      <IntroParagraph data={currentData?.introParagraph} />
      <PainPoints data={currentData?.painPoints} />
      <Services
        data={currentData?.services}
        serviceCards={currentData?.serviceCards}
        basePath="/content-marketing"
      />
      <Apart />
      <CaseStudy />
      <Process2
        data={currentData?.services}
        processData={currentData?.process}
      />
      <Content data={currentData?.content} imagePathPrefix="/seo/content" />
      <KeyBenefits data={currentData?.keyBenefits} />
      <Features data={currentData?.features} />
      <Faq data={currentData?.faq} />
      <OtherServices />
      <Cta data={currentData?.services} />
      <Footer />
    </main>
  );
}
