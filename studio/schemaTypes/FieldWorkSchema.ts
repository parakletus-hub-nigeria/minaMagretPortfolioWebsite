import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'fieldWorkPictures',
  title: 'Pictures for Field Work',
  type: 'document',
  fields: [
    defineField({
      name: 'imageTitle',
      title: 'Image Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: 'imageUrl',
      title: 'Image URL',
      type: 'url',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https'],
          allowRelative: true,
        }),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'uploadedAt',
      title: 'Uploaded At',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      },
      initialValue: () => new Date().toISOString(),
    }),
  ],
});
