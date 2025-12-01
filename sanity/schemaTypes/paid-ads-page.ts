import { defineField, defineType } from "sanity";

export const paidAdsPage = defineType({
  name: "paidAdsPage",
  title: "Paid Ads Service Page",
  type: "document",
  groups: [
    {
      name: "basic",
      title: "Basic Information",
    },
    {
      name: "seo",
      title: "SEO Settings",
    },
    {
      name: "hero",
      title: "Hero Section",
    },
    {
      name: "form",
      title: "Form Section",
    },
    {
      name: "services",
      title: "Services",
    },
    {
      name: "process",
      title: "Process Section",
    },
    {
      name: "strategic",
      title: "Strategic Section",
    },
    {
      name: "introParagraph",
      title: "Intro Paragraph",
    },
    {
      name: "painPoints",
      title: "Pain Points",
    },
    {
      name: "keyBenefits",
      title: "Key Benefits",
    },
    {
      name: "features",
      title: "Features",
    },
    {
      name: "content",
      title: "Content Section",
    },
    {
      name: "faq",
      title: "FAQ Section",
    },
  ],
  fields: [
    // Basic Info
    defineField({
      name: "serviceName",
      title: "Service Name",
      type: "string",
      description:
        "Display name for this paid ads service (e.g., 'Paid Advertising', 'Google Ads', 'Meta Ads')",
      group: "basic",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Service Slug",
      type: "slug",
      description:
        "URL-friendly identifier for this paid ads service page (e.g., 'paid-advertisement', 'google-ads', 'meta-ads')",
      group: "basic",
      options: {
        source: "serviceName",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // SEO Settings
    defineField({
      name: "seoSettings",
      title: "SEO Settings",
      type: "object",
      group: "seo",
      fields: [
        defineField({
          name: "title",
          title: "SEO Title",
          type: "string",
          description: "Title tag for SEO (typically 50-60 characters)",
          validation: (Rule) =>
            Rule.max(60).warning(
              "SEO titles are usually no more than 60 characters.",
            ),
        }),
        defineField({
          name: "description",
          title: "SEO Description",
          type: "text",
          description:
            "Meta description for SEO (typically 150-160 characters)",
          validation: (Rule) =>
            Rule.max(160).warning(
              "SEO descriptions are usually no more than 160 characters.",
            ),
        }),
        defineField({
          name: "keywords",
          title: "SEO Keywords",
          type: "array",
          of: [{ type: "string" }],
          description: "Keywords for SEO (comma-separated)",
          options: {
            layout: "tags",
          },
        }),
        defineField({
          name: "ogImage",
          title: "Open Graph Image",
          type: "image",
          description:
            "Image for social media sharing (recommended: 1200x630px)",
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: "ogTitle",
          title: "Open Graph Title",
          type: "string",
          description: "Title for social media sharing",
        }),
        defineField({
          name: "ogDescription",
          title: "Open Graph Description",
          type: "text",
          description: "Description for social media sharing",
        }),
        defineField({
          name: "canonicalUrl",
          title: "Canonical URL",
          type: "url",
          description: "Canonical URL for this page",
        }),
      ],
    }),

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
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "defaultHeroVideo",
          title: "Default Hero Background Video",
          type: "file",
          description:
            "Used as the fallback background video for other Paid Ads service pages.",
          options: {
            accept: "video/*",
          },
          hidden: ({ document }) =>
            document?.slug?.current !== "paid-advertisement",
        }),
        defineField({
          name: "bgVideo",
          title: "Background Video",
          type: "file",
          options: {
            accept: "video/*",
          },
          description: "Optional hero background video",
        }),
      ],
    }),

    // Form Section
    defineField({
      name: "form",
      title: "Form Section",
      type: "object",
      group: "form",
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
      ],
    }),

    // Services
    defineField({
      name: "services",
      title: "Service Name",
      type: "string",
      group: "services",
      description: "Main service name (e.g., 'Paid Advertising', 'Google Ads')",
    }),
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
              name: "id",
              title: "ID",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
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
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "string",
              description: "URL path for this service card",
            }),
          ],
        },
      ],
    }),

    // Process Section
    defineField({
      name: "process",
      title: "Process Section",
      type: "object",
      group: "process",
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
    }),

    // Strategic Section
    defineField({
      name: "strategic",
      title: "Strategic Section",
      type: "object",
      group: "strategic",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
        }),
        defineField({
          name: "blocks",
          title: "Strategic Blocks",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  description: "Emoji or icon identifier",
                }),
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
                  validation: (Rule) => Rule.required(),
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // Intro Paragraph
    defineField({
      name: "introParagraph",
      title: "Intro Paragraph",
      type: "object",
      group: "introParagraph",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
        }),
        defineField({
          name: "problemStatement",
          title: "Problem Statement",
          type: "text",
        }),
        defineField({
          name: "valueProposition",
          title: "Value Proposition",
          type: "text",
        }),
      ],
    }),

    // Pain Points
    defineField({
      name: "painPoints",
      title: "Pain Points",
      type: "object",
      group: "painPoints",
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
        }),
        defineField({
          name: "painPoints",
          title: "Pain Points",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "problem",
                  title: "Problem",
                  type: "text",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "solution",
                  title: "Solution",
                  type: "text",
                  validation: (Rule) => Rule.required(),
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // Key Benefits
    defineField({
      name: "keyBenefits",
      title: "Key Benefits",
      type: "object",
      group: "keyBenefits",
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
        }),
        defineField({
          name: "benefits",
          title: "Benefits",
          type: "array",
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
                  validation: (Rule) => Rule.required(),
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // Features
    defineField({
      name: "features",
      title: "Features",
      type: "object",
      group: "features",
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
        }),
        defineField({
          name: "features",
          title: "Features",
          type: "array",
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
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  description: "Optional text or emoji icon",
                }),
                defineField({
                  name: "image",
                  title: "Icon Image",
                  type: "image",
                  options: {
                    hotspot: true,
                  },
                  description:
                    "Optional feature icon image. Shown in the UI instead of the text icon when set.",
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // Content Section
    defineField({
      name: "content",
      title: "Content Section",
      type: "object",
      group: "content",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
        }),
        defineField({
          name: "text1",
          title: "Text 1",
          type: "text",
        }),
        defineField({
          name: "text2",
          title: "Text 2",
          type: "text",
        }),
        defineField({
          name: "text3",
          title: "Text 3",
          type: "text",
        }),
        defineField({
          name: "image",
          title: "Image",
          type: "image",
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: "alt",
          title: "Image Alt Text",
          type: "string",
        }),
      ],
    }),

    // FAQ Section
    defineField({
      name: "faq",
      title: "FAQ Section",
      type: "object",
      group: "faq",
      fields: [
        defineField({
          name: "serviceName",
          title: "Service Name",
          type: "string",
          description: "Service name for FAQ context",
        }),
        defineField({
          name: "tagline",
          title: "Tagline",
          type: "string",
          description: "Short line shown under the FAQ heading",
        }),
        defineField({
          name: "faqs",
          title: "FAQs",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "q",
                  title: "Question",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "a",
                  title: "Answer",
                  type: "text",
                  validation: (Rule) => Rule.required(),
                }),
              ],
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "serviceName",
      subtitle: "slug.current",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Untitled Paid Ads Service",
        subtitle: subtitle ? `/${subtitle}` : "No slug",
      };
    },
  },
});
