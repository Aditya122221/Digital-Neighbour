import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site-metadata";
import MarketingHero from "@/components/marketing/hero";
import BrandsMarquee from "@/components/homepage/brandsmarquee";
import Navbar from "@/components/core/navbar";
import Form from "@/components/commonSections/form";
import IntroParagraph from "@/components/commonSections/introparagraph";
import PainPoints from "@/components/commonSections/painpoints";
import Services from "@/components/homepage/services";
import Cta from "@/components/commonSections/cta";
import Apart from "@/components/homepage/apart";
import HowFast from "@/components/marketing/howfast";
import Process2 from "@/components/homepage/process2";
import KeyBenefits from "@/components/commonSections/keybenefits";
import Features from "@/components/commonSections/features";
import CaseStudy from "@/components/homepage/casestudy";
import Faq from "@/components/commonSections/faq";
import OtherServices from "@/components/commonSections/otherservices";
import Footer from "@/components/core/footer";
import marketingAgencyData from "@/data/marketing-agency.json";
import {
  getMarketingAgencyPage,
  type MarketingAgencyPageData,
} from "@/lib/sanity-marketing-page";

type KeyBenefitsSection = {
  heading?: string;
  subheading?: string;
  benefits?: {
    title?: string;
    description?: string;
    icon?: string;
    image?: string;
  }[];
};

const jsonMarketingData = (
  marketingAgencyData as Record<string, MarketingAgencyPageData>
)["marketing-agency"];

const fallbackHeroHeading =
  jsonMarketingData?.hero?.heading ?? "Full-Service Marketing Agency";
const fallbackHeroDescription =
  jsonMarketingData?.hero?.subheading ??
  "Partner with Digital Neighbour to deliver brand, demand, and digital programs that compound growth across every channel.";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function normalizeKeyBenefits(
  section?: MarketingAgencyPageData["keyBenefits"],
): KeyBenefitsSection | undefined {
  if (!section) {
    return undefined;
  }

  const source =
    section.benefits && section.benefits.length > 0
      ? section.benefits
      : (section.items ?? []);

  if (!source || source.length === 0) {
    return undefined;
  }

  return {
    heading: section.heading,
    subheading: section.subheading,
    benefits: source.map((item) => ({
      title: item.title ?? "",
      description: item.description ?? "",
      icon: item.icon,
      image: item.image,
    })),
  };
}

function mergeMarketingData(
  remoteData: MarketingAgencyPageData | null,
): MarketingAgencyPageData {
  const remote = remoteData ?? ({} as MarketingAgencyPageData);

  return {
    ...jsonMarketingData,
    ...remote,
    hero: {
      ...jsonMarketingData?.hero,
      ...remote.hero,
    },
    form: {
      ...jsonMarketingData?.form,
      ...remote.form,
    },
    introParagraph: {
      ...jsonMarketingData?.introParagraph,
      ...remote.introParagraph,
    },
    painPoints: {
      ...jsonMarketingData?.painPoints,
      ...remote.painPoints,
      painPoints: remote.painPoints?.painPoints?.length
        ? remote.painPoints.painPoints
        : jsonMarketingData?.painPoints?.painPoints,
    },
    process: {
      ...jsonMarketingData?.process,
      ...remote.process,
      steps: remote.process?.steps?.length
        ? remote.process.steps
        : jsonMarketingData?.process?.steps,
      content: remote.process?.content?.length
        ? remote.process.content
        : jsonMarketingData?.process?.content,
    },
    keyBenefits:
      remote.keyBenefits || jsonMarketingData?.keyBenefits
        ? {
            heading:
              remote.keyBenefits?.heading ??
              jsonMarketingData?.keyBenefits?.heading,
            subheading:
              remote.keyBenefits?.subheading ??
              jsonMarketingData?.keyBenefits?.subheading,
            benefits: remote.keyBenefits?.benefits?.length
              ? remote.keyBenefits.benefits
              : jsonMarketingData?.keyBenefits?.benefits,
            items: remote.keyBenefits?.items?.length
              ? remote.keyBenefits.items
              : jsonMarketingData?.keyBenefits?.items,
          }
        : undefined,
    features: {
      ...jsonMarketingData?.features,
      ...remote.features,
      features: remote.features?.features?.length
        ? remote.features.features
        : jsonMarketingData?.features?.features,
    },
    faq: {
      ...jsonMarketingData?.faq,
      ...remote.faq,
      faqs: remote.faq?.faqs?.length
        ? remote.faq.faqs
        : jsonMarketingData?.faq?.faqs,
    },
    services: remote.services ?? jsonMarketingData?.services,
  };
}

async function loadMarketingAgencyData() {
  const remoteData = await getMarketingAgencyPage();
  return mergeMarketingData(remoteData);
}

export async function generateMetadata(): Promise<Metadata> {
  const marketingData = mergeMarketingData(await getMarketingAgencyPage());

  const marketingHeading = marketingData.hero?.heading ?? fallbackHeroHeading;
  const marketingDescription =
    marketingData.hero?.subheading ?? fallbackHeroDescription;

  return buildMetadata({
    title: marketingHeading,
    description: marketingDescription,
    path: "/marketing-agency",
  });
}

export default async function MarketingAgencyPage() {
  const marketingData = await loadMarketingAgencyData();
  const keyBenefitsData = normalizeKeyBenefits(marketingData?.keyBenefits);

  return (
    <main>
      <div className="relative">
        <Navbar />
        <MarketingHero data={marketingData?.hero} />
      </div>
      <Form data={marketingData?.form} />
      <Services />
      <IntroParagraph data={marketingData?.introParagraph} />
      <PainPoints data={marketingData?.painPoints} />
      <Apart />
      <BrandsMarquee />
      <HowFast />
      <Process2
        data={marketingData?.services}
        processData={marketingData?.process}
      />
      <KeyBenefits data={keyBenefitsData} />
      <Features data={marketingData?.features} />
      <CaseStudy />
      <Faq data={marketingData?.faq} />
      <OtherServices />
      <Cta data={marketingData?.services} />
      <Footer />
    </main>
  );
}
