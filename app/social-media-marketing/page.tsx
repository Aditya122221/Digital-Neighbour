import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/site-metadata";
import { getSocialMediaServiceBySlug } from "@/lib/sanity-service-data";
import SocialMediaHero from "@/components/social-media/hero";
import IntroParagraph from "@/components/commonSections/introparagraph";
import PainPoints from "@/components/commonSections/painpoints";
import SectionPainPoint from "@/components/social-media/painpoints";
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
import WhyWork from "@/components/social-media/whywork";

// Force dynamic rendering to always fetch fresh data from Sanity
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const socialOverview = await getSocialMediaServiceBySlug(
    "social-media-marketing",
  );
  const socialHeading =
    socialOverview?.hero?.heading ??
    "Social Media Marketing that Drives Growth";
  const socialDescription =
    socialOverview?.hero?.subheading ??
    "Plan, create, and optimise social media programmes that grow community, engagement, and demand across Meta, LinkedIn, TikTok, and more.";

  return buildMetadata({
    title: socialHeading,
    description: socialDescription,
    path: "/social-media-marketing",
  });
}

export default async function SocialMediaMarketingPage() {
  const currentData = await getSocialMediaServiceBySlug(
    "social-media-marketing",
  );

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
        <SocialMediaHero
          data={
            currentData?.hero || {
              heading: "Social Media Marketing that Drives Growth",
              subheading:
                "Strategic content, community marketing, and insights for Meta, LinkedIn, TikTok, and more.",
              ctaText: "Market My Brand",
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
        basePath="/social-media-marketing"
      />
      <Content data={currentData?.content} imagePathPrefix="/seo/content" />
      <SectionPainPoint />
      <WhyWork />
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
