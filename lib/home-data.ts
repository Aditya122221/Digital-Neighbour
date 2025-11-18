import { sanityFetch } from "@/sanity/lib/fetch";
import { homePageQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import homeDataJson from "@/data/home.json";

type HomePageData = {
  metadata?: string;
  description?: string;
  hero?: {
    heading?: string;
    subheading?: string;
    images?: string[];
  };
  brandInfo?: {
    main?: {
      heading?: string;
      subheading?: string;
    };
    differentiators?: {
      title?: string;
      description?: string;
      icon?: string;
    }[];
    rightCard?: {
      heading?: string;
      description?: string;
      stats?: {
        value?: string;
        label?: string;
      }[];
    };
  };
  services?: {
    heading?: string;
    subheading?: string;
    rightCard?: {
      video?: string;
      title?: string;
      subheading?: string[];
    }[];
  };
  keepYourStack?: {
    logos?: {
      name?: string;
      svg?: string;
    }[];
  };
  contentSection?: {
    heading?: string;
    subheading?: string;
    benefits?: {
      title?: string;
      description?: string;
      icon?: string;
      stat?: string;
    }[];
  };
  process?: {
    steps?: string[];
    content?: string[];
  };
};

function transformSanityData(sanityData: any): HomePageData | null {
  if (!sanityData) return null;

  return {
    metadata: sanityData.metadata || "",
    description: sanityData.description || "",
    hero: {
      heading: sanityData.hero?.heading || "",
      subheading: sanityData.hero?.subheading || "",
      images:
        sanityData.hero?.images?.map((img: any) => {
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
    },
    brandInfo: {
      main: {
        heading: sanityData.brandInfo?.main?.heading || "",
        subheading: sanityData.brandInfo?.main?.subheading || "",
      },
      differentiators:
        sanityData.brandInfo?.differentiators?.map((diff: any) => ({
          title: diff.title || "",
          description: diff.description || "",
          icon: diff.icon || "",
        })) || [],
      rightCard: {
        heading: sanityData.brandInfo?.rightCard?.heading || "",
        description: sanityData.brandInfo?.rightCard?.description || "",
        stats:
          sanityData.brandInfo?.rightCard?.stats?.map((stat: any) => ({
            value: stat.value || "",
            label: stat.label || "",
          })) || [],
      },
    },
    services: {
      heading: sanityData.services?.heading || "",
      subheading: sanityData.services?.subheading || "",
      rightCard:
        sanityData.services?.rightCard?.map((card: any) => ({
          video: card.video || "",
          title: card.title || "",
          subheading: card.subheading || [],
        })) || [],
    },
    keepYourStack: {
      logos:
        sanityData.keepYourStack?.logos?.map((logo: any) => ({
          name: logo.name || "",
          svg: logo.svg || "",
        })) || [],
    },
    contentSection: {
      heading: sanityData.contentSection?.heading || "",
      subheading: sanityData.contentSection?.subheading || "",
      benefits:
        sanityData.contentSection?.benefits?.map((benefit: any) => ({
          title: benefit.title || "",
          description: benefit.description || "",
          icon: benefit.icon || "",
          stat: benefit.stat || "",
        })) || [],
    },
    process: {
      steps: sanityData.process?.steps || [],
      content: sanityData.process?.content || [],
    },
  };
}

export async function getHomePageData(): Promise<HomePageData> {
  try {
    // Fetch fresh data from Sanity (no caching due to page-level dynamic config)
    const sanityData = await sanityFetch(homePageQuery);
    const transformed = transformSanityData(sanityData);
    if (transformed && transformed.metadata) {
      return transformed;
    }
  } catch (error) {
    // Silently fallback to JSON
  }

  // Fallback to JSON
  return homeDataJson as HomePageData;
}

