import { defineField } from "sanity"

export const faqField = (group: string = "faq") =>
	defineField({
		name: "faq",
		title: "FAQ Section",
		type: "object",
		group,
		fields: [
			defineField({
				name: "serviceName",
				title: "Service Name",
				type: "string",
				description: "Service name for FAQ context",
			}),
			defineField({
				name: "tagline",
				title: "Tagline",
				type: "string",
				description: "Short line shown under the FAQ heading",
			}),
			defineField({
				name: "faqs",
				title: "FAQs",
				type: "array",
				of: [
					{
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
								validation: (Rule) => Rule.required(),
							}),
						],
					},
				],
			}),
		],
	})

