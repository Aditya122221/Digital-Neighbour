export const APP_SERVICE_SLUGS = [
  "app-development",
  "ios-app-development",
  "android-app-development",
  "react-native-development",
  "flutter-app-development",
  "software-development",
  "progressive-web-apps",
] as const;

export type AppServiceSlug = (typeof APP_SERVICE_SLUGS)[number];

export const APP_SERVICE_LABELS: Record<AppServiceSlug, string> = {
  "app-development": "App Development",
  "ios-app-development": "iOS App Development",
  "android-app-development": "Android App Development",
  "react-native-development": "React Native Development",
  "flutter-app-development": "Flutter App Development",
  "software-development": "Software Development",
  "progressive-web-apps": "Progressive Web Apps",
};

export function isAppServiceSlug(slug: string): slug is AppServiceSlug {
  return APP_SERVICE_SLUGS.includes(slug as AppServiceSlug);
}
