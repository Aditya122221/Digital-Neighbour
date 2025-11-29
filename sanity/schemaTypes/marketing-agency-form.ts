import { defineField, defineType } from "sanity"

export const marketingAgencyForm = defineType({
	name: "marketingAgencyForm",
	title: "Marketing Agency Form",
	type: "document",
	fields: [
		defineField({
			name: "heading",
			title: "Heading",
			type: "string",
		}),
		defineField({
			name: "content",
			title: "Content",
			type: "text",
			rows: 4,
		}),
		defineField({
			name: "subContent",
			title: "Sub Content",
			type: "text",
			rows: 3,
		}),
		defineField({
			name: "cta",
			title: "CTA Copy",
			type: "text",
			rows: 3,
		}),
		defineField({
			name: "formHeading",
			title: "Form Heading",
			type: "string",
		}),
		defineField({
			name: "buttonText",
			title: "Button Text",
			type: "string",
		}),
	],
	preview: {
		select: {
			title: "heading",
			subtitle: "formHeading",
		},
		prepare({ title, subtitle }) {
			return {
				title: title || "Marketing Form",
				subtitle: subtitle || "Button not set",
			}
		},
	},
})

