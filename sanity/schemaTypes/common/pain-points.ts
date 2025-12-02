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