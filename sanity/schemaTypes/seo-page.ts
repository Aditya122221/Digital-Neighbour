import { defineField, defineType } from "sanity"
import {
	featuresField,
	keyBenefitsField,
	faqField,
	formField,
	introParagraphField,
	painPointsField,
	servicesTypeOne,
	contentSectionField,
	processField,
	seoSettingsField,
	commonGroups,
} from "./common"

export const seoPage = defineType({
	name: "seoPage",
	title: "SEO Service Page",
	type: "document",
	groups: commonGroups,
	fields: [
		// Basic Info
		defineField({
			name: "serviceName",
			title: "Service Name",
			type: "string",
			description:
				"Display name for this SEO service (e.g., 'Search Engine Optimisation', 'Local SEO')",
			group: "basic",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Service Slug",
			type: "slug",
			description:
				"URL-friendly identifier for this SEO service page (e.g., 'seo', 'local-seo', 'wordpress-seo')",
			group: "basic",
			options: {
				source: "serviceName",
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		}),

		// SEO Settings
		seoSettingsField(),

		// Hero Section
		defineField({
			name: "hero",
			title: "Hero Section",
			type: "object",
			group: "hero",
			fields: [
				defineField({
					name: "heading",
					title: "Heading",
					type: "string",
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: "subheading",
					title: "Subheading",
					type: "text",
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: "defaultHeroImage",
					title: "Default Hero Image",
					type: "image",
					description:
						"Fallback hero image used by any SEO service page that doesn't upload its own.",
					options: {
						hotspot: true,
					},
					hidden: ({ document }) =>
						document?.slug?.current !==
						"seo",
				}),
				defineField({
					name: "image",
					title: "Hero Image Override",
					type: "image",
					description:
						"Optional: Override the default hero image for this specific SEO service page.",
					options: {
						hotspot: true,
					},
				}),
			],
		}),

		// Form Section
		formField(),

		// Intro Paragraph
		introParagraphField(),

		// Pain Points
		painPointsField(),

		// Services
		servicesTypeOne(),

		// Content Section
		contentSectionField(),

		// Process Section
		processField(),

		// Key Benefits
		keyBenefitsField(),

		// Features
		featuresField(),

		// FAQ Section
		faqField(),
	],
	preview: {
		select: {
			title: "serviceName",
			subtitle: "slug.current",
		},
		prepare({ title, subtitle }) {
			return {
				title: title || "Untitled SEO Service",
				subtitle: subtitle ? `/${subtitle}` : "No slug",
			}
		},
	},
})
