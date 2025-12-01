import { defineField, defineType } from "sanity"

export const siteFooter = defineType({
	name: "siteFooter",
	title: "Site Settings – Footer",
	type: "document",
	fields: [
		defineField({
			name: "logo",
			title: "Logo",
			type: "image",
			options: {
				hotspot: true,
			},
			fields: [
				defineField({
					name: "alt",
					title: "Alt Text",
					type: "string",
					description: "Accessible description for the footer logo",
				}),
				defineField({
					name: "href",
					title: "Logo Link",
					type: "string",
					description: "Path the logo should link to (defaults to /)",
				}),
			],
		}),
		defineField({
			name: "backgroundVideo",
			title: "Background Video",
			type: "file",
			options: {
				accept: "video/*",
			},
			description: "Optional looping video displayed behind the footer content.",
		}),
		defineField({
			name: "heading",
			title: "Primary Heading",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "subheading",
			title: "Supporting Copy",
			type: "text",
			rows: 3,
			description: "Short description inviting visitors to get in touch.",
		}),
		defineField({
			name: "ctaButton",
			title: "Call-to-Action Button",
			type: "object",
			fields: [
				defineField({
					name: "label",
					title: "Label",
					type: "string",
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: "href",
					title: "Link",
					type: "string",
					validation: (Rule) => Rule.required(),
				}),
			],
		}),
		defineField({
			name: "companyLinks",
			title: "Company Links",
			type: "array",
			of: [
				defineField({
					name: "link",
					type: "object",
					fields: [
						defineField({
							name: "label",
							title: "Label",
							type: "string",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "href",
							title: "Link",
							type: "string",
							validation: (Rule) => Rule.required(),
						}),
					],
				}),
			],
			validation: (Rule) =>
				Rule.min(1).error("Add at least one company navigation link."),
		}),
		defineField({
			name: "socialLinks",
			title: "Social Links",
			type: "array",
			of: [
				defineField({
					name: "socialLink",
					type: "object",
					fields: [
						defineField({
							name: "label",
							title: "Label",
							type: "string",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "href",
							title: "Link",
							type: "string",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "platform",
							title: "Platform",
							type: "string",
							description: "Optional platform identifier (used for icons).",
						}),
					],
				}),
			],
		}),
		defineField({
			name: "contactInfo",
			title: "Contact Information",
			type: "object",
			fields: [
				defineField({
					name: "phone",
					title: "Phone Number",
					type: "string",
				}),
				defineField({
					name: "email",
					title: "Email Address",
					type: "string",
				}),
			],
		}),
		defineField({
			name: "legalLinks",
			title: "Legal Links",
			type: "array",
			of: [
				defineField({
					name: "legalLink",
					type: "object",
					fields: [
						defineField({
							name: "label",
							title: "Label",
							type: "string",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "href",
							title: "Link",
							type: "string",
							validation: (Rule) => Rule.required(),
						}),
					],
				}),
			],
		}),
	],
	preview: {
		select: {
			title: "heading",
			subtitle: "ctaButton.label",
		},
		prepare({ title, subtitle }) {
			return {
				title: title || "Footer Settings",
				subtitle: subtitle ? `CTA: ${subtitle}` : undefined,
			}
		},
	},
})


