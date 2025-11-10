export const SOCIAL_SERVICE_SLUGS = [
  "social-media-marketing",
  "social-media-management",
  "facebook-marketing",
  "linkedin-marketing",
  "instagram-marketing",
  "tiktok-marketing",
  "youtube-community-marketing",
] as const;

export type SocialServiceSlug = (typeof SOCIAL_SERVICE_SLUGS)[number];

export const SOCIAL_SERVICE_LABELS: Record<SocialServiceSlug, string> = {
  "social-media-marketing": "Social Media Marketing",
  "social-media-management": "Social Media Management",
  "facebook-marketing": "Facebook Marketing",
  "linkedin-marketing": "LinkedIn Marketing",
  "instagram-marketing": "Instagram Marketing",
  "tiktok-marketing": "TikTok Marketing",
  "youtube-community-marketing": "YouTube Community Marketing",
};

export function isSocialServiceSlug(slug: string): slug is SocialServiceSlug {
  return SOCIAL_SERVICE_SLUGS.includes(slug as SocialServiceSlug);
}
