
import { defineType, defineField } from "sanity";
export default defineType({
    name: 'AwardsAndRecognitionsPageInput',
    title: 'Awards And Reconitions Page Input',
    type: 'document',
    fields: [
      
      defineField({
        name: 'details',
        title: 'Awards and Recongitions you have gotten',
        type: 'array',
        of: [{ type: 'string' }],
        validation: (Rule) => Rule.required().min(1), 
      }),
    ],
  });
  