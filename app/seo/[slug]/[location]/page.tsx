import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  ensureLocationForService,
  getAllSeoLocationParams,
  getLocationPageData,
  getSeoLocationMetadata,
  getLocationDisplayName,
  normalizeLocationSlug,
  isValidLocationSlug,
} from "@/lib/location-data";
import { personalizeSeoData } from "@/lib/seo-location-personalization";
import { getSeoServiceBySlug } from "@/lib/sanity-service-data";
import { loadSeoPageData } from "@/lib/seo-page-data";
import SeoHero from "@/components/seo/hero";
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
import Testimonials from "@/components/homepage/testimonials";
import TestimonalTwo from "@/components/homepage/testimonalTwo";
import BookACall from "@/components/homepage/bookacall";
import IntroParagraph from "@/components/commonSections/introparagraph";
import PainPoints from "@/components/commonSections/painpoints";
import KeyBenefits from "@/components/commonSections/keybenefits";
import Features from "@/components/commonSections/features";
import type { SeoServiceSlug } from "@/config/seo-services";

const slugAliases: Record<string, SeoServiceSlug> = {
  seo: "search-engine-optimisation",
  localseo: "local-seo",
  "seo-audit": "seo-audits",
  orm: "online-reputation-management",
};

const DEFAULT_SEO_SLUG: SeoServiceSlug = "search-engine-optimisation";

export const LOCATION_ENABLED_SEO_SLUGS: SeoServiceSlug[] = [
  "search-engine-optimisation",
  "seo-audits",
  "small-business-seo",
];

function resolveSeoSlug(requestedSlug: string): SeoServiceSlug | null {
  // Check if it's a direct match or an alias
  const directMatch = slugAliases[requestedSlug] || requestedSlug;

  // Validate it's a valid SEO service slug
  // We'll validate by trying to fetch from Sanity
  return directMatch as SeoServiceSlug;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; location: string }>;
}): Promise<Metadata> {
  const { slug, location } = await params;
  const canonicalSlug = resolveSeoSlug(slug);

  // Validate that the service slug exists by trying to fetch it
  if (!canonicalSlug) {
    return { title: "Page Not Found" };
  }

  let baseData;
  try {
    baseData = await getSeoServiceBySlug(canonicalSlug);
  } catch (error) {
    console.error(
      `Error fetching SEO service data for slug "${canonicalSlug}":`,
      error,
    );
    return { title: "Page Not Found" };
  }

  if (!baseData) {
    return { title: "Page Not Found" };
  }

  const normalizedLocation = normalizeLocationSlug(location) ?? location;

  // First try to ensure location is enabled for the service
  let ensuredLocation =
    ensureLocationForService("seo", canonicalSlug, normalizedLocation) ??
    normalizeLocationSlug(normalizedLocation);

  // If not enabled for service, but it's a valid location slug, use it anyway
  if (!ensuredLocation && isValidLocationSlug(normalizedLocation)) {
    ensuredLocation = normalizedLocation;
  }

  if (!ensuredLocation) {
    return { title: "Page Not Found" };
  }

  const metadata = getSeoLocationMetadata(canonicalSlug, ensuredLocation);

  const canonicalUrl =
    canonicalSlug === "search-engine-optimisation"
      ? `https://digital-neighbour.com/seo/${ensuredLocation}`
      : `https://digital-neighbour.com/seo/${canonicalSlug}/${ensuredLocation}`;

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
  return getAllSeoLocationParams(LOCATION_ENABLED_SEO_SLUGS);
}

export default async function SeoLocationPage({
  params,
}: {
  params: Promise<{ slug: string; location: string }>;
}) {
  const { slug: requestedSlug, location: requestedLocation } = await params;
  const defaultSeoDataPromise = loadSeoPageData("seo");

  const canonicalSlug = resolveSeoSlug(requestedSlug);

  // Validate that the service slug exists by trying to fetch it
  if (!canonicalSlug) {
    notFound();
  }

  let baseData;
  try {
    baseData = await getSeoServiceBySlug(canonicalSlug);
  } catch (error) {
    console.error(
      `Error fetching SEO service data for slug "${canonicalSlug}":`,
      error,
    );
    notFound();
  }

  if (!baseData) {
    notFound();
  }

  const normalizedLocation =
    normalizeLocationSlug(requestedLocation) ?? requestedLocation;

  // First try to ensure location is enabled for the service
  let ensuredLocation =
    ensureLocationForService("seo", canonicalSlug, normalizedLocation) ??
    normalizeLocationSlug(normalizedLocation);

  // If not enabled for service, but it's a valid location slug, use it anyway
  if (!ensuredLocation && isValidLocationSlug(normalizedLocation)) {
    ensuredLocation = normalizedLocation;
  }

  if (!ensuredLocation) {
    notFound();
  }

  let localizedBase;
  try {
    localizedBase = await getLocationPageData(
      "seo",
      canonicalSlug,
      ensuredLocation,
      baseData,
    );
  } catch (error) {
    console.error(
      `Error fetching location page data for "${canonicalSlug}" in "${ensuredLocation}":`,
      error,
    );
    // Fallback to base data if location data fetch fails
    localizedBase = baseData;
  }

  const locationName =
    getLocationDisplayName(ensuredLocation) ?? ensuredLocation;
  const personalizedData = personalizeSeoData(localizedBase, locationName);

  let defaultSeoData;
  try {
    defaultSeoData = await defaultSeoDataPromise;
  } catch (error) {
    console.error("Error loading default SEO data:", error);
    defaultSeoData = null;
  }

  const defaultHeroImage =
    defaultSeoData?.hero?.defaultHeroImage || defaultSeoData?.hero?.image;

  return (
    <main>
      <div className="relative">
        <Navbar />
        <SeoHero
          data={
            personalizedData?.hero || {
              heading: "Award-Winning SEO Marketing Agency",
              subheading:
                "We've helped leading and emerging brands scale their traffic and revenue organically for over a decade with our experience in seo consulting.",
            }
          }
          defaultImageSrc={defaultHeroImage}
        />
      </div>
      <Form data={personalizedData?.form} />
      <BrandsMarquee />
      <IntroParagraph data={personalizedData?.introParagraph} />
      <PainPoints data={personalizedData?.painPoints} />
      <Services
        data={
          typeof personalizedData?.services === "string"
            ? personalizedData.services
            : personalizedData?.services?.serviceName ||
              personalizedData?.services?.heading ||
              "SEO"
        }
        serviceCards={personalizedData?.serviceCards}
      />
      <Content
        data={personalizedData?.content}
        imagePathPrefix="/seo/content"
      />
      <Cta
        data={
          typeof personalizedData?.services === "string"
            ? personalizedData.services
            : personalizedData?.services?.serviceName ||
              personalizedData?.services?.heading ||
              undefined
        }
      />
      <Apart />
      <Process2
        data={personalizedData?.services}
        processData={personalizedData?.process || baseData?.process}
      />
      <KeyBenefits data={personalizedData?.keyBenefits} />
      <Features data={personalizedData?.features} />
      <CaseStudy />
      <Faq data={personalizedData?.faq} />
      <OtherServices />
      <Testimonials />
      <TestimonalTwo />
      <BookACall />
      <Blogs />
      <Footer />
    </main>
  );
}
