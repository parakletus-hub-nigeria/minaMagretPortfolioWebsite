import React, { useEffect } from 'react';
import WritingsComponent from '../../components/WritingsComponent';
import { useQuery } from '@tanstack/react-query';
import { useAuthorContext } from '../../hooks/AuthorContext';
import { fetchManualsImageWritingsLinks, fetchManualsWritingsLinks } from '../../../sanityApiClient/useSanityClient';

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

interface ManualsData {
  manualsImageWritingsData: ImageBookLink[];
  manualsWritingsData: BookLink[];
}

const fetchManualsData = async (): Promise<ManualsData> => {
 const manualsImageWritingsData = await fetchManualsImageWritingsLinks();
 const manualsWritingsData = await fetchManualsWritingsLinks();
 
  return { manualsImageWritingsData, manualsWritingsData};
};

const ManualsPage: React.FC = () => {
  const { authorName } = useAuthorContext();

  useEffect(() => {
    document.title = `Manuals - ${authorName}`;
  }, [authorName]);

  const { data } = useQuery<ManualsData>({
    queryKey: ['manualsData'],
    queryFn: fetchManualsData,
  });


  return (
    <section>
      <div className='md:w-[85%] mx-auto px-4 md:px-6 py-8'>
        <div>
          {
            data && (
              <WritingsComponent 
                booksData={data?.manualsImageWritingsData}
                linksData={data?.manualsWritingsData?.[0]?.items || []} 
                title={'Manuals'} 
                />

            )

          }
        </div>
      </div>
    </section>
  );
}

export default ManualsPage;
