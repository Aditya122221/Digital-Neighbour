import { defineField, defineType } from "sanity"

export const marketingAgencyProcess = defineType({
	name: "marketingAgencyProcess",
	title: "Marketing Agency Process",
	type: "document",
	fields: [
		defineField({
			name: "heading",
			title: "Heading",
			type: "string",
		}),
		defineField({
			name: "steps",
			title: "Steps",
			type: "array",
			of: [{ type: "string" }],
		}),
		defineField({
			name: "content",
			title: "Step Content",
			type: "array",
			of: [{ type: "text", rows: 5 }],
		}),
	],
	preview: {
		select: {
			title: "heading",
			count: "steps.length",
		},
		prepare({ title, count }) {
			return {
				title: title || "Process",
				subtitle: `${count || 0} steps`,
			}
		},
	},
})

