import React, {useEffect} from 'react';
import { Link, useLoaderData, LoaderFunction } from 'react-router-dom';
import '../assets/styles/App.css';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { fetchBackgroundImage, fetchHomePageHeroImage } from '../../sanityApiClient/useSanityClient';
import { useAuthorContext } from '../hooks/AuthorContext';



interface ImageAsset {
  _id: string;
  url: string;
}

interface Image {
  asset: ImageAsset;
}

interface BackgroundImage {
  image: Image;
}

interface HomePageHeroImage {
  image: Image;
}

interface HomePageLoaderData {
  backgroundImage: BackgroundImage[];
  homePageHeroImage: HomePageHeroImage[];
  
}

export const HomePageLoader: LoaderFunction = async () => {
  try {
    const backgroundImage = await fetchBackgroundImage();
    const homePageHeroImage = await fetchHomePageHeroImage();
  
 

    if (!backgroundImage || backgroundImage.length === 0) {
      throw new Error('Background image not found');
    }

    if (!homePageHeroImage || homePageHeroImage.length === 0) {
      throw new Error('Hero image not found');
    }


    return { backgroundImage, homePageHeroImage};
  } catch (error) {
    throw new Response('Failed to load one or more images', { status: 500 });
  }
};


const HomePage:React.FC = () => {

  const { backgroundImage, homePageHeroImage } = useLoaderData() as HomePageLoaderData;
  const {authorName} = useAuthorContext();

  

  useEffect(() => {
     document.title = `Homepage - ${authorName}`;
   }, [authorName]);

 
  
return (
  <section>
  <div className='flex flex-col montserrat min-h-screen w-screen relative overflow-hidden'>
  <div className='relative h-screen w-screen overflow-hidden bg-[#111]'>
  {/* Blurred Background Image */}
  <div
    className='absolute inset-0 bg-cover bg-center bg-no-repeat'
    style={{
      backgroundImage: `url(${backgroundImage[0]?.image?.asset?.url})`,
      filter: 'blur(8px)',
      zIndex: 0, 
      height: '100%', 
      width: '100%',
    }}
  />

  {/* Content Container */}
  <div className='flex flex-col md:flex-row justify-center items-center h-full relative z-10'>
    <picture className='w-full h-full md:w-1/2'>
      <img
        src={homePageHeroImage[0]?.image?.asset?.url}
        alt="Image of a black woman"
        className='w-full h-full object-cover'
      />
    </picture>

    <div className='absolute bottom-[35%] md:bottom-0 md:left-4 md:relative md:h-full flex justify-center items-center w-full md:w-1/2'>
      <div className='flex flex-col items-center md:items-start text-center md:text-left gap-6 p-4 md:p-8 playfair'>
        <h2 className='text-white text-3xl md:text-4xl lg:text-5xl font-semibold leading-10'>
          Meet {authorName}
        </h2>
        <Link
          to={`/about/profile`}
          className='font-bold text-white text-lg md:text-xl flex items-center bg-[#49A3AC] py-3 px-6 rounded-md hover:animate-bounce'
        >
          <p>Dive In</p>
          <MdOutlineKeyboardArrowRight className='ml-2' />
        </Link>
      </div>
    </div>
  </div>
</div>

  </div>
</section>

)
};

export default HomePage;
