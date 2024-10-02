import React, { useEffect, useState } from 'react';
import { Outlet, LoaderFunction, useLoaderData } from 'react-router-dom';
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import Navbar from '../components/Navbar'; // Adjust the path as needed
import { fetchBackgroundImage } from '../../sanityApiClient/useSanityClient';

// Define the type for the asset
interface BackgroundImageAsset {
  _id: string; // Optional: include if you want to identify the asset
  url: string; // The URL for the background image
}

// Define the type for the background image structure
interface BackgroundImage {
  image: {
    asset: BackgroundImageAsset; // The asset containing the image URL
  };
}

// Define the type for the data returned from the loader
interface LayoutLoaderData {
  backgroundImage: BackgroundImage[]; // Array of BackgroundImage
}

// Define the loader function
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
const Layout:React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      // Show/hide navbar background based on scroll
      setIsScrolled(scrollTop > 40);

      // Show/hide scroll-to-top button
      setShowScrollToTop(scrollTop > 200);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { backgroundImage } = useLoaderData() as LayoutLoaderData;
  return (
    <div className='absoulte inset-0'
   
    style={{
      backgroundImage: `url(${backgroundImage[0]?.image?.asset?.url})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh', 
      backgroundAttachment: 'fixed',
    }}
    >
      
      <header className={`sticky top-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-black shadow-md' : 'bg-transparent'}`}>
       <div className='mx-auto max-w-[1200px]'>
        <Navbar />

       </div>
      </header>

      <main className="flex flex-col mx-auto max-w-[1200px]">
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>

        {showScrollToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-800 text-white p-3 rounded-full shadow-lg transition-all duration-300"
          >
            <MdOutlineKeyboardArrowUp size={20} />
          </button>
        )}
      </main>
    </div>
  );
};

export default Layout;
