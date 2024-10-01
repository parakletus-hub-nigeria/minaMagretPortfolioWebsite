import { defineField, defineType } from "sanity";
export default defineType({
    name: 'AwardsAndRecognitionsPageHeroImage',
    title: 'Awards And Recognitions Page Hero Image',
    type: 'document',
    fields: [
      defineField({
        name: 'image',
        title: 'Awards And Recognitions Page Hero Image',
        type: 'image',
        options: {
          hotspot: true,
        },
        validation: (Rule) => Rule.required()
      }),
      defineField({
        name: 'caption',
        title: 'Caption',
        type: 'string',

      }),
      
    ],
  });
  