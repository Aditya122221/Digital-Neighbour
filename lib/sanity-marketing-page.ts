import { sanityFetch } from "@/sanity/lib/fetch";
import { marketingAgencyPageQuery } from "@/sanity/lib/queries";

type SanityFileReference = {
  asset?: {
    _id?: string;
    url?: string;
    metadata?: Record<string, unknown>;
  };
  url?: string;
};

type ImageWithIcon = {
  title?: string;
  description?: string;
  icon?: string;
  image?: string;
};

export type MarketingAgencyPageData = {
  title?: string;
  metadata?: string;
  description?: string;
  hero?: {
    heading?: string;
    subheading?: string;
    ctaText?: string;
    ctaHref?: string;
    defaultHeroVideo?: SanityFileReference;
    video?: SanityFileReference;
  };
  form?: {
    heading?: string;
    content?: string;
    subContent?: string;
    cta?: string;
    formHeading?: string;
    buttonText?: string;
  };
  introParagraph?: {
    heading?: string;
    problemStatement?: string;
    valueProposition?: string;
  };
  painPoints?: {
    heading?: string;
    subheading?: string;
    painPoints?: {
      problem?: string;
      solution?: string;
    }[];
  };
  services?: string;
  process?: {
    heading?: string;
    steps?: string[];
    content?: string[];
  };
  keyBenefits?: {
    heading?: string;
    subheading?: string;
    benefits?: ImageWithIcon[];
    items?: ImageWithIcon[];
  };
  features?: {
    heading?: string;
    subheading?: string;
    features?: ImageWithIcon[];
  };
  howFast?: {
    heading?: string;
    highlightWord?: string;
    headline?: string;
    principles?: {
      title?: string;
      description?: string;
      icon?: SanityFileReference;
    }[];
  };
  faq?: {
    serviceName?: string;
    tagline?: string;
    heading?: string;
    subheading?: string;
    faqs?: {
      q?: string;
      a?: string;
    }[];
  };
};

type MarketingAgencySanityResponse = {
  settings?: {
    title?: string;
    metadata?: string;
    description?: string;
    serviceLabel?: string;
  };
  hero?: MarketingAgencyPageData["hero"];
  form?: MarketingAgencyPageData["form"];
  introParagraph?: MarketingAgencyPageData["introParagraph"];
  painPoints?: {
    heading?: string;
    subheading?: string;
    items?: {
      problem?: string;
      solution?: string;
    }[];
  };
  process?: MarketingAgencyPageData["process"];
  keyBenefits?: MarketingAgencyPageData["keyBenefits"];
  features?: MarketingAgencyPageData["features"];
  faq?: MarketingAgencyPageData["faq"];
  howFast?: MarketingAgencyPageData["howFast"];
};

const mapFileReference = (
  file?: SanityFileReference | null,
): SanityFileReference | undefined => {
  if (!file) {
    return undefined;
  }

  const asset = file.asset
    ? {
        _id: file.asset._id,
        url: file.asset.url,
        metadata: file.asset.metadata,
      }
    : undefined;

  return {
    asset,
    url: file.url ?? asset?.url,
  };
};

function transformMarketingData(
  data: MarketingAgencySanityResponse | null,
): MarketingAgencyPageData | null {
  if (!data) {
    return null;
  }

  const hasContent =
    data.hero?.heading ||
    data.form?.heading ||
    data.process?.steps?.length ||
    data.keyBenefits?.benefits?.length ||
    data.keyBenefits?.items?.length ||
    data.features?.features?.length;

  if (!hasContent) {
    return null;
  }

  return {
    title: data.settings?.title,
    metadata: data.settings?.metadata,
    description: data.settings?.description,
    services: data.settings?.serviceLabel,
    hero: data.hero
      ? {
          ...data.hero,
          defaultHeroVideo: mapFileReference(data.hero.defaultHeroVideo),
          video: mapFileReference(data.hero.video),
        }
      : undefined,
    form: data.form,
    introParagraph: data.introParagraph,
    painPoints: data.painPoints
      ? {
          heading: data.painPoints.heading,
          subheading: data.painPoints.subheading,
          painPoints:
            data.painPoints.items?.map((item) => ({
              problem: item.problem,
              solution: item.solution,
            })) ?? [],
        }
      : undefined,
    process: data.process,
    keyBenefits: data.keyBenefits
      ? {
          ...data.keyBenefits,
          benefits:
            data.keyBenefits.benefits?.map((item) => ({
              ...item,
              image: item.image ? mapFileReference(item.image)?.url : undefined,
            })) ?? [],
          items:
            data.keyBenefits.items?.map((item) => ({
              ...item,
              image: item.image ? mapFileReference(item.image)?.url : undefined,
            })) ?? [],
        }
      : undefined,
    features: data.features
      ? {
          ...data.features,
          features:
            data.features.features?.map((item) => ({
              ...item,
              image: item.image
                ? mapFileReference(item.image)?.url
                : undefined,
            })) ?? [],
        }
      : undefined,
    faq: data.faq,
    howFast: data.howFast
      ? {
          heading: data.howFast.heading,
          highlightWord: data.howFast.highlightWord,
          headline: data.howFast.headline,
          principles:
            data.howFast.principles?.map((item) => ({
              title: item.title,
              description: item.description,
              icon: mapFileReference(item.icon),
            })) ?? [],
        }
      : undefined,
  };
}

export async function getMarketingAgencyPage(): Promise<MarketingAgencyPageData | null> {
  try {
    const sanityData = await sanityFetch<MarketingAgencySanityResponse | null>({
      query: marketingAgencyPageQuery,
    });
    return transformMarketingData(sanityData);
  } catch (error) {
    console.error(
      "Error fetching marketing agency page data from Sanity:",
      error,
    );
    return null;
  }
}
