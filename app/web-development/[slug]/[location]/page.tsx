import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import {
  ensureLocationForService,
  getAllWebDevLocationParams,
  getLocationDisplayName,
  getLocationPageData,
  getWebDevLocationMetadata,
  normalizeLocationSlug,
} from "@/lib/location-data";
import { personalizeSeoData } from "@/lib/seo-location-personalization";
import webDevData from "@/data/web-development.json";
import WebDevHero from "@/components/web-development/hero";
import Functionalities from "@/components/web-development/functionalities";
import Industries from "@/components/web-development/industries";
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
import OtherServices from "@/components/commonSections/otherservices";
import Faq from "@/components/commonSections/faq";
import CaseStudy from "@/components/homepage/casestudy";
import type { WebDevServiceSlug } from "@/config/webdev-services";

const LOCATION_ENABLED_WEBDEV_SLUGS: WebDevServiceSlug[] = ["web-development"];

const slugAliases: Record<string, WebDevServiceSlug> = {
  webdevelopment: "web-development",
  "web-development-services": "web-development",
};

const canonicalToDataKey: Record<WebDevServiceSlug, keyof typeof webDevData> = {
  "web-development": "web-development",
  "website-development": "website-development",
  "web-app-development": "web-app-development",
  "ecommerce-development": "ecommerce-development",
  "landing-page-development": "landing-page-development",
  "cms-development": "cms-development",
  "headless-development": "headless-development",
};

function resolveWebDevSlug(requestedSlug: string): WebDevServiceSlug | null {
  if (requestedSlug in slugAliases) {
    return slugAliases[requestedSlug];
  }

  if (
    Object.prototype.hasOwnProperty.call(
      webDevData,
      requestedSlug as keyof typeof webDevData,
    )
  ) {
    return requestedSlug as WebDevServiceSlug;
  }

  return null;
}

function getDataKeyForSlug(slug: WebDevServiceSlug) {
  return canonicalToDataKey[slug] ?? slug;
}

function buildPageSections(data: any) {
  const introData = data?.introParagraph
    ? {
        heading: data.introParagraph.heading,
        problemStatement: data.introParagraph?.paragraphs?.[0],
        valueProposition: data.introParagraph?.paragraphs?.[1],
      }
    : undefined;
  const painData = data?.painPoints
    ? {
        heading: data.painPoints.heading,
        subheading: data.painPoints.subheading,
        painPoints: (data.painPoints.items || []).map((p: any) => ({
          problem: p.title,
          solution: p.description,
        })),
      }
    : undefined;
  const benefitsData = data?.keyBenefits
    ? {
        heading: data.keyBenefits.heading,
        subheading: data.keyBenefits.subheading,
        benefits: (data.keyBenefits.items || []).map((b: any) => ({
          title: b.title,
          description: b.description,
          icon: b.icon,
          image: b.image,
        })),
      }
    : undefined;

  return { introData, painData, benefitsData };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; location: string }>;
}): Promise<Metadata> {
  const { slug, location } = await params;
  const canonicalSlug = resolveWebDevSlug(slug);

  if (
    !canonicalSlug ||
    !LOCATION_ENABLED_WEBDEV_SLUGS.includes(canonicalSlug)
  ) {
    return { title: "Page Not Found" };
  }

  const normalizedLocation = normalizeLocationSlug(location) ?? location;

  const ensuredLocation =
    ensureLocationForService("webDev", canonicalSlug, normalizedLocation) ??
    normalizeLocationSlug(normalizedLocation);

  if (!ensuredLocation) {
    return { title: "Page Not Found" };
  }

  const metadata = getWebDevLocationMetadata(canonicalSlug, ensuredLocation);
  const canonicalUrl = `https://digital-neighbour.com/web-development/${canonicalSlug}/${ensuredLocation}`;

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
  return getAllWebDevLocationParams(LOCATION_ENABLED_WEBDEV_SLUGS);
}

export default async function WebDevelopmentLocationPage({
  params,
}: {
  params: Promise<{ slug: string; location: string }>;
}) {
  const { slug: requestedSlug, location: requestedLocation } = await params;

  const canonicalSlug = resolveWebDevSlug(requestedSlug);

  if (
    !canonicalSlug ||
    !LOCATION_ENABLED_WEBDEV_SLUGS.includes(canonicalSlug)
  ) {
    notFound();
  }

  const normalizedLocation =
    normalizeLocationSlug(requestedLocation) ?? requestedLocation;

  const ensuredLocation =
    ensureLocationForService("webDev", canonicalSlug, normalizedLocation) ??
    normalizeLocationSlug(normalizedLocation);

  if (!ensuredLocation) {
    notFound();
  }

  if (
    requestedSlug !== canonicalSlug ||
    normalizeLocationSlug(requestedLocation) !== ensuredLocation
  ) {
    redirect(`/web-development/${canonicalSlug}/${ensuredLocation}`);
  }

  const dataKey = getDataKeyForSlug(canonicalSlug);
  const baseData = (webDevData as any)[dataKey] as any;

  if (!baseData) {
    notFound();
  }

  const localizedBase = await getLocationPageData(
    "webDev",
    canonicalSlug,
    ensuredLocation,
    baseData,
  );
  const locationName =
    getLocationDisplayName(ensuredLocation) ?? ensuredLocation;
  const personalizedData = personalizeSeoData(localizedBase, locationName);

  const { introData, painData, benefitsData } =
    buildPageSections(personalizedData);

  return (
    <main>
      <div className="relative">
        <Navbar />
        <WebDevHero data={personalizedData?.hero} />
      </div>
      <Form data={personalizedData?.form} />
      <BrandsMarquee />
      <IntroParagraph data={introData} />
      <PainPoints data={painData} />
      <Functionalities />
      <Services
        data={personalizedData?.services}
        serviceCards={personalizedData?.serviceCards}
        basePath="/web-development"
      />
      <Content
        data={personalizedData?.content}
        imagePathPrefix="/seo/content"
      />
      <Industries />
      <CaseStudy />
      <Process2
        data={personalizedData?.services}
        processData={personalizedData?.process}
      />
      <KeyBenefits data={benefitsData} />
      <Features data={personalizedData?.features} />
      <Faq data={personalizedData?.faq} />
      <OtherServices />
      <Cta data={personalizedData?.services} />
      <Footer />
    </main>
  );
}
