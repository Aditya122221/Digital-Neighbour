import { defineField } from "sanity"

export const painPointsField = (group: string = "painPoints") => 
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
                name: "highlightWord",
                title: "Word/Phrase to Highlight",
                type: "string",
                description:
                    "Word or phrase in the heading to highlight (e.g., 'Challenges', 'Problems', 'Issues', 'Pain Points')",
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
                                validation: (
                                    Rule
                                ) =>
                                    Rule.required(),
                            }),
                            defineField({
                                name: "solution",
                                title: "Solution",
                                type: "text",
                                validation: (
                                    Rule
                                ) =>
                                    Rule.required(),
                            }),
                        ],
                    },
                ],
            }),
        ],
    })