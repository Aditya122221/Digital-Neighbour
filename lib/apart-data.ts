import { sanityFetch } from "@/sanity/lib/fetch";
import { apartPageQuery } from "@/sanity/lib/queries";
import apartDataJson from "@/data/apart.json";

type ApartPageData = {
  ours?: string[];
  others?: string[];
};

export async function getApartPageData(): Promise<ApartPageData> {
  try {
    const sanityData = await sanityFetch<ApartPageData>(apartPageQuery);
    if (sanityData && sanityData.ours && sanityData.others) {
      return sanityData;
    }
  } catch (error) {
    // Silently fallback to JSON
  }

  // Fallback to JSON
  return apartDataJson as ApartPageData;
}

