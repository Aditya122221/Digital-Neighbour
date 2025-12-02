import { defineField } from "sanity"

export const keyBenefitsField = (group: string = "keyBenefits") =>
	defineField({
		name: "keyBenefits",
		title: "Key Benefits",
		type: "object",
		group,
		fields: [
			defineField({
				name: "heading",
				title: "Heading",
				type: "string",
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
									"Icon image for the benefit",
							}),
						],
					},
				],
			}),
		],
	})
