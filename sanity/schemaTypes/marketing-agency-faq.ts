import { defineField, defineType } from "sanity"

export const marketingAgencyFaq = defineType({
	name: "marketingAgencyFaq",
	title: "Marketing Agency FAQ",
	type: "document",
	fields: [
		defineField({
			name: "serviceName",
			title: "Service Name",
			type: "string",
		}),
		defineField({
			name: "text",
			title: "Tag Line",
			type: "text",
			rows: 3,
		}),
		defineField({
			name: "faqs",
			title: "FAQs",
			type: "array",
			of: [
				defineField({
					name: "faq",
					title: "FAQ",
					type: "object",
					fields: [
						defineField({
							name: "q",
							title: "Question",
							type: "string",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "a",
							title: "Answer",
							type: "text",
							rows: 4,
							validation: (Rule) => Rule.required(),
						}),
					],
				}),
			],
		}),
	],
	preview: {
		select: {
			title: "serviceName",
			count: "faqs.length",
		},
		prepare({ title, count }) {
			return {
				title: title || "Marketing FAQ",
				subtitle: `${count || 0} questions`,
			}
		},
	},
})

