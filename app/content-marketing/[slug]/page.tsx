import { notFound, redirect } from "next/navigation";
import {
  ensureLocationForService,
  getLocationDisplayName,
  getLocationPageData,
  normalizeLocationSlug,
} from "@/lib/location-data";
import { personalizeSeoData } from "@/lib/seo-location-personalization";
import contentMarketingData from "@/data/content-marketing.json";
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

const allowedSlugs = [
  "content-marketing",
  "content-strategy",
  "video-content",
  "infographics",
  "whitepapers",
  "case-studies",
  "ebooks",
  "podcast-content",
  "copywriting",
  "graphic-designing",
  "video-editing",
  "photo-shoot",
  "video-shoot",
  "infographic-design",
  "website-copywriting",
  "sales-copywriting",
  "press-release-writing",
  "ad-copywriting",
  "logo-design",
  "email-marketing",
  "pr-outreach",
  "branding",
];

const DEFAULT_CONTENT_SLUG = "content-marketing" as const;

export default async function ContentMarketingSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  if (params.slug === "content-marketing") {
    redirect("/content-marketing");
  }

  const locationSlug = normalizeLocationSlug(params.slug);

  if (!allowedSlugs.includes(params.slug)) {
    if (locationSlug) {
      const ensuredLocation = ensureLocationForService(
        "content",
        DEFAULT_CONTENT_SLUG,
        locationSlug,
      );
      if (!ensuredLocation) {
        notFound();
      }

      const baseData = contentMarketingData[DEFAULT_CONTENT_SLUG] as any;
      const localizedBase = await getLocationPageData(
        "content",
        DEFAULT_CONTENT_SLUG,
        ensuredLocation,
        baseData,
      );
      const locationName =
        getLocationDisplayName(ensuredLocation) ?? ensuredLocation;
      const personalizedData = personalizeSeoData(localizedBase, locationName);

      return renderContentPage(personalizedData);
    }

    notFound();
  }

  const currentData = contentMarketingData[
    params.slug as keyof typeof contentMarketingData
  ] as any;

  return renderContentPage(currentData);
}

function renderContentPage(data: any) {
  const introData = data?.introParagraph
    ? {
        heading: data.introParagraph.heading,
        problemStatement: data.introParagraph?.paragraphs?.[0],
        valueProposition: data.introParagraph?.paragraphs?.[1],
      }
    : undefined;
  const painData = data?.painPoints
    ? {
        heading: data.painPoints.heading,
        subheading: data.painPoints.subheading,
        painPoints: (data.painPoints.items || []).map((p: any) => ({
          problem: p.title,
          solution: p.description,
        })),
      }
    : undefined;
  const benefitsData = data?.keyBenefits
    ? {
        heading: data.keyBenefits.heading,
        subheading: data.keyBenefits.subheading,
        benefits: (data.keyBenefits.items || []).map((b: any) => ({
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
        <ContentMarketingHero
          data={
            data?.hero || {
              heading: "Strategic Content Marketing",
              subheading:
                "We create compelling content that drives engagement, builds authority, and converts visitors into customers.",
            }
          }
        />
      </div>
      <Form data={data?.form} />
      <BrandsMarquee />
      <IntroParagraph data={introData} />
      <PainPoints data={painData} />
      <Apart />
      <CaseStudy />
      <Process2 data={data?.services} processData={data?.process} />
      <Content data={data?.content} imagePathPrefix="/seo/content" />
      <KeyBenefits data={benefitsData} />
      <Features data={data?.features} />
      <Faq data={data?.faq} />
      <OtherServices />
      <Cta data={data?.services} />
      <Footer />
    </main>
  );
}
