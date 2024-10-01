import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'ProfilePageHeroImage',
  title: 'Profile Page Hero Image',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Profile Page Hero Image',
      type: 'image',
      options: {
        hotspot: true, // Enables image cropping
      },
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
});
