import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import {
  ensureLocationForService,
  getAllPaidAdsLocationParams,
  getLocationDisplayName,
  getLocationPageData,
  getPaidAdsLocationMetadata,
  normalizeLocationSlug,
} from "@/lib/location-data";
import { personalizeSeoData } from "@/lib/seo-location-personalization";
import paidAdsData from "@/data/paid-ads.json";
import PaidAdsHero from "@/components/paid-ads/hero";
import Strategic from "@/components/paid-ads/strategic";
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
import type { PaidAdsServiceSlug } from "@/config/paid-services";

const slugAliases: Record<string, PaidAdsServiceSlug> = {
  googleads: "google-ads",
  "google-shopping": "google-shopping-ads",
  youtubeads: "youtube-ads",
};

const LOCATION_ENABLED_PAID_ADS_SLUGS: PaidAdsServiceSlug[] = [
  "google-ads",
  "google-shopping-ads",
  "youtube-ads",
];

function resolvePaidAdsSlug(requestedSlug: string): PaidAdsServiceSlug | null {
  const directMatch = Object.prototype.hasOwnProperty.call(
    paidAdsData,
    requestedSlug,
  )
    ? (requestedSlug as PaidAdsServiceSlug)
    : slugAliases[requestedSlug];

  if (!directMatch) {
    return null;
  }

  return directMatch;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; location: string }>;
}): Promise<Metadata> {
  const { slug, location } = await params;
  const canonicalSlug = resolvePaidAdsSlug(slug);

  if (
    !canonicalSlug ||
    !LOCATION_ENABLED_PAID_ADS_SLUGS.includes(canonicalSlug)
  ) {
    return { title: "Page Not Found" };
  }

  const normalizedLocation = normalizeLocationSlug(location) ?? location;

  const ensuredLocation =
    ensureLocationForService("paidAds", canonicalSlug, normalizedLocation) ??
    normalizeLocationSlug(normalizedLocation);

  if (!ensuredLocation) {
    return { title: "Page Not Found" };
  }

  const metadata = getPaidAdsLocationMetadata(canonicalSlug, ensuredLocation);

  const canonicalUrl = `https://digital-neighbour.com/paid-advertisement/${canonicalSlug}/${ensuredLocation}`;

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
  return getAllPaidAdsLocationParams(LOCATION_ENABLED_PAID_ADS_SLUGS);
}

export default async function PaidAdsLocationPage({
  params,
}: {
  params: Promise<{ slug: string; location: string }>;
}) {
  const { slug: requestedSlug, location: requestedLocation } = await params;

  const canonicalSlug = resolvePaidAdsSlug(requestedSlug);

  if (
    !canonicalSlug ||
    !LOCATION_ENABLED_PAID_ADS_SLUGS.includes(canonicalSlug)
  ) {
    notFound();
  }

  const normalizedLocation =
    normalizeLocationSlug(requestedLocation) ?? requestedLocation;

  const ensuredLocation =
    ensureLocationForService("paidAds", canonicalSlug, normalizedLocation) ??
    normalizeLocationSlug(normalizedLocation);

  if (!ensuredLocation) {
    notFound();
  }

  if (
    requestedSlug !== canonicalSlug ||
    normalizeLocationSlug(requestedLocation) !== ensuredLocation
  ) {
    redirect(`/paid-advertisement/${canonicalSlug}/${ensuredLocation}`);
  }

  const baseData = paidAdsData[canonicalSlug] as any;

  if (!baseData) {
    notFound();
  }

  const localizedBase = await getLocationPageData(
    "paidAds",
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
        <PaidAdsHero
          data={
            personalizedData?.hero || {
              heading: "Performance-Driven Paid Advertising",
              subheading:
                "We scale profitable paid media across Google, Meta, LinkedIn, and YouTube.",
            }
          }
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
        basePath="/paid-advertisement"
      />
      <Strategic
        data={personalizedData?.strategic}
        serviceName={personalizedData?.services}
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
      <Blogs />
      <Testimonials />
      <TestimonalTwo />
      <BookACall />
      <Footer />
    </main>
  );
}
