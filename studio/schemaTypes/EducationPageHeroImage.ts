
import { defineField, defineType } from "sanity";
export default defineType({
    name: 'EducationPageHeroImage',
    title: 'Education Page Hero Image',
    type: 'document',
    fields: [
      defineField({
        name: 'image',
        title: 'Education page Hero Image',
        type: 'image',
        options: {
          hotspot: true, // Enables image cropping
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
  