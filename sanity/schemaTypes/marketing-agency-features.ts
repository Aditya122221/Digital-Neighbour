import { defineField, defineType } from "sanity"

export const marketingAgencyFeatures = defineType({
	name: "marketingAgencyFeatures",
	title: "Marketing Agency Features",
	type: "document",
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
			rows: 3,
		}),
		defineField({
			name: "features",
			title: "Features",
			type: "array",
			of: [
				defineField({
					name: "feature",
					title: "Feature",
					type: "object",
					fields: [
						defineField({
							name: "title",
							title: "Title",
							type: "string",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "description",
							title: "Description",
							type: "text",
							rows: 4,
						}),
						defineField({
							name: "image",
							title: "Icon Image",
							type: "image",
							options: {
								hotspot: true,
							},
							description:
								"Upload an icon image for this feature. This will be shown in the UI instead of the text icon.",
						}),
					],
				}),
			],
		}),
	],
	preview: {
		select: {
			title: "heading",
			count: "features.length",
		},
		prepare({ title, count }) {
			return {
				title: title || "Features",
				subtitle: `${count || 0} items`,
			}
		},
	},
})

