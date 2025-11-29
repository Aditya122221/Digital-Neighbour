import { defineField, defineType } from "sanity"

export const marketingAgencySettings = defineType({
	name: "marketingAgencySettings",
	title: "Marketing Agency Settings",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Page Title",
			type: "string",
			description: "Used for internal reference or SEO.",
		}),
		defineField({
			name: "metadata",
			title: "Metadata Title",
			type: "string",
			description: "Optional custom title for SEO metadata.",
		}),
		defineField({
			name: "description",
			title: "Meta Description",
			type: "text",
			rows: 3,
		}),
		defineField({
			name: "serviceLabel",
			title: "Service Label",
			type: "string",
			description:
				"Used anywhere we display the service name (CTA + process heading).",
		}),
	],
	preview: {
		select: {
			title: "title",
			subtitle: "serviceLabel",
		},
		prepare({ title, subtitle }) {
			return {
				title: title || "Marketing Agency Settings",
				subtitle: subtitle || "Not configured",
			}
		},
	},
})

