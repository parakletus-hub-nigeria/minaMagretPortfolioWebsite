import React, { useState, useEffect } from "react";
import DropdownComponent from "../../components/DropdownComponent";
import { LoaderFunction, useLoaderData } from "react-router";
import { fetchEducationPageHeroImage, fetchEducationPageInput } from "../../../sanityApiClient/useSanityClient";
import { useAuthorContext } from "../../hooks/AuthorContext";
import WholePageSpinner from "../../components/WholePageSpinner";
import { urlFor } from "../../../sanityApiClient/sanityClient";

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

export const EducationPageLoader: LoaderFunction = async () => {
  try {
    const educationPageInput = await fetchEducationPageInput();
    const educationPageHeroImage = await fetchEducationPageHeroImage();

    return {
      educationPageInput,
      educationPageHeroImage,
    };
  } catch (error) {
    console.error('Failed to load education page data:', error);
    throw new Response('Failed to load education page data', { status: 500 });
  }
};

const EducationPage: React.FC = () => {
  const { educationPageInput, educationPageHeroImage } = useLoaderData() as EducationPageData;

  const [activeDropdowns, setActiveDropdowns] = useState<boolean[]>(new Array(educationPageInput.length).fill(false));
  const [educationPageHeroImageUrl, setEducationPageHeroImageUrl] = useState('');
  const [isImageLoaded, setIsImageLoaded] = useState(false); 

  const handleToggle = (index: number) => {
    setActiveDropdowns((prev) =>
      prev.map((isActive, i) => (i === index ? !isActive : isActive))
    );
  };

  const { authorName } = useAuthorContext();

  useEffect(() => {
    document.title = `Education - ${authorName}`;

    const img = new Image();
    img.src = urlFor(educationPageHeroImage[0].image.asset.url).width(1920).quality(80).format('webp').url(); 
    img.onload = () => {
      setEducationPageHeroImageUrl(img.src);
      setIsImageLoaded(true);
    };

    return () => {
      img.onload = null; // Cleanup the onload function
    };
  }, [authorName, educationPageHeroImage]);


  if (!isImageLoaded) {
    <div className='z-[999]'>
        <WholePageSpinner/>
      </div>
  }

  return (
    <section>
      <div className="flex flex-col md:flex-row items-start md:w-[85%] mx-auto px-4 md:px-6 py-8 md:py-16">
        <picture className="relative md:sticky md:top-0 md:max-h-[560px]">
          <img
            src={educationPageHeroImageUrl}
            className="w-full h-full md:max-h-[560px] md:max-w-[371px]"
            alt="blackwoman"
          />
        </picture>

        <div className="w-full md:w-3/4 md:ml-8">
          <span className="flex flex-col gap-2 pb-6 capitalize text-left font-bold text-white border-b border-white">
            <h2 className="text-2xl">about me</h2>
            <h1 className="text-4xl">education</h1>
          </span>

          <div className="w-full mt-8 flex flex-col gap-2">
            {educationPageInput.map((item, index) => (
              <DropdownComponent
                key={index}
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
