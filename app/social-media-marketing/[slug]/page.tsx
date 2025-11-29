import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { normalizeLocationSlug } from "@/lib/location-data";
import { buildMetadata, humanizeSlug } from "@/lib/site-metadata";
import { getSocialMediaServiceBySlug } from "@/lib/sanity-service-data";
import SocialMediaHero from "@/components/social-media/hero";
import IntroParagraph from "@/components/commonSections/introparagraph";
import PainPoints from "@/components/commonSections/painpoints";
import SectionPainPoint from "@/components/social-media/painpoints";
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
import Features from "@/components/commonSections/features";
import KeyBenefits from "@/components/commonSections/keybenefits";
import WhyWork from "@/components/social-media/whywork";

const allowedSlugs = [
  "social-media-marketing",
  "facebook-marketing",
  "instagram-marketing",
  "linkedin-marketing",
  "tiktok-marketing",
  // X (Twitter)
  "x-marketing",
  "pinterest-marketing",
  "youtube-community-marketing",
  // Additional services
  "snapchat-marketing",
  "reddit-marketing",
  "influencer-marketing",
  // Back-compat old slugs (optional)
  "social-media-management",
  "facebook-management",
  "instagram-management",
  "linkedin-management",
  "tiktok-management",
  "twitter-x-management",
  "pinterest-management",
  "youtube-community-management",
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

  // Get base data from Sanity
  const socialBaseData = await getSocialMediaServiceBySlug(
    "social-media-marketing",
  );
  const socialBaseHeading =
    socialBaseData?.metadata ??
    socialBaseData?.hero?.heading ??
    "Social Media Marketing that Drives Growth";
  const socialBaseDescription =
    socialBaseData?.description ??
    socialBaseData?.hero?.subheading ??
    "Build community, grow engagement, and convert attention into demand with Digital Neighbour's social media specialists.";

  if (!allowedSlugs.includes(slug)) {
    const locationSlug = normalizeLocationSlug(slug);

    if (locationSlug) {
      return buildMetadata({
        title: socialBaseHeading,
        description: socialBaseDescription,
        path: `/social-media-marketing/${slug}`,
      });
    }

    return {
      title: "Page Not Found",
    };
  }

  // Fetch from Sanity
  const currentData = await getSocialMediaServiceBySlug(slug);
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
    `Discover ${humanizeSlug(slug)} programmes crafted by Digital Neighbour.`;
  const path =
    slug === "social-media-marketing"
      ? "/social-media-marketing"
      : `/social-media-marketing/${slug}`;

  return buildMetadata({
    title: heading,
    description,
    path,
  });
}

export default async function SocialMediaMarketingSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!allowedSlugs.includes(params.slug)) {
    const locationSlug = normalizeLocationSlug(params.slug);
    if (locationSlug) {
      redirect(
        `/social-media-marketing/social-media-management/${locationSlug}`,
      );
    }
    notFound();
  }

  // Fetch from Sanity
  const [rootSocialData, currentData] = await Promise.all([
    getSocialMediaServiceBySlug("social-media-marketing"),
    getSocialMediaServiceBySlug(params.slug),
  ]);
  if (!currentData) {
    notFound();
  }

  const defaultHeroVideo =
    rootSocialData?.hero?.defaultHeroVideo?.asset?.url ||
    rootSocialData?.hero?.defaultHeroVideo?.url ||
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
