
import React, {useEffect} from 'react'
import { LoaderFunction, useLoaderData } from 'react-router';
import { fetchNewsLinks } from '../../../sanityApiClient/useSanityClient';
import { useAuthorContext } from '../../hooks/AuthorContext';
export interface NewsLink {
    _id: string;             // Unique identifier for the link document
    url: string;             // URL of the link
  }
  
  export interface NewsLinksResponse {
    links: NewsLink[];          // Array of link documents
  }


export const newsPageLoader: LoaderFunction = async () => {
    try {
      const newsLinks = await fetchNewsLinks();
  
      if (!newsLinks || newsLinks.length === 0) {
        throw new Error('No news links found');
      }
  
      return { newsLinks }; 
    } catch (error) {
      console.error('Error fetching links:', error);
      throw new Response('Error loading links', { status: 500 });
    }
  };




const NewsPage:React.FC = () => {
   
      const { newsLinks } = useLoaderData() as NewsLinksResponse;
      console.log(newsLinks);

      
      const {authorName} = useAuthorContext();

        useEffect(() => {
         document.title = `News - ${authorName}`;
       }, [authorName]);


      
      return (
        <section>
         <div className='md:w-[95%] mx-auto px-4 md:px-6 py-8 flex flex-col gap-20'>
             <span>
                 <h2 className="text-white text-4xl font-bold text-center mb-4">News</h2>
             </span>
     
             <div>
             <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {newsLinks[0].urls.map((link, i) => (
    <li key={i} className='list-disc md:pl-2 marker:text-[#E19618] marker:text-lg'>
      <a
        href={link}
        className="block text-blue-500 text-lg font-semibold hover:underline hover:text-orange-500 break-words"
        target="_blank" // Open link in a new tab
        rel="noopener noreferrer" // Security best practice
      >
        {link}
      </a>
    </li>
  ))}
</ul>



             </div>
         </div>
        </section>
     )
     
}

export default NewsPage;