import { defineField, defineType } from "sanity"

export const marketingAgencyHowFast = defineType({
	name: "marketingAgencyHowFast",
	title: "Marketing Agency – How Fast Section",
	type: "document",
	fields: [
		defineField({
			name: "heading",
			title: "Heading",
			type: "string",
			description:
				"Main heading for this section (defaults to 'How are we so fast?').",
		}),
		defineField({
			name: "highlightWord",
			title: "Highlight Word",
			type: "string",
			description:
				"Optional word or phrase from the heading to highlight in yellow (e.g. 'fast').",
		}),
		defineField({
			name: "headline",
			title: "Headline",
			type: "text",
			rows: 3,
			description:
				"Main paragraph under the 'How are we so fast?' heading.",
		}),
		defineField({
			name: "principles",
			title: "Principles",
			type: "array",
			description:
				"List of principles that explain how you move fast.",
			of: [
				defineField({
					name: "principle",
					title: "Principle",
					type: "object",
					fields: [
						defineField({
							name: "title",
							title: "Title",
							type: "string",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "description",
							title: "Description",
							type: "text",
							rows: 4,
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "icon",
							title: "Icon",
							type: "image",
							description:
								"Upload an icon image for this principle (SVG or PNG with transparent background works best).",
							options: {
								hotspot: true,
							},
						}),
					],
				}),
			],
		}),
	],
	preview: {
		select: {
			title: "headline",
		},
		prepare({ title }) {
			return {
				title: "How Fast Section",
				subtitle: title
					? String(title).slice(0, 80)
					: "Configure headline and principles",
			}
		},
	},
})


