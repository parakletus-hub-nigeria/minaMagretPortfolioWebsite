import { defineType, defineField } from "sanity";



export default defineType({
  name: "ManualsWritingsLinks",
  title: "Title of Manuals with embedded links written by the author of this website",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "Manuals Link Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "Item",
          title: "Manual Link Item",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1), 
    }),
  ],


});

