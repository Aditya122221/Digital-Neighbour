import { defineField } from "sanity"

export const processField = (group: string = "process") =>
	defineField({
		name: "process",
		title: "Process Section",
		type: "object",
		group,
		fields: [
			defineField({
				name: "steps",
				title: "Steps",
				type: "array",
				of: [{ type: "string" }],
				description: "List of process step titles",
			}),
			defineField({
				name: "content",
				title: "Content",
				type: "array",
				of: [{ type: "text" }],
				description: "Content for each process step",
			}),
		],
	})

