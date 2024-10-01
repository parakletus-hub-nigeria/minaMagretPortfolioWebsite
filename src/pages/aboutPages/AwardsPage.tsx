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
    // const fellowshipData = [
    //     "Ford Global Fellowship (2021) by Ford Foundation",
    //     "Oxford-Commonwealth Scholarship (2021) by the Commonwealth Scholarships Commission (CSC) and the University of Oxford",
    //     "Developing Solutions Scholarship (2020) by the University of Nottingham, UK",
    //     "Deutsche Gesellschaft für Internationale Zusammenarbeit (GiZ)’s Masters in Managing Peace and Security in Africa (MPSA) Scholarship, 2018",
    //     "Mandela Washington Fellowship (2016) by the United States Department of States",
    //     "Rhodes Scholarship (2020) by the Rhodes Trust",
    //     "Chevening Scholarship (2019) by the UK Government",
    //     "Gates Cambridge Scholarship (2018) by the Bill and Melinda Gates Foundation",
    //     "Fulbright Foreign Student Program (2017) by the U.S. Department of State",
    //     "Marshall Scholarship (2021) by the UK Government",
    //     "Erasmus Mundus Joint Master Degrees (2019) by the European Union",
    //     "Clarendon Scholarship (2020) by the University of Oxford",
    //     "DAAD Scholarship (2020) by the German Academic Exchange Service",
    //     "Schwarzman Scholars (2021) by Tsinghua University, China",
    //     "Knight-Hennessy Scholars (2020) by Stanford University",
    //     "Australia Awards (2019) by the Australian Government",
    //     "Commonwealth Shared Scholarship (2021) by the UK Foreign, Commonwealth & Development Office",
    //     "Yale World Fellows (2020) by Yale University",
    //     "UNESCO-L’Oréal For Women in Science Awards (2019)",
    //     "UNDP Innovation Challenge Awards (2018)",
    //     "Echoing Green Fellowship (2020)",
    //     "Young Global Leaders (2021) by the World Economic Forum",
    //     "Ashoka Fellowship (2019)",
    //     "Queen Elizabeth Commonwealth Scholarship (2020)",
    //     "Rotary Peace Fellowship (2021) by Rotary International",
    //     "Soros Fellowship for New Americans (2020)",
    //     "Human Frontier Science Program Fellowship (2019)",
    //     "Open Society Fellowship (2020) by Open Society Foundations",
    //     "MacArthur Fellowship (2019) by the MacArthur Foundation",
    //     "Robert Bosch Foundation Fellowship (2021) by Robert Bosch Stiftung",
    //     "The Global Leaders Fellowship (2018) by the University of Oxford and Princeton University",
    //     "WE Empower United Nations SDG Challenge (2020)",
    //     "Amelia Earhart Fellowship (2021) by Zonta International",
    //     "Google PhD Fellowship (2020) by Google Research",
    //     "Marie Skłodowska-Curie Actions Fellowship (2020) by the European Commission",
    //     "P.E.O. International Peace Scholarship (2019)",
    //     "L’Oréal-UNESCO Young Talents Award for Women in Science (2020)",
    //     "AAUW International Fellowship (2019) by the American Association of University Women",
    //     "Harvard University Innovation Lab Challenge Award (2018)",
    //     "Nobel Peace Prize (2021)",
    //     "Green Talents Award (2020) by the German Federal Ministry of Education and Research",
    //     "Obama Foundation Fellowship (2021) by the Obama Foundation",
    //     "LIV Fund (2019) by the Latin American Leadership Academy",
    //     "Borlaug Fellowship Program (2020) by the U.S. Department of Agriculture",
    //     "Zayed Sustainability Prize (2019) by the UAE Government",
    //     "Global Teacher Prize (2021) by the Varkey Foundation",
    //     "World Food Prize (2020)",
    //     "Young Innovators to Watch Award (2019)"
    //   ];

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