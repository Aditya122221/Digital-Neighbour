export const HOSTING_SERVICE_SLUGS = [
  "hosting-it-security",
  "web-hosting",
  "wordpress-hosting",
  "cloud-hosting",
  "dedicated-hosting",
  "managed-it-security",
] as const;

export type HostingServiceSlug = (typeof HOSTING_SERVICE_SLUGS)[number];

export const HOSTING_SERVICE_LABELS: Record<HostingServiceSlug, string> = {
  "hosting-it-security": "Hosting & IT Security",
  "web-hosting": "Web Hosting",
  "wordpress-hosting": "WordPress Hosting",
  "cloud-hosting": "Cloud Hosting",
  "dedicated-hosting": "Dedicated Hosting",
  "managed-it-security": "Managed IT Security",
};

export function isHostingServiceSlug(slug: string): slug is HostingServiceSlug {
  return HOSTING_SERVICE_SLUGS.includes(slug as HostingServiceSlug);
}
