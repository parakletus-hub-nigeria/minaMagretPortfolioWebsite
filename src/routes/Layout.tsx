import React, { useEffect, useState } from 'react';
import { Outlet, LoaderFunction, useLoaderData } from 'react-router-dom';
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import Navbar from '../components/Navbar';
import { fetchBackgroundImage } from '../../sanityApiClient/useSanityClient';
import Footer from '../components/Footer';
import { urlFor } from '../../sanityApiClient/sanityClient'; 
import {motion} from 'framer-motion';


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

interface MousePosition {
  x: number;
  y: number;
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
  const [trackMousePosition, setTrackMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const { backgroundImage } = useLoaderData() as LayoutLoaderData;


  const mouseMoveFunction = (event: MouseEvent) => {
    requestAnimationFrame(() => {
      setTrackMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    });
  };

   
 
 
  const variants = {
    default: {
      x: trackMousePosition.x - 16,
      y: trackMousePosition.y - 16,
      transition: {
        ease: 'easeOut',
        duration: 0.05,
      },
    },
  };

  useEffect(() => {
 
    const bgImageUrl = urlFor(backgroundImage[0]?.image?.asset?._id).quality(75).format('webp').url();
    setBackgroundImageUrl(bgImageUrl);
    window.addEventListener('mousemove', mouseMoveFunction);
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 40);
      setShowScrollToTop(scrollTop > 200);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', mouseMoveFunction);
    };
  }, [backgroundImage]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen">
     <div
      className="absolute inset-0 bg-fixed bg-cover bg-center min-h-screen  z-0"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,

      }}
    >
  
      <div className="absolute inset-0 bg-black opacity-70 z-0" />
    </div>
  
  
    <header
      className={`sticky top-0  transition-colors duration-300 ${
        isScrolled ? "bg-black shadow-md" : "bg-transparent"
      }`}
      style={{ zIndex: 100 }} 
    >
      <div className="mx-auto max-w-[1200px]">
        <Navbar />
      </div>
    </header>
 
    <main className="relative  mx-auto max-w-[1200px] p-4 pb-16">
      <Outlet />
    </main>

 
    <motion.div
  className="cursor bg-[#1111] w-12 h-12 rounded-full border-2 border-blue-500 hidden md:fixed top-0 left-0 z-[999] pointer-events-none"
  variants={variants}
  animate="default"
/>


    {showScrollToTop && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-800 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
      >
        <MdOutlineKeyboardArrowUp size={20} />
      </button>
    )}
  
   
  <footer className="absolute bottom-0 left-0 w-full bg-gray-900 text-center py-2">
        <Footer />
      </footer>
  </div>
  
  );
};

export default Layout;
