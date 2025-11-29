import { sanityFetch } from "@/sanity/lib/fetch";
import {
  seoServiceByTitleQuery,
  paidAdsServiceByTitleQuery,
  socialMediaServiceByTitleQuery,
  contentMarketingServiceByTitleQuery,
  webDevelopmentServiceByTitleQuery,
  appDevelopmentServiceByTitleQuery,
  hostingServiceByTitleQuery,
  aiAutomationServiceByTitleQuery,
  dataAnalyticsServiceByTitleQuery,
  industriesServiceByTitleQuery,
  professionalMarketingServiceByTitleQuery,
  // New page queries
  seoPageQuery,
  paidAdsPageQuery,
  socialMediaPageQuery,
  contentMarketingPageQuery,
  webDevelopmentPageQuery,
  appDevelopmentPageQuery,
  hostingItSecurityPageQuery,
  aiAutomationPageQuery,
  dataAnalyticsPageQuery,
  industriesPageQuery,
  professionalsMarketingPageQuery,
} from "@/sanity/lib/queries";
import { serviceFieldConfig } from "@/sanity/schemaTypes/serviceFieldConfig";

// Map service keys (slugs) to Sanity document types and queries
const serviceTypeMap = {
  seo: {
    type: "seoService",
    query: seoServiceByTitleQuery,
  },
  "paid-advertisement": {
    type: "paidAdvertService",
    query: paidAdsServiceByTitleQuery,
  },
  "social-media-marketing": {
    type: "socialMarketingService",
    query: socialMediaServiceByTitleQuery,
  },
  "content-marketing": {
    type: "contentMarketingService",
    query: contentMarketingServiceByTitleQuery,
  },
  "web-development": {
    type: "webDevelopmentService",
    query: webDevelopmentServiceByTitleQuery,
  },
  "app-development": {
    type: "appDevelopmentService",
    query: appDevelopmentServiceByTitleQuery,
  },
  "hosting-it-security": {
    type: "hostingService",
    query: hostingServiceByTitleQuery,
  },
  "ai-automation": {
    type: "aiAutomationService",
    query: aiAutomationServiceByTitleQuery,
  },
  "data-analytics": {
    type: "dataAnalyticsService",
    query: dataAnalyticsServiceByTitleQuery,
  },
  industries: {
    type: "industriesService",
    query: industriesServiceByTitleQuery,
  },
  professionals: {
    type: "professionalMarketingService",
    query: professionalMarketingServiceByTitleQuery,
  },
} as const;

// Create a reverse mapping from slug to title using serviceFieldConfig
function createSlugToTitleMap(): Record<string, string> {
  const map: Record<string, string> = {};
  Object.entries(serviceFieldConfig).forEach(([slug, config]) => {
    map[slug] = config.title;
  });
  return map;
}

// Create a reverse mapping from title to slug
function createTitleToSlugMap(): Record<string, string> {
  const map: Record<string, string> = {};
  Object.entries(serviceFieldConfig).forEach(([slug, config]) => {
    map[config.title] = slug;
  });
  return map;
}

const slugToTitleMap = createSlugToTitleMap();
const titleToSlugMap = createTitleToSlugMap();

/**
 * Convert a slug to its corresponding title from serviceFieldConfig
 */
export function slugToTitle(slug: string): string | null {
  return slugToTitleMap[slug] || null;
}

/**
 * Convert a title to its corresponding slug from serviceFieldConfig
 */
export function titleToSlug(title: string): string | null {
  return titleToSlugMap[title] || null;
}

/**
 * Fetch service data from Sanity by title
 */
async function getServiceByTitle(
  serviceType: keyof typeof serviceTypeMap,
  title: string
) {
  const serviceConfig = serviceTypeMap[serviceType];
  if (!serviceConfig) {
    return null;
  }

  try {
    const data = await sanityFetch({ query: serviceConfig.query, params: { title } });
    return data;
  } catch (error) {
    console.error(
      `Error fetching ${serviceType} service data for title "${title}":`,
      error
    );
    return null;
  }
}

