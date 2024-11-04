import { defineType, defineField } from "sanity";

export default defineType({
  name: 'PapersWritingsLinks',
  title: 'Title and Embedded links of Papers written by the author of this website',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Book Link Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'Item',
          title: 'Book Link Item',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1), // Ensure at least one item is present
    }),
  ],
});
