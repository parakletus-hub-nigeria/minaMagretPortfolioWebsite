import React, { useEffect, useState } from 'react';
import { Outlet, LoaderFunction, useLoaderData } from 'react-router-dom';
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import Navbar from '../components/Navbar';
import { fetchBackgroundImage } from '../../sanityApiClient/useSanityClient';
import Footer from '../components/Footer';
import { urlFor } from '../../sanityApiClient/sanityClient'; 

interface BackgroundImageAsset {
  _id: string; 
  url: string;
}

interface BackgroundImage {
  image: {
    asset: BackgroundImageAsset; 
  };
}

interface LayoutLoaderData {
  backgroundImage: BackgroundImage[]; 
}

export const LayoutLoader: LoaderFunction = async () => {
  try {
    const backgroundImage = await fetchBackgroundImage();

    if (!backgroundImage || backgroundImage.length === 0) {
      throw new Error('Background image not found');
    }

    return { backgroundImage };
  } catch (error) {
    throw new Response('Failed to load one or more images', { status: 500 });
  }
};

const Layout: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
  const { backgroundImage } = useLoaderData() as LayoutLoaderData;

  useEffect(() => {
    const bgImageUrl = urlFor(backgroundImage[0]?.image?.asset?._id).quality(75).format('webp').url();
    setBackgroundImageUrl(bgImageUrl);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 40);
      setShowScrollToTop(scrollTop > 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [backgroundImage]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between">
     <div
      className="absolute inset-0 bg-fixed bg-cover bg-center min-h-screen z-0"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-70 z-0" />
    </div>

    <header
      className={`sticky top-0 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/95 backdrop-blur-md shadow-2xl border-b border-slate-800/80"
          : "bg-slate-950/75 backdrop-blur-md border-b border-slate-800/40"
      }`}
      style={{ zIndex: 100 }} 
    >
      <div className="mx-auto max-w-[1280px]">
        <Navbar />
      </div>
    </header>
 
    <main className="relative flex-1 mx-auto max-w-[1280px] w-full p-4 pb-12 z-10">
      <Outlet />
    </main>

    {showScrollToTop && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-2xl transition-all duration-300 z-50 hover:scale-110 focus:outline-none"
        aria-label="Scroll to top"
      >
        <MdOutlineKeyboardArrowUp size={22} />
      </button>
    )}
  
    <div className="relative z-10">
      <Footer />
    </div>
  </div>
  
  );
};

export default Layout;
