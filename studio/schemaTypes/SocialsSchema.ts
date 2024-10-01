// schemas/socials.js
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'Socials', // Unique name for the schema
  title: 'Social Links', // Title shown in the Studio
  type: 'document', // Indicates this is a document type
  fields: [
    defineField({
      name: 'facebook', // Field name for Facebook
      title: 'Facebook URL', // Title shown in the Studio
      type: 'url', // Type of the field
      description: 'Enter your Facebook profile or page URL', // Description for the field
      validation: Rule => Rule.uri({ scheme: ['http', 'https'] }), // Optional validation for URL
    }),
    defineField({
      name: 'linkedin', // Field name for LinkedIn
      title: 'LinkedIn URL', // Title shown in the Studio
      type: 'url', // Type of the field
      description: 'Enter your LinkedIn profile URL', // Description for the field
      validation: Rule => Rule.uri({ scheme: ['http', 'https'] }), // Optional validation for URL
    }),
    defineField({
      name: 'instagram', // Field name for Instagram
      title: 'Instagram URL', // Title shown in the Studio
      type: 'url', // Type of the field
      description: 'Enter your Instagram profile URL', // Description for the field
      validation: Rule => Rule.uri({ scheme: ['http', 'https'] }), // Optional validation for URL
    }),
    defineField({
      name: 'twitter', // Field name for Twitter
      title: 'Twitter URL', // Title shown in the Studio
      type: 'url', // Type of the field
      description: 'Enter your Twitter profile URL', // Description for the field
      validation: Rule => Rule.uri({ scheme: ['http', 'https'] }), // Optional validation for URL
    }),
    defineField({
      name: 'snapchat', // Field name for Snapchat
      title: 'Snapchat URL', // Title shown in the Studio
      type: 'url', // Type of the field
      description: 'Enter your Snapchat profile URL', // Description for the field
      validation: Rule => Rule.uri({ scheme: ['http', 'https'] }), // Optional validation for URL
    }),
    defineField({
      name: 'email', // Field name for Email
      title: 'Email Address', // Title shown in the Studio
      type: 'string', // Type of the field
      description: 'Enter your email address', // Description for the field
      validation: Rule => Rule.required().email(), // Required validation for email
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
      const { facebook, linkedin, instagram, twitter, snapchat, email } = selection;
      return {
        title: 'Social Links',
        subtitle: `FB: ${facebook}, LI: ${linkedin}, IG: ${instagram}, TW: ${twitter}, SC: ${snapchat}, Email: ${email}`,
      };
    },
  },
});
