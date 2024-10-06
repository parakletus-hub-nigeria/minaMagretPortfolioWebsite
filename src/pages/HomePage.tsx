import React, { useEffect, useState } from 'react';
import { Link, useLoaderData, LoaderFunction } from 'react-router-dom';
import '../assets/styles/App.css';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { fetchBackgroundImage, fetchHomePageHeroImage } from '../../sanityApiClient/useSanityClient';
import { useAuthorContext } from '../hooks/AuthorContext';
import { urlFor } from '../../sanityApiClient/sanityClient';
import WholePageSpinner from '../components/WholePageSpinner';

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

// Loader for fetching homepage images
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

    return { backgroundImage, homePageHeroImage };
  } catch (error) {
    throw new Response('Failed to load one or more images', { status: 500 });
  }
};

const HomePage: React.FC = () => {
  const { backgroundImage, homePageHeroImage } = useLoaderData() as HomePageLoaderData;
  const { authorName } = useAuthorContext();

  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  const [backgroundImgUrl, setBackgroundImgUrl] = useState('');
  const [heroImgUrl, setHeroImgUrl] = useState('');

  useEffect(() => {
    document.title = `Homepage - ${authorName}`; // Dynamic title for better SEO

    const preloadImages = (srcArray: string[], callback: () => void) => {
      let loadedCount = 0;
      srcArray.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedCount += 1;
          if (loadedCount === srcArray.length) {
            callback();
          }
        };
      });
    };

  
    const bgUrl = urlFor(backgroundImage[0]?.image?.asset?._id).width(1920).quality(80).format('webp').url();
    const heroUrl = urlFor(homePageHeroImage[0]?.image?.asset?._id).width(1920).quality(80).format('webp').url();


    setBackgroundImgUrl(bgUrl);
    setHeroImgUrl(heroUrl);

  
    preloadImages([bgUrl, heroUrl], () => {
      setIsImagesLoaded(true);
    });
  }, [backgroundImage, homePageHeroImage, authorName]);

  if (!isImagesLoaded) {
    return (
     <WholePageSpinner/>
    );
  }

  return (
    <section>
      <div className='flex flex-col montserrat min-h-screen w-screen relative overflow-hidden'>
        <div className='relative h-screen w-screen overflow-hidden bg-[#111]'>
          <div
            className='fixed inset-0 bg-cover bg-center bg-no-repeat'
            style={{
              backgroundImage: `url(${backgroundImgUrl})`,
              filter: 'blur(8px)',
              zIndex: 0,
              minHeight: '100vh',
              width: '100%',
            }}
            aria-hidden="true"
            role="presentation"
          />

          <div className='flex flex-col md:flex-row justify-center items-center h-full relative z-10'>
            <picture className='w-full h-full md:w-1/2'>
              <img
                srcSet={`
                  ${heroImgUrl} 1920w,
                  ${urlFor(homePageHeroImage[0]?.image?.asset?._id).width(768).quality(80).format('webp').url()} 768w,
                  ${urlFor(homePageHeroImage[0]?.image?.asset?._id).width(480).quality(80).format('webp').url()} 480w
                `}
                sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, 1920px"
                src={heroImgUrl}
                alt={`portrait of ${authorName}`}
                className='w-full h-full object-cover'
                loading="lazy"
              />
            </picture>

            <div className='absolute bottom-[35%] md:bottom-0 md:left-4 md:relative md:h-full flex justify-center items-center w-full md:w-1/2'>
              <div className='flex flex-col items-center md:items-start text-center md:text-left gap-6 p-4 md:p-8 playfair'>
                <h2 className='text-white text-3xl md:text-4xl lg:text-5xl font-semibold leading-10'>
                  Meet {authorName}
                </h2>
                <Link
                  to={`/about/profile`}
                  className='font-bold text-white text-lg md:text-xl flex items-center bg-[#49A3AC] py-3 px-6 rounded-md hover:animate-pulse'
                  aria-label="Learn more about the author"
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
  );
};

export default HomePage;
