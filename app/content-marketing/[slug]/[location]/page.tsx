import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import {
  ensureLocationForService,
  getAllContentLocationParams,
  getContentLocationMetadata,
  getLocationDisplayName,
  getLocationPageData,
  normalizeLocationSlug,
  isValidLocationSlug,
} from "@/lib/location-data";
import { personalizeSeoData } from "@/lib/seo-location-personalization";
import {
  buildLocationMetadataFromSeoSettings,
  humanizeSlug,
} from "@/lib/site-metadata";
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
import Testimonials from "@/components/homepage/testimonials";
import TestimonalTwo from "@/components/homepage/testimonalTwo";
import BookACall from "@/components/homepage/bookacall";
import type { ContentServiceSlug } from "@/config/content-services";
import { getContentMarketingServiceBySlug } from "@/lib/sanity-service-data";

export const LOCATION_ENABLED_CONTENT_SLUGS: ContentServiceSlug[] = [
  "content-marketing",
  "copywriting",
  "graphic-designing",
];

const slugAliases: Record<string, ContentServiceSlug> = {
  "content-marketing-services": "content-marketing",
  contentmarketing: "content-marketing",
  "content-management": "content-marketing",
  "copy-writing": "copywriting",
  copywritingservices: "copywriting",
  "graphic-design": "graphic-designing",
  graphicdesign: "graphic-designing",
};

const canonicalToDataKey: Partial<Record<
  ContentServiceSlug,
  keyof typeof contentMarketingData
>> = {
  "content-marketing": "content-marketing",
  "content-strategy": "content-strategy",
  copywriting: "copywriting",
  "email-marketing": "email-marketing",
  "graphic-designing": "graphic-designing",
  "content-production": "content-marketing", // fallback
  "content-distribution": "content-marketing", // fallback
};

function resolveContentSlug(requestedSlug: string): ContentServiceSlug | null {
  if (requestedSlug in slugAliases) {
    return slugAliases[requestedSlug];
  }

  if (
    Object.prototype.hasOwnProperty.call(
      contentMarketingData,
      requestedSlug as keyof typeof contentMarketingData,
    )
  ) {
    return requestedSlug as ContentServiceSlug;
  }

  return null;
}

function getDataKeyForSlug(slug: ContentServiceSlug) {
  return canonicalToDataKey[slug] ?? slug;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; location: string }>;
}): Promise<Metadata> {
  const { slug, location } = await params;
  const canonicalSlug = resolveContentSlug(slug);

  // Validate that the service slug exists
  if (!canonicalSlug) {
    return { title: "Page Not Found" };
  }

  const dataKey = getDataKeyForSlug(canonicalSlug);
  const baseData =
    contentMarketingData[dataKey as keyof typeof contentMarketingData];
  if (!baseData) {
    return { title: "Page Not Found" };
  }

  const normalizedLocation = normalizeLocationSlug(location) ?? location;

  // First try to ensure location is enabled for the service
  let ensuredLocation =
    ensureLocationForService("content", canonicalSlug, normalizedLocation) ??
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
    serviceData = await getContentMarketingServiceBySlug(canonicalSlug);
  } catch (error) {
    console.error(
      `Error fetching content marketing service data for "${canonicalSlug}":`,
      error,
    );
  }

  const locationName =
    getLocationDisplayName(ensuredLocation) ?? humanizeSlug(ensuredLocation);
  const canonicalPath = `/content-marketing/${canonicalSlug}/${ensuredLocation}`;

  if (serviceData) {
    const serviceLabel = humanizeSlug(canonicalSlug);
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

  const metadata = getContentLocationMetadata(canonicalSlug, ensuredLocation);

  const canonicalUrl = `https://digital-neighbour.com${canonicalPath}`;

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: "website",
      url: canonicalUrl,
    },
  };
}

export async function generateStaticParams() {
  return getAllContentLocationParams(LOCATION_ENABLED_CONTENT_SLUGS);
}

export default async function ContentMarketingLocationPage({
  params,
}: {
  params: Promise<{ slug: string; location: string }>;
}) {
  const { slug: requestedSlug, location: requestedLocation } = await params;
  const rootContentPromise =
    getContentMarketingServiceBySlug("content-marketing");

  const canonicalSlug = resolveContentSlug(requestedSlug);

  // Validate that the service slug exists
  if (!canonicalSlug) {
    notFound();
  }

  const dataKey = getDataKeyForSlug(canonicalSlug);
  const baseData =
    contentMarketingData[dataKey as keyof typeof contentMarketingData];
  if (!baseData) {
    notFound();
  }

  const normalizedLocation =
    normalizeLocationSlug(requestedLocation) ?? requestedLocation;

  // First try to ensure location is enabled for the service
  let ensuredLocation =
    ensureLocationForService("content", canonicalSlug, normalizedLocation) ??
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
    redirect(`/content-marketing/${canonicalSlug}/${ensuredLocation}`);
  }

  const localizedBase = await getLocationPageData(
    "content",
    canonicalSlug,
    ensuredLocation,
    baseData,
  );
  const locationName =
    getLocationDisplayName(ensuredLocation) ?? ensuredLocation;
  const personalizedData = personalizeSeoData(localizedBase, locationName);
  const rootContentData = await rootContentPromise;
  const defaultHeroVideo =
    rootContentData?.hero?.defaultHeroVideo?.asset?.url ||
    rootContentData?.hero?.defaultHeroVideo?.url ||
    null;

  return (
    <main>
      <div className="relative">
        <Navbar />
        <ContentMarketingHero
          data={
            personalizedData?.hero || {
              heading: "Strategic Content Marketing",
              subheading:
                "We create compelling content that drives engagement, builds authority, and converts visitors into customers.",
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
        basePath="/content-marketing"
      />
      <Content
        data={personalizedData?.content}
        imagePathPrefix="/seo/content"
      />
      <Apart />
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
      <Testimonials />
      <TestimonalTwo />
      <BookACall />
      <Footer />
    </main>
  );
}
