import React, {useEffect} from 'react';
import WritingsComponent from '../../components/WritingsComponent';
import { fetchPeaceAndSecurityBookLinks, fetchPeaceAndSecurityImageBookLinks } from '../../../sanityApiClient/useSanityClient';
import { useLoaderData, LoaderFunction } from 'react-router';
import { useAuthorContext } from '../../hooks/AuthorContext';


  interface ImageBookLink {
    title: string;
    image: {
      asset: {
       _id:string
      };
    };
    url: string;
  }
  
  interface BookLink {
    items:{
      title: string;
      url: string;  
  
    }[]
  }
  
  
  
  
  export const peaceAndSecurityPageLoader: LoaderFunction = async () => {
    try {
      const peaceAndSecurityImageBookLinks = await fetchPeaceAndSecurityImageBookLinks();
      const peaceAndSecurityBookLinks = await fetchPeaceAndSecurityBookLinks();
  
      
      if (!peaceAndSecurityImageBookLinks || peaceAndSecurityImageBookLinks.length === 0) {
        throw new Error('No books found');
      }
  
      
      if (!peaceAndSecurityBookLinks || peaceAndSecurityBookLinks.length === 0) {
        throw new Error('No books found');
      }
  
      return { peaceAndSecurityImageBookLinks, peaceAndSecurityBookLinks  };
    } catch (error) {
      throw new Response('Failed to load link entries', { status: 500 });
    }
  };
const PeaceAndSecurityPage:React.FC = () => {
 
  
  const {authorName} = useAuthorContext();

  useEffect(() => {
   document.title = `Peace And Security - ${authorName}`;
 }, [authorName]);


  
  const {peaceAndSecurityImageBookLinks, peaceAndSecurityBookLinks} = useLoaderData() as {peaceAndSecurityImageBookLinks:ImageBookLink[],
    peaceAndSecurityBookLinks:BookLink[]
  };

      
      return (
       <section>
            <div className='md:w-[85%] mx-auto px-4 md:px-6 py-8'>
                  <div>
            <WritingsComponent booksData={peaceAndSecurityImageBookLinks} linksData={peaceAndSecurityBookLinks[0].items} title={'peace and security'}  />
          </div>
        </div>
       </section>
      )
}

export default PeaceAndSecurityPage;