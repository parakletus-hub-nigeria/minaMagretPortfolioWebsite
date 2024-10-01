import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'WorkPageInput',
  title: 'Work Page Input',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // Enables image cropping and focus point selection
      },
    }),
    defineField({
      name: 'heading',
      title: 'Heading with Link',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Heading', value: 'h2' }], // Allows only heading styles
          lists: [], // Disable lists in heading
          marks: {
            decorators: [], // No decorators for the heading (e.g., bold/italic)
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                  {
                    name: 'openInNewTab',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A small description text',
    }),
  ],
});
