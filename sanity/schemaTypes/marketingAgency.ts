import { defineField, defineType } from "sanity"

export const marketingAgencyPageType = defineType({
	name: "marketingAgencyPage",
	title: "Marketing Agency Page",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			initialValue: "Marketing Agency",
			readOnly: true,
			validation: (rule) =>
				rule
					.required()
					.custom((value) =>
						value === "Marketing Agency"
							? true
							: "This value is fixed for this document."
					),
		}),
		defineField({
			name: "metadata",
			title: "Metadata Title",
			type: "string",
			description:
				"SEO metadata title for this page. Falls back to the hero heading if left blank.",
		}),
		defineField({
			name: "description",
			title: "Metadata Description",
			type: "text",
			description:
				"SEO metadata description for this page. Falls back to the hero subheading if left blank.",
		}),
		defineField({
			name: "hero",
			title: "Hero",
			type: "heroSection",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "form",
			title: "Form",
			type: "formSection",
		}),
		defineField({
			name: "introParagraph",
			title: "Intro Paragraph",
			type: "introParagraphSection",
		}),
		defineField({
			name: "painPoints",
			title: "Pain Points",
			type: "painPointsSection",
		}),
		defineField({
			name: "services",
			title: "Service Label",
			type: "string",
			description:
				"Used in the CTA and process heading (e.g. “Marketing Agency”).",
		}),
		defineField({
			name: "process",
			title: "Process",
			type: "processSection",
		}),
		defineField({
			name: "keyBenefits",
			title: "Key Benefits",
			type: "keyBenefitsSection",
		}),
		defineField({
			name: "features",
			title: "Features",
			type: "featuresSection",
		}),
		defineField({
			name: "faq",
			title: "FAQ",
			type: "faqSection",
		}),
	],
	preview: {
		select: {
			title: "title",
		},
		prepare({ title }) {
			return {
				title: title ?? "Marketing Agency Page",
			}
		},
	},
})
