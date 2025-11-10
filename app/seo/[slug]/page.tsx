import { notFound, redirect } from "next/navigation";
import {
  ensureLocationForService,
  getLocationDisplayName,
  getLocationPageData,
  normalizeLocationSlug,
} from "@/lib/location-data";
import { personalizeSeoData } from "@/lib/seo-location-personalization";
import seoData from "@/data/seo.json";
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

const slugAliases: Record<string, keyof typeof seoData> = {
  seo: "search-engine-optimisation",
  localseo: "local-seo",
  "seo-audit": "seo-audits",
  orm: "online-reputation-management",
};

const DEFAULT_SEO_SLUG = "search-engine-optimisation" as const;

export default async function SeoSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const requestedSlug = params.slug;

  const resolvedKey = (
    Object.prototype.hasOwnProperty.call(seoData, requestedSlug)
      ? requestedSlug
      : slugAliases[requestedSlug]
  ) as keyof typeof seoData | undefined;

  // Redirect "search-engine-optimisation" to the main SEO page
  if (
    requestedSlug === "search-engine-optimisation" ||
    resolvedKey === "search-engine-optimisation"
  ) {
    redirect("/seo");
  }

  const locationSlug = normalizeLocationSlug(requestedSlug);

  if (!resolvedKey || !seoData[resolvedKey]) {
    if (locationSlug) {
      const ensuredLocation = ensureLocationForService(
        "seo",
        DEFAULT_SEO_SLUG,
        locationSlug,
      );
      if (!ensuredLocation) {
        notFound();
      }

      const baseData = seoData[DEFAULT_SEO_SLUG] as any;
      const localizedBase = await getLocationPageData(
        "seo",
        DEFAULT_SEO_SLUG,
        ensuredLocation,
        baseData,
      );
      const locationName =
        getLocationDisplayName(ensuredLocation) ?? ensuredLocation;
      const personalizedData = personalizeSeoData(localizedBase, locationName);

      return renderSeoPage(personalizedData);
    }

    notFound();
  }

  const currentSeoData = seoData[resolvedKey] as any;

  return renderSeoPage(currentSeoData);
}

function renderSeoPage(data: any) {
  return (
    <main>
      <div className="relative">
        <Navbar />
        <SeoHero
          data={
            data?.hero || {
              heading: "Award-Winning SEO Marketing Agency",
              subheading:
                "We've helped leading and emerging brands scale their traffic and revenue organically for over a decade with our experience in seo consulting.",
            }
          }
        />
      </div>
      <Form data={data?.form} />
      <BrandsMarquee />
      <IntroParagraph data={data?.introParagraph} />
      <PainPoints data={data?.painPoints} />
      <Services data={data?.services} serviceCards={data?.serviceCards} />
      <Content data={data?.content} imagePathPrefix="/seo/content" />
      <Cta data={data?.services} />
      <Apart />
      <Process2
        data={data?.services}
        processData={data?.process || seoData[DEFAULT_SEO_SLUG]?.process}
      />
      <KeyBenefits data={data?.keyBenefits} />
      <Features data={data?.features} />
      <CaseStudy />
      <Faq data={data?.faq} />
      <OtherServices />
      <Blogs />
      <TestimonalTwo />
      <BookACall />
      <Footer />
    </main>
  );
}
