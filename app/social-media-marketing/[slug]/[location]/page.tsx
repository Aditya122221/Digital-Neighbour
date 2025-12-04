import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import {
  ensureLocationForService,
  getAllSocialLocationParams,
  getLocationDisplayName,
  getLocationPageData,
  getSocialLocationMetadata,
  normalizeLocationSlug,
  isValidLocationSlug,
} from "@/lib/location-data";
import { personalizeSeoData } from "@/lib/seo-location-personalization";
import {
  buildLocationMetadataFromSeoSettings,
  humanizeSlug,
} from "@/lib/site-metadata";
import socialData from "@/data/social-media.json";
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
import Blogs from "@/components/homepage/blogs";
import Features from "@/components/commonSections/features";
import KeyBenefits from "@/components/commonSections/keybenefits";
import WhyWork from "@/components/social-media/whywork";
import type { SocialServiceSlug } from "@/config/social-services";
import { getSocialMediaServiceBySlug } from "@/lib/sanity-service-data";

const slugAliases: Record<string, SocialServiceSlug> = {
  "social-media-management": "social-media-management",
  "social-media-marketing": "social-media-marketing",
  "facebook-management": "facebook-marketing",
  facebookmarketing: "facebook-marketing",
  linkedinmanagement: "linkedin-marketing",
  linkedinmarketing: "linkedin-marketing",
};

const canonicalToDataKey: Record<
  SocialServiceSlug,
  keyof typeof socialData | string
> = {
  "social-media-management": "social-media-marketing",
  "social-media-marketing": "social-media-marketing",
  "facebook-marketing": "facebook-marketing",
  "linkedin-marketing": "linkedin-marketing",
  "instagram-marketing": "instagram-marketing",
  "tiktok-marketing": "tiktok-marketing",
  "youtube-community-marketing": "youtube-community-marketing",
};

export const LOCATION_ENABLED_SOCIAL_SLUGS: SocialServiceSlug[] = [
  "social-media-management",
  "facebook-marketing",
  "linkedin-marketing",
];

function resolveSocialSlug(requestedSlug: string): SocialServiceSlug | null {
  if (requestedSlug in slugAliases) {
    return slugAliases[requestedSlug];
  }

  if (
    Object.prototype.hasOwnProperty.call(
      socialData,
      requestedSlug as keyof typeof socialData,
    )
  ) {
    return requestedSlug as SocialServiceSlug;
  }

  return null;
}

function getDataKeyForSlug(slug: SocialServiceSlug) {
  return canonicalToDataKey[slug] ?? slug;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; location: string }>;
}): Promise<Metadata> {
  const { slug, location } = await params;
  const canonicalSlug = resolveSocialSlug(slug);

  // Validate that the service slug exists
  if (!canonicalSlug) {
    return { title: "Page Not Found" };
  }

  const dataKey = getDataKeyForSlug(canonicalSlug);
  const baseData = socialData[dataKey as keyof typeof socialData];
  if (!baseData) {
    return { title: "Page Not Found" };
  }

  const normalizedLocation = normalizeLocationSlug(location) ?? location;

  // First try to ensure location is enabled for the service
  let ensuredLocation =
    ensureLocationForService("social", canonicalSlug, normalizedLocation) ??
    normalizeLocationSlug(normalizedLocation);

  // If not enabled for service, but it's a valid location slug, use it anyway
  if (!ensuredLocation && isValidLocationSlug(normalizedLocation)) {
    ensuredLocation = normalizedLocation;
  }

  if (!ensuredLocation) {
    return { title: "Page Not Found" };
  }

  let serviceData: any = null;
  try {
    serviceData = await getSocialMediaServiceBySlug(canonicalSlug);
    if (!serviceData && canonicalSlug === "social-media-management") {
      serviceData = await getSocialMediaServiceBySlug(
        "social-media-marketing",
      );
    }
  } catch (error) {
    console.error(
      `Error fetching social media service data for "${canonicalSlug}":`,
      error,
    );
  }

  const locationName =
    getLocationDisplayName(ensuredLocation) ?? humanizeSlug(ensuredLocation);
  const canonicalPath =
    canonicalSlug === "social-media-management"
      ? `/social-media-marketing/${ensuredLocation}`
      : `/social-media-marketing/${canonicalSlug}/${ensuredLocation}`;

  if (serviceData) {
    const serviceLabel = humanizeSlug(
      canonicalSlug === "social-media-management"
        ? "social-media-marketing"
        : canonicalSlug,
    );
    const serviceDataAny = serviceData as any;
    const baseDataAny = baseData as any;
    const fallbackTitle =
      serviceDataAny.seoSettings?.title?.trim() ||
      serviceDataAny.hero?.heading ||
      baseDataAny?.hero?.heading ||
      serviceLabel;
    const fallbackDescription =
      serviceDataAny.seoSettings?.description?.trim() ||
      serviceDataAny.hero?.subheading ||
      baseDataAny?.hero?.subheading ||
      serviceDataAny.description ||
      baseDataAny?.description ||
      `Partner with Digital Neighbour for ${serviceLabel}.`;

    return buildLocationMetadataFromSeoSettings({
      seoSettings: serviceDataAny.seoSettings,
      fallbackTitle,
      fallbackDescription,
      path: canonicalPath,
      locationName,
    });
  }

  const fallbackMetadata = getSocialLocationMetadata(
    canonicalSlug === "social-media-management"
      ? "social-media-marketing"
      : canonicalSlug,
    ensuredLocation,
  );

  const canonicalUrl = `https://digital-neighbour.com${canonicalPath}`;

  return {
    title: fallbackMetadata.title,
    description: fallbackMetadata.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fallbackMetadata.title,
      description: fallbackMetadata.description,
      type: "website",
      url: canonicalUrl,
    },
  };
}

