import { sanityFetch } from "@/sanity/lib/fetch";
import { casePageQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import caseDataJson from "@/data/case.json";

type CaseStudy = {
  title?: string;
  textColor?: string;
  bgImages?: string[];
  metrics?: {
    number?: string;
    text?: string;
  }[];
  services?: string[];
  isNew?: boolean;
};

type CasePageData = {
  caseStudies?: CaseStudy[];
};

function transformSanityData(sanityData: any): CasePageData | null {
  if (!sanityData || !sanityData.caseStudies) return null;

  return {
    caseStudies: sanityData.caseStudies.map((study: any) => ({
      title: study.title || "",
      textColor: study.textColor || "text-blackbrown",
      bgImages:
        study.bgImages?.map((img: any) => {
          if (img?.asset?.url) {
            return img.asset.url;
          }
          if (img?.asset?._id) {
            try {
              return urlForImage(img).url();
            } catch {
              return "";
            }
          }
          return "";
        }) || [],
      metrics:
        study.metrics?.map((metric: any) => ({
          number: metric.number || "",
          text: metric.text || "",
        })) || [],
      services: study.services || [],
      isNew: Boolean(study.isNew),
    })),
  };
}

export async function getCasePageData(): Promise<CaseStudy[]> {
  try {
    const sanityData = await sanityFetch(casePageQuery);
    const transformed = transformSanityData(sanityData);
    if (transformed && transformed.caseStudies) {
      return transformed.caseStudies;
    }
  } catch (error) {
    // Silently fallback to JSON
  }

  // Fallback to JSON - remove id fields
  return (caseDataJson as any[]).map((study) => ({
    title: study.title || "",
    textColor: study.textColor || "text-blackbrown",
    bgImages: study.bgImages || [],
    metrics: study.metrics?.map((m: any) => ({
      number: m.number || "",
      text: m.text || "",
    })) || [],
    services: study.services || [],
    isNew: Boolean(study.isNew),
  }));
}

