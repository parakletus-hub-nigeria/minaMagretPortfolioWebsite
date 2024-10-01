// schemas/NewsLink.js

import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'NewsLinks', // Unique name for the schema
  title: 'News Links', // Title that will be shown in the Studio
  type: 'document', // Indicates this is a document type
  fields: [
    defineField({
      name: 'urls', // Name of the field (plural for an array)
      title: 'URLs', // Title shown in the Studio
      type: 'array', // Specify this is an array type
      of: [
        {
          type: 'url', // Each item in the array is a URL type
          title: 'URL', // Title for individual URL field
          description: 'Enter a valid URL', // Optional description
          validation: Rule => Rule.required().uri({ scheme: ['http', 'https'] }), // Validation rule
        }
      ],
      validation: Rule => Rule.required().min(1), // Ensure at least one URL is provided
    }),
  ],
  preview: {
    select: {
      urls: 'urls',
    },
    prepare(selection) {
      const { urls } = selection;
      return {
        title: `Links (${urls?.length || 0})`, // Display the number of URLs in the preview
      };
    },
  },
});
