import { defineField } from "sanity"

export const contentSectionField = (group: string = "content") =>
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
    })