import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import {
  ensureLocationForService,
  getLocationDisplayName,
  getLocationPageData,
  normalizeLocationSlug,
} from "@/lib/location-data";
import { personalizeSeoData } from "@/lib/seo-location-personalization";
import {
  buildLocationMetadataFromSeoSettings,
  buildMetadata,
  humanizeSlug,
} from "@/lib/site-metadata";
import { getHostingServiceBySlug } from "@/lib/sanity-service-data";
import HostingHero from "@/components/hosting-it-security/hero";
import Content from "@/components/commonSections/content";
import Services from "@/components/commonSections/services";
import Form from "@/components/commonSections/form";
import Navbar from "@/components/core/navbar";
import Footer from "@/components/core/footer";
import BrandsMarquee from "@/components/homepage/brandsmarquee";
import HostingProcess from "@/components/hosting-it-security/hostingProcess";
import Process2 from "@/components/homepage/process2";
import Cta from "@/components/commonSections/cta";
import OtherServices from "@/components/commonSections/otherservices";
import Faq from "@/components/commonSections/faq";
import CaseStudy from "@/components/homepage/casestudy";
import IntroParagraph from "@/components/commonSections/introparagraph";
import PainPoints from "@/components/commonSections/painpoints";
import KeyBenefits from "@/components/commonSections/keybenefits";
import Apart from "@/components/homepage/apart";
import HostingServices from "@/components/hosting-it-security/services";
import Features from "@/components/commonSections/features";

const allowedSlugs = [
  "hosting-it-security",
  "web-hosting",
  "wordpress-hosting",
  "email-hosting",
  "reseller-hosting",
  "ecommerce-hosting",
  "dedicated-servers",
  "windows-virtual-servers",
  "linux-servers",
  "vps",
  "shared-hosting-services",
  "cloud-hosting-and-management",
  "dedicated-hosting-services",
  "aws-hosting-solutions",
  "data-migration",
  "website-security",
  "ssl-certificate-setup",
  "web-application-firewall-setup",
  "malware-removal-services",
  "web-maintenance",
];

const DEFAULT_HOSTING_SLUG = "web-hosting" as const;

// Force dynamic rendering to always fetch fresh data from Sanity
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;

  // Get base data from Sanity
  const baseData = await getHostingServiceBySlug("hosting-it-security");
  const baseSeoSettings = baseData?.seoSettings;
  // Prioritize seoSettings.title/description if they exist and have values
  const baseSeoTitle = baseSeoSettings?.title?.trim();
  const baseSeoDescription = baseSeoSettings?.description?.trim();
  const baseHeading =
    baseSeoTitle ||
    baseData?.metadata ||
    baseData?.hero?.heading ||
    "Hosting, IT & Security Services";
  const baseDescription =
    baseSeoDescription ||
    baseData?.description ||
    baseData?.hero?.subheading ||
    "Protect, optimise, and manage your digital infrastructure with secure hosting, managed IT, and cyber security services from Digital Neighbour.";

  if (slug === "hosting-it-security") {
    const ogImageUrl =
      baseSeoSettings?.ogImage?.asset?.url || baseSeoSettings?.ogImage?.url;
    return buildMetadata({
      title: baseHeading,
      description: baseDescription,
      path: "/hosting-it-security",
      openGraphTitle: baseSeoSettings?.ogTitle,
      openGraphDescription: baseSeoSettings?.ogDescription,
      openGraphImage: ogImageUrl,
      keywords: baseSeoSettings?.keywords,
      canonicalUrl: baseSeoSettings?.canonicalUrl,
    });
  }

  const locationSlug = normalizeLocationSlug(slug);

  if (!allowedSlugs.includes(slug)) {
    if (locationSlug) {
      const ensuredLocation = ensureLocationForService(
        "hosting",
        DEFAULT_HOSTING_SLUG,
        locationSlug,
      );
      if (!ensuredLocation) {
        return {
          title: "Page Not Found",
        };
      }

      const locationName =
        getLocationDisplayName(ensuredLocation) ??
        humanizeSlug(ensuredLocation);

      return buildLocationMetadataFromSeoSettings({
        seoSettings: baseSeoSettings,
        fallbackTitle: baseHeading,
        fallbackDescription: baseDescription,
        path: `/hosting-it-security/${slug}`,
        locationName,
      });
    }

    return {
      title: "Page Not Found",
    };
  }

  // Fetch from Sanity
  const currentData = await getHostingServiceBySlug(slug);
  if (!currentData) {
    return {
      title: "Page Not Found",
    };
  }

  // Use seoSettings from Sanity if available, otherwise fallback to other fields
  const seoSettings = currentData?.seoSettings;
  // Prioritize seoSettings.title/description if they exist and have values
  const seoTitle = seoSettings?.title?.trim();
  const seoDescription = seoSettings?.description?.trim();
  const heading =
    seoTitle ||
    currentData?.metadata ||
    currentData?.hero?.heading ||
    `${humanizeSlug(slug)} Services`;
  const description =
    seoDescription ||
    currentData?.description ||
    currentData?.hero?.subheading ||
    currentData?.introParagraph?.heading ||
    `Discover ${humanizeSlug(slug)} solutions from Digital Neighbour.`;

  // Get OG image URL from seoSettings
  const ogImageUrl =
    seoSettings?.ogImage?.asset?.url || seoSettings?.ogImage?.url;

  return buildMetadata({
    title: heading,
    description,
    path: `/hosting-it-security/${slug}`,
    openGraphTitle: seoSettings?.ogTitle,
    openGraphDescription: seoSettings?.ogDescription,
    openGraphImage: ogImageUrl,
    keywords: seoSettings?.keywords,
    canonicalUrl: seoSettings?.canonicalUrl,
  });
}

