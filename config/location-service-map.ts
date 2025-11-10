import {
  ALL_LOCATION_SLUGS,
  getDescendantSlugs,
  getLocationMeta,
  listAllLocationSlugs,
} from "@/data/locations";

import type { SeoServiceSlug } from "./seo-services";

type ServiceKey = "seo";

type ServiceLocationRules = {
  [K in ServiceKey]: Partial<Record<SeoServiceSlug, string[]>>;
};

const SERVICE_LOCATION_RULES: ServiceLocationRules = {
  seo: {
    "search-engine-optimisation": ["north-island", "south-island"],
    "seo-audits": ["north-island", "south-island"],
    "small-business-seo": ["north-island", "south-island"],
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
  const tokens = SERVICE_LOCATION_RULES[service]?.[slug as SeoServiceSlug];
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

  const entries = SERVICE_LOCATION_RULES[service];
  if (entries) {
    Object.values(entries).forEach((tokens) => {
      tokens?.forEach((token) => {
        if (token === "*") {
          listAllLocationSlugs().forEach((slug) => slugs.add(slug));
        } else {
          getDescendantSlugs(token, true).forEach((slug) => slugs.add(slug));
        }
      });
    });
  }

  return Array.from(slugs);
}
