import { notFound, redirect } from "next/navigation";
import {
  ensureLocationForService,
  getLocationDisplayName,
  getLocationPageData,
  normalizeLocationSlug,
} from "@/lib/location-data";
import { personalizeSeoData } from "@/lib/seo-location-personalization";
import appDevData from "@/data/app-development.json";
import AppDevHero from "@/components/app-development/hero";
import Certificates from "@/components/app-development/certificates";
import Industries from "@/components/commonSections/industries";
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
import BookACall from "@/components/homepage/bookacall";
import IntroParagraph from "@/components/commonSections/introparagraph";
import PainPoints from "@/components/commonSections/painpoints";
import KeyBenefits from "@/components/commonSections/keybenefits";
import Features from "@/components/commonSections/features";

const allowedSlugs = [
  "app-development",
  "ios-app-development",
  "android-app-development",
  "react-native-development",
  "flutter-app-development",
  "software-development",
  "progressive-web-apps",
];

const DEFAULT_APP_SLUG = "app-development" as const;

export default async function AppDevSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  // Redirect "app-development" to the main app development page
  if (params.slug === "app-development") {
    redirect("/app-development");
  }

  const locationSlug = normalizeLocationSlug(params.slug);

  if (!allowedSlugs.includes(params.slug)) {
    if (locationSlug) {
      const ensuredLocation = ensureLocationForService(
        "app",
        DEFAULT_APP_SLUG,
        locationSlug,
      );
      if (!ensuredLocation) {
        notFound();
      }

      const baseData = appDevData[DEFAULT_APP_SLUG] as any;
      const localizedBase = await getLocationPageData(
        "app",
        DEFAULT_APP_SLUG,
        ensuredLocation,
        baseData,
      );
      const locationName =
        getLocationDisplayName(ensuredLocation) ?? ensuredLocation;
      const personalizedData = personalizeSeoData(localizedBase, locationName);

      return renderAppPage(personalizedData);
    }

    notFound();
  }

  const currentData = appDevData[params.slug as keyof typeof appDevData] as any;

  return renderAppPage(currentData);
}

function renderAppPage(currentData: any) {
  return (
    <main>
      <div className="relative">
        <Navbar />
        <AppDevHero
          data={
            currentData?.hero || {
              heading: "Mobile App Development Services",
              subheading:
                "Design, build, and scale high-performance mobile apps for iOS, Android, and cross-platform platforms.",
            }
          }
        />
      </div>
      <Form data={currentData?.form} />
      <BrandsMarquee />
      <IntroParagraph data={currentData?.introParagraph} />
      <PainPoints data={currentData?.painPoints} />
      <Services
        data={currentData?.services}
        serviceCards={currentData?.serviceCards}
        basePath="/app-development"
      />
      <Content data={currentData?.content} imagePathPrefix="/seo/content" />
      <Industries />
      <CaseStudy />
      <Certificates data={currentData?.certificates} />
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
