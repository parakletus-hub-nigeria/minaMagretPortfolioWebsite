import React, { useEffect, useState } from 'react'; 
import HonorsComponent from '../../components/HonorsComponent';
import { useQuery } from '@tanstack/react-query';
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

// Main component
const AwardsPage: React.FC = () => {
  
  const fetchAwardsPageData = async (): Promise<AwardsPageData> => {
    const awardsPageInput = await fetchAwardsPageInput();
    const awardsPageHeroImage = await fetchAwardsPageHeroImage();

    if (!awardsPageInput || awardsPageInput.length === 0) {
      throw new Error('Awards Page input not found');
    }
    if (!awardsPageHeroImage || awardsPageHeroImage.length === 0) {
      throw new Error('Hero image not found');
    }

    return { awardsPageInput, awardsPageHeroImage };
  };

  const { data, isLoading } = useQuery<AwardsPageData>({
    queryKey: ['awardsPageData'],  // Updated the query key to match the correct data
    queryFn: fetchAwardsPageData,
  });

  const { authorName } = useAuthorContext();
  
  const [awardsPageHeroImageUrl, setAwardsPageHeroImageUrl] = useState('');
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    document.title = `Awards And Scholarships - ${authorName}`;

 
    if (data?.awardsPageHeroImage && data.awardsPageHeroImage.length > 0) {
      const img = new Image();
      const imgUrl = urlFor(data.awardsPageHeroImage[0].image.asset._id)
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
  }, [authorName, data]);

  if (isLoading || !isImageLoaded) {
    return <WholePageSpinner />;
  }

  return (
    <section>
      <div className="md:w-[85%] mx-auto px-4 md:px-6 py-8">
       
        {data && (
          <HonorsComponent
            title={'Awards and Recognitions'}
            imgUrl={awardsPageHeroImageUrl}
            listData={data.awardsPageInput[0]?.details} 
          />
        )}
      </div>
    </section>
  );
};

export default AwardsPage;
