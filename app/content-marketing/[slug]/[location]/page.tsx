import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import {
  ensureLocationForService,
  getAllContentLocationParams,
  getContentLocationMetadata,
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
import Testimonials from "@/components/homepage/testimonials";
import TestimonalTwo from "@/components/homepage/testimonalTwo";
import BookACall from "@/components/homepage/bookacall";
import type { ContentServiceSlug } from "@/config/content-services";

const LOCATION_ENABLED_CONTENT_SLUGS: ContentServiceSlug[] = [
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

const canonicalToDataKey: Record<
  ContentServiceSlug,
  keyof typeof contentMarketingData
> = {
  "content-marketing": "content-marketing",
  "content-strategy": "content-strategy",
  copywriting: "copywriting",
  "email-marketing": "email-marketing",
  "graphic-designing": "graphic-designing",
  "content-production": "content-production",
  "content-distribution": "content-distribution",
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

  if (
    !canonicalSlug ||
    !LOCATION_ENABLED_CONTENT_SLUGS.includes(canonicalSlug)
  ) {
    return { title: "Page Not Found" };
  }

  const normalizedLocation = normalizeLocationSlug(location) ?? location;

  const ensuredLocation =
    ensureLocationForService("content", canonicalSlug, normalizedLocation) ??
    normalizeLocationSlug(normalizedLocation);

  if (!ensuredLocation) {
    return { title: "Page Not Found" };
  }

  const metadata = getContentLocationMetadata(canonicalSlug, ensuredLocation);

  const canonicalUrl = `https://digital-neighbour.com/content-marketing/${canonicalSlug}/${ensuredLocation}`;

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

  const canonicalSlug = resolveContentSlug(requestedSlug);

  if (
    !canonicalSlug ||
    !LOCATION_ENABLED_CONTENT_SLUGS.includes(canonicalSlug)
  ) {
    notFound();
  }

  const normalizedLocation =
    normalizeLocationSlug(requestedLocation) ?? requestedLocation;

  const ensuredLocation =
    ensureLocationForService("content", canonicalSlug, normalizedLocation) ??
    normalizeLocationSlug(normalizedLocation);

  if (!ensuredLocation) {
    notFound();
  }

  if (
    requestedSlug !== canonicalSlug ||
    normalizeLocationSlug(requestedLocation) !== ensuredLocation
  ) {
    redirect(`/content-marketing/${canonicalSlug}/${ensuredLocation}`);
  }

  const dataKey = getDataKeyForSlug(canonicalSlug);
  const baseData = (contentMarketingData as any)[dataKey] as any;

  if (!baseData) {
    notFound();
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