export async function generateStaticParams() {
  return getAllSocialLocationParams(LOCATION_ENABLED_SOCIAL_SLUGS);
}

export default async function SocialMediaLocationPage({
  params,
}: {
  params: Promise<{ slug: string; location: string }>;
}) {
  const { slug: requestedSlug, location: requestedLocation } = await params;
  const rootSocialPromise = getSocialMediaServiceBySlug(
    "social-media-marketing",
  );

  const canonicalSlug = resolveSocialSlug(requestedSlug);

  // Validate that the service slug exists
  if (!canonicalSlug) {
    notFound();
  }

  const dataKey = getDataKeyForSlug(canonicalSlug);
  const baseData = socialData[dataKey as keyof typeof socialData];
  if (!baseData) {
    notFound();
  }

  const normalizedLocation =
    normalizeLocationSlug(requestedLocation) ?? requestedLocation;

  // First try to ensure location is enabled for the service
  let ensuredLocation =
    ensureLocationForService("social", canonicalSlug, normalizedLocation) ??
    normalizeLocationSlug(normalizedLocation);

  // If not enabled for service, but it's a valid location slug, use it anyway
  if (!ensuredLocation && isValidLocationSlug(normalizedLocation)) {
    ensuredLocation = normalizedLocation;
  }

  if (!ensuredLocation) {
    notFound();
  }

  if (
    requestedSlug !== canonicalSlug ||
    normalizeLocationSlug(requestedLocation) !== ensuredLocation
  ) {
    if (canonicalSlug === "social-media-management") {
      redirect(`/social-media-marketing/${ensuredLocation}`);
    }

    redirect(`/social-media-marketing/${canonicalSlug}/${ensuredLocation}`);
  }

  const localizedBase = await getLocationPageData(
    "social",
    canonicalSlug,
    ensuredLocation,
    baseData,
  );
  const locationName =
    getLocationDisplayName(ensuredLocation) ?? ensuredLocation;
  const personalizedData = personalizeSeoData(localizedBase, locationName);
  const rootSocialData = await rootSocialPromise;
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
            personalizedData?.hero || {
              heading: "Social Media Marketing that Drives Growth",
              subheading:
                "Strategic content, community marketing, and insights for Meta, LinkedIn, TikTok, and more.",
              ctaText: "Market My Brand",
            }
          }
          defaultVideoSrc={defaultHeroVideo}
        />
      </div>
      <Form data={personalizedData?.form} />
      <BrandsMarquee />
      <IntroParagraph
        data={
          personalizedData?.introParagraph || personalizedData?.introparagraph
        }
      />
      <PainPoints
        data={personalizedData?.painPoints || personalizedData?.painpoints}
      />
      <Services
        data={personalizedData?.services}
        serviceCards={personalizedData?.serviceCards}
        basePath="/social-media-marketing"
      />
      <Content
        data={personalizedData?.content}
        imagePathPrefix="/seo/content"
      />
      <SectionPainPoint />
      <WhyWork />
      <CaseStudy />
      <Process2
        data={personalizedData?.services}
        processData={personalizedData?.process}
      />
      <KeyBenefits
        data={personalizedData?.keyBenefits || personalizedData?.keybenefits}
      />
      <Features data={personalizedData?.features} />
      <Faq data={personalizedData?.faq} />
      <OtherServices />
      <Cta data={personalizedData?.services} />
      <Footer />
    </main>
  );
}
