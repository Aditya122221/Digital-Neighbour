import { defineField, defineType } from "sanity";

export const socialMediaPage = defineType({
  name: "socialMediaPage",
  title: "Social Media Service Page",
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
      name: "painpoints",
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
        "Display name for this social media service (e.g., 'Social Media Marketing', 'Facebook Marketing')",
      group: "basic",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Service Slug",
      type: "slug",
      description:
        "URL-friendly identifier (e.g., 'social-media-marketing', 'facebook-marketing')",
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
          description: "Keywords for SEO",
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
          title: "Default Hero Video",
          type: "file",
          description:
            "Fallback hero video used by other social media pages when they don't supply their own clip.",
          options: {
            accept: "video/*",
          },
          hidden: ({ document }) =>
            document?.slug?.current !== "social-media-marketing",
        }),
        defineField({
          name: "image",
          title: "Hero Image",
          type: "image",
          options: { hotspot: true },
          description: "Optional hero image",
        }),
        defineField({
          name: "video",
          title: "Hero Video",
          type: "file",
          options: {
            accept: "video/*",
          },
          description: "Optional background video file",
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
          rows: 5,
        }),
        defineField({
          name: "subContent",
          title: "Sub Content",
          type: "text",
          rows: 4,
        }),
        defineField({
          name: "cta",
          title: "CTA Text",
          type: "text",
          rows: 3,
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
          name: "paragraphs",
          title: "Paragraphs",
          type: "array",
          of: [{ type: "text" }],
          description: "Array of paragraph texts",
        }),
      ],
    }),

    // Pain Points
    defineField({
      name: "painpoints",
      title: "Pain Points",
      type: "object",
      group: "painpoints",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
        }),
        defineField({
          name: "items",
          title: "Pain Point Items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "image",
                  title: "Image",
                  type: "image",
                  options: { hotspot: true },
                  description: "Icon or image for this pain point",
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
                  rows: 4,
                  validation: (Rule) => Rule.required(),
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
                    title: title || "Pain Point",
                    subtitle: subtitle ? subtitle.slice(0, 60) : "",
                    media,
                  };
                },
              },
            },
          ],
        }),
      ],
    }),

    // Services
    defineField({
      name: "services",
      title: "Service Name",
      type: "string",
      group: "services",
      description:
        "Main service name (e.g., 'Social Media Marketing', 'Facebook Marketing')",
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
              rows: 3,
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
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
            defineField({
              name: "link",
              title: "Link",
              type: "string",
              description: "URL path for this service card",
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "name",
              media: "image",
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || "Service Card",
                subtitle: subtitle || "",
                media,
              };
            },
          },
        },
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
          rows: 4,
        }),
        defineField({
          name: "text2",
          title: "Text 2",
          type: "text",
          rows: 4,
        }),
        defineField({
          name: "text3",
          title: "Text 3",
          type: "text",
          rows: 4,
        }),
        defineField({
          name: "image",
          title: "Image",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "alt",
          title: "Image Alt Text",
          type: "string",
        }),
        defineField({
          name: "video",
          title: "Video",
          type: "file",
          options: {
            accept: "video/*",
          },
          description: "Optional content video",
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
          rows: 3,
        }),
        defineField({
          name: "items",
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
                  rows: 4,
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  description: "Emoji or icon identifier",
                }),
                defineField({
                  name: "image",
                  title: "Image",
                  type: "image",
                  options: { hotspot: true },
                  description: "Optional benefit image",
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
                    title: title || "Benefit",
                    subtitle: subtitle ? subtitle.slice(0, 60) : "",
                    media,
                  };
                },
              },
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
          rows: 3,
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
                  rows: 4,
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  description: "Emoji or icon identifier",
                }),
                defineField({
                  name: "image",
                  title: "Image",
                  type: "image",
                  options: { hotspot: true },
                  description: "Optional feature image",
                }),
                defineField({
                  name: "video",
                  title: "Video",
                  type: "file",
                  options: {
                    accept: "video/*",
                  },
                  description: "Optional feature video",
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
                    title: title || "Feature",
                    subtitle: subtitle ? subtitle.slice(0, 60) : "",
                    media,
                  };
                },
              },
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
                  rows: 5,
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: "q",
                  subtitle: "a",
                },
                prepare({ title, subtitle }) {
                  return {
                    title: title || "FAQ",
                    subtitle: subtitle ? subtitle.slice(0, 60) : "",
                  };
                },
              },
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
        title: title || "Untitled Social Media Service",
        subtitle: subtitle ? `/${subtitle}` : "No slug",
      };
    },
  },
});
