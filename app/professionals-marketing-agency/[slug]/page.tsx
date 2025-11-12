import type { Metadata } from "next";
import { notFound } from "next/navigation";
import professionalsData from "@/data/professionals-marketing.json";
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
import CreativeShowcase from "@/components/industries/creative-showcase";
import HostingServices from "@/components/hosting-it-security/services";
import { buildMetadata, humanizeSlug } from "@/lib/site-metadata";

function getServiceNameFromSlug(slug: string): string | null {
  const mapping = (professionalsData as any).otherServices?.slugMapping || {};
  for (const [name, mappedSlug] of Object.entries(mapping)) {
    if (mappedSlug === slug) return name as string;
  }
  return null;
}

const allowedSlugs: string[] = Object.values(
  ((professionalsData as any).otherServices?.slugMapping as Record<
    string,
    string
  >) || {},
) as string[];

export function generateStaticParams() {
  return allowedSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const serviceName =
    getServiceNameFromSlug(slug) ??
    humanizeSlug(slug) ??
    "Professionals Marketing";
  const currentData = (professionalsData as any)[slug] || {};

  const heading =
    currentData?.hero?.heading ?? `${serviceName} Marketing Agency`;
  const description =
    currentData?.hero?.subheading ??
    `Accelerate growth for ${serviceName} practices with tailored campaigns from Digital Neighbour.`;

  return buildMetadata({
    title: heading,
    description,
    path: `/professionals-marketing-agency/${slug}`,
  });
}

export default async function ProfessionalsMarketingServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!allowedSlugs.includes(slug)) {
    notFound();
  }

  const serviceName = getServiceNameFromSlug(slug) || "Professionals Marketing";
  const currentData = (professionalsData as any)[slug] || {};

  const introData = currentData?.introParagraph
    ? {
        heading: currentData.introParagraph.heading,
        problemStatement: currentData.introParagraph?.paragraphs?.[0],
        valueProposition: currentData.introParagraph?.paragraphs?.[1],
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

  return (
    <main>
      <div className="relative">
        <Navbar />
        <IndustriesHero data={currentData?.hero} />
      </div>
      <Form data={currentData?.form} />
      <BrandsMarquee />
      <IntroParagraph data={introData} />
      <PainPoints data={painData} />
      <HostingServices
        data={currentData?.services}
        serviceCards={currentData?.serviceCards}
        basePath="/professionals-marketing-agency"
        premiumCloudServices={currentData?.premiumCloudServices}
      />
      <Content data={currentData?.content} imagePathPrefix="/seo/content" />
      <Apart />
      <CaseStudy />
      <Process2 data={currentData?.services} processData={compatibleProcess} />
      <KeyBenefits data={benefitsData} />
      <Features data={currentData?.features} />
      <Faq data={currentData?.faq} />
      <OtherServices />
      <Cta data={currentData?.services} />
      <Footer />
    </main>
  );
}
