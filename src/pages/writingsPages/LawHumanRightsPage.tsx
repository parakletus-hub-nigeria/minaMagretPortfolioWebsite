import React, {useEffect} from 'react';
import WritingsComponent from '../../components/WritingsComponent';
import { LoaderFunction, useLoaderData } from 'react-router';
import { fetchLawAndHumanRightsBookLinks, fetchLawAndHumanRightsImageBookLinks } from '../../../sanityApiClient/useSanityClient';
import { useAuthorContext } from '../../hooks/AuthorContext';



 interface ImageBookLink {
  title: string;
  image: {
    asset: {
      url: string;
      _id: string;
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




export const lawAndHumanRightsPageLoader: LoaderFunction = async () => {
  try {
    const lawsAndHumanRightsImageBookLinks = await fetchLawAndHumanRightsImageBookLinks();
    const lawsAndHumanRightsBookLinks = await fetchLawAndHumanRightsBookLinks();

    
    if (!lawsAndHumanRightsImageBookLinks || lawsAndHumanRightsImageBookLinks.length === 0) {
      throw new Error('No books found');
    }

    
    if (!lawsAndHumanRightsBookLinks || lawsAndHumanRightsBookLinks.length === 0) {
      throw new Error('No books found');
    }

    return { lawsAndHumanRightsImageBookLinks, lawsAndHumanRightsBookLinks  };
  } catch (error) {
    throw new Response('Failed to load link entries', { status: 500 });
  }
};

const LawHumanRightsPage:React.FC = () => {


  const {authorName} = useAuthorContext();

  useEffect(() => {
   document.title = `Laws And Human Rights - ${authorName}`;
 }, [authorName]);



  const {lawsAndHumanRightsImageBookLinks, lawsAndHumanRightsBookLinks} = useLoaderData() as {lawsAndHumanRightsImageBookLinks:ImageBookLink[],
    lawsAndHumanRightsBookLinks:BookLink[]
  };

 

  
  return (
   <section>
    <div className='md:w-[85%] mx-auto px-4 md:px-6 py-8'>
      
      <div>
        <WritingsComponent booksData={lawsAndHumanRightsImageBookLinks} linksData={lawsAndHumanRightsBookLinks[0].items} title={'law and human rights'}  />
      </div>
    </div>
   </section>
  )
}

export default LawHumanRightsPage;
