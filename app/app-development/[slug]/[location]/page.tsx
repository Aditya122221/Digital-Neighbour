import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import {
  ensureLocationForService,
  getAllAppLocationParams,
  getAppLocationMetadata,
  getLocationDisplayName,
  getLocationPageData,
  normalizeLocationSlug,
} from "@/lib/location-data";
import { personalizeSeoData } from "@/lib/seo-location-personalization";
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

const LOCATION_ENABLED_APP_SLUGS: AppServiceSlug[] = [
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
  "flutter-app-development": "flutter-app-development",
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

  if (!canonicalSlug || !LOCATION_ENABLED_APP_SLUGS.includes(canonicalSlug)) {
    return { title: "Page Not Found" };
  }

  const normalizedLocation = normalizeLocationSlug(location) ?? location;

  const ensuredLocation =
    ensureLocationForService("app", canonicalSlug, normalizedLocation) ??
    normalizeLocationSlug(normalizedLocation);

  if (!ensuredLocation) {
    return { title: "Page Not Found" };
  }

  const metadata = getAppLocationMetadata(canonicalSlug, ensuredLocation);

  const canonicalUrl = `https://digital-neighbour.com/app-development/${canonicalSlug}/${ensuredLocation}`;

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

  if (!canonicalSlug || !LOCATION_ENABLED_APP_SLUGS.includes(canonicalSlug)) {
    notFound();
  }

  const normalizedLocation =
    normalizeLocationSlug(requestedLocation) ?? requestedLocation;

  const ensuredLocation =
    ensureLocationForService("app", canonicalSlug, normalizedLocation) ??
    normalizeLocationSlug(normalizedLocation);

  if (!ensuredLocation) {
    notFound();
  }

  if (
    requestedSlug !== canonicalSlug ||
    normalizeLocationSlug(requestedLocation) !== ensuredLocation
  ) {
    redirect(`/app-development/${canonicalSlug}/${ensuredLocation}`);
  }

  const dataKey = getDataKeyForSlug(canonicalSlug);
  const baseData = (appDevData as any)[dataKey] as any;

  if (!baseData) {
    notFound();
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

  return (
    <main>
      <div className="relative">
        <Navbar />
        <AppDevHero data={personalizedData?.hero} />
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
