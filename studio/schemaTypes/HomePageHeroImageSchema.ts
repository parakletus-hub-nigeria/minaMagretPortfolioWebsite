import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'HomePageHeroImage',
  title: 'HomePage Hero Image',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'HomePage Hero Image',
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
