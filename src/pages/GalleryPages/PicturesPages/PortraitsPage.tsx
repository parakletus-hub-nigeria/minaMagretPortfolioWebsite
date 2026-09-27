import React, { useEffect } from 'react';
import ImagesComponent from '../../../components/ImagesComponent';
import { useQuery } from '@tanstack/react-query';
import { fetchPortaitPicturesLinks } from '../../../../sanityApiClient/useSanityClient';
import { useAuthorContext } from '../../../hooks/AuthorContext';
import { urlFor } from '../../../../sanityApiClient/sanityClient';

interface ImageLink {
  _id: string;            
  imageTitle: string;     
  description: string;    
  uploadedAt: string;     
  image: {
    asset: {
      _id: string;
    };
  };
}

interface PortraitsPageResponse {
  portraitsPageData: ImageLink[]; 
}

const fetchPortraitsPagedata = async (): Promise<PortraitsPageResponse> => {
  const portraitsPageData = await fetchPortaitPicturesLinks();

  if (!portraitsPageData || portraitsPageData.length === 0) {
    throw new Error('Portraits Page Data Not found');
  }

  return { portraitsPageData };
};

const PortraitsPage: React.FC = () => {
  const { data } = useQuery<PortraitsPageResponse>({
    queryKey: ['portraitsPageResponse'],
    queryFn: fetchPortraitsPagedata,
  });

  const { authorName } = useAuthorContext();

  useEffect(() => {
    document.title = `Field Work Pictures - ${authorName}`;
  }, [authorName]);

  
  if (!data) {
    return null
  }

  const { portraitsPageData } = data;

  const formattedImages = portraitsPageData.map((imageLink) => ({
    url: urlFor(imageLink.image.asset._id)
      .width(1920)
      .quality(80)
      .format('webp')
      .url(),
    _id: imageLink._id,
    title: imageLink.imageTitle,
    description: imageLink.description,
  }));

  return (
    <section>
      <div className='md:w-[95%] mx-auto px-4 md:px-6 py-8'>
        <ImagesComponent images={formattedImages} />
      </div>
    </section>
  );
};

export default PortraitsPage;
