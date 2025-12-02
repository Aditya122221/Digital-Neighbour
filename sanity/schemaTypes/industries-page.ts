import { defineField, defineType } from "sanity";
import {
  featuresField,
  keyBenefitsField,
  faqField,
  formField,
  introParagraphField,
  painPointsField,
  servicesTypeOne,
  contentSectionField,
  processField,
  seoSettingsField,
  commonGroups,
} from "./common";

export const industriesPage = defineType({
  name: "industriesPage",
  title: "Industries Service Page",
  type: "document",
  groups: [
    ...commonGroups,
    {
      name: "creativeShowcase",
      title: "Creative Showcase",
    },
    {
      name: "industryBrowser",
      title: "Industry Browser",
    },
  ],
  fields: [
    // Basic Info
    defineField({
      name: "serviceName",
      title: "Service Name",
      type: "string",
      description: "Display name for this Industries service",
      group: "basic",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Service Slug",
      type: "slug",
      description:
        "URL-friendly identifier (e.g., 'industries', 'automotive-repair-servicing-marketing-agency')",
      group: "basic",
      options: {
        source: "serviceName",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // SEO Settings
    seoSettingsField(),

    // Hero Section
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      group: "hero",
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
          rows: 3,
        }),
        defineField({
          name: "defaultHeroVideo",
          title: "Default Hero Video",
          type: "file",
          description:
            "Fallback hero video used by other industry pages when they don't upload their own clip.",
          options: {
            accept: "video/*",
          },
          hidden: (context) =>
            (context as any)?.document?.slug?.current !== "industries",
        }),
        defineField({
          name: "industries",
          title: "Industries List",
          type: "array",
          description:
            "Optional: List of industries (used for main industries landing page)",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "name",
                  title: "Industry Name",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "slug",
                  title: "Industry Slug",
                  type: "string",
                  description: "URL-friendly identifier for the industry",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "image",
                  title: "Industry Image",
                  type: "image",
                  options: {
                    hotspot: true,
                  },
                  description: "Image representing this industry",
                }),
              ],
              preview: {
                select: {
                  title: "name",
                  subtitle: "slug",
                  media: "image",
                },
                prepare({ title, subtitle, media }) {
                  return {
                    title: title || "Industry",
                    subtitle: subtitle || "",
                    media,
                  };
                },
              },
            },
          ],
        }),
        defineField({
          name: "video",
          title: "Hero Video",
          type: "file",
          options: {
            accept: "video/*",
          },
          description: "Optional hero section video",
        }),
      ],
    }),

    // Form Section
    formField(),

    // Intro Paragraph
    introParagraphField(),

    // Pain Points
    painPointsField(),

    // Services - Custom structure preserved
    defineField({
      name: "serviceCards",
      title: "Service Cards",
      type: "array",
      group: "services",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "slug",
              title: "Slug",
              type: "string",
              description: "URL path for this service card",
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
              description: "Optional service card image",
            }),
            defineField({
              name: "video",
              title: "Video",
              type: "file",
              options: {
                accept: "video/*",
              },
              description: "Optional service card video",
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
              media: "image",
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || "Service Card",
                subtitle: subtitle ? subtitle.slice(0, 60) : "",
                media,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "services",
      title: "Service Name",
      type: "string",
      group: "services",
      description: "Main service name (e.g., 'Industries')",
    }),

    // Content Section
    contentSectionField(),

    // Creative Showcase
    defineField({
      name: "creativeShowcase",
      title: "Creative Showcase",
      type: "object",
      group: "creativeShowcase",
      hidden: (context) =>
        (context as any)?.document?.slug?.current !== "industries",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "highlightWord",
          title: "Highlight Word",
          type: "string",
          description: "Optional word or phrase in the title to highlight.",
        }),
        defineField({
          name: "images",
          title: "Showcase Images",
          type: "array",
          of: [
            {
              type: "image",
              options: {
                hotspot: true,
              },
            },
          ],
          description:
            "Images for the Creative Showcase section. These will only appear on this Industries page.",
        }),
      ],
    }),

    // Industry Browser
    defineField({
      name: "industryBrowser",
      title: "Industry Browser",
      type: "object",
      group: "industryBrowser",
      hidden: (context) =>
        (context as any)?.document?.slug?.current !== "industries",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          description: "Main heading shown above the Industry Browser section.",
        }),
        defineField({
          name: "highlightWord",
          title: "Highlight Word",
          type: "string",
          description: "Optional word or phrase in the heading to highlight.",
        }),
        defineField({
          name: "items",
          title: "Industries",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "label",
                  title: "Industry Label",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "icon",
                  title: "Icon",
                  type: "image",
                  options: {
                    hotspot: true,
                  },
                  description:
                    "Small icon shown for this industry in the list.",
                }),
                defineField({
                  name: "image",
                  title: "Image",
                  type: "image",
                  options: {
                    hotspot: true,
                  },
                  description:
                    "Optional custom image for this industry. If omitted, a default fallback image is used.",
                }),
              ],
              preview: {
                select: {
                  title: "label",
                  media: "icon",
                },
              },
            },
          ],
          description:
            "Optional custom list of industries and images for the Industry Browser. If empty, falls back to the default configuration.",
        }),
      ],
    }),

    // Process Section - Custom structure preserved (has heading)
    processField(),

    // Key Benefits - Custom structure preserved (uses items instead of benefits)
    keyBenefitsField(),

    // Features - Custom structure preserved (uses items instead of features)
    featuresField(),

    // Form Section - Custom structure preserved (just heading/subheading)
    // defineField({
    // 	name: "form",
    // 	title: "Form Section",
    // 	type: "object",
    // 	group: "form",
    // 	fields: [
    // 		defineField({
    // 			name: "heading",
    // 			title: "Heading",
    // 			type: "string",
    // 		}),
    // 		defineField({
    // 			name: "subheading",
    // 			title: "Subheading",
    // 			type: "text",
    // 			rows: 3,
    // 		}),
    // 	],
    // }),

    // FAQ Section
    faqField(),
  ],
  preview: {
    select: {
      title: "serviceName",
      subtitle: "slug.current",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Industries Service Page",
        subtitle: subtitle ? `/${subtitle}` : "",
      };
    },
  },
});