/**
 * Fetch SEO service data from Sanity by slug
 * Returns null if not found in Sanity
 */
export async function getSeoServiceBySlug(slug: string): Promise<any> {
  return getServiceBySlug("seo", slug);
}

/**
 * Fetch Paid Ads service data from Sanity by slug
 */
export async function getPaidAdsServiceBySlug(slug: string): Promise<any> {
  return getServiceBySlug("paid-advertisement", slug);
}

/**
 * Fetch Social Media service data from Sanity by slug
 */
export async function getSocialMediaServiceBySlug(slug: string): Promise<any> {
  return getServiceBySlug("social-media-marketing", slug);
}

/**
 * Fetch Content Marketing service data from Sanity by slug
 */
export async function getContentMarketingServiceBySlug(
  slug: string
): Promise<any> {
  return getServiceBySlug("content-marketing", slug);
}

/**
 * Fetch Web Development service data from Sanity by slug
 */
export async function getWebDevelopmentServiceBySlug(
  slug: string
): Promise<any> {
  return getServiceBySlug("web-development", slug);
}

/**
 * Fetch App Development service data from Sanity by slug
 */
export async function getAppDevelopmentServiceBySlug(
  slug: string
): Promise<any> {
  return getServiceBySlug("app-development", slug);
}

/**
 * Fetch Hosting service data from Sanity by slug
 */
export async function getHostingServiceBySlug(slug: string): Promise<any> {
  return getServiceBySlug("hosting-it-security", slug);
}

/**
 * Fetch AI Automation service data from Sanity by slug
 */
export async function getAiAutomationServiceBySlug(slug: string): Promise<any> {
  return getServiceBySlug("ai-automation", slug);
}

/**
 * Fetch Data Analytics service data from Sanity by slug
 */
export async function getDataAnalyticsServiceBySlug(
  slug: string
): Promise<any> {
  return getServiceBySlug("data-analytics", slug);
}

/**
 * Fetch Industries service data from Sanity by slug
 */
export async function getIndustriesServiceBySlug(slug: string): Promise<any> {
  return getServiceBySlug("industries", slug);
}

/**
 * Fetch Professional Marketing service data from Sanity by slug
 */
export async function getProfessionalMarketingServiceBySlug(
  slug: string
): Promise<any> {
  return getServiceBySlug("professionals", slug);
}

// Map service types to their new page queries
const pageQueryMap: Record<string, string> = {
  seo: seoPageQuery,
  "paid-advertisement": paidAdsPageQuery,
  "social-media-marketing": socialMediaPageQuery,
  "content-marketing": contentMarketingPageQuery,
  "web-development": webDevelopmentPageQuery,
  "app-development": appDevelopmentPageQuery,
  "hosting-it-security": hostingItSecurityPageQuery,
  "ai-automation": aiAutomationPageQuery,
  "data-analytics": dataAnalyticsPageQuery,
  industries: industriesPageQuery,
  professionals: professionalsMarketingPageQuery,
};

/**
 * Generic function to fetch service data from Sanity by slug
 * First tries new page schema types, then falls back to old service types
 */
export async function getServiceBySlug(
  serviceType: keyof typeof serviceTypeMap,
  slug: string
): Promise<any> {
  // First, try fetching from new page schema types (seoPage, paidAdsPage, etc.)
  const pageQuery = pageQueryMap[serviceType];
  if (pageQuery) {
    try {
      const data = await sanityFetch({ query: pageQuery, params: { slug } });
      if (data) return data;
    } catch (error) {
      // Silently continue to fallback
    }
  }

  // Fallback to old service schema types
  const title = slugToTitle(slug);

  if (!title) {
    // If slug not found in mapping, return null
    return null;
  }

  // Fetch from Sanity using old schema types
  const sanityData = await getServiceByTitle(serviceType, title);

  return sanityData;
}

/**
 * Get service data from Sanity (generic function)
 */
export async function getServiceData(
  serviceType: keyof typeof serviceTypeMap,
  slug: string
): Promise<any> {
  return getServiceBySlug(serviceType, slug);
}
