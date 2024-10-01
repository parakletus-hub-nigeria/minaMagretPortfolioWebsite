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
      <div className='flex montserrat h-screen w-screen relative'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `url(${backgroundImage[0]?.image?.asset?.url})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className='flex justify-center items-center h-full'>
            <picture className='md:basis-1/3'>
              <img
                src={homePageHeroImage[0]?.image?.asset?.url}
                alt="Image of a black woman"
                className='w-screen h-screen md:w-full md:h-full'
              />
            </picture>

            <div className='absolute bottom-[20%] left-4 md:-left-0 md:bottom-0 md:basis-2/3 md:relative md:h-full flex justify-center items-center'>
              <span className='flex relative flex-col items-start justify-start gap-12 md:-left-20'>
                <h2 className='font-normal text-white text-4xl'>Meet Mina Margaret Ogbanga, PhD</h2>
                <Link
                  to={`/about/profile`}
                  className='font-bold text-white text-2xl flex items-center capitalize bg-[#49A3AC] py-3 px-8 rounded-md w-fit'
                >
                  <p>dive in</p>
                  <MdOutlineKeyboardArrowRight />
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
