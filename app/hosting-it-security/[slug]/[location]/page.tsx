import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import {
  ensureLocationForService,
  getAllHostingLocationParams,
  getHostingLocationMetadata,
  getLocationDisplayName,
  getLocationPageData,
  normalizeLocationSlug,
} from "@/lib/location-data";
import { personalizeSeoData } from "@/lib/seo-location-personalization";
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

const LOCATION_ENABLED_HOSTING_SLUGS: HostingServiceSlug[] = [
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

  if (
    !canonicalSlug ||
    !LOCATION_ENABLED_HOSTING_SLUGS.includes(canonicalSlug)
  ) {
    return { title: "Page Not Found" };
  }

  const normalizedLocation = normalizeLocationSlug(location) ?? location;

  const ensuredLocation =
    ensureLocationForService("hosting", canonicalSlug, normalizedLocation) ??
    normalizeLocationSlug(normalizedLocation);

  if (!ensuredLocation) {
    return { title: "Page Not Found" };
  }

  const metadata = getHostingLocationMetadata(canonicalSlug, ensuredLocation);

  const canonicalUrl = `https://digital-neighbour.com/hosting-it-security/${canonicalSlug}/${ensuredLocation}`;

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

  if (
    !canonicalSlug ||
    !LOCATION_ENABLED_HOSTING_SLUGS.includes(canonicalSlug)
  ) {
    notFound();
  }

  const normalizedLocation =
    normalizeLocationSlug(requestedLocation) ?? requestedLocation;

  const ensuredLocation =
    ensureLocationForService("hosting", canonicalSlug, normalizedLocation) ??
    normalizeLocationSlug(normalizedLocation);

  if (!ensuredLocation) {
    notFound();
  }

  if (
    requestedSlug !== canonicalSlug ||
    normalizeLocationSlug(requestedLocation) !== ensuredLocation
  ) {
    redirect(`/hosting-it-security/${canonicalSlug}/${ensuredLocation}`);
  }

  const dataKey = getDataKeyForSlug(canonicalSlug);
  const baseData = (hostingData as any)[dataKey] as any;

  if (!baseData) {
    notFound();
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

  return (
    <main>
      <div className="relative">
        <Navbar />
        <HostingHero data={personalizedData?.hero} />
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
      <HostingProcess />
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
