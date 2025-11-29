import { defineField, defineType } from "sanity";

export const homeServices = defineType({
	name: "homeServices",
	title: "Home Page – Services",
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
			description: "Word or phrase in the heading to highlight (e.g., 'your business', 'services')",
		}),
		defineField({
			name: "subheading",
			title: "Subheading",
			type: "text",
		}),
		defineField({
			name: "cards",
			title: "Service Cards",
			type: "array",
			of: [
				defineField({
					type: "object",
					name: "serviceCard",
					fields: [
						defineField({
							name: "title",
							title: "Title",
							type: "string",
						}),
						defineField({
							name: "subheading",
							title: "Subheading",
							type: "array",
							of: [{ type: "string" }],
						}),
						defineField({
							name: "video",
							title: "Video",
							type: "file",
							options: {
								accept: "video/*",
							},
							description: "Upload video file",
						}),
					],
				}),
			],
		}),
		defineField({
			name: "buttonText",
			title: "CTA Button Text",
			type: "string",
			description: "Text for the CTA button",
			initialValue: "Contact Us",
		}),
		defineField({
			name: "buttonLink",
			title: "CTA Button Link",
			type: "string",
			description: "URL or path for the button (e.g., /contact)",
			initialValue: "/contact",
		}),
	],
	preview: {
		select: {
			title: "heading",
			subtitle: "subheading",
		},
		prepare({ title, subtitle }) {
			return {
				title: title || "Services Section",
				subtitle: subtitle ? subtitle.slice(0, 80) : "",
			};
		},
	},
});

