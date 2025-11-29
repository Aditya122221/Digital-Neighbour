import { defineField, defineType } from "sanity";

export const homeTechStack = defineType({
	name: "homeTechStack",
	title: "Home Page – Tech Stack",
	type: "document",
	fields: [
		defineField({
			name: "heading",
			title: "Heading",
			type: "string",
		}),
		defineField({
			name: "highlight",
			title: "Highlight",
			type: "string",
			description: "Highlighted text within the heading (deprecated - use highlightWord instead)",
		}),
		defineField({
			name: "highlightWord",
			title: "Word/Phrase to Highlight",
			type: "string",
			description: "Word or phrase in the heading to highlight (e.g., 'tech stack')",
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
		}),
		defineField({
			name: "logos",
			title: "Logos",
			type: "array",
			of: [
				defineField({
					type: "object",
					name: "logo",
					fields: [
						defineField({
							name: "name",
							title: "Name",
							type: "string",
						}),
						defineField({
							name: "image",
							title: "Logo Image",
							type: "image",
							options: { hotspot: true },
							description: "Upload logo image",
						}),
						defineField({
							name: "bgColor",
							title: "Background Color",
							type: "string",
							description: "Hex color code (e.g., #0a66c2)",
						}),
						defineField({
							name: "textColor",
							title: "Text Color",
							type: "string",
							description: "Hex color code (e.g., #fff)",
						}),
					],
				}),
			],
		}),
	],
	preview: {
		select: {
			title: "heading",
			subtitle: "description",
		},
		prepare({ title, subtitle }) {
			return {
				title: title || "Tech Stack",
				subtitle: subtitle ? subtitle.slice(0, 80) : "",
			};
		},
	},
});

