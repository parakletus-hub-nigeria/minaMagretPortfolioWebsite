import React, {useEffect} from 'react';
import HonorsComponent from '../../components/HonorsComponent';
import { LoaderFunction, useLoaderData } from 'react-router';
import { fetchAwardsPageInput, fetchAwardsPageHeroImage } from '../../../sanityApiClient/useSanityClient';
import { useAuthorContext } from '../../hooks/AuthorContext';


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
    console.error('Failed to load education page data:', error);
    throw new Response('Failed to load education page data', { status: 500 });
  }
};


const AwardsPage:React.FC = () => {
       const {  awardsPageInput,awardsPageHeroImage } = useLoaderData() as AwardsPageData;
      
       const {authorName} = useAuthorContext();

        useEffect(() => {
         document.title = `Awards And Schloarships - ${authorName}`;
       }, [authorName]);


        
  
      return (
        <section>
           <div className='md:w-[85%] mx-auto px-4 md:px-6 py-8'>
      
            <HonorsComponent title={'awards and recognitions'} imgUrl={awardsPageHeroImage[0].image.asset.url} listData={awardsPageInput[0].details}/>
           </div>
            
        </section>
      );
}

export default AwardsPage;