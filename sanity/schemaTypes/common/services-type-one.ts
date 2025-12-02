import { defineField } from "sanity"

export const servicesTypeOne = (group: string = "services") =>
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
                description:
                    "Main service name (e.g., 'Search Engine Optimisation')",
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
                                validation: (
                                    Rule
                                ) =>
                                    Rule.required(),
                            }),
                            defineField({
                                name: "name",
                                title: "Name",
                                type: "string",
                                validation: (
                                    Rule
                                ) =>
                                    Rule.required(),
                            }),
                            defineField({
                                name: "title",
                                title: "Title",
                                type: "string",
                                validation: (
                                    Rule
                                ) =>
                                    Rule.required(),
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
    })