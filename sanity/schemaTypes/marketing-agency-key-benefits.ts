import { defineField, defineType } from "sanity"

const benefitFields = [
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
		name: "icon",
		title: "Icon",
		type: "string",
		description: "Emoji or icon identifier.",
	}),
	defineField({
		name: "image",
		title: "Image",
		type: "image",
		options: { hotspot: true },
	}),
]

export const marketingAgencyKeyBenefits = defineType({
	name: "marketingAgencyKeyBenefits",
	title: "Marketing Agency Key Benefits",
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
			name: "benefits",
			title: "Benefits",
			type: "array",
			of: [{ type: "object", fields: benefitFields }],
		}),
		defineField({
			name: "items",
			title: "Legacy Items",
			type: "array",
			description:
				"Optional second list for legacy JSON structure. Use if you need an alternate display.",
			of: [{ type: "object", fields: benefitFields }],
		}),
	],
	preview: {
		select: {
			title: "heading",
			count: "benefits.length",
		},
		prepare({ title, count }) {
			return {
				title: title || "Key Benefits",
				subtitle: `${count || 0} entries`,
			}
		},
	},
})

