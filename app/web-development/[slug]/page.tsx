import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ensureLocationForService,
  getLocationDisplayName,
  getLocationPageData,
  normalizeLocationSlug,
} from "@/lib/location-data";
import { personalizeSeoData } from "@/lib/seo-location-personalization";
import webDevData from "@/data/web-development.json";
import { buildMetadata, humanizeSlug } from "@/lib/site-metadata";
import WebDevHero from "@/components/web-development/hero";
import IntroParagraph from "@/components/commonSections/introparagraph";
import PainPoints from "@/components/commonSections/painpoints";
import KeyBenefits from "@/components/commonSections/keybenefits";
import Features from "@/components/commonSections/features";
import Functionalities from "@/components/web-development/functionalities";
import Content from "@/components/commonSections/content";
import Services from "@/components/commonSections/services";
import Form from "@/components/commonSections/form";
import Navbar from "@/components/core/navbar";
import Footer from "@/components/core/footer";
import BrandsMarquee from "@/components/homepage/brandsmarquee";
import Process2 from "@/components/homepage/process2";
import Cta from "@/components/commonSections/cta";
import Industries from "@/components/web-development/industries";
import OtherServices from "@/components/commonSections/otherservices";
import Faq from "@/components/commonSections/faq";
import CaseStudy from "@/components/homepage/casestudy";

const DEFAULT_WEBDEV_SLUG = "web-development" as const;

type WebDevJson = Record<string, any> & {
  otherServices?: { webdevelopmentServices?: string[] };
};

const data = webDevData as unknown as WebDevJson;

function toKebabCase(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function fromKebabToTitle(input: string) {
  return input
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function getAllowedSlugs() {
  const jsonSlugs = Object.keys(data).filter((k) => k !== "otherServices");
  const otherServiceSlugs = (
    data.otherServices?.webdevelopmentServices || []
  ).map((s) => toKebabCase(s));
  return new Set([...jsonSlugs, ...otherServiceSlugs]);
}

function resolveDataForSlug(slug: string) {
  const base = (data as any)[DEFAULT_WEBDEV_SLUG] || {};
  const direct = (data as any)[slug];
  if (direct) return direct;

  const otherList = data.otherServices?.webdevelopmentServices || [];
  const match = otherList.find((label) => toKebabCase(label) === slug);
  if (!match) return null;

  // Virtualize content for other services using the base as fallback
  return {
    ...base,
    hero: {
      ...(base?.hero || {}),
      heading: match,
      subheading: `Professional ${match} services tailored to your business needs.`,
    },
    services: match,
    form: base?.form || {},
    content: base?.content || {},
    serviceCards: base?.serviceCards || [],
    process: base?.process || {},
    introParagraph: base?.introParagraph || {},
    painPoints: base?.painPoints || {},
    keyBenefits: base?.keyBenefits || {},
    features: base?.features || {},
    faq: {
      ...(base?.faq || {}),
      serviceName: match,
    },
  };
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

function renderWebDevPage(data: any, slug: string) {
  const { introData, painData, benefitsData } = buildPageSections(data);
  const heroFallback = {
    heading: fromKebabToTitle(slug),
    subheading:
      "We design, build, and scale fast, secure, and conversion-focused websites and web apps.",
  };

  return (
    <main>
      <div className="relative">
        <Navbar />
        <WebDevHero
          data={
            data?.hero || {
              heading: heroFallback.heading,
              subheading: heroFallback.subheading,
            }
          }
        />
      </div>
      <Form data={data?.form} />
      <BrandsMarquee />
      <IntroParagraph data={introData} />
      <PainPoints data={painData} />
      <Functionalities />
      <Services
        data={data?.services}
        serviceCards={data?.serviceCards}
        basePath="/web-development"
      />
      <Content data={data?.content} imagePathPrefix="/seo/content" />
      <Industries />
      <CaseStudy />
      <Process2 data={data?.services} processData={data?.process} />
      <KeyBenefits data={benefitsData} />
      <Features data={data?.features} />
      <Faq data={data?.faq} />
      <OtherServices />
      <Cta data={data?.services} />
      <Footer />
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const allowed = getAllowedSlugs();

  const baseData = resolveDataForSlug(DEFAULT_WEBDEV_SLUG);
  const baseHeading =
    baseData?.hero?.heading ?? "Web Development Services";
  const baseDescription =
    baseData?.hero?.subheading ??
    "Design and ship high-performing websites, web apps, and digital platforms with Digital Neighbour.";

  if (slug === DEFAULT_WEBDEV_SLUG) {
    return buildMetadata({
      title: baseHeading,
      description: baseDescription,
      path: "/web-development",
    });
  }

  if (allowed.has(slug)) {
    const currentData = resolveDataForSlug(slug);
    if (!currentData) {
      return {
        title: "Page Not Found",
      };
    }

    const heading =
      currentData?.hero?.heading ?? fromKebabToTitle(slug);
    const description =
      currentData?.hero?.subheading ??
      currentData?.introParagraph?.heading ??
      `Explore ${fromKebabToTitle(
        slug
      )} solutions created by Digital Neighbour.`;

    return buildMetadata({
      title: heading,
      description,
      path: `/web-development/${slug}`,
    });
  }

  const locationSlug = normalizeLocationSlug(slug);

  if (locationSlug) {
    const ensuredLocation = ensureLocationForService(
      "webDev",
      DEFAULT_WEBDEV_SLUG,
      locationSlug,
    );

    if (!ensuredLocation || !baseData) {
      return {
        title: "Page Not Found",
      };
    }

    const localizedBase = await getLocationPageData(
      "webDev",
      DEFAULT_WEBDEV_SLUG,
      ensuredLocation,
      baseData,
    );
    const locationName =
      getLocationDisplayName(ensuredLocation) ??
      humanizeSlug(ensuredLocation);
    const personalizedData = personalizeSeoData(
      localizedBase,
      locationName,
    );

    const heading =
      personalizedData?.hero?.heading ??
      `Web Development in ${locationName}`;
    const description =
      personalizedData?.hero?.subheading ??
      `Build and launch digital experiences in ${locationName} with Digital Neighbour.`;

    return buildMetadata({
      title: heading,
      description,
      path: `/web-development/${slug}`,
    });
  }

  return {
    title: "Page Not Found",
  };
}

export async function generateStaticParams() {
  return Array.from(getAllowedSlugs()).map((slug) => ({ slug }));
}

export default async function WebDevSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const allowed = getAllowedSlugs();

  if (allowed.has(params.slug)) {
    const currentData = resolveDataForSlug(params.slug);
    if (!currentData) {
      notFound();
    }
    return renderWebDevPage(currentData, params.slug);
  }

  const locationSlug = normalizeLocationSlug(params.slug);

  if (locationSlug) {
    const ensuredLocation = ensureLocationForService(
      "webDev",
      DEFAULT_WEBDEV_SLUG,
      locationSlug,
    );

    if (!ensuredLocation) {
      notFound();
    }

    const baseData = resolveDataForSlug(DEFAULT_WEBDEV_SLUG);
    if (!baseData) {
      notFound();
    }

    const localizedBase = await getLocationPageData(
      "webDev",
      DEFAULT_WEBDEV_SLUG,
      ensuredLocation,
      baseData,
    );
    const locationName =
      getLocationDisplayName(ensuredLocation) ?? ensuredLocation;
    const personalizedData = personalizeSeoData(localizedBase, locationName);

    return renderWebDevPage(personalizedData, DEFAULT_WEBDEV_SLUG);
  }

  notFound();
}
