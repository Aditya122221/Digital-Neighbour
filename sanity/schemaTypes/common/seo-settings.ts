import { defineField } from "sanity"

export const seoSettingsField = (group: string = "seo") =>
	defineField({
		name: "seoSettings",
		title: "SEO Settings",
		type: "object",
		group,
		fields: [
			defineField({
				name: "title",
				title: "SEO Title",
				type: "string",
				description: "Title tag for SEO (typically 50-60 characters)",
				validation: (Rule) =>
					Rule.max(60).warning(
						"SEO titles are usually no more than 60 characters."
					),
			}),
			defineField({
				name: "description",
				title: "SEO Description",
				type: "text",
				description:
					"Meta description for SEO (typically 150-160 characters)",
				validation: (Rule) =>
					Rule.max(160).warning(
						"SEO descriptions are usually no more than 160 characters."
					),
			}),
			defineField({
				name: "keywords",
				title: "SEO Keywords",
				type: "array",
				of: [{ type: "string" }],
				description: "Keywords for SEO (comma-separated)",
				options: {
					layout: "tags",
				},
			}),
			defineField({
				name: "ogImage",
				title: "Open Graph Image",
				type: "image",
				description:
					"Image for social media sharing (recommended: 1200x630px)",
				options: {
					hotspot: true,
				},
			}),
			defineField({
				name: "ogTitle",
				title: "Open Graph Title",
				type: "string",
				description: "Title for social media sharing",
			}),
			defineField({
				name: "ogDescription",
				title: "Open Graph Description",
				type: "text",
				description: "Description for social media sharing",
			}),
			defineField({
				name: "canonicalUrl",
				title: "Canonical URL",
				type: "url",
				description: "Canonical URL for this page",
			}),
		],
	})

