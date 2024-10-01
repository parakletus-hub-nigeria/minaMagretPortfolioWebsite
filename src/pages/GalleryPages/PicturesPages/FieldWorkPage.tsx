import React, {useEffect} from 'react';
import ImagesComponent from '../../../components/ImagesComponent';
import { useLoaderData, LoaderFunction } from 'react-router';
import { fetchFieldWorkLinks } from '../../../../sanityApiClient/useSanityClient';
import { useAuthorContext } from '../../../hooks/AuthorContext';

interface ImageLink {
  _id: string;             // Unique identifier for the image link document
  imageTitle: string;      // Title of the image
  imageUrl: string;        // URL of the image
  description: string;     // Description of the image
  uploadedAt: string;      // Date and time when the image was uploaded (ISO string)
}
export const fieldWorkPageLoader: LoaderFunction = async () => {
  try {
    const imageLinks = await fetchFieldWorkLinks();

    if (!imageLinks || imageLinks.length === 0) {
      throw new Error('No image links found');
    }

    return { imageLinks }; 
  } catch (error) {
    console.error('Error fetching image links:', error);
    throw new Response('Error loading image page', { status: 500 });
  }
};

const FieldWorkPage: React.FC = () => {
  const { imageLinks } = useLoaderData() as { imageLinks: ImageLink[] }; // Use the defined interface to type the data

  // Map image links to the expected format for ImagesComponent
  const formattedImages = imageLinks.map((link) => ({
    url: link.imageUrl,        // The URL of the image
    title: link.imageTitle,     // The title of the image
    description: link.description // The description of the image
  }));

  
  const {authorName} = useAuthorContext();

  useEffect(() => {
   document.title = `Field Work Pictures - ${authorName}`;
 }, [authorName]);



  return (
    <section>
      <div className='md:w-[95%] mx-auto px-4 md:px-6 py-8'>
        {/* Pass the fetched and formatted image links to the ImagesComponent */}
        <ImagesComponent images={formattedImages} /> 
      </div>
    </section>
  );
};

export default FieldWorkPage;
