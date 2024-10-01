import { defineField, defineType } from "sanity";

export default defineType({
    name: 'Author',
    title: 'Author',
    type: 'document',
    fields:[
        defineField({
            name: 'author',
            title: 'Name of the Owner of this website',
            type: 'text'
        }),

        defineField({
            name: 'logo',
            title: 'Website logo',
            type: 'image',
            options: {
              hotspot: true, 
            },
          }),
    ]
});