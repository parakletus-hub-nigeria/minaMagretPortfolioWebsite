import React, { useEffect } from 'react';
import WritingsComponent from '../../components/WritingsComponent';
import { useQuery } from '@tanstack/react-query'; // Import useQuery
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
  items: {
    title: string;
    url: string;  
  }[];
}

// Function to fetch the required data
const fetchLawAndHumanRightsData = async () => {
  const [imageLinks, bookLinks] = await Promise.all([
    fetchLawAndHumanRightsImageBookLinks(),
    fetchLawAndHumanRightsBookLinks(),
  ]);

  if (!imageLinks || imageLinks.length === 0 || !bookLinks || bookLinks.length === 0) {
    throw new Error('No books found');
  }

  return { lawsAndHumanRightsImageBookLinks: imageLinks, lawsAndHumanRightsBookLinks: bookLinks };
};

const LawHumanRightsPage: React.FC = () => {
  const { authorName } = useAuthorContext();

  useEffect(() => {
    document.title = `Laws And Human Rights - ${authorName}`;
  }, [authorName]);

  const { data } = useQuery({
    queryKey: ['lawAndHumanRightsData'], 
    queryFn: fetchLawAndHumanRightsData,
  });

  
  const { lawsAndHumanRightsImageBookLinks, lawsAndHumanRightsBookLinks } = data as {
    lawsAndHumanRightsImageBookLinks: ImageBookLink[];
    lawsAndHumanRightsBookLinks: BookLink[];
  };

  return (
    <section>
      <div className='md:w-[85%] mx-auto px-4 md:px-6 py-8'>
        <div>
          <WritingsComponent
            booksData={lawsAndHumanRightsImageBookLinks}
            linksData={lawsAndHumanRightsBookLinks[0].items}
            title={'Law and Human Rights'}
          />
        </div>
      </div>
    </section>
  );
};

export default LawHumanRightsPage;
