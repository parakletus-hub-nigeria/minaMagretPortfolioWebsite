import React, { useEffect } from 'react';
import WritingsComponent from '../../components/WritingsComponent';
import { useQuery } from '@tanstack/react-query'; // Import useQuery
import { fetchPeaceAndSecurityBookLinks, fetchPeaceAndSecurityImageBookLinks } from '../../../sanityApiClient/useSanityClient';
import { useAuthorContext } from '../../hooks/AuthorContext';

interface ImageBookLink {
  title: string;
  image: {
    asset: {
      _id: string;
    };
  };
  url: string;
}

interface BookLink {
  items: {
    title: string;
    url: string;  
  }[];
}


const fetchPeaceAndSecurityData = async () => {
  const [imageLinks, bookLinks] = await Promise.all([
    fetchPeaceAndSecurityImageBookLinks(),
    fetchPeaceAndSecurityBookLinks(),
  ]);

  if (!imageLinks || imageLinks.length === 0 || !bookLinks || bookLinks.length === 0) {
    throw new Error('No books found');
  }

  return { peaceAndSecurityImageBookLinks: imageLinks, peaceAndSecurityBookLinks: bookLinks };
};

const PeaceAndSecurityPage: React.FC = () => {
  const { authorName } = useAuthorContext();

  useEffect(() => {
    document.title = `Peace And Security - ${authorName}`;
  }, [authorName]);


  const { data } = useQuery({
    queryKey: ['peaceAndSecurityData'], 
    queryFn: fetchPeaceAndSecurityData, 
  });

 

  const { peaceAndSecurityImageBookLinks, peaceAndSecurityBookLinks } = data as {
    peaceAndSecurityImageBookLinks: ImageBookLink[];
    peaceAndSecurityBookLinks: BookLink[];
  };

  return (
    <section>
      <div className='md:w-[85%] mx-auto px-4 md:px-6 py-8'>
        <div>
          <WritingsComponent
            booksData={peaceAndSecurityImageBookLinks}
            linksData={peaceAndSecurityBookLinks[0].items}
            title={'Peace and Security'}
          />
        </div>
      </div>
    </section>
  );
};

export default PeaceAndSecurityPage;
