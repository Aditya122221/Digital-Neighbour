export const CONTENT_SERVICE_SLUGS = [
  "content-marketing",
  "content-strategy",
  "copywriting",
  "email-marketing",
  "graphic-designing",
  "content-production",
  "content-distribution",
] as const;

export type ContentServiceSlug = (typeof CONTENT_SERVICE_SLUGS)[number];

export const CONTENT_SERVICE_LABELS: Record<ContentServiceSlug, string> = {
  "content-marketing": "Content Marketing",
  "content-strategy": "Content Strategy",
  copywriting: "Copywriting",
  "email-marketing": "Email Marketing",
  "graphic-designing": "Graphic Designing",
  "content-production": "Content Production",
  "content-distribution": "Content Distribution",
};

export function isContentServiceSlug(slug: string): slug is ContentServiceSlug {
  return CONTENT_SERVICE_SLUGS.includes(slug as ContentServiceSlug);
}
