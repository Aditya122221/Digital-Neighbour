import path from "node:path";
import { readFile } from "node:fs/promises";

import {
  getAllowedLocationsForService,
  isLocationEnabledForService,
  type ServiceKey,
} from "@/config/location-service-map";
import { APP_SERVICE_LABELS, type AppServiceSlug } from "@/config/app-services";
import {
  CONTENT_SERVICE_LABELS,
  type ContentServiceSlug,
} from "@/config/content-services";
import {
  HOSTING_SERVICE_LABELS,
  type HostingServiceSlug,
} from "@/config/hosting-services";
import {
  PAID_ADS_SERVICE_LABELS,
  type PaidAdsServiceSlug,
} from "@/config/paid-services";
import { SEO_SERVICE_LABELS, type SeoServiceSlug } from "@/config/seo-services";
import {
  SOCIAL_SERVICE_LABELS,
  type SocialServiceSlug,
} from "@/config/social-services";
import {
  WEBDEV_SERVICE_LABELS,
  type WebDevServiceSlug,
} from "@/config/webdev-services";
import {
  formatLocationPath,
  getDescendantSlugs,
  getLocationMeta,
  listAllLocationSlugs,
  slugify,
} from "@/data/locations";

const LOCATION_DATA_ROOT = path.join(process.cwd(), "data", "locations");

export type LocationSlug = string;

export function normalizeLocationSlug(
  input: string | null | undefined,
): LocationSlug | null {
  if (!input) {
    return null;
  }

  const candidate = slugify(input);

  if (getLocationMeta(candidate)) {
    return candidate;
  }

  for (const slug of listAllLocationSlugs()) {
    const meta = getLocationMeta(slug);
    if (meta && slugify(meta.name) === candidate) {
      return slug;
    }
  }

  return null;
}

export function getLocationDisplayName(slug: LocationSlug): string | null {
  const meta = getLocationMeta(slug);
  return meta?.name ?? null;
}

export function isValidLocationSlug(slug: string): boolean {
  return Boolean(getLocationMeta(slug));
}

export function ensureLocationForService(
  service: ServiceKey,
  slug: string,
  location: string,
): LocationSlug | null {
  const normalized = normalizeLocationSlug(location);
  if (!normalized) {
    return null;
  }

  return isLocationEnabledForService(service, slug, normalized)
    ? normalized
    : null;
}

export async function getLocationPageData<T>(
  service: ServiceKey,
  slug: string,
  location: LocationSlug,
  defaultData: T,
): Promise<T> {
  const meta = getLocationMeta(location);

  if (!meta) {
    return defaultData;
  }

  const overrides: Partial<T>[] = [];

  // Service-level defaults
  const defaultPath = path.join(
    LOCATION_DATA_ROOT,
    "_defaults",
    service,
    `${slug}.json`,
  );
  const defaultDataOverride = await readJsonIfExists<Partial<T>>(defaultPath);
  if (defaultDataOverride) {
    overrides.push(defaultDataOverride);
  }

  // Ancestor overrides
  for (const ancestorSlug of meta.ancestors) {
    const ancestorPath = path.join(
      LOCATION_DATA_ROOT,
      ancestorSlug,
      service,
      `${slug}.json`,
    );
    const ancestorData = await readJsonIfExists<Partial<T>>(ancestorPath);
    if (ancestorData) {
      overrides.push(ancestorData);
    }
  }

  // Location override
  const locationPath = path.join(
    LOCATION_DATA_ROOT,
    location,
    service,
    `${slug}.json`,
  );
  const locationData = await readJsonIfExists<Partial<T>>(locationPath);
  if (locationData) {
    overrides.push(locationData);
  }

  return overrides.reduce(
    (acc, override) => deepMerge(acc, override),
    structuredClone(defaultData),
  );
}

async function readJsonIfExists<T>(filePath: string): Promise<T | null> {
  try {
    const file = await readFile(filePath, "utf-8");
    return JSON.parse(file) as T;
  } catch (error: any) {
    if (error && error.code === "ENOENT") {
      return null;
    }
    console.warn(`Failed to read location data file at ${filePath}`, error);
    return null;
  }
}

