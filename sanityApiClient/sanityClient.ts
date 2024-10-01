// sanityClient.ts
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Create Sanity client
export const sanityClient= createClient({
  projectId: 'cod4w9ou', 
  dataset: 'production',      
  apiVersion: '2024-10-27',   
  useCdn: true,            
});


const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: any) => builder.image(source);
