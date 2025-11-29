import { defineField, defineType } from "sanity"

const videoField = (name: string, title: string) =>
	defineField({
		name,
		title,
		type: "file",
		options: {
			accept: "video/*",
		},
	})

export const marketingAgencyHero = defineType({
	name: "marketingAgencyHero",
	title: "Marketing Agency Hero",
	type: "document",
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
			rows: 4,
		}),
		defineField({
			name: "ctaText",
			title: "CTA Text",
			type: "string",
		}),
		defineField({
			name: "ctaHref",
			title: "CTA Link",
			type: "string",
			description: "Internal path or full URL.",
		}),
		videoField("defaultHeroVideo", "Default Hero Video"),
		videoField("video", "Hero Video"),
	],
	preview: {
		select: {
			title: "heading",
			subtitle: "ctaText",
		},
		prepare({ title, subtitle }) {
			return {
				title: title || "Marketing Hero",
				subtitle: subtitle || "CTA not set",
			}
		},
	},
})

