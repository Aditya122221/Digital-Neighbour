import { defineField, defineType } from "sanity"
import {
	featuresField,
	faqField,
	formField,
	processField,
	seoSettingsField,
	commonGroups,
} from "./common"

export const webDevelopmentPage = defineType({
	name: "webDevelopmentPage",
	title: "Web Development Service Page",
	type: "document",
	groups: commonGroups,
	fields: [
		// Basic Info
		defineField({
			name: "serviceName",
			title: "Service Name",
			type: "string",
			description:
				"Display name for this web development service (e.g., 'Web Development', 'Website Development', 'Web App Development')",
			group: "basic",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Service Slug",
			type: "slug",
			description:
				"URL-friendly identifier (e.g., 'web-development', 'website-development', 'web-app-development')",
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
						"Fallback hero video used by other web development pages when they don't upload their own clip.",
					options: {
						accept: "video/*",
					},
					hidden: ({ document }) =>
						document?.slug?.current !==
						"web-development",
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
		defineField({
			name: "introParagraph",
			title: "Intro Paragraph",
			type: "object",
			group: "introParagraph",
			fields: [
				defineField({
					name: "heading",
					title: "Heading",
					type: "string",
				}),
				defineField({
					name: "paragraphs",
					title: "Paragraphs",
					type: "array",
					of: [{ type: "text" }],
					description: "Array of paragraph texts",
				}),
			],
		}),

		// Pain Points
		defineField({
			name: "painPoints",
			title: "Pain Points",
			type: "object",
			group: "painPoints",
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
					name: "items",
					title: "Pain Point Items",
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
									rows: 4,
									validation: (
										Rule
									) =>
										Rule.required(),
								}),
								defineField({
									name: "image",
									title: "Image",
									type: "image",
									options: {
										hotspot: true,
									},
									description:
										"Optional icon or image for this pain point",
								}),
							],
							preview: {
								select: {
									title: "title",
									subtitle: "description",
									media: "icon",
								},
								prepare({
									title,
									subtitle,
									media,
								}) {
									return {
										title:
											title ||
											"Pain Point",
										subtitle: subtitle
											? subtitle.slice(
													0,
													60
												)
											: "",
										media,
									}
								},
							},
						},
					],
				}),
			],
		}),

		// Services
		defineField({
			name: "services",
			title: "Service Name",
			type: "string",
			group: "services",
			description:
				"Main service name (e.g., 'Web Development', 'Website Development', 'Web App Development')",
		}),
		defineField({
			name: "serviceCards",
			title: "Service Cards",
			type: "array",
			group: "services",
			of: [
				{
					type: "object",
					fields: [
						defineField({
							name: "id",
							title: "ID",
							type: "string",
							validation: (Rule) =>
								Rule.required(),
						}),
						defineField({
							name: "name",
							title: "Name",
							type: "string",
							validation: (Rule) =>
								Rule.required(),
						}),
						defineField({
							name: "title",
							title: "Title",
							type: "string",
							validation: (Rule) =>
								Rule.required(),
						}),
						defineField({
							name: "description",
							title: "Description",
							type: "text",
							rows: 3,
						}),
						defineField({
							name: "image",
							title: "Image",
							type: "image",
							options: {
								hotspot: true,
							},
						}),
						defineField({
							name: "video",
							title: "Video",
							type: "file",
							options: {
								accept: "video/*",
							},
							description:
								"Optional service card video",
						}),
						defineField({
							name: "link",
							title: "Link",
							type: "string",
							description:
								"URL path for this service card",
						}),
					],
					preview: {
						select: {
							title: "title",
							subtitle: "name",
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
									"Service Card",
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

		// Content Section
		defineField({
			name: "content",
			title: "Content Section",
			type: "object",
			group: "content",
			fields: [
				defineField({
					name: "heading",
					title: "Heading",
					type: "string",
				}),
				defineField({
					name: "text1",
					title: "Text 1",
					type: "text",
					rows: 4,
				}),
				defineField({
					name: "text2",
					title: "Text 2",
					type: "text",
					rows: 4,
				}),
				defineField({
					name: "text3",
					title: "Text 3",
					type: "text",
					rows: 4,
				}),
				defineField({
					name: "image",
					title: "Image",
					type: "image",
					options: { hotspot: true },
				}),
				defineField({
					name: "alt",
					title: "Image Alt Text",
					type: "string",
				}),
				defineField({
					name: "video",
					title: "Video",
					type: "file",
					options: {
						accept: "video/*",
					},
					description: "Optional content video",
				}),
			],
		}),

		// Process Section
		processField(),

		// Key Benefits
		defineField({
			name: "keyBenefits",
			title: "Key Benefits",
			type: "object",
			group: "keyBenefits",
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
					name: "items",
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
									rows: 4,
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
									description: "Icon image for the benefit",
								}),
								defineField({
									name: "image",
									title: "Image",
									type: "image",
									options: {
										hotspot: true,
									},
									description:
										"Optional benefit image",
								}),
							],
							preview: {
								select: {
									title: "title",
									subtitle: "description",
									media: "icon",
								},
								prepare({
									title,
									subtitle,
									media,
								}) {
									return {
										title:
											title ||
											"Benefit",
										subtitle: subtitle
											? subtitle.slice(
													0,
													60
												)
											: "",
										media,
									}
								},
							},
						},
					],
				}),
			],
		}),

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
					"Untitled Web Development Service",
				subtitle: subtitle ? `/${subtitle}` : "No slug",
			}
		},
	},
})
