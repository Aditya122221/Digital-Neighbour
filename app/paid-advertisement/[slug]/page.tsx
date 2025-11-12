import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import {
  ensureLocationForService,
  getLocationDisplayName,
  getLocationPageData,
  normalizeLocationSlug,
} from "@/lib/location-data";
import { personalizeSeoData } from "@/lib/seo-location-personalization";
import { buildMetadata, humanizeSlug } from "@/lib/site-metadata";
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
import Features from "@/components/commonSections/features";
import IntroParagraph from "@/components/commonSections/introparagraph";
import PainPoints from "@/components/commonSections/painpoints";
import KeyBenefits from "@/components/commonSections/keybenefits";

const allowedSlugs = [
  "paid-advertisement",
  "google-ads",
  "google-remarketing",
  "google-shopping-ads",
  "paid-social",
  "youtube-ads",
  "meta-ads",
  "linkedin-ads",
  "google-display-ads",
  "pay-per-click",
  "bing-ads",
  "facebook-ads",
  "instagram-ads",
  "linkedin-ads-management",
  "tiktok-ads",
  "snapchat-ads",
  "twitter-x-ads",
  "pinterest-ads",
];

const DEFAULT_PAID_SLUG = "google-ads" as const;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;

  const baseData = paidAdsData["paid-advertisement"] as any;
  const baseHeading =
    baseData?.hero?.heading ?? "Paid Advertising Services";
  const baseDescription =
    baseData?.hero?.subheading ??
    "Plan, launch, and optimise high-performing paid media across Google, Meta, LinkedIn, and YouTube with Digital Neighbour.";

  if (slug === "paid-advertisement") {
    return buildMetadata({
      title: baseHeading,
      description: baseDescription,
      path: "/paid-advertisement",
    });
  }

  const locationSlug = normalizeLocationSlug(slug);

  if (!allowedSlugs.includes(slug)) {
    if (locationSlug) {
      const ensuredLocation = ensureLocationForService(
        "paidAds",
        DEFAULT_PAID_SLUG,
        locationSlug,
      );
      if (!ensuredLocation) {
        return {
          title: "Page Not Found",
        };
      }

      const basePaidData = paidAdsData[DEFAULT_PAID_SLUG] as any;
      const localizedBase = await getLocationPageData(
        "paidAds",
        DEFAULT_PAID_SLUG,
        ensuredLocation,
        basePaidData,
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
        `Paid Advertising in ${locationName}`;
      const description =
        personalizedData?.hero?.subheading ??
        `Run profitable paid media campaigns in ${locationName} with Digital Neighbour.`;

      return buildMetadata({
        title: heading,
        description,
        path: `/paid-advertisement/${slug}`,
      });
    }

    return {
      title: "Page Not Found",
    };
  }

  const currentData = paidAdsData[
    slug as keyof typeof paidAdsData
  ] as any;
  const heading =
    currentData?.hero?.heading ??
    `${humanizeSlug(slug)} Services`;
  const description =
    currentData?.hero?.subheading ??
    currentData?.introparagraph?.heading ??
    `Discover ${humanizeSlug(slug)} programmes crafted by Digital Neighbour.`;

  return buildMetadata({
    title: heading,
    description,
    path: `/paid-advertisement/${slug}`,
  });
}

export default async function PaidAdsSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  if (params.slug === "paid-advertisement") {
    redirect("/paid-advertisement");
  }

  const locationSlug = normalizeLocationSlug(params.slug);

  if (!allowedSlugs.includes(params.slug)) {
    if (locationSlug) {
      const ensuredLocation = ensureLocationForService(
        "paidAds",
        DEFAULT_PAID_SLUG,
        locationSlug,
      );
      if (!ensuredLocation) {
        notFound();
      }

      const baseData = paidAdsData[DEFAULT_PAID_SLUG] as any;
      const localizedBase = await getLocationPageData(
        "paidAds",
        DEFAULT_PAID_SLUG,
        ensuredLocation,
        baseData,
      );
      const locationName =
        getLocationDisplayName(ensuredLocation) ?? ensuredLocation;
      const personalizedData = personalizeSeoData(localizedBase, locationName);

      return renderPaidAdsPage(personalizedData);
    }

    notFound();
  }

  const currentData = paidAdsData[
    params.slug as keyof typeof paidAdsData
  ] as any;

  return renderPaidAdsPage(currentData);
}

function renderPaidAdsPage(currentData: any) {
  return (
    <main>
      <div className="relative">
        <Navbar />
        <PaidAdsHero
          data={
            currentData?.hero || {
              heading: "Performance-Driven Paid Advertising",
              subheading:
                "We scale profitable paid media across Google, Meta, LinkedIn, and YouTube.",
            }
          }
        />
      </div>
      <Form data={currentData?.form} />
      <BrandsMarquee />
      <IntroParagraph data={currentData?.introparagraph} />
      <PainPoints data={currentData?.painpoints} />
      <Services
        data={currentData?.services}
        serviceCards={currentData?.serviceCards}
        basePath="/paid-advertisement"
      />
      <Strategic
        data={currentData?.strategic}
        serviceName={currentData?.services}
      />
      <Content data={currentData?.content} imagePathPrefix="/seo/content" />
      <Apart />
      <CaseStudy />
      <Process2
        data={currentData?.services}
        processData={currentData?.process}
      />
      <KeyBenefits data={currentData?.keybenefits} />
      <Features data={currentData?.features} />
      <Faq data={currentData?.faq} />
      <OtherServices />
      <Cta data={currentData?.services} />
      <Footer />
    </main>
  );
}
