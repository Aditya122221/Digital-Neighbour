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
    buttonText?: string;
    buttonLink?: string;
    highlightWord?: string;
    trustedBy?: {
      text?: string;
      profiles?: string[];
    };
    images?: {
      effortlessO?: string;
      designD?: string;
      aucklandO?: string;
    };
  };
  brandInfo?: {
    main?: {
      heading?: string;
      highlightWord?: string;
      subheading?: string;
    };
    differentiators?: {
      id?: string | number;
      title?: string;
      description?: string;
      icon?: string;
    }[];
    rightCard?: {
      heading?: string;
      description?: string;
      stats?: {
        id?: string;
        value?: string;
        label?: string;
      }[];
    };
    buttonText?: string;
    buttonLink?: string;
  };
  services?: {
    heading?: string;
    highlightWord?: string;
    subheading?: string;
    buttonText?: string;
    buttonLink?: string;
    rightCard?: {
      video?: string;
      title?: string;
      subheading?: string[];
    }[];
  };
  keepYourStack?: {
    heading?: string;
    highlight?: string;
    highlightWord?: string;
    description?: string;
    logos?: {
      name?: string;
      svg?: string;
      bgColor?: string;
      textColor?: string;
    }[];
  };
  contentSection?: {
    heading?: string;
    highlightWord?: string;
    subheading?: string;
    benefits?: {
      id?: number;
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
  trustedBrands?: {
    heading?: string;
    logos?: {
      name?: string;
      image?: string;
    }[];
  };
  testimonials?: {
    eyebrow?: string;
    heading?: string;
    testimonials?: {
      quote?: string;
      author?: string;
      position?: string;
      number?: string;
      image?: string;
    }[];
  };
  bookACall?: {
    heading?: string;
    description?: string;
    subDescription?: string;
    buttonText?: string;
    buttonLink?: string;
    illustrationImage?: string;
  };
  apart?: {
    heading?: string;
    tagline?: string;
    oursTitle?: string;
    othersTitle?: string;
    ours?: string[];
    others?: string[];
  };
};

const getImageUrl = (image: any): string => {
  if (!image) return "";
  if (typeof image === "string") return image;
  if (image.asset?.url) {
    return image.asset.url;
  }
  if (image.asset?._ref) {
    try {
      return urlForImage(image).url();
    } catch {
      return "";
    }
  }
  return "";
};

const getFileUrl = (file: any): string => {
  if (!file) return "";
  if (typeof file === "string") return file;
  if (file.asset?.url) {
    return file.asset.url;
  }
  return "";
};

function transformSanityData(sanityData: any): HomePageData | null {
  if (!sanityData) return null;

  const settings = sanityData.settings ?? {};
  const heroDoc = sanityData.hero ?? {};
  const brandInfoDoc = sanityData.brandInfo ?? {};
  const servicesDoc = sanityData.services ?? {};
  const stackDoc = sanityData.keepYourStack ?? {};
  const contentDoc = sanityData.contentSection ?? {};
  const processDoc = sanityData.process ?? {};
  const trustedBrandsDoc = sanityData.trustedBrands ?? {};
  const testimonialsDoc = sanityData.testimonials ?? {};
  const bookACallDoc = sanityData.bookACall ?? {};
  const apartDoc = sanityData.apart ?? {};

  return {
    metadata: settings.metadata || settings.title || "",
    description: settings.description || "",
    hero: {
      heading: heroDoc.heading || "",
      subheading: heroDoc.subheading || "",
      buttonText: heroDoc.buttonText || "",
      buttonLink: heroDoc.buttonLink || "",
      highlightWord: heroDoc.highlightWord || "",
      trustedBy: heroDoc.topImages && heroDoc.topImages.length >= 3
        ? {
            text: heroDoc.trustedByText || "Trusted by founders",
            profiles: heroDoc.topImages
              .slice(0, 3)
              .map((img: any) => getImageUrl(img))
              .filter(Boolean),
          }
        : undefined,
      images: heroDoc.inlineImages && heroDoc.inlineImages.length > 0
        ? {
            effortlessO: heroDoc.inlineImages.find(
              (img: any) => img.word?.toLowerCase() === "effortless"
            )
              ? getImageUrl(
                  heroDoc.inlineImages.find(
                    (img: any) => img.word?.toLowerCase() === "effortless"
                  )
                )
              : undefined,
            designD: heroDoc.inlineImages.find(
              (img: any) => img.word?.toLowerCase() === "design"
            )
              ? getImageUrl(
                  heroDoc.inlineImages.find(
                    (img: any) => img.word?.toLowerCase() === "design"
                  )
                )
              : undefined,
            aucklandO: heroDoc.inlineImages.find(
              (img: any) => img.word?.toLowerCase() === "auckland"
            )
              ? getImageUrl(
                  heroDoc.inlineImages.find(
                    (img: any) => img.word?.toLowerCase() === "auckland"
                  )
                )
              : undefined,
          }
        : undefined,
    },
    brandInfo: {
      main: {
        heading: brandInfoDoc.main?.heading || "",
        highlightWord: brandInfoDoc.main?.highlightWord || "",
        subheading: brandInfoDoc.main?.subheading || "",
      },
      differentiators:
        brandInfoDoc.differentiators?.map((diff: any) => ({
          id: diff.id ?? "",
          title: diff.title || "",
          description: diff.description || "",
          icon: diff.icon || "",
        })) || [],
      rightCard: {
        heading: brandInfoDoc.rightCard?.heading || "",
        description: brandInfoDoc.rightCard?.description || "",
        stats:
          brandInfoDoc.rightCard?.stats?.map((stat: any) => ({
            id: stat.id ?? "",
            value: stat.value || "",
            label: stat.label || "",
          })) || [],
      },
      buttonText: brandInfoDoc.buttonText || "",
      buttonLink: brandInfoDoc.buttonLink || "",
    },
    services: {
      heading: servicesDoc.heading || "",
      highlightWord: servicesDoc.highlightWord || "",
      subheading: servicesDoc.subheading || "",
      buttonText: servicesDoc.buttonText || "",
      buttonLink: servicesDoc.buttonLink || "",
      rightCard:
        servicesDoc.rightCard?.map((card: any) => ({
          video: getFileUrl(card.video),
          title: card.title || "",
          subheading: card.subheading || [],
        })) || [],
    },
    keepYourStack: {
      heading: stackDoc.heading || "",
      highlight: stackDoc.highlight || stackDoc.highlightWord || "",
      highlightWord: stackDoc.highlightWord || stackDoc.highlight || "",
      description: stackDoc.description || "",
      logos:
        stackDoc.logos?.map((logo: any) => ({
          name: logo.name || "",
          svg: getImageUrl(logo.image),
          bgColor: logo.bgColor || "",
          textColor: logo.textColor || "",
        })) || [],
    },
    contentSection: {
      heading: contentDoc.heading || "",
      highlightWord: contentDoc.highlightWord || "",
      subheading: contentDoc.subheading || "",
      benefits:
        contentDoc.benefits?.map((benefit: any) => ({
          id: benefit.id,
          title: benefit.title || "",
          description: benefit.description || "",
          icon: benefit.icon || "",
          stat: benefit.stat || "",
        })) || [],
    },
    process: {
      steps: processDoc.steps || [],
      content: processDoc.content || [],
    },
    trustedBrands: {
      heading: trustedBrandsDoc.heading || "",
      logos:
        trustedBrandsDoc.logos?.map((logo: any) => ({
          name: logo.name || "",
          image: getImageUrl(logo.image),
        })) || [],
    },
    testimonials: {
      eyebrow: testimonialsDoc.eyebrow || "",
      heading: testimonialsDoc.heading || "",
      testimonials:
        testimonialsDoc.testimonials?.map((testimonial: any) => ({
          quote: testimonial.quote || "",
          author: testimonial.author || "",
          position: testimonial.position || "",
          number: testimonial.number || "",
          image: getImageUrl(testimonial.image),
        })) || [],
    },
    bookACall: {
      heading: bookACallDoc.heading || "",
      description: bookACallDoc.description || "",
      subDescription: bookACallDoc.subDescription || "",
      buttonText: bookACallDoc.buttonText || "",
      buttonLink: bookACallDoc.buttonLink || "",
      illustrationImage: getImageUrl(bookACallDoc.illustrationImage),
    },
    apart: {
      heading: apartDoc.heading || "",
      tagline: apartDoc.tagline || "",
      oursTitle: apartDoc.oursTitle || "",
      othersTitle: apartDoc.othersTitle || "",
      ours: apartDoc.ours || [],
      others: apartDoc.others || [],
    },
  };
}
export async function getHomePageData(): Promise<HomePageData> {
  try {
    // Fetch fresh data from Sanity (no caching due to page-level dynamic config)
    const sanityData = await sanityFetch({ query: homePageQuery });
    const transformed = transformSanityData(sanityData);
    // Check if we got any meaningful data from Sanity (not just metadata)
    if (
      transformed &&
      (transformed.hero?.heading ||
        transformed.brandInfo?.main?.heading ||
        transformed.services?.heading ||
        transformed.keepYourStack?.heading ||
        transformed.contentSection?.heading ||
        transformed.process?.steps?.length)
    ) {
      return transformed;
    }
  } catch (error) {
    // Log error for debugging but fallback to JSON
    console.error("Error fetching home page data from Sanity:", error);
  }

  // Fallback to JSON
  return homeDataJson as HomePageData;
}

