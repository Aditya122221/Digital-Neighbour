import { Rule, defineField, defineType } from "sanity"

const stringField = (
	name: string,
	title: string,
	options: Record<string, unknown> = {}
) =>
	defineField({
		name,
		title,
		type: "string",
		...options,
		...(name === "icon"
			? {
					readOnly: true,
			  }
			: {}),
	})

const textField = (name: string, title: string) =>
	defineField({
		name,
		title,
		type: "text",
	})

export const richTextBlock = defineType({
	name: "richTextBlock",
	title: "Rich Text Block",
	type: "array",
	of: [
		{
			type: "block",
		},
	],
})

export const titleDescription = defineType({
	name: "titleDescription",
	title: "Title & Description",
	type: "object",
	fields: [
		stringField("title", "Title"),
		textField("description", "Description"),
		stringField("icon", "Icon"),
		defineField({
			name: "image",
			title: "Image",
			type: "image",
			options: {
				hotspot: true,
			},
		}),
	],
})

export const problemSolution = defineType({
	name: "problemSolution",
	title: "Problem & Solution",
	type: "object",
	fields: [
		stringField("problem", "Problem"),
		textField("solution", "Solution"),
	],
})

export const heroSection = defineType({
	name: "heroSection",
	title: "Hero",
	type: "object",
	fields: [
		stringField("heading", "Heading"),
		textField("subheading", "Subheading"),
	],
})

export const formSection = defineType({
	name: "formSection",
	title: "Form",
	type: "object",
	fields: [
		stringField("heading", "Heading"),
		textField("content", "Content"),
		textField("subContent", "Sub Content"),
		textField("cta", "CTA"),
		stringField("formHeading", "Form Heading"),
		stringField("buttonText", "Button Text"),
	],
})

export const introParagraphSection = defineType({
	name: "introParagraphSection",
	title: "Intro Paragraph",
	type: "object",
	fields: [
		stringField("heading", "Heading"),
		textField("problemStatement", "Problem Statement"),
		textField("valueProposition", "Value Proposition"),
	],
})

export const painPointsSection = defineType({
	name: "painPointsSection",
	title: "Pain Points",
	type: "object",
	fields: [
		stringField("heading", "Heading"),
		textField("subheading", "Subheading"),
		defineField({
			name: "painPoints",
			title: "Problems & Solutions",
			type: "array",
			of: [{ type: "problemSolution" }],
		}),
	],
})

export const industryItem = defineType({
	name: "industryItem",
	title: "Industry",
	type: "object",
	fields: [
		stringField("id", "ID"),
		stringField("name", "Name"),
		stringField("icon", "Icon"),
		textField("details", "Details"),
	],
})

export const industriesSection = defineType({
	name: "industriesSection",
	title: "Industries",
	type: "object",
	fields: [
		stringField("heading", "Heading"),
		textField("description", "Description"),
		defineField({
			name: "industries",
			title: "Industries",
			type: "array",
			of: [{ type: "industryItem" }],
		}),
	],
})

export const keyBenefitsSection = defineType({
	name: "keyBenefitsSection",
	title: "Key Benefits",
	type: "object",
	fields: [
		stringField("heading", "Heading"),
		textField("subheading", "Subheading"),
		defineField({
			name: "benefits",
			title: "Benefits",
			type: "array",
			of: [{ type: "titleDescription" }],
		}),
		defineField({
			name: "items",
			title: "Items",
			type: "array",
			of: [{ type: "titleDescription" }],
		}),
	],
})

export const copyBlockSection = defineType({
	name: "copyBlockSection",
	title: "Copy Block",
	type: "object",
	fields: [
		stringField("heading", "Heading"),
		textField("text1", "Text 1"),
		textField("text2", "Text 2"),
		textField("text3", "Text 3"),
		defineField({
			name: "image",
			title: "Image",
			type: "image",
			options: {
				hotspot: true,
			},
		}),
		stringField("alt", "Alt Text"),
	],
})

export const featureItem = defineType({
	name: "featureItem",
	title: "Feature",
	type: "object",
	fields: [
		stringField("title", "Title"),
		textField("description", "Description"),
		stringField("icon", "Icon"),
	],
})

export const featuresSection = defineType({
	name: "featuresSection",
	title: "Features",
	type: "object",
	fields: [
		stringField("heading", "Heading"),
		textField("subheading", "Subheading"),
		defineField({
			name: "features",
			title: "Features",
			type: "array",
			of: [{ type: "featureItem" }],
		}),
	],
})

export const premiumCard = defineType({
	name: "premiumCard",
	title: "Card",
	type: "object",
	fields: [
		stringField("title", "Title"),
		textField("description", "Description"),
	],
})

export const premiumButton = defineType({
	name: "premiumButton",
	title: "Big Cards",
	type: "object",
	fields: [
		stringField("title", "Title"),
		stringField("badge", "Badge"),
		textField("description", "Description"),
	],
})

