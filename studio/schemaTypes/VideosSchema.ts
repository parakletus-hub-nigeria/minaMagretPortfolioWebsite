import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'youtubeEmbedLinks',
  title: 'Youtube Embed Links For Videos',
  type: 'document',
  fields: [
    defineField({
      name: 'youtubeEmbedLinks',
      title: 'YouTube Links',
      type: 'array',
      of: [
        {
          type: 'url',
          title: 'YouTube URL',
          validation: (Rule) =>
            Rule.required().custom((url: string) => {
              const youtubeRegex =
                /^(https:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)).+/;
              if (youtubeRegex.test(url)) {
                return true; // Valid YouTube URL
              }
              return 'Must be a valid YouTube embed or watch URL';
            }),
        },
      ],
      validation: (Rule) => Rule.required().min(1), // At least one YouTube link is required
    }),
  ],
});

