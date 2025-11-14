import type { Image } from "sanity";

import homeData from "@/data/home.json";
import { sanityFetch } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";
import { homePageQuery } from "@/sanity/lib/queries";

type HomePageData = typeof homeData;

type Keyed<T> = T & { _key?: string };

type SanityHomePageData = {
  metadata?: string;
  description?: string;
  hero?: {
    heading?: string;
    subheading?: string;
    images?: Array<string | Image>;
  };
  brandInfo?: {
    main?: {
      heading?: string;
      subheading?: string;
    };
    differentiators?: Array<
      Keyed<{
        id?: number;
        title?: string;
        description?: string;
        icon?: string;
      }>
    >;
    rightCard?: {
      heading?: string;
      description?: string;
      stats?: Array<
        Keyed<{
          id?: string;
          value?: string;
          label?: string;
        }>
      >;
    };
  };
  services?: {
    heading?: string;
    subheading?: string;
    cards?: Array<
      Keyed<{
        title?: string;
        video?: string;
        subheading?: string[];
      }>
    >;
  };
  keepYourStack?: {
    heading?: string;
    highlight?: string;
    description?: string;
    logos?: Array<
      Keyed<{
        name?: string;
        svg?: string | Image;
      }>
    >;
  };
  caseStudies?: {
    heading?: string;
    items?: Array<
      Keyed<{
        id?: number;
        title?: string;
        textColor?: string;
        isNew?: boolean;
        services?: string[];
        bgImages?: Array<string | Image>;
        metrics?: Array<
          Keyed<{
            number?: string;
            text?: string;
          }>
        >;
      }>
    >;
  };
  contentSection?: {
    heading?: string;
    subheading?: string;
    benefits?: Array<
      Keyed<{
        id?: number;
        title?: string;
        description?: string;
        stat?: string;
        icon?: string;
      }>
    >;
  };
  apart?: {
    ours?: string[];
    others?: string[];
  };
  process?: {
    label?: string;
    steps?: string[];
    content?: string[];
  };
};

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends object
      ? DeepPartial<T[P]>
      : T[P];
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const cloneFallback = (): HomePageData =>
  JSON.parse(JSON.stringify(homeData)) as HomePageData;

const deepMerge = <T>(base: T, source?: DeepPartial<T>): T => {
  if (source === undefined) {
    return base;
  }

  if (Array.isArray(base) && Array.isArray(source)) {
    return source as T;
  }

  if (isRecord(base) && isRecord(source)) {
    const result: Record<string, unknown> = {
      ...(base as Record<string, unknown>),
    };

    for (const [key, value] of Object.entries(source)) {
      if (value === undefined) {
        continue;
      }

      const baseValue = (base as Record<string, unknown>)[key];
      result[key] =
        baseValue !== undefined
          ? deepMerge(baseValue, value as DeepPartial<typeof baseValue>)
          : value;
    }

    return result as T;
  }

  return source as T;
};

const normalizeHomePageData = (
  data: SanityHomePageData,
): DeepPartial<HomePageData> => {
  const normalized: DeepPartial<HomePageData> = {};

  const getImageUrl = (
    image: string | Image | undefined | null,
  ): string | undefined => {
    if (!image) {
      return undefined;
    }

    if (typeof image === "string") {
      return image;
    }

    try {
      return urlForImage(image).url();
    } catch (error) {
      console.warn("Failed to build hero image URL from Sanity asset:", error);
      return undefined;
    }
  };

  if (typeof data.metadata === "string") {
    normalized.metadata = data.metadata;
  }

  if (typeof data.description === "string") {
    normalized.description = data.description;
  }

  if (data.hero) {
    const heroImages = data.hero.images
      ?.map((image) => getImageUrl(image))
      .filter((src): src is string => Boolean(src));

    normalized.hero = {
      heading: data.hero.heading,
      subheading: data.hero.subheading,
      images: heroImages,
    };
  }

  if (data.brandInfo) {
    normalized.brandInfo = {};

    if (data.brandInfo.main) {
      normalized.brandInfo.main = {
        heading: data.brandInfo.main.heading,
        subheading: data.brandInfo.main.subheading,
      };
    }

    if (data.brandInfo.differentiators) {
      normalized.brandInfo.differentiators = data.brandInfo.differentiators.map(
        (item, index) => ({
          id:
            typeof item.id === "number"
              ? item.id
              : Number.isFinite(item.id)
                ? Number(item.id)
                : index + 1,
          title: item.title,
          description: item.description,
          icon: item.icon,
        }),
      );
    }

    if (data.brandInfo.rightCard) {
      normalized.brandInfo.rightCard = {
        heading: data.brandInfo.rightCard.heading,
        description: data.brandInfo.rightCard.description,
        stats: data.brandInfo.rightCard.stats?.map((stat, index) => ({
          id: stat.id ?? stat._key ?? `stat-${index}`,
          value: stat.value,
          label: stat.label,
        })),
      };
    }
  }

  if (data.services) {
    normalized.services = {
      heading: data.services.heading,
      subheading: data.services.subheading,
      rightCard: data.services.cards?.map((card, index) => ({
        title: card.title ?? `Service ${index + 1}`,
        video: card.video ?? "",
        subheading: card.subheading ?? [],
      })),
    };
  }

  if (data.keepYourStack) {
    normalized.keepYourStack = {
      heading: data.keepYourStack.heading,
      highlight: data.keepYourStack.highlight,
      description: data.keepYourStack.description,
      logos: data.keepYourStack.logos?.map((logo, index) => ({
        name: logo.name ?? `Logo ${index + 1}`,
        svg: getImageUrl(logo.svg) ?? "",
      })),
    };
  }

  if (data.caseStudies) {
    normalized.caseStudies = {
      heading: data.caseStudies.heading,
      items: data.caseStudies.items?.map((item, index) => ({
        id: typeof item.id === "number" ? item.id : index + 1,
        title: item.title,
        textColor: item.textColor,
        isNew: item.isNew,
        services: item.services,
        bgImages: item.bgImages
          ?.map((image) => getImageUrl(image))
          .filter((src): src is string => Boolean(src)),
        metrics: item.metrics?.map((metric) => ({
          number: metric.number,
          text: metric.text,
        })),
      })),
    };
  }

  if (data.contentSection) {
    normalized.contentSection = {
      heading: data.contentSection.heading,
      subheading: data.contentSection.subheading,
      benefits: data.contentSection.benefits?.map((benefit, index) => ({
        id: typeof benefit.id === "number" ? benefit.id : index + 1,
        title: benefit.title,
        description: benefit.description,
        icon: benefit.icon,
        stat: benefit.stat,
      })),
    };
  }

  if (data.apart) {
    normalized.apart = {
      ours: data.apart.ours,
      others: data.apart.others,
    };
  }

  if (data.process) {
    normalized.process = {
      label: data.process.label,
      steps: data.process.steps,
      content: data.process.content,
    };
  }

  return normalized;
};

export async function getHomePageData(): Promise<HomePageData> {
  try {
    const sanityData = await sanityFetch<SanityHomePageData | null>(
      homePageQuery,
    );
    const overrides = sanityData
      ? normalizeHomePageData(sanityData)
      : undefined;

    return deepMerge(cloneFallback(), overrides);
  } catch (error) {
    console.error("Failed to fetch home page data from Sanity:", error);
    return cloneFallback();
  }
}

export type { HomePageData };
