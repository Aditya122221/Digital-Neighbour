import type { QueryParams } from "@sanity/client";
import type { SanityDocument } from "sanity";

import { sanityClient } from "./client";

export async function sanityFetch<T = SanityDocument>(
  query: string,
  params: QueryParams = {},
) {
  // Fetch from Sanity with CDN disabled (configured in client.ts)
  // This ensures we always get fresh data from Sanity
  // The page-level dynamic = "force-dynamic" and revalidate = 0 will prevent caching
  return sanityClient.fetch<T>(query, params);
}
