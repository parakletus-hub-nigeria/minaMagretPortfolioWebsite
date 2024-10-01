
import { defineType, defineField } from "sanity";
export default defineType({
    name: 'FellowshipsAndSchloarshipsPageInput',
    title: 'Fellowships And Schloarships Page Input',
    type: 'document',
    fields: [
      
      defineField({
        name: 'details',
        title: 'Fellowships and Schloarships You have gotten',
        type: 'array',
        of: [{ type: 'string' }],
        validation: (Rule) => Rule.required().min(1), 
      }),
    ],
  });
  