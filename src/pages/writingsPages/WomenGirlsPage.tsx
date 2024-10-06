import React, {useEffect} from 'react'
import WritingsComponent from '../../components/WritingsComponent';
import { useLoaderData, LoaderFunction } from 'react-router';
import { fetchWomenaAndGirlsBookLinks, fetchWomenAndGirlsImageBookLinks } from '../../../sanityApiClient/useSanityClient';
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

  export const womenAndGirlsPageLoader: LoaderFunction = async () => {

    try {
      const womenAndGirlsImageBookLinks = await fetchWomenAndGirlsImageBookLinks();
      const womenAndGirlsBookLinks = await fetchWomenaAndGirlsBookLinks();
  
      
      if (!womenAndGirlsImageBookLinks || womenAndGirlsImageBookLinks.length === 0) {
        throw new Error('No books found');
      }
  
      
      if (!womenAndGirlsBookLinks || womenAndGirlsBookLinks.length === 0) {
        throw new Error('No books found');
      }
  
      return { womenAndGirlsImageBookLinks, womenAndGirlsBookLinks  };
    } catch (error) {
      throw new Response('Failed to load link entries', { status: 500 });
    }
  };   


const WomenGirlsPage:React.FC = () => {
    
  const {authorName} = useAuthorContext();

  useEffect(() => {
   document.title = `Women and Girls - ${authorName}`;
 }, [authorName]);


  const {womenAndGirlsImageBookLinks, womenAndGirlsBookLinks } = useLoaderData() as {womenAndGirlsImageBookLinks:ImageBookLink[],
    womenAndGirlsBookLinks:BookLink[]
  };

  console.log(womenAndGirlsImageBookLinks);
  console.log(womenAndGirlsBookLinks);

      
      return (
       <section>
    <div className='md:w-[85%] mx-auto px-4 md:px-6 py-8'>
         
          <div>
            <WritingsComponent booksData={womenAndGirlsImageBookLinks} title={'Women and Girls'}  />
          </div>
        </div>
       </section>
      )
}

export default WomenGirlsPage;