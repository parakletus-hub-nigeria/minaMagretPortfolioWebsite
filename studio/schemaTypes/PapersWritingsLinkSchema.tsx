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
            defineField({
              name: 'authors',
              title: 'Authors / Citation Byline',
              type: 'string',
              description: 'e.g. Ogbanga, M. M. or Ogbanga, M. M., & Smith, J.',
            }),
            defineField({
              name: 'year',
              title: 'Publication Year',
              type: 'string',
              description: 'e.g. 2024',
            }),
            defineField({
              name: 'journal',
              title: 'Journal / Publisher / Conference',
              type: 'string',
              description: 'e.g. International Journal of Social Work & Sustainability',
            }),
            defineField({
              name: 'category',
              title: 'Subject Category',
              type: 'string',
              options: {
                list: [
                  { title: 'Environmental Sustainability', value: 'Environmental Sustainability' },
                  { title: 'Social Work & Community', value: 'Social Work & Community' },
                  { title: 'Extractives & Energy', value: 'Extractives & Energy' },
                  { title: 'Policy, Law & Governance', value: 'Policy, Law & Governance' },
                  { title: 'WASH & Sanitation', value: 'WASH & Sanitation' },
                ],
              },
            }),
            defineField({
              name: 'doi',
              title: 'DOI / Citation Identifier',
              type: 'string',
              description: 'e.g. 10.1000/182 or https://doi.org/...',
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1), // Ensure at least one item is present
    }),
  ],
});