export const premiumCloudServicesSection = defineType({
	name: "premiumCloudServicesSection",
	title: "Services",
	type: "object",
	fields: [
		stringField("title", "Title"),
		defineField({
			name: "cardone",
			title: "Card One",
			type: "premiumCard",
		}),
		defineField({
			name: "cardtwo",
			title: "Card Two",
			type: "premiumCard",
		}),
		defineField({
			name: "customApi",
			title: "Big Cards One",
			type: "premiumButton",
		}),
		defineField({
			name: "maximumCustomization",
			title: "Big Cards Two",
			type: "object",
			fields: [
				stringField("title", "Title"),
				textField("description", "Description"),
				defineField({
					name: "features",
					title: "Features",
					type: "array",
					of: [{ type: "titleDescription" }],
				}),
			],
		}),
	],
})

export const processSection = defineType({
	name: "processSection",
	title: "Process",
	type: "object",
	fields: [
		stringField("heading", "Heading"),
		defineField({
			name: "steps",
			title: "Steps",
			type: "array",
			of: [{ type: "string" }],
		}),
		defineField({
			name: "content",
			title: "Content",
			type: "array",
			of: [{ type: "text" }],
		}),
	],
})

export const serviceCard = defineType({
	name: "serviceCard",
	title: "Service Card",
	type: "object",
	fields: [
		stringField("id", "ID"),
		stringField("name", "Name"),
		stringField("title", "Title"),
		textField("description", "Description"),
		defineField({
			name: "image",
			title: "Image",
			type: "image",
			options: {
				hotspot: true,
			},
		}),
	],
})

const slugMappingItem = defineType({
	name: "slugMappingItem",
	title: "Slug Mapping Item",
	type: "object",
	fields: [stringField("label", "Label"), stringField("slug", "Slug")],
})

export const strategicBlock = defineType({
	name: "strategicBlock",
	title: "Strategic Block",
	type: "object",
	fields: [
		stringField("icon", "Icon"),
		stringField("title", "Title"),
		textField("description", "Description"),
	],
})

export const strategicSection = defineType({
	name: "strategicSection",
	title: "Strategic Section",
	type: "object",
	fields: [
		stringField("heading", "Heading"),
		defineField({
			name: "blocks",
			title: "Blocks",
			type: "array",
			of: [{ type: "strategicBlock" }],
		}),
	],
})

export const otherServicesSection = defineType({
	name: "otherServicesSection",
	title: "Other Services",
	type: "object",
	fields: [
		defineField({
			name: "servicesList",
			title: "Services",
			type: "array",
			of: [{ type: "string" }],
		}),
		defineField({
			name: "slugMapping",
			title: "Slug Mapping",
			type: "array",
			of: [{ type: "slugMappingItem" }],
		}),
		defineField({
			name: "config",
			title: "Config",
			type: "object",
			fields: [
				stringField("title", "Title"),
				stringField(
					"highlightedText",
					"Highlighted Text"
				),
				defineField({
					name: "columns",
					title: "Columns",
					type: "number",
				}),
				stringField("baseUrl", "Base URL"),
			],
		}),
	],
})

export const faqItem = defineType({
	name: "faqItem",
	title: "FAQ",
	type: "object",
	fields: [stringField("q", "Question"), textField("a", "Answer")],
})

export const faqSection = defineType({
	name: "faqSection",
	title: "FAQ Section",
	type: "object",
	fields: [
		stringField("serviceName", "Service Name"),
		defineField({
			name: "faqs",
			title: "FAQs",
			type: "array",
			of: [{ type: "faqItem" }],
		}),
	],
})

export const specialisationSection = defineType({
	name: "specialisation",
	title: "Specialisation",
	type: "object",
	fields: [
		stringField("title", "Title"),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
		}),
		defineField({
			name: "hero",
			title: "Hero",
			type: "heroSection",
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
			name: "content",
			title: "Content",
			type: "copyBlockSection",
		}),
		defineField({
			name: "form",
			title: "Form",
			type: "formSection",
		}),
		defineField({
			name: "serviceCards",
			title: "Service Cards",
			type: "array",
			of: [{ type: "serviceCard" }],
		}),
		defineField({
			name: "faq",
			title: "FAQ",
			type: "faqSection",
		}),
	],
})

export const sectionTypes = [
	richTextBlock,
	titleDescription,
	problemSolution,
	heroSection,
	formSection,
	introParagraphSection,
	painPointsSection,
	industryItem,
	industriesSection,
	keyBenefitsSection,
	copyBlockSection,
	featureItem,
	featuresSection,
	premiumCard,
	premiumButton,
	premiumCloudServicesSection,
	processSection,
	serviceCard,
	faqItem,
	faqSection,
	specialisationSection,
	strategicBlock,
	strategicSection,
	slugMappingItem,
	otherServicesSection,
]
