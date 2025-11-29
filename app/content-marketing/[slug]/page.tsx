import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import {
  ensureLocationForService,
  getLocationDisplayName,
  getLocationPageData,
  normalizeLocationSlug,
} from "@/lib/location-data";
import { personalizeSeoData } from "@/lib/seo-location-personalization";
import { buildMetadata, humanizeSlug } from "@/lib/site-metadata";
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
  const baseData = await getContentMarketingServiceBySlug(DEFAULT_CONTENT_SLUG);
  const baseHeading =
    baseData?.metadata ??
    baseData?.hero?.heading ??
    "Content Marketing Services";
  const baseDescription =
    baseData?.description ??
    baseData?.hero?.subheading ??
    "Create, launch, and scale content programmes that build authority and convert with Digital Neighbour.";

  if (slug === DEFAULT_CONTENT_SLUG) {
    return buildMetadata({
      title: baseHeading,
      description: baseDescription,
      path: "/content-marketing",
    });
  }

  const locationSlug = normalizeLocationSlug(slug);

  if (!allowedSlugs.includes(slug)) {
    if (locationSlug) {
      const ensuredLocation = ensureLocationForService(
        "content",
        DEFAULT_CONTENT_SLUG,
        locationSlug,
      );
      if (!ensuredLocation) {
        return {
          title: "Page Not Found",
        };
      }

      if (!baseData) {
        return {
          title: "Page Not Found",
        };
      }

      const localizedBase = await getLocationPageData(
        "content",
        DEFAULT_CONTENT_SLUG,
        ensuredLocation,
        baseData,
      );
      const locationName =
        getLocationDisplayName(ensuredLocation) ??
        humanizeSlug(ensuredLocation);
      const personalizedData = personalizeSeoData(localizedBase, locationName);

      const heading =
        personalizedData?.hero?.heading ??
        `Content Marketing in ${locationName}`;
      const description =
        personalizedData?.hero?.subheading ??
        `Plan and produce content marketing campaigns tailored for ${locationName} with Digital Neighbour.`;

      return buildMetadata({
        title: heading,
        description,
        path: `/content-marketing/${slug}`,
      });
    }

    return {
      title: "Page Not Found",
    };
  }

  // Fetch from Sanity
  const currentData = await getContentMarketingServiceBySlug(slug);
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
    `Discover ${humanizeSlug(slug)} solutions from Digital Neighbour.`;

  return buildMetadata({
    title: heading,
    description,
    path: `/content-marketing/${slug}`,
  });
}

export default async function ContentMarketingSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const rootContentPromise =
    getContentMarketingServiceBySlug(DEFAULT_CONTENT_SLUG);
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

      // Get base data from Sanity
      const baseData = await rootContentPromise;
      if (!baseData) {
        notFound();
      }

      const localizedBase = await getLocationPageData(
        "content",
        DEFAULT_CONTENT_SLUG,
        ensuredLocation,
        baseData,
      );
      const locationName =
        getLocationDisplayName(ensuredLocation) ?? ensuredLocation;
      const personalizedData = personalizeSeoData(localizedBase, locationName);

      const defaultHeroVideo =
        baseData?.hero?.defaultHeroVideo?.asset?.url ||
        baseData?.hero?.defaultHeroVideo?.url ||
        null;

      return renderContentPage(personalizedData, defaultHeroVideo);
    }

    notFound();
  }

  // Fetch from Sanity
  const [rootContentData, currentData] = await Promise.all([
    rootContentPromise,
    getContentMarketingServiceBySlug(params.slug),
  ]);
  if (!currentData) {
    notFound();
  }

  const defaultHeroVideo =
    rootContentData?.hero?.defaultHeroVideo?.asset?.url ||
    rootContentData?.hero?.defaultHeroVideo?.url ||
    null;

  return renderContentPage(currentData, defaultHeroVideo);
}

function renderContentPage(data: any, defaultHeroVideo?: string | null) {
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
          defaultVideoSrc={defaultHeroVideo}
        />
      </div>
      <Form data={data?.form} />
      <BrandsMarquee />
      <IntroParagraph data={data?.introParagraph} />
      <PainPoints data={data?.painPoints} />
      <Services
        data={data?.services}
        serviceCards={data?.serviceCards}
        basePath="/content-marketing"
      />
      <Apart />
      <CaseStudy />
      <Process2 data={data?.services} processData={data?.process} />
      <Content data={data?.content} imagePathPrefix="/seo/content" />
      <KeyBenefits data={data?.keyBenefits} />
      <Features data={data?.features} />
      <Faq data={data?.faq} />
      <OtherServices />
      <Cta data={data?.services} />
      <Footer />
    </main>
  );
}
