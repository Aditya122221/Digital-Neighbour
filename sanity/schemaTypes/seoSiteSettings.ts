import { defineType, defineField } from "sanity"

export const seoSiteSettings = defineType({
	name: "seoSettings",
	title: "SEO Site Settings",
	type: "document",
	fields: [
		defineField({
			name: "documentTitle",
			title: "Document Title",
			type: "string",
			initialValue: "Site SEO Settings",
			readOnly: true,
		}),
		defineField({
			name: "rawHeadHtml",
			title: "Raw Head Injection (HTML)",
			type: "text",
			rows: 8,
			description:
				"Raw HTML inserted as-is into <head> on every page. Use carefully.",
		}),
		defineField({
			name: "gtmHeadScript",
			title: "GTM Head Script",
			type: "text",
			rows: 8,
			description:
				"Paste the full <script>...</script> as provided by GTM (HTML).",
		}),
		defineField({
			name: "gtmBodyNoscript",
			title: "GTM Body NoScript",
			type: "text",
			rows: 8,
			description:
				"Paste the Google Tag Manager <noscript> for the <body> (full <noscript> block)",
		}),
		defineField({
			name: "siteIcon",
			title: "Site Icon",
			type: "image",
			options: {
				hotspot: true,
			},
			description: "Favicon/icon for the website",
		}),
		defineField({
			name: "searchEngineVisibility",
			title: "Search engine visibility",
			type: "boolean",
			initialValue: true,
			description:
				"Enable to allow search engines to index the website. Disable to deindex the whole website.",
		}),
		defineField({
			name: "structuredData",
			title: "Structured Data (JSON-LD)",
			type: "text",
			rows: 10,
			description:
				"JSON-LD structured data for LocalBusiness schema or other schema types",
		}),
	],
	// No custom preview needed for singleton
})
