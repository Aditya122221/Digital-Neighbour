import { defineField, defineType } from "sanity";

export const homeBrandInfo = defineType({
	name: "homeBrandInfo",
	title: "Home Page – Brand Info",
	type: "document",
	fields: [
		defineField({
			name: "main",
			title: "Main Content",
			type: "object",
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
					description: "Word or phrase in the heading to highlight (e.g., 'trust to grow')",
				}),
				defineField({
					name: "subheading",
					title: "Subheading",
					type: "text",
				}),
			],
		}),
		defineField({
			name: "differentiators",
			title: "Differentiators",
			type: "array",
			of: [
				defineField({
					type: "object",
					name: "differentiator",
					fields: [
						defineField({
							name: "id",
							title: "ID",
							type: "string",
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
							name: "icon",
							title: "Icon",
							type: "string",
							description: "Icon name (e.g., Target, Users2, TrendingUp)",
						}),
					],
				}),
			],
		}),
		defineField({
			name: "rightCard",
			title: "Right Card",
			type: "object",
			fields: [
				defineField({
					name: "heading",
					title: "Heading",
					type: "string",
				}),
				defineField({
					name: "description",
					title: "Description",
					type: "text",
				}),
				defineField({
					name: "stats",
					title: "Stats",
					type: "array",
					of: [
						defineField({
							type: "object",
							name: "stat",
							fields: [
								defineField({
									name: "id",
									title: "ID",
									type: "string",
								}),
								defineField({
									name: "value",
									title: "Value",
									type: "string",
								}),
								defineField({
									name: "label",
									title: "Label",
									type: "string",
								}),
							],
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
			initialValue: "Connect with Us",
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
			title: "main.heading",
			subtitle: "main.subheading",
		},
		prepare({ title, subtitle }) {
			return {
				title: title || "Brand Info",
				subtitle: subtitle ? subtitle.slice(0, 80) : "",
			};
		},
	},
});

