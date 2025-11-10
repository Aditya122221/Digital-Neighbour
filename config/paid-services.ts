export const PAID_ADS_SERVICE_SLUGS = [
  "paid-advertisement",
  "google-ads",
  "google-shopping-ads",
  "youtube-ads",
  "google-remarketing",
  "paid-social",
  "meta-ads",
  "linkedin-ads",
  "google-display-ads",
  "pay-per-click",
  "bing-ads",
  "facebook-ads",
  "instagram-ads",
  "linkedin-ads-management",
  "tiktok-ads",
  "snapchat-ads",
  "twitter-x-ads",
  "pinterest-ads",
] as const;

export type PaidAdsServiceSlug = (typeof PAID_ADS_SERVICE_SLUGS)[number];

export const PAID_ADS_SERVICE_LABELS: Record<PaidAdsServiceSlug, string> = {
  "paid-advertisement": "Paid Advertising",
  "google-ads": "Google Ads",
  "google-shopping-ads": "Google Shopping Ads",
  "youtube-ads": "YouTube Ads",
  "google-remarketing": "Google Remarketing",
  "paid-social": "Paid Social",
  "meta-ads": "Meta Ads",
  "linkedin-ads": "LinkedIn Ads",
  "google-display-ads": "Google Display Ads",
  "pay-per-click": "Pay Per Click",
  "bing-ads": "Bing Ads",
  "facebook-ads": "Facebook Ads",
  "instagram-ads": "Instagram Ads",
  "linkedin-ads-management": "LinkedIn Ads Management",
  "tiktok-ads": "TikTok Ads",
  "snapchat-ads": "Snapchat Ads",
  "twitter-x-ads": "Twitter/X Ads",
  "pinterest-ads": "Pinterest Ads",
};

export function isPaidAdsServiceSlug(slug: string): slug is PaidAdsServiceSlug {
  return PAID_ADS_SERVICE_SLUGS.includes(slug as PaidAdsServiceSlug);
}
