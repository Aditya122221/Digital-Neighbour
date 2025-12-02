import { defineField, defineType } from "sanity"

export const marketingAgencyPainPoints = defineType({
	name: "marketingAgencyPainPoints",
	title: "Marketing Agency Pain Points",
	type: "document",
	fields: [
		defineField({
			name: "heading",
			title: "Heading",
			type: "string",
		}),
		defineField({
			name: "highlightWord",
			title: "Word/Phrase to Highlight",
			type: "string",
			description:
				"Word or phrase in the heading to highlight (e.g., 'Challenges', 'Problems', 'Issues', 'Pain Points')",
		}),
		defineField({
			name: "subheading",
			title: "Subheading",
			type: "text",
			rows: 3,
		}),
		defineField({
			name: "items",
			title: "Pain Points",
			type: "array",
			of: [
				defineField({
					name: "painPoint",
					title: "Pain Point",
					type: "object",
					fields: [
						defineField({
							name: "problem",
							title: "Problem",
							type: "text",
							rows: 3,
						}),
						defineField({
							name: "solution",
							title: "Solution",
							type: "text",
							rows: 3,
						}),
					],
				}),
			],
		}),
	],
	preview: {
		select: {
			title: "heading",
			count: "items.length",
		},
		prepare({ title, count }) {
			return {
				title: title || "Pain Points",
				subtitle: `${count || 0} entries`,
			}
		},
	},
})

