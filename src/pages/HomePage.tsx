import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/App.css';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useQuery } from '@tanstack/react-query';
import { fetchBackgroundImage, fetchHomePageHeroImage } from '../../sanityApiClient/useSanityClient';
import { useAuthorContext } from '../hooks/AuthorContext';
import { urlFor } from '../../sanityApiClient/sanityClient';
import WholePageSpinner from '../components/WholePageSpinner';

const fetchImages = async () => {
  const [backgroundImage, homePageHeroImage] = await Promise.all([
    fetchBackgroundImage(),
    fetchHomePageHeroImage(),
  ]);

  if (!backgroundImage || backgroundImage.length === 0) {
    throw new Error('Background image not found');
  }
  if (!homePageHeroImage || homePageHeroImage.length === 0) {
    throw new Error('Hero image not found');
  }

  return { backgroundImage, homePageHeroImage };
};

const HomePage: React.FC = () => {
  const { authorName } = useAuthorContext();

  const { data, isLoading } = useQuery({
    queryKey: ['images'],
    queryFn: fetchImages,
  });

  const [heroLoaded, setHeroLoaded] = useState(false);

  const bgAssetId = data?.backgroundImage?.[0]?.image?.asset?._id;
  const heroAssetId = data?.homePageHeroImage?.[0]?.image?.asset?._id;

  const backgroundImgUrl = bgAssetId
    ? urlFor(bgAssetId).width(1920).quality(80).format('webp').url()
    : '';

  const heroImgUrl = heroAssetId
    ? urlFor(heroAssetId).width(1920).quality(85).format('webp').url()
    : '';

  const heroImgTablet = heroAssetId
    ? urlFor(heroAssetId).width(768).quality(80).format('webp').url()
    : '';

  const heroImgMobile = heroAssetId
    ? urlFor(heroAssetId).width(480).quality(80).format('webp').url()
    : '';

  useEffect(() => {
    if (authorName) {
      document.title = `Home - ${authorName}`;
    }
  }, [authorName]);

  if (isLoading) {
    return <WholePageSpinner />;
  }

  const displayName = authorName || 'Professor Mina Margaret Ogbanga';

  return (
    <section>
      <div className='flex flex-col montserrat min-h-screen w-screen relative overflow-hidden bg-[#0c121e]'>
        <div className='relative h-screen w-screen overflow-hidden'>
          {backgroundImgUrl && (
            <div
              className='fixed inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000'
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
          )}
          <div className='fixed inset-0 bg-black/60 z-[1]' aria-hidden="true" />

          <div className='flex flex-col md:flex-row justify-center items-center h-full relative z-10'>
            <picture className='w-full h-full md:w-1/2 flex items-center justify-center overflow-hidden'>
              {heroImgUrl && (
                <img
                  srcSet={`${heroImgUrl} 1920w, ${heroImgTablet} 768w, ${heroImgMobile} 480w`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  src={heroImgUrl}
                  alt={`Portrait of ${displayName}`}
                  onLoad={() => setHeroLoaded(true)}
                  className={`w-full h-full object-cover transition-opacity duration-700 ${
                    heroLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading="eager"
                  fetchPriority="high"
                />
              )}
            </picture>

            <div className='absolute bottom-[30%] md:bottom-0 md:left-4 md:relative md:h-full flex justify-center items-center w-full md:w-1/2'>
              <div className='flex flex-col items-center md:items-start text-center md:text-left gap-6 p-4 md:p-8 playfair'>
                <span className='text-xs uppercase tracking-widest text-emerald-400 font-semibold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30'>
                  Official Portfolio
                </span>
                <h2 className='text-gray-100 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-md'>
                  Meet {displayName}
                </h2>
                <p className='text-gray-300 text-sm md:text-base max-w-md font-sans leading-relaxed'>
                  First Professor of Social Work & Environmental Sustainability Globally • Ford Foundation Fellow • Development Activist
                </p>
                <Link
                  to='/about/profile'
                  className='font-bold text-white text-base md:text-lg flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] py-3.5 px-8 rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5'
                  aria-label="Learn more about the author"
                >
                  <span>Explore Profile</span>
                  <MdOutlineKeyboardArrowRight className='text-2xl' />
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
