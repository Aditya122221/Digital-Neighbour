import { defineField, defineType } from "sanity"
import {
	featuresField,
	keyBenefitsField,
	faqField,
	formField,
	introParagraphField,
	painPointsField,
	contentSectionField,
	processField,
	seoSettingsField,
	commonGroups,
} from "./common"

export const professionalsMarketingPage = defineType({
	name: "professionalsMarketingPage",
	title: "Professionals Marketing Service Page",
	type: "document",
	groups: [
		...commonGroups,
	],
	fields: [
		// Basic Info
		defineField({
			name: "serviceName",
			title: "Service Name",
			type: "string",
			description:
				"Display name for this Professionals Marketing service",
			group: "basic",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Service Slug",
			type: "slug",
			description:
				"URL-friendly identifier (e.g., 'professionals', 'real-estate-marketing-agency')",
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
					rows: 3,
				}),
				defineField({
					name: "defaultHeroVideo",
					title: "Default Hero Video",
					type: "file",
					description:
						"Fallback hero video used by other professional marketing pages when they don't upload their own clip.",
					options: {
						accept: "video/*",
					},
					hidden: ({ document }) =>
						document?.slug?.current !==
						"professionals",
				}),
				defineField({
					name: "professionals",
					title: "Professionals List",
					type: "array",
					description:
						"Optional: List of professionals (used for main professionals landing page)",
					of: [
						{
							type: "object",
							fields: [
								defineField({
									name: "name",
									title: "Professional Name",
									type: "string",
									validation: (
										Rule
									) =>
										Rule.required(),
								}),
								defineField({
									name: "slug",
									title: "Professional Slug",
									type: "string",
									description:
										"URL-friendly identifier for the professional",
									validation: (
										Rule
									) =>
										Rule.required(),
								}),
								defineField({
									name: "image",
									title: "Professional Image",
									type: "image",
									options: {
										hotspot: true,
									},
									description:
										"Image representing this professional",
								}),
							],
							preview: {
								select: {
									title: "name",
									subtitle: "slug",
									media: "image",
								},
								prepare({
									title,
									subtitle,
									media,
								}) {
									return {
										title:
											title ||
											"Professional",
										subtitle:
											subtitle ||
											"",
										media,
									}
								},
							},
						},
					],
				}),
				defineField({
					name: "video",
					title: "Hero Video",
					type: "file",
					options: {
						accept: "video/*",
					},
					description:
						"Optional hero section video",
				}),
			],
		}),

		// Form Section
		formField(),

		// Intro Paragraph
		introParagraphField(),

		// Pain Points - Custom structure preserved (uses items instead of painPoints)
		painPointsField(),

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

		// Content Section
		contentSectionField(),

		// Process Section - Custom structure preserved (has heading)
		processField(),

		// Key Benefits - Custom structure preserved (uses items instead of benefits)
		keyBenefitsField(),

		// Features - Custom structure preserved (uses items instead of features)
		featuresField(),

		// Services
		defineField({
			name: "services",
			title: "Service Name",
			type: "string",
			group: "services",
			description:
				"Main service name (e.g., 'Professionals Marketing')",
		}),

		// Form Section - Custom structure preserved (just heading/subheading)
		//contentSectionField(),

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
					"Professionals Marketing Service Page",
				subtitle: subtitle ? `/${subtitle}` : "",
			}
		},
	},
})
