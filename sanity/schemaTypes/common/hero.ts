import { defineField } from "sanity"

export const heroField = (group: string = "hero") =>
	defineField({
		name: "hero",
		title: "Hero Section",
		type: "object",
		group,
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
				name: "image",
				title: "Hero Image",
				type: "image",
				description: "Hero image for this service page",
				options: {
					hotspot: true,
				},
			}),
		],
	})

