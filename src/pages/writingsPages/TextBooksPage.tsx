import React, { useEffect } from 'react';
import WritingsComponent from '../../components/WritingsComponent';
import { useQuery } from '@tanstack/react-query'; 
import { fetchTextBooksImageWritingsLinks, fetchTextBooksWritingsLinks } from '../../../sanityApiClient/useSanityClient';
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

interface TextBooksData {
  TextBooksImageWritingsData: ImageBookLink[]; 
  TextBooksWritingsData: BookLink[];
}

const fetchPeaceAndSecurityData = async (): Promise<TextBooksData> => {
  const TextBooksImageWritingsData = await fetchTextBooksImageWritingsLinks();
  const TextBooksWritingsData = await fetchTextBooksWritingsLinks();
 console.log(TextBooksImageWritingsData);
 console.log(TextBooksWritingsData);
  return { TextBooksImageWritingsData, TextBooksWritingsData };
};

const TextBooksPage: React.FC = () => {
  const { authorName } = useAuthorContext();

  useEffect(() => {
    document.title = `Textbooks - ${authorName}`;
  }, [authorName]);

  const { data } = useQuery<TextBooksData>({
    queryKey: ['peaceAndSecurityData'], 
    queryFn: fetchPeaceAndSecurityData, 
  });

  

  return (
    <section>
      <div className='md:w-[85%] mx-auto px-4 md:px-6 py-8'>
        <div>
          {data && (
            <WritingsComponent
              booksData={data?.TextBooksImageWritingsData} 
              linksData={data?.TextBooksWritingsData[0].items}
              title={'Textbooks'}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default TextBooksPage;
