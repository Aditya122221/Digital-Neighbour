import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import {
  ensureLocationForService,
  getAllHostingLocationParams,
  getHostingLocationMetadata,
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
import { getHostingServiceBySlug } from "@/lib/sanity-service-data";
import hostingData from "@/data/hosting-it-security.json";
import HostingHero from "@/components/hosting-it-security/hero";
import HostingProcess from "@/components/hosting-it-security/hostingProcess";
import HostingServices from "@/components/hosting-it-security/services";
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
import IntroParagraph from "@/components/commonSections/introparagraph";
import PainPoints from "@/components/commonSections/painpoints";
import KeyBenefits from "@/components/commonSections/keybenefits";
import Features from "@/components/commonSections/features";
import type { HostingServiceSlug } from "@/config/hosting-services";

export const LOCATION_ENABLED_HOSTING_SLUGS: HostingServiceSlug[] = [
  "hosting-it-security",
  "web-hosting",
  "wordpress-hosting",
];

const slugAliases: Record<string, HostingServiceSlug> = {
  "hosting-services": "hosting-it-security",
  hostingsecurity: "hosting-it-security",
  webhosting: "web-hosting",
  wordpresshosting: "wordpress-hosting",
};

const canonicalToDataKey: Record<HostingServiceSlug, keyof typeof hostingData> =
  {
    "hosting-it-security": "hosting-it-security",
    "web-hosting": "web-hosting",
    "wordpress-hosting": "wordpress-hosting",
    "cloud-hosting": "cloud-hosting-and-management",
    "dedicated-hosting": "dedicated-hosting-services",
    "managed-it-security": "website-security",
  };

function resolveHostingSlug(requestedSlug: string): HostingServiceSlug | null {
  if (requestedSlug in slugAliases) {
    return slugAliases[requestedSlug];
  }

  if (
    Object.prototype.hasOwnProperty.call(
      hostingData,
      requestedSlug as keyof typeof hostingData,
    )
  ) {
    return requestedSlug as HostingServiceSlug;
  }

  return null;
}

function getDataKeyForSlug(slug: HostingServiceSlug) {
  return canonicalToDataKey[slug] ?? slug;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; location: string }>;
}): Promise<Metadata> {
  const { slug, location } = await params;
  const canonicalSlug = resolveHostingSlug(slug);

  // Validate that the service slug exists
  if (!canonicalSlug) {
    return { title: "Page Not Found" };
  }

  const dataKey = getDataKeyForSlug(canonicalSlug);
  const baseData = hostingData[dataKey as keyof typeof hostingData];
  if (!baseData) {
    return { title: "Page Not Found" };
  }

  const normalizedLocation = normalizeLocationSlug(location) ?? location;

  // First try to ensure location is enabled for the service
  let ensuredLocation =
    ensureLocationForService("hosting", canonicalSlug, normalizedLocation) ??
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
    serviceData = await getHostingServiceBySlug(canonicalSlug);
  } catch (error) {
    console.error(
      `Error fetching hosting service data for "${canonicalSlug}":`,
      error,
    );
  }

  const locationName =
    getLocationDisplayName(ensuredLocation) ?? humanizeSlug(ensuredLocation);
  const canonicalPath = `/hosting-it-security/${canonicalSlug}/${ensuredLocation}`;

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

  const metadata = getHostingLocationMetadata(canonicalSlug, ensuredLocation);

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
  return getAllHostingLocationParams(LOCATION_ENABLED_HOSTING_SLUGS);
}

export default async function HostingItSecurityLocationPage({
  params,
}: {
  params: Promise<{ slug: string; location: string }>;
}) {
  const { slug: requestedSlug, location: requestedLocation } = await params;

  const canonicalSlug = resolveHostingSlug(requestedSlug);

  // Validate that the service slug exists
  if (!canonicalSlug) {
    notFound();
  }

  const dataKey = getDataKeyForSlug(canonicalSlug);
  const baseData = hostingData[dataKey as keyof typeof hostingData];
  if (!baseData) {
    notFound();
  }

  const normalizedLocation =
    normalizeLocationSlug(requestedLocation) ?? requestedLocation;

  // First try to ensure location is enabled for the service
  let ensuredLocation =
    ensureLocationForService("hosting", canonicalSlug, normalizedLocation) ??
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
    redirect(`/hosting-it-security/${canonicalSlug}/${ensuredLocation}`);
  }

  const localizedBase = await getLocationPageData(
    "hosting",
    canonicalSlug,
    ensuredLocation,
    baseData,
  );
  const locationName =
    getLocationDisplayName(ensuredLocation) ?? ensuredLocation;
  const personalizedData = personalizeSeoData(localizedBase, locationName);

  // Fetch default hero video from the main hosting-it-security entry
  const { getHostingServiceBySlug } = await import("@/lib/sanity-service-data");
  const rootHostingData = await getHostingServiceBySlug("hosting-it-security");
  const defaultHeroVideo =
    rootHostingData?.hero?.defaultHeroVideo?.asset?.url ||
    rootHostingData?.hero?.defaultHeroVideo?.url ||
    null;

  return (
    <main>
      <div className="relative">
        <Navbar />
        <HostingHero
          data={personalizedData?.hero}
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
      <HostingServices
        data={personalizedData?.services}
        serviceCards={personalizedData?.serviceCards}
        basePath="/hosting-it-security"
        premiumCloudServices={personalizedData?.premiumCloudServices}
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
      <Footer />
    </main>
  );
}
