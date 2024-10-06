import React, { useEffect, useState } from 'react';
import HonorsComponent from '../../components/HonorsComponent';
import { LoaderFunction, useLoaderData } from 'react-router';
import { fetchFellowshipsAndRecognitionsPageInput, fetchFellowshipsAndRecognitionsPageHeroImage } from '../../../sanityApiClient/useSanityClient';
import { useAuthorContext } from '../../hooks/AuthorContext';
import WholePageSpinner from '../../components/WholePageSpinner';
import { urlFor } from '../../../sanityApiClient/sanityClient';

interface ImageAsset {
  _id: string;
  url: string;
}

interface FellowshipsAndSchloarshipsPageInputData {
  _id: string;
  placeOfStudy: string;
  details: string[];
}

interface FellowshipsAndSchloarshipsPageHeroImageData {
  image: {
    asset: ImageAsset;
  };
}

interface FellowshipsAndSchloarshipsPageData {
  fellowshipsAndSchloarshipsInput: FellowshipsAndSchloarshipsPageInputData[];
  fellowshipsAndSchloarshipsHeroImage: FellowshipsAndSchloarshipsPageHeroImageData[];
}

// Loader function for fetching data
export const fellowshipsAndSchloarshipPageLoader: LoaderFunction = async () => {
  try {
    const fellowshipsAndSchloarshipsInput = await fetchFellowshipsAndRecognitionsPageInput();
    const fellowshipsAndSchloarshipsHeroImage = await fetchFellowshipsAndRecognitionsPageHeroImage();

    return {
      fellowshipsAndSchloarshipsInput,
      fellowshipsAndSchloarshipsHeroImage,
    };
  } catch (error) {
    console.error('Failed to load fellowships and scholarships page data:', error);
    throw new Response('Failed to load fellowships and scholarships page data', { status: 500 });
  }
};

const FellowShipSchloarshipPage: React.FC = () => {
  const { authorName } = useAuthorContext();
  const { fellowshipsAndSchloarshipsInput, fellowshipsAndSchloarshipsHeroImage } = useLoaderData() as FellowshipsAndSchloarshipsPageData;
  
  const [fellowshipsHeroImageUrl, setFellowshipsHeroImageUrl] = useState('');
  const [isImageLoaded, setIsImageLoaded] = useState(false); // State for image loading

  useEffect(() => {
    document.title = `Fellowships And Scholarships - ${authorName}`;

    const img = new Image();
    img.src = urlFor(fellowshipsAndSchloarshipsHeroImage[0].image.asset._id)
      .width(1920)
      .quality(80)
      .format('webp')
      .url();

   
    img.onload = () => {
      setFellowshipsHeroImageUrl(img.src);
      setIsImageLoaded(true);
    };

    return () => {
      img.onload = null; 
    };
  }, [authorName, fellowshipsAndSchloarshipsHeroImage]);

  if (!isImageLoaded) {
    <div className='z-[999]'>
        <WholePageSpinner/>
      </div>
  }

  return (
    <section>
      <div className='md:w-[85%] mx-auto px-4 md:px-6 py-8'>
        <HonorsComponent
          title={'Fellowships and Scholarships'}
          imgUrl={fellowshipsHeroImageUrl}
          listData={fellowshipsAndSchloarshipsInput[0].details}
        />
      </div>
    </section>
  );
}

export default FellowShipSchloarshipPage;
