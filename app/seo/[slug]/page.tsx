import { notFound } from "next/navigation";
import seoData from "@/data/seo.json";
import SeoHero from "@/components/seo/hero";
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
import Blogs from "@/components/homepage/blogs";
import Testimonials from "@/components/homepage/testimonials";
import BookACall from "@/components/homepage/bookacall";

const allowedSlugs = [
  "search-engine-optimisation",
  "local-seo",
  "wordpress-seo",
  "ecom-seo",
  "ai-seo",
  "shopify-seo",
  "seo-audits",
  "online-reputation-management",
  "seo-migration",
  "small-business-seo",
  "lead-generation",
  "link-building",
  "international-seo",
  "mobile-seo",
  "voice-search-optimisation",
  "video-seo",
  "youtube-seo",
  "seo-strategy",
  "geo",
  "sge",
  "app-store-optimisation",
  "guest-posting",
  "local-citations",
  "penalty-recovery",
  "multilingual-seo",
];

export default function SeoSlugPage({ params }: { params: { slug: string } }) {
  if (!allowedSlugs.includes(params.slug)) {
    notFound();
  }
  
  const currentSeoData = seoData[params.slug as keyof typeof seoData] as any;
  
  return (
    <main>
      <div className="relative">
        <Navbar />
        <SeoHero data={currentSeoData?.hero || { heading: "Award-Winning SEO Marketing Agency", subheading: "We've helped leading and emerging brands scale their traffic and revenue organically for over a decade with our experience in seo consulting." }} />
      </div>
      <SeoForm data={currentSeoData?.form} />
      <BrandsMarquee />
      <SeoServices data={currentSeoData?.services} serviceCards={currentSeoData?.serviceCards} />
      <Process2 data={currentSeoData?.services} />
      <SeoContent data={currentSeoData?.content} />
      <SeoCta data={currentSeoData?.services} />
      <Apart />
      <OtherServices />
      <CaseStudy />
      <SeoFaq data={currentSeoData?.faq} />
      <Blogs />
      <Testimonials />
      <BookACall />
      <Footer />
    </main>
  );
}
