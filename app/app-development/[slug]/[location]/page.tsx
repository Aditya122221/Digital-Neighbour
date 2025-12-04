import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import {
  ensureLocationForService,
  getAllAppLocationParams,
  getAppLocationMetadata,
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
import { getAppDevelopmentServiceBySlug } from "@/lib/sanity-service-data";
import appDevData from "@/data/app-development.json";
import AppDevHero from "@/components/app-development/hero";
import Certificates from "@/components/app-development/certificates";
import Industries from "@/components/commonSections/industries";
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
import type { AppServiceSlug } from "@/config/app-services";

export const LOCATION_ENABLED_APP_SLUGS: AppServiceSlug[] = [
  "app-development",
  "ios-app-development",
  "software-development",
];

const slugAliases: Record<string, AppServiceSlug> = {
  "app-development-services": "app-development",
  "mobile-app-development": "app-development",
  "ios-development": "ios-app-development",
  iosappdevelopment: "ios-app-development",
  "software-development-services": "software-development",
  softwaredevelopment: "software-development",
};

const canonicalToDataKey: Record<AppServiceSlug, keyof typeof appDevData> = {
  "app-development": "app-development",
  "ios-app-development": "ios-app-development",
  "android-app-development": "android-app-development",
  "react-native-development": "react-native-development",
  "flutter-app-development": "flutter-development",
  "software-development": "software-development",
  "progressive-web-apps": "progressive-web-apps",
};

function resolveAppSlug(requestedSlug: string): AppServiceSlug | null {
  if (requestedSlug in slugAliases) {
    return slugAliases[requestedSlug];
  }

  if (
    Object.prototype.hasOwnProperty.call(
      appDevData,
      requestedSlug as keyof typeof appDevData,
    )
  ) {
    return requestedSlug as AppServiceSlug;
  }

  return null;
}

function getDataKeyForSlug(slug: AppServiceSlug) {
  return canonicalToDataKey[slug] ?? slug;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; location: string }>;
}): Promise<Metadata> {
  const { slug, location } = await params;
  const canonicalSlug = resolveAppSlug(slug);

  // Validate that the service slug exists
  if (!canonicalSlug) {
    return { title: "Page Not Found" };
  }

  const dataKey = getDataKeyForSlug(canonicalSlug);
  const baseData = appDevData[dataKey as keyof typeof appDevData];
  if (!baseData) {
    return { title: "Page Not Found" };
  }

  const normalizedLocation = normalizeLocationSlug(location) ?? location;

  // First try to ensure location is enabled for the service
  let ensuredLocation =
    ensureLocationForService("app", canonicalSlug, normalizedLocation) ??
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
    serviceData = await getAppDevelopmentServiceBySlug(canonicalSlug);
  } catch (error) {
    console.error(
      `Error fetching app development service data for "${canonicalSlug}":`,
      error,
    );
  }

  const locationName =
    getLocationDisplayName(ensuredLocation) ?? humanizeSlug(ensuredLocation);
  const canonicalPath = `/app-development/${canonicalSlug}/${ensuredLocation}`;

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

  const metadata = getAppLocationMetadata(canonicalSlug, ensuredLocation);

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
  return getAllAppLocationParams(LOCATION_ENABLED_APP_SLUGS);
}

export default async function AppDevelopmentLocationPage({
  params,
}: {
  params: Promise<{ slug: string; location: string }>;
}) {
  const { slug: requestedSlug, location: requestedLocation } = await params;

  const canonicalSlug = resolveAppSlug(requestedSlug);

  // Validate that the service slug exists
  if (!canonicalSlug) {
    notFound();
  }

  const dataKey = getDataKeyForSlug(canonicalSlug);
  const baseData = appDevData[dataKey as keyof typeof appDevData];
  if (!baseData) {
    notFound();
  }

  const normalizedLocation =
    normalizeLocationSlug(requestedLocation) ?? requestedLocation;

  // First try to ensure location is enabled for the service
  let ensuredLocation =
    ensureLocationForService("app", canonicalSlug, normalizedLocation) ??
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
    redirect(`/app-development/${canonicalSlug}/${ensuredLocation}`);
  }

  const localizedBase = await getLocationPageData(
    "app",
    canonicalSlug,
    ensuredLocation,
    baseData,
  );
  const locationName =
    getLocationDisplayName(ensuredLocation) ?? ensuredLocation;
  const personalizedData = personalizeSeoData(localizedBase, locationName);

  // Fetch default hero images from the main app-development entry
  const { getAppDevelopmentServiceBySlug } = await import(
    "@/lib/sanity-service-data"
  );
  const rootAppData = await getAppDevelopmentServiceBySlug("app-development");
  const defaultHeroImages = rootAppData?.hero?.defaultHeroImages || null;

  return (
    <main>
      <div className="relative">
        <Navbar />
        <AppDevHero
          data={personalizedData?.hero}
          defaultImages={defaultHeroImages}
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
        basePath="/app-development"
      />
      <Content
        data={personalizedData?.content}
        imagePathPrefix="/seo/content"
      />
      <Industries />
      <CaseStudy />
      <Certificates data={personalizedData?.certificates} />
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
      <Apart />
      <Footer />
    </main>
  );
}