export default async function HostingItSecuritySlugPage({
  params,
}: {
  params: { slug: string };
}) {
  if (params.slug === "hosting-it-security") {
    redirect("/hosting-it-security");
  }

  const rootHostingPromise = getHostingServiceBySlug("hosting-it-security");

  const resolveDefaultHeroVideo = async () => {
    const rootData = await rootHostingPromise;
    return (
      rootData?.hero?.defaultHeroVideo?.asset?.url ||
      rootData?.hero?.defaultHeroVideo?.url ||
      null
    );
  };

  const locationSlug = normalizeLocationSlug(params.slug);

  if (!allowedSlugs.includes(params.slug)) {
    if (locationSlug) {
      const ensuredLocation = ensureLocationForService(
        "hosting",
        DEFAULT_HOSTING_SLUG,
        locationSlug,
      );
      if (!ensuredLocation) {
        notFound();
      }

      // Get base data from Sanity
      const baseData = await getHostingServiceBySlug(DEFAULT_HOSTING_SLUG);
      if (!baseData) {
        notFound();
      }

      const localizedBase = await getLocationPageData(
        "hosting",
        DEFAULT_HOSTING_SLUG,
        ensuredLocation,
        baseData,
      );
      const locationName =
        getLocationDisplayName(ensuredLocation) ?? ensuredLocation;
      const personalizedData = personalizeSeoData(localizedBase, locationName);

      const defaultHeroVideo = await resolveDefaultHeroVideo();
      return renderHostingPage(personalizedData, defaultHeroVideo);
    }
    notFound();
  }

  // Fetch from Sanity
  const currentData = await getHostingServiceBySlug(params.slug);
  if (!currentData) {
    notFound();
  }

  const defaultHeroVideo = await resolveDefaultHeroVideo();
  return renderHostingPage(currentData, defaultHeroVideo);
}

function renderHostingPage(currentData: any, defaultHeroVideo?: string | null) {
  return (
    <main>
      <div className="relative">
        <Navbar />
        <HostingHero
          data={
            currentData?.hero || {
              heading: "Hosting, IT & Security Services",
              subheading:
                "Reliable hosting solutions and comprehensive IT security services to keep your business online, secure, and running smoothly.",
            }
          }
          defaultVideoSrc={defaultHeroVideo}
        />
      </div>
      <Form data={currentData?.form} />
      <BrandsMarquee />
      <IntroParagraph data={currentData?.introParagraph} />
      <PainPoints data={currentData?.painPoints} />
      <HostingServices
        data={currentData?.services}
        serviceCards={currentData?.serviceCards}
        basePath="/hosting-it-security"
        premiumCloudServices={currentData?.premiumCloudServices}
      />
      <Content data={currentData?.content} imagePathPrefix="/seo/content" />
      <Apart />
      <CaseStudy />
      <Process2
        data={currentData?.services}
        processData={currentData?.process}
      />
      <KeyBenefits data={currentData?.keyBenefits} />
      <Features data={currentData?.features} />
      <Faq data={currentData?.faq} />
      <OtherServices />
      <Cta data={currentData?.services} />
      <Footer />
    </main>
  );
}
