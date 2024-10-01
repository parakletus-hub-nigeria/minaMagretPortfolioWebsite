import { defineField, defineType } from "sanity";
export default defineType({
    name: 'FellowshipsAndSchloarshipsPageHeroImage',
    title: 'Fellowships And Schloarships Page  Hero Image',
    type: 'document',
    fields: [
      defineField({
        name: 'image',
        title: 'Fellowships And Schloarships Page  Hero Image',
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
  