import { defineType, defineField } from "sanity";

export default defineType({
  name: 'EducationPageInput',
  title: 'Education Page Input',
  type: 'document',
  fields: [
    defineField({
      name: 'placeOfStudy',
      title: 'Place of Study',
      type: 'text',
      description: 'The name of the educational institution',
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: 'details',
      title: 'Details about where you studied',
      type: 'array',
      of: [{ type: 'string' }], // Array of strings for list items
      validation: (Rule) => Rule.required().min(1), // Require at least one detail
    }),
  ],
});
