import { defineField } from "sanity"

export const formField = (group: string = "form") =>
	defineField({
		name: "form",
		title: "Form Section",
		type: "object",
		group,
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
			}),
			defineField({
				name: "subContent",
				title: "Sub Content",
				type: "text",
			}),
			defineField({
				name: "cta",
				title: "CTA Text",
				type: "text",
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
			defineField({
				name: "buttonLink",
				title: "Button Link",
				type: "string",
				description: "URL or path for the button (e.g., /contact)",
			}),
		],
	})

