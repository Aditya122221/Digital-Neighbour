import { defineField, defineType } from "sanity";

export const seoPage = defineType({
  name: "seoPage",
  title: "SEO Service Page",
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
      name: "introParagraph",
      title: "Intro Paragraph",
    },
    {
      name: "painPoints",
      title: "Pain Points",
    },
    {
      name: "services",
      title: "Services",
    },
    {
      name: "content",
      title: "Content Section",
    },
    {
      name: "process",
      title: "Process Section",
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
        "Display name for this SEO service (e.g., 'Search Engine Optimisation', 'Local SEO')",
      group: "basic",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Service Slug",
      type: "slug",
      description:
        "URL-friendly identifier for this SEO service page (e.g., 'seo', 'local-seo', 'wordpress-seo')",
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
          name: "defaultHeroImage",
          title: "Default Hero Image",
          type: "image",
          description:
            "Fallback hero image used by any SEO service page that doesn't upload its own.",
          options: {
            hotspot: true,
          },
          hidden: ({ document }) => document?.slug?.current !== "seo",
        }),
        defineField({
          name: "image",
          title: "Hero Image Override",
          type: "image",
          description:
            "Optional: Override the default hero image for this specific SEO service page.",
          options: {
            hotspot: true,
          },
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

    // Services
    defineField({
      name: "services",
      title: "Services",
      type: "object",
      group: "services",
      fields: [
        defineField({
          name: "serviceName",
          title: "Service Name",
          type: "string",
          description: "Main service name (e.g., 'Search Engine Optimisation')",
        }),
        defineField({
          name: "serviceCards",
          title: "Service Cards",
          type: "array",
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
                  description: "Emoji or icon identifier",
                }),
              ],
            },
          ],
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
        title: title || "Untitled SEO Service",
        subtitle: subtitle ? `/${subtitle}` : "No slug",
      };
    },
  },
});
