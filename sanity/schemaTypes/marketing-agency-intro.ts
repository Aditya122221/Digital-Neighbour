import { defineField, defineType } from "sanity"

export const marketingAgencyIntro = defineType({
	name: "marketingAgencyIntro",
	title: "Marketing Agency Intro Paragraph",
	type: "document",
	fields: [
		defineField({
			name: "heading",
			title: "Heading",
			type: "string",
		}),
		defineField({
			name: "problemStatement",
			title: "Problem Statement",
			type: "text",
			rows: 4,
		}),
		defineField({
			name: "valueProposition",
			title: "Value Proposition",
			type: "text",
			rows: 4,
		}),
	],
	preview: {
		select: {
			title: "heading",
			subtitle: "problemStatement",
		},
		prepare({ title, subtitle }) {
			return {
				title: title || "Intro Paragraph",
				subtitle: subtitle ? subtitle.slice(0, 60) : "No problem statement",
			}
		},
	},
})

