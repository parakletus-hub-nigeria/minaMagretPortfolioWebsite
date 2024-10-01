import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'WomenAndGirlsImageBookLink',
  title: 'Women And Girls Image Book Link',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    }),
  ],
});
