import { defineField, defineType } from "sanity";

export const homeHero = defineType({
	name: "homeHero",
	title: "Homepage – Hero",
	type: "document",
	fields: [
		defineField({
			name: "heading",
			title: "Heading",
			type: "string",
			description: "Main heading for the hero section",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "highlightWord",
			title: "Word/Phrase to Highlight",
			type: "string",
			description: "Word or phrase in the heading to highlight (e.g., 'effortless', 'design', 'auckland')",
		}),
		defineField({
			name: "subheading",
			title: "Subheading",
			type: "text",
			description: "Subheading text below the main heading",
		}),
		defineField({
			name: "videoUrl",
			title: "Background Video",
			type: "file",
			description: "Optional background video file",
			options: {
				accept: "video/*",
			},
		}),
		defineField({
			name: "trustedByText",
			title: "Trusted By Text",
			type: "string",
			description: "Text displayed above the trusted by images",
			initialValue: "Trusted by founders",
		}),
		defineField({
			name: "topImages",
			title: "Top Images (Trusted By Section)",
			type: "array",
			of: [
				defineField({
					type: "image",
					name: "image",
					options: {
						hotspot: true,
					},
					fields: [
						defineField({
							name: "alt",
							title: "Alt Text",
							type: "string",
							description: "Alternative text for the image",
						}),
					],
				}),
			],
			description: "Exactly 3 images for the 'Trusted By' section at the top",
			validation: (Rule) =>
				Rule.length(3).error("You must provide exactly 3 images"),
		}),
		defineField({
			name: "inlineImages",
			title: "Inline Images (Between Words)",
			type: "array",
			of: [
				defineField({
					type: "image",
					name: "image",
					options: {
						hotspot: true,
					},
					fields: [
						defineField({
							name: "alt",
							title: "Alt Text",
							type: "string",
							description: "Alternative text for the image",
						}),
						defineField({
							name: "word",
							title: "Associated Word",
							type: "string",
							description: "The word after which this image should appear (e.g., 'effortless', 'design', 'auckland')",
						}),
					],
				}),
			],
			description: "Exactly 3 images that appear inline between words in the heading",
			validation: (Rule) =>
				Rule.length(3).error("You must provide exactly 3 images"),
		}),
		defineField({
			name: "buttonText",
			title: "Button Text",
			type: "string",
			description: "Text for the CTA button",
			initialValue: "Call Now",
		}),
		defineField({
			name: "buttonLink",
			title: "Button Link",
			type: "string",
			description: "URL or path for the button (e.g., /contact)",
			initialValue: "/contact",
		}),
	],
	preview: {
		select: {
			title: "heading",
			subtitle: "subheading",
		},
		prepare({ title, subtitle }) {
			return {
				title: title || "Homepage Hero",
				subtitle: subtitle ? subtitle.slice(0, 80) : "",
			};
		},
	},
});

