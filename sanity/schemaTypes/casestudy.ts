import { defineField, defineType } from "sanity"

export const caseStudiesSectionType = defineType({
	name: "caseStudiesSection",
	title: "Case Studies Section",
	type: "document",
	fields: [
		defineField({
			name: "items",
			title: "Case Studies",
			type: "array",
			of: [
				defineField({
					name: "item",
					type: "object",
					fields: [
						defineField({
							name: "title",
							title: "Title",
							type: "string",
							validation: (rule) =>
								rule.required(),
						}),
						defineField({
							name: "textColor",
							title: "Text Color Utility",
							type: "string",
							description:
								"Tailwind class controlling text color on the card.",
						}),
						defineField({
							name: "isNew",
							title: "Mark as New",
							type: "boolean",
						}),
						defineField({
							name: "services",
							title: "Services Tags",
							type: "array",
							of: [
								{
									type: "string",
								},
							],
						}),
						defineField({
							name: "bgImages",
							title: "Background Images",
							type: "array",
							of: [
								defineField({
									name: "backgroundImage",
									title: "Background Image",
									type: "object",
									fields: [
										defineField(
											{
												name: "image",
												title: "Upload Image",
												type: "image",
												options: {
													hotspot: true,
												},
											}
										),
										defineField(
											{
												name: "externalUrl",
												title: "External Image URL",
												type: "url",
												description:
													"Optional: provide a hosted image URL instead of uploading.",
											}
										),
									],
								}),
							],
							description:
								"Upload images or link to hosted assets used for the hover slideshow.",
							validation: (rule) =>
								rule.min(1),
						}),
						defineField({
							name: "metrics",
							title: "Hover Metrics",
							type: "array",
							of: [
								defineField({
									name: "metric",
									type: "object",
									fields: [
										defineField(
											{
												name: "number",
												title: "Number",
												type: "string",
												validation: (
													rule
												) =>
													rule.required(),
											}
										),
										defineField(
											{
												name: "text",
												title: "Label",
												type: "string",
												validation: (
													rule
												) =>
													rule.required(),
											}
										),
									],
								}),
							],
						}),
					],
				}),
			],
		}),
	],
	preview: {
		select: {
			title: "heading",
		},
		prepare({ title }) {
			return {
				title: title || "Case Studies Section",
			}
		},
	},
})
