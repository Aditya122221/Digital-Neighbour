import { defineField, defineType } from "sanity"

export const siteNavbar = defineType({
	name: "siteNavbar",
	title: "Site Settings – Header",
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
					description: "Accessible description for the logo",
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
			name: "ctaButton",
			title: "Primary CTA Button",
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
					name: "variant",
					title: "Variant",
					type: "string",
					options: {
						list: [
							{ title: "Primary", value: "primary" },
							{ title: "Secondary", value: "secondary" },
							{ title: "Ghost", value: "ghost" },
						],
						layout: "radio",
					},
					initialValue: "primary",
				}),
			],
		}),
		defineField({
			name: "navigationLinks",
			title: "Navigation Links",
			type: "array",
			description: "Top-level navigation links rendered on desktop & mobile.",
			of: [
				defineField({
					type: "object",
					name: "navLink",
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
							description: "Relative path or absolute URL",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "hasMegaMenu",
							title: "Has Mega Menu",
							type: "boolean",
							initialValue: false,
						}),
						defineField({
							name: "megaMenuCategoryKey",
							title: "Mega Menu Category Key",
							type: "string",
							description:
								"When enabled, match this key with one of the mega menu categories below.",
							hidden: ({ parent }) => !parent?.hasMegaMenu,
						}),
					],
				}),
			],
			validation: (Rule) => Rule.min(1).error("Add at least one navigation link."),
		}),
		defineField({
			name: "megaMenuCategories",
			title: "Mega Menu Categories",
			type: "array",
			description:
				"Define the content for each mega menu category (Marketing, Web & App, etc.).",
			of: [
				defineField({
					name: "category",
					type: "object",
					fields: [
						defineField({
							name: "key",
							title: "Key",
							type: "string",
							description:
								"Identifier referenced by navigation links (e.g., marketing, dev).",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "title",
							title: "Title",
							type: "string",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "isDefault",
							title: "Active by Default",
							type: "boolean",
							initialValue: false,
						}),
						defineField({
							name: "columns",
							title: "Columns",
							type: "array",
							of: [
								defineField({
									name: "column",
									type: "object",
									fields: [
										defineField({
											name: "title",
											title: "Column Title",
											type: "string",
											validation: (Rule) => Rule.required(),
										}),
										defineField({
											name: "href",
											title: "Optional Column Link",
											type: "string",
											description: "Provide to make the title clickable.",
										}),
										defineField({
											name: "services",
											title: "Entries",
											type: "array",
											of: [
												defineField({
													name: "service",
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
															description:
																"Route or URL this service should link to.",
															validation: (Rule) => Rule.required(),
														}),
														defineField({
															name: "icon",
															title: "Icon",
															type: "image",
															options: {
																hotspot: true,
															},
															fields: [
																defineField({
																	name: "alt",
																	title: "Alt Text",
																	type: "string",
																}),
															],
														}),
														defineField({
															name: "emoji",
															title: "Emoji Fallback",
															type: "string",
															description:
																"Optional emoji when no image icon is available.",
														}),
													],
												}),
											],
											validation: (Rule) => Rule.min(1),
										}),
									],
								}),
							],
							validation: (Rule) => Rule.min(1),
						}),
					],
				}),
			],
		}),
		defineField({
			name: "mobileOverrides",
			title: "Mobile Navigation Overrides",
			type: "object",
			options: {
				collapsible: true,
				collapsed: true,
			},
			fields: [
				defineField({
					name: "menuLabel",
					title: "Menu Label",
					type: "string",
					description: "Label displayed above the expandable mobile menu.",
				}),
				defineField({
					name: "contactLinks",
					title: "Quick Contact Links",
					type: "array",
					of: [
						defineField({
							type: "object",
							name: "contactLink",
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
		}),
	],
	preview: {
		select: {
			title: "navigationLinks.0.label",
		},
		prepare({ title }) {
			return {
				title: "Header Settings",
				subtitle: title ? `Primary link: ${title}` : "Configure global navigation",
			}
		},
	},
})


