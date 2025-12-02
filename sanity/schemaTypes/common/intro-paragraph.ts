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
