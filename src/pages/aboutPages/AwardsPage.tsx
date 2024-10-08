import React, { useEffect, useState } from 'react'; 
import HonorsComponent from '../../components/HonorsComponent';
import { LoaderFunction, useLoaderData } from 'react-router';
import { fetchAwardsPageInput, fetchAwardsPageHeroImage } from '../../../sanityApiClient/useSanityClient';
import { useAuthorContext } from '../../hooks/AuthorContext';
import WholePageSpinner from '../../components/WholePageSpinner';
import { urlFor } from '../../../sanityApiClient/sanityClient';

interface ImageAsset {
  _id: string;
  url: string;
}

interface AwardsPageInputData {
  _id: string;
  placeOfStudy: string;
  details: string[];
}

interface AwardsPageHeroImageData {
  image: {
    asset: ImageAsset;
  };
}

interface AwardsPageData {
  awardsPageInput: AwardsPageInputData[];
  awardsPageHeroImage: AwardsPageHeroImageData[];
}

export const awardsPageLoader: LoaderFunction = async () => {
  try {
    const awardsPageInput = await fetchAwardsPageInput();
    const awardsPageHeroImage = await fetchAwardsPageHeroImage();

    return {
      awardsPageInput,
      awardsPageHeroImage,
    };
  } catch (error) {
    console.error('Failed to load awards page data:', error);
    throw new Response('Failed to load awards page data', { status: 500 });
  }
};

const AwardsPage: React.FC = () => {
  const { awardsPageInput, awardsPageHeroImage } = useLoaderData() as AwardsPageData;
  const { authorName } = useAuthorContext();
  
  const [awardsPageHeroImageUrl, setAwardsPageHeroImageUrl] = useState('');
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    document.title = `Awards And Scholarships - ${authorName}`;

    if (awardsPageHeroImage.length > 0) {
      const img = new Image();
      const imgUrl = urlFor(awardsPageHeroImage[0].image.asset._id)  
        .width(1920)
        .quality(80)
        .format('webp')
        .url();

      img.src = imgUrl;

      img.onload = () => {
        setAwardsPageHeroImageUrl(imgUrl);
        setIsImageLoaded(true);
      };

    
      return () => {
        img.onload = null;
      };
    }
  }, [authorName, awardsPageHeroImage]);

  if (!isImageLoaded) {
    return (
      <div className='z-[999]'>
        <WholePageSpinner />
      </div>
    );
  }

  return (
    <section>
      <div className='md:w-[85%] mx-auto px-4 md:px-6 py-8'>
        <HonorsComponent
          title={'Awards and Recognitions'}
          imgUrl={awardsPageHeroImageUrl}
          listData={awardsPageInput[0].details}
        />
      </div>
    </section>
  );
}

export default AwardsPage;