function deepMerge<T>(target: T, source: Partial<T>): T {
  if (!isMergeable(target) || !isMergeable(source)) {
    return target;
  }

  const output: any = Array.isArray(target) ? [...target] : { ...target };

  Object.keys(source as object).forEach((key) => {
    const sourceValue = (source as any)[key];
    const targetValue = (target as any)[key];

    if (Array.isArray(sourceValue)) {
      output[key] = Array.isArray(targetValue)
        ? [...targetValue, ...sourceValue]
        : [...sourceValue];
    } else if (isMergeable(sourceValue) && isMergeable(targetValue)) {
      output[key] = deepMerge(targetValue, sourceValue);
    } else {
      output[key] = sourceValue;
    }
  });

  return output;
}

function isMergeable(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object";
}

export function getLocationBreadcrumb(slug: LocationSlug): string[] {
  const meta = getLocationMeta(slug);
  return meta ? meta.path : [];
}

export function getLocationTitleParts(slug: LocationSlug): string[] {
  return getLocationBreadcrumb(slug);
}

export function getServiceDisplayName(
  service: ServiceKey,
  slug: string,
): string {
  if (service === "seo") {
    return (
      SEO_SERVICE_LABELS[slug as SeoServiceSlug] ??
      slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    );
  }

  if (service === "paidAds") {
    return (
      PAID_ADS_SERVICE_LABELS[slug as PaidAdsServiceSlug] ??
      slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    );
  }

  if (service === "social") {
    return (
      SOCIAL_SERVICE_LABELS[slug as SocialServiceSlug] ??
      slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    );
  }

  if (service === "content") {
    return (
      CONTENT_SERVICE_LABELS[slug as ContentServiceSlug] ??
      slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    );
  }

  if (service === "app") {
    return (
      APP_SERVICE_LABELS[slug as AppServiceSlug] ??
      slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    );
  }

  if (service === "hosting") {
    return (
      HOSTING_SERVICE_LABELS[slug as HostingServiceSlug] ??
      slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    );
  }

  if (service === "webDev") {
    return (
      WEBDEV_SERVICE_LABELS[slug as WebDevServiceSlug] ??
      slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    );
  }

  return slug;
}

export function getSeoLocationMetadata(
  slug: SeoServiceSlug,
  location: LocationSlug,
) {
  const locationMeta = getLocationMeta(location);
  const serviceName = getServiceDisplayName("seo", slug);
  const locationName = locationMeta?.name ?? location;
  const path = formatLocationPath(location);
  const region = path.length > 1 ? path[path.length - 2] : undefined;

  const title = `${serviceName} in ${locationName} | Digital Neighbour`;
  const description = `Get expert ${serviceName.toLowerCase()} in ${locationName}${
    region ? `, ${region}` : ""
  }. Partner with Digital Neighbour to rank higher, get found faster, and grow locally.`;

  return {
    title,
    description,
    locationName,
    region,
  };
}

export function getPaidAdsLocationMetadata(
  slug: PaidAdsServiceSlug,
  location: LocationSlug,
) {
  const locationMeta = getLocationMeta(location);
  const serviceName = getServiceDisplayName("paidAds", slug);
  const locationName = locationMeta?.name ?? location;
  const path = formatLocationPath(location);
  const region = path.length > 1 ? path[path.length - 2] : undefined;

  const title = `${serviceName} in ${locationName} | Digital Neighbour`;
  const description = `Run high-performing ${serviceName.toLowerCase()} in ${locationName}${
    region ? `, ${region}` : ""
  }. Work with Digital Neighbour to capture demand, improve ROAS, and scale efficiently.`;

  return {
    title,
    description,
    locationName,
    region,
  };
}

export function getSocialLocationMetadata(
  slug: SocialServiceSlug,
  location: LocationSlug,
) {
  const locationMeta = getLocationMeta(location);
  const serviceName = getServiceDisplayName("social", slug);
  const locationName = locationMeta?.name ?? location;
  const path = formatLocationPath(location);
  const region = path.length > 1 ? path[path.length - 2] : undefined;

  const title = `${serviceName} in ${locationName} | Digital Neighbour`;
  const description = `${serviceName} programs tailored for ${locationName}${
    region ? `, ${region}` : ""
  }. Build platform-native content, grow community, and convert attention into demand with Digital Neighbour.`;

  return {
    title,
    description,
    locationName,
    region,
  };
}

