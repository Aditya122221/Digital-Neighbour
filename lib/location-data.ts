import path from "node:path";
import { readFile } from "node:fs/promises";

import {
  getAllowedLocationsForService,
  isLocationEnabledForService,
} from "@/config/location-service-map";
import { SEO_SERVICE_LABELS, type SeoServiceSlug } from "@/config/seo-services";
import {
  formatLocationPath,
  getDescendantSlugs,
  getLocationMeta,
  listAllLocationSlugs,
  slugify,
} from "@/data/locations";

type ServiceKey = "seo";

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
  slug: SeoServiceSlug,
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

export function getServiceDisplayName(slug: SeoServiceSlug): string {
  return SEO_SERVICE_LABELS[slug];
}

export function getSeoLocationMetadata(
  slug: SeoServiceSlug,
  location: LocationSlug,
) {
  const locationMeta = getLocationMeta(location);
  const serviceName = getServiceDisplayName(slug);
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

export function expandLocationsWithDescendants(slugs: string[]): string[] {
  const result = new Set<string>();

  slugs.forEach((slug) => {
    getDescendantSlugs(slug, true).forEach((childSlug) =>
      result.add(childSlug),
    );
  });

  return Array.from(result);
}

export function getAllSeoLocationParams(
  slugs: SeoServiceSlug[],
): Array<{ slug: SeoServiceSlug; location: string }> {
  const combos: Array<{ slug: SeoServiceSlug; location: string }> = [];

  slugs.forEach((serviceSlug) => {
    const locations = getAllowedLocationsForService("seo", serviceSlug);
    locations.forEach((location) => {
      combos.push({ slug: serviceSlug, location });
    });
  });

  return combos;
}
