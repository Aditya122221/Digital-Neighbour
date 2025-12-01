import { defineField, defineType } from "sanity"

export const appDevelopmentPage = defineType({
	name: "appDevelopmentPage",
	title: "App Development Service Page",
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
			description:
				"Display name for this app development service (e.g., 'App Development', 'iOS App Development', 'Android App Development')",
			group: "basic",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Service Slug",
			type: "slug",
			description:
				"URL-friendly identifier (e.g., 'app-development', 'ios-app-development', 'android-app-development')",
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
							"SEO titles are usually no more than 60 characters."
						),
				}),
				defineField({
					name: "description",
					title: "SEO Description",
					type: "text",
					description:
						"Meta description for SEO (typically 150-160 characters)",
					validation: (Rule) =>
						Rule.max(160).warning(
							"SEO descriptions are usually no more than 160 characters."
						),
				}),
				defineField({
					name: "keywords",
					title: "SEO Keywords",
					type: "array",
					of: [{ type: "string" }],
					description: "Keywords for SEO",
					options: {
						layout: "tags",
					},
				}),
				defineField({
					name: "ogImage",
					title: "Open Graph Image",
					type: "image",
					description:
						"Image for social media sharing (recommended: 1200x630px)",
					options: {
						hotspot: true,
					},
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
					description:
						"Description for social media sharing",
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
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: "defaultHeroImages",
					title: "Default Hero Images",
					type: "array",
					description:
						"Fallback hero images (5 images) used by other app development pages when they don't upload their own images.",
					of: [
						{
							type: "image",
							options: {
								hotspot: true,
							},
						},
					],
					validation: (Rule) => Rule.max(5),
					hidden: ({ document }) =>
						document?.slug?.current !==
						"app-development",
				}),
				defineField({
					name: "heroImages",
					title: "Hero Images",
					type: "array",
					description:
						"Page-specific hero images for the slider (up to 5 images). If not provided, default images will be used.",
					of: [
						{
							type: "image",
							options: {
								hotspot: true,
							},
						},
					],
					validation: (Rule) => Rule.max(5),
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
					name: "content",
					title: "Content",
					type: "text",
					rows: 5,
				}),
				defineField({
					name: "subContent",
					title: "Sub Content",
					type: "text",
					rows: 4,
				}),
				defineField({
					name: "cta",
					title: "CTA Text",
					type: "text",
					rows: 3,
				}),
				defineField({
					name: "formHeading",
					title: "Form Heading",
					type: "string",
				}),
				defineField({
					name: "buttonText",
					title: "Button Text",
					type: "string",
				}),
			],
		}),

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
					name: "problemStatement",
					title: "Problem Statement",
					type: "text",
					rows: 4,
				}),
				defineField({
					name: "valueProposition",
					title: "Value Proposition",
					type: "text",
					rows: 4,
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
					name: "painPoints",
					title: "Pain Points",
					type: "array",
					of: [
						{
							type: "object",
							fields: [
								defineField({
									name: "problem",
									title: "Problem",
									type: "text",
									rows: 4,
									validation: (
										Rule
									) =>
										Rule.required(),
								}),
								defineField({
									name: "solution",
									title: "Solution",
									type: "text",
									rows: 5,
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
									title: "problem",
									subtitle: "solution",
									media: "image",
								},
								prepare({
									title,
									subtitle,
									media,
								}) {
									return {
										title: title
											? title.slice(
													0,
													60
												)
											: "Pain Point",
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
				"Main service name (e.g., 'App Development', 'iOS App Development', 'Android App Development')",
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
		defineField({
			name: "process",
			title: "Process Section",
			type: "object",
			group: "process",
			fields: [
				defineField({
					name: "steps",
					title: "Steps",
					type: "array",
					of: [{ type: "string" }],
					description:
						"List of process step titles",
				}),
				defineField({
					name: "content",
					title: "Content",
					type: "array",
					of: [{ type: "text" }],
					description:
						"Content for each process step",
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
					name: "benefits",
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
									type: "string",
									description:
										"Emoji or icon identifier",
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
					name: "features",
					title: "Features",
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
									type: "string",
									description:
										"Emoji or icon identifier",
								}),
								defineField({
									name: "image",
									title: "Image",
									type: "image",
									options: {
										hotspot: true,
									},
									description:
										"Optional feature image",
								}),
								defineField({
									name: "video",
									title: "Video",
									type: "file",
									options: {
										accept: "video/*",
									},
									description:
										"Optional feature video",
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
											"Feature",
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
						"Service name for FAQ context",
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
									rows: 5,
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
											"FAQ",
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
				title:
					title ||
					"Untitled App Development Service",
				subtitle: subtitle ? `/${subtitle}` : "No slug",
			}
		},
	},
})
