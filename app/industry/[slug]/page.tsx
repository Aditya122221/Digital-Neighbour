import type { Metadata } from "next";
import { notFound } from "next/navigation";
import industriesData from "@/data/industries.json";
import { getIndustriesServiceBySlug } from "@/lib/sanity-service-data";
import IndustriesHero from "@/components/industries/hero";
import Content from "@/components/commonSections/content";
import Form from "@/components/commonSections/form";
import Navbar from "@/components/core/navbar";
import Footer from "@/components/core/footer";
import BrandsMarquee from "@/components/homepage/brandsmarquee";
import Process2 from "@/components/homepage/process2";
import Cta from "@/components/commonSections/cta";
import OtherServices from "@/components/commonSections/otherservices";
import Faq from "@/components/commonSections/faq";
import CaseStudy from "@/components/homepage/casestudy";
import IntroParagraph from "@/components/commonSections/introparagraph";
import PainPoints from "@/components/commonSections/painpoints";
import KeyBenefits from "@/components/commonSections/keybenefits";
import Features from "@/components/commonSections/features";
import Apart from "@/components/homepage/apart";
import IndustryBrowserSection from "@/components/industries/industry-browser";
import CreativeShowcase from "@/components/industries/creative-showcase";
import { buildMetadata, humanizeSlug } from "@/lib/site-metadata";

function getServiceNameFromSlug(slug: string): string | null {
  const mapping = (industriesData as any).otherServices?.slugMapping || {};
  for (const [name, mappedSlug] of Object.entries(mapping)) {
    if (mappedSlug === slug) return name;
  }
  return null;
}

const allowedSlugs: string[] = Object.values(
  ((industriesData as any).otherServices?.slugMapping as Record<
    string,
    string
  >) || {},
) as string[];

// Force dynamic rendering to always fetch fresh data from Sanity
export const dynamic = "force-dynamic";
export const revalidate = 0;

export function generateStaticParams() {
  return allowedSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // Try to fetch from Sanity first
  const sanityData = await getIndustriesServiceBySlug(slug);

  const serviceName =
    getServiceNameFromSlug(slug) ?? humanizeSlug(slug) ?? "Industry";

  // Fallback to JSON if not in Sanity
  const jsonData = (industriesData as any)[slug] || {};
  const currentData = sanityData || jsonData;

  const heading =
    currentData?.hero?.heading ?? `${serviceName} Marketing Agency`;
  const description =
    currentData?.hero?.subheading ??
    `Partner with Digital Neighbour to grow ${serviceName} revenue with data-driven campaigns.`;

  return buildMetadata({
    title: heading,
    description,
    path: `/industry/${slug}`,
  });
}

export default async function IndustryServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!allowedSlugs.includes(slug)) {
    notFound();
  }

  const serviceName = getServiceNameFromSlug(slug) || "Industry";

  // Try to fetch from Sanity first
  const sanityData = await getIndustriesServiceBySlug(slug);

  // Fallback to JSON if not in Sanity
  const jsonData = (industriesData as any)[slug] || {};
  const currentData = sanityData || jsonData;

  const introData = currentData?.introParagraph
    ? {
        heading: currentData.introParagraph.heading,
        problemStatement: currentData.introParagraph.paragraphs?.[0],
        valueProposition: currentData.introParagraph.paragraphs?.[1],
      }
    : undefined;
  const painData = currentData?.painPoints
    ? {
        heading: currentData.painPoints.heading,
        subheading: currentData.painPoints.subheading,
        painPoints: (currentData.painPoints.items || []).map((p: any) => ({
          problem: p.title,
          solution: p.description,
        })),
      }
    : undefined;
  const benefitsData = currentData?.keyBenefits
    ? {
        heading: currentData.keyBenefits.heading,
        subheading: currentData.keyBenefits.subheading,
        benefits: (currentData.keyBenefits.items || []).map((b: any) => ({
          title: b.title,
          description: b.description,
          icon: b.icon,
          image: b.image,
        })),
      }
    : undefined;
  const compatibleProcess = currentData?.process
    ? {
        steps: Array.isArray(currentData.process.steps)
          ? currentData.process.steps.map((s: any) =>
              typeof s === "string" ? s : s.title,
            )
          : [],
        content: Array.isArray(currentData.process.content)
          ? currentData.process.content
          : Array.isArray(currentData.process.steps)
            ? currentData.process.steps.map((s: any) =>
                typeof s === "string" ? "" : s.description || "",
              )
            : [],
      }
    : undefined;

  // Fetch shared data from the main industries entry (slug: "industries")
  const rootIndustriesPromise = getIndustriesServiceBySlug("industries");

  const resolveDefaultHeroVideo = async () => {
    const rootData = await rootIndustriesPromise;
    return (
      rootData?.hero?.defaultHeroVideo?.asset?.url ||
      rootData?.hero?.defaultHeroVideo?.url ||
      null
    );
  };

  const defaultHeroVideo = await resolveDefaultHeroVideo();

  const rootIndustriesData = await rootIndustriesPromise;
  const creativeShowcase = rootIndustriesData?.creativeShowcase
    ? rootIndustriesData.creativeShowcase
    : currentData?.creativeShowcase;
  const industryBrowser = rootIndustriesData?.industryBrowser
    ? rootIndustriesData.industryBrowser
    : currentData?.industryBrowser;

  return (
    <main>
      <div className="relative">
        <Navbar />
        <IndustriesHero
          data={currentData?.hero}
          defaultVideoSrc={defaultHeroVideo}
        />
      </div>
      <Form data={currentData?.form} />
      <BrandsMarquee />
      <IntroParagraph data={introData} />
      <PainPoints data={painData} />
      <IndustryBrowserSection
        heading={industryBrowser?.heading}
        highlightWord={industryBrowser?.highlightWord}
        items={industryBrowser?.items}
      />
      <Content data={currentData?.content} imagePathPrefix="/seo/content" />
      <CreativeShowcase
        title={creativeShowcase?.title}
        highlightWord={creativeShowcase?.highlightWord}
        images={creativeShowcase?.images}
        speedMsPerLoop={5500}
      />
      <CaseStudy />
      <Process2 data={"industries"} processData={compatibleProcess} />
      <KeyBenefits data={benefitsData} />
      <Features data={currentData?.features} />
      <Faq data={(industriesData as any).industries?.faq} />
      <OtherServices />
      <Cta data={currentData?.services} />
      <Footer />
    </main>
  );
}
