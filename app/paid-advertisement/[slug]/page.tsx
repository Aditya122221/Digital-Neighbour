import { notFound, redirect } from "next/navigation";
import { normalizeLocationSlug } from "@/lib/location-data";
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

export default function PaidAdsSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!allowedSlugs.includes(params.slug)) {
    const locationSlug = normalizeLocationSlug(params.slug);
    if (locationSlug) {
      redirect(`/paid-advertisement/google-ads/${locationSlug}`);
    }
    notFound();
  }

  const currentData = paidAdsData[
    params.slug as keyof typeof paidAdsData
  ] as any;

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
