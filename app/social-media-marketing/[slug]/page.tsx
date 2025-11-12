import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import socialData from "@/data/social-media.json";
import { normalizeLocationSlug } from "@/lib/location-data";
import { buildMetadata, humanizeSlug } from "@/lib/site-metadata";
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

const socialBaseData = (socialData as any)["social-media-marketing"] as any;
const socialBaseHeading =
  socialBaseData?.hero?.heading ??
  "Social Media Marketing that Drives Growth";
const socialBaseDescription =
  socialBaseData?.hero?.subheading ??
  "Build community, grow engagement, and convert attention into demand with Digital Neighbour’s social media specialists.";

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const { slug } = params;

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

  const currentData = (socialData as any)[
    slug as keyof typeof socialData
  ] as any;
  const heading =
    currentData?.hero?.heading ??
    `${humanizeSlug(slug)} Services`;
  const description =
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

export default function SocialMediaMarketingSlugPage({
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

  const key = params.slug as string as keyof typeof socialData;
  const currentData = (socialData as any)[key] as any;
  const introData = currentData?.introParagraph
    ? {
        heading: currentData.introParagraph.heading,
        problemStatement: currentData.introParagraph?.paragraphs?.[0],
        valueProposition: currentData.introParagraph?.paragraphs?.[1],
      }
    : undefined;
  const painData = currentData?.painpoints
    ? {
        heading: currentData.painpoints.heading,
        subheading: currentData.painpoints.subheading,
        painPoints: (currentData.painpoints.items || []).map((p: any) => ({
          problem: p.title,
          solution: p.description,
        })),
      }
    : undefined;
  const benefitsData = currentData?.keyBenefits
    ? {
        heading: currentData.keyBenefits.heading,
        subheading: currentData.keyBenefits.subheading,
        benefits: (currentData.keyBenefits.items || []).map((b: any) => ({
          title: b.title,
          description: b.description,
          icon: b.icon,
          image: b.image,
        })),
      }
    : undefined;

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
        />
      </div>
      <Form data={currentData?.form} />
      <BrandsMarquee />
      <IntroParagraph data={introData} />
      <PainPoints data={painData} />
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
      <KeyBenefits data={benefitsData} />
      <Features data={currentData?.features} />
      <Faq data={currentData?.faq} />
      <OtherServices />
      <Cta data={currentData?.services} />
      <Footer />
    </main>
  );
}
