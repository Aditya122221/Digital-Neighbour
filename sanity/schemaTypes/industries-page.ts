import { defineField, defineType } from "sanity"

export const industriesPage = defineType({
	name: "industriesPage",
	title: "Industries Service Page",
	type: "document",
	groups: [
		{
			name: "basic",
			title: "Basic Information",
		},
		{
			name: "seo",
			title: "SEO Settings",
		},
		{
			name: "hero",
			title: "Hero Section",
		},
		{
			name: "form",
			title: "Form Section",
		},
		{
			name: "introParagraph",
			title: "Intro Paragraph",
		},
		{
			name: "painPoints",
			title: "Pain Points",
		},
		{
			name: "services",
			title: "Services",
		},
		{
			name: "content",
			title: "Content Section",
		},
		{
			name: "process",
			title: "Process Section",
		},
		{
			name: "keyBenefits",
			title: "Key Benefits",
		},
		{
			name: "features",
			title: "Features",
		},
		{
			name: "faq",
			title: "FAQ Section",
		},
	],
	fields: [
		// Basic Info
		defineField({
			name: "serviceName",
			title: "Service Name",
			type: "string",
			description: "Display name for this Industries service",
			group: "basic",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Service Slug",
			type: "slug",
			description:
				"URL-friendly identifier (e.g., 'industries', 'automotive-repair-servicing-marketing-agency')",
			group: "basic",
			options: {
				source: "serviceName",
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		}),

		// SEO Settings
		defineField({
			name: "seoSettings",
			title: "SEO Settings",
			type: "object",
			group: "seo",
			fields: [
				defineField({
					name: "title",
					title: "SEO Title",
					type: "string",
					description:
						"Title tag for SEO (typically 50-60 characters)",
					validation: (Rule) =>
						Rule.max(60).warning(
							"SEO titles are typically 50-60 characters"
						),
				}),
				defineField({
					name: "description",
					title: "Meta Description",
					type: "text",
					rows: 3,
					description:
						"Meta description for SEO (typically 150-160 characters)",
					validation: (Rule) =>
						Rule.max(160).warning(
							"Meta descriptions are typically 150-160 characters"
						),
				}),
				defineField({
					name: "keywords",
					title: "Keywords",
					type: "array",
					of: [{ type: "string" }],
					options: { layout: "tags" },
					description:
						"SEO keywords for this page",
				}),
				defineField({
					name: "ogTitle",
					title: "Open Graph Title",
					type: "string",
					description:
						"Title for social media sharing",
				}),
				defineField({
					name: "ogDescription",
					title: "Open Graph Description",
					type: "text",
					rows: 3,
					description:
						"Description for social media sharing",
				}),
				defineField({
					name: "ogImage",
					title: "Open Graph Image",
					type: "image",
					options: { hotspot: true },
					description:
						"Image for social media sharing (recommended: 1200x630px)",
				}),
				defineField({
					name: "canonicalUrl",
					title: "Canonical URL",
					type: "url",
					description:
						"Canonical URL for this page",
				}),
			],
		}),

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
						"Fallback hero video used by other industry pages when they don't upload their own clip.",
					options: {
						accept: "video/*",
					},
					hidden: ({ document }) =>
						document?.slug?.current !==
						"industries",
				}),
				defineField({
					name: "industries",
					title: "Industries List",
					type: "array",
					description:
						"Optional: List of industries (used for main industries landing page)",
					of: [
						{
							type: "object",
							fields: [
								defineField({
									name: "name",
									title: "Industry Name",
									type: "string",
									validation: (
										Rule
									) =>
										Rule.required(),
								}),
								defineField({
									name: "slug",
									title: "Industry Slug",
									type: "string",
									description:
										"URL-friendly identifier for the industry",
									validation: (
										Rule
									) =>
										Rule.required(),
								}),
								defineField({
									name: "image",
									title: "Industry Image",
									type: "image",
									options: {
										hotspot: true,
									},
									description:
										"Image representing this industry",
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
											"Industry",
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

		// Intro Paragraph
		defineField({
			name: "introParagraph",
			title: "Intro Paragraph Section",
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
					of: [
						{
							type: "text",
							rows: 4,
						},
					],
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
											"Pain Point",
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

		// Service Cards
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
							name: "slug",
							title: "Slug",
							type: "string",
							description:
								"URL path for this service card",
						}),
						defineField({
							name: "image",
							title: "Image",
							type: "image",
							options: {
								hotspot: true,
							},
							description:
								"Optional service card image",
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
					],
					preview: {
						select: {
							title: "title",
							subtitle: "description",
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

		// Services
		defineField({
			name: "services",
			title: "Service Name",
			type: "string",
			group: "services",
			description: "Main service name (e.g., 'Industries')",
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
		defineField({
			name: "process",
			title: "Process Section",
			type: "object",
			group: "process",
			fields: [
				defineField({
					name: "heading",
					title: "Heading",
					type: "string",
				}),
				defineField({
					name: "steps",
					title: "Process Steps",
					type: "array",
					of: [{ type: "string" }],
					description:
						"List of process step titles",
				}),
				defineField({
					name: "content",
					title: "Process Step Content",
					type: "array",
					of: [{ type: "text", rows: 3 }],
					description:
						"Detailed descriptions for each process step (should match the number of steps)",
				}),
			],
		}),

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
									rows: 3,
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
									description: "Icon image",
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
								},
								prepare({
									title,
									subtitle,
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
									}
								},
							},
						},
					],
				}),
			],
		}),

		// Features
		defineField({
			name: "features",
			title: "Features",
			type: "object",
			group: "features",
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
					title: "Feature Items",
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
								defineField({
									name: "icon",
									title: "Icon",
									type: "image",
									options: {
										hotspot: true,
									},
									description: "Icon image",
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

		// Form Section
		defineField({
			name: "form",
			title: "Form Section",
			type: "object",
			group: "form",
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
			],
		}),

		// FAQ Section
		defineField({
			name: "faq",
			title: "FAQ Section",
			type: "object",
			group: "faq",
			fields: [
				defineField({
					name: "serviceName",
					title: "Service Name",
					type: "string",
					description:
						"Service name used in FAQ context",
				}),
				defineField({
					name: "tagline",
					title: "Tagline",
					type: "string",
					description:
						"Short line shown under the FAQ heading",
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
									validation: (
										Rule
									) =>
										Rule.required(),
								}),
								defineField({
									name: "a",
									title: "Answer",
									type: "text",
									rows: 4,
									validation: (
										Rule
									) =>
										Rule.required(),
								}),
							],
							preview: {
								select: {
									title: "q",
									subtitle: "a",
								},
								prepare({
									title,
									subtitle,
								}) {
									return {
										title:
											title ||
											"FAQ Question",
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
	preview: {
		select: {
			title: "serviceName",
			subtitle: "slug.current",
		},
		prepare({ title, subtitle }) {
			return {
				title: title || "Industries Service Page",
				subtitle: subtitle ? `/${subtitle}` : "",
			}
		},
	},
})
