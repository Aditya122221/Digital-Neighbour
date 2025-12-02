import { defineField } from "sanity"

export const featuresField = (group: string = "features") =>
	defineField({
		name: "features",
		title: "Features",
		type: "object",
		group,
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
					"Word or phrase in the heading to highlight (e.g., 'Features', 'Benefits', 'Advantages')",
			}),
			defineField({
				name: "subheading",
				title: "Subheading",
				type: "text",
			}),
			defineField({
				name: "features",
				title: "Features",
				type: "array",
				of: [
					{
						type: "object",
						fields: [
							defineField({
								name: "title",
								title: "Title",
								type: "string",
								validation: (
									Rule
								) =>
									Rule.required(),
							}),
							defineField({
								name: "description",
								title: "Description",
								type: "text",
								rows: 4,
								validation: (
									Rule
								) =>
									Rule.required(),
							}),
							defineField({
								name: "icon",
								title: "Icon",
								type: "image",
								options: {
									hotspot: true,
								},
								description:
									"Icon image",
							}),
						],
						preview: {
							select: {
								title: "title",
								subtitle: "description",
								media: "icon",
							},
							prepare({
								title,
								subtitle,
								media,
							}) {
								return {
									title:
										title ||
										"Feature",
									subtitle: subtitle
										? subtitle.slice(
												0,
												60
											)
										: "",
									media,
								}
							},
						},
					},
				],
			}),
		],
	})