export function getContentLocationMetadata(
  slug: ContentServiceSlug,
  location: LocationSlug,
) {
  const locationMeta = getLocationMeta(location);
  const serviceName = getServiceDisplayName("content", slug);
  const locationName = locationMeta?.name ?? location;
  const path = formatLocationPath(location);
  const region = path.length > 1 ? path[path.length - 2] : undefined;

  const title = `${serviceName} in ${locationName} | Digital Neighbour`;
  const description = `${serviceName} solutions tailored for ${locationName}${
    region ? `, ${region}` : ""
  }. Work with Digital Neighbour to plan, create, and design content that converts.`;

  return {
    title,
    description,
    locationName,
    region,
  };
}

export function getAppLocationMetadata(
  slug: AppServiceSlug,
  location: LocationSlug,
) {
  const locationMeta = getLocationMeta(location);
  const serviceName = getServiceDisplayName("app", slug);
  const locationName = locationMeta?.name ?? location;
  const path = formatLocationPath(location);
  const region = path.length > 1 ? path[path.length - 2] : undefined;

  const title = `${serviceName} in ${locationName} | Digital Neighbour`;
  const description = `${serviceName} experts in ${locationName}${
    region ? `, ${region}` : ""
  }. Partner with Digital Neighbour to design, build, and scale custom applications tailored to your market.`;

  return {
    title,
    description,
    locationName,
    region,
  };
}

export function getHostingLocationMetadata(
  slug: HostingServiceSlug,
  location: LocationSlug,
) {
  const locationMeta = getLocationMeta(location);
  const serviceName = getServiceDisplayName("hosting", slug);
  const locationName = locationMeta?.name ?? location;
  const path = formatLocationPath(location);
  const region = path.length > 1 ? path[path.length - 2] : undefined;

  const title = `${serviceName} in ${locationName} | Digital Neighbour`;
  const description = `${serviceName} solutions tailored for ${locationName}${
    region ? `, ${region}` : ""
  }. Secure, high-performance hosting and IT security delivered by Digital Neighbour.`;

  return {
    title,
    description,
    locationName,
    region,
  };
}

export function getWebDevLocationMetadata(
  slug: WebDevServiceSlug,
  location: LocationSlug,
) {
  const locationMeta = getLocationMeta(location);
  const serviceName = getServiceDisplayName("webDev", slug);
  const locationName = locationMeta?.name ?? location;
  const path = formatLocationPath(location);
  const region = path.length > 1 ? path[path.length - 2] : undefined;

  const title = `${serviceName} in ${locationName} | Digital Neighbour`;
  const description = `${serviceName} solutions tailored for ${locationName}${
    region ? `, ${region}` : ""
  }. Build high-performing websites with Digital Neighbour's expert team.`;

  return {
    title,
    description,
    locationName,
    region,
  };
}

export function expandLocationsWithDescendants(slugs: string[]): string[] {
  const result = new Set<string>();

  slugs.forEach((slug) => {
    getDescendantSlugs(slug, true).forEach((childSlug) =>
      result.add(childSlug),
    );
  });

  return Array.from(result);
}

export function getAllServiceLocationParams<T extends string>(
  service: ServiceKey,
  slugs: T[],
): Array<{ slug: T; location: string }> {
  const combos: Array<{ slug: T; location: string }> = [];

  slugs.forEach((serviceSlug) => {
    const locations = getAllowedLocationsForService(service, serviceSlug);
    locations.forEach((location) => {
      combos.push({ slug: serviceSlug, location });
    });
  });

  return combos;
}

export function getAllSeoLocationParams(slugs: SeoServiceSlug[]) {
  return getAllServiceLocationParams("seo", slugs);
}

export function getAllPaidAdsLocationParams(slugs: PaidAdsServiceSlug[]) {
  return getAllServiceLocationParams("paidAds", slugs);
}

export function getAllSocialLocationParams(slugs: SocialServiceSlug[]) {
  return getAllServiceLocationParams("social", slugs);
}

export function getAllContentLocationParams(slugs: ContentServiceSlug[]) {
  return getAllServiceLocationParams("content", slugs);
}

export function getAllAppLocationParams(slugs: AppServiceSlug[]) {
  return getAllServiceLocationParams("app", slugs);
}

export function getAllHostingLocationParams(slugs: HostingServiceSlug[]) {
  return getAllServiceLocationParams("hosting", slugs);
}

export function getAllWebDevLocationParams(slugs: WebDevServiceSlug[]) {
  return getAllServiceLocationParams("webDev", slugs);
}
