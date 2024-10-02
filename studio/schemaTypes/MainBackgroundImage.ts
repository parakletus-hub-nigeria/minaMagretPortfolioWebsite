
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'MainBackgroundImage',
  title: 'Main Background Image',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Main Background Image',
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
