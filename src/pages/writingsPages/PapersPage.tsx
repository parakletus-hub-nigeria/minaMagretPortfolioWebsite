import React, { useEffect } from 'react';
import WritingsComponent from '../../components/WritingsComponent';
import { useQuery } from '@tanstack/react-query';
import { useAuthorContext } from '../../hooks/AuthorContext';
import { fetchPapersImageWritingsLinks, fetchPapersWritingsLinks } from '../../../sanityApiClient/useSanityClient';

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

interface PapersPageData {
  papersImageWritingsData: ImageBookLink[];
  papersWritingsData: BookLink[]; // Changed to reflect a single object, not an array
}

const fetchPapersPageData = async (): Promise<PapersPageData> => {
  const papersImageWritingsData = await fetchPapersImageWritingsLinks();
  const papersWritingsData = await fetchPapersWritingsLinks();

  console.log("Fetched Image Writings Data:", papersImageWritingsData); 
  console.log("Fetched Writings Links Data:", papersWritingsData); 
  return { papersImageWritingsData, papersWritingsData };
};

const PapersPage: React.FC = () => {
  const { authorName } = useAuthorContext();

  useEffect(() => {
    document.title = `Papers - ${authorName}`;
  }, [authorName]);

  const { data} = useQuery<PapersPageData>({
    queryKey: ['papersData'],
    queryFn: fetchPapersPageData,
  });


  console.log("Data from useQuery:", data);

  return (
    <section>
      <div className="md:w-[85%] mx-auto px-4 md:px-6 py-8">
        <div>
          {data && (
            <WritingsComponent
              booksData={data?.papersImageWritingsData}
              linksData={data?.papersWritingsData[0].items} 
              title="Papers"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default PapersPage;

