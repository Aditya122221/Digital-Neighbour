import { defineField, defineType } from "sanity"

export const apartSectionType = defineType({
	name: "apartSection",
	title: "What Sets Us Apart",
	type: "document",
	fields: [
		defineField({
			name: "ours",
			title: "Our Attributes",
			type: "array",
			of: [{ type: "string" }],
			validation: (rule) =>
				rule
					.required()
					.min(5)
					.max(5)
					.error(
						"Please provide exactly five items."
					),
		}),
		defineField({
			name: "others",
			title: "Other Agencies",
			type: "array",
			of: [{ type: "string" }],
			validation: (rule) =>
				rule
					.required()
					.min(5)
					.max(5)
					.error(
						"Please provide exactly five items."
					),
		}),
	],
	preview: {
		select: {
			title: "heading",
			tagline: "tagline",
		},
		prepare({ title, tagline }) {
			return {
				title: title ?? "What Sets Us Apart",
				subtitle: tagline,
			}
		},
	},
})
