import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'PortraitPictures',
  title: 'Portrait Pictures',
  type: 'document',
  fields: [
    defineField({
      name: 'imageTitle',
      title: 'Image Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
      hotspot: true, 
      },
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
