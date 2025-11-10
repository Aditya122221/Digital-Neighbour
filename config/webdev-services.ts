export const WEBDEV_SERVICE_SLUGS = [
  "web-development",
  "website-development",
  "web-app-development",
  "ecommerce-development",
  "landing-page-development",
  "cms-development",
  "headless-development",
] as const;

export type WebDevServiceSlug = (typeof WEBDEV_SERVICE_SLUGS)[number];

export const WEBDEV_SERVICE_LABELS: Record<WebDevServiceSlug, string> = {
  "web-development": "Web Development",
  "website-development": "Website Development",
  "web-app-development": "Web App Development",
  "ecommerce-development": "eCommerce Development",
  "landing-page-development": "Landing Page Development",
  "cms-development": "CMS Development",
  "headless-development": "Headless Development",
};

export function isWebDevServiceSlug(slug: string): slug is WebDevServiceSlug {
  return WEBDEV_SERVICE_SLUGS.includes(slug as WebDevServiceSlug);
}
