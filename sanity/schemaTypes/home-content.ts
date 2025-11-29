import { defineField, defineType } from "sanity";

export const homeContent = defineType({
	name: "homeContent",
	title: "Home Page – Content Section",
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
			description: "Word or phrase in the heading to highlight (e.g., 'impact', 'your business')",
		}),
		defineField({
			name: "subheading",
			title: "Subheading",
			type: "text",
		}),
		defineField({
			name: "benefits",
			title: "Benefits",
			type: "array",
			of: [
				defineField({
					type: "object",
					name: "benefit",
					fields: [
						defineField({
							name: "id",
							title: "ID",
							type: "number",
						}),
						defineField({
							name: "title",
							title: "Title",
							type: "string",
						}),
						defineField({
							name: "description",
							title: "Description",
							type: "text",
						}),
						defineField({
							name: "stat",
							title: "Stat",
							type: "string",
							description: "Statistic value to display",
						}),
						defineField({
							name: "icon",
							title: "Icon",
							type: "string",
							description: "Icon name",
						}),
					],
				}),
			],
		}),
	],
	preview: {
		select: {
			title: "heading",
			subtitle: "subheading",
		},
		prepare({ title, subtitle }) {
			return {
				title: title || "Content Section",
				subtitle: subtitle ? subtitle.slice(0, 80) : "",
			};
		},
	},
});

