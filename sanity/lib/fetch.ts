import { client } from "./client";
import type { QueryParams } from "next-sanity";

export async function sanityFetch<QueryResponse>({
	query,
	params = {},
	tag,
}: {
	query: string;
	params?: QueryParams;
	tag?: string;
}): Promise<QueryResponse> {
	return client.fetch<QueryResponse>(query, params, {
		next: {
			// With webhooks, we can use longer cache times
			// Webhooks will trigger revalidation when content changes
			revalidate: process.env.NODE_ENV === "development" ? 30 : 60, // 1 minute cache
			tags: tag ? [tag] : [],
		},
	});
}

