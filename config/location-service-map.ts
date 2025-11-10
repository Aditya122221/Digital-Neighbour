import {
  ALL_LOCATION_SLUGS,
  getDescendantSlugs,
  getLocationMeta,
  listAllLocationSlugs,
} from "@/data/locations";

import type { AppServiceSlug } from "./app-services";
import type { ContentServiceSlug } from "./content-services";
import type { PaidAdsServiceSlug } from "./paid-services";
import type { SeoServiceSlug } from "./seo-services";
import type { SocialServiceSlug } from "./social-services";

export type ServiceKey = "seo" | "paidAds" | "social" | "content" | "app";

type ServiceLocationRules = {
  seo: Partial<Record<SeoServiceSlug, string[]>>;
  paidAds: Partial<Record<PaidAdsServiceSlug, string[]>>;
  social: Partial<Record<SocialServiceSlug, string[]>>;
  content: Partial<Record<ContentServiceSlug, string[]>>;
  app: Partial<Record<AppServiceSlug, string[]>>;
};

const SERVICE_LOCATION_RULES: ServiceLocationRules = {
  seo: {
    "search-engine-optimisation": ["north-island", "south-island"],
    "seo-audits": ["north-island", "south-island"],
    "small-business-seo": ["north-island", "south-island"],
  },
  paidAds: {
    "google-ads": ["north-island", "south-island"],
    "google-shopping-ads": ["north-island", "south-island"],
    "youtube-ads": ["north-island", "south-island"],
  },
  social: {
    "social-media-marketing": ["north-island", "south-island"],
    "social-media-management": ["north-island", "south-island"],
    "facebook-marketing": ["north-island", "south-island"],
    "linkedin-marketing": ["north-island", "south-island"],
  },
  content: {
    "content-marketing": ["north-island", "south-island"],
    copywriting: ["north-island", "south-island"],
    "graphic-designing": ["north-island", "south-island"],
  },
  app: {
    "app-development": ["north-island", "south-island"],
    "ios-app-development": ["north-island", "south-island"],
    "software-development": ["north-island", "south-island"],
  },
};

export function isLocationEnabledForService(
  service: ServiceKey,
  slug: string,
  location: string,
): boolean {
  const allowedLocations = getAllowedLocationsForService(service, slug);
  return allowedLocations.includes(location);
}

export function getAllowedLocationsForService(
  service: ServiceKey,
  slug: string,
): string[] {
  const tokens = (
    SERVICE_LOCATION_RULES[service] as Record<string, string[] | undefined>
  )[slug];
  if (!tokens || tokens.length === 0) {
    return [];
  }

  const expanded = tokens.flatMap((token) => {
    if (token === "*") {
      return ALL_LOCATION_SLUGS;
    }

    const meta = getLocationMeta(token);
    if (!meta) {
      return [token];
    }

    return getDescendantSlugs(token, true);
  });

  const unique = Array.from(new Set(expanded));

  return unique;
}

export function listLocationsForService(service: ServiceKey): string[] {
  const slugs = new Set<string>();

  const entries = SERVICE_LOCATION_RULES[service] as Record<string, string[]>;
  Object.values(entries).forEach((tokens) => {
    tokens?.forEach((token) => {
      if (token === "*") {
        listAllLocationSlugs().forEach((slug) => slugs.add(slug));
      } else {
        getDescendantSlugs(token, true).forEach((slug) => slugs.add(slug));
      }
    });
  });

  return Array.from(slugs);
}
