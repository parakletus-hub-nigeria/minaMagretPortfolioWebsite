import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'ProfilePageText',
  title: 'Profile Page Text',
  type: 'document',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',  // This defines the block structure
          styles: [{ title: 'Normal', value: 'normal' }],  // Paragraph style
          lists: [], // No lists allowed for now
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' }
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL'
                  },
                  {
                    name: 'openInNewTab',
                    type: 'boolean',
                    title: 'Open in new tab',
                  }
                ]
              }
            ]
          }
        }
      ]
    })
  ]
});
