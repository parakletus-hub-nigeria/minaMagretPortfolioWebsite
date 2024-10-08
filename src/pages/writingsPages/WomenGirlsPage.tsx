import React, { useEffect } from 'react';
import WritingsComponent from '../../components/WritingsComponent';
import { useQuery } from '@tanstack/react-query';
import { fetchWomenAndGirlsImageBookLinks, fetchWomenAndGirlsBookLinks} from '../../../sanityApiClient/useSanityClient';
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

interface WomenAndGirlsData {
  womenAndGirlsImageBookLinks: ImageBookLink[];
  womenAndGirlsBookLinks: BookLink[];
}

const fetchWomenAndGirlsData = async (): Promise<WomenAndGirlsData> => {
  const [imageLinks, bookLinks] = await Promise.all([
    fetchWomenAndGirlsImageBookLinks(),
    fetchWomenAndGirlsBookLinks()
  ]);

  if (!imageLinks.length || !bookLinks.length) {
    throw new Error('No books found');
  }

  return { womenAndGirlsImageBookLinks: imageLinks, womenAndGirlsBookLinks: bookLinks };
};

const WomenGirlsPage: React.FC = () => {
  const { authorName } = useAuthorContext();

  useEffect(() => {
    document.title = `Women and Girls - ${authorName}`;
  }, [authorName]);

  const { data } = useQuery<WomenAndGirlsData>({
    queryKey: ['womenAndGirlsData'],
    queryFn: fetchWomenAndGirlsData,
  });

 

  const { womenAndGirlsImageBookLinks, womenAndGirlsBookLinks } = data!;

  return (
    <section>
      <div className='md:w-[85%] mx-auto px-4 md:px-6 py-8'>
        <div>
          <WritingsComponent 
            booksData={womenAndGirlsImageBookLinks} 
            linksData={womenAndGirlsBookLinks[0].items} 
            title={'Women and Girls'} 
          />
        </div>
      </div>
    </section>
  );
}

export default WomenGirlsPage;
