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

export const hostingItSecurityPage = defineType({
	name: "hostingItSecurityPage",
	title: "Hosting & IT Security Service Page",
	type: "document",
	groups: [...commonGroups],
	fields: [
		// Basic Info
		defineField({
			name: "serviceName",
			title: "Service Name",
			type: "string",
			description:
				"Display name for this hosting & IT security service",
			group: "basic",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Service Slug",
			type: "slug",
			description:
				"URL-friendly identifier (e.g., 'hosting-it-security')",
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
					name: "defaultHeroVideo",
					title: "Default Hero Video",
					type: "file",
					description:
						"Fallback hero video used by other hosting & IT security pages when they don't upload their own clip.",
					options: {
						accept: "video/*",
					},
					hidden: ({ document }) =>
						document?.slug?.current !==
						"hosting-it-security",
				}),
				defineField({
					name: "video",
					title: "Hero Video",
					type: "file",
					options: {
						accept: "video/*",
					},
					description: "Optional hero video file",
				}),
			],
		}),

		// Form Section
		formField(),

		// Intro Paragraph
		introParagraphField(),

		// Pain Points
		painPointsField(),

		// Content Section
		contentSectionField(),

		// Premium Cloud Services
		defineField({
			name: "premiumCloudServices",
			title: "Premium Cloud Services",
			type: "object",
			group: "services",
			fields: [
				defineField({
					name: "title",
					title: "Title",
					type: "string",
				}),
				defineField({
					name: "topCards",
					title: "Top Cards",
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
									rows: 3,
									validation: (
										Rule
									) =>
										Rule.required(),
								}),
							],
							preview: {
								select: {
									title: "title",
									subtitle: "description",
								},
								prepare({
									title,
									subtitle,
								}) {
									return {
										title:
											title ||
											"Top Card",
										subtitle: subtitle
											? subtitle.slice(
													0,
													60
												)
											: "",
									}
								},
							},
						},
					],
				}),
				defineField({
					name: "customApi",
					title: "Custom API Card",
					type: "object",
					fields: [
						defineField({
							name: "title",
							title: "Title",
							type: "string",
						}),
						defineField({
							name: "badge",
							title: "Badge",
							type: "string",
						}),
						defineField({
							name: "description",
							title: "Description",
							type: "text",
							rows: 4,
						}),
						defineField({
							name: "buttonText",
							title: "Button Text",
							type: "string",
						}),
						defineField({
							name: "buttonLink",
							title: "Button Link",
							type: "string",
							description:
								"URL path or anchor link",
						}),
					],
				}),
				defineField({
					name: "maximumCustomization",
					title: "Maximum Customization",
					type: "object",
					fields: [
						defineField({
							name: "title",
							title: "Title",
							type: "string",
						}),
						defineField({
							name: "description",
							title: "Description",
							type: "text",
							rows: 4,
						}),
						defineField({
							name: "buttonText",
							title: "Button Text",
							type: "string",
						}),
						defineField({
							name: "buttonLink",
							title: "Button Link",
							type: "string",
							description:
								"URL path or anchor link",
						}),
						defineField({
							name: "features",
							title: "Features",
							type: "array",
							of: [
								{
									type: "object",
									fields: [
										defineField(
											{
												name: "title",
												title: "Title",
												type: "string",
												validation: (
													Rule
												) =>
													Rule.required(),
											}
										),
										defineField(
											{
												name: "description",
												title: "Description",
												type: "text",
												rows: 3,
												validation: (
													Rule
												) =>
													Rule.required(),
											}
										),
									],
									preview: {
										select: {
											title: "title",
											subtitle: "description",
										},
										prepare({
											title,
											subtitle,
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
											}
										},
									},
								},
							],
						}),
					],
				}),
			],
		}),

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
				title:
					title ||
					"Untitled Hosting & IT Security Service",
				subtitle: subtitle ? `/${subtitle}` : "No slug",
			}
		},
	},
})
