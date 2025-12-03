import { defineField, defineType } from "sanity";

export const contactForm = defineType({
	name: "contactForm",
	title: "Contact Page – Form",
	type: "document",
	fields: [
		defineField({
			name: "fields",
			title: "Form Fields",
			type: "array",
			of: [
				defineField({
					type: "object",
					name: "formField",
					fields: [
						defineField({
							name: "id",
							title: "Field ID",
							type: "string",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "name",
							title: "Field Name",
							type: "string",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "type",
							title: "Field Type",
							type: "string",
							options: {
								list: [
									{ title: "Text", value: "text" },
									{ title: "Email", value: "email" },
									{ title: "Tel", value: "tel" },
									{ title: "Select", value: "select" },
									{ title: "Textarea", value: "textarea" },
								],
							},
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "label",
							title: "Label",
							type: "string",
						}),
						defineField({
							name: "placeholder",
							title: "Placeholder",
							type: "string",
						}),
						defineField({
							name: "required",
							title: "Required",
							type: "boolean",
							initialValue: false,
						}),
						defineField({
							name: "gridCols",
							title: "Grid Columns",
							type: "string",
							description: "e.g., 'sm:grid-cols-2' for side-by-side fields",
						}),
						defineField({
							name: "rows",
							title: "Rows (for textarea)",
							type: "number",
							initialValue: 6,
						}),
						defineField({
							name: "options",
							title: "Options (for select)",
							type: "array",
							of: [
								defineField({
									type: "object",
									name: "option",
									fields: [
										defineField({
											name: "value",
											title: "Value",
											type: "string",
										}),
										defineField({
											name: "label",
											title: "Label",
											type: "string",
										}),
									],
								}),
							],
						}),
						defineField({
							name: "validation",
							title: "Validation Rules",
							type: "object",
							fields: [
								defineField({
									name: "minLength",
									title: "Min Length",
									type: "number",
								}),
								defineField({
									name: "maxLength",
									title: "Max Length",
									type: "number",
								}),
								defineField({
									name: "pattern",
									title: "Pattern (Regex)",
									type: "string",
									description: "Regular expression pattern for validation",
								}),
								defineField({
									name: "errorMessage",
									title: "Error Message",
									type: "string",
								}),
							],
						}),
					],
				}),
			],
		}),
		defineField({
			name: "submitButton",
			title: "Submit Button",
			type: "object",
			fields: [
				defineField({
					name: "text",
					title: "Button Text",
					type: "string",
					initialValue: "Submit",
				}),
				defineField({
					name: "type",
					title: "Button Type",
					type: "string",
					initialValue: "submit",
				}),
			],
		}),
		defineField({
			name: "disclaimer",
			title: "Disclaimer",
			type: "object",
			fields: [
				defineField({
					name: "text",
					title: "Disclaimer Text",
					type: "text",
				}),
				defineField({
					name: "termsLink",
					title: "Terms Link",
					type: "string",
					initialValue: "/terms",
				}),
				defineField({
					name: "privacyLink",
					title: "Privacy Link",
					type: "string",
					initialValue: "/privacy",
				}),
			],
		}),
		defineField({
			name: "thankYouMessage",
			title: "Thank You Message",
			type: "object",
			description: "Message displayed after successful form submission",
			fields: [
				defineField({
					name: "title",
					title: "Title",
					type: "string",
					description: "Main heading for the thank you message",
					initialValue: "Thank You! 🎉",
				}),
				defineField({
					name: "message",
					title: "Message",
					type: "text",
					description: "Thank you message content",
					rows: 4,
				}),
				defineField({
					name: "subMessage",
					title: "Sub Message",
					type: "text",
					description: "Additional text below the main message (optional)",
					rows: 3,
				}),
			],
		}),
	],
	preview: {
		select: {
			fieldsCount: "fields",
		},
		prepare({ fieldsCount }) {
			return {
				title: "Contact Form",
				subtitle: fieldsCount
					? `${fieldsCount.length} field${fieldsCount.length !== 1 ? "s" : ""}`
					: "No fields",
			};
		},
	},
});

