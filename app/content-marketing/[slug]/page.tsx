import { notFound } from "next/navigation";
import contentMarketingData from "@/data/content-marketing.json";
import ContentMarketingHero from "@/components/content-marketing/hero";
import Strategic from "@/components/content-marketing/strategic";
import SeoContent from "@/components/seo/content";
import SeoServices from "@/components/seo/services";
import SeoForm from "@/components/seo/form";
import Navbar from "@/components/core/navbar";
import Footer from "@/components/core/footer";
import BrandsMarquee from "@/components/homepage/brandsmarquee";
import Process2 from "@/components/homepage/process2";
import SeoCta from "@/components/seo/cta";
import Apart from "@/components/homepage/apart";
import OtherServices from "@/components/seo/otherservices";
import SeoFaq from "@/components/seo/faq";
import CaseStudy from "@/components/homepage/casestudy";

const allowedSlugs = [
  "content-marketing",
  "blog-writing",
  "content-strategy",
  "social-media-content",
  "email-newsletters",
  "video-content",
  "infographics",
  "whitepapers",
  "case-studies",
  "ebooks",
  "podcast-content",
  "copywriting",
  "graphic-designing",
  "video-editing",
  "photo-shoot",
  "video-shoot",
  "infographic-design",
  "website-copywriting",
  "sales-copywriting",
  "press-release-writing",
  "ad-copywriting",
  "logo-design",
  "email-marketing",
  "pr-outreach",
  "branding",
  "data-and-analytics",
  "conversion-rate-optimization",
  "call-tracking",
  "reporting-and-dashboards",
  "google-analytics",
  "google-tag-manager",
];

export default function ContentMarketingSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!allowedSlugs.includes(params.slug)) {
    notFound();
  }

  const currentData =
    contentMarketingData[
      params.slug as keyof typeof contentMarketingData
    ] as any;

  return (
    <main>
      <div className="relative">
        <Navbar />
        <ContentMarketingHero
          data={
            currentData?.hero || {
              heading: "Strategic Content Marketing",
              subheading:
                "We create compelling content that drives engagement, builds authority, and converts visitors into customers.",
            }
          }
        />
      </div>
      <SeoForm data={currentData?.form} />
      <BrandsMarquee />
      <SeoServices
        data={currentData?.services}
        serviceCards={currentData?.serviceCards}
        basePath="/content-marketing"
      />
      <Strategic
        data={currentData?.strategic}
        serviceName={currentData?.services}
      />
      <SeoContent data={currentData?.content} />
      <Process2
        data={currentData?.services}
        processData={
          currentData?.process ||
          contentMarketingData["content-marketing"]?.process
        }
      />
      <Apart />
      <CaseStudy />
      <OtherServices />
      <SeoFaq data={currentData?.faq} />
      <SeoCta data={currentData?.services} />
      <Footer />
    </main>
  );
}
