import { defineField, defineType } from "sanity"

export const homePageType = defineType({
	name: "homePage",
	title: "Homepage",
	type: "document",
	fields: [
		defineField({
			name: "metadata",
			title: "Metadata Title",
			type: "string",
			description: "SEO title for the homepage.",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "description",
			title: "Metadata Description",
			type: "text",
			rows: 3,
			description: "SEO description for the homepage.",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "hero",
			title: "Hero Section",
			type: "object",
			fields: [
				defineField({
					name: "heading",
					title: "Heading",
					type: "string",
					validation: (rule) => rule.required(),
				}),
				defineField({
					name: "subheading",
					title: "Subheading",
					type: "text",
					rows: 3,
				}),
				defineField({
					name: "images",
					title: "Hero Images",
					type: "array",
					of: [{ type: "string" }],
					description:
						"Paths or URLs used in the animated hero bubbles.",
				}),
			],
		}),
		defineField({
			name: "brandInfo",
			title: "Brand Info Section",
			type: "object",
			fields: [
				defineField({
					name: "main",
					title: "Main Copy",
					type: "object",
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
							rows: 4,
						}),
					],
				}),
				defineField({
					name: "differentiators",
					title: "Differentiators",
					type: "array",
					of: [
						defineField({
							name: "differentiator",
							type: "object",
							fields: [
								defineField({
									name: "title",
									title: "Title",
									type: "string",
								}),
								defineField({
									name: "description",
									title: "Description",
									type: "text",
									rows: 3,
								}),
								defineField({
									name: "icon",
									title: "Icon Name",
									type: "string",
									description:
										"Name of the Lucide icon used in the UI.",
								}),
							],
						}),
					],
				}),
				defineField({
					name: "rightCard",
					title: "Right Card",
					type: "object",
					fields: [
						defineField({
							name: "heading",
							title: "Heading",
							type: "string",
						}),
						defineField({
							name: "description",
							title: "Description",
							type: "text",
							rows: 3,
						}),
						defineField({
							name: "stats",
							title: "Stats",
							type: "array",
							of: [
								defineField({
									name: "stat",
									type: "object",
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
					],
				}),
			],
		}),
		defineField({
			name: "services",
			title: "Services Section",
			type: "object",
			fields: [
				defineField({
					name: "heading",
					title: "Heading",
					type: "string",
					validation: (rule) => rule.required(),
				}),
				defineField({
					name: "subheading",
					title: "Subheading",
					type: "text",
					rows: 4,
				}),
				defineField({
					name: "cards",
					title: "Service Cards",
					type: "array",
					of: [
						defineField({
							name: "card",
							type: "object",
							fields: [
								defineField({
									name: "title",
									title: "Title",
									type: "string",
									validation: (rule) => rule.required(),
								}),
								defineField({
									name: "video",
									title: "Video URL",
									type: "string",
									description:
										"Video path or URL for the card background.",
								}),
								defineField({
									name: "subheading",
									title: "Bullet Points",
									type: "array",
									of: [{ type: "string" }],
								}),
							],
						}),
					],
				}),
			],
		}),
		defineField({
			name: "keepYourStack",
			title: "Keep Your Stack Section",
			type: "object",
			fields: [
				defineField({
					name: "logos",
					title: "Tech Logos",
					type: "array",
					of: [
						defineField({
							name: "logo",
							type: "object",
							fields: [
								defineField({
									name: "name",
									title: "Name",
									type: "string",
								}),
								defineField({
									name: "svg",
									title: "Logo Path",
									type: "string",
									description:
										"Path or URL to the logo asset.",
								}),
							],
						}),
					],
				}),
			],
		}),
		defineField({
			name: "caseStudies",
			title: "Case Studies Section",
			type: "object",
			fields: [
				defineField({
					name: "items",
					title: "Case Studies",
					type: "array",
					of: [
						defineField({
							name: "item",
							type: "object",
							fields: [
								defineField({
									name: "title",
									title: "Title",
									type: "string",
								}),
								defineField({
									name: "textColor",
									title: "Text Color Utility",
									type: "string",
									description:
										"Tailwind class controlling text color on the card.",
								}),
								defineField({
									name: "isNew",
									title: "Mark as New",
									type: "boolean",
								}),
								defineField({
									name: "services",
									title: "Services Tags",
									type: "array",
									of: [{ type: "string" }],
								}),
								defineField({
									name: "bgImages",
									title: "Background Images",
									type: "array",
									of: [{ type: "string" }],
									description:
										"URLs used for the hover slideshow.",
								}),
								defineField({
									name: "metrics",
									title: "Hover Metrics",
									type: "array",
									of: [
										defineField({
											name: "metric",
											type: "object",
											fields: [
												defineField({
													name: "number",
													title: "Number",
													type: "string",
												}),
												defineField({
													name: "text",
													title: "Label",
													type: "string",
												}),
											],
										}),
									],
								}),
							],
						}),
					],
				}),
			],
		}),
		defineField({
			name: "contentSection",
			title: "Impact Section",
			type: "object",
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
						defineField({
							name: "benefit",
							type: "object",
							fields: [
								defineField({
									name: "title",
									title: "Title",
									type: "string",
								}),
								defineField({
									name: "description",
									title: "Description",
									type: "text",
									rows: 3,
								}),
								defineField({
									name: "stat",
									title: "Stat / Supporting Detail",
									type: "string",
								}),
								defineField({
									name: "icon",
									title: "Icon Name",
									type: "string",
									description:
										"Optional identifier to map to a Lucide icon in code.",
								}),
							],
						}),
					],
				}),
			],
		}),
		defineField({
			name: "apart",
			title: "What Sets Us Apart",
			type: "object",
			fields: [
				defineField({
					name: "ours",
					title: "Our Attributes",
					type: "array",
					of: [{ type: "string" }],
					validation: (rule) => rule.min(1),
				}),
				defineField({
					name: "others",
					title: "Other Agencies",
					type: "array",
					of: [{ type: "string" }],
					validation: (rule) => rule.min(1),
				}),
			],
		}),
		defineField({
			name: "process",
			title: "Process Section",
			type: "object",
			fields: [
				defineField({
					name: "steps",
					title: "Steps",
					type: "array",
					of: [{ type: "string" }],
					validation: (rule) => rule.min(1),
				}),
				defineField({
					name: "content",
					title: "Step Details",
					type: "array",
					of: [{ type: "text" }],
					description:
						"Each entry should align with a step to power the process cards.",
				}),
			],
		}),
	],
})
