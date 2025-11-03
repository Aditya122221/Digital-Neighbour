import { notFound } from "next/navigation";
import socialData from "@/data/social-media.json";
import SocialMediaHero from "@/components/social-media/hero";
import PainPoints from "@/components/social-media/painpoints";
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
  "social-media-marketing",
  "facebook-marketing",
  "instagram-marketing",
  "linkedin-marketing",
  "tiktok-marketing",
  // X (Twitter)
  "x-marketing",
  "pinterest-marketing",
  "youtube-community-marketing",
  // Additional services
  "snapchat-marketing",
  "reddit-marketing",
  "influencer-marketing",
  // Back-compat old slugs (optional)
  "social-media-management",
  "facebook-management",
  "instagram-management",
  "linkedin-management",
  "tiktok-management",
  "twitter-x-management",
  "pinterest-management",
  "youtube-community-management",
];

export default function SocialMediaMarketingSlugPage({ params }: { params: { slug: string } }) {
  if (!allowedSlugs.includes(params.slug)) {
    notFound();
  }

  const key = (params.slug as string) as keyof typeof socialData;
  const currentData = (socialData as any)[key] as any;

  return (
    <main>
      <div className="relative">
        <Navbar />
        <SocialMediaHero
          data={
            currentData?.hero || {
              heading: "Social Media Marketing that Drives Growth",
              subheading:
                "Strategic content, community marketing, and insights for Meta, LinkedIn, TikTok, and more.",
              ctaText: "Market My Brand",
            }
          }
        />
      </div>
      <SeoForm data={currentData?.form} />
      <BrandsMarquee />
      <SeoServices
        data={currentData?.services}
        serviceCards={currentData?.serviceCards}
        basePath="/social-media-marketing"
      />
      <PainPoints data={currentData?.painpoints} />
      <SeoContent data={currentData?.content} />
      <Process2 data={currentData?.services} processData={currentData?.process} />
      <Apart />
      <CaseStudy />
      <OtherServices />
      <SeoFaq data={currentData?.faq} />
      <SeoCta data={currentData?.services} />
      <Footer />
    </main>
  );
}


