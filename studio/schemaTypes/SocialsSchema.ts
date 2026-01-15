import {defineType, defineField} from 'sanity'
export default defineType({
  name: 'Socials',
  title: 'Social Links',
  type: 'document',
  fields: [
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
      description: 'Enter your Facebook profile or page URL',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'Enter your LinkedIn profile URL',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
      description: 'Enter your Instagram profile URL',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter URL',
      type: 'url',
      description: 'Enter your Twitter profile URL',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'snapchat',
      title: 'Snapchat URL',
      type: 'url',
      description: 'Enter your Snapchat profile URL',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'Enter your email address',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'researchgate',
      title: 'ResearchGate URL',
      type: 'url',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'googlescholar',
      title: 'Google Scholar URL',
      type: 'url',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'academiaEdu',
      title: 'Academia.edu URL',
      type: 'url',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
    }),
  ],
  preview: {
    select: {
      facebook: 'facebook',
      linkedin: 'linkedin',
      instagram: 'instagram',
      twitter: 'twitter',
      snapchat: 'snapchat',
      email: 'email',
    },
    prepare(selection) {
      const {facebook, linkedin, instagram, twitter, snapchat, email} = selection
      return {
        title: 'Social Links',
        subtitle: `FB: ${facebook}, LI: ${linkedin}, IG: ${instagram}, TW: ${twitter}, SC: ${snapchat}, Email: ${email}`,
      }
    },
  },
})
