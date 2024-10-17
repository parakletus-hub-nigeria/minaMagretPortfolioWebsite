import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DropdownComponent from '../../components/DropdownComponent';
import { fetchEducationPageHeroImage, fetchEducationPageInput } from '../../../sanityApiClient/useSanityClient';
import { useAuthorContext } from '../../hooks/AuthorContext';
import WholePageSpinner from '../../components/WholePageSpinner';
import { urlFor } from '../../../sanityApiClient/sanityClient';

// Interface for the asset (image) structure
interface ImageAsset {
  _id: string;
  url: string;
}

// Interface for Education Page Input
interface EducationPageInputData {
  _id: string;
  placeOfStudy: string;
  details: string[]; // Adjust as necessary
}

// Interface for the Hero Image
interface EducationPageHeroImageData {
  image: {
    asset: ImageAsset;
  };
}

// Combined type for both data types
interface EducationPageData {
  educationPageInput: EducationPageInputData[];
  educationPageHeroImage: EducationPageHeroImageData[];
}

const fetchEducationPageData = async (): Promise<EducationPageData> => {
  const educationPageInput = await fetchEducationPageInput();
  const educationPageHeroImage = await fetchEducationPageHeroImage();

  if (!educationPageInput || educationPageInput.length === 0) {
    throw new Error('Education Page input not found');
  }
  if (!educationPageHeroImage || educationPageHeroImage.length === 0) {
    throw new Error('Hero image not found');
  }

  return { educationPageInput, educationPageHeroImage };
};


const EducationPage: React.FC = () => {
  const { authorName } = useAuthorContext();
  const { data, isLoading } = useQuery<EducationPageData>({
    queryKey: ['educationPageData'],
    queryFn: fetchEducationPageData,
  });

  const [activeDropdowns, setActiveDropdowns] = useState<boolean[]>([]);
  const [educationPageHeroImageUrl, setEducationPageHeroImageUrl] = useState('');
  const [isImageLoaded, setIsImageLoaded] = useState(false);


  useEffect(() => {
    if (data && data.educationPageInput) {
      setActiveDropdowns(new Array(data.educationPageInput.length).fill(false));
    }
  }, [data]);

  const handleToggle = (index: number) => {
    setActiveDropdowns((prev) =>
      prev.map((isActive, i) => (i === index ? !isActive : isActive))
    );
  };

  useEffect(() => {
    document.title = `Education - ${authorName}`;

    if (data && data.educationPageHeroImage) {
      const imgUrl = urlFor(data.educationPageHeroImage[0].image.asset._id)
        .width(1920)
        .quality(80)
        .format('webp')
        .url();

      const img = new Image();
      img.src = imgUrl;

      img.onload = () => {
        setEducationPageHeroImageUrl(img.src);
        setIsImageLoaded(true);
      };
    }



  }, [data, authorName]);


  if (isLoading || !isImageLoaded) {
    return <WholePageSpinner />;
  }

  return (
    <section>
      <div className="flex flex-col md:flex-row items-start md:w-[85%] mx-auto px-4 md:px-6 py-8 md:py-16">
        <picture className="relative md:sticky md:top-0 md:max-h-[560px]">
          <img
            src={educationPageHeroImageUrl}
            className="w-full h-full md:max-h-[560px] md:max-w-[371px]"
            alt={`Portrait of ${authorName}`}
          />
        </picture>

        <div className="w-full md:w-3/4 md:ml-8">
          <span className="flex flex-col gap-2 pb-6 capitalize text-left font-bold text-white border-b border-white">
            <h2 className="text-2xl">About Me</h2>
            <h1 className="text-4xl">Education</h1>
          </span>

          <div className="w-full mt-8 flex flex-col gap-2">
            {data?.educationPageInput.map((item, index) => (
              <DropdownComponent
                key={item._id}
                title={item.placeOfStudy}
                content={item.details}
                isActive={activeDropdowns[index]}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationPage;
