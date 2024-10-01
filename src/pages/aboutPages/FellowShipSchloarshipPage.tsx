import React, {useEffect} from 'react';
import HonorsComponent from '../../components/HonorsComponent';
import { fetchFellowshipsAndRecognitionsPageHeroImage, fetchFellowshipsAndRecognitionsPageInput } from '../../../sanityApiClient/useSanityClient';
import { LoaderFunction, useLoaderData } from 'react-router';
import { useAuthorContext } from '../../hooks/AuthorContext';


interface ImageAsset {
  _id: string;
  url: string;
}

interface FellowshipsAndSchloarshipsPageInputData {
  _id: string;
  placeOfStudy: string;
  details: string[];
}


interface FellowshipsAndSchloarshipsPageImageData {
  image: {
    asset: ImageAsset;
  };
}

interface FellowshipsAndSchloarshipsPageData {
  fellowshipsAndSchloarshipsInput: FellowshipsAndSchloarshipsPageInputData[];
  fellowshipsAndSchloarshipsHeroImage: FellowshipsAndSchloarshipsPageImageData[];
}


  
export const fellowshipsAndSchloarshipPageLoader: LoaderFunction = async () => {
  try {
    const fellowshipsAndSchloarshipsInput = await fetchFellowshipsAndRecognitionsPageInput();
    const fellowshipsAndSchloarshipsHeroImage = await fetchFellowshipsAndRecognitionsPageHeroImage();

    return {
     fellowshipsAndSchloarshipsInput,
     fellowshipsAndSchloarshipsHeroImage
    };
  } catch (error) {
    console.error('Failed to load awards page data:', error);
    throw new Response('Failed to load awards page data', { status: 500 });
  }
};




const FellowShipSchloarshipPage:React.FC = () => {
    const fellowshipData = [
        "Ford Global Fellowship (2021) by Ford Foundation",
        "Oxford-Commonwealth Scholarship (2021) by the Commonwealth Scholarships Commission (CSC) and the University of Oxford",
        "Developing Solutions Scholarship (2020) by the University of Nottingham, UK",
        "Deutsche Gesellschaft für Internationale Zusammenarbeit (GiZ)’s Masters in Managing Peace and Security in Africa (MPSA) Scholarship, 2018",
        "Mandela Washington Fellowship (2016) by the United States Department of States"
      ];
  
      const {authorName} = useAuthorContext();

        useEffect(() => {
         document.title = `Fellowships And Schloarships - ${authorName}`;
       }, [authorName]);

       const {  fellowshipsAndSchloarshipsInput,fellowshipsAndSchloarshipsHeroImage } = useLoaderData() as FellowshipsAndSchloarshipsPageData;
        

  return (
    <section>
       <div className='md:w-[85%] mx-auto px-4 md:px-6 py-8'>
  
        <HonorsComponent title={'fellowships and schloarships'} imgUrl={fellowshipsAndSchloarshipsHeroImage[0].image.asset.url} listData={fellowshipsAndSchloarshipsInput[0].details}/>
       </div>
        
    </section>
  )
}

export default FellowShipSchloarshipPage;