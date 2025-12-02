import { defineField } from "sanity"

export const introParagraphField = (group: string = "introParagraph") =>
	defineField({
		name: "introParagraph",
		title: "Intro Paragraph",
		type: "object",
		group: "introParagraph",
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
					"Word or phrase in the heading to highlight (e.g., 'Challenge', 'Problem', 'Dilemma')",
			}),
			defineField({
				name: "problemStatement",
				title: "Problem Statement",
				type: "text",
			}),
			defineField({
				name: "valueProposition",
				title: "Value Proposition",
				type: "text",
			}),
		],
	})
